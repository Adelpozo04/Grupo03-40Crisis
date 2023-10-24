# Videojuego Navegador "40 Crisis"


 El siguiente proyecto se trata de un trabajo uninversitario.

## Redes sociales

 [Twitter](https://x.com/Sombrereros_P?t=teBMrrU6sPUA7qscz4yFDQ&s=09)                                               
 [Instagram](https://www.instagram.com/sombrereros_production/)

## Descrición general del proyecto

 ***40 Crisis*** se trata de un videojuego con oleadas infinitas de vista cenital donde se controla a un personaje quetendrá un arsenal de armas iniciales (ataque cuerpo a cuerpo, pistola, trinchera) con el que defenderse de los enemigos. Al aumentar el número de rondas aumenta el número de enemigos diferentes y desbloquearás nuevas armas, dependiendo de la clase que decidas ultilizar para eliminar a tus enemigos.

## Enlace a la pagina web

## GDD (game design document)

### 1. Ficha técnica
**-Título:** 40 Crisis  
**-Género:** Arcade, rogue-like, supervivencia, acción  
**-Target:** Gente interesada en acción y superación de su propia puntuación  
**-Rating:** 12+ años  
**-Plataforma:** PC, navegador  
**-Modos de juego:** 1 jugador  

### 2. Jugabilidad
#### 2.1 Movimiento del personaje
 Movimiento en todas las direcciones, sin salto.
#### 2.2 Cámara 
 Cámara cenital que sigue al jugador.
#### 2.3 Mecánicas del jugador
El jugador tiene 4 tipos de combate basado en sus personalidades. Estos pueden ser cambiados a su voluntad y van evolucionando a medida que progresa en ese estilo. Nota: (las características se han atribuido del 1-10 en todos los ámbitos menos la vida. Estas están abiertas al cambio tras testeos).   
 - Explorador: Dominio de armas a corto alcance. Esta característica se le atribuye a esta personalidad ya que incluye personas las cuales evitan la monotonía y el aburrimiento, les gusta arriesgarse (al estar más cerca de los enemigos te arriesgas más) y son buenos en el uso de herramientas.
    - Puños: Daño 4/ Alcance 2/ Cadencia 2 (doble golpe).
    - Bates: Daño 6/ Alcance 3/ Cadencia 3 (Alejar enemigos).
    - Espada: Daño 8/ Alcance 3/ Cadencia 6 (sin retroceso).
 - Centinela: Uso de armas a distancia con munición compartida por todas (balas). Esta característica se le atribuye a esta personalidad ya que incluye personas lógicas y enfocados en los hechos (+distancia = +seguridad) y que además son buenos administrando cosas (en este caso las balas).
    - Tirachinas/Pistola: Daño 2/ Alcance  Inf/ Cadencia 4.
    - Rifle: Daño 3/ Alcance inf / Cadencia 10.
    - Franco: Daño 10/ Alcance inf/ Cadencia 1.
 - Analista: Uso de trampas para entorpecer o hacer daño a enemigos. Esta característica se le atribuye a esta personalidad ya que incluye personas estratégicas y muy analíticas (colocación y uso correcto de las trampas), las cuales siempre buscan un camino o crean uno (uso del muro como obstáculo).
    - Muro: Instancia que obstaculiza a los enemigos con una vida fija (munición).  
    - Mina:Daño 6/ Radio 4 / Cooldown tras explosion 3.
    - C4: Daño 6/ Radio 4/ Tu lo activas (cooldown).
 -  Pacifista: Uso de elementos no mortíferos para cambiar el comportamiento enemigo. Esta característica se le atribuye a esta personalidad ya que incluye personas entusiastas y creativas que son capaces de cautivar a las personas (en este caso cambiando y alterando el comportamiento de los enemigos).
    - Cepo: stunear al enemigo x segundos (cooldown).
    - Empuje: hace retroceder mucho a los enemigos sin dañarles.
    - Embrujar: hace que uno de los enemigos ataque al resto durante x segundos y tras ello vuelve a atacar al jugador. No a bosses. El jugador lo puede atacar.
  
    ##### ***Armas especiales***

    - Explorador y Centinela: Su combinación nos da una bayoneta que al atacar cuerpo a cuerpo dispara un proyectil en línea recta. Melee: Daño 6/ Alcance 3 Distancia: Daño 4/ Alcance inf/ cadencia general 5.  
    - Centinela y Analista: Su combinación nos da un lanzaminas que dispara minas a una distancia lejana del jugador haciendo un gran daño en área. Daño 7/ Radio 5/ Cadencia 5.
    - Analista y Pacifista: Su combinación nos da muñeco de nieve que explota el cual no solo daña a los enemigos sino que además los paraliza por un tiempo, haciendo como que los congela. Daño 4/ Radio 6/ Parálisis por 5 segundos/ Cooldown de 20 segundos.
    - Pacifista y Explorador: Su combinación nos da una gran manopla atada a un palo la cual daña a los enemigos y los aleja enormemente. Daño 6/ Alcance 3/ Cadencia 2.
 #### 2.4 Mecánicas del escenario
El escenario es una mapa cerrado con diferentes obstáculos destruibles por el enemigo y elementos que son capaces de mover, dañar, y aplicar debuffs o buffs al jugador y enemigos. Cada mapa se desbloquea al llegar a x puntos del anterior. Los mapas son lugares reales con elementos sobrenaturales. Cada mapa tiene un pase de batalla en el cual podrás desbloquear varias recompensas al llegar a x puntos.  
#### 2.5 Enemigos
1. **Parguela (Zombie)**: Persigue al jugador y cuando está cerca de él le hace daño. Daño 2 /Velocidad 4  /Vida 15.  Soltar Munición/Muros: 20%.
2. **Esqueleto**: Persigue al jugador a gran velocidad: Daño 2 / Velocidad 10 / Vida 10. Soltar Munición/Muros: 30%.
3. **Hamburguesa carnívora**: Enemigo que persigue al jugador con gran resistencia y poca velocidad. Daño 5/ Velocidad 2/ Vida 50. Soltar Munición/Muros: 50%.
4. **Caracol**: enemigo que te persigue y si te toca te mata de un golpe. Daño inf / Velocidad 0.5/ Vida inf. Soltar Munición/Muros: nada.
5. **Lutano**: Enemigo que te persigue y va dejando trampas en el mapa que al tocar al jugador lo paralizan por x segundos. Daño 3/ Velocidad 5/ Vida 15. Soltar Munición/Muros: 25%.
6. **Robot**: ataca al jugador a distancia cuando llega a x proximidad de su área. Daño 1 / Velocidad 4 / Vida 10. Soltar Munición/Muros: 40%.
7. **Mono**: Se mueve de forma random por el mapa pero si aparece un potenciador va directo hacia él. Daño 0/ Velocidad 9/ Vida 10. Soltar Munición/Muros: 100%.

   ***Enemigos nice to have***
1. Fantasma: Persigue al jugador saltándose cualquier tipo de trampa, muro… (obstáculo). Daño  3/Velocidad 3/ Vida 10.
2. Payaso: Persigue al jugador y al acercarse a él explota. Al morir explota igualmente y la explosión daña a jugador y enemigos. Daño 7/ Velocidad 8/ Vida 5.

### 3. Diseño de nivel 
#### 3.1  Imagen del nivel
*En todos los niveles hay puntos para recoger power ups marcados con amarillo*  
![Mapa de ciudad] 





    
    
    

 

 
      


 





