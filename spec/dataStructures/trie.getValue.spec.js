const Trie = require('../../lib/dataStructures/trie');

const testValue1 = 'apple';
const testValue2 = 'banana';
const testValue3 = 'cherry';

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

  describe(`containing the word "${testValue3}"`, () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(testValue3);
    });

    it(`getValue() returns "${testValue3}"`, () => {
      expect(tree.getValue(testValue3)).toBe(testValue3);
    });

    it(`the hasWord() method should be able to find ${testValue3}`, () => {
      expect(tree.hasWord(testValue3)).toBe(true);
    });

    it(`hasWord() returns false if ${testValue3}Pie is given`, () => {
      expect(tree.hasWord(`${testValue3}Pie`)).toBe(false);
    });

    describe(`if add() is called again for "${testValue3}", with the value "${testValue1}"`, () => {
      beforeEach(() => {
        tree.add(testValue3, testValue1);
      });

      it(`getValue() returns "${testValue1}"`, () => {
        expect(tree.getValue(testValue3)).toBe(testValue1);
      });

      it(`the hasWord() method should be able to find ${testValue3}`, () => {
        expect(tree.hasWord(testValue3)).toBe(true);
      });
    });
  });

  // New test suite for non-existent words
  describe('when getting a value for a non-existent word', () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add('existingWord', 'existingValue');
      tree.add('applepie', 'pieValue');
      tree.add('box', 'boxValue');
    });

    it('should return undefined for a completely non-existent word', () => {
      expect(tree.getValue('nonExistentWord')).toBeUndefined();
    });

    it('should return undefined for a word that is a prefix of an existing word but not a word itself', () => {
      // To ensure this test is valid, 'apple' should not be added independently.
      // If 'apple' was added, this test would fail.
      // The current setup adds 'applepie', so getValue('apple') should be undefined.
      expect(tree.getValue('apple')).toBeUndefined();
    });

    it('should return undefined for a word that is longer than an existing word but shares a prefix', () => {
      expect(tree.getValue('boxer')).toBeUndefined();
    });
  });

  // New test suite for multiple words with distinct custom values
  describe('containing multiple words with distinct custom values', () => {
    const wordData = {
      // Note on 'apple': In this suite, 'apple' is added to a fresh trie.
      // If it were added to a trie already containing 'applepie',
      // it would explicitly make 'apple' a word.
      apple: { value: '🍎' },
      banana: { value: 123 },
      carrot: { value: { type: 'vegetable', color: 'orange' } },
      date: { value: ['d', 'a', 't', 'e'] },
      elderberry: { value: "" }, // Test with empty string as a value
    };

    beforeEach(() => {
      tree = new Trie(); // Fresh trie for this suite
      Object.keys(wordData).forEach((word) => {
        tree.add(word, wordData[word].value);
      });
    });

    it('should return the correct custom value for each word', () => {
      Object.keys(wordData).forEach((word) => {
        expect(tree.getValue(word)).toEqual(wordData[word].value); // Use toEqual for objects/arrays
      });
    });
  });
});
