var binarySearchTree = function() {

	function getBinaryNode(dataToUse) {
		return { left: null, right: null, data: dataToUse }; 
	};

	function bst() {
		this.head = null;
	}

	bst.prototype.add = function(data) {
		if(this.head === null) { 
			this.head = getBinaryNode(data); 
		}
		else {
			this.insert(this.head, data);
		}
	}

	bst.prototype.insert = function(node, data) {
		if(node.data > data ) {
			if (node.left === null) { node.left = getBinaryNode(data); }
			else { this.insert(node.left, data); } 
		} else {
			if (node.right === null) { node.right = getBinaryNode(data); }
			else { this.insert(node.right, data); }
		}
	}

	return bst;
}

module.exports = binarySearchTree();
