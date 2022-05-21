const { ButtonInteraction } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Execute Event
     * @param {ButtonInteraction} button
     */
    async run(button) {
        if (!button.isButton()) return;

        const db = button.client.database.surveys.all();
        if (db && db != {})
            Object.values(db)
                .filter( obj => new RegExp(`(${obj.id}_)[0-9]+`).test(button.customId) )
                .forEach(obj => {
                    button.client.logger.info(`Survey button pressed for ${obj.title} !`)
                    const id = parseInt( button.customId.replace(`${obj.id}_`, '') );
                    const dbObject = button.client.database.surveys.get(obj.id);
                    if (!dbObject.members.find(i => i == button.member.user.username)) 
                    {
                        dbObject.data[id] != null ? dbObject.data[id]++ : dbObject.data[id] = 1;
                        dbObject.members.push(button.member.user.username);
                        button.client.database?.surveys.set(obj.id, dbObject);
                        button.reply({content: `${button.member.user.username} voted for ${button.component.label}!`, ephemeral: true});
                    } 
                    else button.reply({content: `Sorry, but you can't vote again !`, ephemeral: true});
                })
    }
}