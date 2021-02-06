var balloon,balloonPosition;
var h;

function preload(){
  bg = loadImage('Hot Air Ballon-01.png');
  balloonImage = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(1200,500);
  database = firebase.database();

  balloon = createSprite(600, 100, 20, 20);
  balloon.addAnimation("balloon", balloonImage);
  balloon.scale = 0.4;

  var balloonPosition = database.ref('balloon/position');
  console.log(balloonPosition);
  balloonPosition.on('value',readHeight,showError);
  
}

function draw() {
  

  background(bg);
  
  if(keyDown(LEFT_ARROW)){
 //   balloon.x = balloon.x - 10;
 updateHeight(-10,0);
  }
 
   if(keyDown(RIGHT_ARROW)){
  //  balloon.x = balloon.x + 10;
  updateHeight(10,0);
  }

   if(keyDown(UP_ARROW)){
   updateHeight(0,-10);
 //  balloon.addAnimation("hotAirBalloon",balloonImage)
 //  balloon.scale = balloon.scale -0.01; 
 //   balloon.y = balloon.y - 10;
  }

   if(keyDown(DOWN_ARROW)){
    //balloon.y = balloon.y + 10;
    updateHeight(0,10);
  }

console.log(balloon.x);
//updateHeight(0,10);

  drawSprites();
  
}

function updateHeight(x,y){                             
//  console.log(x);
//  console.log(y); 
  
  database.ref('balloon/position').set({
    x : h.x + x,
    y : h.y + y

  })
// console.log(h);
}

function readHeight(data){
  h = data.val();
 // console.log(h);
  balloon.x = h.x;
  balloon.y = h.y ;
 // console.log(h);
}

function showError(){
  console.log("Error is writing to the database");
}