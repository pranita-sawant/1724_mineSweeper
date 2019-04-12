var COLS = 15, ROWS = 15,
MINES = ROWS * 2;
console.log(MINES);

var board = [];
var state = [];
var INIT_STATE = 0,
    STATE_CLOSED = 0,
    STATE_FLAGGED = 1,
    STATE_OPENED = 2;
var SET_MINE = -1;
var playing = true;

function changeFunc(){
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    alert(selectedValue);

    if(selectedValue == "easy"){
       var COLS= 10,
           ROWS = 10;
           MINES = ROWS * 2;
           console.log(ROWS);
           console.log(COLS);
    }else if(selectedValue == "medium"){
        var COLS= 15,
           ROWS = 15;
           MINES = ROWS * 2;
           console.log(ROWS);
           console.log(COLS);
    }
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

function timer(){
    var min, sec, ms, timer_count, malt, salt, msalt;

    var timer = {
        start: function () {
            ms = 0;
            sec = 0;
            min = 0;
            timer_count = setInterval(function () {
                if (ms == 100) {
                    ms = 0;
                    if (sec == 60) {
                        sec = 0;
                        min++;
                    } else {
                        sec++;
                    }
                } else{
                    ms++;
                }
    
                malt = timer.pad(min);
                salt = timer.pad(sec);
                msalt = timer.pad(ms);
    
                timer.update(malt + ":" + salt);
            }, 10);
        },
        
        stop: function () {
            clearInterval(timer_count);
        },
    
        update: function (txt) {
            //console.log(txt)
            if(playing == true){
            var temp = document.getElementById("dispTimer");
            temp.firstElementChild.textContent = txt;
            }else{
                timer.stop();
            }
            //console.log(temp);
        },
    
        pad: function (time) {
            var temp;
            if (time < 10) {
                temp = "0" + time;
            } else {
                temp = time;
            }
            return temp;
        }
    }

    timer.start();
}

function init() {
    
    for (var y = 0; y < ROWS; ++y) {
        console.log("ROWS" +y);
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
        revealBoard(false);
        return;
    }
    
    state[y][x] = STATE_OPENED;
    
    if (board[y][x] == 0){
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

init();
