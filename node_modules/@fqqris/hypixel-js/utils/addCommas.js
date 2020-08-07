/**
 * @async
 * 
 * @description Adds commas to long numbers
 * 
 * @returns {String}
 */
module.exports = async (str) => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}