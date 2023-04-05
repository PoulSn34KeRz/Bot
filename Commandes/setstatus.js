const Discord = require("discord.js")

module.exports = {

    name: "setstatus",
    description: "→ Permets de Change le status du bot !",
    permission: Discord.PermissionFlagsBits.Administrateur,
    dm: false,
    category: "**👑 Administration**",
    options: [
        {
            type: "string",
            name: "activité",
            description:"Activité du bot !",
            required: true,
            autocomplete: true
        }, {
            type: "string",
            name: "status",
            description:"Status du bot !",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "lien",
            description:"URL du stream !",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let activity = args.getString("activité")
        if(!activity !== "Listening" && activity !== "Playing" && activity !== "Competing" && activity !== "Watching" && activity !== "Streaming") return message.reply("Merci de suivre l'autocomplete !")

        let status = args.getString("status")

        if(activity === "Streaming" && args.getString("lien") === null) return message.reply("Indiquer une URL")
        if(activity === "Streaming" && args.getString("lien").match(new RegExp(/^(?:https?:\/\/)?(?:www\.|go\.)?kick\.com\/([a-z0-9_]+)($|\?)/))) return message.reply("Indiquer une URL Twitch")

        if(activity === "Streaming") await bot.user.setActivity(status, {type: Discord.ActivityType[activity], url: args.getString("lien")})
        else await bot.user.setActivity(status, {type: Discord.ActivityType[activity]})
        await message.reply("Status mis à jour !")
    }
}