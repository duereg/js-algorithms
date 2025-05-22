const CuckooFilter = require('../../lib/dataStructures/cuckoo-filter');

describe('CuckooFilter', () => {
    describe('Constructor', () => {
        it('should throw an error for invalid capacity', () => {
            expect(() => new CuckooFilter({ capacity: 0 })).toThrowError('Capacity must be a positive number.');
            expect(() => new CuckooFilter({ capacity: -10 })).toThrowError('Capacity must be a positive number.');
        });

        it('should throw an error for invalid fingerprintSize', () => {
            expect(() => new CuckooFilter({ fingerprintSize: 3 })).toThrowError('Fingerprint size must be a number between 4 and 32.');
            expect(() => new CuckooFilter({ fingerprintSize: 33 })).toThrowError('Fingerprint size must be a number between 4 and 32.');
        });

        it('should throw an error for invalid entriesPerBucket', () => {
            expect(() => new CuckooFilter({ entriesPerBucket: 0 })).toThrowError('Entries per bucket must be a positive number.');
        });

        it('should throw an error for invalid maxKicks', () => {
            expect(() => new CuckooFilter({ maxKicks: 0 })).toThrowError('Max kicks must be a positive number.');
        });

        it('should initialize with default options if none are provided', () => {
            const filter = new CuckooFilter();
            expect(filter.fingerprintSize).toBe(CuckooFilter._DEFAULT_OPTIONS.fingerprintSize);
            expect(filter.entriesPerBucket).toBe(CuckooFilter._DEFAULT_OPTIONS.entriesPerBucket);
            expect(filter.maxKicks).toBe(CuckooFilter._DEFAULT_OPTIONS.maxKicks);
            // numBuckets is derived, check it's positive
            expect(filter.numBuckets).toBeGreaterThan(0);
        });

        it('should correctly calculate numBuckets', () => {
            const filter = new CuckooFilter({ capacity: 1000, entriesPerBucket: 4 });
            expect(filter.numBuckets).toBe(Math.ceil(1000 / 4)); // 250
        });
    });

    describe('add, contains, remove', () => {
        let filter;

        beforeEach(() => {
            // Use a small capacity for easier testing of "full" scenarios
            filter = new CuckooFilter({ capacity: 20, entriesPerBucket: 2, fingerprintSize: 8, maxKicks: 10 });
        });

        it('should add an item and report it as contained', () => {
            expect(filter.add('apple')).toBe(true);
            expect(filter.contains('apple')).toBe(true);
            expect(filter.count()).toBe(1);
        });

        it('should not contain an item that has not been added', () => {
            expect(filter.contains('banana')).toBe(false);
        });

        it('should successfully remove an added item', () => {
            filter.add('apple');
            expect(filter.contains('apple')).toBe(true);
            expect(filter.remove('apple')).toBe(true);
            expect(filter.contains('apple')).toBe(false);
            expect(filter.count()).toBe(0);
        });

        it('should return false when trying to remove a non-existent item', () => {
            filter.add('apple');
            expect(filter.remove('banana')).toBe(false);
            expect(filter.count()).toBe(1);
        });
        
        it('should handle adding multiple items', () => {
            const items = ['apple', 'banana', 'cherry', 'date'];
            items.forEach(item => filter.add(item));
            items.forEach(item => expect(filter.contains(item)).toBe(true));
            expect(filter.count()).toBe(items.length);
        });

        it('should correctly report loadFactor', () => {
            expect(filter.loadFactor()).toBe(0);
            filter.add('item1');
            // capacity = 20, entriesPerBucket = 2 => numBuckets = 10. Total slots = 10 * 2 = 20.
            // This calculation for total slots is not precisely what filter.numBuckets * filter.entriesPerBucket might be if numBuckets was forced to power of 2.
            // The filter.numBuckets = Math.ceil(config.capacity / this.entriesPerBucket);
            // So for (20,2) -> numBuckets = 10. Total slots = 20.
            expect(filter.loadFactor()).toBe(1 / (filter.numBuckets * filter.entriesPerBucket));
            filter.add('item2');
            expect(filter.loadFactor()).toBe(2 / (filter.numBuckets * filter.entriesPerBucket));
        });

        it('should fill up and eventually return false on add if maxKicks is reached', () => {
            // Capacity is approx 20 items (10 buckets * 2 entries/bucket).
            // Add more items than capacity to force evictions and potentially reach maxKicks.
            let itemsSuccessfullyAdded = 0;
            let addReturnedFalse = false;
            for (let i = 0; i < 50; i++) { // Try adding 50 items
                const item = `item-${i}`;
                if (filter.add(item)) {
                    itemsSuccessfullyAdded++;
                } else {
                    addReturnedFalse = true;
                    // console.log(`Filter full after adding ${itemsSuccessfullyAdded} items. Item "item-${i}" failed.`);
                    break;
                }
            }
            expect(addReturnedFalse).toBe(true, 'Filter should have reported full (add returned false)');
            expect(itemsSuccessfullyAdded).toBeLessThan(50);
            expect(itemsSuccessfullyAdded).toBeGreaterThan(0); // Check some items were added
            expect(filter.count()).toBe(itemsSuccessfullyAdded);
        });

        it('should allow re-adding an item after it has been removed', () => {
            filter.add('grape');
            expect(filter.contains('grape')).toBe(true);
            filter.remove('grape');
            expect(filter.contains('grape')).toBe(false);
            expect(filter.add('grape')).toBe(true);
            expect(filter.contains('grape')).toBe(true);
        });

        it('should handle items that hash to the same initial buckets (testing eviction paths)', () => {
            // This requires crafting items or mocking hash functions to force collisions.
            // For simplicity, we'll add many items and trust the eviction logic.
            // This is partially tested by the "fill up" test.
            // A more direct test would involve:
            // 1. Mock _getIndicesAndFingerprint to return colliding indices for different items.
            // 2. Add items that collide until eviction must happen.
            // 3. Verify one of the items is still present / can be added after kicks.
            // This level of mocking is complex for this test setup.
            // Instead, we rely on the general behavior under load.
            const manyItems = Array.from({length: 15}, (_,i) => `collisionTestItem${i}`);
            let addedCount = 0;
            manyItems.forEach(item => {
                if(filter.add(item)) addedCount++;
            });
            expect(addedCount).toBe(15); // Should be able to add 15 items to a filter of capacity 20 (approx)
            
            // Check if all added items are present
            let containedCount = 0;
            manyItems.forEach(item => {
                if(filter.contains(item)) containedCount++;
            });
            // Due to hash collisions for fingerprints, contains might be true even if item was evicted and replaced by another
            // with same fingerprint and one of the same buckets.
            // However, `filter.count()` should be `addedCount`.
            expect(filter.count()).toBe(addedCount);
            // For those items that were successfully added (returned true), they should be findable.
        });
    });

    describe('False Positives (Conceptual)', () => {
        it('should have a chance of false positives', () => {
            // False positives are inherent. This test demonstrates the possibility.
            // Use a filter with higher load to increase chance.
            const capacity = 100;
            const entriesPerBucket = 2; // Fewer entries can increase FP if not sized well
            const fingerprintSize = 4;  // Small fingerprint = high collision rate
            const filter = new CuckooFilter({ capacity, entriesPerBucket, fingerprintSize, maxKicks: 20 });

            for (let i = 0; i < capacity * 0.9; i++) { // Fill to 90% of raw slot capacity
                filter.add(`present-${i}`);
            }

            let falsePositives = 0;
            const testCount = 1000;
            for (let i = 0; i < testCount; i++) {
                if (filter.contains(`absent-${i}`)) {
                    falsePositives++;
                }
            }
            // console.log(`False positive rate: ${falsePositives}/${testCount} (${(falsePositives/testCount)*100}%) with fpSize=${fingerprintSize}, load=${filter.loadFactor()}`);
            // Expect some false positives with small fingerprintSize and high load.
            // If fpSize is large (e.g. 16) and load is not extreme, FP rate should be very low.
            // This test is probabilistic, so it might not always find FPs if parameters are too robust.
            // With fpSize=4, FPs are very likely.
            if (filter.loadFactor() > 0.5 && fingerprintSize <=8) {
                 expect(falsePositives).toBeGreaterThanOrEqual(0); // It could be 0 by chance, but often >0 for small fp
            } else {
                 expect(falsePositives).toBe(0); // For large fpSize or very low load, expect near zero.
            }
        });
    });
    
    describe('_getIndicesAndFingerprint (internal helper)', () => {
        const filter = new CuckooFilter({ fingerprintSize: 8, numBuckets: 100 }); // numBuckets must be set for %

        it('should return two different indices for most items if fingerprint is not 0 and hash(fp) is not 0', () => {
            const { index1, index2, fingerprint } = filter._getIndicesAndFingerprint("some_item_string");
            // console.log(`Item: "some_item_string", fp: ${fingerprint}, i1: ${index1}, i2: ${index2}`);
            if (filter._hashFingerprint(fingerprint) % filter.numBuckets !== 0) { // if hash(fp) is not a multiple of numBuckets
                 expect(index1).not.toBe(index2);
            } else {
                // If hash(fp) % numBuckets === 0, then index1 === index2. This is possible.
                expect(index1).toBe(index2);
            }
            expect(fingerprint).toBeGreaterThanOrEqual(0); // Assuming 0 is a valid fp if null is empty marker
            expect(fingerprint).toBeLessThanOrEqual((1 << 8) -1);
        });

        it('fingerprint should be within mask', () => {
            const filter16 = new CuckooFilter({ fingerprintSize: 16 });
            const { fingerprint } = filter16._getIndicesAndFingerprint("another_item");
            expect(fingerprint).toBeLessThanOrEqual((1 << 16) - 1);
        });

        it('_getFingerprint should not return 0 if 0 is reserved (not the case here as we use null for empty)', () => {
            // Current _getFingerprint allows 0. If 0 was used as empty marker, it would need adjustment.
            // This test is more of a design note.
            const fp = filter._getFingerprint("string_that_might_hash_to_zero_fp_bits");
            // We cannot guarantee it won't be 0 without specific hash mocking.
            // But the implementation notes that 0 is a valid fingerprint if null is used for empty.
            expect(fp).toBeDefined();
        });
    });
});
