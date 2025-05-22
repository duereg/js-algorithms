// lib/algorithms/1-strings/compress.js
// Modernized and simplified logic for clarity and correctness of length check.
function compress(toCompress) {
  if (!toCompress) { // Handles null, undefined, or empty string
    return '';
  }

  const len = toCompress.length;
  if (len === 0) {
    return '';
  }

  let compressedString = '';
  let countConsecutive = 0;

  for (let i = 0; i < len; i++) {
    countConsecutive++;
    // If next char is different than current or it's the end of the string
    if (i + 1 >= len || toCompress[i] !== toCompress[i + 1]) {
      compressedString += toCompress[i] + countConsecutive;
      countConsecutive = 0;
    }
  }

  // Return original if compressed string is longer than original, otherwise return compressed.
  return compressedString.length > len ? toCompress : compressedString;
}

module.exports = compress;
