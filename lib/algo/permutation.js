//1.3) Given two strings, is one a permutation of the other?
var isPermutation = function(one, two) {
	if (typeof one !== "string") throw "The given word is not a string";
	if (typeof two !== "string") throw "The given word is not a string";
	if (one.length != two.length) return false;

	var letters = [];

	for (var i = 0; i < one.length; i++) {
		letters[one[i].charCodeAt()] = letters[one[i].charCodeAt()] || 0 + 1;
	}
	
	for (var i = 0; i < two.length; i++) {
		letters[two[i].charCodeAt()] = letters[two[i].charCodeAt()] || 0 - 1;
		if(letters[two[i].charCodeAt()] < 0) return false;
	} 

	return true;
};

module.exports = isPermutation;