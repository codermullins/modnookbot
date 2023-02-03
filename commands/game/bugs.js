const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bugs")
    .setDescription("Gets the Wiki for a chossen bug")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Provide the name of bug you are looking for.")
    ),
  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const queryString = new URLSearchParams({ nameInput });
    const query = queryString.get('nameInput');
    

    const list = await fetch(
      `https://api.nookipedia.com/nh/bugs/${query}?${nookLink}`
    ).then((res) => res.json());

    let name = list.name;
    let loc = list.location;
    let rarity = 'Unknown';
    if (list.rarity != ""){
        rarity = list.rarity;
    }


    //embed format for display
    const embed = new EmbedBuilder()
    .setTitle(name)
    .setURL(list.url)
    .setThumbnail(list.image_url)
    .addFields(
        { name: 'Location', value: loc, inline: true },
        { name: 'Rarity', value: rarity, inline: true },
    );
    for (let i = 0; i < list.north.availability_array.length; i++){
        embed.addFields(
            { name: 'Times Avalible North', value: list.north.availability_array[i].months + "\n" + list.north.availability_array[i].time, inline: false },
            { name: 'Times Avalible South', value: list.south.availability_array[i].months + "\n" + list.south.availability_array[i].time, inline: false },
            { name: '\u200B', value: '\u200B'});
    }

    embed.addFields({ name: 'For more information click here', value: list.url })
    .setFooter({ text: 'Information Provided by Nookipedia API' });

    await interaction.reply({ embeds: [embed] });
  },
};

//     let name = list.name;
//     let loc = list.location;
//     let rarity = 'Unknown';
//     if (list.rarity != ""){
//         rarity = list.rarity;
//     }


//     //embed format for display
//     const embed = new MessageEmbed()
//     .setTitle(name)
//     .setURL(list.url)
//     .setThumbnail(list.image_url)
//     .addFields(
//         { name: 'Location', value: loc, inline: true },
//         { name: 'Rarity', value: rarity, inline: true },
//     );
//     for (let i = 0; i < list.north.availability_array.length; i++){
//         embed.addFields(
//             { name: 'Times Avalible North', value: list.north.availability_array[i].months + "\n" + list.north.availability_array[i].time, inline: false },
//             { name: 'Times Avalible South', value: list.south.availability_array[i].months + "\n" + list.south.availability_array[i].time, inline: false },
//             { name: '\u200B', value: '\u200B'});
//     }

//     embed.addField('For more information click here', list.url)
//     .setFooter('Information Provided by Nookipedia API');