import { Player } from './Player.js';
import { Obstacle } from './Obstacle.js';

let SCORE = 0;
export let SPEED = 4;
export let GAME_OVER = true;
let HIGH_SCORE;
let player;
let obstacles = [];

const gameSelector = document.querySelector('.game');
const scoreSelector = document.querySelector('.score');
const gameScore = gameSelector.querySelector('.game__score');
const home = document.querySelector('.home');
const gameOverMenu = document.querySelector('.game-over--menu');
const start_button = home.querySelector('.home__button');
const highScoreSelector = gameOverMenu.querySelector('.high_score');
const restart = gameOverMenu.querySelector('.restart');
const gameContainerObject = gameSelector.getBoundingClientRect();
gameSelector.style.display = 'none';

start_button.addEventListener('click', () => {
  GAME_OVER = false;
  main();
});

function createPlayer() {
  player = new Player({
    position: {
      bottom: 15,
      currentLane: 1,
    },
    dimention: {
      width: 50,
      height: 80,
    },
  });
  gameSelector.appendChild(player.element);
  window.addEventListener('keydown', (event) => {
    player.moveCar(event);
    event.stopPropagation();
  });
}
createPlayer();

function createObstacles(numberOfObstacle, top) {
  // check over lap generation
  if (top) {
    const lastElement = obstacles.slice(-1)[0];
    // take last elem compare height
    if (top > lastElement.position.top) {
      let diff = top - lastElement.position.top;
      top = top - diff - 300;
    }
  }
  let number = numberOfObstacle ? numberOfObstacle : 5;
  for (let i = 0; i < number; i++) {
    let obs = new Obstacle({
      position: {
        top: top ? top : -i * 200,
        currentLane: Math.floor(Math.random() * 3),
      },
      dimention: {
        width: 50,
        height: 80,
      },
    });
    obstacles.push(obs);
    gameSelector.appendChild(obs.element);
  }
}

function play() {
  let animationID = window.requestAnimationFrame(play);
  obstacles.forEach((obstacle) => {
    obstacle.update();
    // Check collision; no check if top < 500
    if (obstacle.position.top > gameContainerObject.height - 200) {
      const game_over = obstacle.collisionCheck(player);
      if (game_over) {
        GAME_OVER = true;
        window.cancelAnimationFrame(animationID);
        scoreSelector.innerHTML = `Score: ${SCORE}`;
        gameOverMenu.style.display = 'flex';
        // Update HIGH SCORE
        HIGH_SCORE = localStorage.getItem('HIGH_SCORE');
        if (SCORE > HIGH_SCORE) {
          HIGH_SCORE = SCORE;
          localStorage.setItem('HIGH_SCORE', HIGH_SCORE);
        }
        highScoreSelector.innerHTML = `High Score: ${HIGH_SCORE}`;
        restart.addEventListener('click', () => {
          // remove all child
          while (gameSelector.lastChild.id !== 'player') {
            gameSelector.removeChild(gameSelector.lastChild);
          }
          gameOverMenu.style.display = 'none';
          GAME_OVER = false;
          gameScore.innerHTML = `Score: ${0}`;
          main();
        });
      }
    }
    if (obstacle.position.top >= gameContainerObject.height) {
      SCORE += 1;
      gameScore.innerHTML = `Score: ${SCORE}`;
      if (SCORE % 10 == 0) {
        if (SPEED < 15) {
          SPEED += 2;
        }
      }
      obstacle.element.remove();
      obstacles.shift();
      createObstacles(1, -Math.random() * 1000 - 100);
    }
  });
}

function main() {
  if (!GAME_OVER) {
    obstacles = [];
    SCORE = 0;
    home.style.display = 'none';
    gameSelector.style.display = 'block';
    createObstacles();
    play();
  }
}
main();
