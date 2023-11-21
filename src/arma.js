export default class Arma extends Phaser.GameObjects.Sprite {
    /**
     * @param {number} daño - daño del arma
     * @param {number} cadencia - velocidad de disparo
     * @param {number} maxAmmo - municion del arma
     * @param {number} actualAmmo - municion actual del arma
     * @param {playerContenedor} player - referencia al player
     */ 

    constructor(daño, cadencia, ammo){
        this.daño = daño;
        this.cadencia = cadencia;
        this.maxAmmo = ammo;
        
        this.añadeMunicion();
    }

    ataca(){
        --this.actualAmmo;
    }

    añadeMunicion(){
        this.actualAmmo = this.maxAmmo;
    }
}