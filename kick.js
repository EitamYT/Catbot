const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulse un utilisateur')
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('L\'utilisateur à expulser')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
            .setDescription('La raison de l\'expulsion'));

async function execute(interaction) {
    const user = interaction.options.getUser('utilisateur');
    const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
        return await interaction.reply({ content: 'Tu n\'as pas la permission d\'expulser des membres.', ephemeral: true });
    }

    if (!interaction.guild.me.permissions.has('KICK_MEMBERS')) {
        return await interaction.reply({ content: 'Je n\'ai pas la permission d\'expulser des membres.', ephemeral: true });
    }

    try {
        await user.kick(reason);

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Utilisateur Expulsé')
            .setDescription(`L'utilisateur ${user.tag} a été expulsé avec succès.`)
            .addField('Raison', reason);

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'expulsion de l\'utilisateur.', ephemeral: true });
    }
}

module.exports = {
    data: command,
    execute,
};
