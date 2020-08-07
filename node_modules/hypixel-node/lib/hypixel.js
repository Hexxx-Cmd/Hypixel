const phin = require('phin');
const querystring = require('querystring');
const {clean, isUUID, isGuldID} = require('../Util/util');
const API_HOST = 'https://api.hypixel.net';
const keyRegex = /[a-z0-9]{8}-(?:[a-z0-9]{4}-){3}[a-z0-9]{12}/;
const PM = require('../Methods/Player');
const GM = require('../Methods/Guild');

class Hypixel {

    constructor(keys) {
        switch (typeof keys) {
            case 'string':
                this.keys = [keys].filter(key => keyRegex.test(key));
                break;
            case 'object':
                if(!Array.isArray(keys))
                    throw new Error('Objects are not supported, you must use an array.')
                this.keys = keys.filter(key => keyRegex.test(key));
                break;
            default:
                throw new Error("Keys must be a 'string' or an 'array of keys'.")
        }

        if (this.keys.length === 0) {
            throw new Error('No valid keys were provided.')
        }

        this.currentKey = 0;
    }

    // =============================================================================
    // Methods
    // =============================================================================

    getKeys(){ 
        Object.assign({}, this.keys); 
    }

    getKeyInfo(callback){
        return this.request('key', null, 'record', callback);
    }

    getBoosters(callback){
        return this.request('boosters', null, 'boosters', callback);
    }

    getLeaderboards(callback){
        return this.request('leaderboards', null, 'leaderboards', callback);
    }

    getOnlinePlayers(callback){
        return this.request('playerCount', null, 'playerCount', callback);
    }

    getWatchdogStats(callback){
        return this.request('watchdogstats', null, null, callback);
    }

    getGuildByName(name, callback){
        return this._findGuild('name', name, callback);
    }

    getGuildByPlayer(player, callback){
        return this._findGuild('player', clean(player), callback);
    }

    getFriends(player, callback){
        return this.request('friends', { uuid: player }, 'records', callback);
    }

    getSession(player, callback){
        return this.request('session', { uuid: player }, 'session', callback);
    }

    getPlayer(search, callback){
        return isUUID(search) ? this._getPlayer('uuid', clean(search), callback) : this._getPlayer('name', search, callback);
    }

    _findGuild(field, value, callback){
        return this.request('guild', { [field]: value }, 'guild', callback);
    }

    _getPlayer(field, value, callback){
        return this.request('player', { [field]: value }, 'player', callback);
    }

    getGuild(search, callback){
        
        if(isGuldID(search))
            return this._findGuild('id', search, callback);
        if(isUUID(search))    
            return this._findGuild('player', clean(search), callback);
        
        return this._findGuild('name', search, callback)
            .then(guild => {
                if(guild) return guild;

                return this.getPlayer(search)
                    .then(player => this._findGuild('player', clean(player.uuid), callback))
            })

    }


    // =============================================================================
    // API REQUESTS
    // =============================================================================
    getKey() {
        if (this.keys.length === 0) return null;
        this.currentKey = this.currentKey + 1 < this.keys.length ? this.currentKey + 1 : 0;
        return this.keys[this.currentKey];
    }


    buildPath(path, query = null) {
        const params = query;
        const key = this.getKey();

        const _query = querystring.stringify(Object.assign({}, params, { key }));

        return `${API_HOST}/${path}?${_query}`;
    }


    sendRequest(path, query, resultField, callback) {
        phin(this.buildPath(path, query), (error, res) => {
            if (!res.body) return callback(new Error('No res.body'), null);
            let body = res.body;
            let data = null;
            if (!error) {
                try {
                    data = JSON.parse(body);
                } catch (ex) {
                    return callback(new Error('Request returned invalid json.'), null);
                }
            }

            if (data && data.success) {
                if (resultField === 'player' && data[resultField])
                    return callback(error, resultField ? Object.assign(data[resultField], PM) : data);
                if (resultField === 'guild' && data[resultField])
                    return callback(error, resultField ? Object.assign(data[resultField], GM) : data);
                return callback(error, resultField ? data[resultField] : data);
            }

            return callback(error, data);
        });
    }


    request(path, query, resultField, callback) {
        if (callback) {
            return this.sendRequest(path, query, resultField, callback);
        }

        return new Promise((resolve, reject) => {
            this.sendRequest(path, query, resultField, (error, data) =>
                error ? reject(error) : resolve(data))
        });
    }

}

module.exports = Hypixel;
