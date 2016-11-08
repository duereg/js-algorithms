const compress = require('../../../lib/algorithms/1-strings/compress.js');

const preCompress1 = 'aaabbbccccddeeeee';
const postCompress1 = 'a3b3c4d2e5';

const preCompress2 = 'aaabbbccccddeeeeez';
const postCompress2 = 'a3b3c4d2e5z1';

const preCompress3 = 'zaaabbbccccddeeeee';
const postCompress3 = 'z1a3b3c4d2e5';

const uncompressable = 'asdfghjklzxcvbnm';

describe('When using compress() on a string', () => {
  it('if the string is compressible, a new compressed string will be returned.', () => {
    expect(compress(preCompress1)).toEqual(postCompress1);
  });

  it('if the string is compressible, and has a different character at the end, a new compressed string will be returned.', () => {
    expect(compress(preCompress2)).toEqual(postCompress2);
  });

  it('if the string is compressible, and has a different character at the beginning, a new compressed string will be returned.', () => {
    expect(compress(preCompress3)).toEqual(postCompress3);
  });

  it('if a string is not compressible, the same string will be returned', () => {
    expect(compress(uncompressable)).toEqual(uncompressable);
  });
});
