const BinaryHeap = require('./binaryHeap');

class maxHeap extends BinaryHeap {

  shouldSwap(childData, parentData) {
    return childData > parentData;
  }

}

module.exports = maxHeap;
