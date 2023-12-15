
export default class remoteExplosive extends Phaser.GameObjects.Sprite{


    constructor(scene, x, y, key){

        super(scene, x, y, key);

        //Añadidos a la escena

        this.scene.add.existing(this);

        this.scene.addExplosiveToGroup(this);

        this.setScale(1.5, 1.5);

        //Inicializacion de variables
        
        this.explotionDuration = 2;

        this.exploting = false;

        this.damage = 10;

        this.explosiveArea = 100;

        this.elapsedTime = 0;

        this.grupoEnemigos = this.scene.grupoEnemigos;

        this.scene.input.mouse.disableContextMenu();

        let callback = (pointer) =>
        {
            if(pointer.rightButtonDown()){
                this.detonar();
                this.scene.input.off('pointerdown', callback, this)
            }
        }
        this.scene.input.on('pointerdown', callback, this);

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

        this.scene.input.clear(this);

        this.exploting = true;

        this.play('explosionAnimation');
        this.zone = this.scene.add.zone(this.x, this.y, this.explosiveArea, this.explosiveArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.explosiveArea / 2);

        this.scene.physics.add.overlap(this.zone, this.grupoEnemigos, function(zone, enemy){

            enemy.recieveDamage(10);
            enemy.gainExplosiveState(this.explotionDuration);

        }, null, this);

        this.elapsedTime = 0;
    }

    update(){

        if(this.elapsedTime >= this.explotionDuration && this.exploting == true){
            this.destroyMyself();
        }

    }


}