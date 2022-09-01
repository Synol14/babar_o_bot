const fs = require('fs')

fs.appendFile('.env', 
`BOT_TOKEN=${process.env.BOT_TOKEN}
APPLICATION_ID=${process.env.APPLICATION_ID}
ASSETS_GUILD_ID=${process.env.ASSETS_GUILD_ID}`,
function (err) {
    if (err) throw err;
    console.log('.env file created !');
});