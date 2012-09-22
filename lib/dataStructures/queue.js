var stackQueue = require("./stackQueue.js"); 

var queue = function() {
	stackQueue.apply(this, arguments);
};

queue.prototype = new stackQueue();

queue.prototype.getNext = function() {
	 return this.list.start.data;	
} 

queue.prototype.add = queue.prototype.push;
queue.prototype.remove = queue.prototype.pop;
  
module.exports = queue; 