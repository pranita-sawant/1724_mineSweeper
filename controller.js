
canvas.addEventListener('mousedown', function(e) {
    var x = e.clientX - canvas.offsetLeft,
        y = e.clientY - canvas.offsetTop;


    // hit test
    var modelCoordinates = viewToModel(x, y);

    switch (e.which) {
        case MOUSE_LEFT:
            if(first_click == false){
                timer.start();
                first_click = true
            }
            openBlock(modelCoordinates.x, modelCoordinates.y);
            break;
        case MOUSE_RIGHT:
        console.log(flag_count);
                //if(flag_count <= MINES){
                    if(flag_count > 0 && flag_count <= MINES)
                    flagBlock(modelCoordinates.x, modelCoordinates.y);
                    flag_count--;
                    if(flag_count == 0)
                        alert("No more flags");
                //}
                
                
    }

    render();

    return false;
});

canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
}, false);

