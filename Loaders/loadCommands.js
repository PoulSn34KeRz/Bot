const fs = require("fs")

module.exports = async bot => {

    fs.readdirSync("./Commandes").filter(f => f.endsWith(".js")).forEach(async file => {

        let command = require(`../Commandes/${file}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La command ${file.splice(0, file.length - 3)} n'a pas de nom !`) 
        bot.commands.set(command.name, command)
        console.log(`=======================================\nCommande ${file} chargée avec succès !\n=======================================`)
    })
}