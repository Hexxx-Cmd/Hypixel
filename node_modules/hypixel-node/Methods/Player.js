const playerMethods = {
    getLevel: function() {
        return isNaN(this.networkExp) ? 1 : Number((Math.sqrt(this.networkExp + 15312.5) - 125 / Math.sqrt(2)) / (25 * Math.sqrt(2))).toFixed()
    },

    isOnline: function() {
        return this.lastLogin > this.lastLogout ? true : false;
    },

    getRank: function (formatting = true) {
        if (this.prefix){ 
            rank = this.prefix.replace(/§[0-9|a-z]|\[|\]/g, "")
        }
        
        else if (this.rank && this.rank != 'NORMAL') {
            switch(this.rank){
                case 'MODERATOR':
                    rank = "MOD"; 
                    break;
                case 'YOUTUBER':
                    rank = "Youtuber"; 
                    break;
                case 'HELPER':
                    rank = "Helper"; 
                    break;
                case 'ADMIN':
                    rank = "Admin"; 
                    break;
            }
        }

        else switch (this.newPackageRank) {
                case 'MVP_PLUS':
                    rank = this.monthlyPackageRank && this.monthlyPackageRank == 'SUPERSTAR' ? "MVP++" : "MVP+"; 
                    break;
                case 'MVP':
                    rank = "MVP"; 
                    break;
                case 'VIP_PLUS':
                    rank = "VIP+"; 
                    break;
                case 'VIP':
                    rank = "VIP"; 
                    break;
                default:
                    rank = "";
            }
        return rank == "" ? "" : formatting ? rank : `[${rank}]`
    }
}

module.exports = playerMethods;