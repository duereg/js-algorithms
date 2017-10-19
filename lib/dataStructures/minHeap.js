const BinaryHeap = require('./binaryHeap');

class minHeap extends BinaryHeap {
  shouldSwap(childData, parentData) {
    return childData < parentData;
  }
}

module.exports = minHeap;
