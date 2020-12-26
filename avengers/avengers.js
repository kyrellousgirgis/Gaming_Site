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

var score;
var playing = false;
function Game(){
    playing = true;
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

