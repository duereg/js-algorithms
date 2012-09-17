var createBst = function(sourceArray) {
	if(sourceArray === null) return null;

	var start = 0;
	var end = sourceArray.length - 1;

	console.log("array length: " + sourceArray.length);

	return getNode(start, end, sourceArray);

	function getNode(start, end, array) {
		if(start > end) return undefined;
		
		var midpoint = Math.floor((end + start) / 2);
		var node = { data : array[midpoint] };

		console.log("midpoint: " + midpoint + " value: " + array[midpoint]);

		if(start !== end) {
			node.left = getNode(midpoint + 1, end, array);
			node.right = getNode(start, midpoint - 1, array);
		}

		return node;
	} 
};

module.exports = createBst;