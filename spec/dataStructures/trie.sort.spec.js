const trie = require("../../lib/dataStructures/trie.js");

describe('Given a trie containing the words "free", "freed", "freedom", and "frees"', function () {
  let tree;
  let testValue1 = "free";
  let testValue2 = "freed";
  let testValue3 = "frees";
  let testValue5 = "freedom";

  beforeEach(function () {
    tree = new trie();
    tree.add(testValue1);
    tree.add(testValue2);
    tree.add(testValue3);
    tree.add(testValue5);
  });

  afterEach(function () {
    tree = null;
  });

  it('the sort() method will return a sorted list of strings in the correct order', function () {
    let sorted = tree.sort();

    expect(sorted.length).toBe(4);
    expect(sorted[0]).toBe(testValue1);
    expect(sorted[1]).toBe(testValue2);
    expect(sorted[2]).toBe(testValue5);
    expect(sorted[3]).toBe(testValue3);
  })
});

describe('Given a trie containing the words "apple", "banana", "cherry", and "fejoya"', function () {
  let tree;
  let testValue1 = "apple";
  let testValue2 = "banana";
  let testValue3 = "cherry";
  let testValue5 = "fejoya";

  beforeEach(function () {
    tree = new trie();
    tree.add(testValue1);
    tree.add(testValue2);
    tree.add(testValue3);
    tree.add(testValue5);
  });

  afterEach(function () {
    tree = null;
  });

  it('the sort() method will return a sorted list of strings in the correct order', function () {
    let sorted = tree.sort();

    expect(sorted.length).toBe(4);
    expect(sorted[0]).toBe(testValue1);
    expect(sorted[1]).toBe(testValue2);
    expect(sorted[2]).toBe(testValue3);
    expect(sorted[3]).toBe(testValue5);
  })
});
