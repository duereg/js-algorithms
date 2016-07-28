const minHeap = require('../../lib/dataStructures/minHeap.js');

const testValue = 'test_string';

describe('When adding one element to the min heap', function () {
  let list;

  beforeEach(function () {
    list = new minHeap();
    list.add(testValue);
  });

  it('the minHeap length should increase by 1', function () {
    expect(list.array.length).toBe(1);
  });

  it('the 1st element of the minHeap should contain the added value.', function () {
    expect(list.array[0]).toBe(testValue);
  });
});
