const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { nookLink } = require("../../config.js");
const fetch = require("node-fetch");

const trim = (str, max) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Displays the Wiki for a Villager")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Provide the name of who you are looking for.")
    ),

  async execute(interaction) {
    const name = interaction.options.getString("name");
    const query = new URLSearchParams({ name });

    //GET the API and Query for Villagers
    const list = await fetch(
      `https://api.nookipedia.com/villagers?${query}&${nookLink}`
    ).then((res) => res.json());
    
    // if (list[0].name != ""){
    //   await interaction.reply('No villager found!');
    // }

    let vName = list[0].name;
    let species = list[0].species;
    let personality = list[0].personality;
    let gender = list[0].gender;
    let sign = list[0].sign;
    let phrase = list[0].phrase;
    let quote = "Unknown";
    if (list[0].quote != "") {
      quote = list[0].quote;
    }
    let birthday = "Unknown";
    if (list[0].birthday_month != "" && list[0].birthday_day != "") {
      birthday = list[0].birthday_month + " " + list[0].birthday_day;
    }



    const embed = new EmbedBuilder()
      .setTitle(vName)
      .setDescription("Villager Info")
      .addFields(
        { name: "Species", value: species, inline: true },
        { name: "Personality", value: personality, inline: true },
        { name: "Gender", value: gender, inline: true },
        { name: "Birthday", value: birthday, inline: true },
        { name: "Sign", value: sign, inline: true },
        { name: "Phrase", value: phrase, inline: true },
        { name: "Quote", value: quote, inline: true },
        { name: "\u200B", value: "\u200B" }
      )
      .setThumbnail(list[0].image_url, 50, 50)
      .addFields({name: "For more information click here", value: list[0].url})
      .setFooter({ text: "Information Provided by Nookipedia API"});
    await interaction.reply({ embeds: [embed] });
  },
};

