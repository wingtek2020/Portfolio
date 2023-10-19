let cards = [];
let colors = ['blue', 'red', 'yellow', 'green'];

class Card {
  constructor(color) {
    this.color = color;
    this.img = `${color}Card.png`;
    this.render();
    cards.push(this);
  }

  render = () => {
    this.element = document.createElement('div');
    this.element.style.backgroundImage = `url("assets/backCard.png")`;
    this.element.classList.add('card');
    document.body.appendChild(this.element);
  };
}

generateCards(colors);

function generateCards(colors) {
  let leng = colors.length;
  for (let i = 0; i < leng; i++) {
    let newCard = new Card(colors[i]);
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
