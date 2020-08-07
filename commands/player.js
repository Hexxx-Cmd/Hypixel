const Hypixel = require('hypixel-api-reborn');

const {
    MessageEmbed
} = require('discord.js');

const hypixel = new Hypixel.Client('19f5dca7-1ac6-4aff-8cb9-52a831b6debd');
module.exports = {
    name: 'player',
    descripition: "this is a test to get the Hypixel Stats on Hypixel",
    execute(message, args) {

        console.log(args)
        if (!args[0]) return message.channel.send('Please Provide a Player Name!')
        hypixel.getPlayer(args[0]).then(async (player) => {
            if (!player) return;
            const embed = new MessageEmbed()
                .setTitle('Hypixel Player')
                .setColor('#FFA500')
                .addFields({
                    name: 'Player Name',
                    value: player.nickname
                }, {
                    name: 'Player UUID',
                    value: player.uuid
                }, {
                    name: 'Player Rank',
                    value: player.rank,
                    inline: false
                }, {
                    name: 'Player Level',
                    value: player.level,
                    inline: false
                }, {
                    name: 'Player Karma',
                    value: player.karma,
                    inline: false
                }, {
                    name: 'Player Online',
                    value: player.isOnline,
                    inline: false
                }, )
                .setFooter('Bot made by ! DarkNøah🍭#4666')
            message.channel.send(embed)

        })
    }
}