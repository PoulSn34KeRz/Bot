const Discord = require("discord.js")

module.exports = {

    name: "ticket",
    description: "→ Permets d'envoyer le message pour ouvrir les tickets !",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "**<:sbotticket:1092093534452060160> Ticket**",
    options: [],

    async run(bot, message, args, db) {

        let Embed = new Discord.EmbedBuilder()
        .setColor("#FF4933")
        .setTitle("**Réagissez avec <:sbotticket:1092093534452060160> pour créer un ticket !**")
        .setThumbnail('https://imgur.com/xC6WvET.png')
        .setDescription("**Besoin d'entrer en relation directe avec un membre du staff de ce serveur ? Tu peux créer un ticket en interagissant avec le bouton ci-dessous.**")
        .setFooter({text: "=====================\nTout abus sera sanctionné, on compte sur vous 😋\nS|Bot Support © 2023"})

        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ticket")
        .setLabel("Créer un ticket")
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji("<:sbotticket:1092093534452060160> "))

        await message.channel.send({embeds: [Embed], components: [btn]})
        await message.reply({content: "Le message est bien envoyé !", ephemeral: true})
    }
}