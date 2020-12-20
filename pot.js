$("#ship").hide();
$("#playbt").mouseenter(function(){$("#playbt").effect("bounce",300);});

function StartGame(){
    PlayAudio("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#startmenu").hide();
    $("#ship").show();
    
}

function ChangeBackgroundImg(img){
    $("body").css("background-image","url("+"./potImgs/"+img+')');
}
function PlayAudio(audioid){
    document.querySelector("#"+audioid).play();
}

