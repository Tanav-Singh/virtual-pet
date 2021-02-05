//Create variables here
var dog, happydog;
var database;
var foodS;
var foodStock;
var lastFed;
var pet;
function preload()
{
  DogImg1 = loadImage("dogImg.png");
  DogImg2 = loadImage("dogImg1.png");
  MilkImg = loadImage("Milk.png");
}

function setup() {
  createCanvas(830, 550);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  Dog = createSprite(475,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;

  feed = createButton("Feed Your dog");
  feed.position(650,200);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(650,250);
  addFood.mousePressed(addFoods);

  input=createInput();
  input.position(650,300);
  
  button=createButton("SUBMIT");
  button.position(650,340);
  button.mousePressed(renamingDog)

}


function draw() {
  background(31, 196, 118);
  foodObj.display();
  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
 
  drawSprites();

  //fill(238, 241, 18);
  //noStroke();
  //textSize(30);
  //text("Food Remaining: " + foodS,50,265);
  //add styles here

  fill("red");
  stroke("green");
  strokeWeight(3)
  rect(640,192.5,117,33);
  rect(640,242.5,88,33);
 


  fill("brown");
  noStroke();
  textSize(30);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 380,140);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",380,140);
   }else{
     text("Last Fed : "+ lastFed + " AM", 380,140);
   }

   if(input.value()!==0)
  {
    textSize(20)
    textFont("chiller");
  text("Your Pet Name: "+ input.value(),650,313);
  }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  Dog.addImage(DogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  Dog.position.x=250;
  Dog.position.y=200;
}

//function to add food in stock
function addFoods(){
  Dog.addImage(DogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  Dog.position.x=475;
  Dog.position.y=250;
}
function renamingDog()
{
  Name=input.value();
  button.hide();
  input.hide();

}

