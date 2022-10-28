// Create gameboard as an array inside Gameboard object (module/IIFE)
const Gameboard = (() => {
    "use strict"
    // Array with nine indexes 
    let gameboard = new Array(9).fill("");

    // Update array index with players value
    const setCell = (index, value) => {
        console.log({ index, value });
        gameboard[index] = value;
    };
    // Reset the game board
    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    // Get a copy of the original array
    const getBoard = () => [...gameboard];

    return {
        getBoard,
        resetBoard,
        setCell
    }
})();

const displayController = (() => {
    "use strict"
    const board = document.querySelector(".board")

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
    const playerFunction = (player, marker) => {
        return {
            player,
            marker,
        }
    }

    let player1 = playerFunction("Test1", "X")
    let player2 = playerFunction("Test2", "O")

    // If isplayeroneturn is placed in function it will always = true
    let isPlayerOneTurn = true
    const playerTurn = () => {
        if (isPlayerOneTurn) {
            // Set the players turn to false
            isPlayerOneTurn = false
            // Return player1 value
            return player1.marker
        } else {
            // Set back to true
            isPlayerOneTurn = true
            // Return player2 value
            return player2.marker
        }
    }

    // Selecting the display board and set it to a variable
    const boardEl = displayController.board;
    // Render the board and link Gameboard to displayController using a copy of the original array
    displayController.renderBoard(Gameboard.getBoard());
    boardEl.addEventListener("click", (e) => {
        // Only update the cells not anything else
        if (e.target.classList.contains("cell")) {
            // Set the cell-data e.target to index
            const index = e.target.getAttribute("cell-data");
            // Update the cells and populate
            Gameboard.setCell(index, playerTurn());
            // Prevent multiple boards
            displayController.clearBoard();
            // Rerender the board 
            displayController.renderBoard(Gameboard.getBoard());
        }
    });
})();


// Prevent players from playing in spots that are already taken - Something like if index === null
// If player has already placed their marker switch to other player
// Build logic to check for 3 in a row/tie
