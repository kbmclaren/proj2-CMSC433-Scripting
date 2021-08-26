function drawSquare(x, y, length, level, context){
    console.log(context); 
    if (level < 4){
        context.fillStyle = "rgba(0,0,0,1)"; 
        if(level == 1)
            context.fillStyle = "rgba(150,0,0,1)";
        else if(level == 2)
            context.fillStyle = "rgba(0,150,0,1)";
        else if(level == 3)
            context.fillStyle = "rgba(0,0,150,1)";
        else
            context.fillStyle = "rgba(50,50,50,1)";

        
        context.fillRect(x, y, length, length);
        level++; 
        length = length/2;
        x += length; 
        drawSquare(x,y,length, level, context); 

    }
}

$(document).ready( function(){
    var c = document.getElementById("uniqueId");
    var context = c.getContext("2d");
    var x = 10; 
    var y = 10; 
    var length = 200; 
    var level = 0; 
    drawSquare(x, y, length, level, context); 
});