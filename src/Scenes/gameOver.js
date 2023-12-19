import SelectorNivel from "./SelectorNivel.js";

export default class gameOver extends Phaser.Scene{

    constructor(){
        super({key: 'gameOver'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
        this.points = data.datos;
        this.level = data.level;
    }
    
    preload(){
        this.load.image('GameOverFondo', './Assets/Sprites/UI/GameOver/GameOver.png');
        console.log();
    }

    loadFont(name, url) {
		let self = this;
	    let newFont = new FontFace(name, `url(${url})`);
	    newFont.load()
	    // Función que se llamará cuando las fuentes estén cargadas
	    // en este caso, load devuelve lo que llamamos una promesa
	    // más info en: https://developer.mozilla.org/en-US/docs/Web/API/FontFace/load
	    .then(function (loaded) { 
	        document.fonts.add(loaded);
	        self.continueCreate();
	    }).catch(function (error) {
	        return error;
    	});
	}

    create(){
        this.add.image(0, 0, 'GameOverFondo').setScale(1, 1).setOrigin(0, 0)
        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");
        
        this.textCreated = false;
        this.scaleEffect = false;
        this.letterColor = 0;

    }

    continueCreate() {

        this.titleLabel = this.generateText(this.cameras.main.centerX, 250, 'GAME OVER', 90);
        this.playLabel = this.generateText(this.cameras.main.centerX, 600, 'RETURN', 50);
        this.playLabel.setInteractive();
        this.playLabel.on('pointerdown', (event) => { this.scene.start('SelectorNivel', {datos: this.points, level: this.level}); })

	}

    /**
     * genra y añade
     * @param {number} x 
     * @param {number} y 
     * @param {String} message 
     * @param {number} size 
     * @return {G--}
     */
    generateText(x, y, message, size){
		let ogText = this.add.text(x, y, message, 
            { fontFamily: 'TitleFont', fontSize: size, color: 'red' })
        ogText.setOrigin(0.5,0.5);	
        ogText.setScale(1,1);
        this.textCreated = true;
        ogText.angle = -5;
        // efecto texto
        
        this.tweens.add({
            targets: ogText,
            scale: 1.5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true, // Hace que la animación se repita en sentido inverso
            repeat: -1 // Repite infinitamente
        });
        this.tweens.add({
            targets: ogText,
            angle: 5,
            duration: 3000,
            ease: 'Sine.easeInOut',
            yoyo: true, 
            repeat: -1
        });
        return ogText
    }
    
    update(t, dt){
        

        
    }
}