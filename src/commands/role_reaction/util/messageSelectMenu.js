const { MessageSelectMenu, MessageActionRow, MessageEmbed, Guild } = require("discord.js")
const { getBotColor } = require("../../../util/messageUtils")

module.exports.messages = {
    lobby: async (interaction) => {
        let options = await getOptions(interaction.guild, (channel, selectMenuOptions) => {
            if (channel.isVoice()) {
                selectMenuOptions.push({
                    label: channel.name,
                    value: channel.id,
                    description: channel.parent.name,
                    emoji: '🔊'
                })
            }
        })
        /*let selectMenuOptions = [
            {
                label: 'Create one for me ...',
                value: 'default',
                description: '',
                emoji: '😉'
            }
        ]
    
        const channels = interaction.guild.channels.cache.values()
        for (const channel of channels) {
            if (channel.isVoice()) {
                selectMenuOptions.push({
                    label: channel.name,
                    value: channel.id,
                    description: channel.parent.name,
                    emoji: '🔊'
                })
            }
        }*/
        
        interaction.reply({
            ephemeral: true,
            embeds: [
                new MessageEmbed()
                .setTitle('Private Room Lobby')
                .setDescription('Please select a Voice Channel for set a Lobby\n')
                .setColor(getBotColor(interaction.client, interaction.guildId))
            ],
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('private-room-lobby')
                        .setOptions(options)
                )
            ]
        })
    },

    interface: async (interaction) => {
        let options = await getOptions(interaction.guild, (channel, selectMenuOptions) => {
            if (channel.isText()) {
                selectMenuOptions.push({
                    label: channel.name,
                    value: channel.id,
                    description: channel.topic,
                    emoji: '📃'
                })
            }
        })
        
        interaction.reply({
            ephemeral: true,
            embeds: [
                new MessageEmbed()
                    .setTitle('Private Room Interface')
                    .setDescription('Please select a Text Channel for send the Private Room Interface\n\nYou can set it later with `/pr_interface` command.')
                    .setColor(getBotColor(interaction.client, interaction.guildId))
            ],
            components: [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId('private-room-interface')
                        .setOptions(options)
                )
            ]
        })
    }
}

/**
 * 
 * @param {Guild} guild 
 * @param {Function} callback 
 */
async function getOptions(guild, callback) {
    let selectMenuOptions = [
        {
            label: 'Create one for me ...',
            value: 'default',
            description: '',
            emoji: '😉'
        }
    ]

    const channels = guild.channels.cache.values()
    for (const channel of channels) {
        await callback(channel, selectMenuOptions);
    }

    return selectMenuOptions;
}
