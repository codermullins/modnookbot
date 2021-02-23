const sqlite = require('sqlite3').verbose();

module.exports = client => {
    console.info(`Logged in as ${client.user.tag}!`);
    let islandDB = new sqlite.Database('./islandDb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
    // let islandTable = new sqlite.Database('./islandDb.db', sqlite.OPEN_READWRITE);
    islandDB.run(`CREATE TABLE IF NOT EXISTS islandInfo(userID INTEGER NOT NULL, userName TEXT, friendCode TEXT, islandName TEXT, fruit TEXT, 
        charName TEXT, hemisphere TEXT, profileName TEXT, dreamAddress TEXT, creatorCode TEXT)`);

};