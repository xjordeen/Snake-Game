// Initialize game variables
const blockSize = 25;
const rows = 20;
const columns = 30;
let board;
let context;
let gameOver = false;
let snake = [{ x: blockSize * 5, y: blockSize * 5 }];
let velocityX = 0;
let velocityY = 0;
let foodX;
let foodY;
let foodCount = 0;
let snakeColor = "lime";

// Game setup
window.onload = function () {
  board = document.getElementById("gameCanvas");
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 100);
};

// Update game state
function update() {
  if (gameOver) return;

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  moveSnake();
  drawSnake();

  if (checkCollision()) {
    gameOver = true;
    alert("Game Over");
    restart();
  }

  drawSnake(); // Call drawSnake after moving the snake
}

// Move snake
function moveSnake() {
  const head = {
    x: snake[0].x + velocityX * blockSize,
    y: snake[0].y + velocityY * blockSize,
  };
  snake.unshift(head);
  if (head.x === foodX && head.y === foodY) {
    placeFood();
    foodCount++;
    if (foodCount % 5 === 0) {
      changeSnakeColor();
    }
  } else {
    snake.pop();
  }
}

// Draw snake on canvas
function drawSnake() {
  context.fillStyle = snakeColor; // Set snake color
  snake.forEach((segment) => {
    context.fillRect(segment.x, segment.y, blockSize, blockSize);
  });
}

// Check for collisions
function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= columns * blockSize ||
    head.y < 0 ||
    head.y >= rows * blockSize
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Handle directional changes
function changeDirection(event) {
  const key = event.code;
  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  if (
    directions[key] &&
    (velocityX !== -directions[key].x || velocityY !== -directions[key].y)
  ) {
    velocityX = directions[key].x;
    velocityY = directions[key].y;
  }
}

// Place food randomly
function placeFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Restart the game
function restart() {
  gameOver = false;
  snake = [{ x: blockSize * 5, y: blockSize * 5 }];
  velocityX = 0;
  velocityY = 0;
  foodCount = 0;
  snakeColor = "lime"; // Reset snake color
  board.height = rows * blockSize;
  board.width = columns * blockSize;
  placeFood();
}

// Change snake color
function changeSnakeColor() {
  // Generate a random color
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  snakeColor = randomColor;
}
