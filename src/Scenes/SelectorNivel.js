import playerContenedor from '../Player/playerContenedor.js';

export default class SelectorNivel extends Phaser.Scene {

    constructor(){
        super({key: 'SelectorNivel'});
    }

    init(data){
        console.log(data);
    }

    preload(){
        this.load.image('CiudadLevel', './Assets/Sprites/UI/Selector/MapaCiudadSelection.png');
        this.load.image('FondoCiudad', './Assets/Sprites/UI/Selector/MapaCiudadSelectionFondo.png');
        this.load.image('PlayaLevel', './Assets/Sprites/UI/Selector/TilePlayaSelection.png');
        this.load.image('FondoPlaya', './Assets/Sprites/UI/Selector/TilePlayaSelectionFondo.png');
        this.load.image('VolcanLevel', './Assets/Sprites/UI/Selector/MapaVolcanSelection.png');
        this.load.image('FondoVolcan', './Assets/Sprites/UI/Selector/MapaVolcanSelectionFondo.png');
        this.load.image('flecha', './Assets/Sprites/UI/Selector/flecha.png');
        this.load.spritesheet('hat', './Assets/Sprites/Jugador/Sombreros/Sombreros.png', {frameWidth: 256, frameHeight: 256});
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
        this.globalPoints = [];
        this.globalPoints[0] = 0;
        this.globalPoints[1] = 0;
        this.globalPoints[2] = 0;

        this.events.on('cambiarCiudadPoints', function (nuevoValor) {
            this.ganarExperiencia(0, nuevoValor);
        });
        this.events.on('cambiarPlayaPoints', function (nuevoValor) {
            this.ganarExperiencia(1, nuevoValor);
        });
        this.events.on('cambiarVolcanPoints', function (nuevoValor) {
            this.ganarExperiencia(2, nuevoValor);
        });

        this.mapas = [];
        this.fondos = [];

        this.mapas[0] = 'CiudadLevel';
        this.fondos[0] = 'FondoCiudad'

        this.mapas[1] = 'PlayaLevel';
        this.fondos[1] = 'FondoPlaya';

        this.mapas[2] = 'VolcanLevel';
        this.fondos[2] = 'FondoVolcan'

        this.currentPage = 0;
        this.hatID = 0;

        this.experienciaMaxima = 100;
        
        let fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);

        let hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);

        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");

        this.loadHatArrows(hat);
        this.loadMainArrows();

        this.barraXP();

        let timeline = this.tweens.timeline
        this.tweens.add({
            targets: fondo,
            x: 200,
            duration: 3500,
            yoyo: true,
            repeat: -1,
        });
        this.tweens.add({
            targets: fondo,
            x: -200,
            duration: 3500,
            yoyo: true,
            repeat: -1,
        });
        timeline.play();
    }

    continueCreate(){
        let button = this.add.text(this.cameras.main.centerX, 650, 'SELECT', 
            { fontFamily: 'TitleFont', fontSize: 50, color: 'white' }).setOrigin(0.5,0.5);
        button.setInteractive();
        button.on("pointerdown", () => {
           this.loadScene();
        });
    }

    changePage(dir){
        if((this.currentPage + dir) < 0) this.currentPage = 3;
        this.currentPage = (this.currentPage + dir) % 3;
        let fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);
        let hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");
        this.loadMainArrows();
        this.loadHatArrows(hat);

        this.barraXP();

        let timeline = this.tweens.timeline
        this.tweens.add({
            targets: fondo,
            x: 200,
            duration: 3500,
            yoyo: true,
            repeat: -1,
        });
        this.tweens.add({
            targets: fondo,
            x: -200,
            duration: 3500,
            yoyo: true,
            repeat: -1,
        });
        timeline.play();
    }

    changeHat(h, dir){
        h.destroy();
        if((this.hatID + dir) < 0) this.hatID = 21;
        this.hatID = (this.hatID + dir) % 21;
        let hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        this.loadHatArrows(hat);
    }

    loadScene(){
        this.scene.start(this.mapas[this.currentPage], this.hatID);
    }

    loadMainArrows(){
        var arrowButtonRight = this.add.image(1000, this.cameras.main.centerY, 'flecha').setScale(0.15, 0.15).setOrigin(0.5, 0.5);
        var arrowButtonLeft = this.add.image(200, this.cameras.main.centerY, 'flecha').setScale(-0.15, 0.15).setOrigin(0.5, 0.5);

        arrowButtonRight.setInteractive();
        arrowButtonRight.on("pointerdown", () => {
            this.changePage(1);
        });

        arrowButtonLeft.setInteractive();
        arrowButtonLeft.on("pointerdown", () => {
            this.changePage(-1);
        });
    }

    loadHatArrows(h){
        var arrowButtonRight = this.add.image(725, 75, 'flecha').setScale(0.15, 0.15).setOrigin(0.5, 0.5);
        var arrowButtonLeft = this.add.image(475, 75, 'flecha').setScale(-0.15, 0.15).setOrigin(0.5, 0.5);

        arrowButtonRight.setInteractive();
        arrowButtonRight.on("pointerdown", () => {
            this.changeHat(h, 1);
        });

        arrowButtonLeft.setInteractive();
        arrowButtonLeft.on("pointerdown", () => {
            this.changeHat(h, -1);
        });
    }

    barraXP(){
        this.barraProgreso = this.add.graphics();
        this.longitudBarra = [];
        this.actualizarBarraDeProgreso();

        // Puedes llamar a una función para ganar experiencia, por ejemplo, cuando se hace clic
        this.input.on('pointerdown', () => {
            this.ganarExperiencia(this.currentPage, 10);
        });
    }

    ganarExperiencia(nivel, xp) {
        if(this.globalPoints[this.currentPage] < this.experienciaMaxima) {
            this.globalPoints[nivel] += xp; // Ganar 10 puntos de experiencia (puedes ajustar esto)
        }

        // Actualizar la barra de progreso
        this.actualizarBarraDeProgreso();
    
        // Verificar si se alcanzó la experiencia máxima
        if (this.globalPoints[this.currentPage] >= this.experienciaMaxima) {
            console.log('¡Nivel alcanzado!');
            // Puedes agregar lógica adicional aquí, como subir de nivel o reiniciar la barra de experiencia
        }
    }
    
    actualizarBarraDeProgreso() {
        // Limpiar la barra de progreso
        this.barraProgreso.clear();

        // Calcular la longitud de la barra de progreso en función de la experiencia actual y máxima
        this.longitudBarra[this.currentPage] = (this.globalPoints[this.currentPage] / this.experienciaMaxima) * 300;
    
        // Dibujar la barra de progreso actualizada
        this.barraProgreso.fillStyle(0xE6E6FA);
        this.barraProgreso.fillRect(this.cameras.main.centerX - 150, 575, this.longitudBarra[this.currentPage], 20);
        
        // Puedes agregar un borde a la barra si lo deseas
        this.barraProgreso.lineStyle(2, 0x000000);
        this.barraProgreso.strokeRect(this.cameras.main.centerX - 150, 575, 300, 20);
    }
}