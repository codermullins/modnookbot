const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recipe")
    .setDescription("Gets Wiki for a choosen recipe")
    .addStringOption((option) =>
      option
      .setName("name")
      .setDescription('Name of the recipe you are looking for')),

  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const queryString = new URLSearchParams({ nameInput });
    const query = queryString.get('nameInput');

        //GET the API and Query for NH recipe
        const list = await fetch(`https://api.nookipedia.com/nh/recipes/${query}?${nookLink}`)
            .then(res => res.json());
            
            let name = list.name;

        //embed format for display
        const embed = new EmbedBuilder()
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
            .addFields({ name: 'For more information click here', value: list.url })
            .setFooter({ text: 'Information Provided by Nookipedia API' });
    await interaction.reply({ embeds: [embed] });
  },
};

