const { Client, MessageEmbed, User, Channel, Interaction, CommandInteraction } = require("discord.js");

/**
 * Get an Embed with a Title and the Default Color
 * @param {String} string Embed Title
 * @return {MessageEmbed} Embed
 */
 module.exports.getEmbed = (string) => {
    return getEmbed(process.env.DEFAULT_COLOR, string);
}

/**
 * Get an Embed with a Title and a Color
 * @param {String} string Embed Title
 * @param {String} color Embed Color (Hex)
 * @return {MessageEmbed} Embed
 */
 module.exports.getEmbed = (string, color) => {
    return new MessageEmbed().setColor(color).setTitle(string);
}

/**
 * Get User Avatar Url
 * @param {User} user 
 */
 module.exports.getAvatarUrl = (user) => {
    if (user.avatar) return user.avatar;
    else return user.defaultAvatarURL;
}

/**
 * Send Message and delete it after default time
 * @param {Channel} channel channel where send message
 * @param {Object} message message to send
 */
module.exports.sendMessageForDelete = async (channel, message) => {
    channel.send(message).then(msg => setTimeout(() => msg.delete(), process.env.DEFAULT_TIME));
}

/**
 * Send Message and delete it after a time
 * @param {Channel} channel channel where send message
 * @param {Object} message message to send
 * @param {Integer} time deletion time (ms)
 */
module.exports.sendMessageForDelete = async (channel, message, time) => {
    channel.send(message).then(msg => setTimeout(() => msg.delete(), time));
}

/**
 * Reply to a Interaction with Ephemerel Option enabled
 * @param {Interaction} interaction Application Command Interaction
 * @param {Object} msg Object to reply
 */
module.exports.ephemeralReply = async (interaction, msg) => {
    if (typeof msg == MessageEmbed) await this.ephemeralEmbedReply(interaction, msg);
    else if (typeof msg == String) await this.ephemeralMessageReply(interaction, msg);
}

/**
 * Reply a message to a Interaction with Ephemerel Option enabled
 * @param {Interaction} interaction Application Command Interaction
 * @param {String} message Message to send
 */
module.exports.ephemeralMessageReply = async (interaction, message) => {
    if (interaction.replied || interaction.deferred) await interaction.editReply({ content: message, ephemeral: true});
    else await interaction.reply({ content: message, ephemeral: true});
}

/**
 * Reply a Embed to a Interaction with Ephemerel Option enabled
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {MessageEmbed} embed Embed to send
 */
 module.exports.ephemeralEmbedReply = async (interaction, embed) => {
    this.embedReply(interaction, embed, true);
}

/**
 * Reply a Embed to a Interaction
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {MessageEmbed} embed Embed to send
 */
 module.exports.embedReply = async (interaction, embed, ephemeral = false, willDelete = false, deleteTime = 10000) => {
    if (interaction.replied || interaction.deferred) await interaction.editReply({ embeds: [ embed.toJSON() ], ephemeral: interaction.ephemeral})
        .then(msg => { if (willDelete && !interaction.ephemeral) setTimeout(() => interaction.deleteReply(), deleteTime) });
    else await interaction.reply({ embeds: [ embed.toJSON() ], ephemeral: ephemeral})
        .then(msg => { if (willDelete && !interaction.ephemeral) setTimeout(() => interaction.deleteReply(), deleteTime) });
}

/**
 * Reply a Message to a Interaction
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {MessageEmbed} embed Embed to send
 */
 module.exports.messageReply = async (interaction, message, ephemeral = false, willDelete = false, deleteTime = 10000) => {
    if (interaction.replied || interaction.deferred) await interaction.editReply({ content: message, ephemeral: interaction.ephemeral})
        .then(msg => { if (willDelete && !interaction.ephemeral) setTimeout(() => interaction.deleteReply(), deleteTime) });
    else await interaction.reply({ content: message, ephemeral: ephemeral})
        .then(msg => { if (willDelete && !interaction.ephemeral) setTimeout(() => interaction.deleteReply(), deleteTime) });
}

/**
 * Get Bot Color from his Role of Guild
 * @param {Client} client Bot Client
 * @param {Integer} guildId Guild Id
 * @returns {String} Color ( Hex )
 */
module.exports.getBotColor = (client, guildId) => {
    const guild = client.guilds.cache.find(guild => guild.id == guildId);
    if (guild)  return guild.members.cache.find(m => m.id == client.user.id).displayHexColor;
    else return process.env.DEFAULT_COLOR
}