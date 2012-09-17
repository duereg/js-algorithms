/*var isRoute = require("../../../lib/algorithms/4-binaryTrees/isRoute.js"); 
var trie = require("../../../lib/dataStructures/trie.js"); 


describe('When testing a directed graph, determine if there is a route', function () {
	var tree; 

	beforeEach(function() {	
		tree = new trie();
		tree.add("freedom");
		tree.add("courage");	
		tree.add("values");	 
		tree.add("sleep");
	});
 
	it('With the paths "freedom", "courage", "values", and "sleep", A route exists between r and m', function () {   
		expect(isRoute(tree.head, tree.head.f, tree.head.f.r.e.e.d.o.m)).toBe(true);
	});
 
	it('With the paths "freedom", "courage", "values", and "sleep", A route does not exist between f and p', function () {   
		expect(isRoute(tree.head, tree.head.f, tree.head.s.l.e.e.p)).toBe(true);
	});
});
*/