//Creating player one
var playerOne = prompt("Player One: Enter Your Name. You will be BLUE!");
var playerOneColor = 'rgb(86, 151, 255)';

//Creating player two
var playerTwo = prompt("Player Two: Enter Your Name. You will be RED!");
var playerTwoColor = 'rgb(237, 45, 73)';

//checking if the game is on or off
var gameOn = true;

//grabbing the table rows using jQuery
var table = $('table tr');

//console logging the row and col number after winning (just for checking bugs)
function reportWin(rowNum, colNum){
    console.log('You won starting at this row and column : ');
    console.log(rowNum);
    console.log(colNum);
}

//function for changing the color of chips
function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

//function for returning which color is the chip
function returnColor(rowIndex, colIndex,){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//function for checking the bottommost chip color
function checkBottom(colIndex){
    var colorReport = returnColor(5, colIndex);

    for(var row = 5; row > -1; row--){
        colorReport = returnColor(row,colIndex);

        if(colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

//function for checking if the color of 4 chips is matching or not
function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one!== 'rgb(128, 128, 128)' && one !== undefined);
}

//checking for horizontal wins
function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
            console.log('horizontal');
            reportWin(row,col);
            return true;
            }

        else{
            continue;
            }
        }
    }
}

//checking for vertical wins
function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col),returnColor(row+2,col))){
            console.log('vertical');
            reportWin(row,col);
            return true;
            }

        else{
            continue;
            }
        }
    }
}

//checking for diagonal wins
function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }
            else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log('diagonal');
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

//game ending
function gameEnd(winningPlayer){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 7; row++){
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer + " has won! Refresh your browser to play again.").css('fontSize','50px');
        }
    }
}

//start game with player one
var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$('h3').text(playerOne + ' it is your turn. Pick a column to drop your blue chip.');

$('.board button').on('click', function(){
    //find what column was chosen
    var col = $(this).closest('td').index();

    //check for bottommost available row
    var bottomAvail = checkBottom(col);

    //drop the chip in available row
    changeColor(bottomAvail, col, currentColor);

    //checking for WIN or TIE
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        gameEnd(currentName);
    }

    //if no win or tie, continue to next player
    currentPlayer = currentPlayer * -1;

    //rechecking who is the current player
    if(currentPlayer === 1){
        currentName = playerOne;
        $('h3').text(currentName + ' it is your turn. Pick a column to drop your blue chip.');
        currentColor = playerOneColor;
    }
    else{
        currentName = playerTwo;
        $('h3').text(currentName + ' it is your turn. Pick a column to drop your red chip.');
        currentColor = playerTwoColor;
    }
})