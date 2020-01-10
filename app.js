/* 

GAME FUNCTIONS:
- player must guess number between min and max
- player gest certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if loose
-let player choose to play again

*/

// Game Values

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max);
guessesLeft = 3;

// UI Elements

const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//   Assign UI to max and min
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listneere
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  //   Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    //   GAME OVER - WIN
    gameOver(true, `${winningNum} is correct! You WIN!`, "green");
  } else {
    //   Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // GAME OVER - LOST
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // game continues - answer wrong

      // change border color
      guessInput.style.borderColor = "red";
      // clear input
      guessInput.value = "";
      // tell user its the wrong number
      setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, "red");
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // disable input
  guessInput.disabled = true;
  // change border color
  guessInput.style.borderColor = color;
  // set message
  setMessage(msg, color);
  // Play again
  guessBtn.value = "Play Again?";
  guessBtn.className += "play-again";
}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// SetMessage function
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
