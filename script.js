// Create gameboard as an array inside Gameboard object (module/IIFE)
const Gameboard = (() => {
    "use strict"
    // Array with nine indexes 
    let gameboard = new Array(9).fill(null);

    // Update array index with players value
    const setCell = (index, value) => {
        console.log({ index, value });
        // If gameboard index is empty then set value
        gameboard[index] = value;
    };
    // Reset the game board
    const resetBoard = () => {
        gameboard = [null, null, null, null, null, null, null, null, null];
        return gameboard
    }

    // Get a copy of the original array
    const getBoard = () => [...gameboard];

    const checkWin = () => {
        const currentBoard = getBoard()
        if (currentBoard[0] === "X" && currentBoard[1] === "X" && currentBoard[2] === "X" || currentBoard[3] === "X" && currentBoard[4] === "X" && currentBoard[5] === "X" || currentBoard[6] === "X" && currentBoard[7] === "X" && currentBoard[8] === "X" || currentBoard[0] === "X" && currentBoard[3] === "X" && currentBoard[6] === "X" || currentBoard[1] === "X" && currentBoard[4] === "X" && currentBoard[7] === "X" || currentBoard[2] === "X" && currentBoard[5] === "X" && currentBoard[8] === "X" || currentBoard[0] === "X" && currentBoard[4] === "X" && currentBoard[8] === "X" || currentBoard[2] === "X" && currentBoard[4] === "X" && currentBoard[6] === "X") {
            console.log("Player 1 wins")
        } else if
            (currentBoard[0] === "O" && currentBoard[1] === "O" && currentBoard[2] === "O" || currentBoard[3] === "O" && currentBoard[4] === "O" && currentBoard[5] === "O" || currentBoard[6] === "O" && currentBoard[7] === "O" && currentBoard[8] === "O" || currentBoard[0] === "O" && currentBoard[3] === "O" && currentBoard[6] === "O" || currentBoard[1] === "O" && currentBoard[4] === "O" && currentBoard[7] === "O" || currentBoard[2] === "O" && currentBoard[5] === "O" && currentBoard[8] === "O" || currentBoard[0] === "O" && currentBoard[4] === "O" && currentBoard[8] === "O" || currentBoard[2] === "O" && currentBoard[4] === "O" && currentBoard[6] === "O") {
            console.log("Player 2 wins")
        } else {
            if (!currentBoard.includes(null))
                console.log("Its a tie")
        }
    }

    return {
        checkWin,
        getBoard,
        resetBoard,
        setCell
    }
})();


const displayController = (() => {
    "use strict"
    const board = document.querySelector(".board");
    const newGameBtn = document.createElement("button")
    newGameBtn.textContent = "New Game"
    newGameBtn.classList = "new-game"
    document.body.append(newGameBtn)

    newGameBtn.addEventListener("click", () => {
        displayController.clearBoard();
        displayController.renderBoard(Gameboard.resetBoard());
        displayController.clearBoard();
        displayController.renderBoard(Gameboard.getBoard());
    })

    const renderBoard = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let cell = document.createElement("div")
            cell.id = i;
            cell.classList = "cell";
            cell.setAttribute("cell-data", i)
            cell.textContent = arr[i]
            // console.log(cell)
            board.append(cell)
        }
    }
    // Event listener removes duplicate board and updates gameboard when clicked
    const clearBoard = () => {
        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild);
        }
    }
    return {
        board,
        renderBoard,
        clearBoard
    }
})();

const gameController = (() => {
    "use strict"
    const playerFunction = (player, marker) => {
        return {
            player,
            marker,
        }
    }

    let player1 = playerFunction("Test1", "X");
    let player2 = playerFunction("Test2", "O");

    // If isplayeroneturn is placed in function it will always = true
    let isPlayerOneTurn = true
    const playerTurn = () => {
        if (isPlayerOneTurn) {
            // Set the players turn to false
            isPlayerOneTurn = false;
            // Return player1 value
            return player1.marker;
        } else {
            // Set back to true
            isPlayerOneTurn = true;
            // Return player2 value
            return player2.marker;
        }
    }

    // Selecting the display board and set it to a variable
    const boardEl = displayController.board;
    // Render the board and link Gameboard to displayController using a copy of the original array
    displayController.renderBoard(Gameboard.getBoard());
    boardEl.addEventListener("click", (e) => {
        //  If there is no a target with cell return and exit
        if (!e.target.classList.contains("cell")) return;
        // Set the cell-data e.target to index
        const index = e.target.getAttribute("cell-data");
        // if there is already an value/cell return and exit
        if (Gameboard.getBoard()[index]) return;
        Gameboard.setCell(index, playerTurn());
        // Prevent multiple boards
        displayController.clearBoard();
        // Rerender the board 
        displayController.renderBoard(Gameboard.getBoard());
        Gameboard.checkWin();
    });
    return {
        player1,
        player2
    }
})();
