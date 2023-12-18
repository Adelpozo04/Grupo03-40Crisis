export default class damageWave extends Phaser.GameObjects.Sprite {

    constructor(scene,x,y,key)
    {
        super(scene, x, y, key)
        this.key = key;
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setDepth(1)
        this.setScale(2.5)  
        scene.add.sprite(this);  

        this.speed = 50;

        scene.physics.add.collider(this, this.scene.mike, ()=>{
            //this.scene.mike.knockBack()
            this.scene.mike.applyEffect(this.key)
        })

        scene.physics.add.collider(this, this.scene.grupoEnemigos,(effArea, enemigo)=>{
            enemigo
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