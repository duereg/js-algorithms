const createBst = require('../../../lib/algorithms/4-binaryTrees/createBst.js');

describe('Given an array sorted in ascending order, create a binary search tree', function () {
  let array;

  beforeEach(function () {
    array = [];
  });

  it('with a array of size 1', function () {
    array.push(10);

    let bst = createBst(array);

    expect(bst).not.toBe(null);
    expect(bst.data).toBe(10);
  });

  it('with a array of size 2', function () {
    array.push(10);
    array.push(9);

    let bst = createBst(array);

    expect(bst).not.toBe(null);
    expect(bst.data).toBe(10);
    expect(bst.left.data).toBe(9);
  });

  it('with a array of size 3', function () {
    array.push(10);
    array.push(9);
    array.push(8);

    let bst = createBst(array);

    expect(bst).not.toBe(null);
    expect(bst.data).toBe(9);
    expect(bst.left.data).toBe(8);
    expect(bst.right.data).toBe(10);
  });

  it('with a array of size 4', function () {
    array.push(10);
    array.push(9);
    array.push(8);
    array.push(7);

    let bst = createBst(array);

    expect(bst).not.toBe(null);
    expect(bst.data).toBe(9);
    expect(bst.left.data).toBe(8);
    expect(bst.right.data).toBe(10);
  });
});
