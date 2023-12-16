
export default class explosive extends Phaser.GameObjects.Sprite{


    constructor(scene, x, y, key, nTipo){

        super(scene, x, y, key);

        //Añadidos a la escena

        this.scene.add.existing(this);

        this.scene.addExplosiveToGroup(this);

        this.scene = scene;

        this.setScale(1.5, 1.5);

        //Fisicas

        this.scene.physics.add.existing(this);

        this.body.setSize(5, 5);

        //Inicializacion de variables

        this.x = x;

        this.y = y;

        this.tipo = nTipo;
        
        this.explotionDuration = 2;

        this.exploting = false;

        this.damage = 20;

        this.explosiveArea = 100;

        this.elapsedTime = 0;

        this.scene.anims.create({
            key: 'explosionAnimation',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:7}),
            frameRate: 5,
            repeat: 0
        })

        this.event = this.scene.time.addEvent({
        delay: 1000,
        callback: this.calculateElapsedTime,
        callbackScope: this,
        loop: true

        })

    }

    destroyMyself(){

        this.zone.destroy();
        this.destroy();

    }

    calculateElapsedTime(){

        this.elapsedTime += 1;

    }

    detonar(){
        this.body.destroy();

        this.exploting = true;

        this.play('explosionAnimation');
        this.zone = this.scene.add.zone(this.x, this.y, this.explosiveArea, this.explosiveArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.explosiveArea / 2);

        this.scene.physics.add.overlap(this.zone, this.scene.grupoEnemigos, function(zone, enemy){

            enemy.recieveDamage(10);
            enemy.gainExplosiveState(this.explotionDuration);

        }, null, this);

        this.elapsedTime = 0;
    }

    update(){
        console.log("NASHE" + this.scene.grupoEnemigos.children.size)
        this.scene.physics.add.collider(this, this.scene.grupoEnemigos, function(explosive, enemy){

            explosive.detonar();

        });

        if(this.elapsedTime >= this.explotionDuration && this.exploting == true){
            this.destroyMyself();
        }

    }


}