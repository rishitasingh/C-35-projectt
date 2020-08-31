//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
var lastFed;

function preload()
{
  //load images here

  dogImg = loadAnimation("Dog.png");
  happyDogImg = loadAnimation("happydog.png");
  //milkImg = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  
  dog = createSprite(250, 250, 30, 30);
  dog.addAnimation("dog1",dogImg);
  dog.addAnimation("dog2",happyDogImg);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value", getFood);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  food = new Food (150,150,50,50);
}


function draw() {  

  background(46, 139, 87);
  fedTime = database.ref('feedTime'); 
  fedTime.on("value", function(data){
    lastFed = data.val();
    
  });

  food.display();
  getFood();

  drawSprites();
  //add styles here
  textSize(22);
  fill("red");
  stroke(3);
  text("press UP ARROW key to feed the dog", 60, 100);

  fill(255,255,254);
  textSize(15);
  
  if(lastFed>=12){
    //console.log(lastFed);
    text("Last Feed : " + lastFed%12 + "PM", 350, 30);

  }
  else if(lastFed==0){
    text("Last Feed : 12AM ",350, 30 );

  }
  else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }
  

}
function feedDog(){
  
  dog.changeAnimation("dog2",happyDogImg);
  foodS--;
    database.ref('/').update({
    Food:foodS,
    feedTime: hour()
  })
}

function addFoods(){
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
}

function getFood(){
  database.ref("Food").on("value", (data)=>{
    foodS = data.val();
    food.foodStock = foodS;
  })
}
