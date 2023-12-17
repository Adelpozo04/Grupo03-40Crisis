import LevelBase from './levelBase.js'
import playerContenedor from '../Player/playerContenedor.js';
import Potenciador from '../Potenciador.js';
import UIManager from '../UI/uiManager.js';
import EnemigoSpawner from '../enemySpawner.js';

export default class PlayaLevel extends LevelBase{

    constructor(){
        super('PlayaLevel'); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
        this.potenciadorSpawneado = false;
        this.potenciadorRecogido = false;  // Inicialmente se permite generar el primer potenciador
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        super.preload();

        this.load.tilemapTiledJSON('playaTilemap', './Assets/JSON/MapaPlaya.json');

        this.load.image('patronesPlayaTilemap', './Assets/Sprites/Tilesets/Playa/TilePlaya-export.png');

    }


    create(data){

        super.create();

        //Creacion del tilemap a partir de los datos cargados
        this.map = this.make.tilemap({ 
			key: 'playaTilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});

        //Se indica el Json, el png de tiles, el tamaño de los tiles y el espaciado del tile con los bordes y el margen entre sprites
        const myTile = this.map.addTilesetImage('TilePlaya-export', 'patronesPlayaTilemap', 32, 32, 0, 0);

        //Creacion de las Layers del mapa
        this.groundLayer = this.map.createLayer('Suelo', myTile);

        this.groundUpLayer = this.map.createLayer('SueloEncima', myTile);

        this.collisionLayer = this.map.createLayer('Colisiones', myTile);

        this.collisionUpLayer = this.map.createLayer('ColisionesEncima', myTile).setDepth(4);

        this.objectsUpLayer = this.map.createLayer('ObjetosEncima', myTile).setDepth(5);

        //Se le agregan las colisiones a la layer
        this.collisionLayer.setCollisionByExclusion([-1], true);

        this.collisionUpLayer.setCollisionByExclusion([-1], true);

        console.log("se crea el Tile");
        
         //Creacion de entidades
         this.mike = new playerContenedor(this, 700, 700, 'mike', data, -2000, -2000, 200, 150);

         this.camera = this.cameras.main.startFollow(this.mike);
 

        console.log("se crea el mike");

        //Se ajusta el tamaño del mapa
        this.collisionLayer.setScale(1.35, 1.35);
        this.collisionUpLayer.setScale(1.32, 1.35);
        this.groundLayer.setScale(1.35, 1.35);
        this.groundUpLayer.setScale(1.35, 1.35);
        this.objectsUpLayer.setScale(1.35, 1.35);

        console.log("se crea el escalado de tile");
        
        //Creacion de los spawners
        
        this.enemySpawner1 = new EnemigoSpawner(this, 600, 400, this.mike, this.grupoEnemigos);
        this.enemySpawner2 = new EnemigoSpawner(this, 200, 1320, this.mike, this.grupoEnemigos);
        this.enemySpawner3 = new EnemigoSpawner(this, 1750, 2400, this.mike, this.grupoEnemigos);
        this.enemySpawner4 = new EnemigoSpawner(this, 3000, 1320, this.mike, this.grupoEnemigos);
        
        this.enemySpawners();

           //Se indica que colliders chocan entre si
           this.physics.add.collider(this.mike, this.collisionLayer);
 
           this.physics.add.collider(this.grupoBalas, this.collisionLayer, function(bala, layer){
               bala.destroy()
           }, null, this)
   
           this.physics.add.collider(this.grupoBalasMagicas, this.collisionLayer, function(bala, layer){
               bala.destroy()
           }, null, this)
   
           // balas con enemigos
           this.physics.add.overlap(this.grupoBalas, this.grupoEnemigos, function(bala, enemigo){
               
               enemigo.receiveDamage(bala.getDamage());
               bala.destroy();
   
           });
   
           this.physics.add.collider(this.grupoBalasMagicas, this.grupoEnemigos, function(bala, enemy){
   
               enemy.gainObjetiveState();
               bala.destroy();
   
           })
   
           // municion con player
           this.physics.add.collider(this.grupoMunicionBalas, this.mike, function(ammo, player){
   
               ammo.destroyMyself();
               player.reloadDisparosAmmo();
   
           });
   
           // enemigos con entorno
           this.physics.add.collider(this.grupoEnemigos, this.collisionLayer);
           
           this.spawnPotenciador();    
   
           //Creacion de la UI
           this.myUI = new UIManager(this, 'UIManager', this.mike);
   
           this.myUI.setScrollFactor(0);
       }
   
       spawnPotenciador() {
           const potenciadorTypes = {
               BOTIQUIN: 'botiquin', 
               VELOCIDAD: 'velocidad', 
               SLEEP: 'vivu', 
               INVENCIBLE: 'invencible',
           };
   
           let aux = Phaser.Math.RND.between(0, 3);
           let potenciadorType = Object.values(potenciadorTypes)[aux];
           const spawnPoints = [
               { x: 600, y: 600 },
               { x: 600, y: 700 },
               { x: 700, y: 600 },
               { x: 700, y: 700 },
               //Añadir luego las coordenadas correctas
           ];
           
           let spawnPoint = Phaser.Math.RND.pick(spawnPoints);
           let spawnPointX = spawnPoint.x;
           let spawnPointY = spawnPoint.y;
   
           this.potenciador = new Potenciador(this, spawnPointX, spawnPointY, potenciadorType, this.mike);
           
           this.tweens.add({
               targets: this.potenciador,
               y: this.potenciador.y - 30,
               duration: 2000,
               ease: 'Sine.easeInOut',
               yoyo: true,
               repeat: -1,
               delay: 10
           })
       }
   
       addAmmoToGroup(newAmmo){
           this.grupoMunicionBalas.add(newAmmo);
       }
   
       addExplosiveToGroup(newExplosive){
           this.grupoExplosivos.add(newExplosive);
       }
   
       sendPoints(points){
           this.myUI.gainPoints(points);
           this.events.emit('cambiarXP', 0, points);
       }
   
       generateText(x, y, message, size){
           let ogText = this.add.text(x, y, message, 
               { fontFamily: 'TitleFont', fontSize: size, color: 'white' })
           this.textCreated = true;
   
           return ogText;
       }
   
       getGrupoEnenmigos(){
           return this.grupoEnemigos;
       }
       
       changeInventory(currentPersonality){
           this.myUI.changeInventory(currentPersonality);
           this.myUI.changeInventorySelect(0);
       }
   
       changeInvenSelection(currentWea){
           this.myUI.changeInventorySelect(currentWea);
       }
   
   
       enemySpawners() {
           const allSpawners = [this.enemySpawner1, this.enemySpawner2, this.enemySpawner3, this.enemySpawner4];
   
           // Verifica la colisión entre la cámara y cada uno de los spawners
           allSpawners.forEach((spawner) => {
               const isColliding = Phaser.Geom.Intersects.RectangleToRectangle(this.camera.worldView, spawner.getBounds());
               if (!isColliding) {
                   // Si hay colisión, spawnear enemigos
                   spawner.spawnEnemies(5, 3000); // Ajusta el número y tiempo según lo que necesites
                   // Limpiar todos los enemigos generados después de cierto tiempo 
                   this.time.delayedCall(40000, () => {
                       spawner.clearEnemies();
                   });     
               }
           });
       };
   
       
   
       update(dt, t){
           if(!this.potenciadorSpawneado && this.potenciadorRecogido)
           { 
               this.potenciadorSpawneado = true;
               this.potenciadorRecogido = false;
               this.time.delayedCall(5000, () => {
                   this.spawnPotenciador();
                   
               })
           }
      }



}