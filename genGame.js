var counter = 1;
// MODEL
var model = {
    players: 2,
    rows: 8,
    cols: 8,
    board: [[0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,2,0,2,0,2,0],
            [0,2,0,2,0,2,0,2],
            [2,0,2,0,2,0,2,0]],

    getPlayers: function() {return this.players},
    getRows: function() {return this.rows},
    getCols: function() {return this.cols},
    getBoard: function() {return this.board}
}// END MODEL
function getJson() {
    model.board = data.board;
    showGrid();
    genObjs();
}
function showGrid() {
    var gridDiv = document.getElementById("gridDiv");
    gridDiv.innerHTML = genGrid();
    addClickHandlers();
}
// Get user information like names and what color they are.
var playerOne;
var playerTwo;
var playerOneColor;
var playerTwoColor;
function startGame() {
    playerOne = prompt("Player one, please enter your name:");
    // Make sure not blank
    if (playerOne == null || playerOne == "") {
        alert("You didn't enter a value, please try again.");
        return;
    }
    playerOneColor = prompt("Hi, " + playerOne + " please enter your color (enter red or black):");
    // Make sure valid entry and either black or red
    while (playerOneColor == null || playerOneColor == "" || !(playerOneColor == "black") && playerOneColor != "red") {
        playerOneColor = prompt(playerOne + " it seems you entered an invalid value (" + playerOneColor + "). Please enter your color (enter red or black):");
    }
    playerTwo = prompt("Player two, please enter your name:");
    // Make sure valid and not the same name as playerOne
    if (playerTwo == null || playerTwo == "" || playerOne === playerTwo) {
        alert("You didn't enter a valid value (" + playerTwo + "), please try again.");
        return;
    }
    playerTwoColor = prompt("Hi, " + playerTwo + " please enter your color (enter red or black):");
    // make sure they enter valid info and not what playerOne entered
    while (playerTwoColor == null || playerTwoColor == "" || !(playerTwoColor == "black") && playerTwoColor != "red" || playerOneColor == playerTwoColor) {
        playerTwoColor = prompt(playerTwo + " it seems you entered an invalid value (" + playerTwoColor + "). Please enter your color (enter red or black):");
    }
    // Remove the start game button so they can't click it again.
    var removeMe = document.getElementById("startGame");
    removeMe.parentNode.removeChild(removeMe);
    genObjs();

    // Make sure it displays the correct person's name for their turn.
    var turnElement = document.getElementById("whosTurn");
    if (playerOneColor === "black") {
            turnElement.innerHTML = playerOne + "'s turn";
    } else {
        turnElement.innerHTML = playerTwo + "'s turn";
    }
}
// This function shows who's turn it is on index.html
function turn() {
    var turnElement = document.getElementById("whosTurn");
    if (playerOneColor === "black") {
        if (counter % 2 == 0) {
            turnElement.innerHTML = playerOne + "'s turn";
        } else if (counter % 2 == 1) {
            turnElement.innerHTML = playerTwo + "'s turn";
        }
    } else if (playerTwoColor === "black") {
        if (counter % 2 == 0) {
            turnElement.innerHTML = playerTwo + "'s turn";
        } else  if (counter % 2 == 1) {
            turnElement.innerHTML = playerOne + "'s turn";
        }
    }
    counter++;
}
function genGrid() {
    var html = "";
    // the var row is my parameters for the grid. Since it has to be square I only need one side
    var row = 8;
    var i = 0;
    var j = 0;
    var tdClass = "";

    html += "<table id=\"grid\">"; // open table

    for (i = row; i > 0; i--) {

        html += "<tr>"; // open tr
        var k = i % 2;
        // If 0 then start with red first
        // This is where the td logic is
        if (k === 0) {
            for (j = row; j > 0; j--) {
                var r = j % 2;
                if (r === 0) {
                    tdClass = "red";
                } else {
                    tdClass = "black";
                }

                html += "<td class=\"" + tdClass + "\"></td>";
            } // End for loop to start with red first

        // This will alternate to start with black
        } else {
            for (j = row; j > 0; j--) {
                var r = j % 2;
                if (r === 0) {
                    tdClass = "black";
                } else {
                    tdClass = "red";
                }

                html += "<td class=\"" + tdClass + "\"></td>";
            } // End for loop to start with black first
        }

        html += "</tr>"; // close out tr
    }

    html += "</table>"; // close out table
    return html;
}
function genObjs() {
    var gridTable = document.getElementById("grid");
    var i = 0; // row counter
    var j = 0; // cell counter
    

    // loop to go over each cell
    for (i = 0; i < model.getRows(); i++) {
        for (j = 0; j < model.getCols(); j++) {
            var piece = model.getBoard()[i][j]; // see if a piece should be there
            var cell = gridTable.rows[i].cells[j]; // get the cell we'll be working with
            if (piece === 1) {
                var img = document.createElement('img');
                img.src = "imgs/gray-checker.png";
                cell.appendChild(img);// put a black piece
            } else if (piece == 2) {
                var img = document.createElement('img');
                img.src = "imgs/red-circle.png";
                cell.appendChild(img);// put a red piece
            } else if (piece == 11) {
                var img = document.createElement('img');
                img.src = "imgs/black-crown.png";
                cell.appendChild(img);// put a black king piece
            } else if (piece == 22) {
                var img = document.createElement('img');
                img.src = "imgs/red-crown.png";
                cell.appendChild(img);// put a red king piece
            } else {
                // it's a zero so put nothing
            }
        }
    }

}
function addClickHandlers() {
    var gridTable = document.getElementById("grid");
    var cells = gridTable.getElementsByTagName("td");
    var rows2 = gridTable.getElementsByTagName("tr");
    var clickCount = 0;

    for (i = 0; i < cells.length; i++) {
        cells[i].onclick = function() {
            clickCount++;
            var count = clickCount % 2;

            var cellI = this.cellIndex;
            var rowI = this.parentNode.rowIndex;

            if (clickCount == 1 || clickCount == 2) {
                this.setAttribute("id", "changed");
            }

            
            if (count == 1) {
                displayCoor(cellI, rowI, count);
            } else {
                displayCoor(cellI, rowI, count);
            }
        }
    }
}
function displayCoor(cellI, rowI, count) {
    var cellCoor = document.getElementById("moveFromCell");
    var rowCoor = document.getElementById("moveFromRow");
    var cellCoor2 = document.getElementById("moveToCell");
    var rowCoor2 = document.getElementById("moveToRow");

    if (count == 1) {
        cellCoor.value = cellI;
        rowCoor.value = rowI;
    } else {
        cellCoor2.value = cellI;
        rowCoor2.value = rowI;
    }
}
function startMove() {
    var moveFromCellText = document.getElementById("moveFromCell");
    moveFromCell = moveFromCellText.value;

    var moveFromRowText = document.getElementById("moveFromRow");
    moveFromRow = moveFromRowText.value;

    var piece = model.getBoard()[moveFromRow][moveFromCell];
    // this if ensures that you are moving the right color and that you're not moving a blank space
    if (piece == counter % 2 + 1) {
        alert("Please choose the correct color for your turn! Try again");
        showGrid(); // Refresh Grid
        genObjs(); // refresh grid
        return;
    } else if (piece == 0){
        alert("You chose a space with no piece. Please try again.");
        showGrid(); // Refresh Grid
        genObjs(); // refresh grid
        return;
    }

    var moveToCellText = document.getElementById("moveToCell");
    moveToCell = moveToCellText.value;

    var moveToRowText = document.getElementById("moveToRow");
    moveToRow = moveToRowText.value;

    var moveToPiece = model.getBoard()[moveToRow][moveToCell];
    // This if verifies that you are making a legal move
    if (piece == 1 || piece == 22) {
        // Jumping logic
        if ((moveToRow == moveFromRow*1 + 2) && (moveToPiece == 0)) {
            if (moveToCell == moveFromCell*1 + 2) {
                var newRow = moveToRow*1 - 1;
                var newCell = moveToCell*1 - 1;
                if (model.getBoard()[(newRow)][(newCell)] == 1 && piece == 1) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 2 && piece == 22) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 22 && piece == 22) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 0) {
                    alert("You can only move forward one row, Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                model.getBoard()[(newRow)][(newCell)] = 0;
            } else if (moveToCell == moveFromCell*1 - 2) {
                var newRow = moveToRow*1 - 1;
                var newCell = moveToCell*1 + 1;
                if (model.getBoard()[(newRow)][(newCell)] == 1 && piece == 1) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 2 && piece == 22) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 22 && piece == 22) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 0) {
                    alert("You can only move forward one row, Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                model.getBoard()[(newRow)][(newCell)] = 0;
            }
        } else {
            // Basic move rules
            if (moveToRow != (moveFromRow*1 + 1)) {
                alert("You have to move forward one row, please try again.");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (!(moveToCell == moveFromCell*1 - 1) && !(moveToCell == moveFromCell*1 + 1)) {
                alert("You have to move to a diagonal square, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 1) {
                alert("You already have a piece there, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 2) {
                alert("You can't move there, maybe try jumping that piece? Please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
        }
    }
    // This if verifies that you are making a legal move
    if (piece == 2 || piece == 11) {
        // Jumping logic
        if ((moveToRow == moveFromRow*1 - 2) && (moveToPiece == 0)) {
            if (moveToCell == moveFromCell*1 + 2) {
                var newRow = moveToRow*1 + 1;
                var newCell = moveToCell*1 - 1;
                if (model.getBoard()[(newRow)][(newCell)] == 2 && piece == 2) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 1 && piece == 11) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                    if (model.getBoard()[(newRow)][(newCell)] == 11 && piece == 11) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                }
                if (model.getBoard()[(newRow)][(newCell)] == 0) {
                    alert("You can only move forward one row, Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                model.getBoard()[(newRow)][(newCell)] = 0;
            } else if (moveToCell == moveFromCell*1 - 2) {
                var newRow = moveToRow*1 + 1;
                var newCell = moveToCell*1 + 1;
                if (model.getBoard()[(newRow)][(newCell)] == 2 && piece == 2) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                // king can't jump it's own color
                if (model.getBoard()[(newRow)][(newCell)] == 1 && piece == 11) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 11 && piece == 11) {
                    alert("You can't jump yourself. Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                if (model.getBoard()[(newRow)][(newCell)] == 0) {
                    alert("You can only move forward one row, Please try again");
                    showGrid(); // Refresh Grid
                    genObjs(); // refresh grid
                    return;
                }
                model.getBoard()[(newRow)][(newCell)] = 0;
            }
        } else {
            // Basic move rules
            if (moveToRow != (moveFromRow*1 - 1) && piece == 2) {
                alert("You have to move forward one row, please try again.");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (!(moveToCell == moveFromCell*1 + 1) && !(moveToCell == moveFromCell*1 - 1) && piece == 2) {
                alert("You have to move to a diagonal square, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 2  && piece == 2) {
                alert("There is already a piece there, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 1  && piece == 2) {
                alert("You can't move there, maybe try jumping that piece? Please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            // Start King rules for 11
            if (moveToRow != (moveFromRow*1 + 1) && moveToRow != (moveFromRow*1 - 1) && piece == 11) {
                alert("You have to move forward one row, please try again.");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (!(moveToCell == moveFromCell*1 - 1) && !(moveToCell == moveFromCell*1 + 1) && piece == 11) {
                alert("You have to move to a diagonal square, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 1  && piece == 11) {
                alert("You already have a piece there, please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
            if (moveToPiece == 2  && piece == 11) {
                alert("You can't move there, maybe try jumping that piece? Please try again");
                showGrid(); // Refresh Grid
                genObjs(); // refresh grid
                return;
            }
        }
    }
    
    model.getBoard()[moveFromRow][moveFromCell] = 0; // make square moving from empty
    model.getBoard()[moveToRow][moveToCell] = piece; // Move your piece to new square

    // King Me logic
    if (piece == 1) { // Black
        if (moveToRow == 7) {
            model.getBoard()[moveToRow][moveToCell] = 11;
        }
    }

    if (piece == 2) { // Red
        if (moveToRow == 0) {
            model.getBoard()[moveToRow][moveToCell] = 22;
        }
    }

    showGrid(); // Refresh Grid
    genObjs(); // refresh grid
    turn(); // Mark that your turn is over.
    winner(); // check and see if there is a winner
}
// function that determines if there is a winner, if so display that
function winner() {
    var blackOne = search(model.board, 1);
    var blackKing = search(model.board, 11);
    var redOne = search(model.board, 2);
    var redKing = search(model.board, 22);
    var none = false;
    if (blackOne == none && blackKing == none) {
        alert(playerTwo + " won!");
        var addBTN = document.getElementById("addBTN");
        var newBTN = document.createElement('button');
        var dvID = "startGame";
        var dvOnClick = "startGame()";
        newBTN.setAttribute('id',dvID);
        newBTN.setAttribute('onclick',dvOnClick);
        newBTN.innerHTML = "Start Game";
        addBTN.appendChild(newBTN);
        // Make sure that it says select start game again
        var turnElement = document.getElementById("whosTurn");
        turnElement.innerHTML = "Select 'Start Game' to play again";
    }
    if (redOne == none && redKing == none) {
        alert(playerOne + " won!");
        var addBTN = document.getElementById("addBTN");
        var newBTN = document.createElement('button');
        var dvID = "startGame";
        var dvOnClick = "startGame()";
        newBTN.setAttribute('id',dvID);
        newBTN.setAttribute('onclick',dvOnClick);
        newBTN.innerHTML = "Start Game";
        addBTN.appendChild(newBTN);
        // Make sure that it says select start game again
        var turnElement = document.getElementById("whosTurn");
        turnElement.innerHTML = "Select 'Start Game' to play again";
    }
}
// function to search multi demensial arrays
function search(array, item){
  for(var i = 0; i < array.length; i++){
    var sub = array[i];
    for(var j = 0; j < sub.length; j++){
        if(sub[j] == item){
            return true;
        }
    }
  }
  return false;
}

// Resets grid to default
function resetGame() {
    model.board = [[0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [2,0,2,0,2,0,2,0],
            [0,2,0,2,0,2,0,2],
            [2,0,2,0,2,0,2,0]];
    counter = 1;
    showGrid();
    // ensure the button isn't there to begin with
    var removeMe = document.getElementById("startGame");
    //error handling
    if (removeMe != null) {
        removeMe.parentNode.removeChild(removeMe);
    }
    // Add start game button again just in case.
    var addBTN = document.getElementById("addBTN");
    var newBTN = document.createElement('button');
    var dvID = "startGame";
    var dvOnClick = "startGame()";
    newBTN.setAttribute('id',dvID);
    newBTN.setAttribute('onclick',dvOnClick);
    newBTN.innerHTML = "Start Game";
    addBTN.appendChild(newBTN);
    // Make sure that it says select start game again
    var turnElement = document.getElementById("whosTurn");
    turnElement.innerHTML = "Select 'Start Game' to begin";
    // auto prompt user for player details again
    startGame();

}
// HTML5 audio play/pause stuff
function playAudio() {
    document.getElementById('htmlAudio').play();
}
function pauseAudio() {
    document.getElementById('htmlAudio').pause();
}