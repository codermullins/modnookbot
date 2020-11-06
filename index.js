<<<<<<< HEAD
const Discord = require('discord.js');
const fs = require('fs');
const {TOKEN} = require('./config.js');
const Enmap = require('enmap');
const client = new Discord.Client();
const emoji = require('./resources/emoji');

client.commands = new Enmap();
client.emoji = emoji;

fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded '${evtName}'.`);
    client.on(evtName, evt.bind(null, client));
  });
});

//loads files from the command folder
fs.readdir('./commands/', (err, folders) => {
  if (err) {
    return console.error;
  }

  for (let i = 0; i < folders.length; i++) {
    fs.readdir(`./commands/${folders[i]}/`, (err, files) => {
      if (err) {
        return console.error;
      }
      files.forEach((file) => {
        if(!file.endsWith('.js')) {
          return;
        }

    let props = require(`./commands/${folders[i]}/${file}`);
    let cmdName = file.split('.')[0];
    console.log(`Loaded '${cmdName}'.`);
    client.commands.set(cmdName, props);
        
      });
    });
  }
});



client.login(TOKEN);
=======
require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});
>>>>>>> 691ef36b09cf4df8fdc1f9c427a614b2ca82b493
