export default class personalityWheel extends Phaser.GameObjects.Graphics{

    constructor( scene, x, y, player){
    
        super(scene);
    
        this.x = x;
        this.y = y;
    
        this.player = player;
    
        this.currentPer = this.player.getCurrentPersonality();

        this.Arc = this.scene.add.graphics().setScrollFactor(0);

        this.Arc.lineStyle(25, 0x000000);

        this.Arc.beginPath();
        this.Arc.arc(x, y, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.02);
        this.Arc.strokePath();
        this.Arc.closePath();

        this.Arc.beginPath();
        this.Arc.lineStyle(15, 0xff00ff);
        this.Arc.arc(x, y, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(90), false, 0.02);
        this.Arc.strokePath();
        this.Arc.closePath();

        this.Arc.beginPath();
        this.Arc.lineStyle(15, 0xffff00);
        this.Arc.arc(x, y, 50, Phaser.Math.DegToRad(90), Phaser.Math.DegToRad(180), false, 0.02);
        this.Arc.strokePath();
        this.Arc.closePath();

        this.Arc.beginPath();
        this.Arc.lineStyle(15, 0x0000ff);
        this.Arc.arc(x, y, 50, Phaser.Math.DegToRad(180), Phaser.Math.DegToRad(270), false, 0.02);
        this.Arc.strokePath();
        this.Arc.closePath();

        this.Arc.beginPath();
        this.Arc.lineStyle(15, 0x00ff00);
        this.Arc.arc(x, y, 50, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(360), false, 0.02);
        this.Arc.strokePath();
        this.Arc.closePath();


    
        this.maxValue = this.value;
    
        this.draw();
    
        scene.add.existing(this);
    
    }
    
    //Dibuja la barra de vida
    draw(){
        

    }
    
    
    
    }