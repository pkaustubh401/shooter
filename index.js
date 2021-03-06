const p1fire = document.getElementById("p1fire");
const p2fire = document.getElementById("p2fire");

var winStatement = `Welcome , lets have a fight &#128520;
                    <br>Press fire button to start the fight`;

//ui elements to be chnaged
const p1HealthBar = document.getElementById("p1HealthBar");
const p2HealthBar = document.getElementById("p2HealthBar");
const p1RemaningHealth = document.getElementById("p1RemaningHealth");
const p2RemaningHealth = document.getElementById("p2RemaningHealth");

const roundNumber = document.getElementById("roundNumber");
const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");

const winStatementdiv = document.getElementById("winStatement");

const reset = document.getElementById("reset");

//localstorage
//initialize localstorage
//set game object variables
//update local storage

function initializeLocalStorage() {
  if (!localStorage.getItem("roundNumber")) {
    localStorage.setItem("roundNumber", 1);
    console.log(Number(localStorage.getItem("roundNumber")));
  } else {
    console.log(Number(localStorage.getItem("roundNumber")));
  }

  if (!localStorage.getItem("p1Wins")) {
    localStorage.setItem("p1Wins", 0);
    console.log(Number(localStorage.getItem("p1Wins")));
  } else {
    console.log(Number(localStorage.getItem("p1Wins")));
  }

  if (!localStorage.getItem("p2Wins")) {
    localStorage.setItem("p2Wins", 0);
    console.log(Number(localStorage.getItem("p2Wins")));
  } else {
    console.log(Number(localStorage.getItem("p2Wins")));
  }
}

function initializeVariables() {
  game = {
    state: true,
    round: {
      roundNumber: Number(localStorage.getItem("roundNumber")),
    },
    p1wins: Number(localStorage.getItem("p1Wins")),
    p2wins: Number(localStorage.getItem("p2Wins")),
  };

  p1 = {
    id: 1,
    name: "player1",
    health: 100,
  };
  p2 = {
    id: 2,
    name: "player2",
    health: 100,
  };
}

//firing

p1fire.addEventListener("click", () => {
  shoot(p2);
  if (isDead(p2)) {
    newRound();
  }
  updateUI();
  updateLocalStorage();
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode === 65 && game.state) {
    console.log(event.which);
    shoot(p2);
    if (isDead(p2)) {
      newRound();
    }
    updateUI();
    updateLocalStorage();
  }

  if (event.keyCode === 76 && game.state) {
    console.log(event.which);
    shoot(p1);
    if (isDead(p1)) {
      newRound();
    }
    updateUI();
    updateLocalStorage();
  }

  if (event.keyCode === 82) {
    console.log(event.which);
    game.state = true;
    p1fire.disabled = false;
    p2fire.disabled = false;
    game.round.roundNumber = 0;
    game.p1wins = 0;
    game.p2wins = 0;
    newRound();
    winStatement = `&#128127; New Game Started`;
    updateUI();
    updateLocalStorage();
  }
});

p2fire.addEventListener("click", () => {
  shoot(p1);
  if (isDead(p1)) {
    newRound();
  }
  updateUI();
  updateLocalStorage();
});

//shoot function that depletes health of opponent
function shoot(p) {
  winStatement = `&#128640; Fightttttttttttttttttttttttt &#128165; `;
  var power = getRandomInt(5);
  p.health = p.health - power;
  blink(p);
}

// function to get random integer
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//checks if player is dead
function isDead(p1) {
  if (p1.health <= 0) {
    return true;
  } else {
    return false;
  }
}

function newRound() {
  if (p1.health <= 0) {
    game.p2wins++;
    winStatement = `&#128525; Player 2 won this round <br>New Round Started!`;
  }

  if (p2.health <= 0) {
    game.p1wins++;
    winStatement = `&#128525; Player 1 won this round <br>New Round Started!`;
  }

  p1.health = 100;
  p2.health = 100;

  if (game.round.roundNumber >= 5 || game.p1wins >= 3 || game.p2wins >= 3) {
    game.state = false;
    declareWin();
    p1fire.disabled = true;
    p2fire.disabled = true;
  }

  game.round.roundNumber++;
}

//function that updates all the ui elements like score an health
function updateUI() {
  p1HealthBar.style.width = `${p1.health}%`;
  p2HealthBar.style.width = `${p2.health}%`;

  p1RemaningHealth.innerText = p1.health;
  p2RemaningHealth.innerText = p2.health;

  roundNumber.innerText = game.round.roundNumber;

  p1Score.innerText = game.p1wins;
  p2Score.innerText = game.p2wins;

  winStatementdiv.innerHTML = winStatement;
}

function updateLocalStorage() {
  localStorage.setItem("roundNumber", game.round.roundNumber);
  localStorage.setItem("p1Wins", game.p1wins);
  localStorage.setItem("p2Wins", game.p2wins);
}

//declare Win will check who is the game winner and print a win statement
function declareWin() {
  if (game.p2wins > game.p1wins) {
    winStatement = `&#129395; <b>HURAYYY</b> Player 2 won the game <br><small>Press RESET to play again</small>`;
  } else if (game.p1wins > game.p2wins) {
    winStatement = `&#129395; <b>HURAYYY</b> Player 1 won the game <br><small>Press RESET to play again</small>`;
  }
}

//reset button function
reset.addEventListener("click", () => {
  game.state = true;
  p1fire.disabled = false;
  p2fire.disabled = false;
  game.round.roundNumber = 1;
  game.p1wins = 0;
  game.p2wins = 0;
  newRound();
  winStatement = `&#128127; New Game Started`;
  updateUI();
  updateLocalStorage();
});

function blink(p) {
  var select = document.getElementById(`health-numbers-${p.id}`);

  select.classList.add("blink");

  setTimeout(() => {
    select.classList.remove("blink");
  }, 1000);
}

initializeLocalStorage();
initializeVariables();
updateUI();
if (game.round.roundNumber >= 5 || game.p1wins >= 3 || game.p2wins >= 3) {
  game.state = false;
  declareWin();
  p1fire.disabled = true;
  p2fire.disabled = true;
}
updateLocalStorage();
