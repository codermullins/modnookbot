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
