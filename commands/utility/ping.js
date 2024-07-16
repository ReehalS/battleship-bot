const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong! \n This is a test command to check if the bot is working properly.'),
    async execute(interaction) {
		await interaction.reply('Pong!');
	},
};