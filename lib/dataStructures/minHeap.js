const BinaryHeap = require('./binaryHeap');

function minHeap() {
  BinaryHeap.apply(this, arguments);
}

minHeap.prototype = new BinaryHeap();
minHeap.prototype.shouldSwap = (childData, parentData) => childData < parentData;

module.exports = minHeap;
