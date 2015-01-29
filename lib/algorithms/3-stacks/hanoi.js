'use strict';

//3.3? Solve the tower of hanoi problem
module.exports = function(source, helper, target) {
    source.name = 'source';
    helper.name = 'helper';
    target.name = 'target';

    var moveDisks = function (n, source, helper, target) {
        if (n <= 0 ) { return; }

        moveDisks(n-1, source, target, helper );
        target.push(source.pop());
        moveDisks(n-1, helper, source, target );
    };

    moveDisks(source.length, source, helper, target);
};
