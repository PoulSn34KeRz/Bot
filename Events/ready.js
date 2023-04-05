const discord = require("discord.js")
const loadDatabas = require("../Loaders/loadDatabase")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

    bot.db = await loadDatabas()
    bot.db.connect(function (err) {
        if(err) console.log(err)
        console.log(`=======================================\nBase de données connectée avec succès !\n=======================================`)
    })
    
    await loadSlashCommands(bot)

    console.log(`=======================================\n${bot.user.tag} est bien en Ligne !\n=======================================`)
}