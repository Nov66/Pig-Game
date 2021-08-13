'use strict';

// HIGHLIGHT: Pig Game -> define elements on the top of file

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //NOTE: another way of select element by ID
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/* Starting Conditions === initGame function
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');  NOTE: just add 'hidden' class in the CSS, no need in the HTML

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];  NOTE: scores hold variables of player 0 and player 1 score
let playing = true;
*/

let scores, currentScore, activePlayer, playing;

const initGame = function () {
  // NOTE: These are scoped, cannot use outside the function -> need to declare outside -> reassign here
  currentScore = 0;
  scores = [0, 0];
  playing = true;
  activePlayer = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initGame();

const switchPlayer = function () {
  // Switch to next player
  // 1. current player's score set to  0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // 2. switch the player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // 3. set the current score to 0 then back to loop for another player
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`; // NOTE: select the corresponding dice image

    // 3. Check for rolled 1 -> true -> switch to next player
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      // Select current player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to active player's score
    scores[activePlayer] += currentScore; // NOTE: scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initGame);
