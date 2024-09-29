let game = ["", "", "", "", "", "", "", "", ""];
let boxes = document.querySelectorAll(".grid-item");
let text = document.getElementById("text");
let res = document.getElementById("restart");
let winning_patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let p1 = true;
let gameOver = false;

text.innerText = `O's Turn`;

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (game[index] === "" && p1 && !gameOver) {
      box.innerText = "O";
      game[index] = "O";
      box.style.color = "#6f0000";
      box.style.pointerEvents = "none";
      check();
      if (!gameOver) {
        p1 = false;
        text.innerText = `X's Turn`;
        setTimeout(computerMove, 1000);
      }
    }
  });
});

function computerMove() {
  let availableMoves = [];
  game.forEach((value, index) => {
    if (value === "") {
      availableMoves.push(index);
    }
  });
  if (availableMoves.length > 0 && !gameOver) {
    let randomIndex =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    boxes[randomIndex].innerText = "X";
    game[randomIndex] = "X";
    boxes[randomIndex].style.color = "#2C5364";
    boxes[randomIndex].style.pointerEvents = "none";
    text.innerText = `O's Turn`;
    p1 = true;
    check();
  }
}

function check() {
  let w = false;
  winning_patterns.forEach((element) => {
    if (
      game[element[0]] !== "" &&
      game[element[0]] === game[element[1]] &&
      game[element[1]] === game[element[2]]
    ) {
      text.innerText = `${game[element[0]]} Is Winner`;
      w = true;
      gameOver = true;
      disable();
    }
  });
  if (!w && game.every((cell) => cell !== "")) {
    text.innerText = `It's A Draw`;
    gameOver = true;
  }
}

function disable() {
  boxes.forEach((box) => {
    box.style.pointerEvents = "none";
  });
}

function reset() {
  p1 = true;
  gameOver = false;
  text.innerText = `O's Turn`;
  boxes.forEach((box) => {
    box.style.pointerEvents = "auto";
    box.innerText = "";
  });
  game = ["", "", "", "", "", "", "", "", ""];
}

res.addEventListener("click", reset);