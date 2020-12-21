$("#ship").hide();
$("#lives").hide();
$("#playbt").mouseenter(function(){$("#playbt").effect("bounce",300);});

var lives;
var score;
var highScore;


function StartGame(){
    PlayAudio("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#startmenu").hide();
    $("#logo").hide();
    $("#ship").show();
    $("#lives").show();
    lives=5;
    score=0;
    highScore=0; //get highscore using cookies
    speed = 2000;
    Game();
    
}

function ChangeBackgroundImg(img){
    $("body").css("background-image","url("+"./potImgs/"+img+')');
}
function PlayAudio(audioid){
    document.querySelector("#"+audioid).play();
}

var bombTimer;
var levelTimer;
var moverTimer;
var speed;
var onScreenLetters = "";
const alphabet = "abcdefghijklmnopqrstuvwxyz"


function Game(){
    bombTimer = setInterval(function(){
        var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        onScreenLetters+=letter;
        var cls = Math.floor(Math.random() * 3)+1;
        $("body").append("<label class='bomb"+cls+"'>"+letter+"</label>").addClass("cannon"+cls);
   },speed);
    levelTimer= setInterval(function(){
                            if(speed>=200)
                           speed-=100; 
                            },20000);
}
//fn lose life
//add listener on key press for body, check if character is in onScreenLetters
