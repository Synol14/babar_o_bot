const DiscordBot = require("../structures/DiscordBot");

module.export = {
    /**
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @returns 
     */
    getDatabase: function (client, guildId, messageId) {
        return client.database.reactionRole.has(`${guildId}.${messageId}`) ? client.database.reactionRole.get(`${guildId}.${messageId}`) : null;
    },
    
    /**
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
    },

    /**
     * @param {DiscordBot} client Bot Client
     * @param {String} guildId Guild Id
     * @param {String} messageId Message Id
     * @returns 
     */
    isRoleReaction: function (client, guildId, messageId, reaction) {
        return this.isRoleReaction(this.getDatabase(client, guildId, messageId), reaction)
    },
    isRoleReaction: function (database, reaction) {
        for (const obj of database) {
            if (obj.emoji === reaction) return true;
        }
        return false;
    }
}