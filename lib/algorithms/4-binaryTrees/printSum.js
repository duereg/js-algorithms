//4.9 Given a binary tree and a value, print every path that sums to that number
var queue = require("../../../lib/dataStructures/queue.js"); 

var printSum = function(tree, sum, print) {
    if(tree === null) return false;
    if(!(print instanceof Function)) throw "Bad print function";
    if(sum < 1) return;

    findSum(tree.head, 0, []);

    function findSum(node, total, sumQueue) {

        if(node === null) return;
        var value = node.data;

        if(value > sum) {
            sumQueue = [];
            total = 0;
        }
        else { 
            total = total + value; 
            sumQueue.push(value);
            processQueue(total, sumQueue); 
        }

        findSum(node.left, total, sumQueue.slice(0));
        findSum(node.right, total, sumQueue.slice(0));
    };

    function processQueue(total, sumQueue) {

        while(total > sum) {
            var fromQueue = sumQueue.shift();
            total = total - fromQueue; 
        }
        if (total === sum) {
            print(sumQueue);
        } 
    }
 
};

module.exports = printSum;