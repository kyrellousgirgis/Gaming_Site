$("#ship").hide();
$("#lives").hide();
$("#playbt").mouseenter(function () {
    $("#playbt").effect("bounce", 300);
});

var lives;
var score;
var highScore;


function StartGame() {
    PlayAudio("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#startmenu").hide();
    $("#logo").hide();
    $("#ship").show();
    $("#lives").show();
    lives = 5;
    score = 0;
    highScore = 0; //get highscore using cookies
    bombId = 0;
    speed = 2000;
    Game();

}

function ChangeBackgroundImg(img) {
    $("body").css("background-image", "url(" + "./potImgs/" + img + ')');
}

function PlayAudio(audioid) {
    document.querySelector("#" + audioid).play();
}

var bombTimer;
var levelTimer;
var speed;
var onScreenLetters = "";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
var bombId; //remove all references
var moverTimer


function Game() {

    bombTimer = setInterval(function () {
        var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        onScreenLetters += letter;
        var cls = Math.floor(Math.random() * 3) + 1;
        $("body").append("<label class='bomb" + cls + "' id='" + bombId + "'>" + letter + "</label>");
        bombId++;
    }, speed);
    levelTimer = setInterval(function () {
        if (speed >= 200)
            speed -= 100;
    }, 20000);
    var x = document.querySelectorAll('label')[3];
    console.log(x);

    moverTimer = setInterval(function () {
        for (var j = 1; j <= 3; j++) {
            var x = document.querySelectorAll(".bomb" + j);
            if (x.length != 0) {
                for (var i = 0; i < x.length; i++) {
                    x[i].style.marginLeft = (parseInt(getComputedStyle(x[i]).marginLeft) - 10) + "px";
                }
            }
        }

    }, 50);

}
//fn lose life
//add listener on key press for body, check if character is in onScreenLetters
var x = document.querySelectorAll(".bomb1");
