
canvas.addEventListener('mousedown', function (e) {
    var getCanvasBounds = canvas.getBoundingClientRect();
    var x = e.clientX - getCanvasBounds.left,
        y = e.clientY - getCanvasBounds.top;
    // hit test
    var gridCoordinates = BlockGridSize(x, y);

    switch (e.which) {
        case MOUSE_LEFT:
            if (first_click == false) {
                //timer.start();
                first_click = true
            }
            openBlock(gridCoordinates.x, gridCoordinates.y);
            break;
        case MOUSE_RIGHT:
            //console.log(flag_count);
            flagBlock(gridCoordinates.x, gridCoordinates.y);
            updateflag();
    } 
    render();

    return false;
});

canvas.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
}, false);

