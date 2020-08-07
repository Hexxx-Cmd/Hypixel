const hypixellib = require("node-hypixel")
const hypixel = new hypixellib('19f5dca7-1ac6-4aff-8cb9-52a831b6debd')
const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    descripition: "Tells how many people are in a Queue to join Currently!",
    execute(message, args) {
        console.log(args)
        hypixel.getPlayersCount().then(async (queue) => {
            if (!queue) return;
            const queueembed = new Discord.MessageEmbed()
                .setTitle('Hypixel Players in Queue')
                .setColor('#FFA500')
                .addFields({
                    name: 'Queue:',
                    value: queue.bedwars
                }, )
                .setFooter('Bot made by ! DarkNøah🍭#4666')
            message.channel.send(queueembed)
        })
    }
}