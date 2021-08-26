//******************************************************************/
//File: proj2_2.js
//Author: Caleb M. McLaren
//Email: mclaren1@umbc.edu
//Date: July 5th, 2021
//Course: CMSC 433 Scripting - Dr. Dixon
//Description: JavaScript file animating a walking knight and his moving canvas
//******************************************************************/

//explore use of canvas as object to animate
let img = new Image();
img.src = 'proj2_sprite_knight.png';

//create the canvas
let canvas = document.getElementById("otherImage");
let ctx = canvas.getContext('2d');

//Initialize the starting position of the canvas. 
canvas.style.top = '160px'; 
canvas.style.left = '10px';

//get the canvas coordinate into int form.
var topCoord = canvas.style.top.replace('px', '');
var myTop = parseInt(topCoord, 10);
var leftCoord = canvas.style.left.replace('px', '');
var myLeft = parseInt(leftCoord, 10); 

//sprite values
const width = 250; 
const height = 250;
const frameRate = 10; 

//wrapper function for context.drawImage()
function drawKnight( frameX, frameY, canvasX, canvasY){
  ctx.drawImage(img,
    frameX * width,
    frameY * height,
    width - 50 , height - 10,
    canvasX,
    canvasY, 
    width - 50 , height - 10); 

}

//factors to be fed to drawKnight to select the correct frame from proj2_sprite_knight.png
const runAwayCycleX = [0, 1, 0, 2];
const runAwayCycleY = [0, 0, 0, 0];

const stepForwardCycleX = [3, 0, 3, 1];
const stepForwardCycleY = [0, 1, 0, 1];

const runLeftCycleX = [2, 3, 2, 0];
const runLeftCycleY = [1, 1, 1, 2];

const runRightCycleX = [1, 2, 1, 3];
const runRightCycleY = [2, 2, 2, 2];

//indexes and holder of return from requestAnimationFrame()
let loopIndex = 0; 
let frameIndex = 0; 
var knightX = 0; 
var knightY = 0; 
let requestID;

//******************************************************************/
//function to animate knight walking up the canvas/screen or "away" from the user.
//******************************************************************/ 
function runAway(){
  //slow down the animation, i.e. draw every 15 calls to runAway()
  frameIndex++;
  if (frameIndex < frameRate){
    requestID = window.requestAnimationFrame(runAway);
    return;
  }
  frameIndex = 0; 

  //clear canvas and draw next step
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //move knight across the canvas
  knightY -= 5;
  if (knightY >= 0 ){
    drawKnight(runAwayCycleX[loopIndex], runAwayCycleY[loopIndex], knightX, knightY);
  } 
  else {
    knightY = 0;
    drawKnight(runAwayCycleX[loopIndex], runAwayCycleY[loopIndex], knightX, knightY);
  }
  
  //loop and reset the fram being targeted
  loopIndex++;
  if (loopIndex == runAwayCycleX.length ){
    loopIndex = 0;
  }

}
//******************************************************************/
//function to animate knight walking down the canvas/screen or "toward"  the user.
//******************************************************************/
function stepForward(){
  //slow down the animation, i.e. draw every 15 calls to stepForward()
  frameIndex++;
  if (frameIndex < frameRate){
    requestID = window.requestAnimationFrame(stepForward);
    return;
  }
  frameIndex = 0;

  //clear canvas and draw next step
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //move knight across the canvas
  knightY += 5;
  if (knightY <= (canvas.height - 250) ){
    drawKnight(stepForwardCycleX[loopIndex], stepForwardCycleY[loopIndex], knightX, knightY);
  } 
  else {
    knightY = (canvas.height - 250) ;
    drawKnight(stepForwardCycleX[loopIndex], stepForwardCycleY[loopIndex], knightX, knightY);
  }
  
  //loop and reset the frame being targeted
  loopIndex++;
  if (loopIndex == stepForwardCycleX.length ){
    loopIndex = 0;
  }
 
}
//******************************************************************/
//function to animate knight walking left along the canvas/screen.
//******************************************************************/
function runLeft(){
  //slow down the animation, 
  // i.e. draw every 15 calls to runLeft()
  frameIndex++;
  if (frameIndex < frameRate){
    requestID = window.requestAnimationFrame(runLeft);
    return;
  }
  frameIndex = 0;

  //clear canvas and draw next step
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //move knight across the canvas
  knightX -= 5;
  if (knightX >= 0 ){
    drawKnight(runLeftCycleX[loopIndex], runLeftCycleY[loopIndex], knightX, knightY);
  } 
  else {
    knightX = 0;
    drawKnight(runLeftCycleX[loopIndex], runLeftCycleY[loopIndex], knightX, knightY);
  }
  
  //loop and reset the frame being targeted
  loopIndex++;
  if (loopIndex == runLeftCycleX.length ){
    loopIndex = 0;
  } 
}

//******************************************************************/
//function to animate knight walking left along the canvas/screen.
//******************************************************************/
function runRight(){
  //slow down the animation, i.e. draw every 15 calls to runRight()
  frameIndex++;
  if (frameIndex < frameRate){
    requestID = window.requestAnimationFrame(runRight);
    return;
  }
  frameIndex = 0;

  //clear canvas and draw next step
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  knightX += 5;
  if (knightX <= (canvas.width - 165) ){
    drawKnight(runRightCycleX[loopIndex], runRightCycleY[loopIndex], knightX, knightY);
  } 
  else {
    knightX = (canvas.width -  165);
    drawKnight(runRightCycleX[loopIndex], runRightCycleY[loopIndex], knightX, knightY);
  }

  //loop and reset the frame being targeted
  loopIndex++;
  if (loopIndex == runRightCycleX.length ){
    loopIndex = 0;
  }
}

//******************************************************************/
// Called when image loaded
// Depends on runRight(), runLeft(), stepForward() and runAway()
//******************************************************************/
function init() {
  //animation code goes here
  drawKnight(3, 0, 0, 0);

  document.addEventListener('keydown', function(event){
    
    if( event.code == "ArrowRight" || event.key == "d" ){
      if (event.repeat){
        if( requestID ){
          window.cancelAnimationFrame(requestID);
        }

        //if ctrl key + 'd' pressed, move canvas right 
        if ( event.ctrlKey ){
          myLeft += 5; 
          if (myLeft <= window.innerWidth){
            canvas.style.left = `${myLeft}px`;
          } 
          else {
            myLeft = window.innerWidth;
            canvas.style.left = `${myLeft}px`; 
          }
        }
        //otherwise, canvas stays in place
        requestID = window.requestAnimationFrame(runRight);
        
      }
    }

    else if( event.code == "ArrowLeft" || event.key == "a"){
      if (event.repeat){
        if( requestID ){
          window.cancelAnimationFrame(requestID);
        }

        //move canvas left if ctrl key + 'a' pressed 
        if ( event.ctrlKey ){
          myLeft -= 5; 
          if (myLeft >= 0){
            canvas.style.left = `${myLeft}px`;
          } 
          else {
            myLeft = 0;
            canvas.style.left = `${myLeft}px`; 
          }
        }
        requestID = window.requestAnimationFrame(runLeft);
      }
    }

    else if( event.code == "ArrowUp" || event.key == "w"){
      if (event.repeat){
        if( requestID ){
          window.cancelAnimationFrame(requestID);
        }
        if (event.ctrlKey){
          //move canvas up
          myTop -= 5; 
          if (myTop >= 0){
            canvas.style.top = `${myTop}px`;
          }
          else { 
            myTop = 0;
            canvas.style.top = `${myTop}px`; 
          }
        }
        requestID = window.requestAnimationFrame(runAway);
      }
    }

    else if( event.code == "ArrowDown" || event.key == "s"){
      if (event.repeat){

        if( requestID ){
          window.cancelAnimationFrame(requestID);
        }

        if (event.ctrlKey){
          //move canvas down
          myTop += 5;
          if (myTop <= window.innerHeight){
            canvas.style.top = `${myTop}px`;
          } 
          else {
            myTop = window.innerHeight;
            canvas.style.top = `${myTop}px`; 
          }
        }
        requestID = window.requestAnimationFrame(stepForward);
      }
    }
  });

  document.addEventListener('keyup', function(event){
    if( event.code == "ArrowRight" || event.key == "d"
        || event.code == "ArrowLeft" || event.key == "a"
        || event.code == "ArrowUp" || event.key == "w"
        || event.code == "ArrowDown" || event.key == "s")
    {
      window.cancelAnimationFrame(requestID);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawKnight(3, 0, knightX, knightY);
    }
  });
}

//******************************************************************/
//when image has loaded, call init
//******************************************************************/
img.onload = function() {
  init();
};