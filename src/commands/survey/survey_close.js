const { Client, CommandInteraction, CommandInteractionOptionResolver, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const { getBotColor } = require("../../util/messageUtils")

module.exports = {
    name: 'survey_close',
    type: 1,
    description: 'Close a surveys',
    defer: true,
    ephemeral: true,
    default_permission: true,
    options: [],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        const db = client.database.surveys.all();

        const embed = new MessageEmbed()
            .setTitle('Close a survey')
            .setDescription(Object.values(db).length != 0 ? "Once a survey is closed, you receive the results but you cannot go back." : "There is no survey.")
            .setColor(getBotColor(client, interaction.guildId));

        if (Object.values(db).length != 0) {
            const selector = new MessageSelectMenu()
                .setCustomId('survey-close')
                .setPlaceholder('Please select a survey');

            for (const obj of Object.values(db)) {
                const emoji = obj.type == 'yes-no' ? '🎭' : '📩';
                selector.addOptions([{
                    label: `${emoji} ${obj.title}`,
                    value: `${obj.id}`,
                }])
            }
            const row = new MessageActionRow().addComponents(selector);
            var message = {
                embeds: [embed], 
                components: [row]
            }
        } else var message = { embeds: [embed] }

        interaction.editReply(message);
    }
}