const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("island")
    .setDescription("Rolls a random number between 1 and the number given"),

  async execute(interaction) {
    await interaction.reply(`TBD`);
  },
};
// const { sign } = require('crypto');
// const Discord = require('discord.js');
// const emoji = require('../../resources/emoji');
// const sqlite = require('sqlite3').verbose();


// module.exports = {
//     name: 'island',
//     category: 'game',
//     description: 'Island information display',
//     usage: 'island <islandname|fruit|charactername|hemisphere|profilename|friendcode|dreamaddress|creatorcode> <name|fruit|hemisphere|code|address>',
//     details: "<islandname> => Set the name of your island.\n<fruit> => Set the fruit that is native on your island.\n<charactername> => Set the name of your character on the island.\n<hemisphere> => Set the hemisphere your island is in.\n<profilename> => Set the name of your Switch profile.\n<friendcode> => Set your Switch friendcode.\n<dreamaddress> => Set your island's dream address.\n<creatorcode> => Set your creator code.",


//     run: async (client, msg, args) => {
//         let db = new sqlite.Database('./islandDb.db', sqlite.OPEN_READWRITE);
//         let userID = msg.author.id;
//         let userName = msg.author.tag;
        

//         let query = 'SELECT * FROM islandInfo WHERE userID =?';
//         //switch case to get diffent forms of the args
//         switch (args[0] && args[0].toLowerCase()) {
//             //case for island name input
//             case 'islandname':
//             case 'island':
//             case 'in':
//             case 'townname':
//             case 'name':
//             case 'tn': {

//                 //if no islandname given return error
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} No Island Name Given\nPlease supply the name of your Island!`);
//                 }
//                 //if island name is too long return error
//                 const name = args.slice(1).join(' ');
//                 if (name.length > 10) {
//                     return msg.channel.send(`${emoji.redX} Invalid Island Name!\nIsland names cannot be longer than 10 characters!`);
//                 }
//                 //get islandname arg to set
//                 let newIslandInfo = args.slice(1).join(' ');

//                 //write islandname to file
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, newIslandInfo, null, null, null, null, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Island Name Has Been Set!**\nIsland Name: **${newIslandInfo}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET islandName = ? WHERE userID = ?', [newIslandInfo, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Island Name Has Been Updated**\nIsland Name: **${newIslandInfo}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             case 'fruit':
//             case 'fr':
//             case 'f': {
//                 //if no fruit is given return an error
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} No Fruit Given!\nPlease supply the name of the fruit that is native to your island!`);
//                 }
//                 //possible choices of fruit to check for
//                 let fruit;
//                 if (/apples?/i.test(args[1])) {
//                     fruit = 'Apples';
//                 } else if (/cherr(y|ies)/i.test(args[1])) {
//                     fruit = 'Cherries';
//                 } else if (/oranges?/i.test(args[1])) {
//                     fruit = 'Oranges';
//                 } else if (/peach(es)?/i.test(args[1])) {
//                     fruit = 'Peaches';
//                 } else if (/pears?/i.test(args[1])) {
//                     fruit = 'Pears';
//                 }

//                 if (!fruit) {
//                     return msg.channel.send(`${emoji.redX} Invalid Fruit\nYour fruit must be apples, cherries, oranges, peaches, or pears!`);
//                 }

//                 let newIslandInfo = args.slice(1).join(' ');
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, newIslandInfo, null, null, null, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Island Fruit Has Been Set!**\nFruit: **${newIslandInfo}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET fruit = ? WHERE userID = ?', [newIslandInfo, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Island Fruit Has Been Updated**\nFruit: **${newIslandInfo}**`);
//                         }

//                     }

//                 });

//                 break;
//             }
//             case 'charactername':
//             case 'character':
//             case 'charname':
//             case 'cn':
//             case 'villagername':
//             case 'vn':
//             case 'islandername': {
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} **No Character Name Given!**\nPlease supply the name of your character!`);
//                 }

//                 const name = args.slice(1).join(' ');
//                 if (name.length > 10) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Character Name**\nCharacter names cannot be longer than 10 characters!`);
//                 }

//                 let newIslandInfo = args.slice(1).join(' ');
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, null, newIslandInfo, null, null, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Character Name Has Been Set!**\nCharacter Name: **${newIslandInfo}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET characterName = ? WHERE userID = ?', [newIslandInfo, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Character Name Has Been Updated**\nCharacter Name: **${newIslandInfo}**`);
//                         }

//                     }

//                 });

//                 break;
//             }
//             case 'hemisphere':
//             case 'hem':
//             case 'hm':
//             case 'hemi': {
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} **No Hemisphere Given!**\nPlease supply the hemisphere your island is in, nothern or southern!`);
//                 }

//                 let hemisphere;
//                 if (/north(ern)?/i.test(args[1])) {
//                     hemisphere = 'Northern';
//                 } else if (/south(ern)?/i.test(args[1])) {
//                     hemisphere = 'Southern';
//                 }

//                 if (!hemisphere) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Hemisphere**\nThe hemisphere can only be norther or southern!`);
//                 }

//                 let newIslandInfo = args.slice(1).join(' ');
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, null, null, null, newIslandInfo, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Hemisphere Has Been Set!**\nHemisphere: **${newIslandInfo}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET hemisphere = ? WHERE userID = ?', [newIslandInfo, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Hemisphere Has Been Updated**\nHemisphere: **${newIslandInfo}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             case 'profilename':
//             case 'profile':
//             case 'pn':
//             case 'switchname':
//             case 'sn': {
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} **No Switch Profile Name Given!**\nPlease supply the name of your Switch profile!`);
//                 }

//                 const name = args.slice(1).join(' ');
//                 if (name.length > 10) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Switch Profile Name!**\nSwitch profile names cannot be longer than 10 characters!`);
//                 }

//                 let newIslandInfo = args.slice(1).join(' ');
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, null, null, null, newIslandInfo, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Profile Name Has Been Set!**\nProfile Name: **${newIslandInfo}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET profileName = ? WHERE userID = ?', [newIslandInfo, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Profile Name Has Been Updated**\nProfile Name: **${newIslandInfo}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             case 'friendcode':
//             case 'fc':
//             case 'code': {
//                 if (args.length === 1) {
//                     return sign.channel.send(`${emoji.redX} **No Code Given!**\nPlease supply your Switch friend code!`);
//                 }

//                 let code = args.slice(1).join().replace(/[\D]/g, '');

//                 if (code.length !== 12) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Code!**\nThe code must have 12 digits!`);
//                 }

//                 code = `SW-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, code, null, null, null, null, null, null, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Friend Code Has Been Set!**\nFriend Code: **${code}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET friendCode = ? WHERE userID = ?', [code, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Friend Code Has Been Updated**\nFriend Code: **${code}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             case 'dreamaddress':
//             case 'dream':
//             case 'address':
//             case 'da': {
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} **No Dream Address Given!**\nPlease supply your dream address!`);
//                 }

//                 let address = args.slice(1).join().replace(/[\D]/g, '');

//                 if (address.length !== 12) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Address!**\nThe address must have 12 digits!`);
//                 }

//                 address = `DA-${address.slice(0, 4)}-${address.slice(4, 8)}-${address.slice(8, 12)}`;
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, null, null, null, null, address, null);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Dream Address Has Been Set!**\nDream Address: **${address}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET dreamAddress = ? WHERE userID = ?', [address, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Dream Address Has Been Updated**\nDream Address: **${address}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             case 'creatorcode':
//             case 'create':
//             case 'creator':
//             case 'cc': {
//                 if (args.length === 1) {
//                     return msg.channel.send(`${emoji.redX} **No Creator Code Given!**\nPlease supply your creator code!`);
//                 }

//                 let code = args.slice(1).join().replace(/[\D]/g, '');

//                 if (code.length !== 12) {
//                     return msg.channel.send(`${emoji.redX} **Invalid Code!**\nThe code must have 12 digits!`);
//                 }

//                 code = `MA-${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}`;
//                 db.get(query, [userID], (err, row) => {
//                     if (err) {
//                         console.log(err);
//                         return;
//                     } else {
//                         if (row === undefined) {
//                             let insertData = db.prepare('INSERT INTO islandInfo VALUES(?,?,?,?,?,?,?,?,?,?)');
//                             insertData.run(userID, userName, null, null, null, null, null, null, null, code);
//                             insertData.finalize();
//                             db.close();
//                             return msg.channel.send(`${emoji.checkMark} **Your Creator Code Has Been Set!**\nCreator Code: **${code}**`);
//                         } else {
//                             db.run('UPDATE islandInfo SET friendCode = ? WHERE userID = ?', [code, userID]);
//                             return msg.channel.send(`${emoji.checkMark} **Your Creator Code Has Been Updated**\nCreator Code: **${code}**`);
//                         }

//                     }

//                 });
//                 break;
//             }
//             default: {
//                 let member;
//                 if (args.length === 0) {
//                     member = msg.member.user;
//                     userID = msg.member.id;
//                 } else {
//                     member = msg.mentions.users.first();
//                     userID = msg.mentions.users.first().id;
//                     console.log(userID);
//                     if (!member) {
//                         return msg.channel.send(`${emoji.redX} **Unknown Member**\nCan not find a user with that name`);
//                     }
//                 }


//                 // Return user's island information
//                 const message = [];
//                 db.get(query, [userID], (err, row) => {
//                     if (row != undefined) {
//                         if (row.friendCode) {
//                             message.push(`Friend Code: **${row.friendCode}**`);
//                         }
//                         if (row.profileName) {
//                             message.push(`Switch Profile Name: **${row.profileName}**`);
//                         }
//                         if (row.characterName) {
//                             message.push(`Character Name: **${row.characterName}**`);
//                         }
//                         if (row.islandName) {
//                             message.push(`Island Name: **${row.islandName}**`);
//                         }
//                         if (row.fruit) {
//                             message.push(`Fruit: **${row.fruit}**`);
//                         }
//                         if (row.hemisphere) {
//                             message.push(`Hemisphere: **${row.hemisphere}**`);
//                         }
//                         if (row.dreamAddress) {
//                             message.push(`Dream Address: **${row.dreamAddress}**`);
//                         }
//                         if (row.creatorCode) {
//                             message.push(`Creator Code: **${row.creatorCode}**`);
//                         }



//                     } else {

//                         if (member.id === msg.author.id) {
//                             return msg.channel.send(`${emoji.redX} No Island Information Found!`);
//                         }
//                         return msg.channel.send(`${emoji.redX} **No Island Information Found!\n${member.username} has not provided any information.`);
//                     }


//                     const embed = new Discord.MessageEmbed()
//                         .setAuthor(`${member.username}'s Island`, member.displayAvatarURL({ dynamic: true }))
//                         .setColor('#0ba47d')
//                         .setDescription(`${message.join('\n')}`);

//                     return msg.channel.send(embed);
//                 });
//             }
//         }
//     }
// };


