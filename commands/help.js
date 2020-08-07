const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'help',
    descripition: "this file is for help cmds for the Hypixel Bot!",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle('Hypixel Bot Help Cmds')
            .setColor('#FFA500')
            .addFields({
                name: 'Bot Invite',
                value: '`hs!invite`**:** Sends the link to invite the bot!'
            },{
                name: 'Player Info',
                value: '`hs!player <ign>`**:** Sends Hypixel Player Stats!'
            }, {
                name: 'Player Friends',
                value: '`hs!friends <ign>`**:** Lists the amount of Friends a player has!'
            }, {
                name: 'Guild Info',
                value: '`hs!guild <guild name>`**:** Gives out Stats of a Guild!',
                inline: false
            }, {
                name: 'Online Players',
                value: '`hs!playerlist` **:** Lists the amount of people that are online on Hypixel!',
                inline: false
            }, {
                name: 'Watchdog Stats',
                value: '`hs!watchdog` **:** Sends out the stats for Watchdog!',
                inline: false
            }, )
            .setFooter('Bot made by ! DarkNøah🍭#4666')
        message.channel.send(embed)



    }
}