const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('reset-button');
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartButton.addEventListener(('click', restartGame));
    statusText.textContent = `${currentPlayer}'s turn!`;
    running = true;
}

function cellClicked() {
    cellIndex = this.getAttribute('data-index');

    if(options[cellIndex] !== "" || !running || currentPlayer !== "X"){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if(running){
        setTimeout(computerMove, 500);
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWin = false;

    for(let i = 0; i < winCondition.length; i++){
        condition = winCondition[i];
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }

        if(cellA === cellB && cellB === cellC && cellA === cellC){
            roundWin = true;
            break;
        }
    }

    if(roundWin){
        statusText.textContent = `Player ${currentPlayer} won this round!`;
        running = false;

    } else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;

    } else {
        changePlayer();
    }
    
}

function computerMove(){}