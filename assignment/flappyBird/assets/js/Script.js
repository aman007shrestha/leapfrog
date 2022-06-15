let obstacles = [];
let bird;
let GAME_OVER;
let SCORE = 0;
let HIGH_SCORE;
let startEvent;
function createObstacle() {
  let lastObject = obstacles.slice(-1)[0];
  const obstacle = new Obstacle({
    position: {
      left: lastObject
        ? lastObject.position.left + 250 + Math.ceil(Math.random() * 200)
        : 500,
      top: 0,
    },
    dimension: {
      // randomly generate Height between 300 and 100
      height: Math.ceil(Math.random() * 100 + 100),
    },
  });
  obstacles.push(obstacle);
}
function main(replay) {
  bird = new Bird({
    position: {
      top: 230,
      left: 20,
    },
    dimension: {
      height: 50,
      width: 50,
    },
  });
  gameSelector.appendChild(bird.element);
  obstacles = [];
  // Create Initial Obctacle
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

function play() {
  let animationId = window.requestAnimationFrame(play);
  if (GAME_OVER) {
    window.cancelAnimationFrame(animationId);
    // Restart Codes Here
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
      SCORE = 0;
      let replay = true;
      GAME_OVER = false;
      main(replay);
    });
  }

  bird.updateBird();
  obstacles.forEach((obstacle) => {
    obstacle.updateObstacle();
    // Check collision only when obstacle is close
    if (obstacle.position.left < 200) {
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
