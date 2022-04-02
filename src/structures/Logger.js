const { CommandInteraction, Interaction } = require("discord.js");

class Logger {

    constructor() {

    }

    info(message) {
        console.log(`[Info] ${message}`);
    }

    error(message) {
        console.error(`[Error] ${message}`);
    }

    blankLine() {
        console.log(' ');
    }

    /**
     * Log an Interaction Info
     * @param {Interaction} interaction Application Command Interaction
     * @param {String} message Message to log
     */
    infoInteraction(interaction, message) {
        this.info(`[${interaction.id}] ${message}`)
    }

    /**
    * Log an Interaction Error
    * @param {Interaction} interaction Application Command Interaction
    * @param {String} message Message to log
    */
    errorInteraction(interaction, message) {
        this.error(`[${interaction.id}] ${message}`)
    }

    /**
     * Log an App Command Info
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {String} state Executiung state of command
     */
    logAppCmd(interaction, state) {
        const msg = `[App_Cmd - ${interaction.commandId}]  The \'${interaction.commandName}\' command has been use with  ${state}`;
        if (state.startsWith('SUCCES')) this.infoInteraction(interaction, msg);
        else this.errorInteraction(interaction, msg);
    }
    
}

module.exports = Logger;