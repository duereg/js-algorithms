const Trie = require('../../lib/dataStructures/trie');

const testValue1 = 'apple';
const testValue2 = 'banana';
const testValue3 = 'cherry';

describe('Given a trie', () => {
  let tree;

  describe(`containing the word "${testValue3}"`, () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue3);
    });

    it(`getPrefix() returns "${testValue3}" for ${testValue3}Pie`, () => {
      expect(tree.getPrefix(`${testValue3}Pie`)).toBe(testValue3);
    });

    it(`getPrefix() returns "${testValue3}" for ${testValue3}`, () => {
      expect(tree.getPrefix(testValue3)).toBe(testValue3);
    });
  });
});
