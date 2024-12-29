const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 800);
const cellSize = 25;
const snakeColor = "red";
const foodColor = "green";
const snake = [
    { x: cellSize * 2, y: 0 },
    {x: cellSize, y: 0},
    { x: 0, y: 0 }];

let userActive = false;
let xVelocity = 0;
let yVelocity = 0;
let foodX;
let foodY;


let score = 0;


// 38 39 40 37

function GameRunning() {
  userActive = true;
//   gameOver();
  food();
  drawFood();
  animation();
  drawSnake();
  console.log("Game is running");
  moveSnake();
}

function food() {
  foodX = Math.floor(Math.random() * (canvasWidth / cellSize)) * cellSize;
  foodY = Math.floor(Math.random() * (canvasHeight / cellSize)) * cellSize;
}

// food();

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, cellSize, cellSize);
}

// food();

function animation() {
  if(userActive == true){
    setTimeout(() => {
    moveSnake();
    gameOver();
    clearBoard();
    drawSnake();
    animation();
    drawFood();
  }, 100);
}
else{
  console.log("Game Over");
}
}

function clearBoard() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawSnake() {
  snake.forEach((cell) => {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(cell.x, cell.y, cellSize, cellSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(cell.x, cell.y, cellSize, cellSize);
  });
}

function userInput() {
window.addEventListener('keydown', (e) => {
  if ((e.keyCode === 37 && xVelocity === 0)) { // Left
      xVelocity = -cellSize;
      yVelocity = 0;
  }
  if ((e.keyCode === 38 && yVelocity === 0)) { // Up
      xVelocity = 0;
      yVelocity = -cellSize;
  }
  if ((e.keyCode === 39 && xVelocity === 0)) { // Right
      xVelocity = cellSize;
      yVelocity = 0;
  }
  if ((e.keyCode === 40 && yVelocity === 0)) { // Down
      xVelocity = 0;
      yVelocity = cellSize;
  }
});
}



userInput();

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score++;
    console.log(score);
    food();
  } else {
    snake.pop();
  }
}


function gameOver() {
     if (snake[0].x < 0 || snake[0].x === canvasWidth || snake[0].y < 0 || snake[0].y === canvasHeight) {
//     console.log("Game Over");
        userActive = false;

//   console.log('game over')
  console.log(snake[0].x, snake[0].y)
     }
}

GameRunning();
gameOver();

