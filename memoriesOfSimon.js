let cards = [];
let colors = ['blue', 'red', 'yellow', 'green'];

class Card {
  constructor(color) {
    this.canFlip = true;
    this.color = color;
    this.img = `${color}Card.png`;
    this.render();
    cards.push(this);
  }

  render = () => {
    this.element = document.createElement('div');
    this.element.style.backgroundImage = `url("assets/backCard.png")`;
    this.element.classList.add('card');
    this.element.addEventListener('click', this.flip);
    document.body.appendChild(this.element);
  };

  flip = () => {
    // Ensures the card cannot be flipped while it is still in the process of flipping, which would break the animation.
    if (this.canFlip) {
      this.canFlip = false;
      setTimeout(() => {
        this.canFlip = true;
      }, 900);

      // Switches the background t and adds or removes the 'flipped' css class which handles the flipping animation
      let background = '';
      if (this.element.classList.contains('flipped')) {
        this.element.classList.remove('flipped');
        background = 'url(assets/backCard.png)';
      } else {
        this.element.classList.add('flipped');
        background = `url(assets/${this.img})`;
      }
      setTimeout(() => {
        this.element.style.backgroundImage = background;
      }, 400);
    }
  };
}

generateCards(colors);

function generateCards(colors) {
  let leng = colors.length;
  for (let i = 0; i < leng; i++) {
    new Card(colors[i]);
  }
}

function flipCard() {
  // turn all cards to backCard asset or backover to originalCard
}

function startGame() {
  //generate the game set vars
}

function restart() {
  //restart the game
}

function displayOutcome() {
  //display if user is correct
}
