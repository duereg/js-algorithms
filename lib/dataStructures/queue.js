var linkedList = require("./linkedList.js"); 

var queue = function(){
	this.list = new linkedList();
	this.length = 0;
};

queue.prototype.add = function(data) {
	this.list.add(data);
	this.length++;
};

queue.prototype.remove = function() {
	if(this.isEmpty()) throw "The queue is empty"

	var results = this.list.start.data;

	this.list.remove(results);
	this.length--;
	return results;
};

queue.prototype.isEmpty = function() {
    return this.length === 0;
}

queue.prototype.peek = function() {
    return this.isEmpty() ? null : this.list.start.data;
}
 
module.exports = queue; 