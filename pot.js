$("#ship").hide();
$("#lives").hide();
$("#playbt").mouseenter(function(){$("#playbt").effect("bounce",300);});


function StartGame(){
    PlayAudio("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#startmenu").hide();
    $("#logo").hide();
    $("#ship").show();
    $("#lives").show();
    
}

function ChangeBackgroundImg(img){
    $("body").css("background-image","url("+"./potImgs/"+img+')');
}
function PlayAudio(audioid){
    document.querySelector("#"+audioid).play();
}

