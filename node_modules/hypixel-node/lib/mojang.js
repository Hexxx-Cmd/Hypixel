const phin = require('phin');
const {clean, isUUID} = require('../Util/util');

const HOST = 'https://api.mojang.com'

class Mojang {

        getUUID(username, callback){
            return this.request(`${HOST}/users/profiles/minecraft/${username}`, 'id', callback);
        }

        getName(uuid, callback){
            return this.request(`https://sessionserver.mojang.com/session/minecraft/profile/${clean(uuid)}`, 'name', callback);
        }
        
        getStatus(callback){
            return this.request('https://status.mojang.com/check', null, callback);
        }

        getNameHistory(search, callback){
            if(isUUID(search))
                return this.request(`${HOST}/user/profiles/${search}/names`, null, callback);
            else 
                return this.getUUID(search)
                    .then(uuid => this.request(`${HOST}/user/profiles/${uuid}/names`, null, callback));
        }
                    
    

    request(path, resultField, callback) {
        if (callback) {
            return this.sendRequest(path, resultField, callback);
        }

        return new Promise((resolve, reject) => {
            this.sendRequest(path, resultField, (error, data) => error ? reject(error) : resolve(data))
        });
    }



    sendRequest(path, resultField, callback) {
        phin(path, (error, res) => {
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

            if (data) {
                return callback(error, resultField ? data[resultField] : data);
            }

            return callback(error, data);
        });
    }

}

module.exports = Mojang;
