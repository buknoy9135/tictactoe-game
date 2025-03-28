let board = document.getElementById("board");
let prev = document.getElementById("prev");
let next = document.getElementById("next"); // For next button DOM
let reset = document.getElementById("reset"); // For reset button DOM
let playerTurn = document.getElementById("playerTurn")

let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let state = [];

let moves = 0;

// Randomize the first player
let playerTurn1 = Math.random() < 0.5; 

// Set initial turn display
if (playerTurn1) {
    playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>X</span>'s turn";
} else {
    playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>O</span>'s turn";
}

// Add a note about randomization
let note = document.createElement("p");
note.innerHTML = '<span style="color: black; font-weight: bold; text-decoration: underline;">Note:</span> Starting player is random each game.';
note.style.fontSize = "18px";
note.style.color = "black";
note.style.textShadow = "none";
note.style.marginTop = "5px"; 
note.style.marginBottom = "5px";

// Append the note below the player turn display
playerTurn.appendChild(note);

// To track current index (current index)
let currentIndex = 0;

function createBoard(){
    for(let i = 0; i < 9; i++){
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.classList.add("tictactoeBox");
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        board.appendChild(tictactoeGrid);
        tictactoeGrid.addEventListener("click", () => {
            addMove(gridId, i);
        });
    }
}

function addMove(element, boxNumber){
    moves++;
    let specificGrid = document.getElementById(element);    
    // If grid is empty
    if(!specificGrid.textContent){
        if(playerTurn1){        
            specificGrid.textContent = "X";
            playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>O</span>'s turn";
            playerTurn1 = false;
        } else {
            specificGrid.textContent = "O";
            playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>X</span>'s turn";
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber);
}

function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerText;
    updateState(gameBoard);
}

function updateState(boardCopy){
    const newBoard = [];
    for(let i = 0; i<boardCopy.length; i++){
        const row = [];
        for(let j = 0; j<boardCopy[i].length; j++){
            row.push(boardCopy[i][j]);
        }
        newBoard.push(row);
    }

    // If this is the first move, store an empty board before adding any moves
    if (state.length === 0) {
        state.push([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
    }

    state.push(newBoard);
    currentIndex = state.length - 1;
    console.log(state);
    
    // setTimeout(() => {
        checkEndGame(gameBoard); //call checkWinner function after each move
    // }, 100); // Delay by 100ms (0.1 seconds)
}
//---------------------------------------------------------------------------------------------------------------------------------
// Initializes scores
let scoreX = 0;
let scoreO = 0;

// Get score DOM elements
let scoreXElement = document.getElementById("scoreX");
let scoreOElement = document.getElementById("scoreO");

// Winner check function to update scores
function checkEndGame(gameBoard) {
    let winningCells = [];
    let winner = null;

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
            winningCells = [[i, 0], [i, 1], [i, 2]];
            winner = gameBoard[i][0];
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] !== '' && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]) {
            winningCells = [[0, i], [1, i], [2, i]];
            winner = gameBoard[0][i];
        }
    }

    // Check diagonals
    if (gameBoard[0][0] !== '' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
        winningCells = [[0, 0], [1, 1], [2, 2]];
        winner = gameBoard[0][0];
    }
    if (gameBoard[0][2] !== '' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
        winningCells = [[0, 2], [1, 1], [2, 0]];
        winner = gameBoard[0][2];
    }

    if (winner) {
        document.getElementById("show").style.display = "block";
        playerTurn.innerHTML = `Player <span class="win-text">${winner}</span> won! <br> <span class="play-again">Click here to play again</span>`;

        // Disable clicking of tiles
        document.getElementById("board").classList.add("endGame");

        // Highlight winning cells
        winningCells.forEach(([r, c]) => {
            let boxNumber = r * 3 + c;
            document.getElementById(`box${boxNumber}`).classList.add("highlight");
        });

        // Dim other cells
        document.querySelectorAll(".tictactoeBox").forEach(cell => {
            if (!cell.classList.contains("highlight")) {
                cell.classList.add("dimmed");
            }
        });

        // Update score
        if (winner === "X") {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else if (winner === "O") {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }

        return;
    }

    // If moves reach 9 and no winner, it's a draw
    if (moves === 9) {
        document.getElementById("show").style.display = "block";
        playerTurn.innerHTML = `It's a DRAW! <br> <span class="play-again">Click here to play again</span>`;
        document.getElementById("board").classList.add("endGame");
    }
}


// To decrement every time prev button is clicked
prev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;  // Decrease index
        reflectBoard(currentIndex);        
    }
});

// To increment every time next button is clicked
next.addEventListener("click", () => {
    if (currentIndex >= 0 && currentIndex <= moves-1) {
        currentIndex++;  // Increase index
        reflectBoard(currentIndex);
    }
});


// Play Again the game on button click without resetting score
playerTurn.addEventListener("click", () => {
    // Return the game board array to empty board
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Reset each grid on the board
    document.querySelectorAll(".tictactoeBox").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("highlight", "dimmed"); // Remove effects
    });

    // Reset game variables
    state = [];
    moves = 0;
    currentIndex = 0;

    // Randomize the starting player again
    playerTurn1 = Math.random() < 0.5;
    if (playerTurn1) {
        playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>X</span>'s turn";

    } else {
        playerTurn.innerHTML = "Player <span style='color: paleturquoise; font-weight: bold; text-shadow: 0 0 10px paleturquoise, 0 0 20px paleturquoise;'>O</span>'s turn";
    }  

    // Hide the "show" div (if it appears after a win/draw)
    document.getElementById("show").style.display = "none";

    // Remove endGame class from board (if applied)
    document.getElementById("board").classList.remove("endGame");

    console.clear(); // Clears console log for a fresh start (optional)
});

// Reset button resets everything including score
reset.addEventListener("click", () => {
    let confirmReset = confirm("Are you sure you want to reset the game? It will also reset the score.");
    if (confirmReset) {
        location.reload(); // Refreshes the page only if the player confirms
    }
});



function reflectBoard(index){
    let tempBoard = state[index];
    let moveString = [];
    for(let i = 0; i<tempBoard.length; i++){
        for(let j = 0; j<tempBoard[i].length; j++){
            moveString.push(tempBoard[i][j]);
        }
    }

    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }
}

createBoard();