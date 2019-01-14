const StackQueue = require('../../../lib/algorithms/3-stacks/stackQueue');

describe('When dealing with a Queue comprised of two stacks', () => {
  let queue;
  const testItem1 = 1;
  const testItem2 = 2;

  beforeEach(() => {
    queue = new StackQueue();
  });

  it('pushing to the Queue increases the length by 1', () => {
    queue.push(testItem1);
    expect(queue.length).toBe(1);
  });

  it('pushing to the Queue shows the item pushed with peek()', () => {
    queue.push(testItem1);
    expect(queue.peek()).toBe(testItem1);
  });

  it('pushing to the Queue then popping return the original item', () => {
    queue.push(testItem1);
    const result = queue.pop();
    expect(testItem1).toEqual(result);
  });

  it('pushing two items to the Queue increases the length by 2', () => {
    queue.push(testItem1);
    queue.push(testItem2);
    expect(queue.length).toBe(2);
  });

  it('pushing two items to the Queue shows the 1st item pushed with peek()', () => {
    queue.push(testItem1);
    queue.push(testItem2);
    expect(queue.peek()).toBe(testItem1);
  });

  it('pushing two items to the Queue then popping returns the 1st item', () => {
    queue.push(testItem1);
    queue.push(testItem2);
    const result = queue.pop();
    expect(testItem1).toEqual(result);
  });
});
