var shuffle = require("../../../lib/algorithms/1-strings/shuffle.js");

describe('When using shuffle() on an array', function () {
  var unshuffled = [1,2,3,4,5,6,7,8,9,10];

  it('returns the original array', function () {
    expect(shuffle(unshuffled)).toEqual(unshuffled);
  });
});
