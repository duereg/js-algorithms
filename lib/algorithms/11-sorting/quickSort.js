(function() {
	var quickSort = function(arrayToSort, low, high) {
		var index = partition(arrayToSort, low, high);
		
		if(low < index -1)
			quickSort(arrayToSort, low, index - 1);
		
		if(index < high)
			quickSort(arrayToSort, index, high);
	};

	function partition(arrayToSort, low, high) {
		var pivot = arrayToSort[Math.floor((low + high) / 2)];

		while (low <= high){
			while(arrayToSort[low] < pivot) low++;
			while(arrayToSort[high] > pivot) high--;

			if(low <= high) {
				swap(arrayToSort, low, high);
				low++;
				high--; 
			}
		}
		return low;
	}

	function swap(arrayToSort, low, high) {
		var lowValue = arrayToSort[low];
		arrayToSort[low] = arrayToSort[high];
		arrayToSort[high] = lowValue;
	}

	module.exports = quickSort;
})();
