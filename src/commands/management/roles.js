const { CommandInteraction, CommandInteractionOptionResolver, MessageEmbed } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");
const { getBotColor } = require("../../util/messageUtils");

module.exports = {
    name: 'roles',
    type: 1,
    description: 'Create a message role management',
    defer: false,
    ephemeral: false,
    default_permission: false,
    options: [],
    /**
     * Run Method for Slash Command Interaction
     * @param {DiscordBot} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function (client, interaction, options) {

        const embed = new MessageEmbed()
            .setTitle("    -- Choix des rôles --")
            .setURL("https://github.com/Synol14/babar_o_bot")
            .setDescription("Il suffit simplement d'ajouter une réaction correspondant à vos rôles.")
            .addField('Obligatoire :', `🥇 - 1ère année\n🥈 - 2ème année\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Peip')} - Peip `)
            .addField('Pour les premières années :', `:regional_indicator_a: - TD A\n:regional_indicator_b: - TD B\n:regional_indicator_c: - TD C\n:regional_indicator_d: - TD D`)
            .addField('Pour les deuxièmes années :', `${interaction.guild.emojis.cache.find(emoji => emoji.name === 'ESE')} - ESE\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'AII')} - AII\n⚡ - EME\n👨‍🏭 - Alternant`)
            .addField('Autres rôles :', `🍺 - Fétard\n${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Sportif')} - Sportif\n🎵 - Musicien\n🏨 - Espacil\n🕵️‍♂️ - Externe`)
            .addField('Jeux :', "Il y a un émoji par jeu. (d'autres pourront arriver)")
            .setThumbnail("https://cdn.discordapp.com/attachments/747195335239008307/761304615710752768/logo-GEII.png"/*interaction.guild.iconURL()*/)
            .setColor(getBotColor(client, interaction.guildId))
            .setImage("https://images-ext-2.discordapp.net/external/aRxrlHKNog3J6POqtXEoT_mv77uDMjZLIpNX2oglFgA/https/imgur.com/sRly2m6.png")

        interaction.deferReply();

        try {
            interaction.channel.send({ embeds: [embed] }).then(message => {

                const Peip_emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'Peip');
                const ESE_emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'ESE');
                const AII_emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'AII');
                const Sportif_emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'Sportif');

                message?.react('🥇');
                message?.react('🥈');
                message?.react(Peip_emoji);
                message?.react('🇦');
                message?.react('🇧');
                message?.react('🇨');
                message?.react('🇩');
                message?.react(ESE_emoji);
                message?.react(AII_emoji);
                message?.react('⚡');
                message?.react('👨‍🏭');
                message?.react('🍺');
                message?.react(Sportif_emoji);
                message?.react('🎵');
                message?.react('🏨');
                message?.react('🕵️‍♂️');


                client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                    {
                        emoji: '🥇',
                        role: message.guild.roles.cache.find(role => role.name === '🥇 GEII 1ère année').id,     //'1000405693754527814', //'883373013934932019',
                        no_roles: ['🥈', `${Peip_emoji.animated ? 'a' : ''}<:${Peip_emoji.identifier}>`]
                    },
                    {
                        emoji: '🥈',
                        role: message.guild.roles.cache.find(role => role.name === '🥈 GEII 2ème année').id,     //'1000405730052018327', //'883373406714753094',
                        no_roles: ['🥇', `${Peip_emoji.animated ? 'a' : ''}<:${Peip_emoji.identifier}>`]
                    },
                    {
                        emoji: `${Peip_emoji.animated ? 'a' : ''}<:${Peip_emoji.identifier}>`,
                        role: message.guild.roles.cache.find(role => role.name === '⚙ Peip').id,                //'1000405766936744087', //'1000403437990715463',
                        no_roles: ['🥇', '🥈']
                    },
                    {
                        emoji: '🇦',
                        role: message.guild.roles.cache.find(role => role.name === 'TD A').id,                   //'1000405789032317108', //'743825453327974430',
                        no_roles: ['🇧', '🇨', '🇩']
                    },
                    {
                        emoji: '🇧',
                        role: message.guild.roles.cache.find(role => role.name === 'TD B').id,                   //'1000405832141381742', //'743825553081237514',
                        no_roles: ['🇦', '🇨', '🇩']
                    },
                    {
                        emoji: '🇨',
                        role: message.guild.roles.cache.find(role => role.name === 'TD C').id,                   //'1000405854488645702', //'743825628888957038',
                        no_roles: ['🇦', '🇧', '🇩']
                    },
                    {
                        emoji: '🇩',
                        role: message.guild.roles.cache.find(role => role.name === 'TD D').id,                   //'1000405880774328330', //'743825714737840188',
                        no_roles: ['🇦', '🇧', '🇨']
                    },
                    {
                        emoji: `${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`,
                        role: message.guild.roles.cache.find(role => role.name === '💻 ESE').id,                 //'1000405899438981141', //'999444380190515260',
                        no_roles: [`${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`, '⚡']
                    },
                    {
                        emoji: `${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`,
                        role: message.guild.roles.cache.find(role => role.name === '🏭 AII').id,                  //'1000405918833463326', //'999444259516203121',
                        no_roles: [`${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`, '⚡']
                    },
                    {
                        emoji: '⚡',
                        role: message.guild.roles.cache.find(role => role.name === '⚡ EME').id,                 //'1000405949405736963', //'743825752289443841',
                        no_roles: [`${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`, `${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`]
                    },
                    {
                        emoji: '👨‍🏭',
                        role: message.guild.roles.cache.find(role => role.name === '💼 Alternants').id,          //'1000405991759810580', //'743825922628780102',
                        no_roles: []
                    },
                    {
                        emoji: '🍺',
                        role: message.guild.roles.cache.find(role => role.name === '🥳 Fétards').id,             //'1000406057333555291', //'746057510816841738',
                        no_roles: []
                    },
                    {
                        emoji: `${Sportif_emoji.animated ? 'a' : ''}<:${Sportif_emoji.identifier}>`,
                        role: message.guild.roles.cache.find(role => role.name === '⚽🏀 Sportif').id,           //'1000406116041236532', //'1000404858148491365',
                        no_roles: []
                    },
                    {
                        emoji: '🎵',
                        role: message.guild.roles.cache.find(role => role.name === '🎵 Musicien').id,            //'1000406156335906846', //'1000405260877176853',
                        no_roles: []
                    },
                    {
                        emoji: '🏨',
                        role: message.guild.roles.cache.find(role => role.name === '🏨 Espacil').id,             //'1000406184622301324', //'779044237769310250',
                        no_roles: []
                    },
                    {
                        emoji: '🕵️‍♂️',
                        role: message.guild.roles.cache.find(role => role.name === '🕵️ Externe').id,             //'1000406225634205696', //'884097241999102003',
                        no_roles: []
                    }
                ]);
            });
        } catch (error) { }

        interaction.deleteReply();
    }
}