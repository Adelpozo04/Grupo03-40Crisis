var party = [
    {name: 'Bat', id: 'bat1', hp: 20, maxHp: 20, currentHP: 20},
    {name: 'Slime', id: 'slime', hp: 50, maxHp: 50, currentHP: 50},
    {name: 'Bat', id: 'bat2', hp: 20, maxHp: 20, currentHP: 20}
];

window.onload = function () {
    var list = document.getElementById('party-monsters');
    var form = document.querySelector('form[name=killing-machine]');
    var button = form.querySelector('button[type=submit]');
    var lastRender = 0;
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    var bgImage = document.getElementById('background');
    var batImage = document.getElementById('bat');
    var RIPImage = document.getElementById('tumba');
    var Slime = document.getElementById('slime');



    //Crear lista de enemigos visible
    party.forEach(function (character) {
        var li = document.createElement('li');
        li.innerHTML = character.name + ' (<code>' + character.id + '</code>)';
        li.dataset.charaid = character.id;
        list.appendChild(li);
    });

    var select = document.querySelector('select[name=chara]');

    //Crear el dropdown
    party.forEach(function (character) {
        var option = document.createElement('option');
        option.innerHTML = character.name;
        option.value = character.id;
        select.appendChild(option);
    });

    function render() {
        requestAnimationFrame(function (t) {
          context.clearRect(0, 0, 800, 600);
          renderParty(t);
          //console.log('Delta time:', t - lastRender);
          lastRender = t;
          render();
        });
    }

    function renderBackground() {
        context.drawImage(bgImage, 0, 0);
    }
      
    function renderCharacters(t) {
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;
        var image;
        party.forEach(function (char, index) {
          var x = index * charaSpace + centerOffset;
          var y;
          if (char.hp === 0) {
            image = RIPImage;
            y = 500;
          } else if (char.name === 'Bat') {
            image = batImage;
            y = 200 * Math.sin(t / 150) + 200; // flotando en el aire.
          } else if (char.name === 'Slime') {
            image = Slime;
            x = 25 * Math.sin(t / 150) + 400;
            y = 1 * Math.sin(t / 150) + 400; // en el suelo pero no en la tumba.
          }
          context.drawImage(image, x - 100, y, 200, 100);
        });
    }
    
    function renderUI() {
        var width = 100;
        var semiWidth = width / 2;
        var height = 20;
        var semiHeight = height / 2;
        var charaSpace = 800 / party.length;
        var centerOffset = charaSpace / 2;

        party.forEach(function (char, index) {
          var x = index * charaSpace + centerOffset;
          var y = 500;
            


          if (char.hp > 0) {

            if(char.currentHP > char.hp){
                var lifeArea = Math.floor(char.currentHP / char.maxHp * width);
                if(char.currentHP >= char.maxHp / 2){
                    context.fillStyle = 'green';
                }
                else if(char.currentHP >= char.maxHp / 4){
                    context.fillStyle = 'yellow';
                }
                else{
                    context.fillStyle = 'red';
                }
                
                context.fillRect(x - semiWidth, y - semiHeight, lifeArea, height);
                char.currentHP -= 0.05;
            }
            else{
                var lifeArea = Math.floor(char.hp / char.maxHp * width);
                if(char.currentHP >= char.maxHp / 2){
                    context.fillStyle = 'green';
                }
                else if(char.currentHP >= char.maxHp / 4){
                    context.fillStyle = 'yellow';
                }
                else{
                    context.fillStyle = 'red';
                }
                context.fillRect(x - semiWidth, y - semiHeight, lifeArea, height);
            }

                               
            context.lineWidth = 3;
            context.strokeStyle = 'black';
            context.strokeRect(x - semiWidth, y - semiHeight, width, height);
          }
        });
    }


    function renderParty(t) {
        renderBackground();
        renderCharacters(t);
        renderUI();

    }
    
    render();

    

    function findCharById(charaID) {
        return party.filter(function (char) { return char.id === charaID; })[0];
     }

    //Matar enemigo
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        var character = findCharById(charaID);
        character.hp -= 5;
        console.log(character.name + " " + character.hp);
        if (character.hp <= 0) {
            character.hp = 0;
            var li = list.querySelector('[data-charaid=' + charaID + ']');
            li.classList.add('dead');
            button.disabled = true;
        }
        
    });

    select.addEventListener("change", (event) =>{

        var charaID = form.querySelector('[name=chara]').value;
        var li = list.querySelector('[data-charaid=' + charaID + ']');

        if(li.classList.contains("dead")){

            button.disabled = true;
        }
        else{
            button.disabled = false;
        }
    });
};

