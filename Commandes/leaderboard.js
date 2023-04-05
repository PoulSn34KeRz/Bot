const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy");

module.exports = {

   name: "leaderboard",
   description: "→ Permets de voir le classement des levels.",
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

        db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}'`, async (err, req) => {
            if(req.length < 1) return message.reply(`Personne n'a de l'xp !`)

            await message.deferReply()

            const calculXp = (xp, level) => {
                let xptotal = 0;
                for(let i = 0; i < level + 1; i++) xptotal += i * 1000
                xptotal += xp;
                return xptotal;
            }

            let leaderboard = await req.sort((a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp,), parseInt(a.level)))

            const Leaderboard = await new Canvas.Leaderboard()
            .setBot(bot)
            .setGuild(message.guild)
            .setBackground("https://zupimages.net/up/23/13/sx2d.png")
            .setColorFont("#ffffff")

            for(let i = 0; i < (req.length > 10 ? 10 : req.length); i++) {

                await Leaderboard.addUser(await bot.users.fetch(leaderboard[i].user), parseInt(leaderboard[i].level), parseInt(leaderboard[i].xp), parseInt(leaderboard[i].level + 1) * 1000)
            }

            const Image =  await Leaderboard.toLeaderboard()

            await message.followUp({files: [new Discord.AttachmentBuilder(Image.toBuffer(), {name: "leaderboard.png"})]})
        })
    }
}