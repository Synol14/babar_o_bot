const { MessageReaction, User } = require("discord.js");
const { getDatabase, isRoleReaction, isCustomEmoji, getRoleIdFromEmoji, getNoRolesIdFromEmoji, getEmojiFromRoleId } = require("../../util/roleManager");

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    /**
     * Execute Event
     * @param {MessageReaction} reaction
     * @param {User} user
     */
    async run(reaction, user) {
        if (user.bot) return;

        const client = reaction.client;
        const guildId = reaction.message.guildId;
        const messageId = reaction.message.id;

        const db = getDatabase(client, guildId, messageId);
        if (db === null) return;

        let emoji;
        if (isCustomEmoji(reaction)) emoji = `${reaction.emoji.animated ? 'a' : ''}<:${reaction.emoji.identifier}>` // '[a]<:Name:id>'
        else emoji = reaction.emoji.name;
        if (!isRoleReaction(db, emoji)) return;

        const roleId = getRoleIdFromEmoji(db, emoji);
        if (roleId === null) return;
        const noRoles = getNoRolesIdFromEmoji(db, emoji);
        const role = reaction.message.guild.roles.cache.find(r => r.id === roleId);
        const member = reaction.message.guild.members.resolve(user.id);

        if (!member) return;
        if (role.editable) member.roles.add(role);
        // else notifie in modlog channel (todo)

        for (const noRoleEmoji of noRoles) {
            const noRoleId = getRoleIdFromEmoji(db, noRoleEmoji);
            if (noRoleId === null) break;

            const noRole = reaction.message.guild.roles.resolve(noRoleId);
            if (noRole.editable) {
                member.roles.remove(noRole);

                if (noRoleEmoji.startsWith('<:') || noRoleEmoji.startsWith('a<:')) var _noRoleEmoji = noRoleEmoji.split(':')[2].replace('>', '');
                else var _noRoleEmoji = noRoleEmoji;
                let react = reaction.message.reactions.resolve(_noRoleEmoji);
                /*if (react === null) {
                    const emoji = reaction.message.guild.emojis.cache.find(emoji => emoji.name === noRoleEmoji.split(':')[1]);
                    react = reaction.message.reactions.resolve(emoji.id);
                }*/
                react?.users.remove(member.id);
            }
            // else notifie in modlog channel (todo)            
        }

    }
}