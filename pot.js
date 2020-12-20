$("#ship").hide();

function StartGame(){
    PlayMusic("BG");
    ChangeBackgroundImg("seabg.jpg");
    $("#playbt").hide();
    $("#ship").show();
    
}

function ChangeBackgroundImg(img){
    $("body").css("background-image","url("+"./potImgs/"+img+')');
}
function PlayMusic(audioid){
    document.querySelector("#"+audioid).play();
}



//try playing more than one sound at once