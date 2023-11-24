export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {sprite} sprite - sprite
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo 
    * @param {string} key - sprite
    */

    constructor(scene, x, y, key, player){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        scene.add.existing(this);
        this.sprite = scene.add.sprite(32, 32, key);
        this.add(this.sprite);
        this.setScale(0.05); //cuidao que esto igual da problemas
    }

    enviarPotenciador(){
        player.applyEffect(potenciadorID);
        this.destroy();
    }

    /*
    spawnPotenciador() {
        if (this.scene.potenciadorRecogido) {
            const spawnPoints = [
                { x: 200, y: 200 },
                { x: 400, y: 400 },
            //Añadir luego las coordenadas correctas
            ];

            const spawnPoint = Phaser.Math.RND.pick(spawnPoints);

            this.scene.potenciadorRecogido = false; // Establece que el potenciador actual ha sido generado
        }
    }
    */
}
