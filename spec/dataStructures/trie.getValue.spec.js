const Trie = require('../../lib/dataStructures/trie');

const testValue1 = "apple";
const testValue2 = "banana";
const testValue3 = "cherry";

describe('Given a trie', () => {
  let tree;

  describe(`containing the word "${testValue1}", with the value "${testValue2}"`, () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue1, testValue2);
    });

    it(`getValue() returns "${testValue2}"`, () => {
      expect(tree.getValue(testValue1)).toBe(testValue2);
    });

    it(`the hasWord() method should be able to find ${testValue1}`, () => {
      expect(tree.hasWord(testValue1)).toBe(true);
    });

    describe(`if add() is called again for "${testValue1}", with the value "${testValue3}"`, () => {
      beforeEach(() => {
        tree.add(testValue1, testValue3);
      });

      it(`getValue() returns "${testValue3}"`, () => {
        expect(tree.getValue(testValue1)).toBe(testValue3);
      });

      it(`the hasWord() method should be able to find ${testValue1}`, () => {
        expect(tree.hasWord(testValue1)).toBe(true);
      });

    });
  });
});
