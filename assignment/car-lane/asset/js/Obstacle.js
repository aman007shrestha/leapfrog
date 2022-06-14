import { Car } from './Car.js';
import { SPEED } from './script.js';

class Obstacle extends Car {
  // @param Position: Object keys: top and currentLane
  // @param Dimention: Width and height
  // @method createCar: created a div element for Obstacle car
  // @method update : downward motion of car
  // @method collisionCheck: checks for collision with player car
  constructor({ position, dimention }) {
    super({ position, dimention });
  }
  createCar() {
    super.createCar();
    this.element.style.top = this.position.top + 'px';
    this.element.classList.add('opponent');
  }
  update() {
    this.position.top += SPEED;
    this.element.style.top = this.position.top + 'px';
  }
  collisionCheck(player) {
    player = player.element.getBoundingClientRect();
    let opponent = this.element.getBoundingClientRect();

    if (
      opponent.left < player.right &&
      opponent.right > player.left &&
      opponent.top < player.bottom &&
      opponent.bottom > player.top
    ) {
      return true;
    }
  }
}
export { Obstacle };
