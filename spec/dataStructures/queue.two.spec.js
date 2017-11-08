const Queue = require('../../lib/dataStructures/queue');

const testValue1 = 'test_string1';
const testValue2 = 'test_string2';

describe('When adding two elements to a Queue', () => {
  let myQueue;

  beforeEach(() => {
    myQueue = new Queue();
    myQueue
    .push(testValue1)
    .push(testValue2);
  });

  it('the Queue`s length should be 2', () => {
    expect(myQueue.length).toBe(2);
  });

  describe('then removing an element', () => {
    let result;

    beforeEach(() => {
      result = myQueue.pop();
    });

    it('the Queue`s length should be 1', () => {
      expect(myQueue.length).toBe(1);
    });

    it('the element removed should be the first element added.', () => {
      expect(result).toBe(testValue1);
    });
  });

  describe('then removing 2 elements', () => {
    let result1,
      result2;

    beforeEach(() => {
      result1 = myQueue.pop();
      result2 = myQueue.pop();
    });

    it('the Queue`s length should be 0', () => {
      expect(myQueue.length).toBe(0);
    });

    it('the elements removed should be in the order to which they were added.', () => {
      expect(result1).toBe(testValue1);
      expect(result2).toBe(testValue2);
    });
  });
});
