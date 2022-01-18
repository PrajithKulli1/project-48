var score = 0;
var jet, ufo, bullet, backBoard;

var jetImg,ufoImg,bulletImg,blastImg,backBoardImg;

var ufoGroup, bulletGroup;

var life = 3;
var score = 0;
var gamestate = 1;

function preload(){
  jetImg = loadImage("jet.png");
  blastImg = loadImage("blast.png");
  bulletImg = loadImage("bullet1.png");
  ufoImg = loadImage("ufo.gif");
  backBoardImg = loadImage("back.jpg");
}
function setup(){
  createCanvas(800,800);

  backBoard = createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg);

  jet = createSprite(100, height/2, 50,50);
  jet.addImage(jetImg);
  jet.scale=0.1;

  bulletGroup = createGroup();
  ufoGroup = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h1");
}
function draw(){
  background("#87ceeb");

  heading.html("Life: "+life);
  heading.style('color:red');
  heading.position(150,20);

  scoreboard.html("Score: "+score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  if(gamestate===1){
    jet.y=mouseY;

    if(frameCount % 40 === 0) {
      drawUfo();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if(ufoGroup.collide(backBoard)){
      handleGameover(ufoGroup);
    }

    if(ufoGroup.collide(bulletGroup)){
      handleUfoCollision(ufoGroup);
    }

  }

  drawSprites();
}

function drawUfo() {
  ufo = createSprite(800,random(20,780),40,40);
  ufo.addImage(ufoImg);
  ufo.scale = 0.1;
  ufo.velocityX = -8;
  ufo.lifetime = 400;
  ufoGroup.add(ufo);
  ufo.scale = 0.5;
}

function shootBullet() {
  bullet = createSprite(150, width/2, 50,20);
  bullet.y = jet.y-20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 7;
  bulletGroup.add(bullet);
}

function handleUfoCollision(ufoGroup){
  if(life > 0) {
    score = score+1;
  }

    blast = createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg);

  blast.scale = 0.3;
  blast.life=20;
  bulletGroup.destroyEach();
  ufoGroup.destroyEach();
}

function handleGameover(ufoGroup) {

    life=life-1;
    ufoGroup.destroyEach();


    if(life === 0) {
      gameState = 2;

      swal({
        title: 'Game Over',
        text: "Oops you lost the game...!!!",
        text: "your score is "+ score,
        imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: '100x100',
        confirmButtonText: "Thanks For Playing"
      });
      
    }
}