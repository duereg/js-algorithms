const quickSort = require("../../../lib/algorithms/11-sorting/quickSort.js");

describe('When using QuickSort on an unsorted Array', function () {
  let unsortedLength, sortedArray;

  beforeEach(function () {
    const unsortedArray = [10, 8, 1, 3, 5, 7, 6, 9];
    unsortedLength = unsortedArray.length;
    quickSort(unsortedArray, 0, unsortedArray.length - 1);
    sortedArray = unsortedArray;
  });

  it('the sorted array will not be null.', function () {
    expect(sortedArray).not.toBe(null);
  });

  it('a sorted array of the same length will be returned.', function () {
    expect(sortedArray.length).toEqual(unsortedLength);
  });

  it('the first element will be 1', function () {
    expect(sortedArray[0]).toEqual(1);
  });

  it('the last element will be 10', function () {
    expect(sortedArray[sortedArray.length - 1]).toEqual(10);
  });
});
