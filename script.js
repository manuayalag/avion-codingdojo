let player = {
  left: 450,
  top: 520,
};

let enemies = [
  { left: 350, top: 200 },
  { left: 450, top: 250 },
  { left: 550, top: 300 },
  { left: 650, top: 350 },
];

let missiles = [];

function drawPlayer() {
  content = "";
  content =
    "<div class ='player' style ='left :" +
    player.left +
    "px ; top: " +
    player.top +
    "px'></div>";
  document.getElementById("players").innerHTML = content;
}

function drawEnemies() {
  content = "";
  console.log(enemies);
  for (var i = 0; i < enemies.length; i++) {
    content +=
    "<div class ='enemy' style ='left :" +
    enemies[i].left +
    "px ; top: " +
    enemies[i].top +
    "px'></div>";
  }
  console.log(content);
  document.getElementById("enemies").innerHTML = content;
}

function drawMissiles(){
    content = "";
    for(var i = 0; i < missiles.length; i++){
        content += "<div class='missile' style='left:"+missiles[i].left+"px; top:"+missiles[i].top+"px'></div>"
    }
    
    document.getElementById("missiles").innerHTML = content;
}
function moveEnemies(){
    for(var i = 0; i < enemies.length; i++){
        enemies[i].top = enemies[i].top + 2;
    }
}

function moveMissiles(){
    for(var i = 0; i < missiles.length; i++){
        missiles[i].top = missiles[i].top - 10;
        if(missiles[i].top < 0){    //eliminar si se sale de la pantalla.
            missiles.splice(i,1);
        }
    }
}
// detecta si el misil conecta con el enemigo
function detectCollision() {
    for (var i = 0; i < missiles.length; i++) {
      for (var j = 0; j < enemies.length; j++) {
        if (
          missiles[i].top <= enemies[j].top + 30 && // si el misil está arriba del enemigo
          missiles[i].top >= enemies[j].top && // si el misil está debajo del enemigo
          missiles[i].left >= enemies[j].left && // si el misil está a la derecha del enemigo
          missiles[i].left <= enemies[j].left + 70 // si el misil está a la izquierda del enemigo
        ) {
          // Si hay una colisión
          enemies.splice(j, 1); // Eliminar el enemigo
          missiles.splice(i, 1); // Eliminar el misil
          drawEnemies(); // actualizar enemigos
          drawMissiles(); // actualizar misiles
          return;
        }
      }
    }
  }
  //genera más enemigos
  function generateEnemies() {
    let newEnemy = {
      left: Math.floor(Math.random() * 830), // Posición aleatoria en el ancho de la pantalla (900 - ancho del enemigo)
      top: -20,     // Iniciar desde la parte superior de la pantalla
    };
    enemies.push(newEnemy); // Agregar el nuevo enemigo 
  }

document.onkeydown = function (e) {
  if (e.keyCode == 37 && player.left > 0) {
    //left
    player.left = player.left - 10;
  }
  if (e.keyCode == 39 && player.left < 850) {
    //right
    player.left = player.left + 10 ;
  }
  if (e.keyCode == 38 && player.top > 500) {
    //up
    player.top = player.top - 10;
  }
  if (e.keyCode == 40 && player.top < 625) {
    //down
    player.top = player.top + 10;
  }
  if (e.keyCode == 32) {
    //fire
    missiles.push({left: (player.left + 34) , top: (player.top -8)});
    drawMissiles();
  }
  drawPlayer();
};

function gameLoop(){
    drawPlayer();

    moveEnemies();
    drawEnemies();
    drawMissiles();
    moveMissiles();
    detectCollision();
    if(Math.random()*10  < 1){
        generateEnemies();          //probabilidad de generar enemigos
    }
   
    setTimeout(gameLoop,100);
}
gameLoop();
