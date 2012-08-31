//1.4) Write a method to replace all spaces with '%20'.  
function escape(sentence) {
	if (typeof sentence !== "string") throw "The given sentence is not a string";
	var padding = 0;
	var length = sentence.length;

	//turn string into array
	sentence = sentence.split("");

	for(var i = length - 1; (i >= 0) && (sentence[i] === ' '); i--) {
		padding++;
	}
 
	for(var i = length - padding - 1; i >= 0; i--) {
		 
		if(sentence[i] !== ' ') {
			sentence[i + padding] = sentence[i];
		} else {
			sentence[i + padding -2] = '%';
			sentence[i + padding-1] = '2';
			sentence[i + padding] = '0';
			padding = padding - 2;
		} 
	}

	return sentence.join("");
};

module.exports = escape;