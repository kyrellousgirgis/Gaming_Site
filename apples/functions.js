var basket = $('#basket'),
    container = $('#container'),
    apples = $('.apple'),
    apple1 = $('#apple1'),
    apple2 = $('#apple2'),
    apple3 = $('#apple3'),
    restart = $('#restart'),
    score_span = $('#score'),
    score_1 = $('#score_1'),
    life_span = $('#life'),
    floor = $('#floor'),
    apple_initial_position = parseInt(apples.css('top')),
    score = 0,
    life = 5,
    speed = 2,
    the_game = 0,
    anim_id = 0,
    apple_current_position = 0,
    apple_top = 0,
    basket_top=parseInt(basket.css('top')),
    brokenNum = 0;

life_span.text(life);

$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
});

function moveApple(apple) {
    apple_current_position = parseInt(apple.css('top'));
    apple.css('top', apple_current_position + speed);
}

function appleHitsEnd(apple) {
    if (collision(apple, floor)) { 
        showBrokenApple(apple);
        decLife();
        return true;
    }
    return false;
}

function appleRestart(apple) {
    apple.css('top', apple_initial_position);
}

function showBrokenApple(apple) {
    brokenNum = apple.attr('num');
    $('#broken' + brokenNum).show();
    setTimeout(function () {
        $('#broken' + brokenNum).hide();
    }, 800);}


function decLife() {
    life--;
    life_span.text(life);
}

function appleHitsBasket(apple) {
    if (collision(apple, basket)) {
        apple_top = parseInt(apple.css('top'));
        if (apple_top < basket_top) {
            updateScore();
            return true;
        }
    }
    return false;
}

function updateScore() {
    score++;
    if (score % 10 === 0 && speed <= 15) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);
}

function stopGame() {
   
    restart.slideDown();
}
function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2+ w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}


restart.click(function () {
    location.reload();
});