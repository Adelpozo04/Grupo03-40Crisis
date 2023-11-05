export default class enemigo extends Phaser.GameObjects.Container {
    /**
     * @param {scene} scene - escena a colocar
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {player} player - referencia al player
     * @param {number} speed - velocidad
     * @param {number} attackDistance - distancia mínima de ataque
     */
    constructor(scene, x, y, player, speed, attackDistance){
        super(scene, x, y);
        scene.add.existing(this);
        this.player = player;
        this.speed = speed;
        this.direction = new Phaser.Math.Vector2();
        this.attackDistance = attackDistance;
    }
    
    getPlayer(){
        return this.player;
    }
    getDirection() {
        return { x: this.direction.x, y: this.direction.y };
    }
    basicMovement()
    {
        let playerPosition = this.player.getPosition();

        //console.log("player.x = " + playerPosition.x + " player.y = " + playerPosition.y);
        //console.log("zombie.x = " + this.x + " zombie.y = " + this.y);
        this.direction = new Phaser.Math.Vector2(
            playerPosition.x - this.x,
            playerPosition.y - this.y
        );
        this.direction.normalize();
        
        // calcular la distancia entre enemigo y player, si está debajo del mínimo de distancia
        // de ataque, dejar de acercarse y atacar
        if (Math.abs(this.x - playerPosition.x) < this.attackDistance &&
            Math.abs(this.y - playerPosition.y) < this.attackDistance)
        {
            //attack
        }
        else
        {
            this.x += this.speed * this.direction.x;
            this.y += this.speed * this.direction.y;
        }
        
    }
}
    