$(function () {

  var arr = ["banana", "sandia", "peach", "apple", "boom"];
  var lives = 3;
  var angle = 0;
  var score = 0;
  var action;
  var boomflag = 0;
  var s=3;
  //var menuSound =document.getElementById("#menuSound");
  var menuSound = new Audio("sound/menu.mp3");
  $("#fru").hide();
  $("#lose").hide();
  menuSound.play();


  $("#scoreDiv").hide();
  $("#fruit").slideDown();
  $("#shade").slideDown();
  $("#logo").slideDown(1000).effect("bounce", "slow");


  var round1 = setInterval(function () {
    angle -= 1;
    $("#sandia").slideDown(2000).rotate(angle);
  }, 50);


  var ang = 0;
  var round2 = setInterval(function () {
    ang += 1;

    $("#newgame").slideDown(2000).rotate(ang);
  }, 50);

  var angle1 = 0;
  var round3 = setInterval(function () {
    angle1 -= 1;
    $("#peach").slideDown(2000).rotate(angle1);
  }, 50);


  var ang1 = 0;
  var round4 = setInterval(function () {
    ang1 += 1;

    $("#quit").slideDown(2000).rotate(ang1);
  }, 50);

  /*
   window.addEventListener(event => {
      const audio = document.querySelector("audio");
      audio.volume = 0.2;
      audio.play();
    });*/


  // $("#fruit").remove();
  //$("#desc").slideLeft();
  //$('#desc').toggle("slide", {direction: "right"}, 1000);

  $("#desc").animate({ left: '35%', opacity: "1" }, "slow");

  var flag = 0;
  $("#start").mousedown(function () {
    flag = 1;
  });

  $("#start").mouseup(
    function () {
      if (flag) {
        $("#up").slideUp("slow");
        $("#sandia").remove();
        $("#newgame").remove();
        $("#peach").remove();
        $("#quit").remove();
        $("#peach-1").animate({ opacity: "1" });
        $("#peach-2").animate({ opacity: "1" });



        $("#flash").animate({ left: '55%', opacity: "1" }, "slow");

        $(function () {
          $("#sandia1").animate({
            left: "55%", top: "340px", opacity: "1"
          }, { duration: 100, queue: false });

          $("#sandia2").animate({
            left: "57%", top: "370px", opacity: "1"
          }, { duration: 100, queue: false });

        });

        //$("#head").remove();
        setTimeout(function () {
          $('#head').fadeOut('slow')
          //nndh fun random bokraaaaaaah
        }, 500);
      }
      $("#scoreDiv").show();

      clearInterval(round1);
      clearInterval(round2);
      clearInterval(round3);
      clearInterval(round4);

      start = setTimeout(playGame,1500);
      

    }



  );
  var f = 0;
  $("#end").mousedown(function () {
    f = 1;
  });

  $("#end").mouseup(
    function () {
      if (f) {
        $("#peach").remove();
        $("#quit").remove();

        $("#up").slideUp("slow");
        $("#quit").remove();
        $("#newgame").remove();
        $("#sandia1").animate({ opacity: "1" });
        $("#sandia2").animate({ opacity: "1" });
        $("#sandia").remove();
        $("#flash1").animate({ left: '38%', opacity: "1" }, "slow");
        $(function () {
          $("#peach-1").animate({
            left: "38%", top: "350px", opacity: "1"
          }, { duration: 500, queue: false });

          $("#peach-2").animate({
            left: "40%", top: "385px", opacity: "1"
          }, { duration: 500, queue: false });
         
        });
       setTimeout( "location.reload()",500);
      }
      
      clearInterval(round1);
      clearInterval(round2);
      clearInterval(round3);
      clearInterval(round4);
    }



    /// fun start game =>timer  => set interval => div  clone || add class||   left w right oryb mn elnos  select 
    // + style bta3o left + random  w right + random with range  animate set interval  animate =>> top      

  );

  // setInterval(() => {
  //   var x = Math.round(3*Math.random());
  //     $("#image").attr('src', 'capture/' + arr[x] + '.png');
  //     $("#part1").attr('src', 'capture/' + arr[x]+ '-1' + '.png');
  //     $("#part2").attr('src', 'capture/' + arr[x]+ '-2' + '.png');
  //     console.log(x);
  //     console.log(arr[x]);
  // }, 2000);
  $("#fru").mousedown(function () {
    // flashh(); ??

    if (document.getElementById("image").src.split("/")[4] == "boom.png") {
      score--;
      var slice = new Audio("sound/boom.mp3");
     // $("#image").hide("explode", 500);
      //explode fruit animation
      //$("#image").hide("explode", 500);
      //$("#image").hide("explode", 500);
      $("#image").attr('src', 'capture/b2.png');
      $("#ninja").effect("shake");
      //document.getElementById("image").style.removeProperty('display');
    } 
    else { 
     
      flashh();
      score++;
     // $("#image").hide("explode", 500);
      var slice = new Audio("sound/splatter.mp3");
      
    }
    
        //flashh();
    $("#score").html(score);
    slice.play();
    //Stop fruit moving
    clearInterval(action);
    //clearTimeout(yrab);

   
    //Send new fruit
    yrab = setTimeout(playGame, 800);
  });

  function flashh() {

    var t=$("#image").position().top +2;
    var l=$("#image").position().left+2;
var strl = l.toString();
var strt = t.toString();
console.log($("#image").position().top +2,$("#image").position().left+2);
    $("#part1").animate({opacity: "1"}).fadeOut(50);
  document.getElementById("part1").style.removeProperty('display');
  $("#fla4").animate({ opacity: "1" }).fadeOut(50);
  //$("#fla4").css({"left" : $("#image").position().left +2,"top" : $("#image").position().top +2}).fadeOut(50);
  document.getElementById("fla4").style.removeProperty('display');
    $("#part2").animate({ opacity: "1" }).fadeOut(50);
 //   $("#part2").css({"left" : $("#image").position().left +2, "top":$("#image").position().top+2}).fadeOut(50);
    document.getElementById("part2").style.removeProperty('display');
   
    
    $("#image").hide();

  }
  // var x = 1000;
  // setInterval(
  //   function () {



  //     x = x - 10;
  //   }, x);


var sign;
var lflag = false;
var lsign = 1;



  function playGame() {
    debugger;
    menuSound.pause();
    boomflag = 0;
    //debugger;
    $("#fru").show();
    $("#image").show();
    $("#part1").hide();
    $("#part2").hide();
    $("#fla4").hide();

    chooseFruit();
    var throwfruit = new Audio("sound/throw.mp3");
    throwfruit.play();
    $("#fru").css({ 'left': '' + Math.round(82 * Math.random()) + "%", 'top': 330 });
 
    step = 1 + Math.round(5 * Math.random());
    console.log("done1");
    console.log("step" + step);

    action = setInterval(
      function () {
        // document.getElementById("fru").style["bottom"] +=`12 step +"%";
        // $("#fru").css({'top': ''+ $("#fru").position().top - step+"%"});
        if( ($("#fru").position().top <=120))
        {        
          sign= -1;
        }
        if($("#fru").position().left>= 250 )
        {
          if(!lflag)
          {
           lsign =-1;
           lflag=true;
          }
          $("#fru").css('left', $("#fru").position().left + (step*lsign)+"px" );
         // lsign= ;
        }
        else {
          if(!lflag)
          {
           lsign =1;
           lflag=true;
          }
          $("#fru").css('left', $("#fru").position().left + (step*lsign)+"px" );
        }
       // $("#fru").css('left', $("#fru").position().left + (step*lsign)+"px" );
        $("#fru").css('top', $("#fru").position().top - (step * sign)+"px");
       // console.log("left=>>>"+$("#fru").css('left'));
      //  $("#fru").css('top', $("#fru").position().top - step);
        if ($("#fru").position().top > 330 
        || parseInt($("#fru").css('left'))<= 50
        || parseInt($("#fru").css('left'))>= 580) {
          
          if (lives >= 1) {

            if(document.getElementById("image").src.split("/")[4]!= "boom.png"){
            
              lives--;

            mistakes();
          }
            var mis = new Audio("sound/BikeHorn.mp3");
            mis.play();
            console.log("lives" + lives);
            $("#fru").show();
            $("#image").show();
            chooseFruit();
            throwfruit.play();
            $("#fru").css({ 'left': '' + Math.round(82 * Math.random()) + "%", 'top': 330 });
           
            step = 1 + Math.round(5 * Math.random());

            console.log("step" + step);
            console.log("don2");
          }
          else {
            topsign =false;
            //clearInterval(action);
            console.log("lives" + lives);
            console.log("Game Over");
            loser();
            $("#image").hide();

          }
        }

      }, 30);


  };



  function loser() {
    var over = new Audio("sound/over.mp3");
    over.play();
    clearInterval(action);
    $("#lose").fadeIn(1000);
    
    clearTimeout(start);


  }
  $("#lose").click(
    function () {
      location.reload();
    });

  function mistakes() {

    $("#misDiv").append('<img src="capture/xxf.png" class="xxf"></img>')

  }


  function chooseFruit() {
    sign =1;
    var x = Math.round(4 * Math.random());
    if (arr[x] == "boom") {
      boomflag = 1;
      $("#image").attr('src', 'capture/' + arr[x] + '.png');
    }else{
    $("#image").attr('src', 'capture/' + arr[x] + '.png');
    $("#part1").attr('src', 'capture/' + arr[x] + '-1' + '.png');
    $("#part2").attr('src', 'capture/' + arr[x] + '-2' + '.png');
    console.log(arr[x]);
    console.log(document.getElementById("part1"));
    console.log(document.getElementById("part"));
  }
  }


})

