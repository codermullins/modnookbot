const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sea")
    .setDescription("Gets Wiki for a Chosen sea creature")
    .addStringOption((option) => 
    option
    .setName('name')
    .setDescription('Name of the Sea Creature')),

  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const queryString = new URLSearchParams({ nameInput });
    const query = queryString.get('nameInput');

            //GET the API and Query for NH sea creatures
        const list = await fetch(`https://api.nookipedia.com/nh/sea/${query}?${nookLink}`)
            .then(res => res.json());


        let name = list.name;
        let shadow = list.shadow_size;
        let shadowMove = list.shadow_movement;
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
        embed.addFields({ name: 'For more information click here', value: list.url })
            .setFooter({ text: 'Information Provided by Nookipedia API' });




    await interaction.reply({ embeds: [embed]});
  },
};




