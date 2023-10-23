
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

        this.textCreated = true;
        
    }
    
    update(t, dt){
        //console.log("update", t, dt);
        if(this.textCreated){
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