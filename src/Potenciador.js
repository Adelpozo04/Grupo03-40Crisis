export default class Potenciador extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo 
    * @param {key} key - sprite
    */

    constructor(scene, x, y, key, player){
        super(scene, x, y);
        this.key = key;
        this.player = player;
        scene.add.existing(this);
        this.Potenciador = new Phaser.GameObjects.Sprite(scene, 0, 0, key, 0);
        this.add(this.Potenciador);
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
}
