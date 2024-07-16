const fs = require('fs');
const path = require('path');

const gameStateFilePath = path.join(__dirname, 'gameState.json');
let gameState = {};

const loadGameState = () => {
    if (fs.existsSync(gameStateFilePath)) {
        const data = fs.readFileSync(gameStateFilePath);
        gameState = JSON.parse(data);
    }
};

const saveGameState = () => {
    fs.writeFileSync(gameStateFilePath, JSON.stringify(gameState));
};

const getGameState = (userId) => {
    return gameState[userId] || null;
};

const setGameState = (userId, state) => {
    gameState[userId] = state;
    saveGameState();
};

module.exports = { loadGameState, saveGameState, getGameState, setGameState };
