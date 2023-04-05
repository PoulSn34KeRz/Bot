const Discord = require("discord.js")

module.exports = {

    name: "welcome",
    description: "Permet d'activer ou désactiver le module  bienvenue !",
    ownerOnly: false,
    permission: Discord.PermissionFlagsBits.Administrator,
    utilisation: "/welcome [état, channel, texte]",
    dm: false,
    category: "Modules",
    options: [
        {
            type: "string",
            name: "état",
            description: "L'état du module bienvenue !",
            required: true,
            autocomplete: true
        },
        {
            type: "channel",
            name: "salon",
            description: "Le salon à envoyer le message de bienvenue !",
            required: false,
            autocomplete: false
        },
        {
            type: "string",
            name: "texte",
            description: "Le texte du bienvenue !",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        db.query(`SELECT * FROM welcomer WHERE guild = '${message.guild.id}'`, async (err, req) =>{
            const etat = args.getString("état")
            const channel = args.getChannel("salon")
            const text = args.getString("texte")
            if(etat !== "on" && etat !== "off") return message.reply("Indique on ou off !")

            if(etat === "off") {

                db.query(`UPDATE welcomer SET channel = 'false', text = 'false' WHERE guild = '${message.guildId}'`);
                return message.reply("J'ai bien désactivé le module bienvenue !")
            }

            if(etat === "on") {
                if(!channel) return message.reply("Veuillez indiquez un salon !") 
                if(!text) return message.reply("Veuillez indiquez le texte du message de bienvenue !")
                db.query(`UPDATE welcomer SET channel = '${channel.id}', text = '${text}' WHERE guild = '${message.guildId}'`);
                    return message.reply("J'ai bien activé le module bienvenue !")
            }
    })
        }
    }