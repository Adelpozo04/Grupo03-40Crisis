

export default class muro extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, key, player){

        super(scene, x, y, key);

        this.scene.add.existing(this);

        this.x = x;

        this.y = y;

        this.scene = scene;

        this.death = false;

        this.life = 30;

        this.atractionArea = 75;

        this.player = player

        this.zone = this.scene.add.zone(this.x, this.y, this.atractionArea, this.atractionArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.atractionArea / 2);

        this.overlapObject = this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
            enemy.changeObjetive(this);
        }, null, this)

    }

    receiveDamage(damage){
        if(!this.death){
            this.life -= damage;

            console.log(this.life);
    
            if(this.life <= 0){
                this.die();
            }
        }
        
    }

    getCenterPoint(){
        return {x: this.x + 16, y: this.y + 16};
    }

    die(){
        this.death = true;

        this.overlapObject.destroy();

        this.scene.physics.add.overlap(this.scene.grupoEnemigos, this.zone, function(enemy, zone){
            enemy.changeObjetive(this.player);
        }, null, this)

        this.scene.time.addEvent({
            delay: 500,
            callback: this.destroyMyself,
            callbackScope: this,
            loop: false
        })

    }

    destroyMyself(){
        this.zone.destroy();
        this.destroy();
    }

}