export default class potenciadores extends Phaser.GameObjects.Container {
    /**
    * @param {scene} scene - escena a colocar
    * @param {number} x - posicion x
    * @param {number} y - posicion y
    * @param {player} player - referencia al player
    * @param {enemigo} enemigo - referencia al enemigo
    * @param {potenciadorID} potenciadorID 
    */

    constructor(scene, x, y, type){
        super(scene, x, y);
        scene.add.existing(this);

        this.type = type
        
    }

    applyEffect(target) {
        switch (this.type) {
            case 'botiquin':
                target.life += 20;
                if (target.life > target.maxLife) {
                    target.life = target.maxLife;
                }
                break;
            case 'velocidad':
                aux = target.speed;
                target.speed = 10;
                scene.time.delayedCall(3000, () => {
                    target.speed = aux // Reducir la velocidad de nuevo después de 3 segundos
                });
                break;
            case 'vivu':
                aux = target.speed;
                target.speed = 0;
                scene.time.delayedCall(5000, () => {
                    target.speed = aux;
                });
                break;
            case 'invencible':
                aux = target.life;
                target.life = 999999999999999;
                scene.time.delayedCall(5000, () => {
                    target.life = aux;
                });
                break;
            default:
                break;
        }
        this.destroy();
        scene.potenciadorRecogido = true; // Marcar que el potenciador ha sido recogido
    }


   
    spawnPotenciador() {
        if (this.potenciadorRecogido) {
            const spawnPoints = [
                { x: 200, y: 200 },
                { x: 400, y: 400 },
            //Añadir luego las coordenadas correctas
            ];

            const spawnPoint = Phaser.Math.RND.pick(spawnPoints);

            const potenciador = new Potenciador(this, spawnPoint.x, spawnPoint.y, this.getPotenciadorType());

            this.potenciadorRecogido = false; // Establece que el potenciador actual ha sido generado
        }
    }

    getPotenciadorType() {
        const potenciadorTypes = ['botiquin', 'velocidad', 'vivu', 'invencible'];
        return Phaser.Math.RND.pick(potenciadorTypes);
    }
}
