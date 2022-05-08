const { Client, CommandInteractionOptionResolver, CommandInteraction } = require("discord.js");
const SurveyMessage = require("../../structures/SurveyMessage");

module.exports = {
    name: 'survey_custom',
    type: 1,
    description: 'Create customized quality surveys',
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
            name: "choice1",
            description: "Set choice 1",
            type: 3,
            required: true
        }, // choice1
        {
            name: "choice2",
            description: "Set choice 2",
            type: 3,
            required: true
        }, // choice2
        {
            name: "description",
            description: "Set your survey description",
            type: 3,
            required: false
        }, // description
        {
            name: "choice3",
            description: "Set choice 3",
            type: 3,
            required: false
        }, // choice3
        {
            name: "choice4",
            description: "Set choice 4",
            type: 3,
            required: false
        }, // choice4
        {
            name: "choice5",
            description: "Set choice 5",
            type: 3,
            required: false
        }, // choice5
        {
            name: "choice6",
            description: "Set choice 6",
            type: 3,
            required: false
        }, // choice6
        {
            name: "choice7",
            description: "Set choice 7",
            type: 3,
            required: false
        }, // choice7
        {
            name: "choice8",
            description: "Set choice 8",
            type: 3,
            required: false
        }, // choice8
        {
            name: "choice9",
            description: "Set choice 9",
            type: 3,
            required: false
        }, // choice9
        {
            name: "choice10",
            description: "Set choice 10",
            type: 3,
            required: false
        } // choice10
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        /// Get all Options
        const title = options.getString('title');
        const description = options.getString('description', false);
        let choices = [];
        for (let i = 1; i <= 10; i++) {
            const choice = options.getString(`choice${i}`, false);
            if (choice) choices.push(choice);
        }

        /// Run
        new SurveyMessage(interaction, title)
            .setDescription(description)
            .setChoices(choices)
            .build();
    }
}

 /*/// Get all Options
        const title = options.getString('title').replaceAll('\\n', '\n');
        const description = options.getString('description', false)?.replaceAll('\\n', '\n');
        var choices = [];
        let emojiChoices = [];

        for (let i = 1; i <= 10; i++) {
            const choice = options.getString(`choice${i}`, false);
            if (choice) {
                const emojis = choice.match(require('emoji-regex')());
                if (emojis) emojiChoices[choice] = emojis[0];
                choices.push(choice);
            }
        }

        /// Check Prohibition
        

        /// Run
        const row = new MessageActionRow();
        
        for (const choice of choices) {
            const button = new MessageButton()
                .setCustomId(`${choices.indexOf(choice)}`)
                .setStyle('PRIMARY');
            if (emojiChoices[choice]) button.setEmoji(emojiChoices[choice]).setLabel(choice.replace(emojiChoices[choice], ''));
            else button.setLabel(choice);
            row.addComponents(button);
        }

        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor(getBotColor(interaction.client, interaction.guildId))
            .setTimestamp(Date.now())
            .setFooter({
                text: interaction.member.displayName,
                iconURL: interaction.member.displayAvatarURL()
            })
        if (description) embed.setDescription(description.concat('\n­'));

        interaction.editReply({ 
            embeds: [embed], 
            components: [row]
        });*/