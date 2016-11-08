const minHeap = require('../../lib/dataStructures/minHeap.js');

describe('When adding two elements to the min heap', () => {
  let list;

  beforeEach(() => {
    list = new minHeap();
    list.add(20);
    list.add(10);
  });

  it('the minHeap length should by 2', () => {
    expect(list.array.length).toBe(2);
  });

  it('the 1st element of the minHeap should be the smallest value of the two.', () => {
    expect(list.array[0]).toBe(10);
  });

  it('and you remove the head, it should be the smallest element.', () => {
    expect(list.removeHead()).toBe(10);
  });
});
