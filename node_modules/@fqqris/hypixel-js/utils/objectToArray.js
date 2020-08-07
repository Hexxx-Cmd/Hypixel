/**
 * @async
 * 
 * @description Converts object into an array
 * 
 * @returns {Array}
 */
module.exports = async (obect) => {
    let array = [];

	let object_length = Object.keys(object).length;
	for (let i = 0; i < object_length; i++) {
		array.push(Object.keys(object)[i]);
	}
	return array;
}