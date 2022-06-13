// Utilities Functions
// Random colors for ball
/* @ params: none
  @returns string of colorcode
*/
const getRandomColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  var code = '#';
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * hex.length);
    code += hex[index];
  }
  return code;
};
// Generate Random between two number
//  @param range min and max
// @returns random num between given range
function genRand(min = 0, max = 100) {
  let diff = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * diff);
  return rand + min;
}
// Check for intersection based on r1 + r2 >= distance between center => collision condition
// @params centers, radius of both object
// @return Bool: true => collision
function ballIntersect(x1, y1, r1, x2, y2, r2) {
  let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  return squareDistance <= (r1 + r2) * (r1 + r2);
}

function calculateVector(x1, y1, vx1, vy1, x2, y2, vx2, vy2) {
  let collisionVector = { x: x2 - x1, y: y2 - y1 };
  let distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  let normalizedCollisionV = {
    x: collisionVector.x / distance,
    y: collisionVector.y / distance,
  };
  // Direction of collision => normalizedCollisionVecotr
  let relativeVelocityVector = { x: vx1 - vx2, y: vy1 - vy2 };
  // console.log('Relative V');
  // console.log(relativeVelocityVector);
  let speed =
    relativeVelocityVector.x * normalizedCollisionV.x +
    relativeVelocityVector.y * normalizedCollisionV.y;
  return {
    speed,
    normalizedCollisionV,
  };
}
export { getRandomColor, genRand, ballIntersect, calculateVector };
