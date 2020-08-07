const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'count',
    descripition: "sends out the server & user count!",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Hypixel Bot Count')
            .setColor('#FFA500')
            .addFields({
                name: 'User Size:',
                value: `${client.users.cache.size}`
            }, {
                name: 'Server Size:',
                value: `${client.guilds.cache.size}`
            }, )
            .setFooter('Bot made by ! DarkNøah🍭#4666')
        message.channel.send(embed)
    }
}