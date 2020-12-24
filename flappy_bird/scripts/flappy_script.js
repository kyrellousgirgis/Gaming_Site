$(document).ready(function() {
    var backTrack = document.createElement('audio');
    backTrack.setAttribute('src', '../Sounds/background.mp3');
    backTrack.currentTime = 1;
    var jumbEffect = document.createElement('audio');
    jumbEffect.setAttribute('src','../Sounds/Mario_Jump.mp3');
    jumbEffect.currentTime = .4;
    jumbEffect.addEventListener("ended",function(){
        jumbEffect.currentTime = .4;
    })
    jumbEffect.volume = .7;
    
    var lostTrack = document.createElement('audio');
    lostTrack.setAttribute('src',"../Sounds/Lost.mp3");
    lostTrack.addEventListener("ended",function(){
        lostTrack.currentTime = 0;
    });
    
    
    var levelUp = document.createElement('audio');
    levelUp.setAttribute('src',"../Sounds/levelUp.mp3");
    levelUp.addEventListener("ended",function(){
        levelUp.currentTime = 0;
    });
    levelUp.volume = 1;
       


var lostFlag = 0; 
var img = $("#bird");
var imgTop = $("#bird").css('top');
var CID,PID,SID,LID;
var Level,Score,heighestScore;
function init(){
    backTrack.play();
    Level = 1;
    Score = 0;
    if(_c.hasCookie("highestScore")>=0){
        heighestScore = _c.getCookie("highestScore");
        }
    else{
        heighestScore = 0;
        _c.setCookie("highestScore",Score.toString());
    }
    $("#highestScoreData").text(heighestScore);
    clearScreen();    
    lostFlag = 0;
    $("body").css({height :"100%",overflow:"hidden"})
    img.css({position : "absolute"});
    $("#para").html("");
    $("#levelData").text(Level);
    createCloud();
    createPipes();
    calcScore();
    setTimeout(calcLevel,5000);
    fall();
}



function getRandom(max,min){
    return Math.random()*(max-min)+min;
}


function createCloud(){
    if(lostFlag)
        return;
    var cloud = $("<img>");
    cloud.attr({src : "../imgs/cloud.png",class:"cloud",width:"150px",heigth:"100px"});
    $("body").prepend(cloud);
    cloud.css({position:"absolute", top:getRandom(100,0) +"px" ,left:window.innerWidth})
    moveClouds();
    CID = setTimeout(createCloud,getRandom(3500,200));
}

function createPipes(){
    if(lostFlag)
        return;
    var pipe = $("<img>");
    var pipeI = $("<img>");
    levelMAx = Level<7?Level:7;
    pipeHeight = getRandom(50,200+(levelMAx*10));
    pipeIheight = 250+(levelMAx*20)-pipeHeight;
    pipeI.attr({src:"../imgs/MarioPipe.png",class:"pipeI",width:"75px",height:pipeHeight+"px"});
    pipe.attr({src:"../imgs/MarioPipe.png",class:"pipe",width:"75px",height:pipeIheight+"px"});
    $("body").append(pipe);
    $("body").append(pipeI);
    pipe.css({position:"absolute",left:window.innerWidth,top:window.innerHeight-pipe.height()})
    pipeI.css({position:"absolute",left:window.innerWidth,top:"0px",transform:"scaleY(-1)"})
    movePipes();
    var divided = Level<7?Level:7;
    PID = setTimeout(createPipes,getRandom(7000/divided,1000));
}

function movePipes(){
    var pipes = $(".pipe");
    var pipesI = $(".pipeI");
    
    pipesI.animate({left:0-pipesI.width()},5000,"linear",function(){
        pipesI.each(function(index){
            if(parseInt(this.style.left)<=-75)
                this.remove();
            })
    });
    pipes.animate({left:0-pipes.width()},5000,"linear",function(){
            pipes.each(function(index){
                if(parseInt(this.style.left)<=-75)
                    this.remove();
            })
    });
}

function moveClouds(){
    var clouds = $(".cloud");
    clouds.animate({left:-300+"px"},getRandom(10000,2000),"linear",function(){
            clouds.each(function(index){
                if(parseInt(this.style.left)<=-150)
                    this.remove();
            })
    });
}



/*var id = setInterval(function(){
    img.offset({top: img.offset().top +10});
},50);

*/
img.onPositionChanged(function(){
    if(parseInt(img.css('top'))<=0)
        lost();
    var pipes = $(".pipe");
    var pipesI = $(".pipeI");
    pipes.each(function(index){
        if(parseInt($(this).css('top'))<=(parseInt(img.css('top'))+img.height())&&parseInt(img.css('left'))+img.width()>= parseInt($(this).css('left'))&&parseInt(img.css('left'))<parseInt($(this).css('left'))+parseInt($(this).width())){
            lost();
        }
    })
    
    pipesI.each(function(index){
        if($(this).height()>=(parseInt(img.css('top')))&&parseInt(img.css('left'))+img.width()>= parseInt($(this).css('left'))&&parseInt(img.css('left'))<parseInt($(this).css('left'))+parseInt($(this).width())){
            lost();
        }
    })
});


function fall(){
    img.animate({top:window.innerHeight-img.height()},1500,function(){
        lost()
    });
}




$("body").keydown(function(e){
    if(lostFlag||!Score){
        init();
        return;
    }
    
    else if(e.keyCode == 32){
        lostTrack.pause();
        lostTrack.currentTime = 0;
        jumbEffect.currentTime = .4;
        jumbEffect.play();
        img.stop();
        img.animate({top:parseInt(img.css('top'))-50+"px"},200,function(){
            fall();
        });
    }
    
})


function lost(){
    levelUp.pause();
    levelUp.currentTime = 0;
    jumbEffect.pause();
    jumbEffect.currentTime = .4;
    backTrack.pause();
    backTrack.currentTime = 1;
    lostTrack.play();
    clearScreen();
    clearTimeout(CID);
    clearTimeout(PID);
    clearTimeout(SID);
    clearTimeout(LID);
    img.stop();
    img.css({top: imgTop} );
    if(_c.getCookie("highestScore")<Score){
       _c.setCookie("highestScore",Score.toString());
        $("#highestScoreData").text(Score);
    }
    
    lostFlag = 1;
    var message = $("<p>You lost press any key to play again.</p>")
    message.css({color:"white",fontSize:"28px",fontFamily:"oldGame"});
    $("#para").html(message);
    
}
function clearScreen(){
 var pipes = $(".pipe")
 var pipesI = $(".pipeI")
 var clouds = $(".cloud");
    pipes.each(function(){
        $(this).remove();
    });
    pipesI.each(function(){
        $(this).remove()
    });
    clouds.each(function(){
        $(this).remove();
    });   
}

function calcScore(){
    if(!lostFlag){
        Score+=1;
        $("#scoreData").text(Score);
        //$("#scoreData").text(parseInt(currScore)+1);
        SID = setTimeout(calcScore,10)
    }
}

function calcLevel(){
    if(!lostFlag){
        levelUp.play();
        Level+=1;
        $("#levelData").text(Level);
        LID = setTimeout(calcLevel,10000);
    }
    }
});