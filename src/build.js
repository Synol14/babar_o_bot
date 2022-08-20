const fs = require('fs')

fs.appendFile('.env', 
`BOT_TOKEN=${process.env.BOT_TOKEN}
APPLICATION_ID=${process.env.APPLICATION_ID}`,
function (err) {
    if (err) throw err;
    console.log('.env file created !');
});