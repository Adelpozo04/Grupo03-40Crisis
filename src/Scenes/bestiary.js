
export default class bestiary extends Phaser.Scene{

constructor(){

    super({key: 'bestiary'});

}

init(data){
    console.log(data);
}

preload(){
    this.load.image('BestiaryFondo', './Assets/Sprites/UI/Bestiary/paper.png');
    this.load.image('skeletonInfo', './Assets/Sprites/UI/Bestiary/esqueletoInfo.png');
}


create(){
    this.add.image(0, 0, 'BestiaryFondo').setScale(1, 1).setOrigin(0, 0);

    this.info = ['skeletonInfo'];


    this.add.image(0, 0, this.info[0]).setScale(1, 1).setOrigin(-0.35, 0);

}


update(t, dt){
    
    


}





}