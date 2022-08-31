const { CommandInteraction, CommandInteractionOptionResolver, MessageEmbed } = require("discord.js");
const DiscordBot = require("../../structures/DiscordBot");

module.exports = {
    name: 'rules',
    type: 1,
    description: 'Create rules message',
    defer: true,
    ephemeral: false,
    default_permission: false,
    options: [],
    /**
     * Run Method for Slash Command Interaction
     * @param {DiscordBot} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function (client, interaction, options) {

        let rulesEmbeds = [
            new MessageEmbed().setImage('https://cdn.discordapp.com/attachments/1014156355348729856/1014156484449419334/standard_5.gif').setColor('WHITE'),
            new MessageEmbed().setTitle('Bienvenue sur le serveur GEII').setDescription(`Ici vous trouverez tout ce qu'il vous faut pour passer un séjour à l'IUT le plus agréable possible. C'est  à dire:
            > Un lieu pour s'entraider au niveau cours
            > Un accès direct aux infos du BDE
            > La possibilité de se bastonner sur vos jeux préférrés
            
            *N'hésitez pas à poser vos questions dans le salon <#883801219070582874>*`).setColor('WHITE'),
            new MessageEmbed().setTitle('Les Règles').setDescription(`Y'en a pas beaucoup donc essayez de les respecter
            > Changez votre pseudo à "Prénom NOM" une fois que vous êtes arrivés sur le serveur
            > Cherchez pas la merde, si vous avez des conflits a régler faites ca en PV`).setColor('WHITE'),
            new MessageEmbed().setTitle('Le Staff').setDescription(`Le staff de ce serv comporte 4 corps:
            > \`Admins\` *(en violet)* - Ils gèrent la structure du serveur
            > \`BDE\` *(en orange)* - Responsables de la partie fun de la vie étudiante. Allez les voir pour vos idées de soirées ou autres activités
            > \`Moderateur\` *(en violet)* - Se portent volontaires pour tenir la promo au courant pour les infos venant des profs
            
            Si vous souhaitez faire partie du staff, envoyez nous un message et on avisera`).setColor('WHITE'),
        ]
        let embeds = [
            new MessageEmbed().setTitle('Tournois').setDescription('On organise de temps en temps des tournois de jeux vidéos. Si vous voulez en organiser un on ouvrira les salons de tournoi et on nominera un gérant.').setColor('WHITE'),
            new MessageEmbed().setTitle('Emotes').setDescription(`On a quelques emotes custom sur ce serveur (en majorité des têtes de profs). Si vous en avez a proposer mettez l'image en question dans <#737780492446990386>
            > Emotes de profs: ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'CVG')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'cricri')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'cormerais')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'bg')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'batard')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Agamag')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Descamp_A_S')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'gagneuled')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'plouffe_sad')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'plouffe_glad')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'robet_mad')}
            > Autres emotes: ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'leagueoflegends')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'csgo')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'rocketleague')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'noice')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'lachance')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'kappa')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'tempete')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'ESE').identifier} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'AII')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Peip')} ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Sportif')}`).setColor('WHITE'),
        ]

        try {
            const webhooks = await interaction.guild.fetchWebhooks();
		    let webhook = webhooks.find(wh => wh.name === `DoNotDeleteMe - ${interaction.guild.name}`);

            if (webhook === undefined) interaction.editReply(`Please create a new webhook called ' DoNotDeleteMe - ${interaction.guild.name} ' ...`)
            else {
                await webhook.edit({channel: interaction.channelId});
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: rulesEmbeds
                })
                interaction.editReply(`Please wait 10 min the second message will be sent ...`)
                await sleep(600000);
                await webhook.send({
                    username: interaction.guild.name,
                    avatarURL: interaction.guild.iconURL(),
                    embeds: embeds
                })

                interaction.deleteReply();
            }
        } catch (error) {
            client.logger.error(''+error);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}