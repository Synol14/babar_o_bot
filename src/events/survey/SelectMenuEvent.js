const { SelectMenuInteraction, MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Execute Event
     * @param {SelectMenuInteraction} selectMenu
     */
    async run(selectMenu) {
        if (!selectMenu.isSelectMenu() || !selectMenu.customId == 'survey-close') return;

        const db = selectMenu.client.database.surveys.all();
        if (Object.values(db).length != 0)
            Object.values(db)
                .filter(obj => obj.id == selectMenu.values[0])
                .forEach(async obj => {
                    selectMenu.client.logger.info(`Survey ${obj.title} will be closed !`)
                    const channel = await selectMenu.guild.channels.fetch(obj.channelId);
                    let embed = new MessageEmbed()
                    try {
                        /**
                         * @var msg 
                         * @type Message
                         */
                        const msg = await channel.messages.fetch(obj.messageId)
                        if (msg) {
                            const components = msg.components;
                            components.forEach(c => c.components.forEach(c => c.setDisabled(true)))
                            msg.edit({ components: components })
                            embed = msg.embeds[0];
                        }
                    } catch (error) {}

                    let total = 0;
                    for (const data of obj.data) total += data;
                    let desciption;
                    for (const choice of obj.choices) {
                        const index = obj.choices.indexOf(choice)
                        result = obj.data[index] / total * 100;
                        desciption += `*${choice} :* \`${result}%\` (${obj.data[index]}) \n`
                    }

                    embed.setTitle(`__Results :__ ${obj.title}`)
                        .setColor('#00a13b')
                        .setDescription(desciption)

                    selectMenu.client.database.surveys.delete(obj.id);

                    selectMenu.reply({ embeds: [embed] })
                });
    }
}