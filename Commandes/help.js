const Discord = require("discord.js")

module.exports = {

    name: "help",
    description: "→ Permets de voir toutes les commandes du Bot !",
    permission: "Aucune",
    dm: true,
    category: "**⚙️ Général**",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande à afficher",
            required: false,
            autocomplete: true
        }
    ],

    async run(bot, message, args) {

        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("Pas de commande !")
        }

        if(!command) {

            let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor("#FF5733")
            .setTitle(`<:info:1092166703321993299> **Informations sur les commandes du robot**`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`**● Si vous avez besoin d'aide pour quelque chose, n'hésitez pas à nous contactez !\n\n● Commandes disponibles : \`${bot.commands.size}\`\n● Catégories disponibles : \`${categories.length}\`**`)
            .setFooter({text: `=====================\nS|Bot Support © 2023`})

            await categories.sort().forEach(async cat => {

                let commands = bot.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name})\` : ${cmd.description}`).join("\n")}`})
            })

            await message.channel.send({embeds: [Embed]})
            await message.reply({content: "Le message est bien envoyé !", ephemeral: true})

       } else {

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommandes en DM : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${command.category}\``)
            .setFooter({text: "=====================\nS|Bot Support © 2023"})

            await message.reply({embeds: [Embed]})
       }
    }
}