var sword, swordImage, gameOverImage;
// Create Game State 
var PLAY =1;
var END = 0;
var gameState = PLAY;
var monster, enemyGroup, monsterImage;
var fruitGroup, fruit, fruit1, fruit2, fruit3, fruit4; 
var score=0;
var knifeSwooshSound;
var gameOverSound;
var position;

function preload()
{
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
 gameOverSound = loadSound("gameover.mp3"); 
}

function setup()
{
  createCanvas(600,600);
  // Crateing Sword
  sword = createSprite(40,200,20,20); 
  sword.addImage(swordImage);  
  sword.scale = 0.7;
   
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}


function draw()
{
  background(255);
  
  if (gameState == PLAY)
    {
      fruits();
      Enemy();
      //To move sword with mouse
      sword.x = World.mouseX;
      sword.y = World.mouseY;
      
      if (fruitGroup.isTouching(sword))
      {
        fruitGroup.destroyEach();
        
        knifeSwooshSound.play();
        score = score + 2;      
      }   
      
    }
  
  text("Score: " + score, 500,50);
  
  // End Game
  if(enemyGroup.isTouching(sword) && gameState==PLAY)
    {
      gameState = END;
      fruitGroup.setVelocityXEach(0);
      fruitGroup.destroyEach();
      enemyGroup.setVelocityXEach(0);
      enemyGroup.destroyEach();
      sword.x = 300;
      sword.y = 300;
      sword.addImage(gameOverImage);
      // add gameover sound when gamestate = END
      gameOverSound.play();
    } 
  
  drawSprites(); 
}

function fruits()
{
  if(World.frameCount%80===0)
  {
        fruit = createSprite(400,200,20,20);
        fruit.scale = 0.2;
        //fruit.debug = true;
        r=Math.round(random(1,4));
        if (r==1)
      {
        fruit.addImage(fruit1);
      }
        else if (r==2)
      {
        fruit.addImage(fruit2);
      }
     else if (r==3)
      {
        fruit.addImage(fruit3);
      }
     else if (r==4)
      {
        fruit.addImage(fruit4);
      }
        
    fruit.y=Math.round(random(50,340)); 
    
    position = Math.round(random(1,2));
    
    if (position == 1)
      {        
        fruit.x = 400;
        fruit.velocityX = -(7+(score/4));
      }
    else
      {
        if ( position == 2)
          { 
              fruit.x = 0;
              fruit.velocityX  = (7+(score/4));     
          }
    
      }
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy()
{
 if(World.frameCount%200===0)  
  {
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = - (8 + (score / 10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}








