const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 'hs!';

const config = require('./config.json')

const fs = require('fs')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(config.botusername);
    console.log(config.botowner);
    console.log(config.prefix);
    console.log(config.version);
    console.log(config.helpcmd);
    console.log(config.updated);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'test') {
        client.commands.get('test').execute(message, args);
    } else if (command === 'player') {
        client.commands.get('player').execute(message, args);
    }
    if (command === 'friends') {
        client.commands.get('friends').execute(message, args);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
    }
    if (command === 'beta') {
        client.commands.get('beta').execute(message, args);
    } else if (command === 'galistic') {
        client.commands.get('galistic').execute(message, args)
    }
    if (command === 'playernames') {
        client.commands.get('playernames').execute(message, args);
    }
    if (command === 'playerlist') {
        client.commands.get('playerlist').execute(message, args);
    }
    if (command === 'consolelog') {
        client.commands.get('consolelog').execute(message, args);
    }
    if (command === 'queue') {
        client.commands.get('queue').execute(message, args);
    }
    if (command === 'cooldown') {
        client.commands.get('cooldown').execute(message, args);
    }
    if (command === 'image') {
        client.commands.get('image').execute(message, args);
    }
    if (command === 'watchdog') {
        client.commands.get('watchdog').execute(message, args);
    }
    if (command === 'invite') {
        client.commands.get('invite').execute(message, args);
    }
    if (command === 'count') {
        client.commands.get('count').execute(message, args);
    }
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'guild') {
        client.commands.get('guild').execute(message, args);
    }
});

client.on('message', message => {
    client.user.setActivity(`${client.guilds.cache.size} Servers || hs!help`, {
        type: 'WATCHING'
    }).catch(console.error);
});

client.login('NzM3MDEyOTcyMTEwNDc5NDUx.Xx3K0Q.L9mqFFOPi7rOX-t3YnOkarmXO9s');