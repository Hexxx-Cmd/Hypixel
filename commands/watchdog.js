const {
    Hypixel,
    Mojang
} = require('hypixel-node');
const { get } = require('request');
const mojang = new Mojang();
const Discord = require('discord.js');
const hypixellib = require("node-hypixel");
const { WatchdogStats } = require('hypixel-api-reborn');
const hypixel = new hypixellib("19f5dca7-1ac6-4aff-8cb9-52a831b6debd")

module.exports = {
    name: 'watchdog',
    descripition: "Sends out the watchdog stats!",
    execute(message, args) {
        hypixel.getWatchdogStats().then(async (watchdog) => {
            if (!watchdog) return;
            const queueembed = new Discord.MessageEmbed()
                .setTitle('Watchdog Stats:')
                .setColor('#FFA500')
                .addFields({
                    name: 'Watchdog Success:',
                    value: watchdog.success
                }, {
                    name: 'Watchdog Bans Last Minute:',
                    value: watchdog.watchdog_lastMinute
                }, {
                    name: 'Watchdog Total:',
                    value: watchdog.watchdog_total,
                    inline: false
                }, {
                    name: 'Watchdog Daily Bans:',
                    value: watchdog.watchdog_rollingDaily,
                    inline: false
                }, {
                    name: 'Staff Daily Bans:',
                    value: watchdog.staff_rollingDaily,
                    inline: false
                }, {
                    name: 'Staff Total Bans:',
                    value: watchdog.staff_total,
                    inline: false
                }, )
                
                .setFooter('Bot made by ! DarkNøah🍭#4666')
                message.channel.send(queueembed)
        })}}