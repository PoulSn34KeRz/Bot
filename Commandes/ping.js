const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "→ Permets de voir le ping du Bot !",
    permission: "Aucune",
    dm: true,
    category: "**:tools: Outils**",

    async run(bot, message, args) {

        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}