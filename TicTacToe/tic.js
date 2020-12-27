var mode="one";
//to indicate if game active or finished
var gameOn = true;
//current player ,default X
var currentPlayer = "X";
//H2 to display whose turn is now
var TurnDisplay = document.querySelector('.status');

//Array to track the game
var gameBoard = ["", "", "", "", "", "", "", "", ""];
var xCoun=0;
var yCoun=0;

//start with X
TurnDisplay.innerHTML = "it's "+currentPlayer+" 's turn "
TurnDisplay.style.color="black"

var winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function choice()
{
    var y=location.search.split("?");
    var x=y[1].split("=");
    console.log("gwa")
    if (x[0]=='two')
    mode="two"
}
function CellClick(clickedCell) {
    //get the clicked element   
        var clickedCell = clickedCell.target;
    //get id of which cell is clicked
        var clickedCellIndex = parseInt( clickedCell.getAttribute('id') );
    //before take any action we should check that the player clicked on an empty cell and the game is not finished yet
        if (gameBoard[clickedCellIndex] !== "" || !gameOn) {

        }
    
        else{
                cellChoosed(clickedCell, clickedCellIndex);
                
                //validateRes();
        }
    }
    
function playerCahnged() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    TurnDisplay.innerHTML ="it's "+currentPlayer+" 's turn "
    TurnDisplay.style.color=currentPlayer === "X" ?"black":"red"
    
    }

function cellChoosed(clickedCell, clickedCellIndex) {
    //update the game state
    //clickedCell.innerHTML = currentPlayer;
      //update the game state

      gameBoard[clickedCellIndex] = currentPlayer;
      //clickedCell.innerHTML = currentPlayer;
  
      $('#'+clickedCell.id).html(currentPlayer).delay(3000).css("background-color","gray");
      document.querySelectorAll('.cell')[clickedCellIndex].style.color = currentPlayer === "X" ?"black":"red";
         // document.querySelectorAll('.cell')[clickedCellIndex].style.color = "black";
      
      validateRes();
     // playerCahnged();
     if(gameOn){
            if(mode=="two")
            playerCahnged();
            else{
            playerCahnged();
            setTimeout(function(){   compTurn();},1500)}
     }
     

}

        
        function compTurn()
        {
            if(gameOn) {
            var emp= new Array();
            for(var i=0;i<9;i++)
            {
                if(gameBoard[i]=="")
                {
                    emp.push(i);
                }
            }
            var x = Math.round(Math.random() * emp.length);
            var choice = emp[x];
            if (choice === undefined) {
                choice = emp[x - 1];
            }
            gameBoard[choice] = currentPlayer;
                document.querySelectorAll('.cell')[choice].style.color = "red";
                $('#'+choice).html(currentPlayer).delay(3000).css("background-color","gray");
                validateRes();
                if(gameOn)
                playerCahnged();
            }
            
}

function RestartGame() {
    gameOn = true;
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    TurnDisplay.innerHTML ="it's "+currentPlayer+" 's turn "
    TurnDisplay.style.color="black"
    for(var x=0;x<9;x++)
    {
        document.querySelectorAll('.cell')[x].innerHTML = "";
        $('#'+x).css("background-color","rgb(133, 131, 21)");
    }

}
function validateRes() {
    var roundWon = false;
    //loop on winning conditions
    for (var i = 0; i <8 &&!roundWon; i++) {
        var winning = winCondition[i];
        var a = gameBoard[winning[0]]; 
        var b = gameBoard[winning[1]];
        var c = gameBoard[winning[2]];
        
      
        //if all the 3 cells of any condition are the same that means that the player won 
         if (a === b && b === c && a!="") // and they are not empty
        {
            roundWon = true;

        }
    }
    if (roundWon) {
        TurnDisplay.style.color=currentPlayer === "X" ?"black":"red"
        if(currentPlayer=="O"&&mode=="one")
        TurnDisplay.innerHTML="Computer  "+currentPlayer+" has won !!"
        else
        TurnDisplay.innerHTML="Congrats "+currentPlayer+" has won !!"
        if(currentPlayer=="X")
        $("#X").html( "X : "+(++xCoun));
        else
        $("#O").html("O : "+ (++yCoun));

        $('#'+winning[0]).css("background-color","rgb(11, 96, 165)");
        $('#'+winning[1]).css("background-color","rgb(11, 96, 165)");
        $('#'+winning[2]).css("background-color","rgb(11, 96, 165)");
      
           $("body").append('<div class = "demo"></div>'); 
   
           $('.demo').fireworks({ 
               sound:false,
            opacity: 0.7, 
            width: '100%', 
            height: '100%' 
            
          });

           //Stop Fireworks after x milliseconds.
           x = 7000; 
           setTimeout(function() {
           
               $('.demo').remove();}, x);
             gameOn = false;
    }
    else{
        //if board is full
        var roundDraw = !gameBoard.includes("");
        if (roundDraw) {
            TurnDisplay.innerHTML = "game endded in a draw"
            TurnDisplay.style.color="green"
            gameOn = false;
        }
        //game is continued
        else{
            
            //playerCahnged();
        }
    }

    

}
//add click listner on all cells
choice();
for(var x=0;x<9;x++)
{
    document.querySelectorAll('.cell')[x].addEventListener('click',CellClick);

}


//////////////////////
///////////////////////////////////////

function minimax(board,   depth,  isMax) 
{ 
        
        // If this maximizer's move 
        if (isMax) 
        { 
        var best = -1000; 

        // Traverse all cells 
        for (var i = 0; i < 9; i++) 
        { 
       
        // Check if cell is empty 
        if (board[i] == '') 
        { 
            // Make the move 
            board[i] = currentPlayer; 

            // Call minimax recursively and choose 
            // the maximum value 
            best = Math.Max(best, minimax(board, depth + 1, !isMax)); 

            // Undo the move 
            board[i] = ''; 
        } 
        
        } 
        return best; 
        } 

        // If this minimizer's move 
        else
        { 
        var best = 1000; 

        // Traverse all cells 
        for (var i = 0; i < 9; i++) 
        { 
        
        // Check if cell is empty 
        if (board[i]== '') 
        { 
            // Make the move 
            if(currentPlayer=="X")
            board[i] = "O"; 
            else
            board[i]="X"

            // Call minimax recursively and choose 
            // the minimum value 
            best = Math.Min(best, minimax(board,  
                            depth + 1, !isMax)); 

            // Undo the move 
            board[i] = ''; 
        } 
        } 
        } 
        return best; 
        } 