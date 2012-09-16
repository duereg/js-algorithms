//4.1 Determine if a binary tree is balanced

var isBalanced = function(node) {
	var BAD_VALUE = -1;

	return getHeight( 0, node) !== BAD_VALUE;

	function getHeight(n, node) {
		if(node === null) return n;
	
		var leftHeight = getHeight(n+1, node.left);
		if(leftHeight === BAD_VALUE) return BAD_VALUE;

		var rightHeight = getHeight(n+1, node.right);
		if(rightHeight === BAD_VALUE) return BAD_VALUE;
	
		if (Math.abs(leftHeight - rightHeight) > 1) return BAD_VALUE;

		return Math.max(leftHeight, rightHeight);
	};
};

module.exports = isBalanced;