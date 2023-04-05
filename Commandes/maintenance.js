const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "maintenance",
    description: "→ Permets d'annoncer une maintenance",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "**👑 Administration**",
    options: [
        {
            type: "string",
            name: "temps",
            description: "Choisir le temps de la maintenance (ex: 1h, 2h30m, 10s)",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, interaction, args) {

        let time = args.getString("temps")
        let parsedTime = ms(time)

        if(!parsedTime) {
            return interaction.reply({content: "Le temps fourni n'est pas valide !", ephemeral: true})
        }

        // Envoi du message annonçant la maintenance
        await interaction.channel.send('@everyone'); 

        let embedReboot = new Discord.EmbedBuilder()
            .setColor('#fc0000')
            .setTitle('Maintenance')
            .setImage('https://thumbs.dreamstime.com/b/l-annonce-de-media-de-derni%C3%A8res-nouvelles-annoncent-le-m%C3%A9gaphone-de-l-information-72988179.jpg')
            .setDescription(`Une maintenance est prévue sur le serveur !\nCette dernière va durer ${time} !\n Temps restant : \`${time}\`\nMerci de patienter !`)
            .setTimestamp()                                                                    
            .setFooter({text: `${bot.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})

        await interaction.channel.send({embeds: [embedReboot]});

        // Déclenchement du compte à rebours
        setTimeout(async () => {
            let embedRebootEnd = new Discord.EmbedBuilder()
                .setColor('#63fc00')
                .setTitle('Maintenance terminée')
                .setImage('https://thumbs.dreamstime.com/b/l-annonce-de-media-de-derni%C3%A8res-nouvelles-annoncent-le-m%C3%A9gaphone-de-l-information-72988179.jpg')
                .setDescription("La maintenance est terminée, vous pouvez maintenant retourner sur le serveur !")
                .setTimestamp()                                                                    
                .setFooter({text: `${bot.user.tag}`, iconURL: bot.user.displayAvatarURL({dynamic: true})})
            
            await interaction.channel.send({embeds: [embedRebootEnd]});
        }, parsedTime);

        await interaction.reply({content: "Le message est bien envoyé !", ephemeral: true})
    }
}