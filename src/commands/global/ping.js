const { Client, CommandInteractionOptionResolver, CommandInteraction } = require("discord.js")

module.exports = {
    name: 'ping',
    type: 1,
    description: 'Simple Ping Pong Command',
    defer: false,
    ephemeral: false,
    default_permission: false,
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        interaction.reply('Pong !');
    }
}