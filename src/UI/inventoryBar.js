export default class inventoryBar extends Phaser.GameObjects.Container{

    constructor( scene, x, y, player){
    
        super(scene, x, y);
    
        this.Bar = this.scene.add.sprite(x, y, 'inventory').setScrollFactor(0);

        this.slotSel = this.scene.add.sprite(x - 54, y, 'slot').setScrollFactor(0);

        this.Icon1 = this.scene.add.sprite(x - 64, y, 'fist').setScrollFactor(0).setAngle(-45);

        this.Icon2 = this.scene.add.sprite(x, y, 'bate').setScrollFactor(0).setAngle(-45);

        this.Icon3 = this.scene.add.sprite(x + 64, y, 'espada').setScrollFactor(0).setAngle(-45);

        this.Bar.setScale(3.5, 3.5);

        this.slotSel.setScale(3.5, 3.5);
    
        this.player = player;

        this.currentSelection = this.Icon1;
    
        scene.add.existing(this.Bar);
    
    }

    changeIcons(currentPersonality){
        
        if(currentPersonality == 0){
            this.Icon1.setTexture('muro');
            this.Icon2.setTexture('mina');
            this.Icon3.setTexture('c4');
        }
        else if(currentPersonality == 2){
            this.Icon1.setTexture('pistola');
            this.Icon2.setTexture('metralleta');
            this.Icon3.setTexture('franco');
        }
        else if(currentPersonality == 1){
            this.Icon1.setTexture('fist');
            this.Icon2.setTexture('bate');
            this.Icon3.setTexture('espada');
        }
        else if(currentPersonality == 3){
            this.Icon1.setTexture('paralizador');
            this.Icon2.setTexture('empuje');
            this.Icon3.setTexture('varita');
        }

    }

    changeSelection(currentWeapon){

        if(currentWeapon == 0){
            this.slotSel.x = this.x - 54;
        }
        else if(currentWeapon == 1){
            this.slotSel.x = this.x + 4;
        }
        else if(currentWeapon == 2){
            this.slotSel.x = this.x + 64;
        }

    }
    
    
    
    
    }