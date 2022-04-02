const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Client } = require("discord.js");
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
const path = require("path");
const { Logger } = require("../structures/Logger");

/**
 * Register slash commands for a guild
 * @param {Client} client
 * @param {string} guildId
 */
module.exports = (client, guildId) => {
  client.logger.info("Registering slash commands for Guild " + guildId);

  const dir = path.join(__dirname, "..", "commands");
  fs.readdirSync(dir).forEach(dirs => {
    const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
      const cmd = require(`${dir}/${dirs}/${file}`);
      if (!cmd.name || !cmd.description || !cmd.run) return;
      const dataStuff = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
      };
      
      const command = [new SlashCommandBuilder().setName(cmd.name).setDescription(cmd.description)];
      if (cmd.options) command[0].options = cmd.options;
      const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
      rest.put(Routes.applicationGuildCommands(process.env.APPLICATION_ID, guildId), { body: command })
        .then(() => client.logger.info(`[Slash Command]: [POST] Guild ${guildId}, Command: ${dataStuff.name}`))
        .catch(err => client.logger.error(`[Slash Command]: [POST-FAILED] Guild ${guildId}, Command: ${dataStuff.name} \n${err}`));
    }
  });
};