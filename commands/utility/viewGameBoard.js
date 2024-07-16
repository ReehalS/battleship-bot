const {SlashCommandBuilder} = require('discord.js');
const {getGameState} = require('../../battleshipengine/gameState.js');
const {printGameBoard} = require('../../battleshipengine/printGameBoard.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('viewgameboard')
        .setDescription('Displays the current game board.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const gameState = getGameState(userId);

        if (!gameState) {
            await interaction.reply('No active game found. Please start a new game.');
            return;
        }

        const {playerBoard} = gameState;
        const playerBoardDisplay = printGameBoard(playerBoard);
        await interaction.reply(`Current game board: \n${playerBoardDisplay}`);
    },
};