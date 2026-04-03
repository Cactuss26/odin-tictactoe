const gameBoard = (() => {
    let board = [[[""], [""], [""]], [[""], [""], [""]], [[""], [""], [""]]];
    let currentPlayer;

    function displayTurn() {
        const turnDiv = document.querySelector(".turn");
        turnDiv.textContent = `${currentPlayer.name}'s turn`;
    }

    function setBoard() {
        const squares = document.querySelectorAll(".square");
        for (let square of squares) {
            square.addEventListener("click", game.playRound);
        }
    }

    function updateBoard(i, j) {
        if (!currentPlayer) {
            throw new Error("No player assigned");
        }

        else {
            board[i][j] = currentPlayer.symbol;
        }
    }

    function setCurrentPlayer(player) {
        currentPlayer = player;
    } 


    function checkFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == "") {
                    return false;
                }
            }
        }

        return true;
    }

    function displayBoard() {
        const squares = document.querySelectorAll(".square");
        let i = 0;
        let j = 0;

        for (let square of squares) {
            square.textContent = board[i][j];
            if (j == 2) {
                j = 0;
                ++i;
            }
            else {
                ++j;
            }
        }
    }

    function checkwinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return true;
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true;
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return true;
        }

        return false;
    }

    return { updateBoard, displayBoard, checkwinner, checkFull, setCurrentPlayer, setBoard, displayTurn };
})();

const Player = (name, symbol) => {
    return { name, symbol }
}

const game = (() => {
    let player1;
    let player2;
    let currentPlayer;

    function createPlayers() {
        const name1 = prompt("Enter player 1's name");
        const name2 = prompt("Enter player 2's name");
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        currentPlayer = player1;
        gameBoard.setCurrentPlayer(currentPlayer);
        gameBoard.displayTurn();
    }

    function playRound(e) {
        if (e.target.textContent != "") {
            return false;
        }

        let i = e.target.id[0];
        let j = e.target.id[1];
        gameBoard.updateBoard(i, j);
        gameBoard.displayBoard();

        if (gameBoard.checkwinner()) {
            game.displayWinner();
            return true;
        }
        
        if (gameBoard.checkFull()) {
            game.displayTie();
            return true;
        }
        
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
        gameBoard.setCurrentPlayer(currentPlayer);
        gameBoard.displayTurn();
        return false;
    }

    function displayWinner() {
        const dispDiv = document.querySelector(".winner");
        dispDiv.textContent = `The winner is ${currentPlayer.name}!`;
    }

    function displayTie() {
        const dispDiv = document.querySelector(".winner");
        dispDiv.textContent = "It's a tie";
    }

    return { createPlayers, playRound, displayWinner, displayTie };
})();

function start() {
    gameBoard.setBoard();
    game.createPlayers();
}

document.addEventListener("DOMContentLoaded",() => {
    start();
})
