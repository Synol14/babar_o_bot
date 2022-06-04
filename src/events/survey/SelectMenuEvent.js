const { SelectMenuInteraction, MessageEmbed, Message } = require("discord.js");
const { getEmbed } = require("../../util/messageUtils");

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
                    if (selectMenu.member.user.id != obj.memberId) 
                        return selectMenu.reply({embeds: [getEmbed("You didn't have created this survey !", process.env.RED)], ephemeral: true});
                    
                    const channel = await selectMenu.guild.channels.fetch(obj.channelId);
                    let embed = new MessageEmbed()

                    // try disable suvery buttons
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

                    // calcul
                    let total = 0;
                    for (const data of obj.data) total += data;
                    let desciption = '';
                    for (const choice of obj.choices) {
                        const index = obj.choices.indexOf(choice)
                        result = total == 0 ? 0 : obj.data[index] / total * 100;
                        desciption += `*${choice} :* \`${Math.round(result)}%\` (${obj.data[index]}) \n`
                    }

                    // Set embed
                    embed.setTitle(`__Results :__ ${obj.title}`)
                        .setColor('#00a13b')
                        .setDescription(desciption)

                    // clear db
                    selectMenu.client.database.surveys.delete(obj.id);

                    // send results
                    selectMenu.reply({ embeds: [embed] })
                });
    }
}