var towerOfHanoi = require("../../../lib/algorithms/3-stacks/hanoi.js");
var stack = require("../../../lib/dataStructures/stack.js"); 

describe('When dealing with the Tower of Hanoi', function () {

    var target;
    var helper;
    var source;

    beforeEach(function() {     
        target = new stack();
        helper = new stack();
        source = new stack();
    });
    it("null is less than 1", function() {
        expect(null < 1).toBe(true);
    });

    it('the source stack, starting with 1 element, ends up having 0 elements', function () { 
        test(1);
        expect(source.length).toBe(0);
    }); 
    it('the helper stack, starting with 0 elements, ends up having 0 elements', function () { 
        test(1);
        expect(helper.length).toBe(0);
    }); 
    it('the target stack, starting with 0 elements, ends up having 1 element', function () { 
        test(1);
        expect(target.length).toBe(1);
    }); 

    it('the source stack, starting with 2 elements, ends up having 0 elements', function () { 
        test(2);
        expect(source.length).toBe(0);
    }); 
    it('the helper stack, starting with 0 elements, ends up having 0 elements', function () { 
        test(2);
        expect(helper.length).toBe(0);
    }); 
    it('the target stack, starting with 0 elements, ends up having 2 elements', function () { 
        test(2);
        expect(target.length).toBe(2);
    }); 

    it('the source stack, starting with 3 elements, ends up having 0 elements', function () { 
        test(3);
        expect(source.length).toBe(0);
    }); 
    it('the helper stack, starting with 0 elements, ends up having 0 elements', function () { 
        test(3);
        expect(helper.length).toBe(0);
    }); 
    it('the target stack, starting with 0 elements, ends up having 3 elements', function () { 
        test(3);
        expect(target.length).toBe(3);
    }); 

    function test(number) {

        for(var i = number; i > 0; i--)
        source.push(i);

        towerOfHanoi(source, helper, target); 
    }
 
});