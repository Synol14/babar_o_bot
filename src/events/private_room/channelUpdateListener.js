const { VoiceChannel } = require("discord.js");

module.exports = {
    name: 'channelDelete',
    once: false,
    /**
     * Execute Event
     * @param {VoiceChannel} channel
     */
    async run(channel) {
        if (!channel.isVoice()) return;

        const db = channel.client.database.privateRooms;
        if (db.get('rooms')?.includes(channel.id)) deleteChannelId(db, channel, 'rooms');
        else if (db.get('lobbies')?.includes(channel.id)) deleteChannelId(db, channel, 'lobbies');
    }
}

function deleteChannelId(db, channel, location) {
    const array = db.get(location)?.filter(r => r != channel.id);
    channel.client.database.privateRooms.set(location, array);
}