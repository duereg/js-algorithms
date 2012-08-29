var escape = require("../../lib/algo/escape.js"); 

describe('When using escape() on a string', function () {
	
	var preEscape = "A beautiful test string      ";
	var postEscape = "A%20beautiful%20test%20string";
 
	it('a string is generated with no spaces.', function () { 
		expect(escape(preEscape)).not.toContain(' ');
	});

	it('a string is generated with "%20"', function () {  
		expect(escape(preEscape)).toContain('%20');
	});  

	it('the correct value is output', function () {  
		expect(escape(preEscape)).toEqual(postEscape);
	});  
});