const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('deban')
    .setDescription('Débannit un utilisateur')
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('L\'utilisateur à débannir')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
            .setDescription('La raison du débannissement'));

async function execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
        return await interaction.reply({ content: 'Tu n\'as pas la permission de débannir des membres.', ephemeral: true });
    }

    if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
        return await interaction.reply({ content: 'Je n\'ai pas la permission de débannir des membres.', ephemeral: true });
    }

    try {
        await interaction.guild.bans.remove(user, { reason });

        const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Utilisateur Débanni')
            .setDescription(`L'utilisateur ${user.tag} a été débanni avec succès.`)
            .addField('Raison', reason);

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors du débannissement de l\'utilisateur.', ephemeral: true });
    }
}

module.exports = {
    data: command,
    execute,
};
