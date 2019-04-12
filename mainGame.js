var COLS, ROWS, MINES;
var first_click = false;
var board = [];
var state = [];
var INIT_STATE = 0,
    STATE_CLOSED = 0,
    STATE_FLAGGED = 1,
    STATE_OPENED = 2;
var SET_MINE = -1;
var playing = true;
var flag_count = 0;
var canvasWidth = 600, canvasHeight = 600;
var BLOCK_WIDTH, BLOCK_HEIGHT;
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
var colors = [
    'blue', 'darkgreen', 'darkred', 'navyblue', 'purple', 'black'
];
var MOUSE_LEFT = 1,
    MOUSE_RIGHT = 3;

var bombIcon = new Image();
bombIcon.src = 'images/mines.jpg';
var flagIcon = new Image();
flagIcon.src = 'images/flag.png';

function reset () {
    board = [];
    state = [];
    playing = true;
    first_click = false;
    var image = document.getElementById('smiley');
    image.src = "images/smileFace.png";
}

function changeFunc() {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    //alert(selectedValue);
    reset();
    if (selectedValue == "easy") {
        COLS = 6,
        ROWS = 6;
        MINES = ROWS * 2;
        flag_count = MINES;
        console.log(flag_count);
       // console.log(ROWS);
        //console.log(COLS);
        BLOCK_WIDTH = canvasWidth / COLS,
        BLOCK_HEIGHT = canvasHeight / ROWS;
    } 
    else if (selectedValue == "medium") {
        COLS = 15,
        ROWS = 15;
        MINES = ROWS * 2;
        flag_count = MINES;
        console.log(ROWS);
        console.log(COLS);
        BLOCK_WIDTH = canvasWidth / COLS,
        BLOCK_HEIGHT = canvasHeight / ROWS;
    } 
    else if (selectedValue == "difficult") {
        COLS = 20,
        ROWS = 20;
        MINES = ROWS * 2;
        flag_count = MINES;
        console.log(ROWS);
        console.log(COLS);
        BLOCK_WIDTH = canvasWidth / COLS,
        BLOCK_HEIGHT = canvasHeight / ROWS;
    }
    init();
    render();
}


function setBoundary(x, y) {

    return x >= 0 && y >= 0
        && x < COLS && y < ROWS;
}

function countMinesAround(x, y) {
    var count = 0;
    for (var dx = -1; dx <= 1; ++dx) {
        for (var dy = -1; dy <= 1; ++dy) {
            if (dx == 0 && dy == 0) {
                continue;
            }
            var yy = y + dy,
                xx = x + dx;
            if (setBoundary(xx, yy)) {
                if (board[yy][xx] == SET_MINE) {
                    ++count;
                }
            }
        }
    }
    return count;
}

function init() {

    for (var y = 0; y < ROWS; ++y) {
        console.log("ROWS" + y);
        board.push([]);
        state.push([]);
        for (var x = 1; x <= COLS; ++x) {
            console.log(x);
            board[y].push(0);
            state[y].push(STATE_CLOSED);
        }
    }
    for (var mine = 0; mine < MINES; ++mine) {
        var x, y;
        do {
            x = Math.floor(Math.random() * COLS),
                y = Math.floor(Math.random() * ROWS);
        } while (board[y][x] == SET_MINE);

        board[y][x] = SET_MINE;
    }
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] != SET_MINE) {
                board[y][x] = countMinesAround(x, y);
            }
        }
    }
}

function openBlock(x, y) {
    if (!playing) {
        return;
    }
    if (state[y][x] == STATE_FLAGGED) {
        return;
    }
    if (board[y][x] == SET_MINE) {
        //alert('Game over!');
        playing = false;
        var image = document.getElementById('smiley');
        image.src = "images/sadFace.png";
        timer.stop();
        revealBoard(false);
        return;
    }

    state[y][x] = STATE_OPENED;

    if (board[y][x] == 0) {
        for (var dx = -1; dx <= 1; ++dx) {
            for (var dy = -1; dy <= 1; ++dy) {
                var xx = x + dx,
                    yy = y + dy;
                if (setBoundary(xx, yy)) {
                    if (state[yy][xx] != STATE_OPENED) {
                        openBlock(xx, yy);
                    }
                }
            }
        }
    }


    if (checkVictory()) {
        // alert('You are victorious!');
        playing = false;
        var image = document.getElementById('smiley');
        image.src = "images/winnerFace.png";
        timer.stop();
        revealBoard(true);
    }
}

function checkVictory() {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] != SET_MINE) {
                if (state[y][x] != STATE_OPENED) {
                    return false;
                }
            }
        }
    }
    return true;
}

function flagBlock(x, y) {

    if (state[y][x] == STATE_OPENED) {
        return;
    }
    state[y][x] = 1 - state[y][x];
}

function revealBoard(victorious) {
    for (var y = 0; y < ROWS; ++y) {
        for (var x = 0; x < COLS; ++x) {
            if (board[y][x] == SET_MINE && victorious) {
                state[y][x] = STATE_FLAGGED;
                continue;
            }
            state[y][x] = STATE_OPENED;
        }
    }
}

