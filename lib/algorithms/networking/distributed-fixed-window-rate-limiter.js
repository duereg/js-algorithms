/**
 * @fileoverview Implementation of a Distributed Fixed Window Rate Limiter.
 */

/**
 * @interface StoreAdapter
 * @description Defines the interface for a store adapter that the rate limiter can use.
 * This allows for plugging in different storage backends (e.g., in-memory, Redis).
 * All methods are expected to behave as if they are potentially asynchronous.
 */
/**
 * @function getCount
 * @memberof StoreAdapter
 * @instance
 * @param {string} windowKey - The key representing the specific window for a user/key.
 * @returns {Promise<number>} The current count for the windowKey, or 0 if not set.
 */
/**
 * @function increment
 * @memberof StoreAdapter
 * @instance
 * @param {string} windowKey - The key representing the specific window for a user/key.
 * @param {number} currentTimestampMs - The current timestamp in milliseconds. Used for setting expiry.
 * @param {number} windowMs - The duration of the window in milliseconds. Used for setting expiry.
 * @returns {Promise<number>} The new count for the windowKey after incrementing.
 */

/**
 * An in-memory store adapter for the DistributedFixedWindowRateLimiter.
 * Simulates a distributed store using a JavaScript Map.
 * @implements {StoreAdapter}
 */
class InMemoryStoreAdapter {
    constructor() {
        /** @private @type {Map<string, number>} */
        this.counts = new Map();
        /** @private @type {Map<string, number>} */
        this.expirations = new Map(); // Stores the timestamp when the windowKey should expire
    }

    /**
     * Clears an entry if it's expired based on the current time.
     * This is a simplified cleanup, called on access. A real system might have proactive cleanup.
     * @param {string} windowKey
     * @param {number} currentTimestampMs
     * @private
     */
    _checkAndClearExpired(windowKey, currentTimestampMs) {
        if (this.expirations.has(windowKey)) {
            if (currentTimestampMs >= this.expirations.get(windowKey)) {
                this.counts.delete(windowKey);
                this.expirations.delete(windowKey);
                // console.log(`InMemoryStore: Expired and cleared ${windowKey}`);
            }
        }
    }

    /**
     * Gets the current count for the windowKey.
     * @param {string} windowKey - The key representing the specific window.
     * @returns {Promise<number>} The current count, or 0 if not set or expired.
     */
    async getCount(windowKey) {
        this._checkAndClearExpired(windowKey, Date.now());
        return this.counts.get(windowKey) || 0;
    }

    /**
     * Increments the count for the windowKey and sets its expiration.
     * @param {string} windowKey - The key representing the specific window.
     * @param {number} currentWindowStartMs - The start timestamp of the current window.
     * @param {number} windowMs - The duration of the window in milliseconds.
     * @returns {Promise<number>} The new count for the windowKey.
     */
    async increment(windowKey, currentWindowStartMs, windowMs) {
        const now = Date.now();
        this._checkAndClearExpired(windowKey, now); // Clear if it's an old, expired key being reused by chance

        let currentCount = this.counts.get(windowKey) || 0;
        currentCount++;
        this.counts.set(windowKey, currentCount);

        // Set expiration to the end of the *next* window after the current one starts.
        // This ensures the key lasts for the entirety of its current window plus one more window's duration.
        // For a fixed window, the key should expire right after its window ends.
        // So, if windowKey is for window W, it should expire at end of W.
        // currentWindowStartMs is the start of the window this key belongs to.
        const expirationTime = currentWindowStartMs + windowMs;
        
        // Only set expiration if it's not set or if the new one is later (though for fixed window, it's usually set once)
        if (!this.expirations.has(windowKey) || expirationTime > this.expirations.get(windowKey)) {
             this.expirations.set(windowKey, expirationTime);
        }
        // console.log(`InMemoryStore: Incremented ${windowKey} to ${currentCount}. Expires at ${new Date(expirationTime).toISOString()}`);
        return currentCount;
    }
}


/**
 * Implements a Distributed Fixed Window Rate Limiter.
 * This rate limiter controls the number of requests allowed for a given key
 * within fixed time windows (e.g., 100 requests per minute per user).
 * It's designed to be conceptually backed by a distributed store like Redis for scalability.
 */
class DistributedFixedWindowRateLimiter {
    /**
     * Creates a DistributedFixedWindowRateLimiter instance.
     * @param {object} options - Configuration options.
     * @param {number} options.limit - Maximum number of requests allowed per window (e.g., 100).
     * @param {number} options.windowMs - Duration of the time window in milliseconds (e.g., 60000 for 1 minute).
     * @param {StoreAdapter} [options.storeAdapter] - An optional store adapter.
     *        If not provided, a default {@link InMemoryStoreAdapter} is used.
     *        For distributed systems, a Redis-backed adapter would be used here.
     *        Redis adapter would use INCR for incrementing and EXPIRE for setting TTL on keys.
     * @throws {Error} If limit or windowMs are not positive numbers.
     */
    constructor(options) {
        if (!options || typeof options.limit !== 'number' || options.limit <= 0) {
            throw new Error('Limit must be a positive number.');
        }
        if (!options || typeof options.windowMs !== 'number' || options.windowMs <= 0) {
            throw new Error('WindowMs must be a positive number.');
        }

        this.limit = options.limit;
        this.windowMs = options.windowMs;
        this.store = options.storeAdapter || new InMemoryStoreAdapter();
    }

    /**
     * Checks if a request for a given key is allowed under the rate limit.
     * If allowed, it also records the request.
     * @param {string} key - A unique identifier for which the rate is being limited (e.g., user ID, IP address).
     * @returns {Promise<{allowed: boolean, remaining: number, currentCount: number}>}
     *          An object indicating if the request is allowed, the number of remaining requests in the current window,
     *          and the current count for the key in this window.
     */
    async isAllowed(key) {
        const currentTimestampMs = Date.now();
        
        // Calculate the start of the current fixed window
        const currentWindowStartMs = Math.floor(currentTimestampMs / this.windowMs) * this.windowMs;
        
        // The windowKey uniquely identifies the key within its specific time window.
        // Example: "user123:1678886400000"
        const windowKey = `${key}:${currentWindowStartMs}`;

        const currentCount = await this.store.getCount(windowKey);

        if (currentCount < this.limit) {
            // Atomically increment the count for the windowKey.
            // In Redis, this would be `INCR windowKey`. If the key is incremented from 0 to 1,
            // `EXPIRE windowKey (windowMs / 1000)` would be set.
            // The store adapter's increment method handles this logic.
            const newCount = await this.store.increment(windowKey, currentWindowStartMs, this.windowMs);
            return {
                allowed: true,
                remaining: this.limit - newCount,
                currentCount: newCount,
            };
        } else {
            return {
                allowed: false,
                remaining: 0,
                currentCount: currentCount,
            };
        }
    }
}

// Example Usage (for testing purposes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DistributedFixedWindowRateLimiter, InMemoryStoreAdapter };

    // Helper function to simulate passage of time
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function testRateLimiter() {
        console.log("--- DistributedFixedWindowRateLimiter Tests ---");

        // Test with InMemoryStoreAdapter
        const limiter = new DistributedFixedWindowRateLimiter({
            limit: 5,       // 5 requests
            windowMs: 2000, // per 2 seconds
        });

        const testKey = "user123";
        console.log(`Testing key "${testKey}" with limit 5 req / 2 sec`);

        for (let i = 1; i <= 7; i++) {
            const result = await limiter.isAllowed(testKey);
            console.log(`Request ${i}: Allowed: ${result.allowed}, Remaining: ${result.remaining}, Count: ${result.currentCount}`);
            if (!result.allowed && i <= 5) console.error("Test failed: Should have been allowed.");
            if (result.allowed && i > 5) console.error("Test failed: Should have been denied.");
            await sleep(100); // Small delay between requests
        }
        
        console.log("\nWaiting for window to reset (2 seconds)...");
        await sleep(2000);

        console.log("\nTesting after window reset:");
        for (let i = 1; i <= 3; i++) {
            const result = await limiter.isAllowed(testKey);
            console.log(`Request ${i} (new window): Allowed: ${result.allowed}, Remaining: ${result.remaining}, Count: ${result.currentCount}`);
            if (!result.allowed) console.error("Test failed: Should have been allowed in new window.");
        }

        console.log("\nTesting another key 'user456':");
        const anotherKey = "user456";
        for (let i = 1; i <= 3; i++) {
            const result = await limiter.isAllowed(anotherKey);
            console.log(`Request ${i} for ${anotherKey}: Allowed: ${result.allowed}, Remaining: ${result.remaining}, Count: ${result.currentCount}`);
            if (!result.allowed) console.error("Test failed: Should have been allowed for new key.");
        }
        
        // Test expiration logic of InMemoryStoreAdapter
        console.log("\nTesting InMemoryStoreAdapter expiration explicitly:");
        const store = new InMemoryStoreAdapter();
        const windowKey = "testKey:10000"; // Belongs to window starting at 10000ms
        const windowMs = 500; // 0.5 sec window
        const windowStartMs = 10000;

        await store.increment(windowKey, windowStartMs, windowMs); // count = 1, expires at 10500
        let count = await store.getCount(windowKey);
        console.log(`Time: ${Date.now()}, Count for ${windowKey}: ${count} (Expected 1)`);

        await sleep(300); // current time approx 10300 (relative to test start) + Date.now() offset
        // If Date.now() was ~0 at start, now it's ~300. Expiration is 10500. Key should still be there.
        // This direct time manipulation is hard. Let's simulate by checking internal state.
        // The _checkAndClearExpired uses Date.now().
        // Let's assume current Date.now() is < 10500.
        console.log(`Simulating time before expiry. Current count for ${windowKey}: ${await store.getCount(windowKey)} (Expected 1)`);
        
        // To test expiration, we'd need to manipulate Date.now() or wait long enough.
        // The current InMemoryStoreAdapter's _checkAndClearExpired is called on access.
        // Let's set an expiration that has passed.
        store.counts.set("expiredKey:20000", 5);
        store.expirations.set("expiredKey:20000", Date.now() - 1000); // Expired 1 sec ago
        count = await store.getCount("expiredKey:20000");
        console.log(`Count for "expiredKey:20000" (which was set to be expired): ${count} (Expected 0)`);
        if (store.counts.has("expiredKey:20000")) console.error("Test failed: Expired key not cleared from counts.");
        if (store.expirations.has("expiredKey:20000")) console.error("Test failed: Expired key not cleared from expirations.");


        console.log("\n--- Constructor Validation Tests ---");
        try {
            new DistributedFixedWindowRateLimiter({ limit: 0, windowMs: 1000 });
        } catch (e) {
            console.log("Caught expected error for limit=0:", e.message);
        }
        try {
            new DistributedFixedWindowRateLimiter({ limit: 10, windowMs: -100 });
        } catch (e) {
            console.log("Caught expected error for windowMs=-100:", e.message);
        }
        try {
            new DistributedFixedWindowRateLimiter({ limit: '10', windowMs: 100 });
        } catch (e) {
            console.log("Caught expected error for limit='10':", e.message);
        }
    }

    testRateLimiter().catch(console.error);
}
