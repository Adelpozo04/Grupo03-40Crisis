
import CiudadLevel from './CiudadLevel.js';
import PlayaLevel from './PlayaLevel.js';
import VolcanLevel from './VolcanLevel.js';

export default class Pausa extends Phaser.Scene {
    constructor() {
        super({ key: 'Pausa' });
        
    }

    create() {

        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF"); // Boton de inicio
      /*  this.input.keyboard.on('keydown_ESC', () => {
            this.scene.stop();
            this.scene.resume('CiudadLevel');
        }); */
       
    }

    continueCreate(){

        const resumeButton = this.add.text(this.cameras.main.centerX, 300, 'Resume', { fontFamily: 'TitleFont', fontSize: 50, color: 'white' }).setOrigin(0.5,0.5);
        resumeButton.setInteractive();
        resumeButton.on('pointerdown', () => {
            console.log('hola');
            this.scene.stop('Pausa'); // Detiene la escena de pausa
            this.scene.resume('CiudadLevel'); // Reanuda la escena principal
        });

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
}