var stackQueue = require("./stackQueue.js"); 

var stack = function() {
	stackQueue.apply(this, arguments);
};

stack.prototype = new stackQueue();

stack.prototype.getNext = function() {
	 return this.list.end.data;	
} 
 
module.exports = stack; 