export default class SelectorNivel extends Phaser.Scene {

    constructor(){
        super({key: 'SelectorNivel'});
    }

    init(data){
        console.log(data);
    }

    preload(){
        this.load.image('fondo', './Assets/Sprites/UI/PantallaInicial/FondoPlaya.png');
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
        this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        this.add.image(0, 0, 'fondo').setScale(0.5, 0.5).setOrigin(-0.3, -0.4);
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");

        this.mapas = [];
        this.mapas[0] = 'CiudadLevel';
        this.mapas[1] = 'PlayaLevel';
        this.mapas[2] = 'VolcanLevel';
        this.currentPage = 0;
    }

    continueCreate(){
        this.playLabel = this.generateText(this.cameras.main.centerX, 600, 'SELECT', 50);
        this.playLabel.setInteractive();
        this.playLabel.on('pointerdown', (event) => { this.scene.start(this.mapas[this.currentPage]); })
    }

    changePage(){
        this.currentPage = this.currentPage % 3;
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
    }
}