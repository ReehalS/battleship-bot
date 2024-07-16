const printGameBoard = (board) => {
    let display = '     0   1   2   3   4   5   6   7\n';
    for (let i = 0; i < 8; i++) {
        display += `${i}   `;
        for (let j = 0; j < 8; j++) {
            display += `${board[i][j]}   `;
        }
        display += '\n';
    }
    return display;
}

module.exports = { printGameBoard };
