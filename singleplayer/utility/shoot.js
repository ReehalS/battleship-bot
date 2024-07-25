const { SlashCommandBuilder } = require('discord.js');
const { shootVolley } = require('../../battleshipengine/shootVolley.js');
const { getGameState, setGameState } = require('../../battleshipengine/gameState.js');
const { printGameBoard } = require('../../battleshipengine/printGameBoard.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shoot')
        .setDescription('Shoots a volley at the desired x,y location.')
        .addIntegerOption(option => option.setName('x').setDescription('The x coordinate of the target.').setRequired(true))
        .addIntegerOption(option => option.setName('y').setDescription('The y coordinate of the target.').setRequired(true)),
    async execute(interaction) {
        const x = interaction.options.getInteger('x');
        const y = interaction.options.getInteger('y');
        const userId = interaction.user.id;
        const gameState = getGameState(userId);

        if (!gameState) {
            await interaction.reply('No active game found. Please start a new game.');
            return;
        }

        const { hits, misses, shipPlacement, playerBoard, shipsLeft } = gameState;
        const response = shootVolley(shipsLeft, shipPlacement, hits, misses, x, y, playerBoard);
        
        setGameState(userId, {
            hits: response.hits,
            misses: response.misses,
            shipPlacement: response.shipPlacement,
            playerBoard: response.playerBoard,
            shipsLeft: response.shipsLeft
        });
        if(response.error){
            await interaction.reply(`Invalid coordinates. Please enter a valid x and y coordinate between 0 and 7. \n${response.playerBoard}`);
        } else if(response.shipsLeft > 0){
            const printedGameBoard = printGameBoard(playerBoard);
            await interaction.reply(`Shot fired at ${x},${y}. \n ${response.hit ? "**You hit a ship!**": "**You Missed.**"}      Ships left: ${response.shipsLeft}. \n${printedGameBoard}`);
        } else {
            const printedGameBoard = printGameBoard(playerBoard);
            setGameState(userId, {
                ...gameState,
                gameOver: true
            });
            await interaction.reply(`Shot fired at ${x},${y}. \n ${response.hit ? "*You hit a ship!*": "**You Missed.**"}      Ships left: ${response.shipsLeft}. \n${printedGameBoard} \n**Game Over! All ships have been sunk.**`);
        }
    
    },
};
