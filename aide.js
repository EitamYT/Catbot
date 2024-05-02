const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('aide')
    .setDescription('Affiche la liste des commandes disponibles');

async function execute(interaction) {
    // Crée un nouvel embed
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Liste des commandes disponibles')
        .setDescription('Voici la liste des commandes disponibles :')
        .addFields(
            { name: '/ping', value: 'Vérifie la latence du bot.' },
            { name: '/aide', value: 'Affiche la liste des commandes disponibles.' },
            { name: '/kick', value: 'Expulse un utilisateur du serveur.' },
            { name: '/ban', value: 'Bannit un utilisateur du serveur.' },
            { name: '/deban', value: 'Débannit un utilisateur du serveur.' }
            // Ajoute d'autres commandes ici si nécessaire
        );

    // Envoie l'embed en réponse à l'interaction
    await interaction.reply({ embeds: [embed] });
}

module.exports = {
    data: command,
    execute,
};
