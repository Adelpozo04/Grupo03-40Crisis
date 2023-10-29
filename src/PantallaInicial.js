
export default class PantallaInicial extends Phaser.Scene{

    constructor(){
        super({key: 'PantallaInicial'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        
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

        this.hsv = Phaser.Display.Color.HSVColorWheel();
        this.loadFont("TitleFont", "../assets/fonts/RUBBBB__.TTF");
        
        this.textCreated = false;
        this.scaleEffect = false;
        this.letterColor = 0;
        
    }

    continueCreate() {

        this.titleLabel = this.generateText(this.cameras.main.centerX, 250, '40 CRISIS', 90);
        this.playLabel = this.generateText(this.cameras.main.centerX, 600, 'PLAY', 50);
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
            { fontFamily: 'TitleFont', fontSize: size, color: 'white' })
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
        
        if(this.textCreated){
            //efecto multicolor
            const top = this.hsv[this.letterColor].color;
            const bottom = this.hsv[359 - this.letterColor].color;
            this.playLabel.setTint(top, top, bottom, bottom);
            this.titleLabel.setTint(top, top, bottom, bottom);
            this.letterColor++;
            if (this.letterColor === 360)
            {
                this.letterColor = 0;
            }
        }
    }
}