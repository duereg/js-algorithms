const stack = require('../../../lib/dataStructures/stack.js');

// 2.7 Given a linked list, determine if you have a palindrome (same backwards or forwards)
function palindrome(head) {
  const myStack = new stack();
  let slow = head;
  let fast = head;

  while ((fast !== null) && (fast.next !== null)) {
    myStack.push(slow.data);
    slow = slow.next;
    fast = fast.next.next;
  }

  // this case covers an odd-numbered list
  if (fast !== null) {
    slow = slow.next;
  }

  while (slow !== null) {
    if (slow.data !== myStack.pop()) {
      return false;
    }
    slow = slow.next;
  }

  return true;
};

module.exports = palindrome;
