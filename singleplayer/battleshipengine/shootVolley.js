/*
Caller can invoke a shoot() function passing the target row and column coordinates of the targeted cell on the game board. 
shoot() will return indicators representing if the shot resulted in a hit or miss, the number of ships left (i.e. not yet sunk), 
the ship placement array, and an updated hits and misses array.


Cells in the hits and misses array will contain a space if they have yet to be targeted, 
O if they were targeted but no part of a ship was at that location, or X if the cell was occupied by part of a ship.

*/


const shootVolley = (shipsLeft, shipPlacement, hits, misses, x, y, playerBoard) => {
    let error = false;
    let hit = false;
    if (x < 0 || x > 7 || y < 0 || y > 7) {
        error = true;
        const checkShipsLeft = checkShips(shipPlacement, hits);
        shipPlacement = checkShipsLeft.shipPlacement;
        return { hit, shipsLeft: checkShipsLeft.shipsLeft, shipPlacement, hits, misses, playerBoard, error };
    }else{
        if (hits[y][x] !== '' || misses[y][x] !== '') {
            console.log('Already shot at this location');
            const checkShipsLeft = checkShips(shipPlacement, hits);
            shipPlacement = checkShipsLeft.shipPlacement;
            return { hit, shipsLeft: checkShipsLeft.shipsLeft, shipPlacement, hits, misses, playerBoard, error };
        }
        for (let ship of shipPlacement) {
            if (ship.direction === 'vertical') {
                if (x === ship.x && y >= ship.y && y < ship.y + ship.length) {
                    hits[y][x] = 'X';
                    playerBoard[y][x] = 'X';
                    hit = true;
                    break;
                }
            } else {
                if (y === ship.y && x >= ship.x && x < ship.x + ship.length) {
                    hits[y][x] = 'X';
                    playerBoard[y][x] = 'X';
                    hit = true;
                    break;
                }
            }
        }
        if (!hit) {
            misses[y][x] = 'O';
            playerBoard[y][x] = 'O';
        }
    }
    const checkShipsLeft = checkShips(shipPlacement, hits);
    shipPlacement = checkShipsLeft.shipPlacement;
    return { hit, shipsLeft: checkShipsLeft.shipsLeft, shipPlacement, hits, misses, playerBoard, error };
}

const checkShips = (shipPlacement, hits) => {
    // Count the number of ships left
    let shipsLeft = 0;
    //console.log(shipPlacement);
    for (let ship of shipPlacement) {
        let hitCount = 0;
        for (let i = 0; i < ship.length; i++) {
            if (ship.direction === 'horizontal') {
                if (hits[ship.y][ship.x+i] === 'X') {
                    hitCount++;
                }
                // console.log(`check at ${ship.x + i}, ${ship.y}`);
            } else {
                if (hits[ship.y+i][ship.x] === 'X') {
                    hitCount++;
                    
                }
                // console.log(`check at ${ship.x}, ${ship.y + i}`);
            }
            // console.log(ship.length, hitCount);
        }
        if (hitCount < ship.length) {
            shipsLeft++;
            // set destroyed to false if the ship is not yet destroyed
            ship.destroyed = false;
        }
        else {
            // set destroyed to true if the ship is destroyed, change it in the shipPlacement array
            ship.destroyed = true;

        }
    }
    //console.log(shipPlacement)
    return {shipsLeft, shipPlacement};
}

module.exports = { shootVolley };