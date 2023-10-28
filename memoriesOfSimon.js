let cards = [];
let colors = [];
let userColorPics = [];
let positions = [];
let level = 1;



class Game{
  gameColors = ['blue', 'red', 'yellow', 'green']; 

 populateColors(){ 
    for (let x = 0; x < (level * 2); x++){
      let index = Math.floor(Math.random() * (level)) + 1;
      colors.push(this.gameColors[index]); 
    }
  }

 startLevel(){
    this.populateColors();
    document.querySelector('#restart').addEventListener('click', restart);
    document.querySelector('#title').style.animationName = 'titleSlideOut';
    this.shuffle(colors);
    this.generateCards(colors);
    this.displayScore();
    this.shuffle(colors);
    // shuffle(positions);
    document.querySelector('#playButton').style.display = 'none';
    document.querySelector('#gameLevel').style.display = 'none';
    setTimeout(() => {
      //this.element.style.backgroundImage = background;
    }, 400);
  };  

  generateCards(colors) {
    let leng = colors.length;
    for (let i = 0; i < leng; i++) {
      new Card(colors[i]);
    }
    document.querySelector('#gameScreen').style.height = `${
      350 * Math.floor(cards.length / 2)
    }px`;
  }

  showColors(colors, i) {
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
  
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  
  shuffleCards() {
    shuffle(positions);
    for (let i = 0; i < cards.length; i++) {
      cards[i].x = positions[i][0];
      cards[i].y = positions[i][1];
      cards[
        i
      ].element.style.transform = `translateX(${cards[i].x}) translateY(${cards[i].y}) rotateY(0deg)`;
    }
  }
  
  flipCard() {
    let leng = cards.length;
    for (let i = 0; i < leng; i++) {
      cards[i].flip();
      setTimeout(() => {
        cards[i].flip();
      }, 2000);
    }
  }

  displayScore(){
    //document.querySelector('#score').style.display = 'none';
  }
}

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

    userColorPics.push(this.color);
    console.log(userColorPics.toString());
    if (userColorPics.toString() === colors.toString())
      displayWonLevel();
  };

  discard = (e) => {
    e.preventDefault();
    this.element.remove();
    return false;
  };
}

function startGame() {
  game = new Game(2);
  document.querySelector('#playButton').hidden = true;
  document.querySelector('#restart').hidden = false;

  game.startLevel();
}

function displayWonLevel(){
  var vid = document.getElementById("winningVid");
  vid.hidden = false;
  vid.play();
}
function displayLevel() {
  //display if user is correct
  var userLevel = new Image();
  userLevel.src = 'assets/level1.png';
  document.querySelector('#gameResults').appendChild(userLevel);
  document.querySelector('#gameResults').style.display = 'display';
}

function restart() {
  colors = [];
  //find the div
  let gameScreen = document.querySelector('#gameScreen');
  while (gameScreen.firstChild) {
    gameScreen.removeChild(gameScreen.lastChild);
  }
  startGame();
}
