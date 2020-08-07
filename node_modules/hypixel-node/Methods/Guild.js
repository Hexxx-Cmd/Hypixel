module.exports = {
    getGuildLevel: function(){
        let level, neededEXP;
        const exp = this.exp;
        const lvls = [
            {"level": 1,  "totalEXP": 100000},
            {"level": 2,  "totalEXP": 250000},
            {"level": 3,  "totalEXP": 500000}, 
            {"level": 4,  "totalEXP": 1000000}, 
            {"level": 5,  "totalEXP": 1750000}, 
            {"level": 6,  "totalEXP": 2750000},
            {"level": 7,  "totalEXP": 4000000}, 
            {"level": 8,  "totalEXP": 5500000},
            {"level": 9,  "totalEXP": 7500000}, 
            {"level": 10, "totalEXP": 10000000},
            {"level": 11, "totalEXP": 12500000},
            {"level": 12, "totalEXP": 15000000},
            {"level": 13, "totalEXP": 17500000},
            {"level": 14, "totalEXP": 20000000}
        ] 
        if (exp > 20000000)
            for (let y = 14; y < 45; y++)
                lvls.push({
                    "level": y + 1,
                    "totalEXP": lvls[y - 1].totalEXP + 3000000
                })

        for (x = 0; x < lvls.length; x++) {
            if (exp < lvls[x].totalEXP) {
                level = lvls[x - 1].level;
                neededEXP = lvls[x].totalEXP - exp;
                break;
            }

        }
        
        return {"level": level, "totalExp": exp, "expToNextLevel": neededEXP }
    },
}