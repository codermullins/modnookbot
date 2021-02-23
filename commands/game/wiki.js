const { Message, MessageEmbed } = require('discord.js');
const { nookLink } = require('../../config.js');
const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    name: 'wiki',
    aliases: ['vil, villager'],
    description: 'Gets information of Villiager from the API',
    usage: '!wiki <name>',

    run: async (client, msg, args) => {

        //if the user does not display a name
        if (!args.length) {
            return msg.channel.send('You need to supply a name');

        }

        //query for in put of villager .ie Bob or Fauna
        const query = querystring.stringify({ name: args.join(' ') });

        //GET the API and Query for Villagers
        const list = await fetch(`https://api.nookipedia.com/villagers?${query}&${nookLink}`)
            .then(res => res.json());

        if (!list.length) {
            return msg.channel.send(`No results found for **${args.join(' ')}**.`);
        }

        let name = list[0].name;
        let species = list[0].species;
        let personality = list[0].personality;
        let gender = list[0].gender;
        let sign = list[0].sign;
        let phrase = list[0].phrase;
        let quote = 'Unknown';
        if (list[0].quote != "") {
            quote = list[0].quote;
        }
        let birthday = 'Unknown';
        if (list[0].birthday_month != "" && list[0].birthday_day != "") {
            birthday = list[0].birthday_month + ' ' + list[0].birthday_day;
        }


        //embeds format to display in disocord chat
        const embed = new MessageEmbed()
            .setTitle(name)
            .setDescription('Villager Info')
            .addFields(
                { name: 'Species', value: species, inline: true },
                { name: 'Personality', value: personality, inline: true },
                { name: 'Gender', value: gender, inline: true },
                { name: 'Birthday', value: birthday, inline: true },
                { name: 'Sign', value: sign, inline: true },
                { name: 'Phrase', value: phrase, inline: true },
                { name: 'Quote', value: quote, inline: true },
                { name: '\u200B', value: '\u200B' }
            )
            .setThumbnail(list[0].image_url, 50, 50)
            .addField('For more information click here', list[0].url)
            .setURL(list[0].url)
            .setFooter('Information Provided by Nookipedia API');

        //sends the embed in chat
        msg.channel.send(embed);
    },


};

