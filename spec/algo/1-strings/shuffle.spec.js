const shuffle = require('../../../lib/algorithms/1-strings/shuffle');

const unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('When using shuffle() on an array', () => {
  it('returns the original array', () => {
    expect(shuffle(unshuffled)).toEqual(unshuffled);
  });
});
