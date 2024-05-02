const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Vérifie le temps de latence du bot.');

async function execute(interaction) {
    await interaction.reply('Pong !');
}

module.exports = {
    data: command,
    execute,
};
