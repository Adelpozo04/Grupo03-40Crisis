export default class effectArea extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key, tiempoActivo){
        super(scene, x, y, key)
        this.key = key;

        scene.add.existing(this);
        
        this.scene.physics.add.existing(this);

        this.setDepth(1);
        this.setScale(2.5);
        scene.add.sprite(this);  

        scene.physics.add.overlap(this, this.scene.mike, ()=>{
            this.scene.mike.applyEffect(this.key)
        })

        scene.physics.add.overlap(this, this.scene.grupoEnemigos,(effArea, enemigo)=>{
            enemigo.applyEffect(this.key)
        })

        scene.time.delayedCall(tiempoActivo, ()=>{
            this.play('enemydeath', true);
            this.body.destroy()
            this.on('animationcomplete', this.destroyMyself )
        });
    }

    destroyMyself()
    {
        this.off('animationcomplete')
        this.destroy()
    }
}