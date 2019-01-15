const { BinaryHeap } = require('./binaryHeap');

class minHeap extends BinaryHeap {
  // eslint-disable-next-line class-methods-use-this
  shouldSwap(childData, parentData) {
    return childData < parentData;
  }
}

module.exports = minHeap;
