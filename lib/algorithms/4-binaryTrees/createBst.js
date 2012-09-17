var createBst = function(sourceArray) {
	if(sourceArray === null) return null;

	var start = 0;
	var end = sourceArray.length - 1;

	return getNode(start, end, sourceArray);

	function getNode(start, end, array) {
		if(start > end) return undefined;
		
		var midpoint = Math.floor(end - start / 2);
		var node = { data : array[midpoint] };

		if(start !== end) {
			node.right = getNode(start, midpoint - 1, array);
			node.left = getNode(midpoint + 1, end, array);
		}

		return node;
	} 
};

module.exports = createBst;