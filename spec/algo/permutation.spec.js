var isPermutation = require("../../lib/algo/permutation.js"); 

describe('When comparing two strings using isPermutation() ', function () {
	
	var testValue1 = "test_string_is_so_great";
	var testValue2 = "_t_greing_tssoatestris_";
	var testValue3 = "qwertyuioplkjhgfdsazxcv"
 
	it('that are permutations the method should return true.', function () { 
		expect(isPermutation(testValue1, testValue2)).toBe(true);
	});

	it('that are not permutations the method should return false.', function () {  
		expect(isPermutation(testValue1, testValue3)).toBe(false);
	});  
});