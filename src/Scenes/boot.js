export default class boot extends Phaser.Scene{

    constructor(){
        super({key: 'boot'})
        
    }

    preload(){

        this.load.image('logo', './Assets/Sprites/UI/Load/logo.png');

        this.load.audio('introSound', ['./Assets/Audio/Effects/UI/Logo.wav']);

    }

    create()
    {
        this.scene.start("load");

    }

}