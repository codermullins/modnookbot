const { prefix } = require('../config.js');

module.exports = (client, msg) => {
    if (msg.author.bot) return;
    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;





    cmd.run(client, msg, args);
};

