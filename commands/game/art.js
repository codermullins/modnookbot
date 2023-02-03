const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("art")
    .setDescription("Pulls the wiki for art")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Provide the name of art you are looking for.")
    ),
  async execute(interaction) {
    const nameInput = interaction.options.getString("name");
    const queryString = new URLSearchParams({ nameInput });
    const query = queryString.get('nameInput');

    //GET the API and Query for NH artwork
    const list = await fetch(
      `https://api.nookipedia.com/nh/art/${query}?${nookLink}`
    ).then((res) => res.json());

    let aName = list.name;
    let artName = list.art_name;
    let author = list.author;
    let year = list.year;
    let artStyle = list.art_style;
    let description = list.description;
console.log(aName);
    const embed = new EmbedBuilder()
      .setTitle(aName)
      // .setURL(list.url)
      .setThumbnail(list.image_url)
      .addFields(
        { name: "Art Name", value: artName, inline: true },
        { name: "Artist", value: author, inline: true },
        // { name: "Has a Fake", value: list.has_fake, inline: true },
        { name: "Year", value: year, inline: true },
        { name: "Art Style", value: artStyle, inline: true },
        { name: "Description", value: description, inline: false },
        { name: "\u200B", value: "\u200B" }
      )
      .addFields({ name: "For more information click here", value: list.url })
      .setFooter({ text: "Information Provided by Nookipedia API" });

    await interaction.reply({ embeds: [embed] });
  },
};

