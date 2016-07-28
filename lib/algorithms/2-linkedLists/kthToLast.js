// 2.2 Find kth to last element in a linked list
function kthToLast(k, head) {
  let lagger = head;
  let runner = head;

  for (let i = 0; i < k; i++) {
    if (runner === null) {
      return null;
    }
    runner = runner.next;
  }

  while (runner !== null) {
    lagger = lagger.next;
    runner = runner.next;
  }

  return lagger.data;
};

module.exports = kthToLast;
