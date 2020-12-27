$(function () {

    var x;
    the_game = function () {

        if (appleHitsEnd(apple1) || appleHitsBasket(apple1)) {
            appleRestart(apple1);
        } else {
            moveApple(apple1);
        }

        if (appleHitsEnd(apple2) || appleHitsBasket(apple2)) {
            appleRestart(apple2);
        } else {
            moveApple(apple2);
        }

        if (appleHitsEnd(apple3) || appleHitsBasket(apple3)) {
            appleRestart(apple3);
        } else {
            moveApple(apple3);
        }

        if (life > 0) {
            x=setTimeout(the_game, 15);
    
        } else {
            stopGame();
            clearTimeout(x);
        }
        

    };
    x=setTimeout(the_game, 15);
  

});