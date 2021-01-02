var programming_languages = ["python","javascript","mongodb","json","java","html","css","c","csharp","golang",
                             "kotlin","php","sql","ruby"];
var animals = ["yak", "jaguar", "canary", "porcupine", "budgerigar","dog","cat","cow","horse","donkey","lion","elephant"]
var countries = ["china", "canada", "egypt", "german", "usa","france"];
var presidents = ["ford", "hoover", "tyler", "madison", "jefferson"];
var sports = ["golf", "boxing", "surfing", "badminton", "wrestling"];
var Flowers=["tulips","sunflowers","roses","orchids","gardenias"]


var answer = '';
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var wordStatus;

var str="Guess the ";
function randomWord() {
    
   var categ = document.getElementById("category");
 var selectedValue = categ.options[categ.selectedIndex].value;
    

        if(selectedValue=="proglang"){
          answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
            document.getElementById("guessword").innerHTML=str+"Programming Languages";
        }
    else if(selectedValue=="animals"){
         answer = animals[Math.floor(Math.random() * animals.length)];
            document.getElementById("guessword").innerHTML=str+"Animal";
    }
   else if(selectedValue=="countries"){
            answer = countries[Math.floor(Math.random() * countries.length)];
           document.getElementById("guessword").innerHTML=str+"Country";
   }
    else if(selectedValue=="sports"){
            answer = sports[Math.floor(Math.random() * sports.length)];
            document.getElementById("guessword").innerHTML=str+"Sport";
    }
     else if(selectedValue=="flowers"){
            answer = Flowers[Math.floor(Math.random() * Flowers.length)];
            document.getElementById("guessword").innerHTML=str+"Flower";
     }
  else if(selectedValue=="pres"){
            answer = presidents[Math.floor(Math.random() * presidents.length)];
            document.getElementById("guessword").innerHTML=str+"President";
  }
      
          
}


function generateButtons() {
 var buttonsHTML ='abcdefghijklmnopqrstuvwxyz'.split('');
 
    
    for(var i=0;i<buttonsHTML.length;i++)
        {
            
            var button = document.createElement("button");
            button.innerHTML = buttonsHTML[i];
            button.className="btn";
            button.id=buttonsHTML[i];

            var keyboard= document.getElementById("keyboard");
            keyboard.appendChild(button);
      

            button.addEventListener('click', (function(i){
            return function (){handleGuess(buttonsHTML[i])};
            })(i));          
}

   

 
}

function handleGuess(chosenLetter) {
    
  guessed.push(chosenLetter) 
  document.getElementById(chosenLetter).setAttribute("disabled", true);
    

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}







function guessedWord() {
    var i=0;

 var arr=answer.split('');
    var x; 
   for( x=0;x<arr.length;x++)
       {
          
          
           if(guessed.indexOf(arr[x]) < 0)
                arr[x]=" _ ";
            
               
 
       }
    wordStatus=arr.join('');
 document.getElementById('wordSpotlight').innerHTML = wordStatus;
  

}
function checkIfGameWon() {
  
  if (wordStatus === answer) {
      
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}



function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
   
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function updateHangmanPicture() {
    
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

document.getElementById("category").onchange=function()
{
    
     mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
document.getElementById('keyboard').innerHTML="";
  randomWord();
  guessedWord();
 updateMistakes();
  generateButtons();
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
document.getElementById('keyboard').innerHTML="";
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;
randomWord();
generateButtons();
guessedWord();


 
 
  
 
