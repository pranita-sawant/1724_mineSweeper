
canvas.addEventListener('mousedown', function (e) {
    var x = e.clientX - canvas.offsetLeft,
        y = e.clientY - canvas.offsetTop;


    // hit test
    var gridCoordinates = BlockGridSize(x, y);

    switch (e.which) {
        case MOUSE_LEFT:
            if (first_click == false) {
                timer.start();
                first_click = true
            }
            openBlock(gridCoordinates.x, gridCoordinates.y);
            break;
        case MOUSE_RIGHT:
            //console.log(flag_count);
            //if(flag_count <= MINES){
            flagBlock(gridCoordinates.x, gridCoordinates.y);
            //}
            updateflag();
    }

    render();

    return false;
});

canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
}, false);

