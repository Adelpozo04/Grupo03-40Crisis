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

    create(){
        this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        this.mapas = [];
        this.mapas[0] = 'CiudadLevel';
        this.mapas[1] = 'PlayaLevel';
        this.mapas[2] = 'VolcanLevel';
        this.currentPage = 0;
        let thumb = this.add.image(0, 0, 'fondo');
        thumb.setScale(0.5, 0.5).setOrigin(300, 300);
    }

    changePage(){
        this.currentPage = this.currentPage % 3;
    }
}