const { Client, CommandInteractionOptionResolver, CommandInteraction } = require("discord.js");

module.exports = {
    name: 'survey_yes-no',
    type: 3,
    defer: true,
    ephemeral: false,
    default_permission: true,
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        ///     /!\  do nothing because this command is also managed in slash command file
    }
}