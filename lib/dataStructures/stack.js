var linkedList = require("./linkedList.js"); 

var stack = function(){
	this.list = new linkedList();
	this.length = 0;
};

stack.prototype.push = function(data) {
	this.list.add(data);
	this.length++;
};

stack.prototype.pop = function() {
	var results = this.list.end.data;

	this.list.remove(this.list.end.data);
	this.length--;
	return results;
};
 
module.exports = stack; 