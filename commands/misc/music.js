//TODO
const ytdl = require('ytdl-core');
const { google } = require('googleapis');
const { Message, MessageEmbed, DiscordAPIError } = require('discord.js');
const distube = require('distube');



module.exports = {
    name: 'music',
    description: 'moves the bot to play music in the voice channel',
    usage: '<play|skip|stop|queue><song name>',
    details: '`<play>` => Add a song by name to the queue\n' + 
    '`<skip>` => Skip the current song\n' +
    '`<stop>` => Delete the current song queue and remove the bot from the voice channel.\n' +
    '`<queue>` => Displays all songs in queue',
    


    run: async (client, msg, args) => {

        if (!args.length) {
            msg.channel.send('You need to supply an arg');
            return;
        }
        let queue = client.disTube.getQueue(msg);
        switch (args[0]) {
            case 'play':
                if (!msg.member.voice.channel){
                    return msg.channel.send('You need to be in a voice channel!');
                }
                client.disTube.play(msg, args.join(' '));

                break;
            case 'repeat':
            case 'loop':
                client.disTube.setRepeatMode(msg, parseInt(args[1]));
                break;
            case 'stop':
                client.disTube.stop(msg);
                msg.channel.send('Music has been stopped.');
                break;
            case 'skip':
                client.disTube.skip(msg);
                break;
            case 'queue':
                
                msg.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                    `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n'));
                break;

            default:
                const embed = new MessageEmbed()
                    .setTitle('Feature Coming Soon')
                    .setDescription('This feature is not yet functional. It is being worked on and will be implemented in the near future.!!');


                msg.channel.send(embed);

                break;
        }


    },


};
