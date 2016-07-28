const BinaryHeap = require('./binaryHeap.js');

function maxHeap() {
  BinaryHeap.apply(this, arguments);
}

maxHeap.prototype = new BinaryHeap();
maxHeap.prototype.shouldSwap = (childData, parentData) => childData > parentData;

module.exports = maxHeap;
