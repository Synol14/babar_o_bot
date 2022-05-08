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
        const embed = new MessageEmbed()
            .setTitle('Close a survey')
            .setDescription("Once a survey is closed, you receive the results but you cannot go back.")
            .setColor(getBotColor(client, interaction.guildId));

        const selector = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Please select a survey');

        const db = client.database.surveys.all();
        for (const obj of Object.values(db)) {
            console.log(obj);
            const emoji = obj.type == 'yes-no' ? '✔❌' : '📩';
            selector.addOptions([
                {
                    label: `${emoji} ${obj.title}`,
                    value: `${obj.id}`
                }
            ])
        }
        const row = new MessageActionRow().addComponents(selector);

        interaction.editReply({
            embeds: [embed], 
            components: [row]
        })
    }
}