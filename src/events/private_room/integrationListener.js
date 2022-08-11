const { SelectMenuInteraction } = require("discord.js");
const { messages } = require("../../commands/role_reaction/util/messageSelectMenu");
const DiscordBot = require("../../structures/DiscordBot");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Execute Event
     * @param {SelectMenuInteraction} interaction
     */
    async run(interaction) {
        if (!interaction.isSelectMenu()) return;

        const client = interaction.client;
        if (interaction.customId == 'private-room-lobby') lobby(client, interaction);
        if (interaction.customId == 'private-room-interface') interface(client, interaction);
    }
}

/**
 * Lobby Select Menu
 * @param {DiscordBot} client
 * @param {SelectMenuInteraction} interaction
 */
async function lobby(client, interaction) {
    let value = interaction.values[0];

    if (value === 'default') {
        await interaction.guild
            .channels.create('PR Lobby', {
                reason: `[${client.user.tag}] Add Private Room Lobby`,
                type: 'GUILD_VOICE',
                parent: interaction.channel.parent,
                userLimit: 10,
            })
            .then(channel => value = channel.id);
    }

    if (!client.database.privateRooms.get('lobbies').includes(value)) {
        messages.interface(interaction);
        client.database.privateRooms.push('lobbies', value);
    }
    else interaction.reply({content: 'This channel is already a lobby', ephemeral: true})
}

/**
 * Interface Select Menu
 * @param {DiscordBot} client
 * @param {SelectMenuInteraction} interaction
 */
 async function lobby(client, interaction) {
    let value = interaction.values[0];

    if (value === 'default') {
        await interaction.guild
            .channels.create('⚙-pr-interface', {
                reason: `[${client.user.tag}] Create interface channel`,
                type: 'GUILD_TEXT',
                parent: interaction.channel.parent,
                topic: 'Set your Private Room here !'
            })
            .then(channel => value = channel.id);
    }

    /// Send Interface message
}