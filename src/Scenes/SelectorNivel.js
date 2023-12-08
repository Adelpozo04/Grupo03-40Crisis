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
        
        let fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);
        let hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");
        this.loadHatArrows(hat);
        this.loadMainArrows();
        

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
        let button = this.add.text(this.cameras.main.centerX, 600, 'SELECT', 
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
}