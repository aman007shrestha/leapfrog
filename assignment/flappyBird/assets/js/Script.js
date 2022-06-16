let obstacles = [];
let bird;
let GAME_OVER;
let SCORE = 0;
let HIGH_SCORE;
let startEvent;
let frame = 0;
// @desc create obstacle based on previoss object left position of random height
function createObstacle() {
  let lastObject = obstacles.slice(-1)[0];
  const obstacle = new Obstacle({
    position: {
      left: lastObject
        ? lastObject.position.left +
          MIN_OBSTACLE_GAP +
          Math.ceil(Math.random() * RANDOM_OBSTACLE_ADD)
        : FIRST_OBSTACLE_LEFT,
      top: 0,
    },
    dimension: {
      height: Math.ceil(
        Math.random() * OBSTACLE_RANDOM_HEIGHT + MIN_OBSTACLE_HEIGHT
      ),
    },
  });
  obstacles.push(obstacle);
}
// @desc Creates Bird, initial Obstacles and wait until start button clicked
function main(replay) {
  bird = new Bird({
    position: {
      top: BIRD_DEFAULT_TOP,
      left: BIRD_DEFAULT_LEFT,
    },
    dimension: {
      height: BIRD_DEFAULT_HEIGHT,
      width: BIRD_DEFAULT_WIDTH,
    },
  });
  gameSelector.appendChild(bird.element);
  obstacles = [];
  for (let i = 0; i < 5; i++) {
    createObstacle();
  }
  bird.listenEvent();
  if (replay) {
    replay = false;
    play();
  }
  HIGH_SCORE = localStorage.getItem('HIGH_SCORE');
  if (HIGH_SCORE) {
    bestScoreSelector.innerHTML = `Best ${HIGH_SCORE}`;
  }
  playSelector.addEventListener('click', () => {
    startSelector.style.display = 'none';
    play();
  });
}
// @desc Animation loop Restart if GAME_OVER, updateBird check obstacle
function play() {
  let animationId = window.requestAnimationFrame(play);
  frame += 1;
  if (GAME_OVER) {
    window.cancelAnimationFrame(animationId);
    bird.deadAnimation();
    HIGH_SCORE = localStorage.getItem('HIGH_SCORE');
    if (SCORE > HIGH_SCORE) {
      HIGH_SCORE = SCORE;
      localStorage.setItem('HIGH_SCORE', HIGH_SCORE);
    }
    bestScoreGameOver.innerHTML = `Best ${HIGH_SCORE}`;
    gameScore.innerHTML = `Score ${SCORE}`;
    gameOverSelector.style.display = 'block';

    replaySelector.addEventListener('click', (event) => {
      event.stopPropagation();
      bird = {};
      gameSelector.innerHTML = '';
      gameOverSelector.style.display = 'none';
      SCORE = SCORE_RESET;
      scoreSelector.innerHTML = SCORE;
      frame = FRAME_RESET;
      let replay = true;
      GAME_OVER = false;
      main(replay);
    });
  }
  bird.updateBird();
  obstacles.forEach((obstacle) => {
    obstacle.updateObstacle();
    // Check collision only when obstacle is close
    if (obstacle.position.left < OBSTACLE_CHECK_DISTANCE) {
      GAME_OVER = obstacle.checkCollision(bird);
    }
    if (obstacle.position.left < -OBSTACLE_WIDTH) {
      SCORE += 1;
      scoreSelector.innerHTML = SCORE;
      obstacles.shift();
      gameSelector.removeChild(obstacle.elementTop);
      gameSelector.removeChild(obstacle.elementBottom);
      createObstacle();
    }
  });
}

main();
