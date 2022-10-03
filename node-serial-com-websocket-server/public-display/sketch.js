const URL = `http://${window.location.hostname}:5050`;
let socket = io(URL, { path: '/real-time' });

let snake = {
    x: 0,
    y: 0
};
let whiteMouse = {
    x: 50,
    y: 50
};
let speed = 50;
let score = 0;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    snake.x = windowWidth / 2;
    snake.y = windowHeight / 2;
}

function draw() {
    background(0, 50);
    textSize(64);
    text('🐍', snake.x - 25, snake.y);

    textSize(24);
    text('🐁', whiteMouse.x, whiteMouse.y);
    eatsMouse();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function eatsMouse() {
    if (dist(snake.x, snake.y, whiteMouse.x, whiteMouse.y) < 50) {
        putMouseRandomPosition();
        score++;
        sendScore();
        console.log('Score: ' + score);
    }
}

function putMouseRandomPosition() {
    whiteMouse.x = random(50, windowWidth - 50);
    whiteMouse.y = random(50, windowHeight - 50);
}

function keyPressed() {

    switch (keyCode) {
        case LEFT_ARROW:
            console.log('LEFT');
            character.x -= speed;
            break;
        case RIGHT_ARROW:
            console.log('RIGHT');
            character.x += speed;
            break;
        case DOWN_ARROW:
            console.log('DOWN');
            character.y += speed;
            break;
        case UP_ARROW:
            console.log('UP');
            character.y -= speed;
            break;
        default:
            break;
    }
}

//Define the function to move the snake in Y axis
function moveSnakeY(direction) {
}

//Define the function to move the snake in Y axis∫
function moveSnakeX(position) {
}

/*____________________________________________________________
Socket event to listen when an arduino message is comming */

socket.on('arduinoMessage', (arduinoMessage) => {
    
})

/*___________________________________________
Fetch method to post each time the snake eats a mouse
*/

async function sendScore() {
    console.log(':D POST');
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score })
    }
    await fetch('/score', request);
}