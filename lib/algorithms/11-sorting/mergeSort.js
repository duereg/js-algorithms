function merge(arrayToSort, low, middle, high) {
  let helper = [arrayToSort.length];
  let helperLeft = low;
  let helperRight = middle + 1;
  let current = low;

  for (let i = low; i <= high; i++) {
    helper[i] = arrayToSort[i];
  }

  while ((helperLeft <= middle) && (helperRight <= high)) {
    if (helper[helperLeft] <= helper[helperRight]) {
      arrayToSort[current] = helper[helperLeft];
      helperLeft++;
    } else {
      arrayToSort[current] = helper[helperRight];
      helperRight++;
    }
    current++;
  }

  const remaining = middle - helperLeft;

  for (let j = 0; j <= remaining; j++) {
    arrayToSort[current + j] = helper[helperLeft + j];
  }
}

function mergeSort(arrayToSort, low, high) {
  if (low < high) {
    const middle = Math.floor((low + high) / 2);

    mergeSort(arrayToSort, low, middle);
    mergeSort(arrayToSort, middle + 1, high);
    merge(arrayToSort, low, middle, high);
  }
}

module.exports = mergeSort;
