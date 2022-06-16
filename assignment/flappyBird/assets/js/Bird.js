let flapInterval;
class Bird {
  constructor({ position, dimension }) {
    this.position = position;
    this.dimension = dimension;
    this.accelration = DEFAULT_GRAVITY;
    this.velocity = BIRD_DEFAULT_VELOCITY;
    this.createBird();
    this.animatePosition = [
      {
        x: -6,
        y: -14,
      },
      {
        x: -62,
        y: -14,
      },
      {
        x: -118,
        y: -14,
      },
    ];
    this.animateBird();
  }
  createBird() {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.classList.add('bird');
    this.element.setAttribute('id', 'bird');
    this.element.style.top = toPx(this.position.top);
    this.element.style.left = toPx(this.position.left);
    this.element.style.height = toPx(this.dimension.height);
    this.element.style.width = toPx(this.dimension.width);
  }
  animateBird() {
    let index = 0;
    flapInterval = setInterval(() => {
      index = ++index % this.animatePosition.length;
      this.element.style.backgroundPosition = `${this.animatePosition[index].x}px ${this.animatePosition[index].y}px`;
    }, BIRD_ANIMATION_INTERVAL);
  }
  updateBird() {
    if (frame % 10 === 0) {
      if (this.accelration < 9) {
        this.velocity += this.accelration;
        this.accelration += 0.2;
      }
    }
    if (this.position.top + this.dimension.height >= CONTAINER_HEIGHT) {
      GAME_OVER = true;
      this.element.style.top = toPx(CONTAINER_HEIGHT - this.dimension.height);
      return;
    }
    if (this.position.top + this.dimension.height <= CONTAINER_HEIGHT) {
      this.position.top += this.velocity;
    }
    this.element.style.top = toPx(this.position.top);
  }
  listenEvent() {
    window.addEventListener('keydown', (e) => {
      if (GAME_OVER) {
        return;
      }
      if (e.code === 'Space') {
        if (this.position.top >= 0) {
          this.accelration = DEFAULT_GRAVITY;
          this.velocity = BIRD_DEFAULT_VELOCITY;
          let threshold = DEFAULT_THRESHOLD;
          let jumpInterval = setInterval(() => {
            if (threshold <= 0) {
              clearInterval(jumpInterval);
            }
            threshold -= BIRD_FALL_VELOCITY;
            this.position.top -= BIRD_FALL_VELOCITY;
          }, BIRD_ANIMATION_INTERVAL);
        }
      }
    });
  }
  deadAnimation() {
    clearInterval(flapInterval);
    this.element.style.transform = 'rotate(90deg)';
    let deadInterval = setInterval(() => {
      if (this.position.top + this.dimension.height >= CONTAINER_HEIGHT - 10) {
        this.element.style.top = toPx(CONTAINER_HEIGHT - this.dimension.height);
        clearInterval(deadInterval);
      }
      this.position.top += DEAD_DROP_VELOCITY;
      this.element.style.top = toPx(this.position.top);
    }, BIRD_ANIMATION_INTERVAL);
  }
}
