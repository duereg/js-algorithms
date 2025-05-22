/**
 * @fileoverview Implementation of the HyperLogLog++ algorithm for cardinality estimation.
 */

/**
 * Implements the HyperLogLog++ algorithm for estimating the cardinality of a multiset.
 */
class HyperLogLogPlusPlus {
    /**
     * Correction constant alpha_m factor for m >= 128.
     * For smaller m, specific values are used.
     * alpha_m = 0.7213 / (1 + 1.079 / m)
     */

    /**
     * Precomputed alpha constants for small m values.
     * For m = 16, alpha = 0.673
     * For m = 32, alpha = 0.697
     * For m = 64, alpha = 0.709
     * @private
     */
    static _ALPHA_CONSTANTS = {
        16: 0.673,
        32: 0.697,
        64: 0.709,
    };

    /**
     * The number of bits used from the hash for rho_w calculation.
     * HyperLogLog typically uses 32-bit hash values for this part.
     * @private
     */
    static _HASH_BITS_FOR_RHO_W = 32;


    /**
     * Creates a HyperLogLogPlusPlus instance.
     * @param {object} [options={}] - Configuration options.
     * @param {number} [options.p=14] - The precision parameter, determining the number of registers (m = 2^p).
     *                                    Typically between 4 and 16. Higher p means more accuracy but more memory.
     * @throws {Error} If p is not within the valid range [4, 16].
     */
    constructor(options = {}) {
        this.p = options.p === undefined ? 14 : options.p;

        if (typeof this.p !== 'number' || this.p < 4 || this.p > 16) {
            throw new Error('Precision p must be a number between 4 and 16.');
        }

        this.m = 1 << this.p; // m = 2^p
        this.registers = new Uint8Array(this.m); // Registers initialized to 0
        this.alpha_m = HyperLogLogPlusPlus._ALPHA_CONSTANTS[this.m] || (0.7213 / (1 + 1.079 / this.m));
    }

    /**
     * A simple but effective string hashing function (cyrb53).
     * Produces a 53-bit hash value (as a JavaScript number).
     * While HyperLogLog ideally benefits from strong 64-bit hashes (e.g., MurmurHash3),
     * cyrb53 is a decent pure JavaScript alternative for demonstration.
     * Source: https://github.com/bryc/cyrb53
     * @param {string} str - The string to hash.
     * @param {number} [seed=0] - An optional seed.
     * @returns {number} A 53-bit hash value.
     * @private
     */
    _hash(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        // Combine h1 and h2 to get a 53-bit hash (JavaScript numbers are 64-bit floats, safe up to 2^53-1 for integers)
        // We need to ensure the result is positive.
        // Shift h1 right by 0 to treat it as an unsigned 32-bit integer for the combination.
        return (h2 >>> 0) * 0x100000000 + (h1 >>> 0); // (h2 * 2^32 + h1)
    }


    /**
     * Counts the number of leading zeros in a 32-bit integer's binary representation, plus one.
     * If the value is 0, it means all relevant bits were zero.
     * The maximum rho_w depends on the number of bits considered after `p` bits are used for index.
     * For HLL, this is typically on a 32-bit portion of the hash.
     * @param {number} value - The integer value (derived from hash, after p bits are removed for index).
     * @param {number} maxConsideredBits - The number of bits in `value` to consider for leading zeros (e.g., 32).
     * @returns {number} The count of leading zeros plus one.
     * @private
     */
    _countLeadingZerosPlusOne(value, maxConsideredBits) {
        if (value === 0) {
            return maxConsideredBits + 1; // All bits are zero
        }
        let count = 1;
        // Check bits from most significant downwards
        for (let i = maxConsideredBits - 1; i >= 0; i--) {
            if ((value >>> i) & 1) { // Check if the i-th bit (from right, 0-indexed) is 1
                break; // Found the leftmost '1'
            }
            count++;
        }
        return count;
    }

    /**
     * Adds an item to the HyperLogLog estimator.
     * @param {*} item - The item to add. It will be stringified.
     */
    add(item) {
        const strItem = String(item);
        const hashValue = this._hash(strItem); // Gets a 53-bit hash

        // Split the hash for register index and rho_w calculation.
        // Ensure positive integer representation if parts of hash could be negative.
        // For cyrb53, hashValue is already a positive number up to 2^53-1.

        // Use the lower bits for register index (more variance in lower bits from hash functions)
        // For a 53-bit hash:
        // p bits for index: hashValue & ((1 << p) - 1)
        // Remaining bits for rho_w: hashValue >>> p
        
        const registerIndex = Number(BigInt(hashValue) & (BigInt(this.m) - BigInt(1)));
        
        // Value for rho_w calculation (upper bits, effectively).
        // We need to ensure we take a consistent number of bits for rho_w, e.g., 32.
        // If hashValue is 53 bits, and p is e.g. 14, then hashValue >>> 14 leaves 39 bits.
        // We should cap this or take a specific segment.
        // Let's take the most significant 32 bits from the part shifted by p.
        const valueForRhoW = Number(BigInt(hashValue) >>> BigInt(this.p)); 
        
        // We need a fixed-size window for CLZ, typically 32 bits.
        // Take the lower 32 bits of valueForRhoW (if it's larger than 32 bits).
        const valueForRhoW32 = valueForRhoW & 0xFFFFFFFF; 
        
        const rho_w = this._countLeadingZerosPlusOne(valueForRhoW32, HyperLogLogPlusPlus._HASH_BITS_FOR_RHO_W);

        if (rho_w > this.registers[registerIndex]) {
            this.registers[registerIndex] = rho_w;
        }
    }

    /**
     * Estimates the cardinality of the set.
     * @returns {number} The estimated cardinality.
     */
    estimate() {
        let sum = 0;
        let zeroRegisters = 0;
        for (let i = 0; i < this.m; i++) {
            sum += Math.pow(2, -this.registers[i]);
            if (this.registers[i] === 0) {
                zeroRegisters++;
            }
        }

        const rawEstimate = this.alpha_m * this.m * this.m * (1 / sum);

        // Small range correction (Linear Counting)
        if (rawEstimate <= (5 / 2) * this.m) {
            if (zeroRegisters > 0) {
                // Only apply LinearCounting if there's at least one zero register
                return Math.round(this.m * Math.log(this.m / zeroRegisters));
            } else {
                // If no zero registers but still in small range, HLL estimate is used.
                // This case is rare for typical HLL parameters if estimate is small.
                return Math.round(rawEstimate);
            }
        }

        // Large range correction (specific to 32-bit hash space for rho_w)
        const twoPow32 = Math.pow(2, HyperLogLogPlusPlus._HASH_BITS_FOR_RHO_W);
        if (rawEstimate > (1 / 30) * twoPow32) {
            return Math.round(-twoPow32 * Math.log(1 - rawEstimate / twoPow32));
        }
        
        // No correction needed for intermediate range, or if small range but no zero registers.
        return Math.round(rawEstimate);
    }

    /**
     * Merges another HyperLogLogPlusPlus instance into this one.
     * Both instances must have the same precision parameter 'p'.
     * @param {HyperLogLogPlusPlus} otherHLLPP - The other HyperLogLogPlusPlus instance to merge.
     * @throws {Error} If the precision parameters (p) of the two instances do not match.
     */
    merge(otherHLLPP) {
        if (!(otherHLLPP instanceof HyperLogLogPlusPlus)) {
            throw new Error('Can only merge with another HyperLogLogPlusPlus instance.');
        }
        if (this.p !== otherHLLPP.p) {
            throw new Error('Cannot merge HyperLogLogPlusPlus instances with different precision parameters (p).');
        }

        for (let i = 0; i < this.m; i++) {
            if (otherHLLPP.registers[i] > this.registers[i]) {
                this.registers[i] = otherHLLPP.registers[i];
            }
        }
    }
}

// Example Usage (for testing purposes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HyperLogLogPlusPlus; // Export class for Node.js environment

    // Basic test cases
    try {
        console.log("--- HyperLogLogPlusPlus Basic Tests ---");

        // Test Initialization
        const hll = new HyperLogLogPlusPlus({ p: 14 });
        console.log(`Initialized HLL with p=14, m=${hll.m}, alpha_m=${hll.alpha_m}`);
        
        const hllSmallP = new HyperLogLogPlusPlus({ p: 4 }); // m=16
        console.log(`Initialized HLL with p=4, m=${hllSmallP.m}, alpha_m=${hllSmallP.alpha_m} (Expected alpha: ${HyperLogLogPlusPlus._ALPHA_CONSTANTS[16]})`);


        // Test Hashing and CLZ
        const testHash = hll._hash("test_string");
        console.log(`Hash of "test_string": ${testHash}`);
        
        // Example: p=4, m=16. index uses 4 bits. rho_w uses remaining (e.g., 32 bits from upper part)
        // hash = ... 0000 1xxx ... yyyy (yyyy is 4-bit index)
        // value for CLZ is ... 0000 1xxx ...
        // If valueForRhoW32 = 0b00001010... (leading 4 zeros for a 32-bit view), CLZ+1 should be 5
        console.log(`CLZ+1 for 0 (32 bits): ${hll._countLeadingZerosPlusOne(0, 32)} (Expected: 33)`);
        console.log(`CLZ+1 for 1 (0...01) (32 bits): ${hll._countLeadingZerosPlusOne(1, 32)} (Expected: 32)`);
        console.log(`CLZ+1 for 2 (0...10) (32 bits): ${hll._countLeadingZerosPlusOne(2, 32)} (Expected: 31)`);
        console.log(`CLZ+1 for 0x80000000 (10...0) (32 bits): ${hll._countLeadingZerosPlusOne(0x80000000, 32)} (Expected: 1)`);
        console.log(`CLZ+1 for 0xFFFFFFFF (11...1) (32 bits): ${hll._countLeadingZerosPlusOne(0xFFFFFFFF, 32)} (Expected: 1, then break)`);
         // Correction: CLZ for 0xFFFFFFFF is 0, so CLZ+1 is 1.
        console.log(`CLZ+1 for 0b00001 (value 1, 5 bits relevant): ${hll._countLeadingZerosPlusOne(1, 5)} (Expected: 5)`);


        // Test Add and Estimate
        const hllEstimator = new HyperLogLogPlusPlus({ p: 10 }); // m = 1024
        const numUniqueItems = 10000;
        for (let i = 0; i < numUniqueItems; i++) {
            hllEstimator.add(`item-${i}`);
        }
        // Add some duplicates
        for (let i = 0; i < numUniqueItems / 2; i++) {
            hllEstimator.add(`item-${i}`);
        }
        const estimate = hllEstimator.estimate();
        const error = (Math.abs(estimate - numUniqueItems) / numUniqueItems) * 100;
        console.log(`Added ${numUniqueItems} unique items (with duplicates). Estimated cardinality: ${estimate}. Error: ${error.toFixed(2)}%`);
        // Expected error for p=10 (m=1024) is approx. 1.04 / sqrt(1024) = 1.04 / 32 = 3.25%. So, 2 * 3.25% = 6.5% for 2 stddev.

        // Test Small Range Correction
        const hllSmall = new HyperLogLogPlusPlus({ p: 6 }); // m = 64
        const smallUnique = 30;
        for (let i = 0; i < smallUnique; i++) {
            hllSmall.add(`unique_small_${i}`);
        }
        const smallEstimate = hllSmall.estimate();
        console.log(`Small range: Added ${smallUnique} items. Estimated: ${smallEstimate}. (Uses LinearCounting if zero registers > 0)`);
        // For p=6 (m=64), 5/2 * m = 2.5 * 64 = 160. If estimate <= 160 and zeros > 0, LinearCounting applies.

        // Test Merge
        const hll1 = new HyperLogLogPlusPlus({ p: 8 }); // m = 256
        const hll2 = new HyperLogLogPlusPlus({ p: 8 });
        for (let i = 0; i < 100; i++) hll1.add(`set1-item-${i}`);
        for (let i = 50; i < 150; i++) hll2.add(`set2-item-${i}`); // Overlap [50,99] for set1 items if strings were same

        const hll1Estimate = hll1.estimate();
        const hll2Estimate = hll2.estimate();
        console.log(`HLL1 est: ${hll1Estimate} (100 items)`);
        console.log(`HLL2 est: ${hll2Estimate} (100 items)`);
        
        hll1.merge(hll2);
        const mergedEstimate = hll1.estimate();
        console.log(`Merged HLL est: ${mergedEstimate} (Expected around 150 for distinct items, or more if "set1-item-X" and "set2-item-X" are different)`);
        // The items are distinct string-wise: "set1-item-50" vs "set2-item-50". So total unique is 200.

        const hll3 = new HyperLogLogPlusPlus({p:8});
        const hll4 = new HyperLogLogPlusPlus({p:8});
        for(let i=0; i < 100; ++i) hll3.add(`item-${i}`);
        for(let i=50; i < 150; ++i) hll4.add(`item-${i}`); // 50 overlapping items
        const hll3Est = hll3.estimate();
        const hll4Est = hll4.estimate();
        hll3.merge(hll4);
        const mergedEstActualOverlap = hll3.estimate();
        console.log(`HLL3 est (100 items): ${hll3Est}`);
        console.log(`HLL4 est (100 items, 50 overlap): ${hll4Est}`);
        console.log(`Merged HLL actual overlap (150 unique): ${mergedEstActualOverlap}`);


    } catch (e) {
        console.error("Error during tests:", e);
    }
}
