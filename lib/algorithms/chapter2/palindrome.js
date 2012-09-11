//2.7 Given a linked list, determine if you have a palindrome (same backwords or forwards)

var stack = require("../../../lib/dataStructures/stack.js"); 

var palindrome = function(head) { 

	var myStack = new stack();
	var slow = head;
	var fast = head;

	while((fast !== null) && (fast.next !== null)) {
		myStack.push(slow.data);
		slow = slow.next;
		fast = fast.next.next;
	}

	//this case covers an odd-numbered list
	if(fast !== null) {
		slow = slow.next;
	}

	while(slow !== null) {
		if(slow.data !== myStack.pop())
			return false;
		slow = slow.next;
	}

	return true;
};

module.exports = palindrome;