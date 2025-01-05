const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resultMessageEl = document.getElementById("result-message");
const rulesButton = document.querySelector(".rules");
const rulesPopup = document.querySelector(".rules-popup");
const closeRulesButton = document.querySelector(".rules-popup .close");
const celebration = document.querySelector(".celebration");

let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

const replayBtn = document.getElementById("replay-btn");
const playAgainBtn = document.getElementById("play-again-btn");

playerScoreEl.textContent = playerScore;
computerScoreEl.textContent = computerScore;

const options = document.querySelectorAll(".option");

options.forEach((option) => {
  option.addEventListener("click", () => {
    const playerChoice = option.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    updateScores(result);
    displayResultMessage(playerChoice, computerChoice, result);
    saveScores();

    if (result === "player") {
      showCelebration();
    }
  });
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function updateScores(result) {
  if (result === "player") {
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else if (result === "computer") {
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }
}

function displayResultMessage(playerChoice, computerChoice, result) {
  if (result === "tie") {
    resultMessageEl.textContent = `It's a tie! Both chose ${playerChoice}.`;
    replayBtn.style.display = "block";
    playAgainBtn.style.display = "none";
  } else if (result === "player") {
    resultMessageEl.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
    replayBtn.style.display = "none";
    playAgainBtn.style.display = "block";
  } else {
    resultMessageEl.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
    replayBtn.style.display = "none";
    playAgainBtn.style.display = "block";
  }
}

replayBtn.addEventListener("click", () => {
  resultMessageEl.textContent = "";
  replayBtn.style.display = "none";
});

playAgainBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
  resultMessageEl.textContent = "";
  playAgainBtn.style.display = "none";
});

function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

function showCelebration() {
  celebration.style.display = "flex";
  setTimeout(() => {
    celebration.style.display = "none";
  }, 2000);
}

rulesButton.addEventListener("click", () => {
  rulesPopup.style.display = "block";
});

closeRulesButton.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});
