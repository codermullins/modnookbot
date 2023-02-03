const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { TOKEN, clientId, guildId } = require('../../config.js');

module.exports = (client) => {
    client.commandHandler = async() => {
    const commandFolders = fs.readdirSync(`./commands`);
    for (const folder of commandFolders) {
      const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith('.js'));
      
      const { commands, commandArray} = client;
      for (const file of commandFiles){
      const command = require(`../../commands/${folder}/${file}`);
      commands.set(command.data.name, command);
      commandArray.push(command.data.toJSON());
      console.log(`Loaded ${command.data.name}`);
      }
    }

    const rest = new REST({ version: '9' }).setToken(TOKEN);

    try {
        console.log('Started application (/) commands');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArray,
        });

        console.log('Successful');
    } catch (error) {
        console.log(error);
    }
};
};