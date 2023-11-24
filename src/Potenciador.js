export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo
    * @param {number} potenciadorID 
    * @param {key} key - sprite
    */

    constructor(scene, x, y, id, key, player){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        scene.add.existing(this);
        this.skeleton = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.skeleton);
        this.potenciadorID = id;
        this.type = type
        const potenciadorTypes = ['botiquin', 'velocidad', 'vivu', 'invencible'];
    }

    enviarPotenciador(){
        player.applyEffect(potenciadorID);
        this.destroy();
    }

   
    spawnPotenciador() {
        if (scene.potenciadorRecogido) {
            const spawnPoints = [
                { x: 200, y: 200 },
                { x: 400, y: 400 },
            //Añadir luego las coordenadas correctas
            ];

            const spawnPoint = Phaser.Math.RND.pick(spawnPoints);

            scene.potenciadorRecogido = false; // Establece que el potenciador actual ha sido generado
        }
    }

    getPotenciadorType() {
        return potenciadorTypes[this.potenciadorID];
    }
}
