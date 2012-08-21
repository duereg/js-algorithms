var binaryHeap = require("./binaryHeap.js"); 

var maxHeap = function() {
	binaryHeap.apply(this, arguments);
};

maxHeap.prototype = new binaryHeap();

maxHeap.prototype.shouldSwap = function(childData, parentData) {
	return parentData < childData;
};

module.exports = maxHeap;