const { TOKEN } = require('./config.js');
const { Client, Collection, Events, GatewayIntentBits }= require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
const emoji = require('./resources/emoji');

client.commands = new Collection();
client.commandArray = [];
client.emoji = emoji;

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
  .readdirSync(`./functions/${folder}`)
  .filter((file) => file.endsWith('.js'));
  for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}



client.eventHandler();
client.commandHandler();
client.login(TOKEN);
