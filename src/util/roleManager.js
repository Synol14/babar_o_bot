const DiscordBot = require("../structures/DiscordBot");

module.export = {
    /**
     * 
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @returns 
     */
    getDatabase: function (client, guildId, messageId) {
        return client.database.reactionRole.get(`${guildId}.${messageId}`);
    },
    
    /**
     * 
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @param {Object} obj Object to save
     * @returns 
     */
    setDatabase: function (client, guildId, messageId, obj) {
        client.database.reactionRole.set(`${guildId}.${messageId}`, obj);
    },
    
    /**
     * 
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @param {String} roleId Role Id
     * @returns 
     */
    getEmojiFromRoleId: function (client, guildId, messageId, roleId) {
        const db = getDatabase(client, guildId, messageId);
        for (const obj of db) {
            if (obj.role === roleId) return obj.emoji;
        }
        return null;
    },
    
    /**
     * 
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @param {String} emoji Emoji
     * @returns 
     */
    getRoleIdFromEmoji: function (client, guildId, messageId, emoji) {
        const db = getDatabase(client, guildId, messageId);
        for (const obj of db) {
            if (obj.emoji === emoji) return obj.role;
        }
        return null;
    }
}