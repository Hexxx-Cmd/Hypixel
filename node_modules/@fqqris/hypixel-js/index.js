const fetch = require("node-fetch");
const url = "https://api.hypixel.net";
const getUuid = require("./utils/getUuid");
const addCommas = require("./utils/addCommas");
const objectToArray = require("./utils/objectToArray");

class HypixelClient {
    constructor(key) {
        if(key) {
            this.key = key;
        }else {
            throw new Error("API key not provided.");
        };
    };

    /*========================================================
                              Methods
    ==========================================================*/
    /**
     * @async
     * 
     * @param {String} uuid Minecraft player id
     * 
     * @returns {Object}
     */
    async getPlayer(uuid) {
        if(uuid.length <= 16) {
            uuid = await getUuid(uuid);
        };

        const res = await fetch(url+"/player?key="+this.key+"&uuid="+uuid);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");
        const parsed = await res.json();

        if(parsed.player == null) throw new Error("Player not found.");
        if(parsed.success == true){
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @param {String} query Search query
     * 
     * @param {String} searchParameter name | player | id
     * 
     * @returns {Object}
     */
    async getGuild(searchParameter, query) {
        let URL;

        switch(searchParameter) {
            case 'name': {
                URL= url+"/guild?key="+this.key+"&name"+query;
            }
            break;
            case 'player': {
                if(query.length <= 16) {
                    query = await getUuid(query);
                    URL= url+"/guild?key="+this.key+"&player="+query;
                };
            };
            break;
            case 'id': {
                if(query.length !== 24) {
                    throw new Error("Invalid guild ID.");
                }
                URL= url+"/guild?key="+this.key+"&id="+query;
            };
            break;
            default: {
                throw new ReferenceError("Guild search parameter is not defined.");
            };
        };

        const res = await fetch(url);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");
        const parsed = await res.json();

        if(parsed.guild == null) throw new Error("Guild not found.");

        if(res.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Gets watchdog stats
     * 
     * @returns {Object}
     */
    async getWatchdogStats(withCommas) {
        if(!withCommas) withCommas = false;
        const res = await fetch(url+"/watchdogstats?key="+this.key);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            if(withCommas == true) {
                return `{"success":true,"watchdog_lastMinute":${addCommas(parsed.watchdog_lastMinute)},"staff_rollingDaily":${addCommas(parsed.staff_rollingDaily)},"watchdog_total":${addCommas(parsed.watchdog_total)},"watchdog_rollingDaily":${addCommas(parsed.watchog_rollingDaily)},"staff_total":${addCommas(parsed.staff_total)}}`
            }
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Returns booster stats
     * 
     * @returns {Object}
     */
    async getBoosters() {
        const res = await fetch(ur+"/boosters?key="+this.key);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success = true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Returns the current hypixel online player count
     * 
     * @param {Boolean} withCommas return player count with commas
     * 
     * @returns {Object}
     */
    async getOnlinePlayers(withCommas) {
        if(!withCommas) withCommas = false;
        const res = await fetch(url+"/playercount?key="+this.key);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            if(withCommas == true) {
                return `{"success":true,"playerCount":${addCommas(parsed.playerCount)}}`;
            }else {
                return parsed;
            };
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Returns a list of the player's friends
     * 
     * @param {query} query Player name or uuid
     * 
     * @returns {Object}
     */
    async getFriends(query) {
        if(query.length <= 16) {
            query = await getUuid(query);
        };

        const res = await fetch(url+"/friends?key="+this.key+"uuid="+query);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.records.length == 0) throw new Error("Player not found or doesn't have any friends.");

        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    async getSkyblockProfiles(query) {
        if(query.length <= 16) {
            query = await getUuid(query);
        };

        const res = await fetch(url+"/player?key="+this.key+"&uuid="+query);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == false) throw new Error(parsed.cause);
        if(parsed.player == null) throw new Error("Player not found.");

        if(!"SkyBlock" in parsed.player.stats) throw new Error("Player hasn't played Skyblock yet.");

        const profiles = Object.values(parsed.player.stats.SkyBlock.profiles);
        
        if(parsed.success == true) {
            return profiles;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description returns skyblock profile stats
     * 
     * @param {String} id skyblock profile id
     * 
     * @returns {Object}
     */
    async getSkyblockProfile(id) {
        const res = await fetch(url+"/skyblock/profile?key="+this.key+"&profile="+id);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == false) throw new Error(parsed.cause);
        if(parsed.profile == null) throw new Error("Profile not found.");

        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description returns news from skyblock
     * 
     * @returns {Object}
     */
    async getSkyblockNews() {
        const res = await fetch(url+"/skyblock/news?key="+this.key);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Returns a list of all skyblock auctions per page
     * 
     * @param {Number} page auctions page number
     * 
     * @returns {Object}
     */
    async getSkyblockAuctions(page) {
        if(!page) page = 0;
        const res = await fetch(url+"/skyblock/auctions?key="+this.key+"&page="+page);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @param {String} searchParameter player | profile | uuid
     * 
     * @param {String} query Search query
     * 
     * @returns {Object} 
     */
    async getSkyblockAuction(searchParameter, query) {
        let URL;

        switch(searchParameter) {
            case "player": {
                URL = url+"/skyblock/auction?key="+this.key+"&player="+query;
            };
            break;
            case "uuid": {
                URL = url+"/skyblock/auction?key="+this.key+"&uuid="+query;
            };
            break;
            case "profile": {
                URL = url+"/skyblock/auction?key="+this.key+"&profile="+query;
            };
            break;
            default: {
                throw new Error("Invalid search parameter provided.");
            };
        };

        const res = await fetch(URL);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.auctions.length == 0) throw new Error("Player not found or doesn't have any auctions.");

        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @description Returns the list of products along with their sell summary, buy summary and quick status.
     * 
     * @returns {Object}
     */
    async getBazaar() {
        const res = await fetch(url+"/skyblock/bazaar?key="+this.key);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };

    /**
     * @async
     * 
     * @param {String} query bazaar product name
     * 
     * @returns {Object}
     */
    async getBazaarProduct(query) {
        const res = await fetch(url+"/skyblock/bazaar/product?key="+this.key+"&productId="+query);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };


    async getStatus(query) {
        if(query.length <= 16) {
            query = await getUuid(query);
        };

        const res = await fetch(url+"/status?key="+this.key+"&uuid="+query);
        if(res.status == 404) throw new Error("Invalid API key.");
        if(res.status !== 200) throw new Error("Cannot GET api.hypixel.net, try again later.");

        const parsed = await res.json();
        if(parsed.success == true) {
            return parsed;
        }else {
            throw new Error(parsed.cause);
        };
    };
}

module.exports = HypixelClient;