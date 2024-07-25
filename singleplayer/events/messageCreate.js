const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
    async execute(message) {
        console.log(message)
        if (message.author.bot) return;
        console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
        if(message.content === 'ping') {
            message.reply('pong');
        }
    },
};