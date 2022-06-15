class Bird {
  constructor({ position, dimension }) {
    this.position = position;
    this.dimension = dimension;
    this.speed = 1;
    this.createBird();
  }
  createBird() {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.classList.add('bird');
    this.element.style.top = toPx(this.position.top);
    this.element.style.left = toPx(this.position.left);
    this.element.style.height = toPx(this.dimension.height);
    this.element.style.width = toPx(this.dimension.width);
  }
  updateBird() {
    if (this.position.top + this.dimension.height === CONTAINER_HEIGHT) {
      GAME_OVER = true;
    }
    if (this.position.top + this.dimension.height <= 600) {
      this.position.top += GRAVITY;
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
          this.position.top -= 60;
          this.element.style.top = toPx(this.position.top);
        }
      }
    });
  }
  deadAnimation() {
    let deadInterval = setInterval(() => {
      if (this.position.top + this.dimension.height >= CONTAINER_HEIGHT) {
        this.element.style.top = toPx(CONTAINER_HEIGHT - this.dimension.height);
        clearInterval(deadInterval);
      }
      this.position.top += 10;
      this.element.style.transform = 'rotate(90deg)';
      this.element.style.top = toPx(this.position.top);
    }, 10);
  }
}
