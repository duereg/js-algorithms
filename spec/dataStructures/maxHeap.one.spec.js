const maxHeap = require('../../lib/dataStructures/maxHeap.js');

const testValue = 'test_string';

describe('When adding one element to the max heap', function () {
  let list;

  beforeEach(function () {
    list = new maxHeap();
    list.add(testValue);
  });

  it('the maxHeap length should increase by 1', function () {
    expect(list.array.length).toBe(1);
  });

  it('the 1st element of the maxHeap should contain the added value.', function () {
    expect(list.array[0]).toBe(testValue);
  });
});
