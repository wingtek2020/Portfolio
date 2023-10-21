let cards = [];
let colors = ['blue', 'red', 'yellow', 'green'];
let positions = [];

class Card {
  constructor(color) {
    cards.push(this);
    this.flipped = false;
    this.canFlip = true;
    this.color = color;
    this.img = `${color}Card.png`;
    this.x = 0;
    this.y = 0;
    this.render();
  }

  render = () => {
    this.element = document.createElement('div');
    this.element.style.backgroundImage = `url("assets/backCard.png")`;
    if (cards.indexOf(this) % 2 != 0) {
      this.x = '100%';
    }
    this.y = `${Math.floor(cards.indexOf(this) / 2) * 350}px`;
    this.element.style.transform = `translateX(${this.x}) translateY(${this.y})`;
    this.element.classList.add('card');
    this.element.addEventListener('click', this.flip);
    this.element.addEventListener('contextmenu', this.discard, false);
    document.querySelector('#gameScreen').appendChild(this.element);
    positions.push([this.x, this.y]);
  };

  flip = () => {
    // Ensures the card cannot be flipped while it is still in the process of flipping, which would break the animation.
    if (!this.canFlip) {
      return;
    }
    this.canFlip = false;
    setTimeout(() => {
      this.canFlip = true;
    }, 900);

    // Switches the background u and adds or removes the 'flipped' css class which handles the flipping animation
    let background = '';
    if (this.flipped) {
      this.flipped = false;
      this.element.style.transform = `translateX(${this.x}) translateY(${this.y}) rotateY(0deg)`;
      background = 'url(assets/backCard.png)';
    } else {
      this.flipped = true;
      this.element.style.transform = `translateX(${this.x}) translateY(${this.y}) rotateY(180deg)`;
      background = `url(assets/${this.img})`;
    }
    setTimeout(() => {
      this.element.style.backgroundImage = background;
    }, 400);
  };

  discard = (e) => {
    e.preventDefault();
    this.element.remove();
    return false;
  };
}

function generateCards(colors) {
  let leng = colors.length;
  for (let i = 0; i < leng; i++) {
    new Card(colors[i]);
  }
  document.querySelector('#gameScreen').style.height = `${
    350 * Math.floor(cards.length / 2)
  }px`;
}

function showColors(colors, i) {
  let leng = colors.length;
  let newColor = document.createElement('div');
  newColor.classList.add('color');
  newColor.style.backgroundColor = colors[i];
  document.querySelector('#colors').appendChild(newColor);
  if (i < leng - 1) {
    setTimeout(() => {
      showColors(colors, i + 1);
    }, 250);
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function shuffleCards() {
  shuffle(positions);
  for (let i = 0; i < cards.length; i++) {
    cards[i].x = positions[i][0];
    cards[i].y = positions[i][1];
    cards[
      i
    ].element.style.transform = `translateX(${cards[i].x}) translateY(${cards[i].y}) rotateY(0deg)`;
  }
}

function flipCard() {
  let leng = cards.length;
  for (let i = 0; i < leng; i++) {
    cards[i].flip();
    setTimeout(() => {
      cards[i].flip();
    }, 2000);
  }
}

function startGame() {
  document.querySelector('#title').style.animationName = 'titleSlideOut';
  shuffle(colors);
  generateCards(colors);
  shuffle(colors);
  // shuffle(positions);
  document.querySelector('#playButton').style.display = 'none';
  setTimeout(() => {
    flipCard();
  }, 100);
  setTimeout(() => {
    showColors(colors, 0);
  }, 4000);
}

function restart() {
  let leng = cards.length;
  for (let i = 0; i < leng; i++) {
    cards[i].discard(new Event('test'));
  }
  cards = [];
  startGame();
}

function displayOutcome() {
  //display if user is correct
}
