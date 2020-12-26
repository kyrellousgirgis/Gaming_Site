$("body").children().hide();


$("#htp").fadeIn(1500);

$("#start").mouseover(function(){
    $(this).css("opacity","100%");
});

$("#start").mouseout(function(){
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

function PlayAudio(audioid, reset) {
    if(playSounds){
        if(reset == true)
            document.querySelector("#" + audioid).currentTime = 0;
        document.querySelector("#" + audioid).play();
    }
}

             
var score = 0;
var playing = false;
var heroTimer;
var heroSpeed = 2000;
var fallTimer;
var fallSpeed = 5;
function Game(){
    playing = true;
    heroTimer= setInterval(function(){
        var heroId = Math.floor(Math.random()*9)  + 1;
        var hero = document.querySelector('#h'+heroId);
        
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
        
          },heroSpeed);
        
        var fallTimer = setInterval(function(){
            for(var i=0;i<$(".hero").length;i++){
                var tp =  parseInt($(".hero").eq(i).css("top"));
                $(".hero").eq(i).css("top",tp+fallSpeed+"px");
            
            }
                
            
           for(var i=0;i<$(".villain").length;i++){
                var tp =  parseInt($(".villain").eq(i).css("top"));
                $(".villain").eq(i).css("top",tp+fallSpeed+"px");
            
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

