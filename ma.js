const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreBoard = document.getElementById('scoreBoard');

let score = 0;

const player = {
    width: 50,
    height: 50,
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    speed: 5,
    dx: 0
};

const fallingObject = {
    width: 30,
    height: 30,
    x: Math.random() * (canvas.width - 30),
    y: 0,
    speed: 2
};

// Draw player on canvas
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw falling object on canvas
function drawFallingObject() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fallingObject.x, fallingObject.y, fallingObject.width, fallingObject.height);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move player left or right
function movePlayer() {
    player.x += player.dx;

    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Move falling object down
function moveFallingObject() {
    fallingObject.y += fallingObject.speed;

    // Reset falling object if it goes off the bottom of the canvas
    if (fallingObject.y + fallingObject.height > canvas.height) {
        fallingObject.x = Math.random() * (canvas.width - fallingObject.width);
        fallingObject.y = 0;
    }
}

// Check for collision between player and falling object
function checkCollision() {
    if (
        player.x < fallingObject.x + fallingObject.width &&
        player.x + player.width > fallingObject.x &&
        player.y < fallingObject.y + fallingObject.height &&
        player.y + player.height > fallingObject.y
    ) {
        // Reset falling object if collision occurs
        fallingObject.x = Math.random() * (canvas.width - fallingObject.width);
        fallingObject.y = 0;
        score++;
        scoreBoard.textContent = `Score: ${score}`;
    }
}

// Update canvas drawing and animation
function update() {
    clearCanvas();
    drawPlayer();
    drawFallingObject();

    movePlayer();
    moveFallingObject();
    checkCollision();

    requestAnimationFrame(update);
}

// Keydown event to move player
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    }
}

// Keyup event to stop player
function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = 0;
    }
}

// Event listeners for keydown and keyup
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start the game
update();