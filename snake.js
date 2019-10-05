var squareLocations = [];
var started = false;
var canvas;
var ctx;
var height;
var width;
var dx;
var dy;
var squareSize;
var squareSize;
var squareSize;
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
var snake = []


function setupSnake() {
    snake = [];

    currentRow = Math.floor(rows / 2);
    currentCol = Math.floor(columns / 2);
    snake.push({ x: currentRow, y: currentCol });
    snake.push({ x: (currentRow), y: currentCol + 1 });
    snake.push({ x: (currentRow), y: currentCol + 2 });





}

function drawSnake() {
    ctx.fillStyle = 'lime';

    var i = 0;
    for (i; i < snake.length; i++) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0], squareLocations[snake[i].x][snake[i].y][1], squareSize, squareSize);
        if (i == 0) {
            console.log("Drawing eyes");
            ctx.fillStyle = '#000000';
            switch (direction) {
                case "left":
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + squareSize / 5, squareLocations[snake[i].x][snake[i].y][1] + squareSize / 5, squareSize / 5, squareSize / 5);
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + squareSize / 5, squareLocations[snake[i].x][snake[i].y][1] + (squareSize - squareSize / 2.5), squareSize / 5, squareSize / 5);
                    break;
                case "right":
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + (squareSize - squareSize / 2.5), squareLocations[snake[i].x][snake[i].y][1] + squareSize / 5, squareSize / 5, squareSize / 5);
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + (squareSize - squareSize / 2.5), squareLocations[snake[i].x][snake[i].y][1] + (squareSize - squareSize / 2.5), squareSize / 5, squareSize / 5);
                    break;
                case "up":
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + squareSize / 5, squareLocations[snake[i].x][snake[i].y][1] + squareSize / 5, squareSize / 5, squareSize / 5);
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + (squareSize - squareSize / 2.5), squareLocations[snake[i].x][snake[i].y][1] + squareSize / 5, squareSize / 5, squareSize / 5);
                    break;
                case "down":
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + squareSize / 5, squareLocations[snake[i].x][snake[i].y][1] + (squareSize - squareSize / 2.5), squareSize / 5, squareSize / 5);
                    ctx.fillRect(squareLocations[snake[i].x][snake[i].y][0] + (squareSize - squareSize / 2.5), squareLocations[snake[i].x][snake[i].y][1] + (squareSize - squareSize / 2.5), squareSize / 5, squareSize / 5);
                    break;

            }


        }

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
    dy = dx;
    squareSize = width / 38.4;
    xSquares = 0;
    ySquares = 0;

}
//setInterval(addPart, 500);
function addPart(amountOfParts) {
    for (let i = 0; i < amountOfParts; i++) {
        var snakeLength = snake.length - 1;
        var snakeXY;
        switch (direction) {
            case "up":
                snakeXY = { x: (snake[snakeLength].x + 1), y: (snake[snakeLength].y) };
                break;
            case "down":
                snakeXY = { x: (snake[snakeLength].x - 1), y: (snake[snakeLength].y) };
                break;
            case "left":
                snakeXY = { x: (snake[snakeLength].x), y: (snake[snakeLength].y) + 1 };
                break;
            case "right":
                snakeXY = { x: (snake[snakeLength].x), y: (snake[snakeLength].y) - 1 };
                break;
        }
        if (checkInRange(snakeXY)) {
            snake.push(snakeXY);
        } else if (checkInRange(snakeXY = { x: (snake[snakeLength].x + 1), y: (snake[snakeLength].y) })) {
            snake.push(snakeXY);
        } else if (checkInRange(snakeXY = { x: (snake[snakeLength].x - 1), y: (snake[snakeLength].y) })) {
            snake.push(snakeXY);
        } else if (checkInRange(snakeXY = { x: (snake[snakeLength].x), y: (snake[snakeLength].y - 1) })) {
            snake.push(snakeXY);
        } else if (checkInRange(snakeXY = { x: (snake[snakeLength].x), y: (snake[snakeLength].y + 1) })) {
            snake.push(snakeXY);
        }



    }
}
function checkInRange(snakeXY) {
    if (snakeXY.x >= rows || snakeXY.y >= columns || snakeXY.x < 0 || snakeXY.y < 0) {
        return false;
    } else {
        return true;
    }
}

timerApple = null;
var appleX;
var appleY;
function placeApple() {
    let loopVariable = true;
    console.log("New Apple");
    while (loopVariable) {
        appleX = Math.floor((Math.random() * rows));
        appleY = Math.floor((Math.random() * columns));

        let continueVariable = false;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x == appleX && snake[i].y == appleY) {
                continueVariable = true;
                break;
            }
        }
        if (continueVariable) {
            continue;}
        loopVariable = false;
        drawApple();
        
    }
}






function getDxDy() {
    if (timer == null) {
        timer = setInterval(move, 110);
    }



    setup();
    getSquares();
    drawSquares();

    setupSnake();
    placeApple();
    drawSnake();
    drawApple();

}
function drawApple() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(squareLocations[appleX][appleY][0], squareLocations[appleX][appleY][1], squareSize, squareSize);
}
function drawSquares() {

    ctx.fillStyle = '#372E2E';
    var i = 0;
    squareLocations.map(row=>{row.map(column=>{ctx.fillRect(column[0], column[1], squareSize, squareSize)})})
    /* for (i; i < (squareLocations).length; i++) {
        var j = 0;
        for (j; j < squareLocations[i].length; j++) {
            ctx.fillRect(squareLocations[i][j][0], squareLocations[i][j][1], squareSize, squareSize);




        }
    } */
}



function collisionApple() {
    if (snake[0].x == appleX && snake[0].y == appleY) {
        addPart(2);

        placeApple();

    }
}
function drawLastSquare() {
    ctx.fillStyle = '#372E2E';
    var index = snake.length - 1;

    ctx.clearRect(squareLocations[snake[index].x][snake[index].y][0] - 1, squareLocations[snake[index].x][snake[index].y][1] - 1, squareSize + 2.5, squareSize + 2.5);
    ctx.fillRect(squareLocations[snake[index].x][snake[index].y][0], squareLocations[snake[index].x][snake[index].y][1], squareSize, squareSize);
    drawApple();
}

function getSquares() {
    x = squareSize / 2;
    y = squareSize /2 ;
    rows = 0;
    columns = 0;
    var row = 0;
    var column = 0;
    squareLocations = [];
    //Get Rows
    for (y; y < height; y += dy + squareSize) {
        x = squareSize / 2;
        if (y > height - squareSize - dy) {
            break;
        }
        rows++;
        squareLocations.push([]);
        //Get Columns
        for (x; x < width - squareSize - dx; x += dx + squareSize) {
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
    for (i; i > 0; i--) {
        snake[i] = snake[i - 1];

    }

    snake.shift();
    snake.unshift({ "x": newHead[0], "y": newHead[1] });

    //drawSquares();
    drawSnake();

}

function move() {

    if(directionQue.length > 0){
        let tempDirection = directionQue.shift();
        if(tempDirection == "right" && direction == "left"){
            ;
        } else if(tempDirection == "left" && direction == "right"){
            ;
        }else if(tempDirection == "up" && direction == "down"){
            ;
        }else if(tempDirection == "down" && direction == "up"){
            ;
        } else{
            direction = tempDirection;
        }
    }
    switch (direction) {
        case 'up':
            newHead[0] = currentRow - 1;
            newHead[1] = currentCol;
            break;
        case 'down':
            newHead[0] = currentRow + 1;
            newHead[1] = currentCol;

            break;
        case 'left':
            newHead[0] = currentRow;
            newHead[1] = currentCol - 1;

            break;
        case 'right':
            newHead[0] = currentRow;
            newHead[1] = currentCol + 1;
            break;
    }
    var i = 0;

    //Collision Detection
    for (i; i < snake.length; i++) {
        if (snake[i].x == newHead[0] && snake[i].y == newHead[1] || (newHead[0] < 0 || newHead[1] < 0 || newHead[0] > rows - 1 || newHead[1] > columns - 1)) {
            console.log("dead");
            getDxDy();
            setupSnake();
            newHead = [currentRow, currentCol];
            oldDirection = 'down';
            direction = 'up';
            newDirection = 'up';
            break;
        }
    }

    collisionApple();
    currentCol = newHead[1];
    currentRow = newHead[0];

    updatePos()
}

var oldDirection = "right";
var directionQue = ['left'];
function setKey(event) {
    switch (event.keyCode) {
        case 87:
            if (directionQue[directionQue.length - 1] != 'down' && directionQue[directionQue.length - 1]  != "up" ) {
                    directionQue.push('up');
                    break;

                }
                
            
        case 68:
            if (directionQue[directionQue.length - 1] != 'left' && directionQue[directionQue.length - 1]  != "right" ) {
                directionQue.push('right');
            }
            break;
        case 65:
            if (directionQue[directionQue.length - 1] != 'right' && directionQue[directionQue.length - 1]  != "left" ) {
                    directionQue.push('left');

                }
            
            break;
        case 83:
            if (directionQue[directionQue.length - 1] != 'up' && directionQue[directionQue.length - 1]  != "down" ) {
                directionQue.push('down');
            }
            break;
    }


}


document.addEventListener("keydown", setKey);

