// Lane midpoint
import { LANE_COUNT, LANE_WIDTH } from './constants.js';

let LANE_MIDPOINT = [];
for (let i = 0; i < LANE_COUNT; i++) {
  LANE_MIDPOINT.push(LANE_WIDTH / 2 + i * LANE_WIDTH);
}
export { LANE_MIDPOINT };
