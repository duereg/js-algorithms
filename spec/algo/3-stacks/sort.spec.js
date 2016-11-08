const sort = require('../../../lib/algorithms/3-stacks/sort.js');
const stack = require('../../../lib/dataStructures/stack.js');

describe('When sorting a stack, using only stacks', () => {
  let unsorted;

  beforeEach(() => {
    unsorted = new stack();
  });

  it('a stack of 1 element can be sorted.', () => {
    unsorted.push(10);
    const sorted = sort(unsorted);

    expect(sorted.length).toBe(1);
    expect(sorted.pop()).toBe(10);
  });

  it('a stack of 2 elements can be sorted.', () => {
    unsorted.push(10);
    unsorted.push(20);
    const sorted = sort(unsorted);

    expect(sorted.length).toBe(2);
    expect(sorted.pop()).toBe(20);
  });

  it('a stack of 5 elements can be sorted.', () => {
    unsorted.push(10);
    unsorted.push(20);
    unsorted.push(30);
    unsorted.push(40);
    unsorted.push(50);
    const sorted = sort(unsorted);

    expect(sorted.length).toBe(5);
    expect(sorted.pop()).toBe(50);
    expect(sorted.pop()).toBe(40);
    expect(sorted.pop()).toBe(30);
    expect(sorted.pop()).toBe(20);
  });
});
