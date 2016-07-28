const binaryHeap = require('./binaryHeap.js');

function minHeap() {
  binaryHeap.apply(this, arguments);
};

minHeap.prototype = new binaryHeap();

minHeap.prototype.shouldSwap = function (childData, parentData) {
  return childData < parentData;
};

module.exports = minHeap;
