const { Message, MessageEmbed } = require('discord.js');
const { nookLink } = require('../../config.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: 'recipe',
    description: 'Gets information about searched bugs',
    usage: '<name>',

    run: async (client, msg, args) => {

        //if the user does not display a name
        if (!args.length) {
            return msg.channel.send('You need to supply a name');

        }

        //query for innput of recipe
        const query = querystring.stringify({ name: args.join(' ') });
        const formatquery = query.slice(5);

        //GET the API and Query for NH recipe
        const list = await fetch(`https://api.nookipedia.com/nh/recipes/${formatquery}?${nookLink}`)
            .then(res => res.json());


        if (!list.name) {
            return msg.channel.send(`No results found for **${formatquery}**.`);
        }

        let name = list.name;




        //embed format for display
        const embed = new MessageEmbed()
            .setTitle(name)
            .setURL(list.url)
            .setThumbnail(list.image_url);
        for (let i = 0; i < list.materials.length; i++) {
            embed.addFields({ name: 'Material Needed', value: list.materials[i].name + " " + list.materials[i].count, inline: false });
            // embed.addFields({ name: 'Amount', value: list.materials[i].count, inline: true });
        }
        embed.addFields(
            { name: '\u200B', value: '\u200B' }
        )
            .addField('For more information click here', list.url)
            .setFooter('Information Provided by Nookipedia API');

        msg.channel.send(embed);
    },


};
