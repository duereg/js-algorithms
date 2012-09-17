//TODO: Use binary search tree implementation to test this
/*//4.2 Given a directed graph, determine if there is a route between two points

var isRoute = function(graph, me, you) {

	console.log(me);
	console.log(you);

	return isRoute(me, you) || isRoute(you, me);

	function isRoute(me, you) {
		console.log(me);

		if(me === null) return false;
		if(me === '$') return false;
		if(me === you) return true;

		for(var letter in me) {
			return isRoute(letter, you);
		} 

		return 
	}
};

module.exports = isRoute;*/