$("#ship").hide();
$("#lives").hide();
$("#GO").hide();
$("#sound").hide();

$("#pirate").click(
    function () {
        clearInterval(pirateTimer);
        window.location.reload();
    }
);

var highScore = 0;
var newHighScore;
if(cki.hasCookie("pothighscore")){
    highScore = cki.getCookie("pothighscore");
      $("#hscore").html("Previous HighScore: "+ highScore);
}


$("#playbt").mouseenter(function () {
    $(this).effect("bounce", 300);
});

var lives;
var score;
var playSounds;

$("#sound").click(function(){
    if(playSounds){
        playSounds = false;
        $(this).attr("src","./potImgs/mute.png");
        Mute();
    }
    else{
        playSounds = true;
         $(this).attr("src","./potImgs/unmute.png");
        unMute();
    }
})

function unMute(){
    if(playing){
        PlayAudio("BG");
    }
    else if (!playing){
        PlayAudio("GameOver");
    }
}


function StartGame() {
    playSounds = true;
    PlayAudio("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#startmenu").hide();
    $("#logo").hide();
    $("#ship").show();
    $("#lives").show();
    $("#sound").show();
    lives = 5;
    score = 0;
    step = 5;
    bombId = 0;
    speed = 2000;
    playing = true;
    newHighScore = false;
    Game();

}

document.addEventListener("keydown", function (event) {
    if (!playing) event.preventDefault();
    var key = String.fromCharCode(event.keyCode);
    var trimmed = deleteChar(onScreenLetters, key);

    if (trimmed == "-1") {
        score = score - 2;
        if (score < 0) {
            score = 0;
        }
        $("#score").css("color","red");
        setInterval(function(){
               $("#score").css("color","whitesmoke");     
                    },500);
        changeScore();
    } else {
        onScreenLetters = trimmed;
        score++;
        changeScore();
        removeBomb(key);
    }


});


function ChangeBackgroundImg(img) {
    $("body").css("background-image", "url(" + "./potImgs/" + img + ')');
}

function PlayAudio(audioid, reset) {
    if(playSounds){
        if(reset == true)
            document.querySelector("#" + audioid).currentTime = 0;
        document.querySelector("#" + audioid).play();
    }
}

function Mute() {
    for (var i = 0; i < document.querySelectorAll("audio").length; i++) {
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
    stepTimer = setInterval(function () {
        step += 1;
    }, 10000);


    moverTimer = setInterval(function () {
        for (var j = 1; j <= 3; j++) {
            var x = document.querySelectorAll(".bomb" + j);
            if (x.length != 0) {
                for (var i = 0; i < x.length; i++) {
                    x[i].style.marginLeft = (parseInt(getComputedStyle(x[i]).marginLeft) - step) + "px";
                    if ((parseInt(getComputedStyle(x[i]).marginLeft) <= -100)) {
                        var k = x[i].innerHTML;
                        Damage(j, i, k);

                    }
                }
            }
        }

    }, 15);

}

function deleteChar(str, key) {
    var regex = new RegExp(key, "g");
    var del = onScreenLetters.search(regex);
    var s = "";
    if (del == -1) return "-1";
    else {
        for (var i = 0; i < str.length; i++) {
            if (i != del) s += str.charAt(i);
        }
    }
    return s;
}

function removeBomb(letter) {
    var flag = false;
    for (var j = 1; j <= 3 && !flag; j++) {
        var bombs = document.querySelectorAll(".bomb" + j);
        for (var i = 0; i < bombs.length && !flag; i++) {
            if (bombs[i].innerHTML == letter) {
                bombs[i].remove();
                PlayAudio("explode",true);
                flag = true;
            }
        }
    }
}

function changeScore() {
    var dig = 0;
    var s = parseInt(score);
    if (score == 0) {
        $("#score").html("Score:000000");
        return;
    }
    while (s > 0) {
        s = parseInt(s) / 10;
        dig++;
    }
    var str = "Score:";
    for (var i = 0; i <= (6 - dig); i++) {
        str += "0";
    }

    str += score.toString();
    $("#score").html(str);
}

var pirateTimer; //new game key

function Damage(cls, ind, key) {
    var del = deleteChar(onScreenLetters, key);
    if (del != "-1") onScreenLetters = del;

    var sel = ".bomb" + cls;
    $("#ship").effect("shake", 400);
    PlayAudio("Crash");
    lives--;
    if (lives == 0) {
        
        if(highScore<score){
                highScore = score;
                newHighScore = true;
            
                var expDate = new Date();
                expDate.setMonth(expDate.getMonth()+3);
            
                cki.setCookie("pothighscore",highScore,expDate);
            
        }
        
        
        setTimeout(function () {
            playing = false;
            clearInterval(bombTimer);
            clearInterval(levelTimer);
            clearInterval(moverTimer);
            
            
            ChangeBackgroundImg("GameOver2.jpeg");
            $("body").children().hide();
            Mute();
            PlayAudio("GameOver");
            setTimeout(function () {
                $("#GO").fadeIn(3000);
                $("#sound").css("left", "1400px");
                $("#sound").fadeIn(3000);
            }, 2000)
            pirateTimer = setInterval(function () {
                $("#pirate").effect("bounce", 1000);
            }, 5000)
        }, 1000);
        //console.log(newHighScore);
        //location.reload();
        $("#scr").html(newHighScore==true?("New High Score: " + score ):("Score: " + score));
        return;
    }
    if (lives > 0)
        $("#lives").children().eq(0).children().eq(lives).hide();
    $(sel).eq(ind).remove();

}
//fn lose life
//add listener on key press for body, check if character is in onScreenLetters
//flag mute


