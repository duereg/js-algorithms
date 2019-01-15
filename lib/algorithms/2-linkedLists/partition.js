// 2.4 Partition a linked list around a value x, where the values on the left
//    are less than x, and the values on the right are greater than or equal
//    to x.
function partition(head, x) {
  if (head === null) { throw new Error('Head is null'); }

  let leftStart = null;
  let leftEnd = null;
  let rightEnd = null;
  let rightStart = null;
  let current = head;

  while (current) {
    const { next } = current;
    current.next = null;

    if (current.data < x) {
      if (leftStart === null) {
        leftStart = current;
        leftEnd = current;
      } else {
        leftEnd.next = current;
        leftEnd = current;
      }
    } else if (rightStart === null) {
      rightStart = current;
      rightEnd = current;
    } else {
      rightEnd.next = current;
      rightEnd = current;
    }

    current = next;
  }

  if (leftEnd) {
    leftEnd.next = rightStart;
  } else {
    leftStart = rightStart;
  }

  return leftStart;
}

module.exports = partition;
