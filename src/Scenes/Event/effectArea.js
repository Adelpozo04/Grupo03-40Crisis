export default class effectArea extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key, tiempoActivo){
        super(scene, x, y, key)
        scene.add.existing(this);
        this.sprite = scene.add.sprite(x, y, key);
        scene.add.sprite(this.sprite);

        scene.physics.add.overlap(this, this.scene.mike, ()=>{
            this.scene.mike.applyEffect(this.key)
            console.log("nashe")
        })

        scene.physics.add.overlap(this, this.scene.grupoEnemigos, function(effArea, enemigo){
            enemigo.applyEffect(this.key)
        })

        
        scene.time.delayedCall(tiempoActivo, ()=>{
            this.destroy();
        });
    }


}