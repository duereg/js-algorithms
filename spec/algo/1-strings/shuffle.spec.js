const shuffle = require("../../../lib/algorithms/1-strings/shuffle.js");

const unshuffled = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('When using shuffle() on an array', function () {
  it('returns the original array', function () {
    expect(shuffle(unshuffled)).toEqual(unshuffled);
  });
});
