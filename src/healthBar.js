

export default class HealthBar extends Phaser.GameObjects.Graphics{

constructor( scene, x, y, initialValue, width, heigth){

    super(scene);

    this.x = x;
    this.y = y;

    this.w = width;
    this.h = heigth;

    this.maxValue = initialValue;

    this.value = initialValue;

    this.draw();

    scene.add.existing(this);

}

//Si el valor de vida cambia se aplica el cambiomy se vuelve a dibujar
changeValue(amount){

    this.value += amount;

    this.draw();

}

//Dibuja la barra de vida
draw(){
    //Primero se borra lo anterior
    this.clear();

    //Se pone un borde negro que sirva como margen algo más grande que la barra normal
    this.fillStyle(0x000000);

    this.fillRect(x - 2, y - 2, w + 4, h + 4);

    //se pone una barra blanca por encima que sirve para marcar la vida perdida
    this.fillStyle(0xffffff);

    this.fillRect(x, y, w, h);

    //Se pone una barra roja encima de la blanca con el mismo tamaño
    this.fillStyle(0xff0000);

    //Su ancho dependera de su valor actual respecto al maximo, siguiendo una regla de tres, de esta froma si disminuye la vida se deja ver
    //la barra blanca
    var currentHeatlh = (this.value * this.w) / this.maxValue;

    this.fillRect(x, y, currentHeatlh, h);
}





}