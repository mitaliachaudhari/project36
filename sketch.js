var dog;var happyDog;var dogImage;
var database;var foodStock;var foodS;
var fedTime,lastFed,feed,addFood,foodObj;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  
  database = firebase.database();
  foodObj = new Food();

  createCanvas(100, 400);


   foodStock=database.ref ('Food');
  foodStock.on("value",readStock)999

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
  
  feed = createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
background(46,139,87);
foodObj.display()

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
})

fill("green")
textSize(15)
if(lastFed>=12){
  text("lastFeed" +lastFed%12+"PM",350,30)
}
else if(lastFed==0){
 text("lastFeed=12AM",350,30)
}
else {
  text("lastFeed"+"lastFed"+"AM",350,30)
}

 
  drawSprites();
  //add styles here


}

function readStock(data){
foodS=data.val()
foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()  
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}


