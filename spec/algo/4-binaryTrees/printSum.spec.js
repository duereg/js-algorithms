const printSum = require('../../../lib/algorithms/4-binaryTrees/printSum.js');
const bst = require('../../../lib/dataStructures/binarySearchTree.js');

const sum = 6;
const withSum = {
  head: {
    data: 1,
    left: {
      data: 2,
      left: {
        data: 3,
        left: { data: 3, left: null, right: null },
        right: { data: 1, left: null, right: null },
      },
      right: { data: 7, left: null, right: null },
    },
    right: {
      data: 5,
      left: { data: 1, left: null, right: null },
      right: { data: 6, left: null, right: null },
    },
  },
};

let callsToPrint = 0;

function print(value) {
  callsToPrint++;
  if (typeof value === 'object') {
    let total = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      total = total + value[i];
    }
    expect(total).toEqual(sum);
  } else {
    expect(value).toEqual(sum);
  }
}

describe('Given a binary tree and a value, print every path that sums to that number', function () {
  beforeEach(function () {
    callsToPrint = 0;
  });

  it('print() should be called 6 times', function () {
    printSum(withSum, sum, print);
    expect(callsToPrint).toEqual(6);
  });
});
