var compress = require("../../../lib/algorithms/1-strings/compress.js");

describe('When using compress() on a string', function() {
	var preCompress1 = "aaabbbccccddeeeee";
	var postCompress1 = "a3b3c4d2e5";

	var preCompress2 = "aaabbbccccddeeeeez";
	var postCompress2 = "a3b3c4d2e5z1";

	var preCompress3 = "zaaabbbccccddeeeee";
	var postCompress3 = "z1a3b3c4d2e5";

	var uncompressable = "asdfghjklzxcvbnm"

	it('if the string is compressible, a new compressed string will be returned.', function() {
		expect(compress(preCompress1)).toEqual(postCompress1);
	});

	it('if the string is compressible, and has a different character at the end, a new compressed string will be returned.', function () {
		expect(compress(preCompress2)).toEqual(postCompress2);
	});

	it('if the string is compressible, and has a different character at the beginning, a new compressed string will be returned.', function () {
		expect(compress(preCompress3)).toEqual(postCompress3);
	});

	it('if a string is not compressible, the same string will be returned', function() {
		expect(compress(uncompressable)).toEqual(uncompressable);
	});
});
