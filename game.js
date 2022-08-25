const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnRight = document.querySelector("#right");
const btnLeft = document.querySelector("#left");
const livesSpan = document.querySelector("#lives");
const spanTime = document.querySelector("#time");
const spanRecord = document.querySelector("#record");
const newGameBtn = document.querySelector("#newGame");
const recordMensaje = document.querySelector("#record_mensaje");
const puntajeSpanModal = document.querySelector("#puntajeSpanModal");



let enemyPositions = [];

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
}


window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);


function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvasSize = Number(canvasSize.toFixed(0));

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = Number((canvasSize / 10).toFixed(0));

  playerPosition.x = undefined;
  playerPosition.y = undefined; 
  
  startGame();
}

function newGame(){
  level=0;
  lives=3;
  clearInterval( timeInterval )
  timeStart = undefined
  playerTime = undefined
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame();
}

function startGame() {
  
  game.font = elementSize * 0.8 + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return
  }

  if(!timeStart){
    timeStart = Date.now();
    timeInterval = setInterval(showTime,100);

    showRecord();
  }


  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));

  showLives();
  
  enemyPositions = [];
  game.clearRect(0,0,canvasSize, canvasSize);

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      /* Player */

      if ( col == "O") {
        if(!playerPosition.x && !playerPosition.y ){
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      }else if(col == "I"){
        giftPosition.x = posX
        giftPosition.y = posY
      }else if (col == "X"){
        enemyPositions.push({
          x: posX,
          y: posY 
        })
      }

      game.fillText(emoji, posX, posY);
    });
  });

  // Renderizado del jugador 
  movePlayer();
}




newGameBtn.addEventListener('click', newGame);
newGameBtnModal.addEventListener('click', newGame);
reiniciarBtnModal.addEventListener('click', newGame);

function movePlayer() {

  const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2)
  const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2)

  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision)  {
    levelWin();
  } 

  const enemyCollision = enemyPositions.find( enemy => {
    const enemyCollisionx = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
    const enemyCollisiony = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
    return enemyCollisionx && enemyCollisiony
  } )

  if (enemyCollision) {
    lives--;
    levelFail();
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);

}


function levelWin(){
  level++;
  console.log('Subiste de nivel');
  startGame();
}

function levelFail(){

  console.log('Perdiste, vuelve desde el principio');

  if (lives <= 0) {
    showModalFail();
    level = 0;
    lives = 3;
    timeInterval = undefined;
  }

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  setCanvasSize();
}


function gameWin(){
  clearInterval(timeInterval);
  console.log('Terminaste el juego');

  const recordTime = localStorage.getItem('record_time');
  const playerTime = spanTime.innerHTML = Date.now() - timeStart;


  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      recordMensaje.innerHTML = 'SUPERASTE EL RECORD 🤩!!!'

    }else{
      recordMensaje.innerHTML = 'Lo siento, no superaste el record 😓';
    }
  }else{
    localStorage.setItem('record_time', playerTime);
    recordMensaje.innerHTML = 'Nuevo record, es la primera marca 😎!, ahora trata de superarlo ;)'
  }

  console.log({recordTime,playerTime});
  showModal();
  /* newGame(); */
}

function showLives() {

  const heartsArray = Array(lives).fill( emojis['HEART']) //[1,2,3]

  livesSpan.innerHTML = "";
  heartsArray.forEach(heart => livesSpan.append(heart))
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
  puntajeSpanModal.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  spanRecord.innerHTML = localStorage.getItem('record_time');
}


btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);


window.addEventListener("keydown", (e) => {
  let tecla = e.key;

  switch (tecla) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    default:
      break;
  }
});


function moveUp() {

  if ((playerPosition.y - elementSize) < elementSize) {
    console.log("out");
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}

function moveLeft() {

  if ((playerPosition.x - elementSize) < elementSize) {
    console.log("out");
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}

function moveRight() {

  if ((playerPosition.x + elementSize) > canvasSize) {
    console.log("out");
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {

  if ((playerPosition.y + elementSize) > canvasSize) {
    console.log("out");
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}


