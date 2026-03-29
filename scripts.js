let gameBoard = (() => {
    board = [[[], [], []], [[], [], []], [[], [], []]];

    function updateBoard(i, j, val) {
        if (val === "X") {
            board[i][j] = val;
        }

        else if (val === "O") {
            board[i][j] = val;
        }

        else {
            throw new Error("Invalid value");
        }
    }

    function printBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(`${board[i][0]} ${board[i][1]} ${board[i][2]}`);
        }
    }

    return { updateBoard, printBoard };
})();

let Player = () => {
    score = 0;

    function updateScore() {
        ++score;
    }

    return { updateScore }
}



