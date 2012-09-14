//3.6 Sort a stack in ascending order, only using stacks
var stack = require("../../../lib/dataStructures/stack.js"); 

var sort = function(toSort) {
	var sorted = new stack();

	while (toSort.length > 0) {
		var data = toSort.pop();

		while ((sorted.length > 0) && (sorted.peek() > data)) {
			toSort.push(sorted.pop());
		}

		sorted.push(data);
	}

	return sorted;
};

module.exports = sort;