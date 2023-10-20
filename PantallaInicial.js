export default class PantallaInicial extends Phaser.Scene{

    constructor(){
        super({key: 'PantallaInicial'}); //Reciben un Json con la propiedad key con el identificador de la escena para cambiar de una a otra facil
    }
    
    init(data){
        console.log(data);
    }
    
    preload(){

        console.log();
    }
    
    create(){
        console.log("create");
       
    }
    
    update(t, dt){
        console.log("update", t, dt);
    }



}