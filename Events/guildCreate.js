const Discord = require("discord.js")

module.exports = async(bot, guild) => {

    let db = bot.db;
   
    db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`, async(err, req) => {

        if(req.length <1) {

            db.query(`INSERT INTO server (guild, captcha, antiraid) VALUES (${guild.id}, 'false', 'false')`)
        }
    })
}