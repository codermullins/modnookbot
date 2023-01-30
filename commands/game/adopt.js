//TODO
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'adopt',
    description: 'COMING SOON',

    run: async (client, msg, args) => {
        const embed = new MessageEmbed()
        .setTitle('Feature Coming Soon')
        .setDescription('This feature is not yet functional. It is being worked on and will be implemented in the near future.!!');

        msg.channel.send(embed);
    }
};