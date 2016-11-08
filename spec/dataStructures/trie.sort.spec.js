const trie = require('../../lib/dataStructures/trie.js');

describe('Given a trie containing the words "free", "freed", "freedom", and "frees"', () => {
  let tree;
  const testValue1 = 'free';
  const testValue2 = 'freed';
  const testValue3 = 'frees';
  const testValue5 = 'freedom';

  beforeEach(() => {
    tree = new trie();
    tree.add(testValue1);
    tree.add(testValue2);
    tree.add(testValue3);
    tree.add(testValue5);
  });

  afterEach(() => {
    tree = null;
  });

  it('the sort() method will return a sorted list of strings in the correct order', () => {
    const sorted = tree.sort();

    expect(sorted.length).toBe(4);
    expect(sorted[0]).toBe(testValue1);
    expect(sorted[1]).toBe(testValue2);
    expect(sorted[2]).toBe(testValue5);
    expect(sorted[3]).toBe(testValue3);
  });
});

describe('Given a trie containing the words "apple", "banana", "cherry", and "fejoya"', () => {
  let tree;
  const testValue1 = 'apple';
  const testValue2 = 'banana';
  const testValue3 = 'cherry';
  const testValue5 = 'fejoya';

  beforeEach(() => {
    tree = new trie();
    tree.add(testValue1);
    tree.add(testValue2);
    tree.add(testValue3);
    tree.add(testValue5);
  });

  afterEach(() => {
    tree = null;
  });

  it('the sort() method will return a sorted list of strings in the correct order', () => {
    const sorted = tree.sort();

    expect(sorted.length).toBe(4);
    expect(sorted[0]).toBe(testValue1);
    expect(sorted[1]).toBe(testValue2);
    expect(sorted[2]).toBe(testValue3);
    expect(sorted[3]).toBe(testValue5);
  });
});
