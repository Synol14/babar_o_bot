const { MessageActionRow, MessageEmbed, Interaction, MessageButton, Message } = require("discord.js");
const { getBotColor } = require("../util/messageUtils");


class SurveyMessage {

    /**
     * @param {Interaction} interaction Application Command
     * @param {String} title Embed title
     */
    constructor(interaction, title) {
        this.interaction = interaction;
        this.title = title;
        this.description = null;
        this.choices = [];
        this.emijiChoices = [];
        this.id = `${Date.now()}-${interaction.id}`;
        this.isClosed = false;
        this.row = new MessageActionRow();
        this.embed = new MessageEmbed();
    }

    /**
     * @param {String} title Embed title
     */
    setTitle(title) {
        this.title = title.replace('\\n', '\n');
        return this;
    }

    /**
     * @param {String} description Embed description
     */
    setDescription(description) {
        this.description = description?.replace('\\n', '\n');
        return this;
    }

    /**
     * @param {String[]} choices 
     */
    setChoices(choices) {
        this.choices = [];
        this.emojiChoices = [];
        for (const choice of choices) this.addChoice(choice);
        return this;
    }

    /**
     * @param {String} choice 
     */
    addChoice(choice) {
        const emojis = choice.match(require('emoji-regex')());
        if (emojis) this.emojiChoices[choice] = emojis[0];
        this.choices.push(choice);
        this.AddButton(choice);
        return this;
    }

    build() {
        this.embed.setTitle(this.title)
            .setColor(getBotColor(this.interaction.client, this.interaction.guildId))
            .setTimestamp(Date.now())
            .setFooter({
                text: this.interaction.member.displayName,
                iconURL: this.interaction.member.displayAvatarURL()
            })
        if (this.description) this.embed.setDescription(description.concat('\n­'));

        const message = { 
            embeds: [this.embed], 
            components: [this.row]
        }

        if (this.interaction.deferred) this.interaction.editReply(message).then((message) => this.MessageSent(message, this));
        else this.interaction.reply(message).then((message) => this.MessageSent(message, this));
    }

    /**
     * @param {String} choice 
     */
    AddButton(choice) {
        const button = new MessageButton()
                .setCustomId(`${this.id}_${this.choices.indexOf(choice)}`)
                .setStyle('PRIMARY');
        if (this.emojiChoices[choice]) button.setEmoji( this.emojiChoices[choice] ).setLabel( choice.replace(this.emojiChoices[choice], '') );
        else button.setLabel(choice);
        this.row.addComponents(button);
    }

    /**
     * @param {Message} message 
     * @param {SurveyMessage} suveryMessage
     */
    MessageSent(message, suveryMessage) {
        const object = { messageId: message.id, choices: [], data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], members: [] }
        for (const choice of suveryMessage.choices) object.choices[suveryMessage.choices.indexOf(choice)] = choice;
        message.client.database?.surveys.set(suveryMessage.id, object);

        /// Create Button Listener
        const filter = i => new RegExp(`(${suveryMessage.id}_)[0-9]+`).test(i.customId);
        const collector = suveryMessage.interaction.channel.createMessageComponentCollector({ filter });
        collector.on('collect', async button => {
            const id = parseInt( button.customId.replace(`${suveryMessage.id}_`, '') );
            const dbObject = message.client.database.surveys.get(suveryMessage.id);
            if (!dbObject.members.find(i => i == button.member.user.username)) 
            {
                dbObject.data[id] != null ? dbObject.data[id]++ : dbObject.data[id] = 1;
                dbObject.members.push(button.member.user.username);
                message.client.database?.surveys.set(suveryMessage.id, dbObject);
                button.reply({content: `${button.member.user.username} voted !`, ephemeral: true});
            } 
            else button.reply({content: `Sorry, but you can't vote again !`, ephemeral: true});
        });
    }

}

module.exports = SurveyMessage;