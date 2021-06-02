//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;
// objects sounds
var knife;
var knifeImage;
var fruit1load;
var fruit2load;
var fruit3load;
var fruit4load;
var gameoverload;
var alien1load;
var alien2load;
var swoosh;
var die;
var i;
var over;
let fr =100000;

function preload() {
  //load game images
  knifeImage = loadImage("knife.png");
  fruit1load = loadImage("fruit1.png");
  fruit2load = loadImage("fruit2.png");
  fruit3load = loadImage("fruit3.png");
  fruit4load = loadImage("fruit4.png");
  alien1load = loadImage("alien1.png");
  alien2load = loadImage("alien2.png");
  gameoverload = loadImage("gameover.png");
  swoosh = loadSound("Sword-Slice-Quick-Transition-www.fesliyanstudios.com.mp3");
  die = loadSound("gameover.mp3");

}



function setup() {
  createCanvas(width*2+300, height*2+100);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  over = createSprite(40,200,20,20);
  

  //set collider for sword
  knife.setCollider("rectangle", 10, 30, 40, 100);
  
  // score variable
  score = 0;
  //create fruit and monster Group variable here
  fruit1G = createGroup();
  fruit2G = createGroup();
  fruit3G = createGroup();
  fruit4G = createGroup();
  alienGroup = createGroup();
}
function draw() {
  background("black");

  over.addImage(gameoverload);
  over.x=300;
  over.y=300;
  over.scale=3;
  over.visible = false;
  frameRate(fr)
  //game state
  if (gameState === PLAY) {
    
       
    camera.position.y= mouseY
    camera.position.x= mouseX
      
 

    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;



    // fruit and enemy spawner
    fruit1S();
    fruit2S();
    fruit3S();
    fruit4S();
    AlienSpawn();


    // Increase score if knife touching fruit
    if (knife.isTouching(fruit1G)) {
      score = score + 10;
      fruit1G.destroyEach();
      swoosh.play();
    }
    
    if (knife.isTouching(fruit2G)) {
      score = score + 20;
      fruit2G.destroyEach();
      swoosh.play();
    }
    
    if (knife.isTouching(fruit3G)) {
      score = score + 20;
      fruit3G.destroyEach();
      swoosh.play();
    }
    
    if (knife.isTouching(fruit4G)) {
      score = score + 50;
      fruit4G.destroyEach();
      swoosh.play();
    }
    
    // EndState if knife touching fruit
    if (knife.isTouching(alienGroup)) {
      die.play();
      gameState = END;
    }
  } else if (gameState === END) {
    //set so gameobjects don't disappear or move

    
    fruit1G.setLifetimeEach(-1);
    fruit2G.setLifetimeEach(-1);
    fruit3G.setLifetimeEach(-1);
    fruit4G.setLifetimeEach(-1);
    alienGroup.setLifetimeEach(-1);
    fruit1G.setVelocityYEach(0);
    fruit2G.setVelocityYEach(0);
    fruit3G.setVelocityYEach(0);
    fruit4G.setVelocityYEach(0);
    alienGroup.setVelocityYEach(0);
    
    // set gameover sign
    over.visible = true;
    
    
    textSize(30)
      fill(rgb(255,7,58))
    
    if(keyDown("r")){
      reset();
    }
    text("Press R to Restart, Final Score is "+score,100,500)
  }
  drawSprites();

  //Display score
  textSize(25);
  fill(rgb(57, 255, 20))
  text("Score : " + score, 250, 50);
}




function fruit1S(){
  
  if(frameCount%50===0){
    var fruit1 = createSprite(Math.round(random(10,550)),0);
    fruit1.velocityY = (5+(score/50));
    fruit1.addImage(fruit1load);
    fruit1.scale = height/4000;
    fruit1.lifetime = 150;
    fruit1G.add(fruit1);
  }
    
}

function fruit2S(){
  
  if(frameCount%70===0){
    var fruit2 = createSprite(Math.round(random(10,550)),0);
    fruit2.velocityY = (5+(score/50));
    fruit2.addImage(fruit2load);
    fruit2.scale = height/4000;
    fruit2.lifetime = 150;
    fruit2G.add(fruit2);
  }
    
}

function fruit3S(){
  
  if(frameCount%100===0){
    var fruit3 = createSprite(Math.round(random(10,550)),0);
    fruit3.velocityY = (5+(score/50));
    fruit3.addImage(fruit3load);
    fruit3.scale = height/4000;
    fruit3.lifetime = 150;
    fruit3G.add(fruit3);
  }
    
}


function fruit4S(){
  
  if(frameCount%80===0){
    var fruit4 = createSprite(Math.round(random(10,550)),0);
    fruit4.velocityY = (7+(score/30));
    fruit4.addImage(fruit4load);
    fruit4.scale = height/4000;
    fruit4.lifetime = 150;
    fruit4G.add(fruit4);
  }
    
}
function AlienSpawn() {
  // alien spawning
  if (frameCount % 100 === 0) {
    var alien = createSprite(Math.round(random(10, 550)), 0);
    alien.velocityY = (8 + (score / 45));
    var rand1 = Math.round(random(1,2));
    switch(rand1) {
      case 1: alien.addImage(alien1load);
              break;
      case 2: alien.addImage(alien2load);
              break;
      default: break;
    }
    alien.lifetime = 150;
    alien.scale = height/500
    alienGroup.add(alien);
  }
}


function reset(){
    fruit1G.setLifetimeEach(0);
    fruit2G.setLifetimeEach(0);
    fruit3G.setLifetimeEach(0);
    fruit4G.setLifetimeEach(0);
    alienGroup.setLifetimeEach(0);
    over.visible = false;
    gameState = PLAY;
    score =0;
    
}
