const { DistributedFixedWindowRateLimiter, InMemoryStoreAdapter } = require('../../../lib/algorithms/networking/distributed-fixed-window-rate-limiter');

describe('InMemoryStoreAdapter', () => {
    let store;
    let originalDateNow;

    beforeEach(() => {
        store = new InMemoryStoreAdapter();
        originalDateNow = Date.now; // Store original Date.now
    });

    afterEach(() => {
        Date.now = originalDateNow; // Restore original Date.now
    });

    it('should initialize with empty counts and expirations', () => {
        expect(store.counts.size).toBe(0);
        expect(store.expirations.size).toBe(0);
    });

    it('increment should increase count and set expiration', async () => {
        const windowKey = 'key1:10000';
        const windowStartMs = 10000;
        const windowMs = 5000;

        Date.now = () => 10100; // Current time within the window

        let newCount = await store.increment(windowKey, windowStartMs, windowMs);
        expect(newCount).toBe(1);
        expect(await store.getCount(windowKey)).toBe(1);
        expect(store.expirations.get(windowKey)).toBe(windowStartMs + windowMs); // Expires at 15000

        newCount = await store.increment(windowKey, windowStartMs, windowMs);
        expect(newCount).toBe(2);
        expect(await store.getCount(windowKey)).toBe(2);
    });

    it('getCount should return 0 for non-existent or expired keys', async () => {
        expect(await store.getCount('nonexistent:10000')).toBe(0);

        const windowKey = 'key1:20000';
        const windowStartMs = 20000;
        const windowMs = 1000;
        Date.now = () => 20500; // Set current time
        await store.increment(windowKey, windowStartMs, windowMs); // Expires at 21000

        Date.now = () => 21500; // Advance time past expiration
        expect(await store.getCount(windowKey)).toBe(0); // Should be cleared
        expect(store.counts.has(windowKey)).toBe(false);
        expect(store.expirations.has(windowKey)).toBe(false);
    });

    it('_checkAndClearExpired should clear expired entries', () => {
        const key1 = 'key1:30000';
        const key2 = 'key2:30000';
        const now = 32000;

        store.counts.set(key1, 5);
        store.expirations.set(key1, now - 500); // Expired
        store.counts.set(key2, 3);
        store.expirations.set(key2, now + 500); // Not expired

        store._checkAndClearExpired(key1, now);
        expect(store.counts.has(key1)).toBe(false);
        expect(store.expirations.has(key1)).toBe(false);

        store._checkAndClearExpired(key2, now);
        expect(store.counts.has(key2)).toBe(true);
        expect(store.expirations.has(key2)).toBe(true);
    });
});


describe('DistributedFixedWindowRateLimiter', () => {
    let limiter;
    let originalDateNow;

    beforeEach(() => {
        // Default limiter for most tests
        limiter = new DistributedFixedWindowRateLimiter({
            limit: 3,
            windowMs: 1000, // 1 second window
        });
        originalDateNow = Date.now;
    });

    afterEach(() => {
        Date.now = originalDateNow;
    });

    describe('Constructor', () => {
        it('should throw error for invalid limit', () => {
            expect(() => new DistributedFixedWindowRateLimiter({ limit: 0, windowMs: 1000 })).toThrowError('Limit must be a positive number.');
            expect(() => new DistributedFixedWindowRateLimiter({ limit: '5', windowMs: 1000 })).toThrowError('Limit must be a positive number.');
        });
        it('should throw error for invalid windowMs', () => {
            expect(() => new DistributedFixedWindowRateLimiter({ limit: 5, windowMs: 0 })).toThrowError('WindowMs must be a positive number.');
            expect(() => new DistributedFixedWindowRateLimiter({ limit: 5, windowMs: '1000' })).toThrowError('WindowMs must be a positive number.');
        });
        it('should use InMemoryStoreAdapter by default', () => {
            const defaultLimiter = new DistributedFixedWindowRateLimiter({ limit: 1, windowMs: 100 });
            expect(defaultLimiter.store instanceof InMemoryStoreAdapter).toBe(true);
        });
        it('should use provided storeAdapter', () => {
            const mockStore = { getCount: async () => 0, increment: async () => 1 };
            const customStoreLimiter = new DistributedFixedWindowRateLimiter({ limit: 1, windowMs: 100, storeAdapter: mockStore });
            expect(customStoreLimiter.store).toBe(mockStore);
        });
    });

    describe('isAllowed', () => {
        it('should allow requests under the limit', async () => {
            Date.now = () => 10000; // Fixed time
            let result = await limiter.isAllowed('user1');
            expect(result.allowed).toBe(true);
            expect(result.currentCount).toBe(1);
            expect(result.remaining).toBe(2);

            result = await limiter.isAllowed('user1');
            expect(result.allowed).toBe(true);
            expect(result.currentCount).toBe(2);
            expect(result.remaining).toBe(1);
        });

        it('should allow request at the limit', async () => {
            Date.now = () => 20000;
            await limiter.isAllowed('user2'); // 1
            await limiter.isAllowed('user2'); // 2
            const result = await limiter.isAllowed('user2'); // 3 (at limit)
            expect(result.allowed).toBe(true);
            expect(result.currentCount).toBe(3);
            expect(result.remaining).toBe(0);
        });

        it('should deny requests over the limit within the same window', async () => {
            Date.now = () => 30000;
            await limiter.isAllowed('user3'); // 1
            await limiter.isAllowed('user3'); // 2
            await limiter.isAllowed('user3'); // 3
            const result = await limiter.isAllowed('user3'); // 4 (over limit)
            expect(result.allowed).toBe(false);
            expect(result.currentCount).toBe(3); // Count should not exceed limit
            expect(result.remaining).toBe(0);
        });

        it('should handle different keys independently', async () => {
            Date.now = () => 40000;
            const resultUserA1 = await limiter.isAllowed('userA'); // userA count = 1
            expect(resultUserA1.allowed).toBe(true);
            expect(resultUserA1.currentCount).toBe(1);

            const resultUserB1 = await limiter.isAllowed('userB'); // userB count = 1
            expect(resultUserB1.allowed).toBe(true);
            expect(resultUserB1.currentCount).toBe(1);

            await limiter.isAllowed('userA'); // userA count = 2
            await limiter.isAllowed('userA'); // userA count = 3 (limit for userA)
            const resultUserA4 = await limiter.isAllowed('userA');
            expect(resultUserA4.allowed).toBe(false);

            const resultUserB2 = await limiter.isAllowed('userB'); // userB count = 2 (still allowed)
            expect(resultUserB2.allowed).toBe(true);
            expect(resultUserB2.currentCount).toBe(2);
        });

        it('should reset counts for subsequent windows', async () => {
            Date.now = () => 50000; // Start of first window for userX
            await limiter.isAllowed('userX'); // 1
            await limiter.isAllowed('userX'); // 2
            await limiter.isAllowed('userX'); // 3 (limit reached for window 50000-50999)
            let result = await limiter.isAllowed('userX');
            expect(result.allowed).toBe(false);

            Date.now = () => 50000 + limiter.windowMs; // Advance time to the next window (51000)
            result = await limiter.isAllowed('userX'); // First request in new window
            expect(result.allowed).toBe(true);
            expect(result.currentCount).toBe(1);
            expect(result.remaining).toBe(2);

            Date.now = () => 50000 + limiter.windowMs + 100; // Still in new window
            result = await limiter.isAllowed('userX'); // Second request
            expect(result.allowed).toBe(true);
            expect(result.currentCount).toBe(2);
        });

        it('should use the store adapter correctly', async () => {
            const mockStore = {
                getCount: jasmine.createSpy('getCount').and.returnValue(Promise.resolve(0)),
                increment: jasmine.createSpy('increment').and.returnValue(Promise.resolve(1)),
            };
            const customLimiter = new DistributedFixedWindowRateLimiter({
                limit: 5,
                windowMs: 5000,
                storeAdapter: mockStore,
            });

            Date.now = () => 60000;
            const key = 'testKeyStore';
            await customLimiter.isAllowed(key);

            const expectedWindowStartMs = Math.floor(60000 / 5000) * 5000;
            const expectedWindowKey = `${key}:${expectedWindowStartMs}`;

            expect(mockStore.getCount).toHaveBeenCalledWith(expectedWindowKey);
            expect(mockStore.increment).toHaveBeenCalledWith(expectedWindowKey, expectedWindowStartMs, 5000);
        });
    });
});
