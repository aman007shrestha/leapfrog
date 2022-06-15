class Obstacle {
  constructor({ position, dimension }) {
    this.position = position;
    this.dimension = dimension;
    this.elements = [];
    this.gap = GAP;
    this.createObstacles();
  }
  createObstacles() {
    this.elementTop = document.createElement('div');
    this.elementTop.classList.add('top-obstacle');
    this.elementTop.style.position = 'absolute';
    this.elementTop.style.width = toPx(52);
    this.elementTop.style.height = toPx(this.dimension.height);
    this.elementTop.style.top = toPx(this.position.top);
    this.elementTop.style.left = toPx(this.position.left);
    gameSelector.appendChild(this.elementTop);
    // Bottom Element
    this.elementBottom = document.createElement('div');
    this.elementBottom.classList.add('bottom-obstacle');
    this.elementBottom.style.position = 'absolute';
    this.elementBottom.style.top = toPx(this.dimension.height + this.gap);
    this.elementBottom.style.width = toPx(52);
    this.elementBottom.style.left = toPx(this.position.left);
    this.elementBottom.style.height = toPx(
      CONTAINER_HEIGHT - this.dimension.height - GAP
    );
    this.elements.push(this.elementBottom);
    this.elements.push(this.elementTop);
    gameSelector.appendChild(this.elementBottom);
  }
  updateObstacle() {
    this.position.left -= 2;
    this.elementTop.style.left = toPx(this.position.left);
    this.elementBottom.style.left = toPx(this.position.left);
  }
  checkCollision(bird) {
    if (
      bird.position.left + bird.dimension.width >= this.position.left &&
      (bird.position.top < this.dimension.height ||
        bird.position.top >=
          this.dimension.height + GAP - bird.dimension.height)
    ) {
      return true;
    }
  }
}
