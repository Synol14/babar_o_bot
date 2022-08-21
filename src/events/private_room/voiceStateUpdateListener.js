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
        if (oldState.channelId === null && newState.channelId === null) return;

        const db = newState === null ? oldState.client.database.privateRooms : newState.client.database.privateRooms;

        // leave a voice channel
        if (newState.channelId === null) {
            if (!db.get('rooms')?.includes(oldState.channelId)) return;
            if (oldState.channel.members.size === 0) deleteRoom(oldState, db);
        }
        // join a voice channel
        else {
            // join lobby
            if (db.get('lobbies')?.includes(newState.channelId)) {
                await newState.guild.channels
                    .create(`${newState.member.displayName}'s room`, {
                        reason: `[${newState.client.user.tag}] Create private room for {${newState.member.user.tag}}`,
                        type: 'GUILD_VOICE',
                        userLimit: 20,
                        parent: newState.channel.parent
                    })
                    .then(channel => {
                        newState.member.voice.setChannel(channel);
                        newState.client.database.privateRooms.push('rooms', channel.id)
                        channel.permissionOverwrites.create(newState.member, {
                            VIEW_CHANNEL: true,
                            CONNECT: true,
                            SPEAK: true,
                            STREAM: true,
                            PRIORITY_SPEAKER: true,
                            MANAGE_CHANNELS: true,
                            DEAFEN_MEMBERS: true,
                            KICK_MEMBERS: true,
                            MOVE_MEMBERS: true,
                            MUTE_MEMBERS: true,
                            MANAGE_ROLES: true,
                            USE_VAD: true,
                        })
                    })
            }
        }
    }
}

function deleteRoom(oldState, db) {
    oldState.channel.delete(`[${oldState.client.user.tag}] Delete {${oldState.member.user.tag}}'s private room`).catch(err => err);
    const rooms = db.get('rooms')?.filter(r => r != oldState.channelId);
    oldState.client.database.privateRooms.set('rooms', rooms);
}