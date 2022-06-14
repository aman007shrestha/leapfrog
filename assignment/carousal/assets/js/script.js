// selectors
let carouselContainer = document.querySelector('.carousel-container');
let carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
// Initialization
carouselImageWrapper.style.left = '0px';
let carouselImageWrapperWidth = 0;
let TRANSITION_TIME = 1 / 640;
const IMAGE_WIDTH = 640;
const HOLD_TIME = 3000;
let currentIndex = 0;
let image_array = carouselImageWrapper.children;
carouselImageWrapperWidth = image_array.length * IMAGE_WIDTH;

// add attribute data to img
for (let i = 0; i < image_array.length; i++) {
  image_array[i].setAttribute('data', i);
  console.log(image_array[i].attributes.data.value);
}
// Button Class
class Button {
  constructor(position) {
    this.position = position;
  }
  create() {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.top = '50%';
    this.element.style.transform = 'translateY(-50%)';
    this.element.style.fontSize = '70px';
    this.element.style.cursor = 'pointer';
    this.element.style.fontWeight = 'bold';
    this.element.style.color = 'rgb(200 196 200)';
    if (this.position === 'left') {
      this.element.innerHTML = '<';
      this.element.style.left = '5%';
    }
    if (this.position === 'right') {
      this.element.innerHTML = '>';
      this.element.style.right = '5%';
    }
  }
}
// Buttons left right object
let leftButton = new Button('left');
leftButton.create();
carouselContainer.appendChild(leftButton.element);
let rightButton = new Button('right');
rightButton.create();
carouselContainer.appendChild(rightButton.element);

// navigator container
class CircleLink {
  constructor(imageData) {
    this.imageData = imageData;
    this.element = document.createElement('div');
    this.element.style.borderRadius = '50%';
    this.element.setAttribute('data', imageData);
    this.element.style.width = '15px';
    this.element.style.height = '15px';
    this.element.style.backgroundColor = 'rgb(200 196 200)';
    this.element.style.margin = '20px 10px';
    this.element.style.cursor = 'pointer';
  }
}
//  circle container
let navigationCircles = [];
class NavigatorCircleContainer {
  constructor() {
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.display = 'flex';
    this.element.style.left = '50%';
    this.element.style.transform = 'translateX(-50%)';
    this.element.style.bottom = '0px';

    Object.values(image_array).forEach((imageElement) => {
      let image_data = imageElement.attributes.data.value;
      let circle = new CircleLink(image_data);
      console.log(circle);
      this.element.appendChild(circle.element);
      navigationCircles.push(circle);
    });
  }
}
let navigator = new NavigatorCircleContainer();
carouselContainer.appendChild(navigator.element);

function activeButton(currentIndex) {
  currentIndex = parseInt(currentIndex);
  navigationCircles.forEach((circle) => {
    circle.element.classList.remove('active__button');
    console.log(currentIndex);
    if (circle.imageData == currentIndex) {
      circle.element.classList.add('active__button');
    }
  });
}

let leftWidth;
let leftClick = 0;
let rightClick = 0;
let HOLD_TIMEOUT;
//  logic for transition
function animate(slideInt, event) {
  let leftWidth = parseInt(carouselImageWrapper.style.left);
  console.log(leftWidth);
  if (leftWidth % IMAGE_WIDTH !== 0) {
    return;
  }
  clearTimeout(HOLD_TIMEOUT);
  let holdTime = IMAGE_WIDTH;
  let slideInterval;
  if (slideInt < 0) {
    currentIndex += 1;
    leftClick = 0;
    rightClick += 1;
  }
  if (slideInt > 0) {
    currentIndex -= 1;
    rightClick = 0;
    leftClick += 1;
  }
  // console.log(currentIndex);
  // call to activate button
  activeButton(currentIndex);
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(() => {
    let leftWidth = parseInt(carouselImageWrapper.style.left);
    if (rightClick) {
      leftWidth = leftWidth - 10;
      holdTime -= 10;

      if (holdTime <= 0) {
        clearInterval(slideInterval);
        HOLD_TIMEOUT = setTimeout(() => {
          animate(-IMAGE_WIDTH);
        }, HOLD_TIME);
      }
      if (leftWidth < -carouselImageWrapperWidth + IMAGE_WIDTH) {
        currentIndex = image_array.length - 1;
        // reverse animation direction left
        animate(+IMAGE_WIDTH);
        clearInterval(slideInterval);
        return;
      }
    }
    if (leftClick) {
      leftWidth = leftWidth + 10;
      holdTime -= 10;
      if (holdTime === 0) {
        clearInterval(slideInterval);
        HOLD_TIMEOUT = setTimeout(() => {
          animate(+IMAGE_WIDTH);
        }, HOLD_TIME);
      }

      if (leftWidth > 0) {
        currentIndex = 0;
        // reverse animation direction right
        animate(-IMAGE_WIDTH);
        clearInterval(slideInterval);
        return;
      }
    }

    carouselImageWrapper.style.left = leftWidth + 'px';
  }, 5);
}
function eventListeners() {
  HOLD_TIMEOUT = setTimeout(() => {
    animate(-IMAGE_WIDTH);
  }, 3000);
  rightButton.element.addEventListener('click', (event) => {
    animate(-IMAGE_WIDTH);
  });
  leftButton.element.addEventListener('click', (event) => {
    animate(+IMAGE_WIDTH);
  });
  navigationCircles.forEach((circle) => {
    circle.element.addEventListener('click', () => {
      let transition;
      let gap = (currentIndex - circle.imageData) * IMAGE_WIDTH;
      currentIndex = circle.imageData;
      clearTimeout(HOLD_TIMEOUT);
      if (gap > 0) {
        transition = +10;
      } else if (gap < 0) {
        transition = -10;
        gap = gap * -1;
      }
      setInterval(() => {
        let leftWidth = parseInt(carouselImageWrapper.style.left);
        if (gap <= 0) {
          return;
        }
        leftWidth += transition;
        gap -= 10;
        carouselImageWrapper.style.left = leftWidth + 'px';
      }, 1);
      HOLD_TIMEOUT = setTimeout(() => {
        animate(+IMAGE_WIDTH);
      }, HOLD_TIME);

      // circleImagedata to active class
      activeButton(currentIndex);
    });
  });
}
eventListeners();
activeButton(currentIndex);
