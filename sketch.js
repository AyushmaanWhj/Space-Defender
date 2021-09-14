var spaceCraft
var enemySpaceCraft
var laser_shot
var cooldown
var isDestroyed=false
var gameState


function preload(){
  spaceCraftImage=loadImage("spaceCraft.png")
  enemySpaceCraftImage=loadImage("enemySpaceCraft.png")
  earthImage=loadImage("earth.png")
  gameoverImage=loadImage("gameover.png")

}
function setup() {
  createCanvas(800,800);

  gameState=setup
//creating spaceCraft for player
  spaceCraft=createSprite(400, 650, 50, 50);
  spaceCraft.addImage(spaceCraftImage)
  spaceCraft.scale=0.5

  enemySpaceCraft=createSprite(2000,1,20,20)


  laser_shot=createSprite(1000,100,20,20)
  

  earth=createSprite(400,1050)
  earth.scale=0.2
  earth.depth=100
  earth.addImage(earthImage)
  cooldown=20

}

function draw() {
  background(0);  


  if(keyDown(13)){
   gameState="start"
  }
  console.log(enemySpaceCraft.y)
  cooldown=cooldown-1

  if(keyDown("r")&&gameState==="end"){
    restart()
  }

//adding movements
 keyBoardMovements()
  if(keyDown(32) && cooldown<=0 && isDestroyed===false){ 
    laserShot()
    cooldown=20
      }
//creating enemies      
    rnd=random(60,740)
        if(frameCount%100===0 && isDestroyed===false){
        enemySpaceCraft=createSprite(rnd,150,40,40)
        enemySpaceCraft.addImage(enemySpaceCraftImage)
        enemySpaceCraft.scale=0.5
        enemySpaceCraft.velocityY=5
      }


   if(laser_shot.isTouching(enemySpaceCraft)){
        laser_shot.destroy()
        enemySpaceCraft.destroy()
   }


   if(spaceCraft.isTouching(enemySpaceCraft)){
     isDestroyed=true
    spaceCraft.x=2000
    enemySpaceCraft.destroy()
}
    
if(enemySpaceCraft.y>800){
  console.log("you lost")
}


if(isDestroyed===true){
  gameState="end"
  image(gameoverImage,200,200,400,400)
  earth.x=-1000
  fill("white")
  textSize(20)
  text("Press'R' to restart",300,700,200,200)

}
  drawSprites();
}


function keyBoardMovements(){
  if(keyDown(UP_ARROW)){
    spaceCraft.y=spaceCraft.y-7
  } 

  if(keyDown(DOWN_ARROW)){
    spaceCraft.y=spaceCraft.y+7
  } 

  if(keyDown(LEFT_ARROW)){
    spaceCraft.x=spaceCraft.x-7
  } 

  if(keyDown(RIGHT_ARROW)){
    spaceCraft.x=spaceCraft.x+7
  } 
}

function laserShot(){ 

     laser_shot=createSprite(spaceCraft.x,spaceCraft.y,10,20)
     laser_shot.shapeColor="white"
     laser_shot.velocityY=-8

}
function restart(){
  gameState="start"
  spaceCraft.x=400
  spaceCraft.y=650
  isDestroyed=false
  earth.x=400
}