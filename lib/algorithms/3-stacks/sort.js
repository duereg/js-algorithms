const Stack = require('../../dataStructures/stack');

// 3.6 Sort a stack in ascending order, only using stacks
function sort(toSort) {
  const sorted = new Stack();

  while (toSort.length > 0) {
    const data = toSort.pop();

    while ((sorted.length > 0) && (sorted.peek() > data)) {
      toSort.push(sorted.pop());
    }

    sorted.push(data);
  }

  return sorted;
}

module.exports = sort;
