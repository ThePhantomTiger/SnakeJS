var squareLocations = [];
var started = false;
var canvas;
var ctx;
var height;
var width;
var dx;
var dy;
var squareSize;
var xOffset = 50;
var yOffset = 50;

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
var snake;
var apple;

var availableSpaces = []; ``

class Apple {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    draw() {
        let location = squareLocations[((this._y) * squares) + this._x];
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(location._x, location._y, squareSize, squareSize);
    }
    updateApple() {
        console.log("New Apple");


        let currentAvailableSpaces = availableSpaces.filter(space => space.x != snake._head._x
            && space.y != snake._head._y)

        console.log("Avaible Spaces: " + currentAvailableSpaces.length);
        if (currentAvailableSpaces.length <= 0) {
            console.log("You Win");
        }
        let location = squareLocations[(this._y * squares) + this._x];
        ctx.clearRect(location.x, location.y, squareSize, squareSize);
        var applePosition = currentAvailableSpaces[Math.floor(Math.random() * currentAvailableSpaces.length)];

        this._x = applePosition.x;
        this._y = applePosition.y;
    }
}

class snakePart {
    constructor(x, y) {
        this._x = x;
        this._y = y;

    }
    draw() {
        ctx.fillStyle = 'lime';
        let location = squareLocations[(this._y * squares) + this._x];
        ctx.fillRect(location._x, location._y, squareSize, squareSize);
    }
}

class Square {
    constructor(x, y) {
        this._x = x;
        this._y = y;

    }
    draw() {
        ctx.fillStyle = '#372E2E';
        ctx.fillRect(this._x, this._y, squareSize, squareSize);
    }
}


class Snake {
    constructor(x, y) {
        this._parts = [];
        this._head = new snakePart(x, y);
        this._direction = "right";
        this._partBuffer = 0;
        this._directionQue = [];
    }
    draw() {
        this._head.draw();
        if (this._parts.length > 0) {
            this._parts.forEach(snakePart => { snakePart.draw() });

        }
    }
    move() {
        var tempNewHead;
        if (this._directionQue.length > 0) {
            let tempDirection = this._directionQue.shift();
            if ((tempDirection == "right" && this._direction == "left") || (tempDirection == "left" && this._direction == "right")
                || (tempDirection == "up" && this._direction == "down") || (tempDirection == "down" && this._direction == "up")) {
                ;
            } else {
                this._direction = tempDirection;
            }
        }
        switch (this._direction) {
            case 'up':
                tempNewHead = new snakePart(this._head._x, this._head._y - 1);
                break;
            case 'down':
                tempNewHead = new snakePart(this._head._x, this._head._y + 1);
                break;
            case 'left':
                tempNewHead = new snakePart(this._head._x - 1, this._head._y);
                break;
            case 'right':
                tempNewHead = new snakePart(this._head._x + 1, this._head._y);
                break;
        }
        borderCheck(tempNewHead);
        this.shiftSnake(tempNewHead);
    }
    shiftSnake(tempHead) {
        if (this._parts.length > 0) {
            this._parts.unshift(this._head);
            let lastPost = this._parts.pop();
            clearGridRect(lastPost);
        } else {
            clearGridRect(this._head);
        }
        this._head = tempHead;

    }
    addPart(amount) {
        this._partBuffer += amount;

        if (squares <= this._parts.length) {
            alert("You Win");
            getDxDy();
        }
        for (let part = 0; part < this._partBuffer; part++) {


            if (this._parts.length > 0) {
                let lastSquare = this._parts[this._parts.length - 1]
                let currentAvailableSpaces = {
                    right:
                        { x: lastSquare._x + 1, y: lastSquare._y },
                    left:
                        { x: lastSquare._x - 1, y: lastSquare._y },
                    down:
                        { x: lastSquare._x, y: lastSquare._y + 1 },
                    right:
                        { x: lastSquare._x, y: lastSquare._y - 1 }
                };
                if (currentAvailableSpaces.right.x != this._head._x &&
                    currentAvailableSpaces.right.y != this._head._y) {
                    this._parts.push(new snakePart(currentAvailableSpaces.right.x,
                        currentAvailableSpaces.right.y));
                    this._partBuffer--;
                }



            } else {
                let lastSquare = this._head;

                this._parts.push(new snakePart(this._head._x + 1, this._head._y));
                this._partBuffer--;
            }

        }


    }
}
function clearGridRect(gridReference) {
    let location = squareLocations[(gridReference._y * squares) + gridReference._x];
    ctx.fillStyle = '#372E2E';
    ctx.clearRect(location._x - dx, location._y - dy, squareSize + (dx * 2), squareSize + (dx * 2));
    ctx.fillRect(location._x, location._y, squareSize, squareSize);


}
function borderCheck(snakeHead) {
    if (snakeHead._x >= squares || snakeHead._y >= squares || snakeHead._x < 0 || snakeHead._y < 0) {
        alert("Dead");
        getDxDy();
    }
}

function gridCollision(gridSpace1, gridSpace2) {
    if (gridSpace1._x == gridSpace2._x && gridSpace1._y == gridSpace2._y) {
        console.log("Add Part");
        snake.addPart(2);
        apple.updateApple();
        console.log("Collide");
    }
}
function setupSnake() {

    currentRow = Math.floor(rows / 2);
    currentCol = Math.floor(columns / 2);
    snake = new Snake(currentCol, currentRow);
    snake.draw();

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

var gameType = "normal"

function setup() {
    availableSpaces = [];
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
    squares = 12;

    if (gameType == "scale") {
        dx = (width - xOffset) / 200;
        dy = dx;
        squareSize = (width - (xOffset * 2)) / squares;
    } else if (gameType == "normal") {
        dx = 3;
        dy = dx;
        squareSize = width < height ? ((width - (xOffset * 2) - (dx * squares)) / squares) : ((height - (yOffset * 2) - (dy * squares)) / squares);
        rows = 0;
        columns = 0;

        for (let row = 0; row < squares; row++) {
            for (let column = 0; column < squares; column++) {
                availableSpaces.push({ x: column, y: row });
            }
        }
    }



}



timerApple = null;





function resize() {
    setup();
    getSquares();

    squareLocations.map(square => square.draw());
    setupSnake();
    setupApple();

}

function getDxDy() {
    setup();
    getSquares();
    squareLocations.map(square => square.draw());

    setupSnake();
    setupApple();
    //drawSnake();
    if (timer == null) {
        timer = setInterval(gameLoop, 100);
    }
}
function setupApple() {
    apple = new Apple(0, 0);
    apple.updateApple();
    apple.draw();
}

function gameLoop() {
    snake.move();
    gridCollision(apple, snake._head);
    snake.draw();
    apple.draw();
}





function getSquares() {
    x = squareSize / 2;
    y = squareSize / 2;
    rows = 0;
    columns = 0;
    var row = 0;
    var column = 0;
    squareLocations = [];
    //Get Rows
    if (gameType == "scale") {
        for (y; y < height; y += dy + squareSize) {
            x = squareSize / 2;
            if (y > height - squareSize - dy) {
                break;
            }
            rows++;

            //Get Columns
            for (x; x < width - squareSize - dx; x += dx + squareSize) {
                if (x > window.innerWidth - startX - dx) {
                    break;
                }

                squareLocations.push(new Square(x, y));
                columns++;
                // if(x_pos % 2 != 0 )
                // {
                //     x_pos += 0.5;
                // }
            }
            row += 1;
        }
        columns = Math.floor(columns / rows)
    }
    else if (gameType == "normal") {
        var initialY = yOffset;
        for (let squareRow = 0; squareRow < squares; squareRow++) {

            var initialX = (width / 2) - (squareSize * (squares / 2));
            for (let squareColumn = 0; squareColumn < squares; squareColumn++) {

                squareLocations.push(new Square(initialX, initialY));
                initialX += squareSize + dx;


            }
            initialY += squareSize + dy;

        }

        rows = squares;
        columns = squares;
    };
}


timer = null;




function setKey(event) {
    switch (event.keyCode) {
        case 87:
            if (snake._directionQue[snake._directionQue.length - 1] != 'down' && snake._directionQue[snake._directionQue.length - 1] != "up") {
                snake._directionQue.push('up');
                break;
            }


        case 68:
            if (snake._directionQue[snake._directionQue.length - 1] != 'left' && snake._directionQue[snake._directionQue.length - 1] != "right") {
                snake._directionQue.push('right');
            }
            break;
        case 65:
            if (snake._directionQue[snake._directionQue.length - 1] != 'right' && snake._directionQue[snake._directionQue.length - 1] != "left") {
                snake._directionQue.push('left');

            }

            break;
        case 83:
            if (snake._directionQue[snake._directionQue.length - 1] != 'up' && snake._directionQue[snake._directionQue.length - 1] != "down") {
                snake._directionQue.push('down');
            }
            break;
    }
}


document.addEventListener("keydown", setKey);

