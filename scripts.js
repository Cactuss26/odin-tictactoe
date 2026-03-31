const gameBoard = (() => {
    board = [[[" "], [" "], [" "]], [[" "], [" "], [" "]], [[" "], [" "], [" "]]];

    function updateBoard(i, j, val) {
        if (this.checkFull()) {
            return false;
        }

        if (val === "X") {
            board[i][j] = val;
        }

        else if (val === "O") {
            board[i][j] = val;
        }

        else {
            throw new Error("Invalid value");
        }

        return true;
    }

    function checkFull() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == " ") {
                    return false;
                }
            }
        }

        return true;
    }

    function displayBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(`${board[i][0]} ${board[i][1]} ${board[i][2]}`);
        }
    }

    function checkwinner() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }

        for (let j = 0; j < 3; j++) {
            if (board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return board[0][j];
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }

        return " ";
    }

    return { updateBoard, displayBoard, checkwinner, checkFull };
})();

const Player = (name, symbol) => {
    return { name, symbol }
}

const game = (() => {
    let player1;
    let player2;

    function createPlayers() {
        const name1 = prompt("Enter player 1's name");
        const name2 = prompt("Enter player 2's name");
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
    }

    function beginRound() {
        // One round includes both players' turns
        // Player1's turn

        const move1 = prompt(`${player1.name}: Enter your move`);
        const i1 = Number(move1.split(" ")[0]);
        const j1 = Number(move1.split(" ")[1]);

        if (!gameBoard.updateBoard(i1, j1, player1.symbol)) {
            displayTie();
            return true;
        };

        gameBoard.displayBoard();
        const winnerSymbol = gameBoard.checkwinner();
        if (winnerSymbol === player1.symbol) {
            displayWinner(player1);
            return true;
        }
        
        // Player2's turn
        const move2 = prompt(`${player2.name}: Enter your move`);
        const i2 = Number(move2.split(" ")[0]);
        const j2 = Number(move2.split(" ")[1]);

        if (!gameBoard.updateBoard(i2, j2, player2.symbol)) {
            displayTie();
            return true;
        }

        gameBoard.displayBoard();
        if (winnerSymbol === player2.symbol) {
            displayWinner(player2);
            return true;
        }

        return false;
    }

    function displayWinner(winner) {
        console.log(`The winner is ${winner.name}`);
    }

    function displayTie() {
        console.log("It's a tie");
    }

    return { createPlayers, beginRound, displayWinner };
})();

function start() {
    game.createPlayers();
    while (!game.beginRound());
}
