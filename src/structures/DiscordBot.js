const { Client, Collection } = require('discord.js');
const Logger = require("./Logger");
const {readdirSync} = require('fs');
const path = require("path");
const Jsoning = require("jsoning");
//const { Server } = require("socket.io");
const http = require("http");
const Express = require("express");

class DiscordBot extends Client {

    constructor(props) {
        super(props);

        this.commands = new Collection();
        this.database = {
            addedCommands: new Jsoning('.database/addedCommands.json')
        }
        this.logger = new Logger();

        if (process.env.BOT_TOKEN == "")
            return new TypeError( 'The botconfig.js is not filled out. Please make sure nothing is blank, otherwise the bot will not work properly.'.red );
        
        this.LoadCommands();
        this.LoadEvents();

        //Web Stuff
        this.server = Express();
        this.http = http.createServer(this.server);
        //this.server.use("/", require("../api"));
        //this.io = new Server(this.http);
        //require("../api/socket")(this.io);
    }

    LoadCommands() {
        this.logger.blankLine();
        this.logger.info('   << Commands Loading ... >>'.bold.yellow);
        const dir = path.join(__dirname, "..", "commands");
        this.commands.clear();
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
            for (const file of commands) {
                const cmd = require(`${dir}/${dirs}/${file}`);
                if (!cmd.name || !cmd.description || !cmd.run)
                    return this.log( `Unable to load Command: ${file.split(".")[0]}, Reason: File doesn't had run/name/desciption` );
                this.commands.set(cmd.name.toLowerCase(), cmd)
                this.logger.info(`-> Command loaded: ${cmd.name}`);
            }
        });
        this.RegisterSlashCommands();
    }

    LoadEvents() {
        this.logger.blankLine();
        this.logger.info('   << Events Loading ... >>'.bold.yellow);
        const dir = path.join(__dirname, "..", "events");
        readdirSync(dir).forEach(dirs => {
            const eventFiles = readdirSync(`${dir}/${dirs}/`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(`${dir}/${dirs}/${file}`);
                if (!event.name || !event.run)
                    return this.log( `Unable to load Event: ${file.split(".")[0]}, Reason: File doesn't had run/name` );
                if (event.once) {
                    this.once(event.name, (...args) => event.run(...args));
                } else {
                    this.on(event.name, (...args) => event.run(...args));
                }
                this.logger.info(`-> Event loaded: ${event.name} - ${file}`);
            }
        });
        this.logger.blankLine();
    }

    sendError(channel, error) {
        let embed = new MessageEmbed()
          .setTitle("An error occured")
          .setColor("RED")
          .setDescription(error)
          .setFooter( "If you think this as a bug, please report it in the support server!" );
    
        channel.send(embed);
      }

      build() {
        this.login(process.env.BOT_TOKEN);
        if (process.env.ExpressServer) {
            this.http.listen(process.env.PORT, () => {
                this.logger.info("Web Server has been started");
                this.logger.blankLine();
            });
        }
      }
    
      async RegisterSlashCommands() {
        this.logger.blankLine();
        this.logger.info('   << Slash Commands Posting ... >>'.bold.yellow);
        const guilds = this.database.addedCommands.get('guilds');
        guilds.forEach((guild) => require("../util/RegisterSlashCommand")(this, guild));
        this.guilds.cache.forEach((guild) => {
            require("../util/RegisterSlashCommand")(this, guild.id);
        });
      }

}

module.exports = DiscordBot;