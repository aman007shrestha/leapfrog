import { Car } from './Car.js';
import { GAME_OVER } from './script.js';
import { LANE_WIDTH, LANE_COUNT } from './constants.js';

class Player extends Car {
  // @param Position: Object keys: top and currentLane
  // @param Dimention: Width and height
  // @method createCar: created a div element for car
  // @method moveCar : param: event controls animation of movement of car
  constructor({ position, dimention }) {
    super({ position, dimention });
  }
  createCar() {
    super.createCar();
    this.element.style.bottom = this.position.bottom + 'px';
    this.element.classList.add('player');
    this.element.setAttribute('id', 'player');
    this.currentLane = this.position.currentLane;
  }
  moveCar(event) {
    if (this.position.left % (LANE_WIDTH / 2) !== 0) {
      return;
    }
    if (this.currentLane === LANE_COUNT - 1 && event.key === 'd') {
      return;
    }
    if (this.currentLane === 0 && event.key === 'a') {
      return;
    }
    // Increase currentLane count
    if (event.key === 'd') {
      this.currentLane += 1;
    }
    if (event.key === 'a') {
      this.currentLane -= 1;
    }
    let moveWidth = LANE_WIDTH;
    setInterval(() => {
      if (moveWidth === 0) {
        return;
      }
      if (GAME_OVER) {
        return;
      }
      moveWidth -= 2;
      switch (event.key) {
        case 'd':
          this.position.left += 2;
          break;
        case 'a':
          this.position.left -= 2;
          break;
      }
      this.element.style.left = this.position.left + 'px';
    }, 1);
  }
}
export { Player };
