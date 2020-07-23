/* global createCanvas, colorMode, HSB, background, ellipse, random, width, height,line, rect,sqrt,distance1, text,mouseX,mouseY,rectMode,CENTER,distance2,round */

let backgroundColor, spherePosition, rectPosition, mousePosition,turn

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // This variable contains a JSON object
  coinPosition = {
    "x":random(width),
    "y":random(height)
  }
  
  robotPosition = {
    "x": random(width),
    "y": random(height)
  }
  turn ="robotTurn"
  yourPosition = {
    "x": random(width),
    "y":random(height)
  }
  
}

function draw() {
  mousePosition = {
    "x": mouseX,
    "y":mouseY
  }
  background(backgroundColor);
  fill(backgroundColor)
  noStroke()
  ellipse(coinPosition.x, coinPosition.y, 100,100)
  fill(0,100,100)
  rect(robotPosition.x, robotPosition.y, 20,20)
  fill(100,100,100)
  rect(yourPosition.x, yourPosition.y,20,20)
  if (turn != "over"){
   let botdistance = getBotDistance()
   fill('black')
   text(`Robot is ${botdistance} away from coin.`, 20,60)
  let distance1 = yourDistance()
    text(`You are ${distance1} units away from the coin; and you are ${category}`,20,40)
  
  
  }
  
  if(turn == "robotTurn"){
    
    botTurn();
    
    turn = "playerTurn"
    
  }
  
  else if (turn == "playerTurn"){
    yourTurn();
    
    
    
 
    
    
    
    
  }
  checkCollision()
 
}

function computeDistance(point1, point2){
  //sqrt of (x2 -x1)^2 + (y2-y1)^2
  //sqrt()
  //x**2
  let deltaX = point2.x - point1.x
  let deltaY = point2.y - point1.y
  let distance = sqrt((deltaX**2) + (deltaY**2))
  return round(distance);
}

function computeCategoryOfDistance(point1,point2){
  let distance = computeDistance(point1,point2)
  // distance > 200 cold
  //>50, <200 = warm
  //<50 = hot
  if(distance > 200){
   
    backgroundColor = color(240,10,100)
     return "cold";
  }
  else if (distance > 50){
   
    backgroundColor = color(120,10,100)
     return "warm";
  }
  else {
    backgroundColor = color(0,10,100)
     return "hot";
  }
  
}

function yourTurn() {
  if(mouseIsPressed){
  yourPosition.x = mouseX
  yourPosition.y = mouseY
  
  turn = "robotTurn"
  
  
  }
  
  
}
function yourDistance(){
  distance = computeDistance(coinPosition, yourPosition)
  category = computeCategoryOfDistance(coinPosition, yourPosition)
  return distance
  
}
function botTurn(){
  
  robotPosition.x = random(width-10) + 10
  robotPosition.y = random(height-10) + 10
  
  
}

function getBotDistance(){
  let botdistance = computeDistance(robotPosition, coinPosition)
 
  return botdistance
  
}

function checkCollision(){
  let hit = collideRectCircle(yourPosition.x, yourPosition.y,20,20,coinPosition.x, coinPosition.y, 100,100);
  
  if(hit) {
     turn = "over"
    fill(60,100,100)
    ellipse(coinPosition.x,coinPosition.y, 100,100)
    fill('black')
    textSize(30)
    text("YOU WIN", width/2, height/2)
   
  }
  let collide = collideRectCircle(robotPosition.x, robotPosition.y, 20,20,coinPosition.x, coinPosition.y, 25,25);
  if(collide){
     turn = "over"
    fill(60,100,100)
    ellipse(coinPosition.x,coinPosition.y, 100,100)
    fill('black')
    textSize(30)
    text("ROBOT WINS", width/2, height/2)
    
    
  }
}