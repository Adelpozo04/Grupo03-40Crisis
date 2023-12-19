export default class personalityWheel extends Phaser.GameObjects.Sprite{

    constructor( scene, x, y, player){
    
        super(scene, x, y);
    
        this.x = x;
        this.y = y;
    
        this.player = player;
    
        this.currentPer = this.player.getCurrentPersonality();

        this.analistaGradosFin = 0;
        this.centinelaGradosFin = 90;
        this.exploradorGradosFin = 180;
        this.pacifistaGradosFin = 270;

        this.GradosIni = new Map([
            ['analista', 0], ['centinela', 90], ['explorador', 180], ['pacifista', 270]
        ]);

        //this.fondoArc = this.scene.add.graphics().setScrollFactor(0);

        this.analistaArc = new Phaser.GameObjects.Arc(scene, x, y, 40, this.GradosIni.get('analista'), 0, false).setScrollFactor(0);
        this.analistaArc.setStrokeStyle(20, 0xff00ff, 1).setDepth(5);
        this.analistaArc.closePath = false;
        this.scene.add.existing(this.analistaArc);

        this.centinelaArc = new Phaser.GameObjects.Arc(scene, x, y, 40, this.GradosIni.get('centinela'), 90, false).setScrollFactor(0);
        this.centinelaArc.setStrokeStyle(20, 0x0000ff, 1).setDepth(5);
        this.centinelaArc.closePath = false;
        this.scene.add.existing(this.centinelaArc);

        this.exploradorArc = new Phaser.GameObjects.Arc(scene, x, y, 40, this.GradosIni.get('explorador'), 180, false).setScrollFactor(0);
        this.exploradorArc.setStrokeStyle(20, 0xffff00, 1).setDepth(5);
        this.exploradorArc.closePath = false;
        this.scene.add.existing(this.exploradorArc);

        this.pacifistaArc = new Phaser.GameObjects.Arc(scene, x, y, 40, this.GradosIni.get('pacifista'), 270, false).setScrollFactor(0);
        this.pacifistaArc.setStrokeStyle(20, 0x00ff00, 1).setDepth(5);
        this.pacifistaArc.closePath = false;
        this.scene.add.existing(this.pacifistaArc);

        var limitArc;

        var startAngle = -2;
        var endAngle = 2;

        for(let i = 0; i < 12; i++){
            limitArc = new Phaser.GameObjects.Arc(scene, x, y, 40, startAngle, endAngle, false).setScrollFactor(0);
            limitArc.setStrokeStyle(20, 0x000000, 1).setDepth(5);
            limitArc.closePath = false;
            this.scene.add.existing(limitArc);

            startAngle += 30;

            endAngle += 30;

        }
        

        
    
        scene.add.existing(this);
    
    }
    
    //Dibuja la barra de vida
    draw(){
        
        this.analistaArc.setEndAngle(this.analistaGradosFin);

        this.centinelaArc.setEndAngle(this.centinelaGradosFin);

        this.exploradorArc.setEndAngle(this.exploradorGradosFin);

        this.pacifistaArc.setEndAngle(this.pacifistaGradosFin);

    }

    preUpdate(t, dt){
        
        this.analistaGradosFin = this.GradosIni.get('analista') + (this.player.getPersonalityExp(0) * 90) / this.player.getMaxExp();

        this.centinelaGradosFin = this.GradosIni.get('centinela') + (this.player.getPersonalityExp(2) * 90) / this.player.getMaxExp();

        this.exploradorGradosFin = this.GradosIni.get('explorador') + (this.player.getPersonalityExp(1) * 90) / this.player.getMaxExp(); 

        this.pacifistaGradosFin = this.GradosIni.get('pacifista') + (this.player.getPersonalityExp(3) * 90) / this.player.getMaxExp();

        //console.log(this.player.getPersonalityExp(0), this.player.getPersonalityExp(1), this.player.getPersonalityExp(2), this.player.getPersonalityExp(3));

        this.draw();
    }
    
    
    
    }