'use strict';

//2.2 Find kth to last element in a linked list
var kthToLast = function(k, head) {
	var lagger = head;
	var runner = head;

	for (var i = 0; i < k; i++) {
		if (runner === null) {
			return null;
		}
		runner = runner.next;
	}

	while (runner !== null) {
		lagger = lagger.next;
		runner = runner.next;
	}

	return lagger.data;
};

module.exports = kthToLast;
