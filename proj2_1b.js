function drawBranch(x, y, angle, len, level = 0, context ){
    let maxLevel = 7; 
    if (level < maxLevel){
        // Part 1.a: convert degrees to radians
        let pi = Math.PI;
        angle = angle * (pi/180);

        // Part 1.b and 1.c: find cosine/sin of angle, and find newX and newY
        let myCos = Math.cos(angle); 
        let newX = x + (len * myCos); 
        let mySin = Math.sin(angle); 
        let newY = y + (len * mySin); 

        // Part 1.d: draw
        context.beginPath();
        context.moveTo(x,y); 
        context.lineTo(newX,newY);
        context.stroke();

        //Part 1.e : recursive and repeated call to drawBranch()
        len = len/2; 
        level++; 
        angle = (180 * angle)/pi;

        //original angle 
        drawBranch(newX, newY, angle, len, level, context);
        // 90 degree
        angle = angle + 90; 
        drawBranch(newX, newY, angle, len, level, context);
        angle = angle - 180; 
        // - 90 degree 
        drawBranch(newX, newY, angle, len, level, context);
    }       
}

$(document).ready(function(){
    var fract_canvas = document.getElementById("uniqueId2");
    fract_canvas.width  = "500";
    fract_canvas.height = "500"; 
    //fract_canvas.style.backgroundColor = "rgba(158, 167, 184, 0.2)";
    fract_canvas.style.backgroundColor = "yellow";
    
    var x = fract_canvas.width/2; 
    var y = fract_canvas.height/2;
    var angle = 0;
    var len = 125;
    var level = 0; 
    var context = fract_canvas.getContext("2d");
    context.lineWidth = 0.5;
    
    drawBranch(x, y, angle, len, level, context);

    //complete the larger image
    angle = 90;
    drawBranch(x, y, angle, len, level, context);
    angle = -90;
    drawBranch(x, y, angle, len, level, context);
    angle = 180; 
    drawBranch(x, y, angle, len, level, context);
});