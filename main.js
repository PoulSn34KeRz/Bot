const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
//const giveaway = require("./Commandes/giveaway.js")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#ffffff";
bot.function = {
    createId: require("./Fonctions/createId"),
    generateCaptcha: require("./Fonctions/generateCaptcha")
}

//Message Bienvenue
bot.on("guildMemberAdd", member => {
    let bv = new Discord.EmbedBuilder()
    .setTitle("**__Nouveau Membre !__**")
    .setDescription(`**${member.user} est arrivè ! Dites lui bonjour !**`)
    .setThumbnail(member.displayAvatarURL())
    .setColor("#00acff")
    .setImage("https://zupimages.net/up/23/13/sx2d.png")
    bot.channels.cache.get("1092134306891190364").send({embeds: [bv]})
})

//Message quittez
bot.on("guildMemberRemove", member => {
    let leave = new Discord.EmbedBuilder()
    .setTitle("**__Départ d'un Membre !__**")
    .setDescription(`**${member.user} est parti ! Dites lui au revoir !**`)
    .setThumbnail(member.displayAvatarURL())
    .setColor("#FA0034")
    .setImage("https://zupimages.net/up/23/13/s1x2.png")
    bot.channels.cache.get("1092890010728022088").send({embeds: [leave]})
})

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)