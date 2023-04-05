const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy");

module.exports = {

   name: "rank",
   description: "→ Permets de voir le level d'un utilisateur.",
   permission: "Aucune",
   dm: false,
   category: "🔰 **Level**",
   options: [
        {
         type: "user",
         name: "utilisateur",
         description: "L'xp du membre à voir !",
         required: false,
         autocomplete: false
        }
    ],
     
    async run(bot, message, args, db) {

        let user;
        if(args.getUser("utilisateur")) {
            user = args.getUser("utilisateur")
            if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("Par de membre !")
        } else user = message.user;

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

            db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, all) => {

                if(req.length < 1) return message.reply("Ce membre n'a pas d'xp !")

                await message.deferReply()

                const calculXp = (xp, level) => {
                    let xptotal = 0;
                    for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                    xptotal += xp;
                    return xptotal;
                }

                let leaderboard = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
                let xp = parseInt(req[0].xp)
                let level = parseInt(req[0].level)
                let rank = leaderboard.findIndex(r => r.user === user.id) + 1
                let need = (level + 1) * 1000;

                let Card = await new Canvas.Card()
                .setBackground("https://zupimages.net/up/23/13/sx2d.png")
                .setBot(bot)
                .setColorFont("#FFFFFF")
                .setRank(rank)
                .setUser(user)
                .setColorProgressBar("#FF0000")
                .setGuild(message.guild)
                .setXp(xp)
                .setLevel(level)
                .setXpNeed(need)
                .toCard()

                await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
            })
        })
    }
}