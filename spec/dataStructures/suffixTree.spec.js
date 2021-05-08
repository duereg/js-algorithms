const SuffixTree = require('../../lib/dataStructures/suffixTree');

const testValue = 'Philadalphia';
const testValue2 = 'Phil';

describe('Given a SuffixTree', () => {
  let suffixTree;

  beforeAll(() => {
    suffixTree = new SuffixTree();
  });

  afterEach(() => {
    suffixTree.reset();
  });

  describe(`containing the word ${testValue} and ${testValue2}`, () => {
    beforeEach(() => {
      suffixTree.add(testValue);
      suffixTree.add(testValue2);
    });

    it('the tree`s head should contain leaves', () => {
      expect(suffixTree.head.leaves.length).toBeGreaterThan(1);
    });

    it(`the longest Subtring is ${testValue2}`, () => {
      expect(suffixTree.getLongestSubstring()).toBe(testValue2);
    });
  });

  describe(`containing the word ${testValue}`, () => {
    const testValue3 = 'ladal';

    beforeEach(() => {
      suffixTree.add(testValue);
    });

    it(`calling getLongestPalindrome() returns ${testValue3}`, () => {
      expect(suffixTree.getLongestPalindrome()).toBe(testValue3);
    });
  });
});
