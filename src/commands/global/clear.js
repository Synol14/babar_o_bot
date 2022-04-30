const { Client, CommandInteractionOptionResolver, CommandInteraction, Permissions } = require("discord.js");
const { NO_USER_PERM } = require("../../structures/Embeds");
const { getBotColor, ephemeralEmbedReply, getEmbed } = require("../../util/messageUtils");

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
        /// Get all Options
        const number = options.getInteger('number', true);
        const nopin = options.getBoolean('nopin', false);
        const only = options.getMentionable('only', false);
        const keep_only = options.getMentionable('keep_only', false);

        /// Check Prohibition
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return ephemeralEmbedReply(interaction, NO_USER_PERM);
        if (number < 1 || number > 100) return ephemeralEmbedReply(interaction, getEmbed("You must indicate a number from 1 to 10 !", process.env.RED));
        if (only && keep_only) return ephemeralEmbedReply(interaction, getEmbed("Only and KeepOnly parameters is not compatible !", process.env.RED));

        interaction.channel.messages.fetch({ limit: number })
                .then(fetched => {
                    let messages;
                    /// Sort Nopin
                    if (nopin) messages = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
                    else messages = fetched;
                    /// Sort Only
                    if (only) {
                        if (only.toString().search(/[&]/g) == 2) messages = messages.filter(msg => msg.member.roles.cache.some(role => role.id === only.id));
                        else messages = messages.filter(msg => msg.author.id == only.id);
                    }
                    /// Sort Keep_Only
                    else if (keep_only) {
                        if (keep_only.toString().search(/[&]/g) == 2) messages = messages.filter(msg => msg.member.roles.cache.some(role => role.id === keep_only.id));
                        else messages = messages.filter(msg => msg.author.id != keep_only.id);
                    }

                    interaction.channel.bulkDelete(messages, true)
                        .then(msg => ephemeralEmbedReply(interaction, getEmbed(`${msg.size} messages has been deleted !`, getBotColor(client, interaction.guildId))))
                        .catch(err => getErrorLog(interaction, err));
                })
                .catch(err => console.log(getErrorLog(interaction, err)));

        getBotColor(client, interaction.guildId);
    }
}

function getErrorLog(interaction, err) {
    return `[ERROR]  [App_Cmd - ${interaction.id}]  An error occurred while executing the \'${interaction.commandName}\' command -- ${err}`;
}