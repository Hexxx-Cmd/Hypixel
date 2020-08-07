const Hypixel = require('hypixel-api-reborn');

const {
    MessageEmbed
} = require('discord.js');
const player = require('./player');

const hypixel = new Hypixel.Client('19f5dca7-1ac6-4aff-8cb9-52a831b6debd');
module.exports = {
    name: 'friends',
    descripition: "this will be listing the numbers of a user for the amount of friends they currently have!",
    execute(message, args) {

        console.log(args)
        if (!args[0]) return message.channel.send('Please Provide a Guild Name!')
        hypixel.getFriends(args[0]).then(async (friends) => {
            const embed = new MessageEmbed()
                .setTitle('Hypixel Player')
                .setColor("#FFA500")
                .addFields({
                    name: 'Players Friends',
                    value: friends.length
                }, )
                .setFooter('Bot made by ! DarkNøah🍭#4666')
            message.channel.send(embed)
        })
    }
}