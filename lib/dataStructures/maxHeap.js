const binaryHeap = require('./binaryHeap.js');

function maxHeap() {
  binaryHeap.apply(this, arguments);
}

maxHeap.prototype = new binaryHeap();

maxHeap.prototype.shouldSwap = function (childData, parentData) {
  return childData > parentData;
};

module.exports = maxHeap;
