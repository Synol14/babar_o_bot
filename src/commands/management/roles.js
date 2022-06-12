const { Client, CommandInteraction, CommandInteractionOptionResolver, MessageEmbed, ReactionEmoji, Emoji, GuildEmoji } = require("discord.js");
const { getBotColor } = require("../../util/messageUtils");

module.exports = {
    name: 'roles',
    type: 1,
    description: 'Create a message role management',
    defer: false,
    ephemeral: true,
    default_permission: false,
    options: [
        /*{
            name: "type",
            description: "Type of interaction answer",
            type: 3,
            choices: [
                {
                    name: "Emoji Reaction",
                    value: "reaction"
                },
                {
                    name: "Button",
                    value: "button"
                },
                {
                    name: "Select Menu",
                    value: "select_menu"
                }
            ],
            require: true
        }, 
        {
            name: "message_id",
            description: "Give id of your message (else I create it for you)",
            type: 3,
            required: false
        }, */
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function (client, interaction, options) {
        const embed = new MessageEmbed()
            .setTitle("    -- Choix des rôles --")
            .setURL("https://github.com/Synol14/babar_o_bot")
            .setDescription("Il suffit simplement d'ajouter une réaction correspondant à vos rôles.")
            .addField('Obligatoire :', `🥇 - 1ère année\n🥈 - 2ème année\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Peip')} - Peip `)
            .addField('Pour les premières années :', ':regional_indicator_a: - TD A\n:regional_indicator_b: - TD B\n:regional_indicator_c: - TD C\n:regional_indicator_d: - TD D')
            .addField('Autres rôles :', `🍺 - Fétard\n🏨 - Espacil\n:man_detective: - Externe`)
            .addField('Jeux :', "Il y a un émoji par jeu. (d'autres pourront arriver)")
            .setThumbnail("https://cdn.discordapp.com/attachments/747195335239008307/761304615710752768/logo-GEII.png"/*interaction.guild.iconURL()*/)
            .setColor(getBotColor(client, interaction.guildId))
            .setImage("https://images-ext-2.discordapp.net/external/aRxrlHKNog3J6POqtXEoT_mv77uDMjZLIpNX2oglFgA/https/imgur.com/sRly2m6.png")

        interaction.reply({ content: 'Voilà !', ephemeral: true });

        try {
            interaction.channel.send({ embeds: [embed] }).then(message => {
                message?.react('🥇');
                message?.react('🥈');
                message?.react('🇦');
                message?.react('🇧');
                message?.react('🇨');
                message?.react('🇩');
                message?.react(message.guild.emojis.cache.find(emoji => emoji.name === 'Peip'));
                message?.react('🍺');
                message?.react('🏨');
                message?.react('🕵️‍♂️');
            });
        } catch (error) {}
    }
}