/**
 * @fileoverview Implementation of a Concave Hull algorithm using a k-Nearest Neighbors approach.
 */

/**
 * Calculates a concave hull for a set of 2D points using the k-Nearest Neighbors algorithm.
 * The algorithm iteratively selects points that form the smallest right-hand turn angle
 * from a set of k-nearest neighbors, gradually building the hull.
 */
class ConcaveHullKNN {
    /**
     * Creates a ConcaveHullKNN instance.
     * @param {Array<{x: number, y: number}>} points - An array of 2D points.
     *        Each point should be an object with 'x' and 'y' properties.
     * @param {number} k - The number of nearest neighbors to consider for selecting the next hull point.
     *        Must be a positive integer. A common starting value is 3 or higher.
     * @throws {Error} If points array is invalid or k is not a positive integer.
     */
    constructor(points, k) {
        if (!Array.isArray(points) || points.length < 3) {
            throw new Error('Input must be an array of at least 3 points.');
        }
        if (!points.every(p => typeof p === 'object' && typeof p.x === 'number' && typeof p.y === 'number')) {
            throw new Error('All points must be objects with numeric x and y properties.');
        }
        if (typeof k !== 'number' || k <= 0 || !Number.isInteger(k)) {
            throw new Error('k must be a positive integer.');
        }

        this.points = [...points]; // Create a mutable copy
        this.k = Math.max(1, k); // Ensure k is at least 1, though k < 3 might behave like convex hull for angle selection.
                                 // The paper usually implies k >= 3 for concave behavior.
        this.hullPoints = [];
    }

    /**
     * Calculates the squared Euclidean distance between two points.
     * Used for performance as square root is not needed for comparisons.
     * @param {{x: number, y: number}} p1 - The first point.
     * @param {{x: number, y: number}} p2 - The second point.
     * @returns {number} The squared distance between p1 and p2.
     * @private
     */
    _distanceSq(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return dx * dx + dy * dy;
    }

    /**
     * Finds the k nearest neighbors to a given point from a list of candidate points.
     * @param {{x: number, y: number}} point - The reference point.
     * @param {Array<{x: number, y: number}>} candidates - An array of candidate points.
     * @param {number} k - The number of nearest neighbors to find.
     * @returns {Array<{x: number, y: number}>} An array of the k nearest neighbors, sorted by distance.
     * @private
     */
    _findKNearestNeighbors(point, candidates, k) {
        if (candidates.length === 0) {
            return [];
        }
        const distances = candidates.map(candidate => ({
            point: candidate,
            distSq: this._distanceSq(point, candidate),
        }));

        distances.sort((a, b) => a.distSq - b.distSq);
        
        return distances.slice(0, Math.min(k, distances.length)).map(d => d.point);
    }

    /**
     * Calculates the angle between vector p1->p2 and vector p2->p3.
     * The angle is measured counter-clockwise. A positive angle indicates a left turn from p1-p2 to p2-p3,
     * a negative angle indicates a right turn.
     * For the first segment of the hull, p0 can be considered `currentPoint` and p1 as `previousPoint`
     * (e.g., a point to the left of currentPoint on the same y-axis to establish a horizontal reference).
     *
     * @param {{x: number, y: number}} p1 - The first point (previous hull point or reference).
     * @param {{x: number, y: number}} p2 - The second point (current hull point).
     * @param {{x: number, y: number}} p3 - The third point (candidate next hull point).
     * @returns {number} The angle in radians. Ranges from -PI to PI.
     *                   Positive for left turn, negative for right turn (relative to vector p1->p2).
     * @private
     */
    _calculateAngle(p1, p2, p3) {
        // Vector p2->p1
        const v21_x = p1.x - p2.x;
        const v21_y = p1.y - p2.y;
        // Vector p2->p3
        const v23_x = p3.x - p2.x;
        const v23_y = p3.y - p2.y;

        // Angle of v21
        const angle1 = Math.atan2(v21_y, v21_x);
        // Angle of v23
        const angle2 = Math.atan2(v23_y, v23_x);

        let angle = angle2 - angle1;

        // Normalize angle to be between -PI and PI
        if (angle > Math.PI) {
            angle -= 2 * Math.PI;
        } else if (angle < -Math.PI) {
            angle += 2 * Math.PI;
        }
        return angle; // Positive for CCW turn (left), Negative for CW turn (right)
    }
    
    /**
     * Checks if adding the segment currentPoint-nextPoint would intersect any existing non-adjacent hull edges.
     * This is a simplified intersection check for now (stubbed).
     * A full implementation would require a robust line segment intersection algorithm.
     * @param {{x: number, y: number}} currentPoint - The current last point of the hull.
     * @param {{x: number, y: number}} nextPoint - The candidate next point.
     * @param {Array<{x: number, y: number}>} currentHull - The current list of hull points.
     * @returns {boolean} True if an intersection is found, false otherwise.
     * @private
     */
    _checkIntersection(p1, p2, p3, p4) {
        // Line segment p1-p2 and p3-p4
        // Helper to determine orientation
        const orientation = (a, b, c) => {
            const val = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
            if (val === 0) return 0; // Collinear
            return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
        };

        // Helper to check if point q lies on segment pr
        const onSegment = (p, q, r) => {
            return (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                    q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y));
        };

        const o1 = orientation(p1, p2, p3);
        const o2 = orientation(p1, p2, p4);
        const o3 = orientation(p3, p4, p1);
        const o4 = orientation(p3, p4, p2);

        // General case
        if (o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0) {
            if (o1 !== o2 && o3 !== o4) {
                return true;
            }
        }

        // Special Cases for collinearity
        if (o1 === 0 && onSegment(p1, p3, p2)) return true;
        if (o2 === 0 && onSegment(p1, p4, p2)) return true;
        if (o3 === 0 && onSegment(p3, p1, p4)) return true;
        if (o4 === 0 && onSegment(p3, p2, p4)) return true;

        return false;
    }


    /**
     * Calculates the concave hull for the given set of points and k.
     * @returns {Array<{x: number, y: number}>} An ordered array of points representing the concave hull.
     *          Returns an empty array if a hull cannot be formed (e.g. < 3 unique points).
     */
    getHull() {
        // Filter for unique points to avoid issues with duplicates
        const uniquePointStrings = new Set();
        const uniquePoints = this.points.filter(p => {
            const s = `${p.x},${p.y}`;
            if (!uniquePointStrings.has(s)) {
                uniquePointStrings.add(s);
                return true;
            }
            return false;
        });

        if (uniquePoints.length < 3) {
            // console.warn("Not enough unique points to form a hull. Returning unique points or empty if < 3.");
            return uniquePoints.length >=1 ? [...uniquePoints] : []; // Or specific handling like returning original points
        }

        // Make a mutable copy of unique points for processing
        let remainingPoints = [...uniquePoints];
        this.hullPoints = [];

        // 1. Find the starting point: minimum Y, then minimum X.
        let startPoint = remainingPoints.reduce((minP, currentP) => {
            if (currentP.y < minP.y) return currentP;
            if (currentP.y === minP.y && currentP.x < minP.x) return currentP;
            return minP;
        }, remainingPoints[0]);

        this.hullPoints.push(startPoint);
        remainingPoints = remainingPoints.filter(p => p !== startPoint);

        let currentPoint = startPoint;
        let previousAngle = -Math.PI; // Initial reference angle (pointing left along x-axis)

        // Loop to build the hull
        for (let i = 0; i < uniquePoints.length * 2 && remainingPoints.length >=0 ; i++) { // Loop breaker for safety
            if (this.hullPoints.length >= uniquePoints.length && currentPoint === startPoint && this.hullPoints.length > 2) {
                 // This condition might be too simple. We need to check if the *next* selected point is the start point.
            }

            // 3a. Find k nearest neighbors (or all remaining if fewer than k)
            // Exclude points already in the hull (implicitly handled by using remainingPoints)
            // Also exclude the currentPoint itself from its neighbors.
            const kEffective = Math.min(this.k, remainingPoints.length);
            if (kEffective === 0 && currentPoint === startPoint && this.hullPoints.length > 2) {
                 // All points are in hull, and we are back at start.
                 break;
            }
            if (kEffective === 0 && !(currentPoint === startPoint && this.hullPoints.length > 2)) {
                // No more points to select, but not back at start. This indicates an issue or disconnected component.
                // console.warn("Ran out of points before closing the hull.");
                if (currentPoint !== startPoint && this.hullPoints.length > 1) { // Try to close with start point if possible
                    const angleToStart = this._calculateAngle(
                        this.hullPoints.length > 1 ? this.hullPoints[this.hullPoints.length - 2] : {x: currentPoint.x -1, y: currentPoint.y }, // Previous point or reference
                        currentPoint,
                        startPoint
                    );
                     // Check intersection if closing with start point
                    let intersects = false;
                    if (this.hullPoints.length > 2) { // Need at least 3 points in hull to form 2 edges for intersection check
                        for (let j = 0; j < this.hullPoints.length - 2; j++) { // -2 to avoid adjacent segment and self
                            if (this._checkIntersection(currentPoint, startPoint, this.hullPoints[j], this.hullPoints[j+1])) {
                                intersects = true;
                                break;
                            }
                        }
                    }
                    if (!intersects) {
                        this.hullPoints.push(startPoint);
                        currentPoint = startPoint;
                    } else {
                        // console.warn("Cannot close hull with start point due to intersection.");
                    }
                }
                break; 
            }


            const nearestNeighbors = this._findKNearestNeighbors(currentPoint, remainingPoints, kEffective);
            if (nearestNeighbors.length === 0) {
                 // This can happen if kEffective was 0, already handled above, or if remainingPoints became empty.
                 // If currentPoint is not startPoint, try to connect to startPoint as the last step.
                if (currentPoint !== startPoint && this.hullPoints.length > 1) {
                     const angleToStart = this._calculateAngle(
                        this.hullPoints.length > 1 ? this.hullPoints[this.hullPoints.length - 2] : {x: currentPoint.x -1, y: currentPoint.y },
                        currentPoint,
                        startPoint
                    );
                    let intersects = false;
                     if (this.hullPoints.length > 2) {
                        for (let j = 0; j < this.hullPoints.length - 2; j++) {
                            if (this._checkIntersection(currentPoint, startPoint, this.hullPoints[j], this.hullPoints[j+1])) {
                                intersects = true;
                                break;
                            }
                        }
                    }
                    if (!intersects) {
                        this.hullPoints.push(startPoint);
                        currentPoint = startPoint; // This will break the main loop in next iteration
                    } else {
                         // console.warn("Cannot close hull with start point due to intersection on final attempt.");
                    }
                }
                break; // Exit main loop
            }


            // 3b. Select the best nextPoint based on angle
            let bestNextPoint = null;
            // Initialize largestAngle to a very small number for selecting the most CCW angle.
            let largestAngle = -Infinity; 

            // Define previous point for angle calculation
            const previousPoint = this.hullPoints.length > 1 ?
                                  this.hullPoints[this.hullPoints.length - 2] :
                                  { x: currentPoint.x - 1, y: currentPoint.y }; // Reference point for the first segment

            // Sort neighbors by angle to attempt to find a non-intersecting one systematically
            const sortedNeighbors = nearestNeighbors
                .map(neighbor => ({
                    point: neighbor,
                    angle: this._calculateAngle(previousPoint, currentPoint, neighbor)
                }))
                .sort((a, b) => b.angle - a.angle); // Sort for most CCW first (largest angle)

            for (const candidate of sortedNeighbors) {
                const neighbor = candidate.point;
                // const angle = candidate.angle; // Angle already used for sorting. We just need the point.

                // Intersection check for currentPoint -> neighbor against existing hull edges
                let intersects = false;
                // Check against non-adjacent edges.
                // An edge is (hullPoints[j], hullPoints[j+1]).
                // The new potential edge is (currentPoint, neighbor).
                if (this.hullPoints.length >= 2) { // Need at least one existing hull edge P0-P1 to check against P_last-neighbor
                                                   // (P_last is currentPoint)
                    for (let j = 0; j < this.hullPoints.length - 1; j++) {
                        const pA = this.hullPoints[j];
                        const pB = this.hullPoints[j+1];

                        // Don't check intersection with the segment currentPoint just came from (previousPoint to currentPoint)
                        if ((pA === previousPoint && pB === currentPoint) || (pA === currentPoint && pB === previousPoint)) {
                            continue;
                        }
                        // Don't check intersection if the neighbor is the start of the segment being checked against
                        // AND currentPoint is the end of it (or vice versa) - this means segment is already part of hull.
                        // This condition is complex. The _checkIntersection should ideally handle shared vertices correctly
                        // (i.e., segments sharing a vertex don't "intersect" unless they are collinear and overlap).
                        // For now, the primary concern is crossing over "distant" parts of the hull.
                        // If we are trying to close the hull (neighbor is startPoint), only check edges not involving startPoint or currentPoint.
                        if (neighbor === startPoint && (pA === startPoint || pB === startPoint || pA === currentPoint || pB === currentPoint)) {
                            // If closing, allow connection if it doesn't cross other segments.
                            // The _checkIntersection should handle cases where segments meet at endpoints.
                        }
                        
                        if (this._checkIntersection(currentPoint, neighbor, pA, pB)) {
                             // Specifically, pA and pB must not be currentPoint or neighbor to be a "crossing" intersection.
                             // Our _checkIntersection treats segments meeting at ends as non-intersecting unless collinear and overlapping.
                             // If pA=currentPoint, pB=neighbor, this is the segment itself.
                             // If pB=currentPoint, pA=previousPoint, this is the segment we just came from.
                             // This check is generally for intersections with non-adjacent segments.
                            if (!(pA === currentPoint || pB === currentPoint || pA === neighbor || pB === neighbor)) {
                                intersects = true;
                                break;
                            }
                        }
                    }
                }
                
                if (!intersects) {
                    bestNextPoint = neighbor; // Found the most CCW non-intersecting point
                    // largestAngle = angle; // Not strictly needed as we take the first valid from sorted list
                    break; // Exit neighbor loop once best is found
                }
            } // End of sortedNeighbor loop


            if (bestNextPoint) {
                this.hullPoints.push(bestNextPoint);
                currentPoint = bestNextPoint;
                remainingPoints = remainingPoints.filter(p => p !== bestNextPoint);

                if (currentPoint === startPoint && this.hullPoints.length > 2) { // Closed the hull
                    break;
                }
            } else {
                // No suitable non-intersecting point found among k-neighbors, or no neighbors left.
                // This might happen if k is too small or due to geometry.
                // Try to close with start point if possible as a fallback.
                if (currentPoint !== startPoint && this.hullPoints.length > 1) {
                     let intersects = false;
                     if (this.hullPoints.length > 2) {
                        for (let j = 0; j < this.hullPoints.length - 2; j++) {
                            if (this._checkIntersection(currentPoint, startPoint, this.hullPoints[j], this.hullPoints[j+1])) {
                                intersects = true;
                                break;
                            }
                        }
                    }
                    if (!intersects) {
                        this.hullPoints.push(startPoint);
                    } else {
                        // console.warn("Could not select next point and cannot close with start point due to intersection.");
                    }
                }
                break; // Unable to proceed
            }
        } // End of main hull building loop

        // Final check: if last point is not start point, but start point is the only one left, try to add it.
        // This is mostly covered by logic within the loop.
        if (this.hullPoints[this.hullPoints.length -1] !== startPoint && remainingPoints.length === 0 && uniquePoints.includes(startPoint) && this.hullPoints.length > 1) {
            let lastPointInHull = this.hullPoints[this.hullPoints.length -1];
            let intersects = false;
            if (this.hullPoints.length > 2) {
                for (let j = 0; j < this.hullPoints.length - 2; j++) {
                     if (this._checkIntersection(lastPointInHull, startPoint, this.hullPoints[j], this.hullPoints[j+1])) {
                        intersects = true;
                        break;
                    }
                }
            }
            if (!intersects) {
                 this.hullPoints.push(startPoint);
            }
        }


        // Ensure the hull is actually closed if it started and has enough points
        if (this.hullPoints.length > 2 && this.hullPoints[0] !== this.hullPoints[this.hullPoints.length - 1]) {
            // console.warn("Hull was not properly closed. This may indicate an issue or specific geometry.");
            // Attempt to force close if the start point is not the last point, if no intersection.
        }


        return this.hullPoints;
    }
}


// Example Usage (for testing purposes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConcaveHullKNN;

    async function runTests() {
        console.log("--- ConcaveHullKNN Tests ---");

        const points1 = [
            { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 },
            { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 0 },
            { x: 1, y: 0.5 } // A point that might make it concave
        ];
        const k1 = 3;
        try {
            const concaveHull1 = new ConcaveHullKNN(points1, k1);
            const hull1 = concaveHull1.getHull();
            console.log(`Hull for points1 (k=${k1}):`, JSON.stringify(hull1));
            // Expected: e.g. [ {x:0,y:0}, {x:1,y:0.5}, {x:2,y:0}, {x:3,y:1}, {x:2,y:2}, {x:0,y:2}, {x:0,y:0} ] or similar CCW order

            const points2 = [ // A square
                { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }
            ];
            const k2 = 3;
            const concaveHull2 = new ConcaveHullKNN(points2, k2);
            const hull2 = concaveHull2.getHull();
            console.log(`Hull for square (k=${k2}):`, JSON.stringify(hull2));
             // Expected: a square, e.g., [{x:0,y:0},{x:10,y:0},{x:10,y:10},{x:0,y:10},{x:0,y:0}]

            const points3 = [ // "U" shape
                {x:0,y:0},{x:5,y:0},{x:5,y:3},{x:4,y:3},{x:4,y:1},{x:1,y:1},{x:1,y:3},{x:0,y:3}
            ];
             const k3 = 3;
             const concaveHull3 = new ConcaveHullKNN(points3, k3);
             const hull3 = concaveHull3.getHull();
             console.log(`Hull for U-shape (k=${k3}):`, JSON.stringify(hull3));
             // Expected: [ {x:0,y:0}, {x:5,y:0}, {x:5,y:3}, {x:4,y:3}, {x:4,y:1}, {x:1,y:1}, {x:1,y:3}, {x:0,y:3}, {x:0,y:0} ]

            const points4 = [ // Not enough unique points
                {x:0,y:0}, {x:0,y:0}, {x:1,y:1}
            ];
            console.log("\nTest with fewer than 3 unique points:");
            try {
                new ConcaveHullKNN(points4, 3); // Should throw error in constructor due to original points length
            } catch (e) {
                 // If constructor allows it due to total points, getHull should handle unique points.
                const ch = new ConcaveHullKNN([{x:0,y:0}, {x:0,y:0}, {x:1,y:1}, {x:1,y:1}, {x:2,y:2}], 3);
                const hull4 = ch.getHull(); // Internally filters to unique: (0,0), (1,1), (2,2)
                console.log("Hull for <3 unique points (after constructor):", hull4); // Expected: [{x:0,y:0},{x:1,y:1},{x:2,y:2}] or similar
            }
            
            const points5_collinear = [ {x:0,y:0}, {x:1,y:1}, {x:2,y:2}, {x:3,y:3} ];
            const concaveHull5 = new ConcaveHullKNN(points5_collinear, 3);
            const hull5 = concaveHull5.getHull();
            console.log(`Hull for collinear points (k=3):`, JSON.stringify(hull5));
            // Expected for collinear: might be [{x:0,y:0},{x:3,y:3},{x:0,y:0}] or just the endpoints.
            // The current angle logic might struggle or produce just the line segment.
            // The current implementation might form [{x:0,y:0},{x:3,y:3},{x:0,y:0}]

        } catch (e) {
            console.error("Error during tests:", e);
        }
    }
    runTests();
}
