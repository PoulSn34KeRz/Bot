const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

        if(interaction.commandName === "help") {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }

        if(interaction.commandName === "setcaptcha" || interaction.commandName === "setantiraid") {

            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }

        if(interaction.commandName === "setstatus") {

            let choices = ["Listening", "Watching", "Playing", "Streaming", "Competing"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c})))
        }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        command.run(bot, interaction, interaction.options, bot.db)
    }

    if(interaction.isButton()) {

        if(interaction.customId === "ticket") {

            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: Discord.ChannelType.GuildText
            })
            await channel.setParent(interaction.channel.parent.id)

            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                ViewChannel: false
            })
            await channel.permissionOverwrites.create(interaction.user.id, {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })
            await channel.permissionOverwrites.create("1089611859851751495", {
                ViewChannel: true,
                EmbedLinks: true,
                SendMessages: true,
                AttachFiles: true,
                ReadMessageHistory: true
            })

            await channel.setTopic(interaction.user.id)
            await interaction.reply({content: `**Votre ticket a correctement été créé :** ${channel}`, ephemeral: true})

            let Embed = new Discord.EmbedBuilder()
            .setColor("#FF4933")
            .setTitle("Réagissez avec <:close3:1091876229583482980> pour fermé un ticket !")
            .setThumbnail('https://imgur.com/6f7Fkih.png')
            .setDescription("**Bonjour , Merci d'avoir créé un ticket d'assistance. Afin de gérer au mieux votre demande merci de bien vouloir précisé votre souci.**")
            .setFooter({text: "=====================\nS|Bot Support © 2023"})
    
            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("close")
            .setLabel("Fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("<:close3:1091876229583482980>"))

            await channel.send({embeds: [Embed], components: [btn]})
        }

        if(interaction.customId === "close") {

            let user = bot.users.cache.get(interaction.channel.topic) 
            try {await user.send("**Bonjour,\n\nVotre Ticket a bien été fermé.\n\nEn espérant que cela vous a rendu service.\n\nCordialement S|Bot.**")} catch (err) {}

            await interaction.channel.delete()
        }
    }
}