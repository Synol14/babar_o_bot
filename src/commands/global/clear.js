const { Client, CommandInteractionOptionResolver, CommandInteraction } = require("discord.js")

module.exports = {
    name: 'clear',
    description: 'Delete a specific number of messages',
    defer: false,
    ephemeral: true,
    options: [
        {
            type: 4,
            name: "number",
            value: "name",
            description: "Mumber of messages",
            required: true
        },
        {
            type: 5,
            name: "nopin",
            value: "nopin",
            description: "No delete pinned messages"
        },
        {
            type: 9,
            name: "only",
            value: "only",
            description: "Delete only messages from user or role"
        },
        {
            type: 9,
            name: "keep_only",
            value: "keep_only",
            description: "Keep only messages from user or role"
        },
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        interaction.reply('Clear !');
    }
}