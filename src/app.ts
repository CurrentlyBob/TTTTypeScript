const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  

  let board: (number|string|null)[]
  let turn: number
  let winner: boolean
  let tie: boolean
  
  
  
  const squareEls = document.querySelectorAll<HTMLDivElement>(".sqr")!
  const messageEl = document.querySelector<HTMLHeadElement>("#message")!
  const resetButtonEl = document.querySelector<HTMLButtonElement>("button")!
  
  
  // document.getElementById("#sq0").addEventListener(`click`, handleClick)
  resetButtonEl.addEventListener('click', () => init());
  
  const updateBoard = ():void => {
    board.forEach((slot, index) => {
      squareEls[index].innerHTML = String(slot) ?? ''
    });
  
    return;
  };
  
  const checkForWinner = ():void => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        winner = true;
        console.log("We have a winner");
        return;
      }
    }
  };
  
  const updateMessage = ():void => {  
    if (winner === false && tie === false) {
      if (turn % 2 == 1 && turn != 1) {
        messageEl.innerText = "Player X Turn";
      }
      if (turn % 2 == 0) {
        messageEl.innerText = "Player O Turn";
      }
    } else if (winner === false && tie === true) {
      messageEl.innerText = "It is a tie.";
    } else {
      messageEl.innerText = "Congrats you win";
    }
  };
  
  
  function resetGame():void {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 1;
    winner = false;
    tie = false;
  }
  
  const handleClick = (index: number):void => {
    console.log(tie);
    if (winner || tie) {
      return;
    }
    if (board[index] !== '') {
      messageEl.textContent = "This spot is Taken"
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
  
  function checkForTie():void {
    if (board.includes('')) {
      tie = false;
    } else {
      tie = true;
    }
  }
  
  
  function render():void {
    updateBoard();
    updateMessage();
  }
  
  function init():void {
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