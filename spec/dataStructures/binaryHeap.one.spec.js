const binaryHeap = require('../../lib/dataStructures/binaryHeap');

describe('When adding one element to the binary heap', () => {
  let list;
  const testValue = 'test_string';

  beforeEach(() => {
    list = new binaryHeap();
    list.add(testValue);
  });

  afterEach(() => {
    list = null;
  });

  it('the binary heaps length should increase by 1', () => {
    expect(list.array.length).toBe(1);
  });

  it('the 1st element of the binary heap should contain the added value.', () => {
    expect(list.array[0]).toBe(testValue);
  });
});
