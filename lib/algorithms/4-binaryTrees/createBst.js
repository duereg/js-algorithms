function getNode(start, end, array) {
  if (start > end) {
    return undefined;
  }

  const midpoint = Math.floor((end + start) / 2);
  const node = {
    data: array[midpoint]
  };

  if (start !== end) {
    node.left = getNode(midpoint + 1, end, array);
    node.right = getNode(start, midpoint - 1, array);
  }

  return node;
};

function createBst(sourceArray) {
  if (sourceArray === null) {
    return null;
  }

  const start = 0;
  const end = sourceArray.length - 1;

  return getNode(start, end, sourceArray);
};

module.exports = createBst;
