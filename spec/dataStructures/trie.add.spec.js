const Trie = require('../../lib/dataStructures/trie');

const testValue = 'Philadelphia';
const testValue2 = 'Phil';

describe('Given a trie', () => {
  let tree;

  describe('containing the word "Philadelphia"', () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue);
    });

    it('the tree`s head should only contain one entry', () => {
      expect(Object.keys(tree.head).length).toBe(1);
    });

    it('the tree`s head should contain the property P.', () => {
      expect(tree.head.P).toBeDefined();
    });

    it('the hasWord() method should be able to find Philadelphia', () => {
      expect(tree.hasWord(testValue)).toBe(true);
    });
  });

  describe('containing the words "Philadelphia" and "Phil"', () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue);
      tree.add(testValue2);
    });

    afterEach(() => {
      tree = null;
    });

    it('the tree`s head should only contain one entry', () => {
      expect(Object.keys(tree.head).length).toBe(1);
    });

    it('the tree`s head should contain the property P.', () => {
      expect(tree.head.P).toBeDefined();
    });

    it(`the hasWord() method should be able to find ${testValue}`, () => {
      expect(tree.hasWord(testValue)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue2}`, () => {
      expect(tree.hasWord(testValue2)).toBe(true);
    });
  });

  describe('containing the words "free", "freed", "freedom", and "frees"', () => {
    const testValue1 = 'free';
    const testValue4 = 'freed';
    const testValue3 = 'frees';
    const testValue5 = 'freedom';

    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue1);
      tree.add(testValue4);
      tree.add(testValue3);
      tree.add(testValue5);
    });

    afterEach(() => {
      tree = null;
    });

    it('the tree`s head should contain one entry', () => {
      expect(Object.keys(tree.head).length).toBe(1);
    });

    it('the tree`s head should contain the property f.', () => {
      expect(tree.head.f).toBeDefined();
    });

    it(`the hasWord() method should be able to find ${testValue1}`, () => {
      expect(tree.hasWord(testValue1)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue4}`, () => {
      expect(tree.hasWord(testValue4)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue3}`, () => {
      expect(tree.hasWord(testValue3)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue5}`, () => {
      expect(tree.hasWord(testValue5)).toBe(true);
    });
  });

  describe('containing the words "apple", "banana", and "orange"', () => {
    const testValue1 = 'apple';
    const testValue4 = 'banana';
    const testValue3 = 'orange';

    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue1);
      tree.add(testValue4);
      tree.add(testValue3);
    });

    afterEach(() => {
      tree = null;
    });

    it('the tree`s head should contain three entries', () => {
      expect(Object.keys(tree.head).length).toBe(3);
    });

    it('the tree`s head should contain the property a.', () => {
      expect(tree.head.a).toBeDefined();
    });

    it('the tree`s head should contain the property b.', () => {
      expect(tree.head.b).toBeDefined();
    });

    it('the tree`s head should contain the property o.', () => {
      expect(tree.head.o).toBeDefined();
    });

    it(`the hasWord() method should be able to find ${testValue1}`, () => {
      expect(tree.hasWord(testValue1)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue4}`, () => {
      expect(tree.hasWord(testValue4)).toBe(true);
    });

    it(`the hasWord() method should be able to find ${testValue3}`, () => {
      expect(tree.hasWord(testValue3)).toBe(true);
    });
  });

  describe('where you add(undefined)', () => {
    beforeEach(() => {
      tree = new Trie();
    });

    it('the add() method will throw an exception', () => {
      expect(tree.add).toThrow();
    });
  });

  describe('where you add a valid word, but an undefined or null value', () => {
    beforeEach(() => {
      tree = new Trie();
    });

    it('the add() method will throw an exception', () => {
      expect(() => tree.add('foo', null)).toThrow();
    });
  });
});
