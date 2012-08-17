
var oneWayNode = function(data) { 
	this.next = null;
	this.data = data;
};

var linkedList = function() {  
	this.start = null;
	this.end = null;
	this.length= 0; 

	this.add = function(data) {
		if (data === undefined) { throw "data must be valid to add"; }

		var newNode = new oneWayNode(data);

		if (this.start === null) {
			this.start = newNode
		} else {
			this.end.next = newNode;
		}

		this.length++;
		this.end = newNode;
	};

	this.remove = function(data) {
		if (data === undefined) { throw "data must be valid to add"; }	
		if (this.start === null) { return; }

		var previous = null;
		var current = this.start;

		while( (current !== null) && (current.data !== data )) { 
			previous = current; 
			current = current.next;
		}

		if ( current !== null ) { 
			if (previous === null) {
				this.start = this.start.next;
			}		
			if (current.next === null) {
				this.end = previous;
			}
			if ( (previous != null) && (current.next !== null) ) {
				previous.next = current.next;
			}
			this.length--;
		}
	};
}

module.exports = linkedList;