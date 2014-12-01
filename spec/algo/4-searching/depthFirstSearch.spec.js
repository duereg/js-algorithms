var depthFirstSearch = require("../../../lib/algorithms/4-searching/depthFirstSearch.js");
var bst = require("../../../lib/dataStructures/binarySearchTree.js");

describe('Given a binary tree containing the value 16, determine if the depth first search', function () {
    var balanced;
    beforeEach(function() {
      balanced = new bst();
      balanced.add(10);
      balanced.add(5);
      balanced.add(15);
      balanced.add(8);
      balanced.add(2);
      balanced.add(12);
      balanced.add(16);
    });

  it('can find the value 16 in the tree', function () {
    expect(depthFirstSearch(balanced.head, function(value) { return value === 16 })).toBe(true);
  });

  it('cannot find the value 11', function () {
    expect(depthFirstSearch(balanced.head, function(value) { return value === 11 })).toBe(false);
  });

  it('the order of search is correct', function () {
    var matcher = { matcher: function(value) { return value === 16 }};
    spyOn(matcher, "matcher").and.callThrough();

    expect(depthFirstSearch(balanced.head, matcher.matcher)).toBe(true);
    expect(matcher.matcher).toHaveBeenCalledWith(10);
    expect(matcher.matcher).toHaveBeenCalledWith(5);
    expect(matcher.matcher).toHaveBeenCalledWith(15);
    expect(matcher.matcher).toHaveBeenCalledWith(2);
    expect(matcher.matcher).toHaveBeenCalledWith(8);
    expect(matcher.matcher).toHaveBeenCalledWith(12);
    expect(matcher.matcher).toHaveBeenCalledWith(16);
  });
});
