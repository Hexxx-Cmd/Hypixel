const {
    MessageEmbed
} = require('discord.js');
module.exports = {
    name: 'invite',
    descripition: "sends out the player invite",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Hypixel Bot Invite')
            .setColor('#FFA500')
            .addFields({
                name: 'Bot Invite',
                value: "[Click Here](https://discord.com/oauth2/authorize?client_id=737012972110479451&scope=bot&permissions=3146792)"
            }, {
                name: 'Bot Support Server',
                value: "[Click Here](https://discord.gg/gxpwKyq)"
            }, )
            .setFooter('Bot made by ! DarkNøah🍭#4666')
        message.channel.send(embed)
    }
}