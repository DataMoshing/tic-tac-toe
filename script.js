// Create gameboard as an array inside Gameboard object (module/IIFE)
const Gameboard = (() => {
    "use strict"
    const board = document.querySelector(".board")

    // Array with nine indexes 
    let gameboard = new Array(9).fill("");

    // Update array index with players value
    const setCell = (index, value) => gameboard[index] = value;

    // Reset the game board
    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    // Get a copy of the original array
    const getBoard = () => {
        const boardClone = [...gameboard];
        console.log(boardClone)
        return boardClone;
    }

    // Render the gameboard to web page
    const renderBoard = () => {
        for (let i = 0; i < gameboard.length; i++) {
            let cell = document.createElement("div")
            cell.classList = "cell";
            cell.setAttribute("cell-data", i)
            cell.textContent = gameboard[i]
            // console.log(cell)
            board.append(cell)
        }
    }

    return {
        getBoard,
        resetBoard,
        renderBoard,
        setCell
    }
})();

Gameboard.renderBoard()

const displayController = (() => {
    "use strict"
    const board = document.querySelector(".board")

    // Event listener removes child nodes and updates gameboard when clicked
    board.addEventListener("click", function (event) {
        while (board.hasChildNodes()) {
            board.removeChild(board.firstChild)
            console.log(event)
        }
        Gameboard.setCell(2, "X")
        Gameboard.renderBoard()
    })

    return {

    }
})();

// 2 player game which the players are also objects (factory functions)
const createPlayer = (player, marker) => {
    return {
        player,
        marker,
        test() {
            console.log(`This is ${player} and their marker is ${marker}`)
        }
    }
}

const player1 = createPlayer("Test1", "X");
const player2 = createPlayer("Test2", "O");