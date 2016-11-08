function swap(arrayToSort, low, high) {
  const lowValue = arrayToSort[low];
  arrayToSort[low] = arrayToSort[high];
  arrayToSort[high] = lowValue;
}

function partition(arrayToSort, low, high) {
  const pivot = arrayToSort[Math.floor((low + high) / 2)];

  while (low <= high) {
    while (arrayToSort[low] < pivot) {
      low++;
    }
    while (arrayToSort[high] > pivot) {
      high--;
    }

    if (low <= high) {
      swap(arrayToSort, low, high);
      low++;
      high--;
    }
  }
  return low;
}

function quickSort(arrayToSort, low, high) {
  const index = partition(arrayToSort, low, high);

  if (low < index - 1) {
    quickSort(arrayToSort, low, index - 1);
  }
  if (index < high) {
    quickSort(arrayToSort, index, high);
  }
}

module.exports = quickSort;
