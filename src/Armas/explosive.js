

export default class explosive extends Phaser.GameObjects.Sprite{


    constructor(scene, x, y, key, nTipo, grupoEnemigos){

        super(scene, x, y, key);

        this.scene.add.existing(this);

        this.scene.addExplosiveToGroup(this);

        this.scene = scene;

        this.setScale(1.5, 1.5);

        this.x = x;

        this.y = y;

        this.scene.physics.add.existing(this);

        this.tipo = nTipo;
        
        this.explotionDuration = 1;

        this.exploting = false;

        this.damage = 10;

        this.explosiveArea = 100;

        this.grupoEnemigos = grupoEnemigos;

        this.scene.anims.create({
            key: 'explosionAnimation',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:7}),
            frameRate: 5,
            repeat: 1
        })

        this.scene.time.addEvent({

        delay: this.explotionDuration * 1000,
        callback: this.spawnCepo,
        callbackScope: this,
        paused: this.exploting == false

        })


    }

    destroyMyself(){

        this.zone.destroy();
        this.destroy();

    }

    detonar(){
        this.body.destroy();

        console.log('Bum');

        this.exploting = true;

        this.play('explosionAnimation');
        this.zone = this.scene.add.zone(this.x, this.y, this.explosiveArea, this.explosiveArea);
        this.scene.physics.world.enable(this.zone);
        this.zone.body.setCircle(this.explosiveArea / 2);

        this.scene.physics.add.overlap(this.zone, this.grupoEnemigos, function(zone, enemy){

            console.log('enemigo pupa');
            enemy.recibeDamage(this.damage);

        });
    }

    update(){

        this.scene.physics.add.collider(this, this.grupoEnemigos, function(explosive, enemy){

            explosive.detonar();

        });

    }


}