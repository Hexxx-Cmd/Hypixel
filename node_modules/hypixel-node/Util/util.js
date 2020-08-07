module.exports = {
    isUUID: (value) => value.replace(/-/g, "").length == 32 ? true : false,
    clean: (uuid) => uuid.replace(/-/g, ""),
    isGuldID: (value) => value.length == 24 ? true : false
} 