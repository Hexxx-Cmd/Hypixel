# Hypixel & Mojang API for Node.js

JS wrapper for the Hypixel and Mojang APIs.

[![NPM](https://nodei.co/npm/hypixel-node.png?mini=true)](https://nodei.co/npm/hypixel-node/)

### Installation

`npm install hypixel-node`

#### Initializing Classes

```javascript
const {Hypixel, Mojang} = require('hypixel-node');
const hypixel = new Hypixel(HYPIXEL_API_KEY);
const mojang = new Mojang();
```




## Hypixel API
### Example

```javascript
const {Hypixel} = require('hypixel-node');
const hypixel = new Hypixel(HYPIXEL_API_KEY);

// With Callbacks
hypixel.getPlayer('Hypixel', (error, player) => {
  if (error) 
      return console.log(error);
  
  console.log(player)
});
  
// Promisified
hypixel.findGuildByPlayer('Hypixel')
    .then( guild => { ... })
    .catch( error => { ... });
```
### Functions
|               	    |           Args   	        |    Returns   	|
|----------------------	|:---------------------:	|:------------:	|
| **getKeyInfo**       	|              	            |    record    	|
| **getBoosters**      	|              	            |   boosters   	|
| **getLeaderboards**  	|              	            | leaderboards 	|
| **getOnlinePlayers** 	|              	            |  playerCount 	|
| **getWatchdogStats** 	|              	            |   [object]   	|
| **getGuildByName**   	|          name   	        |     guild    	|
| **getGuildByPlayer** 	|          uuid   	        |     guild    	|
| **getGuild***         |    id/guildname/uuid/ign  |     guild    	|
| **getFriends**       	|          uuid   	        |    records   	|
| **getSession**       	|          uuid   	        |    session   	|
| **getPlayer**        	|      username/uuid 	    |    player    	|

> *Note: If you use an "ign" with `getGuild`, it will use 3 api calls. 

### Methods
#### These methods are added to certain properties for added functionality.
| Property   |     Method    | Description                                  |   Type  |
|------------|:-------------:|----------------------------------------------|:-------:|
| **player** |    getLevel   | Returns the Hypixel level for the player.    |  Number |
|            |    getRank    | Returns the rank of the player.              |  String |
|            |    isOnline   | Returns 'true' of the player is online.      | Boolean |
|            |               |                                              |         |
| **guild**  | getGuildLevel | Returns information about the guild's level. |  Object |

#### Examples
```js
async () => {
    let player = await hypixel.getPlayer('Hypixel');
    console.log(player.getRank()) // "[OWNER]"
    console.log(player.getRank(false)) // "OWNER"
    console.log(player.getLevel()) // 223
    console.log(player.isOnline()) // false

    let guild = await hypixel.getGuild('RandyGuild');
    console.log(guild.getGuildLevel())
    /*
    {
      level: 4,
      totalExp: 1500000,
      expToNextLevel: 250000
    }
    */
}
```

## Mojang API
### Example

```javascript
const {Mojang} = require('hypixel-node');
const mojang = new Mojang();

// With Callbacks
mojang.getUUID('Hypixel', (error, uuid) => {
  if (error) 
      return console.log(error);
  
  console.log(uuid)
});
  
// Promisified
mojang.getNameHistory('Hypixel')
    .then( guild => { ... })
    .catch( error => { ... });
```
### Functions
|               	    |    Args   	|    Returns   	|
|--------------------	|:---------:	|:------------:	|
| **getUUID**       	|    name    	|     uuid      |
| **getName**      	  |    uuid    	|     name      | 
| **getStatus**  	    |           	|   [object]    |
| **getNameHistory** 	|  name/uuid  |   [object] 	  |




## License
[MIT](https://choosealicense.com/licenses/mit/)