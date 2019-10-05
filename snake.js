var squareLocations = [];
var started = false;
var canvas;
var ctx;
var height;
var width;
var dx;
var dy;
var squareHeight;
var squareWidth;
var xSquares;
var ySquares;
var startX;
var startY;
var x;
var y;
var rows = 0;
var columns = 0;
var direction = 'left';
var currentRow;
var currentCol;
var newDirection = 'left';
var snake = [ ]


function setupSnake() {
    snake = [];
    
    currentRow = Math.floor(rows/2);
    currentCol = Math.floor(columns/2);
    snake.push({x: currentRow, y: currentCol});
    snake.push({x: (currentRow), y: currentCol + 1 });
    snake.push({x: (currentRow), y: currentCol + 2 });
    
    
    
    

}

function drawSnake() {
    ctx.fillStyle = 'lime';
    
    var i = 0;
    for(i; i < snake.length ; i++){
        ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0], squareLocations[snake[i].x][snake[i].y][1] , squareWidth, squareHeight);
    }
   
    }



function setup() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    console.log("Log Width: " + width);
    console.log("Log Height: " + height);
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#372E2E';
    ctx.lineWidth = 0;

    dx = width / 200;
    dy = height / 50;
    squareWidth = 20;
    squareHeight = 20;
    xSquares = 0;
    ySquares = 0;
    dy = 4;
}
//setInterval(addPart, 500);
function addPart(amountOfParts){
        for(let i = 0; i < amountOfParts; i++){
            var snakeLength = snake.length - 1;
            snake.push({x: (snake[snakeLength].x - 1), y: (snake[snakeLength].y) });
        }
        
    
    
}

timerApple = null;
var appleX;
var appleY;
function placeApple()
{
    let loopVariable = true;
    console.log("New Apple");
    while(loopVariable){
        appleX = Math.floor((Math.random() * rows)); 
        appleY = Math.floor((Math.random() * columns)); 
        let i  = 0;
        for(i; i < snake.length ; i++){
            if(snake[i].x == appleX && snake[i].y == appleY){
                ;
            } else{
                console.log("Found New Apple Location");
                console.log("Apple X: " + appleX + "\n" + "Apple Y: " + appleY);
                drawApple();
                loopVariable = false;
                break;
            } 
        }
    }

 
}


function getDxDy() {
    if(timer == null){
        timer = setInterval(move, 100);
    }
    
   

    setup();
    getSquares();
    drawSquares();

    setupSnake();
    placeApple();
    drawSnake();
    drawApple();

}
function drawApple(){
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(squareLocations[appleX][appleY][0],squareLocations[appleX][appleY][1], squareWidth, squareHeight);
}
function drawSquares() {

    ctx.fillStyle = '#372E2E';
    var i = 0;
    for (i; i < (squareLocations).length; i++) {
        var j = 0;
        for (j; j < squareLocations[i].length; j++) {
            ctx.fillRect(squareLocations[i][j][0], squareLocations[i][j][1], squareWidth, squareHeight);
        }
    }

}

function collisionApple(){
    if(snake[0].x == appleX && snake[0].y == appleY){
        addPart(2);
        
        placeApple();
       
    }
}
function drawLastSquare(){
    ctx.fillStyle = '#372E2E';
    var index = snake.length - 1;
   
    ctx.clearRect(squareLocations[snake[index].x][snake[index].y][0] - 1, squareLocations[snake[index].x][snake[index].y][1] - 1 , squareWidth + 2.5, squareHeight + 2.5);
    ctx.fillRect(squareLocations[snake[index].x][snake[index].y][0], squareLocations[snake[index].x][snake[index].y][1] , squareWidth, squareHeight);
}

function getSquares() {
    x = 0;
    y = 0;
    rows = 0;
    columns = 0;
    var row = 0;
    var column = 0;
    squareLocations = [];
    //Get Rows
    for (y; y < height; y += dy + squareHeight) {
        x = 0;
        if (y > height - squareHeight - dy) {
            break;
        }
        rows++;
        squareLocations.push([]);
        //Get Columns
        for (x; x < width; x += dx + squareWidth) {
            if (x > window.innerWidth - startX - dx) {
                break;
            }

            squareLocations[row].push([x, y]);
            columns++;
            // if(x_pos % 2 != 0 )
            // {
            //     x_pos += 0.5;
            // }
        }
        row += 1;
    }
    columns = Math.floor(columns / rows);
}
function test() {


}
/* 
for(;;){
    if(started){
        //test();
    }
} */
var newHead = [];

timer = null;
function updatePos() {
    var i = -1;

   /*  for (i; i > (snake.body.length * -1) + 1; i--) {
        snake.body[i] = snake.body[i - 1];
    } */
    var i = snake.length - 1;
    drawLastSquare();
    for(i;i > 0; i--){
    snake[i] = snake[i-1];
 
    }
    
    snake.shift();
    snake.unshift({ "x": newHead[0], "y" : newHead[1]});

    //drawSquares();
    drawSnake();

}

function move() {
    if(newDirection != direction){
        direction = newDirection;
    }
    switch (direction) {
        case 'up':
            newHead[0] = currentRow - 1;
            newHead[1] = currentCol;
            direction = 'up';
            break;
        case 'down':
            newHead[0] = currentRow + 1;
            newHead[1] = currentCol;
            direction = 'down';

            break;
        case 'left':
                newHead[0] = currentRow;
                newHead[1] = currentCol - 1 ;
                direction = 'left';

            break;
        case 'right':
                newHead[0] = currentRow;
                newHead[1] = currentCol + 1;
                direction = 'right';
                break;
    }
    var i = 0;

    //Collision Detection
    for(i; i < snake.length ; i++){
        if(snake[i].x == newHead[0] && snake[i].y == newHead[1]){
            console.log("dead");
            getDxDy();
            setupSnake();
            newHead = [currentRow, currentCol];
            direction = 'right';
            break;
        } }

    collisionApple();
    currentCol = newHead[1];
    currentRow = newHead[0];
       
        updatePos()
    }

var oldDirection = "right";

function setKey(event) {
    switch (event.keyCode) {
        case 87:
            if (direction != 'down') {
                newDirection = 'up';
            }
            break;
        case 68:
            if (direction != 'left') {

                newDirection = "right";
            }
            break;
        case 65:
            if (direction != 'right') {
                newDirection = "left";
            }
            break;
        case 83:
            if (direction != 'up') {
                newDirection = "down";
            }
            break;

    }


}


document.addEventListener("keydown", setKey);

