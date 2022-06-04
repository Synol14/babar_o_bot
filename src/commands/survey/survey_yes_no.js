const { Client, CommandInteractionOptionResolver, Interaction } = require("discord.js");
const SurveyMessage = require("../../structures/SurveyMessage");

module.exports = {
    name: 'survey_yes-no',
    type: 1,
    description: 'Create Yes or No surveys',
    defer: true,
    ephemeral: false,
    default_permission: true,
    options: [
        {
            name: "title",
            description: "Set your survey title",
            type: 3,
            required: true
        }, // title
        {
            name: "description",
            description: "Set your survey description",
            type: 3,
            required: false
        }, // description
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {Interaction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        /// Get all Options
        let title, description = null;

        if (interaction.isMessageContextMenu()) {
            var message = interaction.options.getMessage('message');
            title = message.content;
        } else {
            title = options.getString('title');
            description = options.getString('description', false);
        }

        /// Run
        new SurveyMessage(interaction, title)
            .setDescription(description)
            .setMember(interaction.isMessageContextMenu() ? interaction.member : interaction.member)
            .setType('yes-no')
            .setChoices([
                '✔ Yes',
                '❌ No'
            ])
            .build();
        }
}