/**
 * @fileoverview Implementation of the Cuckoo Filter algorithm.
 */

/**
 * Implements a Cuckoo Filter, a probabilistic data structure for approximate set membership testing
 * that supports additions and deletions. It is an alternative to Bloom Filters and often offers
 * better space efficiency, especially at moderate to low false positive rates, and supports deletion.
 */
class CuckooFilter {
    /**
     * Default options for the Cuckoo Filter.
     * @private
     */
    static _DEFAULT_OPTIONS = {
        capacity: 10000,         // Approximate number of items the filter should hold
        fingerprintSize: 8,      // Size of the fingerprint in bits (e.g., 8, 12, 16)
        entriesPerBucket: 4,     // Number of fingerprints each bucket can hold
        maxKicks: 500,           // Maximum number of evictions before declaring the filter full
    };

    /**
     * Hashing function for items (cyrb53 variant for strings).
     * @param {string} str - The string to hash.
     * @param {number} [seed=0] - An optional seed.
     * @returns {number} A 53-bit hash value.
     * @private
     */
    _hashItem(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed;
        let h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return (h2 >>> 0) * 0x100000000 + (h1 >>> 0); // Combine to a 53-bit positive hash
    }

    /**
     * Hashing function for fingerprints. Can be a different seed or a slightly different algorithm
     * to ensure independence from _hashItem for calculating the alternate index.
     * Using _hashItem with a different default seed for simplicity here.
     * @param {number} fingerprint - The fingerprint (number) to hash.
     * @returns {number} A hash value.
     * @private
     */
    _hashFingerprint(fingerprint) {
        // Fingerprints are numbers. Convert to string for consistent hashing with _hashItem.
        // A dedicated numerical hash might be slightly faster but this ensures uniformity.
        // Using a different seed (e.g., 1) from the primary item hash.
        return this._hashItem(String(fingerprint), 1);
    }

    /**
     * Creates a CuckooFilter instance.
     * @param {object} [options={}] - Configuration options.
     * @param {number} [options.capacity=${CuckooFilter._DEFAULT_OPTIONS.capacity}] - Target capacity.
     * @param {number} [options.fingerprintSize=${CuckooFilter._DEFAULT_OPTIONS.fingerprintSize}] - Bits per fingerprint (e.g., 8-16).
     * @param {number} [options.entriesPerBucket=${CuckooFilter._DEFAULT_OPTIONS.entriesPerBucket}] - Fingerprints per bucket (e.g., 2, 4).
     * @param {number} [options.maxKicks=${CuckooFilter._DEFAULT_OPTIONS.maxKicks}] - Max evictions on collision.
     * @throws {Error} If options are invalid.
     */
    constructor(options = {}) {
        const config = { ...CuckooFilter._DEFAULT_OPTIONS, ...options };

        if (typeof config.capacity !== 'number' || config.capacity <= 0) {
            throw new Error('Capacity must be a positive number.');
        }
        if (typeof config.fingerprintSize !== 'number' || config.fingerprintSize < 4 || config.fingerprintSize > 32) {
            // Practical limits: <4 bits too collision-prone, >32 bits fingerprints are large.
            // JS numbers are safe for up to 53 bits, but bitwise ops are on 32-bit signed ints.
            // Storing fingerprints as numbers; if >16 bits, Uint32Array might be considered if TypedArrays are used.
            throw new Error('Fingerprint size must be a number between 4 and 32.');
        }
        if (typeof config.entriesPerBucket !== 'number' || config.entriesPerBucket <= 0) {
            throw new Error('Entries per bucket must be a positive number.');
        }
        if (typeof config.maxKicks !== 'number' || config.maxKicks <= 0) {
            throw new Error('Max kicks must be a positive number.');
        }

        this.fingerprintSize = config.fingerprintSize;
        this.entriesPerBucket = config.entriesPerBucket;
        this.maxKicks = config.maxKicks;

        // Calculate number of buckets. For simplicity, make it a power of 2 for potential bitwise modulo,
        // or ensure it's large enough.
        // numBuckets = ceil(capacity / entriesPerBucket) then nextPowerOf2 or just use as is.
        // Let's use a simple calculation for now, rounding up.
        this.numBuckets = Math.ceil(config.capacity / this.entriesPerBucket);
        // A common practice is to ensure numBuckets is a power of 2 for faster modulo via bitwise AND.
        // Example: this.numBuckets = 1 << Math.ceil(Math.log2(config.capacity / this.entriesPerBucket));
        // For simplicity, direct division and Math.ceil is fine, modulo operator % will be used.

        this.fingerprintMask = (1 << this.fingerprintSize) - 1;

        /**
         * The filter table. An array of buckets. Each bucket is an array of fingerprints.
         * Fingerprints are stored as numbers. 0 could represent an empty slot, or use null/undefined.
         * Using an array of arrays, where inner arrays store fingerprints.
         * @private
         */
        this.buckets = Array.from({ length: this.numBuckets }, () => Array(this.entriesPerBucket).fill(null));
        this.numItems = 0; // Track number of successfully inserted items (approximate due to potential full filter)
    }

    /**
     * Generates a fingerprint for an item.
     * @param {string} itemString - The stringified item.
     * @returns {number} The fingerprint.
     * @private
     */
    _getFingerprint(itemString) {
        const hash = this._hashItem(itemString, 2); // Use a different seed for fingerprint generation
        let fp = hash & this.fingerprintMask;
        // Fingerprint must not be zero (or whatever represents an empty slot)
        if (fp === 0) { // Assuming 0 or null means empty. If using null, fp can be 0.
                        // If buckets are filled with a sentinel like 0 for empty, fp must not be 0.
                        // Our buckets.fill(null) means 0 is a valid fingerprint.
            // fp = 1; // Or some other strategy if 0 is problematic
        }
        return fp;
    }

    /**
     * Calculates the two candidate bucket indices and fingerprint for an item.
     * @param {*} item - The item to process.
     * @returns {{index1: number, index2: number, fingerprint: number}}
     * @private
     */
    _getIndicesAndFingerprint(item) {
        const itemString = String(item);
        const fingerprint = this._getFingerprint(itemString);

        const h1 = this._hashItem(itemString); // Primary hash for index1
        const index1 = h1 % this.numBuckets;

        const hFp = this._hashFingerprint(fingerprint); // Hash of fingerprint for index2 derivation
        // index2 = (index1 XOR hash(fingerprint)) % numBuckets
        // Ensure positive result for XOR if hashes can be negative (JS bitwise ops are on 32-bit signed).
        // Our hash functions return positive numbers, so direct XOR is fine.
        const index2 = (index1 ^ hFp) % this.numBuckets;
        
        // Ensure index2 is positive after modulo if (index1 ^ hFp) was negative.
        // However, our hash functions always produce positive numbers, and numBuckets is positive.
        // So, `val % this.numBuckets` in JS can be negative if `val` is negative.
        // A robust positive modulo: ((val % n) + n) % n
        const positiveModulo = (val, n) => ((val % n) + n) % n;
        
        return {
            index1: positiveModulo(index1, this.numBuckets), // Ensure positive index
            index2: positiveModulo(index2, this.numBuckets), // Ensure positive index
            fingerprint
        };
    }

    /**
     * Attempts to insert a fingerprint into a given bucket.
     * @param {number} bucketIndex - The index of the bucket.
     * @param {number} fingerprint - The fingerprint to insert.
     * @returns {boolean} True if successfully inserted, false if bucket is full.
     * @private
     */
    _insertFingerprintIntoBucket(bucketIndex, fingerprint) {
        const bucket = this.buckets[bucketIndex];
        for (let i = 0; i < this.entriesPerBucket; i++) {
            if (bucket[i] === null) {
                bucket[i] = fingerprint;
                return true;
            }
        }
        return false; // Bucket is full
    }

    /**
     * Checks if a fingerprint is present in a given bucket.
     * @param {number} bucketIndex - The index of the bucket.
     * @param {number} fingerprint - The fingerprint to check.
     * @returns {boolean} True if fingerprint is found, false otherwise.
     * @private
     */
    _isFingerprintInBucket(bucketIndex, fingerprint) {
        const bucket = this.buckets[bucketIndex];
        for (let i = 0; i < this.entriesPerBucket; i++) {
            if (bucket[i] === fingerprint) {
                return true;
            }
        }
        return false;
    }

    /**
     * Removes a fingerprint from a given bucket if present.
     * @param {number} bucketIndex - The index of the bucket.
     * @param {number} fingerprint - The fingerprint to remove.
     * @returns {boolean} True if fingerprint was found and removed, false otherwise.
     * @private
     */
    _removeFingerprintFromBucket(bucketIndex, fingerprint) {
        const bucket = this.buckets[bucketIndex];
        for (let i = 0; i < this.entriesPerBucket; i++) {
            if (bucket[i] === fingerprint) {
                bucket[i] = null; // Mark as empty
                return true;
            }
        }
        return false;
    }

    /**
     * Adds an item to the Cuckoo Filter.
     * @param {*} item - The item to add.
     * @returns {boolean} True if the item was added successfully, false if the filter is full.
     */
    add(item) {
        const { index1, index2, fingerprint } = this._getIndicesAndFingerprint(item);

        if (this._insertFingerprintIntoBucket(index1, fingerprint)) {
            this.numItems++;
            return true;
        }
        if (this._insertFingerprintIntoBucket(index2, fingerprint)) {
            this.numItems++;
            return true;
        }

        // If both buckets are full, start eviction (cuckoo) process
        let currentIndex = Math.random() < 0.5 ? index1 : index2; // Randomly pick one of the initial buckets
        let currentFingerprint = fingerprint;

        for (let kickCount = 0; kickCount < this.maxKicks; kickCount++) {
            const bucket = this.buckets[currentIndex];
            // Randomly choose an entry to evict from the current bucket
            const entryToEvictIndex = Math.floor(Math.random() * this.entriesPerBucket);
            const evictedFingerprint = bucket[entryToEvictIndex];
            
            bucket[entryToEvictIndex] = currentFingerprint; // Place current fingerprint
            currentFingerprint = evictedFingerprint;        // The evicted one becomes current

            // Calculate the alternate index for the newly evicted fingerprint
            const hEvictedFp = this._hashFingerprint(currentFingerprint);
            currentIndex = (currentIndex ^ hEvictedFp) % this.numBuckets;
            currentIndex = ((currentIndex % this.numBuckets) + this.numBuckets) % this.numBuckets; // Ensure positive

            if (this._insertFingerprintIntoBucket(currentIndex, currentFingerprint)) {
                this.numItems++;
                return true;
            }
            // If insertion failed, currentFingerprint remains the one to be re-inserted in the next iteration
        }

        // If maxKicks reached, filter is considered full for this insertion
        // console.warn("CuckooFilter: Max kicks reached, filter is likely full.");
        return false;
    }

    /**
     * Checks if an item might be in the filter.
     * Due to the probabilistic nature, this method can return true for items not actually inserted (false positives),
     * but it will always return true if the item was successfully added and not removed.
     * @param {*} item - The item to check.
     * @returns {boolean} True if the item might be in the filter, false if it is definitely not.
     */
    contains(item) {
        const { index1, index2, fingerprint } = this._getIndicesAndFingerprint(item);
        
        return this._isFingerprintInBucket(index1, fingerprint) || 
               this._isFingerprintInBucket(index2, fingerprint);
    }

    /**
     * Removes an item from the Cuckoo Filter.
     * @param {*} item - The item to remove.
     * @returns {boolean} True if the item was found and removed, false otherwise.
     *                    Note: Can also return true if a different item hashing to the same fingerprint
     *                    and buckets was removed (a consequence of hash collisions for fingerprints).
     */
    remove(item) {
        const { index1, index2, fingerprint } = this._getIndicesAndFingerprint(item);

        if (this._removeFingerprintFromBucket(index1, fingerprint)) {
            this.numItems--;
            return true;
        }
        if (this._removeFingerprintFromBucket(index2, fingerprint)) {
            this.numItems--;
            return true;
        }
        return false;
    }

    /**
     * Gets the current load factor of the filter.
     * @returns {number} The load factor (numItems / (numBuckets * entriesPerBucket)).
     */
    loadFactor() {
        return this.numItems / (this.numBuckets * this.entriesPerBucket);
    }

    /**
     * Gets the approximate number of items currently stored in the filter.
     * @returns {number}
     */
    count() {
        return this.numItems;
    }
}

// Example Usage (for testing purposes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CuckooFilter; // Export class for Node.js environment

    // Basic test cases
    try {
        console.log("--- CuckooFilter Basic Tests ---");

        const filter = new CuckooFilter({ capacity: 100, fingerprintSize: 8, entriesPerBucket: 2, maxKicks: 10 });
        console.log(`Filter initialized. Buckets: ${filter.numBuckets}, Entries/Bucket: ${filter.entriesPerBucket}`);

        console.log("\nTesting Add/Contains:");
        console.log("Add 'apple':", filter.add("apple"));       // true
        console.log("Contains 'apple':", filter.contains("apple")); // true
        console.log("Contains 'banana':", filter.contains("banana"));// false
        console.log("Add 'banana':", filter.add("banana"));     // true
        console.log("Contains 'banana':", filter.contains("banana"));// true
        console.log(`Item count: ${filter.count()}, Load factor: ${filter.loadFactor().toFixed(3)}`);


        console.log("\nTesting Remove:");
        console.log("Remove 'apple':", filter.remove("apple"));     // true
        console.log("Contains 'apple':", filter.contains("apple")); // false (hopefully, if no collision for fingerprint)
        console.log("Remove 'orange':", filter.remove("orange"));   // false
        console.log(`Item count: ${filter.count()}, Load factor: ${filter.loadFactor().toFixed(3)}`);

        console.log("\nTesting Full Filter (approx):");
        let itemsAdded = 0;
        for (let i = 0; i < 150; i++) { // Try to add more than capacity
            if (filter.add(`item-${i}`)) {
                itemsAdded++;
            } else {
                console.log(`Filter reported full after adding item-${i}. Total items added: ${itemsAdded}`);
                break;
            }
        }
        console.log(`Final item count: ${filter.count()}, Load factor: ${filter.loadFactor().toFixed(3)}`);
        console.log("Contains 'item-0':", filter.contains("item-0")); // true, if it wasn't kicked out and failed reinsertion
        console.log("Contains 'item-99':", filter.contains("item-99"));// true, if added before full (depends on actual capacity reached)
        console.log("Contains 'item-149':", filter.contains("item-149"));// false, likely not added


        // Test fingerprint generation and indices
        const item = "testItem";
        const fpDetails = filter._getIndicesAndFingerprint(item);
        console.log(`\nDetails for "${item}": fp=${fpDetails.fingerprint}, i1=${fpDetails.index1}, i2=${fpDetails.index2}`);
        filter.add(item);
        console.log(`Contains "${item}" after add: ${filter.contains(item)}`);


    } catch (e) {
        console.error("Error during tests:", e);
    }
}
