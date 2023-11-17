export default class potenciadores extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo
    * @param {potenciadorID} potenciadorID 
    */

    constructor(scene, x, y, player, enemigo){
        super(scene, x, y);
        scene.add.existing(this);
        this.player = player;
        this.enemigo = enemigo;

        const potenciadorID = {
            BOTIQUIN: 0,
            VELOCIDAD: 1,
            VIVU: 2,
            INVENCIBILIDAD: 3,
 
        }
        
    }
}
