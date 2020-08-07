const fetch = require("node-fetch");
const url = "https://api.mojang.com";

/**
 * @async
 * 
 * @description Converts minecraft player name to a UUID
 * 
 * @returns {String}
 */
module.exports = async (query) => {
    await fetch(url+"/users/profiles/minecraft/"+query)
    .then(async res => {
        if(res.status == 200) {
            const parsed = await res.json();
            return parsed.id;
        }else {
            throw new Error("Invalid UUID.");
        };
    });
}