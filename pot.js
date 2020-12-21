$("#ship").hide();
$("#lives").hide();
$("#GO").hide();

$("#pirate").click(
    function(){
    clearInterval(pirateTimer);
    window.location.reload();
    }
);


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
    step = 5;
    highScore = 0; //get highscore using cookies
    bombId = 0;
    speed = 2000;
    playing=true;
    Game();

}

document.addEventListener("keydown", function (event) {
    if(!playing) event.preventDefault();
    var key = String.fromCharCode(event.keyCode);
    var trimmed = deleteChar(onScreenLetters,key);
    if(trimmed=="-1"){score-=2; if(score<0)score=0;}
    else {
        onScreenLetters = trimmed;
        changeScore();
        removeBomb(key);
    }
    
    
  });


function ChangeBackgroundImg(img) {
    $("body").css("background-image", "url(" + "./potImgs/" + img + ')');
}

function PlayAudio(audioid) {
    document.querySelector("#" + audioid).currentTime =0;
    document.querySelector("#" + audioid).play();
}

function Mute(){
    for(var i=0;i<document.querySelectorAll("audio").length;i++){
        document.querySelectorAll("audio")[i].pause();
    }
}

var bombTimer;
var levelTimer;
var stepTimer;
var speed;
var step;
var onScreenLetters = "";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var bombId; //remove all references
var moverTimer;
var playing;


function Game() {
    bombTimer = setInterval(function () {
        var letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        onScreenLetters += letter;
        var cls = Math.floor(Math.random() * 3) + 1;
        $("body").append("<label class='bomb" + cls + "'>" + letter + "</label>");
        PlayAudio("Cannon");
    }, speed);
    levelTimer = setInterval(function () {
        if (speed >= 400)
            speed -= 200;
    }, 15000);
    stepTimer = setInterval(function(){
        step+=1;
    },10000);


    moverTimer = setInterval(function () {
        for (var j = 1; j <= 3; j++) {
            var x = document.querySelectorAll(".bomb" + j);
            if (x.length != 0) {
                for (var i = 0; i < x.length; i++) {
                    x[i].style.marginLeft = (parseInt(getComputedStyle(x[i]).marginLeft) - step) + "px";
                    if((parseInt(getComputedStyle(x[i]).marginLeft)<=-100)){
                    var k = x[i].innerHTML;
                        Damage(j,i,k);
                        
                    }
                }
            }
        }

    }, 15);

}

function deleteChar(str,key){
    var regex = new RegExp(key,"g");
    var del = onScreenLetters.search(regex);
    var s = "";
    if(del==-1) return "-1";
    else{
        for(var i=0;i<str.length;i++){
            if(i!=del) s+=str.charAt(i);
        }
    }
    return s;
}

function removeBomb(letter){
    var flag =false;
    for(var j=1;j<=3 && !flag;j++){
        var bombs = document.querySelectorAll(".bomb"+j);
        for(var i=0;i<bombs.length && !flag;i++){
            if(bombs[i].innerHTML==letter){
                bombs[i].remove();
                PlayAudio("explode");
                flag=true;
            }
        }
    }
}

function changeScore(){
    score++;
    var dig=0;
    var s = score;
    while(s>0)
    {
        s=parseInt(s)/10;
        dig++;
    }
    var str = "Score: ";
    for(var i=0;i<=(6-dig);i++)
        str+="0";
    console.log(dig)
    console.log(str);
    str+= score.toString();
    $("#score").html(str);
}

var pirateTimer; //new game key

function Damage(cls,ind,key){
    var del=deleteChar(onScreenLetters,key);
    if(del!="-1") onScreenLetters = del;
        
    var sel = ".bomb"+cls;
    $("#ship").effect("shake",400);
    PlayAudio("Crash");
    lives--;
    if(lives==0) {
        setTimeout(function(){
            playing=false;
            clearInterval(bombTimer);
            clearInterval(levelTimer);
            clearInterval(moverTimer);
            ChangeBackgroundImg("GameOver2.jpeg");
            $("body").children().hide();
            Mute();
            PlayAudio("GameOver");
            setTimeout(function(){
                $("#GO").fadeIn(3000);
            },2000)
            pirateTimer = setInterval(function(){
                $("#pirate").effect("bounce",1000);
            },5000)
        },1000);
        //location.reload();
        alert(onScreenLetters+" "+score);
        return;
    }
    if(lives>0)
    $("#lives").children().eq(0).children().eq(lives).hide();
    $(sel).eq(ind).remove();
    
}
//fn lose life
//add listener on key press for body, check if character is in onScreenLetters
//flag mute