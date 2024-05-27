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

function restartGame(){}

function updateCell(){}

function checkWinner(){}

function computerMove(){}