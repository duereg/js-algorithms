const Trie = require('../../lib/dataStructures/trie');

const cher = 'cher';
const cherry = 'cherry';
const cherryPie = 'cherryPie';

describe('Given a trie', () => {
  let tree;

  describe(`containing the word "${cherry}"`, () => {
    beforeEach(() => {
      tree = new Trie();
      tree.add(cherry);
    });

    it(`getPrefix() returns "${cherry}" for ${cherryPie}`, () => {
      expect(tree.getPrefix(cherryPie)).toBe(cherry);
    });

    it(`getPrefix() returns "${cherry}" for ${cherry}`, () => {
      expect(tree.getPrefix(cherry)).toBe(cherry);
    });

    describe(`adding "${cher}"`, () => {
      beforeEach(() => {
        tree.add(cher);
      });

      it(`getPrefix() returns "${cherry}" for ${cherryPie}`, () => {
        expect(tree.getPrefix(cherryPie)).toBe(cherry);
      });

      describe(`removing "${cherry}"`, () => {
        beforeEach(() => {
          tree.remove(cherry);
        });

        it(`getPrefix() returns "${cher}" for ${cherryPie}`, () => {
          expect(tree.getPrefix(cherryPie)).toBe(cher);
        });
      });
    });
  });
});
