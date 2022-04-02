const { Guild } = require("discord.js");

module.exports = {
    name: 'guildCreate',
    once: false,
    /**
     * Execute Event
     * @param {Guild} guild Guild
     */
    async run(guild) {
        guild.client.logger.info(` Bot Join Guild ${guild.id}`);
        guild.client.database.addedCommands.push('guilds', `${guild.id}`);
        guild.client.database.addedCommands.set(guild.id, {});
        
    }
}