//2.4 Partition a linked list around a value x, where the values on the left 
//    are less than x, and the values on the right are greater than or equal
//    to x.

var partition = function(head, x) {
	if (head === null) throw "Head is badful.";

	var leftStart = null;
	var leftEnd = null;
	var rightEnd = null;
	var rightStart = null;
	var current = head;

	while ( current != null ) {

		var next = current.next;
		current.next = null;

		if ( current.data <  x ) {
			if (leftStart === null) {
				leftStart = current;
				leftEnd = current; 
			} else {
				leftEnd.next = current;
				leftEnd = current;
			}
		} else {
			if (rightStart === null) {
				rightStart = current;
				rightEnd = current;
			} else {
				rightEnd.next = current;
				rightEnd = current;
			}
		}

		current = next;
	} 

	if(leftEnd != null) {
		leftEnd.next = rightStart;
	} else {
		leftStart = rightStart;
	}
	
	return leftStart;
};

module.exports = partition;