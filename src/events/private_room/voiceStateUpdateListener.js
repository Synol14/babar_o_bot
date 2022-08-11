const { VoiceChannel } = require("discord.js");

module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    /**
     * Execute Event
     * @param {VoiceChannel} oldState
     * @param {VoiceChannel} newState
     */
    async run(oldState, newState) {
        const db = newState.client.database.privateRooms
        // leave
        if (newState == null) {
            if (!db.get('rooms').includes(oldState.id)) return;

        }
        // join
        else {
            if (!db.get('lobbies').includes(newState.id)) return;
            
        }
    }
}