'use strict';

//2.1 Remove dups from unsorted linked list, recursively
var deDupe = function(head) {
  var current = head;

  while (!!current.next) {
    if (head.data === current.next.data) {
      current.next = current.next.next; //remove dup from list
    } else {
      current = current.next;
    }
  }

  if (!!head.next) {
    deDupe(head.next);
  }

  return head;
};

module.exports = deDupe;
