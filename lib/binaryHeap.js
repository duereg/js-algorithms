
var binaryHeap = function(data) {  
	this.array  = []; 

	//todo: add constructor logic (heapify if data is array)
};

binaryHeap.prototype.shouldSwap = function(childData, parentData) {
	throw "This method is not implemented. Concrete implementations should implement."
};

binaryHeap.prototype.getParentIndex = function(childIndex) {
	return Math.floor((childIndex - 1) / 2);
};
binaryHeap.prototype.getLeftChild = function (parentIndex) {
	return parentIndex * 2 + 1;
};
binaryHeap.prototype.getRightChild = function (parentIndex){
	return parentIndex * 2 + 2;
};

binaryHeap.prototype.bubbleUp = function(childIndex, childData) {
	if(childIndex > 0) {
		var parentIndex = this.getParentIndex(childIndex);
		var parentData = this.array[parentIndex];
		if (this.shouldSwap(childData, parentData)) {
			this.array[parentIndex] = childData;
			this.array[childIndex] = parentData;
			this.bubbleUp(childData, parentIndex);
		}
	}
};

binaryHeap.prototype.bubbleDown = function(parentIndex, parentData) {
	if(parentIndex < this.array.length) {
		var targetIndex = parentIndex;
		var targetData = parentData;

		var leftChildIndex = this.getLeftChild(parentIndex);
		var rightChildIndex = this.getRightChild(parentIndex);

		if(leftChildIndex < this.array.length) {

			var leftChildData = this.array[leftChildIndex];

			if (this.shouldSwap( targetData, leftChildData)) {
				targetIndex = leftChildIndex;
				targetData = leftChildData;
			}
		}
		
		if(rightChildIndex < this.array.length) {

			var rightChildData = this.array[rightChildIndex];

			if(this.shouldSwap(targetData, rightChildData)) {
				targetIndex = rightChildIndex;
				targetData = rightChildData;
			}
		}

		if(targetIndex !== parentIndex) {
			this.array[parentIndex] = targetData;
			this.array[targetIndex] = parentData;
			this.bubbleDown(targetData, targetIndex);
		} 
	}
};

binaryHeap.prototype.add = function(data) {
	if (data === undefined) { throw "data must be valid to add"; }

	this.array.push(data);
	this.bubbleUp(this.array.length - 1, data);
	this.length++;
};

binaryHeap.prototype.removeHead = function() {
	
	var headNode = this.array[0]; 
	var tailNode = this.array.pop();

	this.array[0] = tailNode; 
	this.bubbleDown(0, tailNode);

	return headNode;
};

module.exports = binaryHeap;