$("body").children().hide();


$("#htp").fadeIn(1500);

$("#start").mouseover(function(){
    $(this).css("opacity","100%");
});

$("#start").mouseout(function(){
    $(this).css("opacity","75%");
});

$("#play-again-btn").mouseover(function(){
    $(this).css("opacity","100%");
});

$("#play-again-btn").mouseout(function(){
    $(this).css("opacity","75%");
});

var playSounds = true;

$("#start").click(function(){
    $("#htp").fadeOut(1000);
    $("#ship").fadeIn(1200);
    $("#GameBar").fadeIn(1500);
    PlayAudio("BG");
    Game();
    
});

$("#play-again-btn").click(function(){
    location.reload();
})

function PlayAudio(audioid, reset) {
    if(playSounds){
        if(reset == true)
            document.querySelector("#" + audioid).currentTime = 0;
        document.querySelector("#" + audioid).play();
    }
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


             
var score = 0;
var lives = 5;
var playing = false;
var heroTimer;
var heroSpeed = 2000;
var fallTimer;
var fallSpeed = 5;

function Game(){
    playing = true;
    heroTimer= setInterval(function(){
        var heroId = Math.floor(Math.random()*9)  + 1;
        
        hero = document.querySelector('#h'+heroId).cloneNode(true);
        document.body.appendChild(hero);
        //$(hero).show();
        
        var max = window.innerWidth-hero.width;
        var pos =  Math.floor(Math.random()*(max));
        if(pos>=max)
            pos-=50;
        else if (pos<=0)
            pos+=50;
        
        if(pos<=50) pos=50;
        else if(pos>=max-50) pos=max-50;
        
        $(hero).css("left",pos +"px");
        $(hero).css("top",-60);
        $(hero).show();
        //console.log(playSounds);
        PlayAudio("Enter",true);
        
          },heroSpeed);
    
        
        var fallTimer = setInterval(function(){
            for(var i=0;i<$(".hero").length;i++){
                var tp =  parseInt($(".hero").eq(i).css("top"));
                $(".hero").eq(i).css("top",tp+fallSpeed+"px");

                var hero = $(".hero").eq(i);
                var ship = $("#ship");
                if(collision(hero,ship)){
                    if(hero.attr("src") == "./avgImgs/strange.png"){
                        lives++;
                        lifeGained();
                        PlayAudio("Save",true);
                        $("#live-spn").html(lives);
                        hero.fadeOut(100).remove();
                        score++; 
                        $("#score-spn").text(score);   
                    }else{
                        PlayAudio("Save",true);
                        hero.fadeOut(100).remove();
                        score++; 
                        $("#score-spn").text(score);
                    }
                    
                }
                if(tp > window.innerHeight-parseInt($(hero).css("height"))-10){
                    if(lives > 1){
                        $(".hero").eq(i).fadeOut(500).remove();
                        lives--;
                        $("#live-spn").html(lives);
                        lifeLost();
                    }else{
                    //gameOve
                        lives--;
                        $("#live-spn").html(lives);
                        lifeLost();
                        clearInterval(heroTimer);
                        clearInterval(fallTimer);
                        playing = false;  
                        $("#ply-agn").show();
                        $("#final-score").text(score);
                    }
                    
                }
            
            }
                
            
           for(var i=0;i<$(".villain").length;i++){
                var tp =  parseInt($(".villain").eq(i).css("top"));
                $(".villain").eq(i).css("top",tp+fallSpeed+"px");

                var villain = $(".villain").eq(i);
                var ship = $("#ship");
                if(collision(villain,ship)){
                    if(lives > 1){
                        villain.fadeOut(100).remove();
                        lives--;
                        lifeLost();
                        $("#live-spn").html(lives);
                    }else{
                        //gameOver
                        lives--;
                        lifeLost();
                        $("#live-spn").html(lives);
                        clearInterval(heroTimer);
                        clearInterval(fallTimer);
                        playing = false;  
                        $("#ply-agn").show();
                        $("#final-score").text(score);
                    }
                    
                }
                if(tp > window.innerHeight-parseInt($(hero).css("height"))-10){
                   
                    $(".villain").eq(i).fadeOut(500).remove();
                }

            }
        },25);
             
  
}


$(this).keydown(function(event){
    if(!playing) return;
    var left = $("#ship").css("left");
    left = parseInt(left);
    if(event.keyCode == 37){
        if(left-30 >0)
        left-=30;
        $("#ship").css("left",left+"px" );
    }
    else if(event.keyCode == 39){
        if(left+30<window.innerWidth-parseInt($("#ship").css("width")))
            left+=30;
        $("#ship").css("left",left+"px" );
    }
    
})

function lifeLost(){

    $("#GameBar").children().eq(0).css("color","red");
    setInterval(function(){
            $("#GameBar").children().eq(0).css("color","white");
            },900);
}

function lifeGained(){
    $("#GameBar").children().eq(0).css("color","green");
    setInterval(function(){
            $("#GameBar").children().eq(0).css("color","white");
            },900);
}

