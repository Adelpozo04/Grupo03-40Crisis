export default class potenciadores extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo
    * @param {number} potenciadorID 
    */

    constructor(scene, x, y, id, player){
        super(scene, x, y);
        this.player = player;
        this.scene.add.existing(this);
        this.potenciadorID = id;
        this.type = type
        const potenciadorTypes = ['botiquin', 'velocidad', 'vivu', 'invencible'];
    }

    enviarPotenciador(){
        player.applyEffect(potenciadorID);
        this.destroy();
    }

   
    spawnPotenciador() {
        if (this.scene.potenciadorRecogido) {
            const spawnPoints = [
                { x: 200, y: 200 },
                { x: 400, y: 400 },
            //Añadir luego las coordenadas correctas
            ];

            const spawnPoint = Phaser.Math.RND.pick(spawnPoints);

            const potenciador = new Potenciador(this, spawnPoint.x, spawnPoint.y, this.getPotenciadorType(), /*referencia al player?*/);

            this.scene.potenciadorRecogido = false; // Establece que el potenciador actual ha sido generado
        }
    }

    getPotenciadorType() {
        return potenciadorTypes[this.potenciadorID];
    }
}
