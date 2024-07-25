const { SlashCommandBuilder } = require('discord.js');
const { startGame } = require('../../battleshipengine/startGame.js');
const { setGameState } = require('../../battleshipengine/gameState.js');
const { printGameBoard } = require('../../battleshipengine/printGameBoard.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startgame')
        .setDescription('Starts a game of Battleship.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const response = startGame();
        setGameState(userId, {
            hits: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => '')),
            misses: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => '')),
            shipPlacement: response.shipPlacement,
            playerBoard: response.playerBoard,
            shipsLeft: response.shipsLeft,
            gameOver: false
        });
        
        const printedGameBoard = printGameBoard(response.playerBoard);
        //console.log(printedGameBoard)
        await interaction.reply(`Game started! \n${printedGameBoard}`);
    },
};
