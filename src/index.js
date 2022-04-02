const { Intents } = require('discord.js');
const DiscordBot = require("./structures/DiscordBot");
const client = new DiscordBot({
    /// Set Intents
    intents: [
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: false,
    /// Set Presence
    presence: {
        status: 'online',
    }
});

client.build();

module.exports = client;


/*const { Client, Intents, Collection } = require("discord.js");
require('dotenv').config();

/// Create Bot Client
const client = new Client({

    /// Set Intents
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: false,
    /// Set Presence
    presence: {
        status: 'online',
    }
});

/// Add Collections
["commands"].forEach(collection => client[collection] = new Collection());

/// Setup Commands and Events
loadCommands(client, `${__dirname}/commands/`);
loadEvents(client, `${__dirname}/events/`);

/// Login to Discord API with TOKEN
client.login(process.env.BOT_TOKEN);*/