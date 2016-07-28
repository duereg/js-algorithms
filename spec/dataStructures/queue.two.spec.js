const Queue = require("../../lib/dataStructures/queue.js");

const testValue1 = "test_string1"
const testValue2 = "test_string2"

describe('When adding two elements to a Queue', function () {
  let myQueue;

  beforeEach(function () {
    myQueue = new Queue();
    myQueue.add(testValue1);
    myQueue.add(testValue2);
  });

  it('the Queue`s length should be 2', function () {
    expect(myQueue.length).toBe(2);
  });

  describe('then removing an element', function () {
    let result;

    beforeEach(function () {
      result = myQueue.remove();
    });

    it('the Queue`s length should be 1', function () {
      expect(myQueue.length).toBe(1);
    });

    it('the element removed should be the first element added.', function () {
      expect(result).toBe(testValue1);
    });
  });

  describe('then removing 2 elements', function () {
    let result1, result2;

    beforeEach(function () {
      result1 = myQueue.remove();
      result2 = myQueue.remove();
    });

    it('the Queue`s length should be 0', function () {
      expect(myQueue.length).toBe(0);
    });

    it('the elements removed should be in the order to which they were added.', function () {
      expect(result1).toBe(testValue1);
      expect(result2).toBe(testValue2);
    });
  });
});
