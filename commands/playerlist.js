const hypixellib = require("node-hypixel")
const hypixel = new hypixellib('19f5dca7-1ac6-4aff-8cb9-52a831b6debd')
const Discord = require('discord.js');

module.exports = {
    name: 'playerlist',
    descripition: "Tells how many people are on Hypixel Currently!",
    execute(message, args) {
        console.log(args)
        hypixel.getPlayersCount().then(async (playerscount) => {
            if (!playerscount) return;
            const playercountembed = new Discord.MessageEmbed()
                .setTitle('Hypixel Players Online')
                .setColor('#FFA500')
                .addFields({
                    name: 'Online Players',
                    value: playerscount.playerCount
                }, {
                    name: 'Max Players',
                    value: '100000'
                }, )
                .setFooter('Bot made by ! DarkNøah🍭#4666')
            message.channel.send(playercountembed)
        })
    }
}