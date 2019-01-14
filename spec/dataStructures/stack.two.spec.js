const Stack = require('../../lib/dataStructures/stack');

const testValue1 = 'test_string1';
const testValue2 = 'test_string2';

describe('When pushing two elements to a stack', () => {
  let myStack;

  beforeEach(() => {
    myStack = new Stack();
    myStack.push(testValue1);
    myStack.push(testValue2);
  });

  it('the stack`s length should be 2', () => {
    expect(myStack.length).toBe(2);
  });

  describe('then popping an element', () => {
    let result;

    beforeEach(() => {
      result = myStack.pop();
    });

    it('the stack`s length should be 1', () => {
      expect(myStack.length).toBe(1);
    });

    it('the element popped should be the last element added.', () => {
      expect(result).toBe(testValue2);
    });
  });

  describe('then popping 2 elements', () => {
    let result1,
      result2;

    beforeEach(() => {
      result1 = myStack.pop();
      result2 = myStack.pop();
    });

    it('the stack`s length should be 0', () => {
      expect(myStack.length).toBe(0);
    });

    it('the elements popped should be in the inverse order to which they were added.', () => {
      expect(result1).toBe(testValue2);
      expect(result2).toBe(testValue1);
    });
  });
});
