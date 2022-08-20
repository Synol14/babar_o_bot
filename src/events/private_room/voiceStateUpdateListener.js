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
        const db = newState.client.database.privateRooms
        // leave
        if (newState.channelId === null) {
            if (!db.get('rooms')?.includes(oldState.channelId)) return;
            if (oldState.channel.members.size === 0) oldState.channel.delete(`[${newState.client.user.tag}] Delete {${newState.member.user.tag}}'s private room`)
        }
        // join
        else {
            if (oldState.channelId != null) {
                if (db.get('rooms')?.includes(oldState.channelId) && oldState.channel.members.size === 0) s
                    oldState.channel.delete(`[${newState.client.user.tag}] Delete {${newState.member.user.tag}}'s private room`)
            }
            if (!db.get('lobbies')?.includes(newState.channelId)) return;
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