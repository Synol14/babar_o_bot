const { CommandInteraction, CommandInteractionOptionResolver, GuildChannel } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");
const { getEmbed } = require("../../util/messageUtils");

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
        if (message_id === null || reaction === null)  return interaction.editReply({embeds:[getEmbed("You must fill parameter ...", require('../../../resources/config').RED)]}); // For an unexplained required option problem
        if (!require('emoji-regex')().test(reaction) && !/<:.+:(\d+)>/gm.test(reaction) && !/<a:.+:(\d+)>/gm.test(reaction)) return interaction.editReply({embeds:[getEmbed("I can't read reaction ...", require('../../../resources/config').RED)]});

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

    // verification
    if (role === null) return interaction.editReply({embeds:[getEmbed("You must fill parameter ...", require('../../../resources/config').RED)]}); // For an unexplained required option problem
    if (role === interaction.guild.roles.everyone)  return interaction.editReply({embeds:[getEmbed("You can't select @everyone ...", require('../../../resources/config').RED)]});

    // Apply
    const db = client.database.reactionRole.get(`${interaction.guildId}.${message_id}`);
    const emoji = db.find(obj => obj.emoji == reaction);
    if (emoji) return interaction.editReply({embeds:[getEmbed("This rection is already used ...", require('../../../resources/config').RED)]});

    console.log(reaction);

    const object = {
        emoji: reaction,
        role: role.id,
        no_roles: [no_role, no_role2, no_role3, no_role4]
    }

    db.push(object);
    client.database.reactionRole.set(`${interaction.guildId}.${message_id}`, db);

    (await interaction.channel.messages.fetch(message_id)).react(reaction)
    interaction.editReply("**Done !** ( " + reaction + " **->** " + role + " )");
}

/**
 * Remove Reaction Role
 * @param {DiscordBot} client Bot Client
 * @param {CommandInteraction} interaction Application Command Interaction
 * @param {CommandInteractionOptionResolver} options Application Command Options
 */
async function remove(client, interaction, options, message_id, reaction) {
    
}