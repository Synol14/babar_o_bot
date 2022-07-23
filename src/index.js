const { Intents } = require('discord.js');
const DiscordBot = require("./structures/DiscordBot");
require('dotenv').config();
require('colors');

const client = new DiscordBot({
    /// Set Intents
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    allowedMentions: false,
    /// Set Presence
    presence: {
        status: 'online',
    }
});

client.build();

module.exports = client;