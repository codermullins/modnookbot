require('dotenv-flow').config();

module.exports = {
    TOKEN: process.env.TOKEN,
    prefix: process.env.PREFIX,
    nookLink: process.env.NOOKLINK,
    ffLink: process.env.FFLINK,

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