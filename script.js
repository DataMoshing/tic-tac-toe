// Create gameboard as an array inside Gameboard object (module/IIFE)
const Gameboard = (() => {
    "use strict"
    // Array with nine indexes 
    let gameboard = new Array(9).fill("");

    // Update array index with players value
    const setCell = (index, value) => {
        console.log(index);
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

    // Function renderBoard with a parameter of arr
    const renderBoard = (arr) => {
        // Looping through the argument that passed to the parameter which is copy of the original array 
        for (let i = 0; i < arr.length; i++) {
            // Creating the element div
            let cell = document.createElement("div")
            // Giving the cell the id of i or number of times were looping through it
            cell.id = i;
            // Setting the class of cell to "cell"
            cell.classList = "cell";
            // Setting the attribute of cell to "cell-data" assigning the index like cell.id
            cell.setAttribute("cell-data", i)
            // Setting the cell text content of arr[i]
            cell.textContent = arr[i]
            console.log(cell)
            // Appending elements to the DOM 
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
            Gameboard.setCell(index, "O");
            // Prevent multiple boards
            displayController.clearBoard();
            // Rerender the board 
            displayController.renderBoard(Gameboard.getBoard());
        }
    });
})();