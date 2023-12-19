import playerContenedor from '../Player/playerContenedor.js';
import CiudadLevel from './CiudadLevel.js';
import PlayaLevel from './PlayaLevel.js';

export default class SelectorNivel extends Phaser.Scene {

    constructor(){
        super({key: 'SelectorNivel'});

        this.currentPage = 0;
        this.hatID = 0;
        this.experienciaMaxima = 7000;
        this.hatUnlocked = [];
        for(var i = 0; i < 21; ++i){
            this.hatUnlocked[i] = false;
        }
        this.setExperience();
        this.getUnlocked();
        this.globalPoints[1] += 7000;
    }

    init(data){
        if (data.datos !== null) this.globalPoints[data.level] += data.datos;
        this.globalPoints[this.currentPage]++;
        this.globalPoints[this.currentPage]--;
        console.log(this.globalPoints[this.currentPage]);
    }

    preload(){

        console.log(this.xpGained);

        this.load.image('bestiaryButton', './Assets/Sprites/UI/Bestiary/button.png');

        console.log(this.globalPoints);
        console.log(this.hatUnlocked);
        /*window.addEventListener("beforeunload", event => {
            console.log("lo hiso");
		});

		addEventListener("load", event => {
            console.log("lo hiso");
		});*/

    }

    loadFont(name, url) {
		let self = this;
	    let newFont = new FontFace(name, `url(${url})`);
	    newFont.load()
	
	    .then(function (loaded) { 
	        document.fonts.add(loaded);
	        self.continueCreate();
	    }).catch(function (error) {
	        return error;
    	});
	}

    create(){
        this.effectConfirm = this.sound.add('confirmarEffect', {loop: false});
        this.effectMoveOptions = this.sound.add('moverOpcionesEffect', {loop: false});

        this.events.on('resume', (xp) => {
            console.log(xp);
        });

        // Carga de los niveles
        this.setMaps();

        this.backgroundMusic = this.sound.add('selectorMusic', {loop: true});

        this.backgroundMusic.play();

        // Pagina inicial
        let fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);

        this.recompensas();

        console.log(this.hatUnlocked[0]);
        console.log(this.hatID);
        if(this.hatUnlocked[this.hatID]){
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }
        else{
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'nohat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }

        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF"); // Boton de inicio

        this.loadHatArrows(this.hat); // Flechas
        this.loadMainArrows();

        this.barraXP(); // Pase de batalla

        // Tweens del fondo
        this.tweens.add({
            targets: fondo,
            x: 200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        this.tweens.add({
            targets: fondo,
            x: -200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
    }

    // Boton de inicio
    continueCreate(){
        let button = this.add.text(this.cameras.main.centerX, 650, 'SELECT', 
            { fontFamily: 'TitleFont', fontSize: 50, color: 'white' }).setOrigin(0.5,0.5);
        button.setInteractive();
        button.on("pointerdown", () => {
            this.backgroundMusic.destroy();
            this.effectConfirm.play();
            this.loadScene(); // Se carga el nivel en caso de click
        });
    }

    // Cambio de pagina
    changePage(dir){

        this.effectMoveOptions.play();

        // Comprobacion para ciclar en ambos sentidos
        if((this.currentPage + dir) < 0) this.currentPage = 3;
        this.currentPage = (this.currentPage + dir) % 3; // Cuenta para poder ciclar el array

        // Pagina nueva
        let fondo = this.add.image(0, 0, this.fondos[this.currentPage]).setScale(1, 1).setOrigin(0, 0);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, this.mapas[this.currentPage]).setScale(0.2, 0.2).setOrigin(0.5, 0.5);

        this.loadFont("TitleFont", "./Assets/Fonts/RUBBBB__.TTF");

        this.loadMainArrows();
        this.loadHatArrows(this.hat);

        this.barraXP();

        this.tweens.add({
            targets: fondo,
            x: 200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
        this.tweens.add({
            targets: fondo,
            x: -200,
            duration: 3500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
        });
    }

    setMaps(){
        // El nivel
        this.mapas = [];
        // El fondo en dicha pagina
        this.fondos = [];

        this.mapas[0] = 'CiudadLevel';
        this.fondos[0] = 'FondoCiudad'

        this.mapas[1] = 'PlayaLevel';
        this.fondos[1] = 'FondoPlaya';

        this.mapas[2] = 'VolcanLevel';
        this.fondos[2] = 'FondoVolcan';
    }

    setExperience(){
        // XP en cada nivel
        this.globalPoints = [];
        this.globalPoints[0] = 0; // Ciudad
        this.globalPoints[1] = 0; // Playa
        this.globalPoints[2] = 0; // Volcan

        
		this.globalPoints[0] = window.localStorage.getItem('ciudadpoints');
        this.globalPoints[1] = window.localStorage.getItem('playapoints');
        this.globalPoints[2] = window.localStorage.getItem('volcanpoints');

        // Evento para poder subir experiencia segun el nivel jugado
        /*this.registry.events.on('cambiarXP', (nivel) => {
            this.ganarExperiencia(nivel);
        });*/
    }

    getUnlocked(){
        for(var i = 0 ; i < 21 ; ++i){
            console.log(window.localStorage.getItem('sombrero' + i));
            this.hatUnlocked[i] = window.localStorage.getItem('sombrero' + i);
            if (this.hatUnlocked[i] == "true") this.hatUnlocked[i] = true;
            else if(this.hatUnlocked[i] == "false" || this.hatUnlocked[i] == null) this.hatUnlocked[i] = false;
            console.log(this.hatUnlocked[i]);
        }
    }

    setUnlocked(){
        for(var i = 0 ; i < 21 ; ++i){
            window.localStorage.setItem('sombrero' + i, this.hatUnlocked[i]);
        }
    }

    // Cambio de sombrero
    changeHat(h, dir){
        this.effectMoveOptions.play();

        h.destroy();
        // Comprobacion para ciclar en ambos sentidos
        if((this.hatID + dir) < 0) this.hatID = 21;
        this.hatID = (this.hatID + dir) % 21;

        this.recompensas();

        console.log(this.hatID, this.hatUnlocked[this.hatID]);
        // Nuevo sombrero
        if(this.hatUnlocked[this.hatID]){
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'hat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }
        else {
            this.hat = this.add.image(this.cameras.main.centerX, 75, 'nohat', this.hatID).setScale(0.5, 0.5).setOrigin(0.5, 0.5);
        }

        this.loadHatArrows(this.hat);
    }

    // Carga de escena
    loadScene(){

        console.log(this.mapas[this.currentPage], this.hatID)

        window.localStorage.setItem('ciudadpoints', this.globalPoints[0]);
        window.localStorage.setItem('playapoints', this.globalPoints[1]);
        window.localStorage.setItem('volcanpoints', this.globalPoints[2]);

        this.setUnlocked();
        console.log(this.hatUnlocked[this.hatID]);

        if(this.hatUnlocked[this.hatID]){
            this.scene.start(this.mapas[this.currentPage], this.hatID);
        }
        else{       
            this.scene.start(this.mapas[this.currentPage], -1);
        }
    }

    // Flechas para selccionar nivel
    loadMainArrows(){
        let mainArrowRight = this.add.image(1000, this.cameras.main.centerY, 'flecha').setInteractive().setOrigin(0.5, 0.5);
        let mainArrowLeft = this.add.image(200, this.cameras.main.centerY, 'flecha').setInteractive().setOrigin(0.5, 0.5);

        mainArrowRight.on("pointerdown", () => {
            this.changePage(1);
        });

        mainArrowLeft.on("pointerdown", () => {
            this.changePage(-1);
        });
    }

    // Flechas para seleccionar sombrero
    loadHatArrows(h){
        let hatArrowRight= this.add.image(725, 75, 'flecha').setInteractive();
        let hatArrowLeft = this.add.image(475, 75, 'flecha').setInteractive();

        hatArrowRight.on("pointerdown", () => {
            this.changeHat(h, 1);         
        });
        
        hatArrowLeft.on("pointerdown", () => {
            this.changeHat(h, -1);
        });
    }

    barraXP(){
        // Carga de la barra
        this.barraProgreso = this.add.graphics();
        this.longitudBarra = [];

        // Actualización
        this.actualizarBarraDeProgreso();

        // Puedes llamar a una función para ganar experiencia, por ejemplo, cuando se hace clic SOLO DEBUG
        /*
        this.input.on('pointerdown', () => {
            this.ganarExperiencia(this.currentPage, 10);
        });
        */
    }

    ganarExperiencia(nivel) {
        console.log(this.xpGained);
        if(this.globalPoints[this.currentPage] < this.experienciaMaxima) {
            this.globalPoints[nivel] += this.xpGained; // Ganar 10 puntos de experiencia (puedes ajustar esto)
        }

        // Actualizar la barra de progreso
        this.actualizarBarraDeProgreso();     
    }
    
    actualizarBarraDeProgreso() {
        // Limpiar la barra de progreso
        this.barraProgreso.clear();

        // Calcular la longitud de la barra de progreso en función de la experiencia actual y máxima
        this.longitudBarra[this.currentPage] = (this.globalPoints[this.currentPage] / this.experienciaMaxima) * 300;
    
        // Dibujar la barra de progreso actualizada
        this.barraProgreso.fillStyle(0xE6E6FA);
        this.barraProgreso.fillRect(600 - 150, 575, this.longitudBarra[this.currentPage], 20);

        // Borde
        this.barraProgreso.lineStyle(2, 0x000000);
        this.barraProgreso.strokeRect(600 - 150, 575, 300, 20);
    }

    recompensas(){
        console.log(this.globalPoints[this.currentPage]);
        // Verificar si se alcanzó la experiencia máxima
        for (var i = 1; i <= 3; ++i) {
            var experienciaUmbral = this.experienciaMaxima;
            for (var k = 6 * i + i - 1; k >= ((i - 1) * 7); --k) {
                console.log(this.globalPoints[i - 1], (experienciaUmbral * k + 1) / 7);
                if (this.globalPoints[i - 1] * i >= (experienciaUmbral * k + 1) / 7) {
                    console.log('entro');
                    this.hatUnlocked[k % (6 * i)] = true;
                }
            }
        }
    }
}