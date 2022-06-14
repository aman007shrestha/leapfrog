import { LANE_WIDTH, LANE_COUNT } from './constants.js';
import { LANE_MIDPOINT } from './utilities.js';

class Car {
  // @param Position: Object keys: top and currentLane
  // @param Dimention: Width and height
  constructor({ position, dimention }) {
    this.position = position;
    this.dimention = dimention;
    this.position.left = LANE_MIDPOINT[this.position.currentLane];
    this.createCar();
  }
  createCar() {
    this.element = document.createElement('div');
    this.element.style.width = this.dimention.width + 'px';
    this.element.style.height = this.dimention.height + 'px';
    this.element.style.position = 'absolute';
    this.element.style.left = this.position.left + 'px';
    this.element.style.transform = 'translateX(-50%)';
  }
}

export { Car };
