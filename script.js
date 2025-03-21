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

let playerTurn1 = true;

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
            playerTurn.textContent = "Player O to move"
            playerTurn1 = false;
        } else {
            specificGrid.textContent = "O";
            playerTurn.textContent = "Player X to move"
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

// Winner check function with alert
function checkEndGame(gameBoard) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] !== '' && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
            document.getElementById("show").style.display = "block";  
            playerTurn.textContent = `Player ${gameBoard[i][0]} wins`;
            // alert(`Player "${gameBoard[i][0]}" wins`);  // Show alert with 'X wins' or 'O wins'
            document.getElementById("board").classList.add("endGame");
            return;  // Exit function after showing the winner
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[0][i] !== '' && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]) {
            document.getElementById("show").style.display = "block";  
            playerTurn.textContent = `Player ${gameBoard[0][i]} wins`;
            // alert(`Player "${gameBoard[0][i]}" wins`);  // Show alert with 'X wins' or 'O wins'
            document.getElementById("board").classList.add("endGame");
            return;  // Exit function after showing the winner
        }
    }

    // Check diagonals
    if (gameBoard[0][0] !== '' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
        document.getElementById("show").style.display = "block"; 
        playerTurn.textContent = `Player ${gameBoard[0][0]} wins`; 
        // alert(`Player "${gameBoard[0][0]}" wins`);  // Show alert with 'X wins' or 'O wins'
        document.getElementById("board").classList.add("endGame");
        return;  // Exit function after showing the winner
    }
    if (gameBoard[0][2] !== '' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) {
        document.getElementById("show").style.display = "block"; 
        playerTurn.textContent = `Player ${gameBoard[0][2]} wins`; 
        // alert(`Player "${gameBoard[0][2]}" wins`);  // Show alert with 'X wins' or 'O wins'
        document.getElementById("board").classList.add("endGame");
        return;  // Exit function after showing the winner
    }

    // if moves is already 9 and no winner yet, then display "DRAW!"
    if (moves == 9) {
        document.getElementById("show").style.display = "block";
        playerTurn.textContent = "It's a DRAW!";
        // alert ("DRAW!")
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


// Reset the game on button click
reset.addEventListener("click", () => {
    location.reload();  // This will refresh the page
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
