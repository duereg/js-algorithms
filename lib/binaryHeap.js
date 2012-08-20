
var binaryNode = function(data) { 
	this.left  = null;
	this.right = null;
	this.data  = data;
};

var binaryHeap = function(data) {  
	this.array  = [];
	this.length = 0; 

	//todo: add constructor logic (heapify if data is array)
};

binaryHeap.prototype.tryToBubbleUp = function(childIndex, childData) {
	if(childIndex > 0) {
		var parentIndex = getParentIndex(childIndex);
		var parentData = this.array[parentIndex];
		if(childAndParentShouldSwap(childData, parentData)){
			this.array[parentIndex] = childData;
			this.array[childIndex] = parentData;
			tryToBubbleUp(childData, parentIndex);
		}
	}
};

binaryHeap.prototype.add = function(data) {
	if (data === undefined) { throw "data must be valid to add"; }

	var newNode = new binaryNode(data);

	this.array.push(newNode);

	tryToBubbleUp(this.length, data);

	this.length++;
};

linkedList.prototype.remove = function(data) {
	if (data === undefined) { throw "data must be valid to add"; }	
	if (this.start === null) { return; }

	var previous = null;
	var current = this.start;

	while((current !== null) && (current.data !== data )) { 
		previous = current; 
		current = current.next;
	}

	if ( current !== null ) { 
		if (previous === null) {
			this.start = this.start.next;
		}		
		if (current.next === null) {
		  this.end = previous;
		  if(this.end !== null) {
		    this.end.next = null; 
		  }
		}
		if ((previous != null) && (current.next !== null) ) {
			previous.next = current.next;
		}
		this.length--;
	}
};

module.exports = linkedList;