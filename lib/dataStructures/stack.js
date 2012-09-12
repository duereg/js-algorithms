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
	if(this.length === 0) throw "The stack is empty"

	var results = this.list.end.data;

	this.list.remove(this.list.end.data);
	this.length--;
	return results;
};

stack.prototype.peek = function() {
    return this.list.end !== null ? this.list.end.data : null;
}
 
module.exports = stack; 