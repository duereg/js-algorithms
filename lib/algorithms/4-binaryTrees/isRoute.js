//4.2 Given a directed graph, determine if there is a route between two points

var isRoute = function(graph, me, you) {

	return isRoute(me, you) || isRoute(you, me);

	function isRoute(me, you) {
		if(me === null) return false;
		if(me === you) return true;

		for(var i = 0 , len = me.children.length; i < len; i ++) 
		{
			var child = me.children[i];

			if(child.visited !== true) {
				child.visited = true;
				var found = isRoute(child, you);
				if(found === true) return true;
			}
		};

		return false;
	}
};

module.exports = isRoute;