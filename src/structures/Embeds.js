const { getEmbed, getBotColor } = require("../util/messageUtils");

module.exports = {
    NO_USER_PERM: getEmbed("🛑 You don't have permission !", process.env.RED),
    NO_BOT_PERM: (permission = '', option = '') => { return getEmbed(`🙁 I don't have ${permission} permission ${option}!`, process.env.RED) },
    USER_NO_IN_CHANNEL: getEmbed("🔊 You are not in voice channel !", process.env.RED),
    SONG_NO_FOUND: getEmbed(":x: I don't found song with this index !", process.env.RED),
    NO_QUEUE: (client, guildId) => { return getEmbed("🙁 I don't have queue !", getBotColor(client, guildId)) },
    NO_VOICE_CHANNEL: getEmbed(":x: I'm not in voice channel !", process.env.RED),
}