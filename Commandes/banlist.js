const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "banlist",
  description: "→ Permets de voir la liste des membres bannis",
  category: "**💎 Modération**",
  
  async run (bot, interaction) {
    const fetchBans = await interaction.guild.bans.fetch();
    const banlist = fetchBans.map((member) => member.user.tag).join(`,\n`)

    const erreurSpeed = new EmbedBuilder()
    .setDescription("**Il n'y a pas de personnes banni(s) dans ce serveur !**")
    .setColor(bot.color)
    .setTimestamp()
    if (banlist.length < 1) return interaction.reply({embeds: [erreurSpeed ], ephemeral: true})

    const banlistSpeed = new EmbedBuilder()
    .setTitle(`Liste des Bannissements`)
    .setDescription(`${banlist}`)
    .setColor(bot.color)
    .setTimestamp()
    interaction.reply({embeds: [banlistSpeed]})
  }
}