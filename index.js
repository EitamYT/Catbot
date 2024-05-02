// Import des dépendances Discord.js
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json'); // Assure-toi d'avoir un fichier config.json contenant le token de ton bot
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Création du client Discord.js
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Import des commandes
const pingCommand = require('./ping');
const aideCommand = require('./aide');
const kickCommand = require('./kick');
const banCommand = require('./ban');
const debanCommand = require('./deban');

// Tableau des commandes à enregistrer
const commands = [
    pingCommand.data.toJSON(),
    aideCommand.data.toJSON(),
    kickCommand.data.toJSON(),
    banCommand.data.toJSON(),
    debanCommand.data.toJSON(),
    // Ajoute d'autres commandes ici si nécessaire
];

// Fonction pour enregistrer les commandes
async function registerCommands() {
    const rest = new REST({ version: '9' }).setToken(token);

    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
}

// Événement prêt du client Discord.js
client.once('ready', () => {
    console.log('Bot prêt !');
    registerCommands();

    client.user.setActivity('/aide', { type: 'WATCHING'});

});

// Événement interaction avec une commande
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Exécute la commande correspondante
    if (commandName === 'ping') {
        pingCommand.execute(interaction);
    } else if (commandName === 'aide') {
        aideCommand.execute(interaction);
    } else if (commandName === 'kick') {
        kickCommand.execute(interaction);
    } else if (commandName === 'ban') {
        banCommand.execute(interaction);
    } else if (commandName === 'deban') {
        debanCommand.execute(interaction);
    }
});

// Connexion du client Discord.js
client.login(token);
