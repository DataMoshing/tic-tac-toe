// Create gameboard as an array inside Gameboard object (module)
const Gameboard = {
    gameboard: [],
}

const createPlayer = (player1, player2) => {
    return {
        player1: player1,
        player2: player2
    }
}
// 2 player game which the players are also objects (factory functions)
// Use DOM Manipulation to render HTML (X's and O's)
// Create factory functions to let players mark the gameboard
// Check if spots are already taken
// Build logic to check if game is over (tie or 3-in-a-row)
// Allow players to input names
// Add button to start/restart
// Display winner 