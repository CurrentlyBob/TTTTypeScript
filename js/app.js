"use strict";
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let board;
let turn;
let winner;
let tie;
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetButtonEl = document.querySelector("button");
// document.getElementById("#sq0").addEventListener(`click`, handleClick)
resetButtonEl.addEventListener('click', () => init());
const updateBoard = () => {
    board.forEach((slot, index) => {
        squareEls[index].innerHTML = String(slot) ?? '';
    });
    return;
};
const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winner = true;
            console.log("We have a winner");
            return;
        }
    }
};
const updateMessage = () => {
    if (winner === false && tie === false) {
        if (turn % 2 == 1 && turn != 1) {
            messageEl.innerText = "Player X Turn";
        }
        if (turn % 2 == 0) {
            messageEl.innerText = "Player O Turn";
        }
    }
    else if (winner === false && tie === true) {
        messageEl.innerText = "It is a tie.";
    }
    else {
        messageEl.innerText = "Congrats you win";
    }
};
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 1;
    winner = false;
    tie = false;
}
const handleClick = (index) => {
    console.log(tie);
    if (winner || tie) {
        return;
    }
    if (board[index] !== '') {
        messageEl.textContent = "This spot is Taken";
        return;
    }
    if (turn % 2 == 1 && board[index] === '') {
        board[index] = "X";
    }
    if (turn % 2 == 0 && board[index] === '') {
        board[index] = "O";
    }
    turn += 1;
    checkForWinner();
    checkForTie();
    updateBoard();
    updateMessage();
};
function checkForTie() {
    if (board.includes('')) {
        tie = false;
    }
    else {
        tie = true;
    }
}
function render() {
    updateBoard();
    updateMessage();
}
function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 1;
    winner = false;
    tie = false;
    messageEl.innerText = "Choose Your First Move to Begin";
    render();
    console.log("App Running!");
}
squareEls.forEach((sqr, index) => {
sqr.addEventListener("click", () => handleClick(index));
}); // Sanity Check
init();
