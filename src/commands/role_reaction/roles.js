const { CommandInteraction, CommandInteractionOptionResolver, MessageEmbed } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");

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

        const redA_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'red_regional_indicator_a');
        const redB_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'red_regional_indicator_b');
        const redC_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'red_regional_indicator_c');
        const redD_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'red_regional_indicator_d');
        const Peip_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'Peip');
        const ESE_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'ESE');
        const AII_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'AII');
        const Sportif_emoji = interaction.guild.emojis.cache.find(emoji => emoji.name === 'Sportif');

        const emptyLineLink = 'https://cdn.discordapp.com/attachments/1014156355348729856/1014938711248601088/emptyLine.png'

        const embed1 = new MessageEmbed()
            .setTitle("    -- Choix des rôles --")
            .setDescription("Il suffit simplement d'ajouter une réaction correspondant à vos rôles pour accéder à vos salons.")
            .setColor('WHITE')
            .setURL("https://github.com/Synol14/babar_o_bot")
            .setThumbnail("https://media.discordapp.net/attachments/999444843614961716/1010566931159470141/logo-GEII.png"/*interaction.guild.iconURL()*/)
            .setImage(emptyLineLink)

        const embed2 = new MessageEmbed()
            .setTitle('Obligatoire :')
            .setDescription(`🥇 - 1ère année\n🥈 - 2ème année\n🥉 - 3ème année\n${Peip_emoji} - Peip `)
            .setColor('WHITE')
            .setImage(emptyLineLink)

        const embed3 = new MessageEmbed()
            .setTitle('Pour les premières années :')
            .setDescription(`:regional_indicator_a: - TD A\n:regional_indicator_b: - TD B\n:regional_indicator_c: - TD C\n:regional_indicator_d: - TD D`)
            .setColor('WHITE')
            .setImage(emptyLineLink)

        const embed4 = new MessageEmbed()
            .setTitle('Pour les deuxièmes années (S3) :')
            .setDescription(`${redA_emoji} - TD A\n${redB_emoji} - TD B\n${redC_emoji} - TD C\n${redD_emoji} - TD D\n-------\n1️⃣ - Init 1\n2️⃣ - Init 2\n3️⃣ - Init 3\n4️⃣ - Init 4`)
            .setColor('WHITE')
            .setImage(emptyLineLink)

        const embed5 = new MessageEmbed()
            .setTitle('Pour les deuxièmes et troisièmes années :')
            .setDescription(`${ESE_emoji} - ESE\n${AII_emoji} - AII\n⚡ - EME\n👨‍🏭 - Alternant`)
            .setColor('WHITE')
            .setImage(emptyLineLink)
        
        const embed6 = new MessageEmbed()
            .setTitle('Autres rôles :')
            .setDescription(`🍺 - Fétard\n${Sportif_emoji} - Sportif\n🎵 - Musicien\n🏨 - Espacil\n🕵️‍♂️ - Externe`)
            .setColor('WHITE')
            .setImage(emptyLineLink)
        
        const embed7 = new MessageEmbed()
            .setTitle('Jeux :')
            .setDescription("Il y a un émoji par jeu. (d'autres pourront arriver)")
            .setColor('WHITE')
            .setImage("https://media.discordapp.net/attachments/999444843614961716/1010566931650187335/sRly2m6.png")

        interaction.deferReply();

        try {
            const webhooks = await interaction.guild.fetchWebhooks();
		    let webhook = webhooks.find(wh => wh.name === `DoNotDeleteMe - ${interaction.guild.name}`);

            if (webhook === undefined) interaction.editReply(`Please create a new webhook called ' DoNotDeleteMe - ${interaction.guild.name} ' ...`)
            else {
                await webhook.edit({channel: interaction.channelId});
                /* Presentation et Obligatoire */
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed1, embed2]
                })
                .then(message => {
                    message?.react('🥇');
                    message?.react('🥈');
                    message?.react('🥉');
                    message?.react(Peip_emoji);

                    const Peip_id = `${Peip_emoji.animated ? 'a' : ''}<:${Peip_emoji.identifier}>`;

                    client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                        {
                            emoji: '🥇',
                            role: message.guild.roles.cache.find(role => role.name === '🥇 GEII 1ère année').id,
                            no_roles: ['🥈', '🥉']
                        },
                        {
                            emoji: '🥈',
                            role: message.guild.roles.cache.find(role => role.name === '🥈 GEII 2ème année').id,
                            no_roles: ['🥇', '🥉']
                        },
                        {
                            emoji: '🥉',
                            role: message.guild.roles.cache.find(role => role.name === '🥉 GEII 3ème année').id,
                            no_roles: ['🥇', '🥈']
                        },
                        {
                            emoji: Peip_id,
                            role: message.guild.roles.cache.find(role => role.name === '⚙ Peip').id,
                            no_roles: []
                        },
                    ])
                })

                /* 1ere annees */
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed3]
                })
                .then(message => {
                    message?.react('🇦');
                    message?.react('🇧');
                    message?.react('🇨');
                    message?.react('🇩');

                    client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                        {
                            emoji: '🇦',
                            role: message.guild.roles.cache.find(role => role.name === 'GEII1 - TD A').id,
                            no_roles: ['🇧', '🇨', '🇩']
                        },
                        {
                            emoji: '🇧',
                            role: message.guild.roles.cache.find(role => role.name === 'GEII1 - TD B').id,
                            no_roles: ['🇦', '🇨', '🇩']
                        },
                        {
                            emoji: '🇨',
                            role: message.guild.roles.cache.find(role => role.name === 'GEII1 - TD C').id,
                            no_roles: ['🇦', '🇧', '🇩']
                        },
                        {
                            emoji: '🇩',
                            role: message.guild.roles.cache.find(role => role.name === 'GEII1 - TD D').id,
                            no_roles: ['🇦', '🇧', '🇨']
                        },
                    ])
                })

                /* 2eme annees (S3)*/
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed4]
                })
                .then(message => {
                    message?.react(redA_emoji);
                    message?.react(redB_emoji);
                    message?.react(redC_emoji);
                    message?.react(redD_emoji);
                    message?.react('1️⃣');
                    message?.react('2️⃣');
                    message?.react('3️⃣');
                    message?.react('4️⃣');

                    const redA_id = `${redA_emoji.animated ? 'a' : ''}<:${redA_emoji.identifier}>`;
                    const redB_id = `${redB_emoji.animated ? 'a' : ''}<:${redB_emoji.identifier}>`;
                    const redC_id = `${redC_emoji.animated ? 'a' : ''}<:${redC_emoji.identifier}>`;
                    const redD_id = `${redD_emoji.animated ? 'a' : ''}<:${redD_emoji.identifier}>`;

                    client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                        {
                            emoji: redA_id,
                            role: message.guild.roles.cache.find(role => role.name === 'GEII2 - TD A').id,
                            no_roles: [redB_id, redC_id, redD_id]
                        },
                        {
                            emoji: redB_id,
                            role: message.guild.roles.cache.find(role => role.name === 'GEII2 - TD B').id,
                            no_roles: [redA_id, redC_id, redD_id]
                        },
                        {
                            emoji: redC_id,
                            role: message.guild.roles.cache.find(role => role.name === 'GEII2 - TD C').id,
                            no_roles: [redA_id, redB_id, redD_id]
                        },
                        {
                            emoji: redD_id,
                            role: message.guild.roles.cache.find(role => role.name === 'GEII2 - TD D').id, 
                            no_roles: [redA_id, redB_id, redC_id]
                        },
                        {
                            emoji: '1️⃣',
                            role: message.guild.roles.cache.find(role => role.name === 'Init 1').id,
                            no_roles: ['2️⃣', '3️⃣', '4️⃣']
                        },
                        {
                            emoji: '2️⃣',
                            role: message.guild.roles.cache.find(role => role.name === 'Init 2').id,
                            no_roles: ['1️⃣', '3️⃣', '4️⃣']
                        },
                        {
                            emoji: '3️⃣',
                            role: message.guild.roles.cache.find(role => role.name === 'Init 3').id,
                            no_roles: ['1️⃣', '2️⃣', '4️⃣']
                        },
                        {
                            emoji: '4️⃣',
                            role: message.guild.roles.cache.find(role => role.name === 'Init 4').id, 
                            no_roles: ['1️⃣', '2️⃣', '3️⃣']
                        },
                    ])
                })

                /* 2eme et 3eme annees */
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed5]
                })
                .then(message => {
                    message?.react(ESE_emoji);
                    message?.react(AII_emoji);
                    message?.react('⚡');
                    message?.react('👨‍🏭');

                    const ESE_id = `${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`;
                    const AII_id = `${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`;

                    client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                        {
                            emoji: `${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`,
                            role: message.guild.roles.cache.find(role => role.name === '💻 ESE').id,
                            no_roles: [`${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`, '⚡']
                        },
                        {
                            emoji: `${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`,
                            role: message.guild.roles.cache.find(role => role.name === '🏭 AII').id,
                            no_roles: [`${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`, '⚡']
                        },
                        {
                            emoji: '⚡',
                            role: message.guild.roles.cache.find(role => role.name === '⚡ EME').id, 
                            no_roles: [`${ESE_emoji.animated ? 'a' : ''}<:${ESE_emoji.identifier}>`, `${AII_emoji.animated ? 'a' : ''}<:${AII_emoji.identifier}>`]
                        },
                        {
                            emoji: '👨‍🏭',
                            role: message.guild.roles.cache.find(role => role.name === '💼 Alternants').id,
                            no_roles: []
                        },
                    ])
                })

                /* Autres */
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed6]
                })
                .then(message => {
                    message?.react('🍺');
                    message?.react(Sportif_emoji);
                    message?.react('🎵');
                    message?.react('🏨');
                    message?.react('🕵️‍♂️');

                    const sportif_id = `${Sportif_emoji.animated ? 'a' : ''}<:${Sportif_emoji.identifier}>`;

                    client.database.reactionRole.set(`${interaction.guildId}.${message.id}`, [
                        {
                            emoji: '🍺',
                            role: message.guild.roles.cache.find(role => role.name === '🥳 Fétards').id,
                            no_roles: []
                        },
                        {
                            emoji: `${Sportif_emoji.animated ? 'a' : ''}<:${Sportif_emoji.identifier}>`,
                            role: message.guild.roles.cache.find(role => role.name === '⚽🏀 Sportif').id,
                            no_roles: []
                        },
                        {
                            emoji: '🎵',
                            role: message.guild.roles.cache.find(role => role.name === '🎵 Musicien').id,
                            no_roles: []
                        },
                        {
                            emoji: '🏨',
                            role: message.guild.roles.cache.find(role => role.name === '🏨 Espacil').id,
                            no_roles: []
                        },
                        {
                            emoji: '🕵️‍♂️',
                            role: message.guild.roles.cache.find(role => role.name === '🕵️ Externe').id,
                            no_roles: []
                        }
                    ])
                })

                /* Jeux */
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: [embed7]
                })

                interaction.deleteReply();
            }
        } catch (error) { console.log(error); }
    }
}