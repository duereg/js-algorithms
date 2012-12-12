(function() {
	var mergeSort = function(arrayToSort, low, high) {
		if (low < high) {
			var middle = Math.floor((low + high) / 2);
			mergeSort(arrayToSort, low, middle);
			mergeSort(arrayToSort, middle + 1, high);
			merge(arrayToSort, low, middle, high);
		}
	};

	function merge(arrayToSort, low, middle, high) {
		var helper = [arrayToSort.length],
				helperLeft = low,
		 		helperRight = middle + 1,
				current = low;

		for(var i = low; i <= high; i++) {
			helper[i] = arrayToSort[i];
		}

		while(helperLeft <= middle && helperRight <= high) {
			if(helper[helperLeft] <= helper[helperRight]) {
				arrayToSort[current] = helper[helperLeft];
				helperLeft++;
			} else {
				arrayToSort[current] = helper[helperRight];
				helperRight++;
			}
			current++;
		}

		var remaining = middle - helperLeft;
		for(var j = 0; j <= remaining; j++) {
			arrayToSort[current + j] = helper[helperLeft + j];
		}
	}

	module.exports = mergeSort;
})();
