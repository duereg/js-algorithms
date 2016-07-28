const stackQueue = require("../../../lib/algorithms/3-stacks/stackQueue.js");
const stack = require("../../../lib/dataStructures/stack.js");

describe('When dealing with a Queue comprised of two stacks', function () {
  let queue;
  let testItem1 = 1;
  let testItem2 = 2;

  beforeEach(function () {
    queue = new stackQueue();
  });

  it('pushing to the Queue increases the length by 1', function () {
    queue.push(testItem1);
    expect(queue.length).toBe(1);
  });

  it('pushing to the Queue shows the item pushed with peek()', function () {
    queue.push(testItem1);
    expect(queue.peek()).toBe(testItem1);
  });

  it('pushing to the Queue then popping return the original item', function () {
    queue.push(testItem1);
    let result = queue.pop();
    expect(testItem1).toEqual(result);
  });

  it('pushing two items to the Queue increases the length by 2', function () {
    queue.push(testItem1);
    queue.push(testItem2);
    expect(queue.length).toBe(2);
  });

  it('pushing two items to the Queue shows the 1st item pushed with peek()', function () {
    queue.push(testItem1);
    queue.push(testItem2);
    expect(queue.peek()).toBe(testItem1);
  });

  it('pushing two items to the Queue then popping returns the 1st item', function () {
    queue.push(testItem1);
    queue.push(testItem2);
    let result = queue.pop();
    expect(testItem1).toEqual(result);
  });
});
