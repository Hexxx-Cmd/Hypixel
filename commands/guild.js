const Hypixel = require('hypixel-api-reborn');

const {
    MessageEmbed
} = require('discord.js');

const hypixel = new Hypixel.Client('19f5dca7-1ac6-4aff-8cb9-52a831b6debd');
module.exports = {
    name: 'guild',
    descripition: "this is a test to get the Hypixel Stats on Hypixel",
    execute(message, args) {

        console.log(args)
        if (!args[0]) return message.channel.send('Please Provide a Guild Name!')
        hypixel.getGuild('name', args[0]).then(async (guild) => {
            if (!guild) return;
            const embed = new MessageEmbed()
                .setTitle('Hypixel Guild')
                .setColor('#FFA500')
                .addFields({
                    name: 'Guild Name',
                    value: guild.name
                }, {
                    name: 'Guild Description',
                    value: guild.description
                }, {
                    name: 'Guild Level',
                    value: guild.level,
                    inline: false
                }, {
                    name: 'Guild Legacy Rank',
                    value: guild.legacyRank,
                    inline: false
                }, )
                .setFooter('Bot made by ! DarkNøah🍭#4666')
            message.channel.send(embed)
        })

    }
}