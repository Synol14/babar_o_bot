const { CommandInteraction, CommandInteractionOptionResolver } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");
const { getEmbed } = require("../../util/messageUtils");
const { getDatabase, setDatabase, getEmojiFromRoleId } = require('../../util/roleManager')

module.exports = {
    name: 'rection_role',
    type: 1,
    description: 'Create a message role management',
    defer: true,
    ephemeral: true,
    default_permission: false,
    options: [
        {
            name: "add",
            description: "Add a new role",
            type: 1,
            options: [
                {
                    name: "message_id",
                    description: "Give id of your message",
                    type: 3,
                    required: true
                },
                {
                    name: "reaction",
                    description: "Give reaction to add",
                    type: 3,
                    require: true
                },
                {
                    name: "role",
                    description: "Give the role to add",
                    type: 8,
                    require: true
                },
                {
                    name: "no_role",
                    description: "(Optional) Give a role that can not be with your new role",
                    type: 8,
                    require: false
                },
                {
                    name: "no_role2",
                    description: "(Optional) Give a role that can not be with your new role",
                    type: 8,
                    require: false
                },
                {
                    name: "no_role3",
                    description: "(Optional) Give a role that can not be with your new role",
                    type: 8,
                    require: false
                },
                {
                    name: "no_role4",
                    description: "(Optional) Give a role that can not be with your new role",
                    type: 8,
                    require: false
                }
            ]
        },
        {
            name: "remove",
            description: "Remove a role",
            type: 1,
            options: [
                {
                    name: "message_id",
                    description: "Give id of your message",
                    type: 3,
                    required: true
                },
                {
                    name: "reaction",
                    description: "Give the reaction of the role to be deleted",
                    type: 3,
                    require: true
                }
            ]
        }
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {DiscordBot} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function (client, interaction, options) {
        // Get options
        const subCmd = options.getSubcommand();
        const message_id = options.getString("message_id");
        const reaction = options.getString("reaction");

        // Verification
        if (message_id === null || reaction === null)  return interaction.editReply({embeds:[getEmbed(" You must fill parameter ...", require('../../../resources/config').RED)]}); // For an unexplained required option problem
        if (!require('emoji-regex')().test(reaction) && !/<:.+:(\d+)>/gm.test(reaction) && !/<a:.+:(\d+)>/gm.test(reaction)) return interaction.editReply({embeds:[getEmbed(" I can't read reaction ...", require('../../../resources/config').RED)]});

        // Apply
        if (subCmd === "add") add(client, interaction, options, message_id, reaction);
        else if (subCmd === "remove") remove(client, interaction, options, message_id, reaction);
    }
}


/**
 * Add Reaction Role
 * @param {DiscordBot} client Bot Client
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {CommandInteractionOptionResolver} options Application Command Options
 * @param {String} message_id Message Id
 * @param {String} reaction Reaction
 */
async function add(client, interaction, options, message_id, reaction) {
    // Get options
    const role = options.getRole("role");
    const no_role = options.getRole("no_role", false);
    const no_role2 = options.getRole("no_role2", false);
    const no_role3 = options.getRole("no_role3", false);
    const no_role4 = options.getRole("no_role4", false);

    const db = getDatabase(client, interaction.guildId, message_id);

    const no_role_emoji = getEmojiFromRoleId(db, no_role?.id);
    const no_role2_emoji = getEmojiFromRoleId(db, no_role2?.id);
    const no_role3_emoji = getEmojiFromRoleId(db, no_role3?.id);
    const no_role4_emoji = getEmojiFromRoleId(db, no_role4?.id);

    // verification
    if (role === null) return interaction.editReply({embeds:[getEmbed(" You must fill parameter ...", require('../../../resources/config').RED)]}); // For an unexplained required option problem
    if (role === interaction.guild.roles.everyone)  return interaction.editReply({embeds:[getEmbed(" You can't select @everyone ...", require('../../../resources/config').RED)]});
    
    // Apply
    const emoji = db.find(obj => obj.emoji == reaction);
    if (emoji) return interaction.editReply({embeds:[getEmbed(" This rection is already used ...", require('../../../resources/config').RED)]});

    const object = {
        emoji: reaction,
        role: role.id,
        no_roles: [no_role_emoji, no_role2_emoji, no_role3_emoji, no_role4_emoji]
    }

    db.push(object);
    setDatabase(client, interaction.guildId, message_id, db);

    (await interaction.channel.messages.fetch(message_id)).react(reaction)
    interaction.editReply("**Done !**    ( " + reaction + "   ->   " + role.name + " )");
}

/**
 * Remove Reaction Role
 * @param {DiscordBot} client Bot Client
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {CommandInteractionOptionResolver} options Application Command Options
 */
async function remove(client, interaction, options, message_id, reaction) {
    
    const db = getDatabase(client, interaction.guildId, message_id);
    const emoji = db.find(obj => obj.emoji == reaction);
    if (!emoji) return interaction.editReply({embeds:[getEmbed(" This rection is not used ...", require('../../../resources/config').RED)]});

    db.splice(db.findIndex(o => o.emoji === reaction), 1);
    for (const obj of db) {
        if (obj.no_roles.includes(reaction)) obj.no_roles.splice(obj.no_roles.findIndex(reaction), 1);
    }
    setDatabase(client, interaction.guildId, message_id, db);

    (await interaction.channel.messages.fetch(message_id)).reactions.resolve(reaction)?.remove();
    interaction.editReply(" **Done !**    ( " + reaction + "   **─❌─>**   " /*+ role */+ " )");
}


