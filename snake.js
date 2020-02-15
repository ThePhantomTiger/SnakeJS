

let keyPressBuffer = [];
let currentDirection = 'right';
let snake;
let apple;
let intervalOn = false;
let width;
let context;
let canvas;
let score = 0;
let myInterval = null;
let alive = true;
let startTime;

function setup() {
    let gameAreaSide = window.innerHeight >= window.innerWidth ? window.innerWidth : window.innerHeight;
    let gameArea = document.querySelector('#game-area');


    let ui = document.querySelector('#ui');
    let uiHeight = ui.offsetHeight;
    ui.style.width = gameAreaSide - uiHeight + 'px';




    if (gameAreaSide < 450) {
        gameArea.style.width = gameAreaSide - uiHeight + 'px';
        gameArea.style.height = gameAreaSide - uiHeight + 'px';

    }
    else {
        gameArea.style.width = gameAreaSide + 'px';
        gameArea.style.height = gameAreaSide + 'px';
    }

    
    if(canvas == null)
    {
        canvas = document.createElement('canvas');
        document.querySelector('#canvas').appendChild(canvas);
        context = canvas.getContext('2d');
        document.addEventListener('keydown', keyDown, false);


    }

    canvas.width = gameAreaSide - uiHeight;
    canvas.height = gameAreaSide - uiHeight;




    width = (document.querySelector('#ui').style.width).substring(0, 3);

    
    drawSquares();
    
}

function start()
{
    console.log('starting...');
    score = 0;

    startTime = new Date().getTime();

    drawUI();

    drawSquares();
    alive = true;
    if(intervalOn == false)
    {
        console.log('settingInterval');
        myInterval = setInterval(update, 100, context);
        intervalOn = true;

    }

    snake = new Snake(8, 4)
    snake.addPartManual(8,3);
    snake.addPartManual(8,2);
    snake.addPartManual(8,1);
    snake.addPartManual(8,0);

    apple = new Apple();


}

function drawSquares() {
    for (let index = 0; index < 256; index++) {
        let topOffset = width / 60;
        let leftOffset = width / 44.8;
        let x = leftOffset + ((width / 16.3) * Math.floor(index % 16));
        let y = topOffset + ((width / 16.3) * Math.floor(index / 16));
        let size = width / 22.4;
        context.fillRect(x, y, size, size);
    }
}

function update()
{
    snake.update();
    if(!alive){return;}
    draw();
}

function draw() {


    //context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    apple.draw();
    snake.draw();
    drawUI();






}
function keyDown(event)
{
    if(keyPressBuffer.length < 7 
        && event.keyCode in keyMap
         && keyPressBuffer[keyPressBuffer.length - 1] != keyMap[event.keyCode] 
         && keyMap[event.keyCode] != currentDirection
         ){
            if(!(keyPressBuffer.length == 0 && keyMap[event.keyCode] == oppositeMap[currentDirection])){
                keyPressBuffer.push(keyMap[event.keyCode]);

            }
    }
}

class Position {
    constructor(row, column) {
        if(row == undefined || column == undefined)
        {
            return;
        }
        this.row = row;
        this.column = column;
    }
}

const keyMap = 
{
    37 : 'left',
    38 : 'up',
    39 : 'right',
    40 : 'down',

    87 : 'up',
    65 : 'left',
    68 : 'right',
    83 : 'down'
};

const oppositeMap = 
{
    'left' : 'right',
    'right' : 'left',
    'up' : 'down',
    'down' : 'up'
}
function incrementScore()
{
    score++;
}
function getTimeChange()
{
    let now = new Date().getTime();
    let distance = now - startTime;
    return distance;
}
function drawUI()
{
    let scoreText = document.querySelector('#score-value');
    scoreText.innerHTML = score;
    let secondsText = document.querySelector('#seconds');
    let minutesText = document.querySelector('#minutes');
    let seconds = Math.floor(getTimeChange() / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    secondsText.innerHTML = seconds.toString().length == 1 ? "0" + seconds : seconds;
    minutesText.innerHTML = minutes.toString().length == 1 ? "0" + minutes : minutes;

    
}
function die()
{
    snake = null;
    apple = null;
    alive = false;
    clearInterval(myInterval);
    intervalOn = false;
    
}
class Apple extends Position
{
    constructor()
    {
        super();
        let cords = this.generateNewLocation();
        this.row = cords[0];
        this.column = cords[1];
    }
    update()
    {
        let cords = this.generateNewLocation();
        this.row = cords[0];
        this.column = cords[1];
    }
    generateNewLocation()
    {
        let row = Math.floor(Math.random() * 16);
        let column = Math.floor(Math.random() * 16);
        if(!snake.body.every(bodyPart => {return bodyPart.row != row && bodyPart.column != column}))
        {
            this.generateNewLocation();
        }
        return [row,column]
    }
    draw()
    {
        let topOffset = width / 60;
        let leftOffset = width / 44.8;

        let xCord = leftOffset + (width / 16.3) * this.column;           
        let yCord = topOffset + (width / 16.3) * this.row;
        let size = width / 22.4;
        
        context.fillStyle = 'red';
        context.fillRect(xCord,yCord, size, size);
    }
}
class Snake extends Position
{
    constructor(row,column)
    {
        super(row,column);
        this.body = [{'row' : row, 'column' : column}];
        this.oldRow;
        this.oldColumn;
    }


    update()
    {
        currentDirection = keyPressBuffer.length != 0 ? keyPressBuffer.shift() : currentDirection;
        this.oldRow = this.body[0].row;
        this.oldColumn = this.body[0].column;
        switch(currentDirection)
        {
            case 'left':
                this.body[0].column--;
                break;
            case 'right':
                this.body[0].column++;
                break;
            case 'up':
                this.body[0].row--;
                break;
            case 'down':
                this.body[0].row++;
                break;
        }
        for (let index = 1; index < this.body.length; index++) {

            let tempRow = this.body[index].row;
            let tempColumn = this.body[index].column;

            this.body[index].row = this.oldRow;
            this.body[index].column = this.oldColumn;

            this.oldRow = tempRow;
            this.oldColumn = tempColumn;            
        }
        //Out Of Bounds
        if(this.body[0].row < 0 || this.body[0].column < 0 || this.body[0].row > 15 || this.body[0].column > 15)
        {
            die();
            return;
        }

        //Self Hit
        //Slice To Ignore The Head
        this.body.slice(1).forEach(bodyPart => {if(this.body[0].row == bodyPart.row && this.body[0].column == bodyPart.column){die(); return;}});

        //Eat
        if(this.body[0].row == apple.row && this.body[0].column == apple.column)
        {
            
            apple.update();
            incrementScore();
            this.grow();
        }

        

        

    }
    grow()
    {
        this.body.push({'row' : this.oldRow, 'column' : this.oldColumn});
    }
    draw()
    {
        for (let index = 0; index < this.body.length; index++) {
            let row = this.body[index].row;
            let column = this.body[index].column;
            let topOffset = width / 60;
            let leftOffset = width / 44.8;

            let xCord = leftOffset + (width / 16.3) * column;           
            let yCord = topOffset + (width / 16.3) * row;
            let size = width / 22.4;
            
            context.fillStyle = 'lime';
            context.fillRect(xCord,yCord, size, size);


            xCord = leftOffset + (width / 16.3) * this.oldColumn;           
            yCord = topOffset + (width / 16.3) * this.oldRow;

            context.fillStyle = 'black';
            context.fillRect(xCord, yCord, size, size);
            
        }
    }
    addPartManual(row, column)
    {
        this.body.push({'row' : row, 'column' : column});
    }

}