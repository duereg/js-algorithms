//2.5a: Given two lists, representing numbers is reverse order,
//      Sum the two numbers and return the result as a similar list

var addTwoLists = function(left, right) {
	if (left === undefined) throw new Error("Left is Bad");
	if (right === undefined) throw new Error("Right is Bad");

	var node = {};
	var start = node;
	var remainder = 0;
	var amount = 0;

	while((left != null) || (right != null)) {
		amount = remainder;

		if (left !== null) {
			amount = amount + left.data;
			left = left.next;
		}
		if (right !== null) {
			amount = amount + right.data
			right = right.next;
		}

		node.data = amount % 10;
		node.next = {};
		node = node.next;

		remainder = Math.floor(amount / 10);
	}

	return start;
}

module.exports = addTwoLists;
