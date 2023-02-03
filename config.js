require('dotenv-flow').config();

module.exports = {
    TOKEN: process.env.TOKEN,
    nookLink: process.env.NOOKLINK,
    clientId: process.env.clientId,
    guildId: process.env.guildId,

    //UserDB 
    userDBDefaults: {
        friendCode: '',
        island: {
            islandName: '',
            fruit: '',
            characterName: '',
            hemisphere: '',
            profileName: '',
            dreamAddress: '',
            creatorCode: ''
        }
    }
};