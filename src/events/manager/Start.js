const { Client } = require("discord.js");

module.exports = {
    name: 'ready',
    once: true,
    /**
     * Execute Event
     * @param {Client} client Application Bot Client
     */
    async run(client) {
        /// Set Bot
        //resetAllMusicObject(client);

        /// Logging
        client.logger.blankLine();
        client.logger.blankLine();
        client.logger.info(`Bot Ready ( ${client.user.tag} - ${client.user.id} )\n\n`);
    }
}