//2.1 Remove dups from unsorted linked list, recursively

var deDupe = function(head) { 

	function start(head) {
		var current = head; 

		while(current.next != null) {
			if(head.data === current.next.data) {
				current.next = current.next.next; //remove dup from list
			} else { 
				current = current.next;
			} 
		}

		if(head.next != null) {
			start(head.next);
		}

		return head;
	};

	return start(head);
};

module.exports = deDupe;