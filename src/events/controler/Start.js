module.exports = {
    name: 'ready',
    once: true,
    /**
     * Execute Event
     */
    async run() {
        /// Set Bot
        const client = require('../../index');

        /* put role messages in cache (IMPORTANT !)*/
        const db = client.database.reactionRole.all();
        Object.keys(db).forEach(async key => {
            const guildId = key.split('.')[0];
            const messageId = key.split('.')[1];

            const guild = await client.guilds.fetch(guildId);
            const channels = await guild.channels.fetch();

           channels.forEach(async c => {
                try {
                    await c.messages?.fetch(messageId);
                } catch (error) {}
            });
        })

        /// Logging
        client.logger.blankLine();
        client.logger.blankLine();
        client.logger.info(`Bot Ready ( ${client.user.tag} - ${client.user.id} )\n\n`.green);
    }
}