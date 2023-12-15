export default class personalityWheel extends Phaser.GameObjects.Container{

    constructor( scene, x, y, player){
    
        super(scene);
    
        this.x = x;
        this.y = y;
    
        this.player = player;
    
        this.currentPer = this.player.getCurrentPersonality();

        this.analistaGradosFin = 30;
        this.centinelaGradosFin = 90;
        this.exploradorGradosFin = 180;
        this.pacifistaGradosFin = 270;

        this.fondoArc = this.scene.add.graphics().setScrollFactor(0);
        this.analistaArc = this.scene.add.arc(scene, x, y, 128, 0, 90, false, 0xff00ff, 1).setScrollFactor(0).setDepth(20);
        this.scene.add.existing(this.analistaArc);
        console.log(this.analistaArc);
        this.centinelaArc = this.scene.add.graphics().setScrollFactor(0);
        this.exploradorArc = this.scene.add.graphics().setScrollFactor(0);
        this.pacifistaArc = this.scene.add.graphics().setScrollFactor(0);

        

        this.GradosIni = new Map([
            ['analista', 0], ['centinela', 90], ['explorador', 180], ['pacifista', 270]
        ]);

        /*
        this.fondoArc.lineStyle(25, 0x000000);
        this.analistaArc.lineStyle(25, 0xff00ff);
        this.centinelaArc.lineStyle(25, 0xffff00);
        this.exploradorArc.lineStyle(25, 0x0000ff);
        this.pacifistaArc.lineStyle(25, 0x00ff00);

        //Rueda blanca margen
        this.fondoArc.beginPath();
        this.fondoArc.arc(x, y, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.02);
        this.fondoArc.strokePath();
        this.fondoArc.closePath();

        //Analista
        this.analistaArc.beginPath();
        this.analistaArc.arc(x, y, 40, Phaser.Math.DegToRad(this.GradosIni.get('analista')), Phaser.Math.DegToRad(this.analistaGradosFin), false, 0.02);
        this.analistaArc.strokePath();
        this.analistaArc.closePath();

        //Centinela
        this.centinelaArc.beginPath();
        this.centinelaArc.arc(x, y, 40, Phaser.Math.DegToRad(this.GradosIni.get('centinela')), Phaser.Math.DegToRad(this.centinelaGradosFin), false, 0.02);
        this.centinelaArc.strokePath();
        this.centinelaArc.closePath();

        //Explorador
        this.exploradorArc.beginPath();
        this.exploradorArc.arc(x, y, 40, Phaser.Math.DegToRad(this.GradosIni.get('explorador')), Phaser.Math.DegToRad(this.exploradorGradosFin), false, 0.02);
        this.exploradorArc.strokePath();
        this.exploradorArc.closePath();


        //Pacifista
        this.pacifistaArc.beginPath();
        this.pacifistaArc.arc(x, y, 40, Phaser.Math.DegToRad(this.GradosIni.get('pacifista')), Phaser.Math.DegToRad(this.pacifistaGradosFin), false, 0.02);
        this.pacifistaArc.strokePath();
        this.pacifistaArc.closePath();
*/

        this.draw();
    
        scene.add.existing(this);
    
    }
    
    //Dibuja la barra de vida
    draw(){
        
        /*
        this.fondoArc.fillPath();

        this.analistaArc.fillPath();

        this.centinelaArc.fillPath();

        this.exploradorArc.fillPath();

        this.pacifistaArc.fillPath();
        */

    }

    preUpdate(t, dt){
        /*
        this.exploradorGradosFin = (this.player.getPersonalityExp(0) * 360) / 1800;

        this.exploradorGradosFin = (this.player.getPersonalityExp(1) * 360) / 1800;

        this.centinelaGradosFin = (this.player.getPersonalityExp(2) * 360) / 1800;

        this.pacifistaGradosFin = (this.player.getPersonalityExp(3) * 360) / 1800;

        this.draw();
        */
    }
    
    
    
    }