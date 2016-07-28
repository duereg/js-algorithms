const trie = require("../../lib/dataStructures/trie.js");

describe('Given a trie containing the word "Philadelphia"', function () {
  let tree;
  let testValue = "Philadelphia"
  let testValue2 = "Phil";

  beforeEach(function () {
    tree = new trie();
    tree.add(testValue);
  });

  afterEach(function () {
    tree = null;
  });

  it('after removing "Phil", the trie should still contain Philadelphia.', function () {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(true);
  });

  it('after removing "Philadelphia", the trie should be empty.', function () {
    tree.remove(testValue);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(Object.keys(tree.head).length).toBe(0);
  });
});

describe('Given a trie containing the words "Philadelphia" and "Phil"', function () {
  let tree;
  let testValue = "Philadelphia"
  let testValue2 = "Phil";

  beforeEach(function () {
    tree = new trie();
    tree.add(testValue);
    tree.add(testValue2);
  });

  afterEach(function () {
    tree = null;
  });

  it('after removing "Phil", the trie should still contain Philadelphia.', function () {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(false);
  });

  it('after removing "Philadelphia", the trie should be still contain "Phil".', function () {
    tree.remove(testValue);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(tree.hasWord(testValue2)).toBe(true);
  });

  it('after removing "Philadelphia" and "Phil", the trie should be empty.', function () {
    tree.remove(testValue);
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(tree.hasWord(testValue2)).toBe(false);
    expect(Object.keys(tree.head).length).toBe(0);
  });
});

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


  it('after deleting ' + testValue2 + ", " + testValue1 + " & " + testValue5 + " should still exist", function () {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue1)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(false);
    expect(tree.hasWord(testValue3)).toBe(true);
    expect(tree.hasWord(testValue5)).toBe(true);
  });



  it('after deleting ' + testValue3 + " & " + testValue5 + ", " + testValue1 + " & " + testValue2 + " should still exist", function () {
    tree.remove(testValue3);
    tree.remove(testValue5);
    expect(tree.hasWord(testValue1)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(true);
    expect(tree.hasWord(testValue3)).toBe(false);
    expect(tree.hasWord(testValue5)).toBe(false);
  });
});

describe("When calling trie.remove() with the word undefined", function () {

  it('the remove() method will throw an exception', function () {
    let tree = new trie();
    expect(tree.remove).toThrow();
  })
});
