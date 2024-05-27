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
let currentPlayer = "X"; /*The player plays as X and computer plays as O*/ 
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartButton.addEventListener('click', restartGame);
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

function computerMove(){
    const bestMove = minimax(options, "O").index;
    const cell = document.querySelector(`.cell[data-index = '${bestMove}']`);

    updateCell(cell, bestMove);
    checkWinner();
}

function minimax(newOptions, player){
    const availableCells = newOptions.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);

    if(checkWin(newOptions, "X")){
        return {score: -10};
    }else if(checkWin(newOptions, "O")){
        return {score : 10};
    }else if(availableCells.length === 0){
        return {score : 0};
    }

    const moves = [];/*An array of all possible moves and their evaluations*/

    for(let i = 0; i < availableCells.length; i++){
        const move = {};/*A temporary object for holding a single possible movement*/
        move.index = availableCells[i];
        newOptions[availableCells[i]] = player;/*temporarly adding value to the available cells*/
        
        if(player === "X"){
            const result = minimax(newOptions, "O");
            move.score = result.score;
        }else{
            const result = minimax(newOptions, "X");
            move.score = result.score;
        }

        newOptions[availableCells[i]] = "";
        moves.push(move);
    }

    let bestMove;
    /*Computer is trying to maximize it's score
      The player is trying to minimize the computer's score*/
    if(player === "O"){
        let bestScore = -Infinity;
        for(let i=0; i < moves.length; i++){
            if(moves[i].score > bestScore){
                bestMove = moves[i];
                bestScore = moves[i].score;
            }
        }
    } else {
        let bestScore = Infinity;
        for(let i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
                bestMove = moves[i];
                bestScore = moves[i].score;
            }
        }
    }

    return bestMove;
}

function checkWin(board, player) {
    return winCondition.some(condition => condition.every(index => board[index] === player));
}