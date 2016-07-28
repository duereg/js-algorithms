// 2.1 Remove dups from unsorted linked list
// this implementation only works for numbers
function deDupe(head) {
  const items = [];
  let current = head;
  items[current.data] = true;

  while (!!current.next) {
    if (items[current.next.data]) {
      current.next = current.next.next; // remove dup from list
    } else {
      items[current.next.data] = true;
      current = current.next;
    }
  }

  return head;
};

module.exports = deDupe;
