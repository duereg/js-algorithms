const mergeSort = require("../../../lib/algorithms/11-sorting/mergeSort.js");

describe('When using MergeSort on an unsorted Array', function () {
  let unsortedLength, unsortedArray, sortedArray;

  beforeEach(function () {
    unsortedArray = [10, 8, 3, 1, 7, 5, 9, 6];
    unsortedLength = unsortedArray.length;
    mergeSort(unsortedArray, 0, unsortedArray.length - 1);
    sortedArray = unsortedArray;
  });

  it('the sorted array will not be null', function () {
    expect(sortedArray).not.toBe(null);
  });

  it('returns a sorted array of the same length', function () {
    expect(sortedArray.length).toEqual(unsortedLength);
  });

  it('the first element will be 1', function () {
    expect(sortedArray[0]).toEqual(1);
  });

  it('the last element will be 10', function () {
    expect(sortedArray[sortedArray.length - 1]).toEqual(10);
  });
})
