const { MessageReaction, User } = require("discord.js");
const { getDatabase, isRoleReaction, isCustomEmoji, getRoleIdFromEmoji, getNoRolesIdFromEmoji, getEmojiFromRoleId } = require("../../util/roleManager");

module.exports = {
    name: 'messageReactionRemove',
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
        const role = reaction.message.guild.roles.cache.find(r => r.id === roleId);
        const member = reaction.message.guild.members.resolve(user.id);

        if (!member) return;
        if (role.editable) member.roles.remove(role);
        // else notifie in modlog channel (todo)

    }
}