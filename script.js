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
            return displayController.player1Win()
        } else if
            (currentBoard[0] === "O" && currentBoard[1] === "O" && currentBoard[2] === "O" || currentBoard[3] === "O" && currentBoard[4] === "O" && currentBoard[5] === "O" || currentBoard[6] === "O" && currentBoard[7] === "O" && currentBoard[8] === "O" || currentBoard[0] === "O" && currentBoard[3] === "O" && currentBoard[6] === "O" || currentBoard[1] === "O" && currentBoard[4] === "O" && currentBoard[7] === "O" || currentBoard[2] === "O" && currentBoard[5] === "O" && currentBoard[8] === "O" || currentBoard[0] === "O" && currentBoard[4] === "O" && currentBoard[8] === "O" || currentBoard[2] === "O" && currentBoard[4] === "O" && currentBoard[6] === "O") {
            return displayController.player2Win()
        } else {
            // If board does not include null its a tie
            if (!currentBoard.includes(null))
                return displayController.playerTie()
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
    const topHeader = document.querySelector(".top-header");
    const newGameBtn = document.createElement("button");
    const player1Header = document.createElement("h1");
    const player2Header = document.createElement("h1");
    const player1Modal = document.getElementById("player1-modal")
    const player2Modal = document.getElementById("player2-modal")
    const playerTieModal = document.getElementById("player-tie-modal")

    newGameBtn.textContent = "New Game";
    newGameBtn.classList = "new-game";
    document.body.append(newGameBtn);

    const player1Display = () => {
        player1Header.classList = "player1-header";
        player1Header.textContent = "Player X's turn";
        topHeader.append(player1Header);
    }

    const player2Display = () => {
        player2Header.classList = "player2-header";
        player2Header.textContent = "Player O's turn";
        topHeader.append(player2Header);
    }

    const player1Win = () => {
        player1Modal.style.display = "block"
        board.style.pointerEvents = "None"
        player1Modal.showModal()
    }

    const player2Win = () => {
        player2Modal.style.display = "block"
        board.style.pointerEvents = "None"
        player2Modal.showModal()
    }

    const playerTie = () => {
        playerTieModal.style.display = "block"
        playerTieModal.showModal()
    }

    newGameBtn.addEventListener("click", () => {
        displayController.renderBoard(Gameboard.resetBoard());
        isPlayerOneTurn = true;
        board.style.pointerEvents = "auto"
        displayController.renderBoard(Gameboard.getBoard(displayController.player1Display(), displayController.player2Display()))
        displayController.renderBoard(Gameboard.getBoard(clearBoard()));
        // location.reload();
    })

    const renderBoard = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let cell = document.createElement("div");
            cell.id = i;
            cell.classList = "cell";
            cell.setAttribute("cell-data", i);
            cell.textContent = arr[i];
            board.append(cell);
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
        clearBoard,
        player1Display,
        player2Display,
        player1Win,
        player2Win,
        playerTie,
    }
})();

let isPlayerOneTurn = true
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
    const playerTurn = () => {
        if (isPlayerOneTurn) {
            // Set the players turn to false
            displayController.player1Display();
            isPlayerOneTurn = false;
            // Return player1 value
            return player1.marker;
        } else {
            // Set back to true
            displayController.player2Display();
            isPlayerOneTurn = true;
            return player2.marker;
        }
    }

    // Selecting the display board and set it to a variable
    const boardEl = displayController.board;
    displayController.renderBoard(Gameboard.getBoard(displayController.player1Display(), displayController.player2Display()))
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
        Gameboard.checkWin()
    });
    return {
        player1,
        player2
    }
})();