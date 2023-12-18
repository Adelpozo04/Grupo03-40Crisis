export default class damageWave extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,key, scale)
    {
        super(scene, x, y, key)
        this.key = key;
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setDepth(0)
        this.setScale(scale) 

        this.speed = 50;

        scene.physics.add.overlap(this, this.scene.mike, ()=>{
            let direction = new Phaser.Math.Vector2(this.scene.mike.x - this.x, this.scene.mike.y - this.y)
            direction.normalize();
            this.scene.mike.knockBack(direction)
            this.scene.mike.applyEffect(this.key)
        })

        scene.physics.add.overlap(this, this.scene.grupoEnemigos,(effArea, enemigo)=>{

            let direction = new Phaser.Math.Vector2(enemigo.x - this.x, enemigo.y - this.y)
            direction.normalize();
            enemigo.knockBack(direction)
            enemigo.applyEffect(this.key)
        })
    }

    preUpdate()
    {
        this.body.setVelocity(-this.speed, 0);
        if (this.x < 0)
        {
            this.play('enemydeath', true);
            this.body.destroy()
            this.on('animationcomplete', this.destroyMyself )
        }
    }

    destroyMyself()
    {
        this.off('animationcomplete')
        this.destroy()
    }
}