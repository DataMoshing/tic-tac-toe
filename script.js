// Create gameboard as an array inside Gameboard object (module/IIFE)
const gameBoardModule = (() => {

    // Array with nine indexes 
    let gameboard = new Array(9).fill("")

    // Update array index with players value
    const setCell = (index, value) => gameboard[index] = value

    // Reset the game board
    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", "",]
    }
    // Get a copy of the original array
    const getBoard = () => {
        const boardClone = [...gameboard]
        console.log(boardClone)
        return boardClone
    }
    return {
        setCell,
        resetBoard,
        getBoard
    }
})();

gameBoardModule.resetBoard()


// 2 player game which the players are also objects (factory functions)
const createPlayer = (player1, player2) => {
    return {
        player1,
        player2,
        greet() {
            console.log("Greetings " + player1 + " and " + player2)
        }
    }
}

const test2 = createPlayer("A", "B")

test2.greet();

// Use DOM Manipulation to render HTML (X's and O's)
// Create factory functions to let players mark the gameboard
// Check if spots are already taken
// Build logic to check if game is over (tie or 3-in-a-row)
// Allow players to input names
// Add button to start/restart
// Display winner 