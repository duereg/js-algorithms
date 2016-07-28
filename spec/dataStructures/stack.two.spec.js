const stack = require('../../lib/dataStructures/stack.js');

const testValue1 = 'test_string1';
const testValue2 = 'test_string2';

describe('When pushing two elements to a stack', function () {
  let myStack;

  beforeEach(function () {
    myStack = new stack();
    myStack.push(testValue1);
    myStack.push(testValue2);
  });

  it('the stack`s length should be 2', function () {
    expect(myStack.length).toBe(2);
  });

  describe('then popping an element', function () {
    let result;

    beforeEach(function () {
      result = myStack.pop();
    });

    it('the stack`s length should be 1', function () {
      expect(myStack.length).toBe(1);
    });

    it('the element popped should be the last element added.', function () {
      expect(result).toBe(testValue2);
    });
  });

  describe('then popping 2 elements', function () {
    let result1, result2;

    beforeEach(function () {
      result1 = myStack.pop();
      result2 = myStack.pop();
    });

    it('the stack`s length should be 0', function () {
      expect(myStack.length).toBe(0);
    });

    it('the elements popped should be in the inverse order to which they were added.', function () {
      expect(result1).toBe(testValue2);
      expect(result2).toBe(testValue1);
    });
  });
});
