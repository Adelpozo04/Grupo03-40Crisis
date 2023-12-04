export default class SelectorNivel extends Phaser.Scene {

    constructor(){
        super({key: 'SelectorNivel'});
    }

    init(data){
        console.log(data);
    }

    preload(){
        this.load.image('CiudadLevel', './Assets/Sprites/UI/Selector/MapaCiudadSelection.png');
        this.load.image('PlayaLevel', './Assets/Sprites/UI/Selector/TilePlayaSelection.png');
        this.load.image('VolcanLevel', './Assets/Sprites/UI/Selector/MapaVolcanSelection.png');
        this.load.image('flecha', './Assets/Sprites/UI/Selector/flecha.jpg');
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
        this.mapas[0] = 'CiudadLevel';
        this.mapas[1] = 'PlayaLevel';
        this.mapas[2] = 'VolcanLevel';
        this.currentPage = 0;
        
        let fondo = this.add.image(0, 0, this.mapas[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);
        let arrowButtonRight = this.add.image(1000, this.cameras.main.centerY, 'flecha').setScale(0.1, 0.1).setOrigin(0.5, 0.5);
        let arrowButtonLeft = this.add.image(200, this.cameras.main.centerY, 'flecha').setScale(-0.1, 0.1).setOrigin(0.5, 0.5);
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");

        arrowButtonRight.setInteractive();
        arrowButtonRight.on("pointerdown", () => {
            this.changePage(1);
        });

        arrowButtonLeft.setInteractive();
        arrowButtonLeft.on("pointerdown", () => {
            this.changePage(-1);
        });

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
            this.scene.start(this.mapas[this.currentPage]);
        });
    }

    changePage(dir){
        if((this.currentPage + dir) < 0) this.currentPage = 3;
        this.currentPage = (this.currentPage + dir) % 3;
        let fondo = this.add.image(0, 0, this.mapas[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);
        let arrowButtonRight = this.add.image(1000, this.cameras.main.centerY, 'flecha').setScale(0.1, 0.1).setOrigin(0.5, 0.5);
        let arrowButtonLeft = this.add.image(200, this.cameras.main.centerY, 'flecha').setScale(-0.1, 0.1).setOrigin(0.5, 0.5);
        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");

        arrowButtonRight.setInteractive();
        arrowButtonRight.on("pointerdown", () => {
            this.changePage(1);
        });

        arrowButtonLeft.setInteractive();
        arrowButtonLeft.on("pointerdown", () => {
            this.changePage(-1);
        });

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
}