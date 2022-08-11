const { CommandInteraction, CommandInteractionOptionResolver, GuildVoiceChannelResolvable, MessageEmbed, TextInputComponent, MessageActionRow, SelectMenuInteraction, MessageSelectMenu, MessageButton } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");
const { ephemeralMessageReply } = require("../../util/messageUtils");
const { messages } = require("../role_reaction/util/messageSelectMenu");

module.exports = {
    name: 'lobby_room',
    type: 1,
    description: 'Set lobbies for private rooms',
    defer: false,
    ephemeral: false,
    default_permission: false,
    options: [
        {
            name: "add",
            description: "Add a new lobby",
            type: 1,
            options: []
        },
        {
            name: "remove",
            description: "Remove a lobby",
            type: 1,
            options: [
                {
                    name: "voice_channel_id",
                    description: "Give id of your lobby",
                    type: 3,
                    required: true
                }
            ]
        }
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {DiscordBot} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     */
    run: async function (client, interaction, options) {
        // Get options
        const subCmd = options.getSubcommand();

        // Apply
        if (subCmd === "add") add(client, interaction);
        else if (subCmd === "remove") remove(client, interaction, options);
    }
}

/**
 * Add sub command
 * @param {DiscordBot} client Bot Client
 * @param {CommandInteraction} interaction Command Integration
 */
async function add(client, interaction) {
    messages.lobby(interaction);
}

/**
 * Remove sub command
 * @param {DiscordBot} client Bot Client
 * @param {CommandInteraction} interaction Command Integration
 * @param {CommandInteractionOptionResolver} options Application Command Options
 */
async function remove(client, interaction, options) {
    const voice_channel_id = options.getString("voice_channel_id");
    if (client.database.privateRooms.get('lobbies').includes(voice_channel_id)) {
        await client.database.privateRooms.remove('lobbies', voice_channel_id);
        ephemeralMessageReply(interaction, '\nDone !\n');
    }
    else ephemeralMessageReply(interaction, '\nThere is not lobby with this id !\n');
}