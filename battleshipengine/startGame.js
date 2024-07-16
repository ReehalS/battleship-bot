// initialize a battleship game
// Caller can invoke a startGame() function to begin a 1-player game. This function will generate an 8x8 game board consisting of 3 ships having a width of one square and a length of:
// Destroyer: 2 squares
// Cruiser: 3 squares
// Battleship: 4 squares
// startGame() will randomly place these ships on the board in any direction and will return an array representing ship placement.



const startGame = () => {
    let gameBoard = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0));
    let ships = {
        destroyer: 2,
        cruiser: 3,
        battleship: 4,
        cruiser: 3,
        carrier: 5
    };
    let shipPlacement = [];
    for (let ship in ships) {
        let shipPlaced = false;
        while (!shipPlaced) {
            let x = Math.floor(Math.random() * 8);
            let y = Math.floor(Math.random() * 8);
            let direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            if (canPlaceShip(gameBoard, x, y, ships[ship], direction)) {
                placeShip(gameBoard, x, y, ships[ship], direction);
                shipPlacement.push({ x, y, length: ships[ship], direction, destroyed: false });
                shipPlaced = true;
            }
        }
    }
    let playerBoard = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => '-'));
    shipsLeft = 3;
    return {shipPlacement, playerBoard, shipsLeft};
}

const canPlaceShip = (gameBoard, x, y, length, direction) => {
    if (direction === 'horizontal') {
        if (x + length > 8) return false;
        for (let i = x; i < x + length; i++) {
            if (gameBoard[i][y] !== 0) return false;
        }
    } else {
        if (y + length > 8) return false;
        for (let i = y; i < y + length; i++) {
            if (gameBoard[x][i] !== 0) return false;
        }
    }
    return true;
}

const placeShip = (gameBoard, x, y, length, direction) => {
    if (direction === 'horizontal') {
        for (let i = x; i < x + length; i++) {
            gameBoard[i][y] = 1;
        }
    } else {
        for (let i = y; i < y + length; i++) {
            gameBoard[x][i] = 1;
        }
    }
}

module.exports = { startGame };