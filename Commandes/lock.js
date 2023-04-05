const Discord = require ("discord.js")

module.exports = {

    name: "lock",
    description: "→ Permets de Lock un salon !",
    permission: Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "**💎 Modération**",
    options: [
        {
            type: "channel",
            name: "salon",
            description:"Le salon à Lock",
            required: true,
            autocomplete: false
        },{
            type: "role",
            name: "role",
            description:"Le role à Lock",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot , message , args) {
        
        let channel = args.getChannel("salon")
        if(!message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon")
        if(channel.type !== Discord.ChannelType.GuildText && channel.type !== Discord.ChannelType.GuildPublicThread && channel.type !== Discord.ChannelType.GuildPrivateThread) return message.reply("Envoyez un salon textuel")

        let role = args.getRole("role")
        if(role && !message.guild.roles.cache.get(role.id)) return message.replys("Pas de role")
        if(!role) role = message.guild.roles.everyone;

        if(channel.permissionOverwrites.cache.get(role.id)?. deny.toArray(false).includes("SendMessages")) return message.reply(`**Le rôle \`${role.name}\` est déjà lock dans le salon ${channel}**`)

        if(channel.permissionOverwrites.cache.get(role.id)) await channel.permissionOverwrites.edit(role.id, {SendMessages : false})
        else await channel.permissionOverwrites.create(role.id, {SendMessages : false})

        await message.reply(`**Le rôle \`${role.name}\` à bien été lock dans le salon ${channel}**`)
        } 
    }