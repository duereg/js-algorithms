const ConcaveHullKNN = require('../../../lib/algorithms/geospatial/concave-hull-knn');

describe('ConcaveHullKNN', () => {
    describe('Constructor', () => {
        it('should throw an error if points array has less than 3 points', () => {
            expect(() => new ConcaveHullKNN([{ x: 0, y: 0 }, { x: 1, y: 1 }], 3)).toThrowError('Input must be an array of at least 3 points.');
        });

        it('should throw an error if points are not in the correct format', () => {
            const invalidPoints = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2 }]; // Missing y
            expect(() => new ConcaveHullKNN(invalidPoints, 3)).toThrowError('All points must be objects with numeric x and y properties.');
        });

        it('should throw an error if k is not a positive integer', () => {
            const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }];
            expect(() => new ConcaveHullKNN(points, 0)).toThrowError('k must be a positive integer.');
            expect(() => new ConcaveHullKNN(points, -1)).toThrowError('k must be a positive integer.');
            expect(() => new ConcaveHullKNN(points, 1.5)).toThrowError('k must be a positive integer.');
        });

        it('should successfully create an instance with valid arguments', () => {
            const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }];
            expect(() => new ConcaveHullKNN(points, 3)).not.toThrow();
        });
    });

    describe('getHull', () => {
        // Helper to check if two points are identical
        const pointsEqual = (p1, p2) => p1 && p2 && p1.x === p2.x && p1.y === p2.y;
        // Helper to check if a hull is closed
        const isHullClosed = (hull) => hull.length > 1 && pointsEqual(hull[0], hull[hull.length - 1]);
        // Helper to check if a point is in a list of points
        const hasPoint = (list, point) => list.some(p => pointsEqual(p, point));


        it('should return the unique points if less than 3 unique points are provided', () => {
            let points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 0 }]; // 2 unique
            let concaveHull = new ConcaveHullKNN(points, 3);
            let hull = concaveHull.getHull();
            expect(hull.length).toBe(2);
            expect(hasPoint(hull, {x:0,y:0})).toBe(true);
            expect(hasPoint(hull, {x:1,y:1})).toBe(true);


            points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]; // 1 unique
            concaveHull = new ConcaveHullKNN(points, 3);
            hull = concaveHull.getHull();
            expect(hull.length).toBe(1);
            expect(pointsEqual(hull[0], {x:0,y:0})).toBe(true);
        });
        
        it('should compute a simple triangular hull', () => {
            const points = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 2.5, y: 5 }];
            const concaveHull = new ConcaveHullKNN(points, 3);
            const hull = concaveHull.getHull();

            expect(hull.length).toBe(4); // Triangle + closed point
            expect(isHullClosed(hull)).toBe(true);
            points.forEach(p => expect(hasPoint(hull, p)).toBe(true));
        });

        it('should compute a square hull (convex)', () => {
            const points = [
                { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }
            ];
            const concaveHull = new ConcaveHullKNN(points, 3); // k=3 should produce convex for convex set
            const hull = concaveHull.getHull();
            
            expect(hull.length).toBe(5); // Square + closed point
            expect(isHullClosed(hull)).toBe(true);
            points.forEach(p => expect(hasPoint(hull, p)).toBe(true));
            // Could also check order if known, e.g. by summing signed areas or checking angles
        });

        it('should create a concave shape for a "U" like point set with appropriate k', () => {
            const points = [
                { x: 0, y: 0 }, { x: 5, y: 0 },                         // Bottom base
                { x: 5, y: 5 }, { x: 0, y: 5 },                         // Top corners
                { x: 1, y: 1 }, { x: 4, y: 1 },                         // Inner bottom of "U"
                { x: 1, y: 4 }, { x: 4, y: 4 }                          // Inner top of "U"
            ];
            // With k=3, it should try to go inwards.
            const concaveHull = new ConcaveHullKNN(points, 3);
            const hull = concaveHull.getHull();

            // Expected hull points for U shape (order might vary but these points should be in)
            const expectedOuterPoints = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 5 }, { x: 0, y: 5 }];
            const expectedInnerPoints = [{ x: 1, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 4, y: 4 }];
            
            // Check that the hull is closed
            expect(isHullClosed(hull)).toBe(true);

            // All outer points should be in the hull
            expectedOuterPoints.forEach(p => expect(hasPoint(hull, p)).toBe(true, `Outer point ${JSON.stringify(p)} missing`));
            
            // The inner points {x:1,y:4} and {x:4,y:4} (top of U's gap) should NOT be in the hull.
            // The points {x:1,y:1} and {x:4,y:1} (bottom of U's gap) SHOULD be in the hull to make it concave.
            expect(hasPoint(hull, { x: 1, y: 1 })).toBe(true, "Inner point {x:1,y:1} should be part of concave U");
            expect(hasPoint(hull, { x: 4, y: 1 })).toBe(true, "Inner point {x:4,y:1} should be part of concave U");
            
            // These points define the "outer" part of the U's cavity, they should not be part of the hull line itself if k is small enough
            expect(hasPoint(hull, { x: 1, y: 4 })).toBe(false, "Inner top point {x:1,y:4} should NOT be part of this concave U boundary");
            expect(hasPoint(hull, { x: 4, y: 4 })).toBe(false, "Inner top point {x:4,y:4} should NOT be part of this concave U boundary");
            
            // The hull should have 8 points + closing point = 9
            // (0,0)-(5,0)-(5,5)-(4,5)? No, (5,5) should go to (4,1) or (5,0) to (4,1)
            // Start: (0,0) -> (5,0) -> (4,1) -> (1,1) -> (0,3) -> (0,5) -> (5,5) -> (0,0) - this is a guess.
            // Actual path depends on k-NN and angle selection.
            // For U shape: (0,0)-(5,0)-(5,1)-(4,1)-(1,1)-(0,1)-(0,0) is not U
            // (0,0)-(5,0)-(5,5)-(0,5)-(0,0) is convex.
            // (0,0)-(1,1)-(4,1)-(5,0)-(5,5)-(4,4)-(1,4)-(0,5)-(0,0) is complex.
            // A correct U shape: (0,0)-(5,0)-(5,1)? No.
            // It should be (0,0)-(5,0)-(5,Y_outer)-(X_outer_top_right)-(X_inner_top_right)-(X_inner_bottom_right)-...
            // (0,0)-(5,0)-(5,5)-(0,5)- then from (0,5) it might go to (1,4) if k allows.
            // The path: (0,0)-(5,0)-(5,5)-(4,4)?-(1,4)?-(0,5)-(0,0) plus the inner dip.
            // (0,0) -> (5,0) -> (4,1) -> (1,1) -> (0,0) ???
            // (0,0) -> (5,0) -> (5,y) -> (4,y) -> (4,1) -> (1,1) -> (1,y) -> (0,y) -> (0,0)
            // The example points are: (0,0), (5,0), (5,5), (0,5) | (1,1), (4,1), (1,4), (4,4)
            // Hull: (0,0)-(5,0)-(5,1)? no (5,1) is not in list. (5,0) -> (4,1)
            // (0,0)-(5,0)-(4,1)-(1,1)-(0,0) is a shape.
            // The U shape from test case: (0,0)-(5,0)-(5,3)-(4,3)-(4,1)-(1,1)-(1,3)-(0,3)-(0,0)
            // This is what the example in description implies.
             const pointsU = [ {x:0,y:0},{x:5,y:0},{x:5,y:3},{x:4,y:3},{x:4,y:1},{x:1,y:1},{x:1,y:3},{x:0,y:3}];
             const concaveHullU = new ConcaveHullKNN(pointsU, 3);
             const hullU = concaveHullU.getHull();
             expect(hullU.length).toBe(pointsU.length + 1); // All points should be on hull + close
             pointsU.forEach(p => expect(hasPoint(hullU, p)).toBe(true, `U-Shape point ${JSON.stringify(p)} missing`));

        });

        it('should produce a more convex-like hull with larger k', () => {
            const points = [ // Same U-shape points as above, but expecting different hull with large k
                { x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 5 }, { x: 0, y: 5 },
                { x: 1, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 4, y: 4 }
            ];
            const concaveHullLargeK = new ConcaveHullKNN(points, 7); // k=7 (all other points)
            const hullLargeK = concaveHullLargeK.getHull();

            // With k large enough (e.g., >= number of points - 1), it should be convex.
            // The convex hull of these points is (0,0)-(5,0)-(5,5)-(0,5)-(0,0)
            const convexPoints = [{ x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 5 }, { x: 0, y: 5 }];
            expect(hullLargeK.length).toBe(convexPoints.length + 1);
            convexPoints.forEach(p => expect(hasPoint(hullLargeK, p)).toBe(true, `Convex point ${JSON.stringify(p)} missing for large k`));
            expect(isHullClosed(hullLargeK)).toBe(true);
        });

        it('should handle collinear points gracefully', () => {
            // For horizontal line
            let points = [{x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:3,y:0}];
            let concaveHull = new ConcaveHullKNN(points, 3);
            let hull = concaveHull.getHull();
            // Expected: either [(0,0),(3,0),(0,0)] or [(0,0),(3,0)] then [(3,0),(0,0)]
            // The algorithm should pick the extreme points and form a line, then close it.
            expect(hull.length).toBe(3); // (0,0)-(3,0)-(0,0)
            expect(hasPoint(hull, {x:0,y:0})).toBe(true);
            expect(hasPoint(hull, {x:3,y:0})).toBe(true);
            expect(isHullClosed(hull)).toBe(true);

            // For vertical line
            points = [{x:0,y:0}, {x:0,y:1}, {x:0,y:2}, {x:0,y:3}];
            concaveHull = new ConcaveHullKNN(points, 3);
            hull = concaveHull.getHull();
            expect(hull.length).toBe(3);
            expect(hasPoint(hull, {x:0,y:0})).toBe(true);
            expect(hasPoint(hull, {x:0,y:3})).toBe(true);
            expect(isHullClosed(hull)).toBe(true);
        });

        it('should handle a "C" shape where start point might be tricky', () => {
            const pointsC = [
                {x:0,y:0}, {x:2,y:0}, {x:3,y:1}, {x:3,y:2}, {x:2,y:3}, {x:0,y:3}, // Outer C
                {x:1,y:1}, {x:1,y:2} // Inner part of C
            ];
            // Start point likely (0,0)
            // With k=3, it should try to go inwards around (1,1) and (1,2)
            const concaveHull = new ConcaveHullKNN(pointsC, 3);
            const hull = concaveHull.getHull();
            expect(isHullClosed(hull)).toBe(true);
            // All points should be part of this hull shape if k is small enough.
            expect(hull.length).toBe(pointsC.length + 1);
            pointsC.forEach(p => expect(hasPoint(hull,p)).toBe(true, `C-shape point ${JSON.stringify(p)} missing`));
        });

        // Test _checkIntersection helper (simplified test)
        describe('_checkIntersection (internal helper)', () => {
            const chInstance = new ConcaveHullKNN([{x:0,y:0},{x:1,y:1},{x:2,y:2}], 3); // Dummy instance
            it('should detect simple intersections', () => {
                expect(chInstance._checkIntersection({x:0,y:0},{x:2,y:2}, {x:0,y:2},{x:2,y:0})).toBe(true); // X shape
            });
            it('should not report intersection for non-intersecting segments', () => {
                expect(chInstance._checkIntersection({x:0,y:0},{x:1,y:0}, {x:0,y:1},{x:1,y:1})).toBe(false); // Parallel horizontal
            });
            it('should handle segments meeting at an endpoint correctly (no intersection)', () => {
                expect(chInstance._checkIntersection({x:0,y:0},{x:1,y:1}, {x:1,y:1},{x:2,y:0})).toBe(false); // Meet at (1,1)
            });
            it('should handle collinear overlapping segments as intersecting', () => {
                 expect(chInstance._checkIntersection({x:0,y:0},{x:4,y:0}, {x:1,y:0},{x:3,y:0})).toBe(true); // p3-p4 is on p1-p2
            });
            it('should handle collinear non-overlapping segments as non-intersecting', () => {
                 expect(chInstance._checkIntersection({x:0,y:0},{x:1,y:0}, {x:2,y:0},{x:3,y:0})).toBe(false);
            });
        });
    });
});
