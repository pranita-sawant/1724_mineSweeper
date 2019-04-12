var canvasWidth = 600, canvasHeight = 600;
var BLOCK_WIDTH = canvasWidth / COLS,
    BLOCK_HEIGHT = canvasHeight / ROWS;
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var colors = [
    'blue', 'darkgreen', 'darkred', 'navyblue', 'purple', 'black'
];

var bombIcon = new Image();
bombIcon.src = 'images/mines.jpg';
var flagIcon = new Image();
flagIcon.src = 'images/flag.png';


function modelToView(x, y) {
    return {
        x: x * BLOCK_WIDTH,
        y: y * BLOCK_HEIGHT
    };
}

function viewToModel(x, y) {
    return {
        x: Math.floor(x / BLOCK_WIDTH),
        y: Math.floor(y / BLOCK_HEIGHT)
    };
}

function renderMine(x, y) {
    var viewCoordinates = modelToView(x, y);
    ctx.drawImage(bombIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);
}

function renderFlag(x, y) {
    var viewCoordinates = modelToView(x, y);
    ctx.drawImage(flagIcon, viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);
}

function renderNumber(x, y) {
    var viewCoordinates = modelToView(x, y);

    ctx.fillStyle = colors[board[y][x] - 1];
    ctx.font = '20pt Verdana';
    var textSizeM = ctx.measureText('M'),
        textSizeNumber = ctx.measureText(board[y][x]);
    ctx.fillText(
        board[y][x],
        viewCoordinates.x + Math.floor(BLOCK_WIDTH / 2) - textSizeNumber.width / 2,
        viewCoordinates.y + Math.floor(BLOCK_HEIGHT / 2) + textSizeM.width / 2
    ); 
}

function renderBlock(x, y) {
    var viewCoordinates = modelToView(x, y);
    if (state[y][x] == STATE_OPENED) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fcf3de';  //'#8c8c8c';
        
    }
    else {
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#525252";
        ctx.fillStyle = '#2b8cbe';//'#ee3c3c';//'#e8e8e8';
    }

    ctx.strokeStyle = 'black';
    ctx.fillRect(viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    ctx.strokeRect(viewCoordinates.x, viewCoordinates.y, BLOCK_WIDTH, BLOCK_HEIGHT);

    if (state[y][x] == STATE_FLAGGED) {
        renderFlag(x, y);
    }

    if (state[y][x] == STATE_OPENED) {
        switch (board[y][x]) {
            case 0: 
                break;
            case SET_MINE:
                renderMine(x, y);
                break;
            default:
                renderNumber(x, y);
        }
    }
}

function render() {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            renderBlock(x, y);
        }
    }
}

 render();
