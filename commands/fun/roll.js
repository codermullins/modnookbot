module.exports = {
    name: 'roll',
    description: 'Rolls a random number between 1 and the number given',
    

    run: (client, msg, args) => {
    const input = parseInt(args[0], 10);

    if (!input) {
        return msg.channel.send('Provide a number for the max range');
    }

    const output = Math.ceil(Math.random() * input);

    return msg.channel.send(`${client.emoji.gameDie} **${output}** (1-${input})`);
},


};