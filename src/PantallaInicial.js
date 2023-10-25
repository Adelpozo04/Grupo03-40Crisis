
export default class PantallaInicial extends Phaser.Scene{

    constructor(){
        super({key: 'PantallaInicial'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){
        this.textCreated = false;
        this.text;
        this.i = 0;

        this.j = 0;
        this.scaleEffect = false;
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


        
    }

    continueCreate() {

        this.GenerateText(this.cameras.main.centerX, 250, '40 CRISIS', 'PantallaInicial');

	}

    GenerateText(x, y, message, sceneKey){

		this.text = this.add.text(x, y, message, 
            { fontFamily: 'TitleFont', fontSize: 90, color: 'white' })
        this.text.setOrigin(0.5,0.5);	
        this.text.setScale(1,1);
        this.textCreated = true;
        this.text.angle = -5;
        // efecto texto
        var efectoScale = this.tweens.add({
            targets: this.text,
            scale: 1.5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true, // Hace que la animación se repita en sentido inverso
            repeat: -1 // Repite infinitamente
        });
        var efectoRotation = this.tweens.add({
            targets: this.text,
            angle: 5,
            duration: 3000,
            ease: 'Sine.easeInOut',
            yoyo: true, 
            repeat: -1
        });
    }
    
    update(t, dt){
        
        if(this.textCreated){
            //efecto multicolor
            const top = this.hsv[this.i].color;
            const bottom = this.hsv[359 - this.i].color;
            this.text.setTint(top, top, bottom, bottom);
            this.i++;
            if (this.i === 360)
            {
                this.i = 0;
            }
        }
    }
}