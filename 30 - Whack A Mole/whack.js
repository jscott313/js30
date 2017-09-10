const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const startBtn = document.querySelector('.start');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.random() * (max - min) + min;
}

function randomHole(holes) {
  const hole = holes[Math.floor(Math.random() * holes.length)];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const hole = randomHole(holes);
  const time = randomTime(200, 1000);
  hole.classList.add('up');
  hole.addEventListener('click', bonk);
  setTimeout(() => {
    hole.removeEventListener('click', bonk);
    hole.classList.remove('up');
    if (!timeUp) {
      peep();
    } else {
      endGame();
    }
  }, time);
}

function bonk(e) {
  if (!e.isTrusted) return; // prevent cheating!
  this.removeEventListener('click', bonk);
  this.classList.remove('up');
  scoreBoard.textContent = ++score;
}

function endGame() {
  startBtn.classList.remove('hide');
  scoreBoard.classList.add('ended');
}

function startGame() {
  score = 0;
  timeUp = false;
  startBtn.classList.add('hide');
  scoreBoard.classList.remove('ended');
  scoreBoard.textContent = score;
  peep();
  setTimeout(() => timeUp = true, 10000);
}

document.querySelector('.start').addEventListener('click', startGame);