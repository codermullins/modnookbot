const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Gets the Wiki for a Chossen Fish")
    .addStringOption((option) =>
     option
      .setName("name")
      .setDescription("Name of the fish you are looking for")),

  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const queryString = new URLSearchParams({ nameInput });
    const query = queryString.get('nameInput');

            //GET the API and Query for NH fish
        const list = await fetch(`https://api.nookipedia.com/nh/fish/${query}?${nookLink}`)
            .then(res => res.json());


        let name = list.name;
        let loc = list.location;
        let shadow = list.shadow_size;
        let rarity = 'Unknown';
        if (list.rarity != "") {
            rarity = list.rarity;
        }


        //embed format for display
        const embed = new EmbedBuilder()
            .setTitle(name)
            .setURL(list.url)
            .setThumbnail(list.image_url)
            .addFields(
                { name: 'Location ', value: loc, inline: true },
                { name: 'Shadow Size ', value: shadow, inline: true },
                { name: 'Rarity ', value: rarity, inline: true },
            );
        for (let i = 0; i < list.north.availability_array.length; i++) {
            embed.addFields(
                { name: 'Times Avalible North', value: list.north.availability_array[i].months + "\n" + list.north.availability_array[i].time, inline: false },
                { name: 'Times Avalible South', value: list.south.availability_array[i].months + "\n" + list.south.availability_array[i].time, inline: false },
                { name: '\u200B', value: '\u200B' });
        }
        embed.addFields({ name: 'For more information click here', value: list.url })
            .setFooter({ text: 'Information Provided by Nookipedia API' });


            
    await interaction.reply({ embeds: [embed]});
  },
};


//         //query for innput of fish 
//         const query = querystring.stringify({ name: args.join(' ') });
//         const formatquery = query.slice(5);

//         //GET the API and Query for NH fish
//         const list = await fetch(`https://api.nookipedia.com/nh/fish/${formatquery}?${nookLink}`)
//             .then(res => res.json());


//         if (!list.name) {
//             return msg.channel.send(`No results found for **${formatquery}**.`);
//         }

//         let name = list.name;
//         let loc = list.location;
//         let shadow = list.shadow_size;
//         let rarity = 'Unknown';
//         if (list.rarity != "") {
//             rarity = list.rarity;
//         }


//         //embed format for display
//         const embed = new MessageEmbed()
//             .setTitle(name)
//             .setURL(list.url)
//             .setThumbnail(list.image_url)
//             .addFields(
//                 { name: 'Location ', value: loc, inline: true },
//                 { name: 'Shadow Size ', value: shadow, inline: true },
//                 { name: 'Rarity ', value: rarity, inline: true },
//             );
//         for (let i = 0; i < list.north.availability_array.length; i++) {
//             embed.addFields(
//                 { name: 'Times Avalible North', value: list.north.availability_array[i].months + "\n" + list.north.availability_array[i].time, inline: false },
//                 { name: 'Times Avalible South', value: list.south.availability_array[i].months + "\n" + list.south.availability_array[i].time, inline: false },
//                 { name: '\u200B', value: '\u200B' });
//         }
//         embed.addField('For more information click here', list.url)
//             .setFooter('Information Provided by Nookipedia API');

//         msg.channel.send(embed);

//     },


// };


