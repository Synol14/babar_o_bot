const { VoiceState } = require("discord.js");

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    /**
     * Execute Event
     * @param {VoiceState} oldState
     * @param {VoiceState} newState
     */
    async run(oldState, newState) {
        const db = newState.client.database.privateRooms;

        // leave a voice channel
        if (newState.channelId === null) {
            if (!db.get('rooms')?.includes(oldState.channelId)) return;
            if (oldState.channel.members.size === 0) oldState.channel.delete(`[${newState.client.user.tag}] Delete {${newState.member.user.tag}}'s private room`)
        }
        // join a voice channel
        else {
            // leave a room
            if (oldState.channelId != null && db.get('rooms')?.includes(oldState.channelId)) oldState.channel.delete(`[${newState.client.user.tag}] Delete {${newState.member.user.tag}}'s private room`)

            // join lobby
            if (db.get('lobbies')?.includes(newState.channelId)) {
                newState.guild
                    .channels.create(`${newState.member.displayName}'s room`, {
                        reason: `[${newState.client.user.tag}] Create private room for {${newState.member.user.tag}}`,
                        type: 'GUILD_VOICE',
                        userLimit: 20,
                        parent: newState.channel.parent
                    })
                    .then(channel => {
                        newState.member.voice.setChannel(channel);
                        newState.client.database.privateRooms.push('rooms', channel.id)
                    })
            }
        }
    }
}