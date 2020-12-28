$("body").css({height :"100%",overflow:"hidden"})
/*var car1 = $("#car1");
var carLeft = parseInt(car1.css("left"));
car1.animate({
   left:carLeft+50,
    top:window.innerHeight,
    width:700,
    height:650
},3000);*/

var CarList;
var leftList;
var direction;
var hero = $("#hero");
hero.css("position","absolute");
hero.css("top", window.innerHeight-hero.height()+10+"px");
var heroLeft =505;
hero.css("left",heroLeft+"px");
var coinInitLeft;
var coinLeft;
//hero.css("left",heroLeft+"px");
var dead ;
var level;
var coins;

var woodID,carID,coinID,carMID;

function init(){
    $("#para").text("");
    CarList = ["../imgs/car1.gif","../imgs/car4.png","../imgs/car5.png","../imgs/car3.png"];
    leftList = ["50%","47.5%","45%"];
    direction = [1,-3,-7];

    coinInitLeft = ["50%","49.5%","47%"];
    coinLeft = ["87.5%","44%","10.5%"];
    dead = false;
    level = 0;
    coins = 0;
    
    setTimeout(createCar,getRandom(1000,2000));
    setTimeout(createCoin,getRandom(500,1000));
    setTimeout(createWood,getRandom(500,1000));
}

function getRandom(min,max){
    return Math.random()*(max-min)+min;
}


function createCar(){
    var car = $("<img>");
    car.attr({src:CarList[Math.round(getRandom(0,3))], class:"car" });
    car.height("40");
    
    car.width("50");
    var left = Math.round(getRandom(0,2));

    car.css("position","absolute");
    car.css({left:leftList[left],top:"350px"});
    //car.css("left",leftList[left])
    $("body").prepend(car);
    /*car.animate({
    left:(parseInt(car.css("left"))+direction[left]),
    top:window.innerHeight,
    width:600,
    height:650
    },10000);
    */
    setTimeout(function(){moveCar(car,left,1)},100);
 
    carID = setTimeout(createCar,3500);
    
}

function createCoin(){
    
    var NumofColums = Math.round(getRandom(1,3));
    while(NumofColums){
        ColumPositionINdex = Math.round(getRandom(0,2))
        var coin = $("<img>")
        coin.attr({class:"coin",width:"0px",height:"0px",src:"../imgs/coin.gif"});

        coin.css({position:"absolute",left:coinInitLeft[ColumPositionINdex],top:"370px"});
        $("body").prepend(coin);
        moveCoin(coin,ColumPositionINdex);   
        
       coin.onPositionChanged(function(){
           
            var coinsList = $(".coin")
            coinsList.each(function(){
                if(/*!dead&&*/parseInt($(this).css("top")) >= Math.round(window.innerHeight - .15*window.innerHeight)&&parseInt($(this).css("top")) < Math.round(window.innerHeight - .1*window.innerHeight)&& (parseInt(hero.css("left"))+hero.width()>parseInt($(this).css("left"))&&parseInt($(this).css("left"))+$(this).width()>parseInt(hero.css("left")))&&(parseInt(hero.css("top"))+hero.height()>=parseInt($(this).css("top")))){

                    $(this).remove();
                    coins++;
                    $("#score").text(coins)
                    }
                });
            }
        );
        NumofColums--;
    }
    coinID = setTimeout(createCoin,5000);
    
}

function moveCoin(coin,left){
    coin.animate({left:coinLeft[left],top:window.innerHeight,height:200,width:200},5000,function(){
        coin.remove();
    }).effect("scale");
    
}


function moveCar(car1,left){
 //var newHeight = parseInt(car1.css("top"))>=window.innerHeight - 140?car1.height():car1.height()+5;
 //var newWidth = parseInt(car1.css("top"))>=window.innerHeight - 140? car1.width():car1.width()+5;
 var newTop = parseInt(car1.css("top"))>=Math.round(window.innerHeight - .3*window.innerHeight)?parseInt(car1.css("top"))+3:parseInt(car1.css("top"))+1; 
 if(parseInt(car1.css("top"))>=window.innerHeight - .3*window.innerHeight){
     car1.remove();
     $("body").append(car1);
 }
    
    
 car1.css({left:parseInt(car1.css("left"))+direction[left],top:newTop
           ,width:car1.width()+5,height:car1.height()+5})
    
    if(!dead&&parseInt(car1.css("top")) == Math.round(window.innerHeight - .3*window.innerHeight)&& (parseInt(hero.css("left"))+hero.width()>parseInt(car1.css("left"))&&parseInt(car1.css("left"))+car1.width()>parseInt(hero.css("left")))){
        
        
        dead = true;
        lost();
    }

    if(parseInt(car1.css("top"))>window.innerHeight)
        car1.remove();
    if(!dead)
        carMID = setTimeout(function(){moveCar(car1,left)},30);
}
function lost(){
    clearScreen();
    $("#para").text("You lost press any key to play again");
}
function createWood(){
    var wood = $("<img>");
    var ColumnPositionIndex = Math.round(getRandom(0,2))
     wood.attr({class:"wood",width:"0px",height:"0px",src:"../imgs/wood.png"});
     wood.css({position:"absolute",left:coinInitLeft[ColumnPositionIndex],top:"370px"});
     $("body").prepend(wood);
    wood.onPositionChanged(function(){
        if(parseInt(wood.css("top"))>=Math.round(window.innerHeight - .15*window.innerHeight)){
            wood.remove();
            $("body").append(wood);
        }
        var woods = $(".wood");
        woods.each(function(){
            if(/*!dead&&*/parseInt($(this).css("top")) >= Math.round(window.innerHeight - .15*window.innerHeight)&&parseInt($(this).css("top")) < Math.round(window.innerHeight - .1*window.innerHeight)&& (parseInt(hero.css("left"))+hero.width()>parseInt($(this).css("left"))&&parseInt($(this).css("left"))+$(this).width()>parseInt(hero.css("left")))&&(parseInt(hero.css("top"))+hero.height()>=parseInt($(this).css("top")))){ 
                dead = true;
                lost();
            }
        });
    });
    moveWood(wood,ColumnPositionIndex);
    woodID = setTimeout(createWood,getRandom(1000,2500));
}
function moveWood(wood,left){
    wood.animate({left:coinLeft[left],top:window.innerHeight,width:150,height:100},3000,function(){
        wood.remove();
    });
}

function clearScreen(){
    clearTimeout(woodID);
    clearTimeout(carID);
    clearTimeout(coinID);
    clearTimeout(carMID);
    var woods = $(".wood");
    woods.each(function(){
        $(this).remove();
    });
    var cars = $(".car")
    cars.each(function(){
        $(this).remove();
    });
    var coins = $(".coin");
    coins.stop();
    coins.each(function(){
        $(this).remove();
    });


    
}

$("body").keyup(function(e){
    if(dead||!CarList)
        init();
    else{
        if(e.keyCode == 37)
            if(parseInt(hero.css("left"))>heroLeft-300)
            hero.animate({left: parseInt(hero.css("left"))-100+"px"},25)//girl.css("left",parseInt(girl.css("left"))+100+"px");
        if(e.keyCode == 39)
            if(parseInt(hero.css("left"))<heroLeft+300)
            hero.animate({left: parseInt(hero.css("left"))+100+"px"},25)//girl.css("left",parseInt(girl.css("left"))+100+"px");
        if(e.keyCode ==32)
        {
            if(parseInt(hero.css("top"))==window.innerHeight-hero.height()+10){
                hero.animate({top:parseInt(hero.css("top"))-175+"px"},300,function(){
                hero.animate({top:parseInt(hero.css("top"))+175+"px"},700);
                });
            }
        }
    }
         
});