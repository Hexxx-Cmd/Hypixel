const Discord = require('discord.js');
const hypixel = require("hypixel-api-nodejs");
var key = '19f5dca7-1ac6-4aff-8cb9-52a831b6debd';
var position = 1;
module.exports = {
    name: 'test',
    descripition: "this is a test command for upcomming commands!!",
    execute(message, args) {
        hypixel.getPlayerByUuid(key, 'da8ac1c348c04dd695df800c29fbddc3').then(player => {   //Retrieve JavaScript Object from request
            var mm = player.player.stats.MurderMystery;   //Get player's Murder Mystery Statistics
         
            console.log(mm.wins);   //Total Murder Mystery wins
            console.log(mm.deaths_mountain_MURDER_CLASSIC);   //Total deaths amount on the Moutain map in the Classic mode
            console.log(mm.quickest_murderer_win_time_seconds_transport);   //Return the quickest time as murderer on the Transport map in seconds
            console.log(mm.packages);   //Return an array of every items/favorite maps this player has
            console.log(mm.wasSpecialRoleLastGame);   //Return a boolean; true if the player has got a special role (Murderer/Detective) the current or last game played; false if the player was Innocent
            console.log(mm.suicides);   //Total suicides in the game
            
        });
    }}