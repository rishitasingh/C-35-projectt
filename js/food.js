class Food {
    constructor(){
       this.image = loadImage("Milk.png");
       //var foodStock, lastFed, foodObj;
       this.foodStock = 0;
    }

    display(){
        //console.log("display food "+this.foodStock)
        var x = 80, y = 100;
        //this.image = addImage(milkImg);
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        if(this.foodStock!=0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10==0){
                    x = 80;
                    y = y+50;

                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }

    getFoodStock(){}

    updateFoodStock(){}

    deductFood(){}
}