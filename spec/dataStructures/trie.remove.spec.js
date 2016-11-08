const trie = require('../../lib/dataStructures/trie.js');

describe('Given a trie containing the word "Philadelphia"', () => {
  let tree;
  const testValue = 'Philadelphia';
  const testValue2 = 'Phil';

  beforeEach(() => {
    tree = new trie();
    tree.add(testValue);
  });

  afterEach(() => {
    tree = null;
  });

  it('after removing "Phil", the trie should still contain Philadelphia.', () => {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(true);
  });

  it('after removing "Philadelphia", the trie should be empty.', () => {
    tree.remove(testValue);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(Object.keys(tree.head).length).toBe(0);
  });
});

describe('Given a trie containing the words "Philadelphia" and "Phil"', () => {
  let tree;
  const testValue = 'Philadelphia';
  const testValue2 = 'Phil';

  beforeEach(() => {
    tree = new trie();
    tree.add(testValue);
    tree.add(testValue2);
  });

  afterEach(() => {
    tree = null;
  });

  it('after removing "Phil", the trie should still contain Philadelphia.', () => {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(false);
  });

  it('after removing "Philadelphia", the trie should be still contain "Phil".', () => {
    tree.remove(testValue);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(tree.hasWord(testValue2)).toBe(true);
  });

  it('after removing "Philadelphia" and "Phil", the trie should be empty.', () => {
    tree.remove(testValue);
    tree.remove(testValue2);
    expect(tree.hasWord(testValue)).toBe(false);
    expect(tree.hasWord(testValue2)).toBe(false);
    expect(Object.keys(tree.head).length).toBe(0);
  });
});

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


  it(`after deleting ${testValue2}, ${testValue1} & ${testValue5} should still exist`, () => {
    tree.remove(testValue2);
    expect(tree.hasWord(testValue1)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(false);
    expect(tree.hasWord(testValue3)).toBe(true);
    expect(tree.hasWord(testValue5)).toBe(true);
  });


  it(`after deleting ${testValue3} & ${testValue5}, ${testValue1} & ${testValue2} should still exist`, () => {
    tree.remove(testValue3);
    tree.remove(testValue5);
    expect(tree.hasWord(testValue1)).toBe(true);
    expect(tree.hasWord(testValue2)).toBe(true);
    expect(tree.hasWord(testValue3)).toBe(false);
    expect(tree.hasWord(testValue5)).toBe(false);
  });
});

describe('When calling trie.remove() with the word undefined', () => {
  it('the remove() method will throw an exception', () => {
    const tree = new trie();
    expect(tree.remove).toThrow();
  });
});
