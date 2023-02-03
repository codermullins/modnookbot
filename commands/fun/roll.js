const { SlashCommandBuilder } = require("discord.js");
const emoji = require('../../resources/emoji');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a random number between 1 and the number given')
        .addIntegerOption((option) =>
        option
          .setName("input")  
          .setDescription("Integer Input 1 - 99")
          .setMinValue(1)
          .setMaxValue(99)
        ),

    async execute(interaction) {
        const input = interaction.options.getInteger("input");
        const output = Math.ceil(Math.random() * input);
    if (input) {
        await interaction.reply(`${emoji.gameDie} **${output}** (1-${input})`);
    }

    

    
    // return interaction.reply("Must choose a number from 1- 99!");
}


};