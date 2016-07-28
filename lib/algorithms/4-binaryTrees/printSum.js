// 4.9 Given a binary tree and a value, print every path that sums to that number
function printSum(tree, sum, print) {
  if (tree === null) {
    return false;
  }
  if (!(print instanceof Function)) {
    throw new Error('Bad print function');
  }
  if (sum < 1) {
    return;
  }

  let totalSum = 0;

  function processQueue(total, sumQueue) {
    while (total > sum) {
      const fromQueue = sumQueue.shift();
      total = total - fromQueue;
    }
    if (total === sum) {
      print(sumQueue);
    }
  }

  function findSum(node, total, sumQueue) {
    if (node === null) { return; }
    const value = node.data;

    if (value > sum) {
      sumQueue = [];
      total = 0;
    } else {
      total = total + value;
      sumQueue.push(value);
      processQueue(total, sumQueue);
    }

    findSum(node.left, total, sumQueue.slice(0));
    findSum(node.right, total, sumQueue.slice(0));
  }

  findSum(tree.head, totalSum, []);

  return totalSum;
}

module.exports = printSum;
