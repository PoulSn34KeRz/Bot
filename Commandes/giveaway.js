const Discord = require("discord.js");
const ms = require('ms');

module.exports = {
  name: 'giveaway',
  description: 'Lancer un giveaway',
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Modération",
  options: [
    {
      name: 'duration',
      type: 'string',
      description: 'La duration du giveaway (e.g. 1h)',
      required: true,
      autocomplete: false
    },
    {
      name: 'winners',
      type: 'integer',
      description: 'Le nombre de winners',
      required: true,
      autocomplete: false
    },
    {
      name: 'prize',
      type: 'string',
      description: 'Le prix du giveaway',
      required: true,
      autocomplete: false
    },
  ],
  async run(bot, interaction, args) {
    let duration = args.getString('duration');
    let winners = args.getInteger('winners');
    let prize = args.getString('prize');

    let participants = [];

    // Calculer le temps restant
    let durationMs = ms(duration);
    let endTime = Date.now() + durationMs;

    const embed = new Discord.EmbedBuilder()
      .setColor('#d100ff')
      .setTitle(`Giveaway: ${prize}`)
      .setDescription(`Clique sur le bouton ci-dessous pour participer !\nDurée: **${duration}**\nNombre de gagnants: **${winners}**`)
      .setFooter({text: `=====================\nS|Bot Support © 2023`})

    const joinButton = new Discord.ButtonBuilder()
      .setCustomId('join')
      .setLabel('🎉 Participer\n')
      .setStyle('Success')

    const buttonRow = new Discord.ActionRowBuilder()
      .addComponents(joinButton);
    const message = await interaction.reply({ embeds: [embed], components: [buttonRow], fetchReply: true });

    const updateInterval = setInterval(() => {
      const timeLeftMs = endTime - Date.now();
      if (timeLeftMs <= 0) {
        clearInterval(updateInterval);
        //embed.setDescription(`Le giveaway est terminé !\nGG ! Tu as 24h pour venir en ticket sinon reroll !`);
        //message.edit({ embeds: [embed] });
        return;
      }
      embed.setDescription(`**Être affilié à Sn34KeRz_Off avant le tirage du Giveaway.\nÊtre follow sur kick.**\n\n**Be affiliated with Sn34KeRz_Off before the Giveaway draw.\nBe followed on kick.**\n\n**Temps restant:** **\`${ms(timeLeftMs, { long: true })}\`**\n**Nombre de gagnants:** **\`${winners}\`**\n\n**Participants:** **${participants}**`);
      message.edit({ embeds: [embed], components: [buttonRow] });
    }, 1000);

    const filter = (interaction) => (interaction.customId === 'join' || interaction.customId === 'leave') && interaction.user.id !== bot.user.id;
    const collector = message.createMessageComponentCollector({ filter, time: durationMs });


    collector.on('collect', (interaction) => {
      const user = interaction.user;

      if (interaction.customId === 'join') {
        if (participants.includes(user.id)) {
          const leaveButtonRow = new Discord.ButtonBuilder()
            .setCustomId('leave')
            .setLabel('🎉 Quitter\n')
            .setStyle('Danger');

          const buttonRow = new Discord.ActionRowBuilder()
            .addComponents(leaveButtonRow);
          interaction.reply({ content: `**Tu participes déjà au giveaway !**`, components: [buttonRow], ephemeral: true });
        } else {
          participants.push(user.id);
          interaction.reply({content : `**Tu participes maintenant au giveaway pour** **${prize}** !`, ephemeral: true });
        }
      }
      
      if (interaction.customId === 'leave') {
        if (participants.includes(user.id)) {
          participants = participants.filter((id) => id !== user.id);
          interaction.reply({ content: `**Tu as quitté le giveaway pour** **${prize}** !`, ephemeral: true });
        } else {
          interaction.reply({ content: `**Tu ne participes pas au giveaway !**`, ephemeral: true });
        }
      }
    
      const joinButtonDisabled = joinButton.setDisabled(participants.length >= 10);
    
      buttonRow.components = [joinButtonDisabled];
    
      message.edit({ components: [buttonRow] });
    });
    
    collector.on('end', () => {
      // Choisir des gagnants
      const winnersArray = participants.sort(() => Math.random() - 0.5).slice(0, winners);
    
      // Annoncer les gagnants
      let winnerString = "";
      for (let i = 0; i < winnersArray.length; i++) {
        const winner = bot.users.cache.get(winnersArray[i]);
        winnerString += `${winner}\n`;
      }
    
      embed.setDescription(`**Le giveaway est terminé ! GG aux gagnants :\n${winnerString}\nRejoins-nous vite en ticket pour récupérer ton prix !**`);
      embed.setImage("https://zupimages.net/up/23/14/pmlc.png")
      message.edit({ embeds: [embed], components: [] });
    });
    
    }
    };
    