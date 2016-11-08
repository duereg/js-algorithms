/*
 * Smallest enclosing circle
 *
 * Copyright (c) 2014 Project Nayuki
 * https://www.nayuki.io/page/smallest-enclosing-circle
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program (see COPYING.txt).
 * If not, see <http://www.gnu.org/licenses/>.
 */


const EPSILON = 1e-12;

// One boundary point known
function makeCircleOnePoint(points, p) {
  let c = { x: p.x, y: p.y, r: 0 };
  for (let i = 0; i < points.length; i++) {
    const q = points[i];
    if (!isInCircle(c, q)) {
      if (c.r == 0) {
        c = makeDiameter(p, q);
      } else {
        c = makeCircleTwoPoints(points.slice(0, i + 1), p, q);
      }
    }
  }
  return c;
}

// Two boundary points known
function makeCircleTwoPoints(points, p, q) {
  const temp = makeDiameter(p, q);
  let containsAll = true;

  for (let i = 0; i < points.length; i++) {
    containsAll = containsAll && isInCircle(temp, points[i]);
  }

  if (containsAll) {
    return temp;
  }

  let left = null;
  let right = null;
  for (let i = 0; i < points.length; i++) {
    const r = points[i];
    const cross = crossProduct(p.x, p.y, q.x, q.y, r.x, r.y);
    const c = makeCircumcircle(p, q, r);
    if (c == null) {
      continue;
    } else if (cross > 0 && (left == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) > crossProduct(p.x, p.y, q.x, q.y, left.x, left.y))) {
      left = c;
    } else if (cross < 0 && (right == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) < crossProduct(p.x, p.y, q.x, q.y, right.x, right.y))) {
      right = c;
    }
  }

  return right == null || left != null && left.r <= right.r ? left : right;
}

function makeCircumcircle(p0, p1, p2) {
  // Mathematical algorithm from Wikipedia: Circumscribed circle
  let ax = p0.x,
    ay = p0.y;
  let bx = p1.x,
    by = p1.y;
  let cx = p2.x,
    cy = p2.y;
  const d = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) * 2;
  if (d == 0) {
    return null;
  }
  const x = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
  const y = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
  return { x, y, r: distance(x, y, ax, ay) };
}

function makeDiameter(p0, p1) {
  return {
    x: (p0.x + p1.x) / 2,
    y: (p0.y + p1.y) / 2,
    r: distance(p0.x, p0.y, p1.x, p1.y) / 2,
  };
}

/* Simple mathematical functions */
function isInCircle(c, p) {
  return c != null && distance(p.x, p.y, c.x, c.y) < c.r + EPSILON;
}

// Returns twice the signed area of the triangle defined by (x0, y0), (x1, y1), (x2, y2)
function crossProduct(x0, y0, x1, y1, x2, y2) {
  return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
}

function distance(x0, y0, x1, y1) {
  return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
}

/*
 * Returns the smallest circle that encloses all the given points. Runs in expected O(n) time, randomized.
 * Input: A list of points, where each point is an object {x: float, y: float}, e.g. [{x:0,y:5}, {x:3.1,y:-2.7}].
 * Output: A circle object of the form {x: float, y: float, r: float}.
 * Note: If 0 points are given, null is returned. If 1 point is given, a circle of radius 0 is returned.
 */
module.exports = function makeBoundingCircle(points) {
  // Clone list to preserve the caller's data, do Knuth shuffle
  const shuffled = points.slice();
  for (let i = points.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    j = Math.max(Math.min(j, i), 0);
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  // Progressively add points to circle or recompute circle
  let c = null;
  for (let i = 0; i < shuffled.length; i++) {
    const p = shuffled[i];
    if (c == null || !isInCircle(c, p)) { c = makeCircleOnePoint(shuffled.slice(0, i + 1), p); }
  }

  return c;
};
