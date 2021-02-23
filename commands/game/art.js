const { Message, MessageEmbed } = require('discord.js');
const { nookLink } = require('../../config.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: 'art',
    description: 'Gets information about searched bugs',
    usage: '<name>',

    run: async (client, msg, args) => {

        //if the user does not display a name
        if (!args.length) {
            return msg.channel.send('You need to supply a name');

        }

        //query for innput of artwork 
        const query = querystring.stringify({ name: args.join(' ') });
        const formatquery = query.slice(5);

        //GET the API and Query for NH artwork
        const list = await fetch(`https://api.nookipedia.com/nh/art/${formatquery}?${nookLink}`)
            .then(res => res.json());


        if (!list.name) {
            return msg.channel.send(`No results found for **${formatquery}**.`);
        }

        let name = list.name;
        let artName = list.art_name;
        let author = list.author;
        let year = list.year;
        let artStyle = list.art_style;
        let description = list.description;


        //embed format for display
        const embed = new MessageEmbed()
            .setTitle(name)
            .setURL(list.url)
            .setThumbnail(list.image_url)
            .addFields(
                { name: 'Art Name', value: artName, inline: true },
                { name: 'Artist', value: author, inline: true },
                { name: 'Has a Fake', value: list.has_fake, inline: true },
                { name: 'Year', value: year, inline: true },
                { name: 'Art Style', value: artStyle, inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'Description', value: description, inline: false },
                { name: '\u200B', value: '\u200B' }
            )
            .addField('For more information click here', list.url)
            .setFooter('Information Provided by Nookipedia API');

        msg.channel.send(embed);
    },


};