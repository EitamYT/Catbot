const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannit un utilisateur')
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('L\'utilisateur à bannir')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
            .setDescription('La raison du bannissement'));

async function execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
        return await interaction.reply({ content: 'Tu n\'as pas la permission de bannir des membres.', ephemeral: true });
    }

    if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) {
        return await interaction.reply({ content: 'Je n\'ai pas la permission de bannir des membres.', ephemeral: true });
    }

    try {
        await interaction.guild.bans.create(user, { reason });

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Utilisateur Banni')
            .setDescription(`L'utilisateur ${user.tag} a été banni avec succès.`)
            .addField('Raison', reason);

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors du bannissement de l\'utilisateur.', ephemeral: true });
    }
}

module.exports = {
    data: command,
    execute,
};
