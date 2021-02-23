const { Message, MessageEmbed } = require('discord.js');
const { nookLink } = require('../../config.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: 'sea',
    description: 'Gets information about searched sea creatures',
    usage: '<name>',

    run: async (client, msg, args) => {

        //if the user does not display a name
        if (!args.length) {
            return msg.channel.send('You need to supply a name');

        }

        //query for innput of sea creatures
        const query = querystring.stringify({ name: args.join(' ') });
        const formatquery = query.slice(5);

        //GET the API and Query for NH sea creatures
        const list = await fetch(`https://api.nookipedia.com/nh/sea/${formatquery}?${nookLink}`)
            .then(res => res.json());


        if (!list.name) {
            return msg.channel.send(`No results found for **${formatquery}**.`);
        }

        let name = list.name;
        let shadow = list.shadow_size;
        let shadowMove = list.shadow_movement;
        let rarity = 'Unknown';
        if (list.rarity != "") {
            rarity = list.rarity;
        }


        //embed format for display
        const embed = new MessageEmbed()
            .setTitle(name)
            .setURL(list.url)
            .setThumbnail(list.image_url)
            .addFields(
                { name: 'Shadow Size', value: shadow, inline: true },
                { name: 'Shadow Movement', value: shadowMove, inline: true },
                { name: 'Rarity', value: rarity, inline: true },
            );
        for (let i = 0; i < list.north.availability_array.length; i++) {
            embed.addFields(
                { name: 'Times Avalible North', value: list.north.availability_array[i].months + "\n" + list.north.availability_array[i].time, inline: false },
                { name: 'Times Avalible South', value: list.south.availability_array[i].months + "\n" + list.south.availability_array[i].time, inline: false },
                { name: '\u200B', value: '\u200B' });
        }
        embed.addField('For more information click here', list.url)
            .setFooter('Information Provided by Nookipedia API');

        msg.channel.send(embed);
    },


};
