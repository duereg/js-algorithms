var linkedList = require("./linkedList.js"); 

var stackQueue = function(){
	this.list = new linkedList();
	this.length = 0;
};

stackQueue.prototype.push = function(data) {
	this.list.add(data);
	this.length++;
};

stackQueue.prototype.pop = function() {
	if(this.isEmpty()) throw "The stack/queue is empty"

	var results = this.peek() 

	this.list.remove(results);
	this.length--;
	return results;
};

stackQueue.prototype.isEmpty = function() {
    return this.length === 0;
}

stackQueue.prototype.clear = function() {
	this.list = new linkedList();
	this.length = 0; 
}

stackQueue.prototype.peek = function() {
    return this.isEmpty() ? null : this.getNext();  
}

module.exports = stackQueue; 