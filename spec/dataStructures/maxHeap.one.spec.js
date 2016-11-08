const maxHeap = require('../../lib/dataStructures/maxHeap.js');

const testValue = 'test_string';

describe('When adding one element to the max heap', () => {
  let list;

  beforeEach(() => {
    list = new maxHeap();
    list.add(testValue);
  });

  it('the maxHeap length should increase by 1', () => {
    expect(list.array.length).toBe(1);
  });

  it('the 1st element of the maxHeap should contain the added value.', () => {
    expect(list.array[0]).toBe(testValue);
  });
});
