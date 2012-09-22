var printSum = require("../../../lib/algorithms/4-binaryTrees/printSum.js"); 
var bst = require("../../../lib/dataStructures/binarySearchTree.js"); 

describe('Given a binary tree and a value, print every path that sums to that number', function () {

	var callsToPrint = 0;
	var sum = 6;	 
	var withSum = { 
		head: {
			data: 1,
			left: {
				data: 2,
				left: {
					data: 3,
					left: {
						data: 3,
						left: null,
						right: null
					},
					right: {
						data: 1,
						left: null,
						right: null
					}
				},
				right: {
					data: 7,
					left: null,
					right: null
				}
			},
			right: {
				data: 5,
				left: {
					data: 1,
					left: null,
					right: null
				},
				right: {
					data: 6,
					left: null,
					right: null
				}
			}
		}
	}; 

	function print(value) { 
		callsToPrint++;
		if (typeof value === 'object') { 
			var total = 0; 
			for(var i = 0, len = value.length; i < len; i++) { 
				total = total + value[i]; 
			}
			expect(total).toEqual(sum);
		} else {
			expect(value).toEqual(sum);
		}
	};

	beforeEach(function() {
		callsToPrint = 0;
	});
 
	it('print() should be called 6 times', function () {   
		printSum(withSum, sum, print); 
		expect(callsToPrint).toEqual(6);
	});

});