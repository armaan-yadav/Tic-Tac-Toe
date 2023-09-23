const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const container = document.querySelector(".container");
const landingPage = document.querySelector(".landing-page");
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const overlay = document.querySelector(".overlay");
const overlayText = document.querySelector(".overlay-text");
const roundBox = document.querySelectorAll(".round-box");
const won1 = document.querySelector(".won1");
const won2 = document.querySelector(".won2");
const draw1 = document.querySelector(".draw1");
const draw2 = document.querySelector(".draw2");
const nextBtn = document.querySelector(".next");
const player = document.querySelectorAll(".player");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
let oTurn;
let round = 8;
let count = 0;
// For selecting the number of rounds user wants ton play//
roundBox.forEach((e) => {
  e.addEventListener("click", () => {
    roundBox.forEach((e) => {
      e.classList.remove("round-select");
    });
    e.classList.add("round-select");
    round = parseInt(e.innerHTML);
  });
});

// start of thhe game --> after user selects the number of rounds //
function startGame() {
  container.style.display = "flex";
  landingPage.style.display = "none";
  startRound();
}

function startRound() {
  count++;
  if (count % 2 == 0) oTurn = true;
  else oTurn = false;
  console.log("abc");
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  boardHoverEffect();
}

// handles the things when the user clicks on the individual cell
//  determinbes the current class, place marks(x or o),check for winnner, then check for draw then swap turn and then hover effect
function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  console.log(currentClass);
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    winner(currentClass);
    console.log("Winner");
  } else if (checkDraw()) {
    console.log("Draw");
    draw();
  } else {
    swapTurn();
    boardHoverEffect();
  }
  if (count == round) {
    if (parseInt(won1.textContent) > parseInt(won2.textContent)) {
      overlayText.textContent = "PLayer 1 Won the Series ";
    }
    else{
        overlayText.textContent = "PLayer 2 Won the Series ";

    }
     if(parseInt(won1.textContent) = parseInt(won2.textContent)){
        overlayText.textContent = "Series Drawn ";
    }
  }
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  player1.style.setProperty("--after1", "none");
  player2.style.setProperty("--after2", "none");

  if (currentClass != X_CLASS) {
    player1.style.setProperty("--after1", "rgba(255,255,255,.5)");
  } else {
    player2.style.setProperty("--after2", "rgba(255,255,255,.5)");
  }
}

function swapTurn() {
  oTurn = !oTurn;
}
function boardHoverEffect() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function checkDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function draw() {
  overlayText.textContent = "Draw";
  overlay.style.display = "flex";
  if (count === round) {
    nextBtn.textContent = "New Game";
    overlayText.textContent = "GAme Over";
    overlay.style.display = "flex";
  }
  let temp = draw1.textContent;
  temp++;
  draw1.textContent = temp;
  draw2.textContent = temp;
}
function winner(currentClass) {
  overlayText.textContent = `Match${count} Winner: ${currentClass}`;
  overlay.style.display = "flex";
  if (count === round) {
    nextBtn.textContent = "New Game";
    overlayText.textContent = "GAme Over";
    overlay.style.display = "flex";
  }
  if (currentClass == X_CLASS) {
    let temp = parseInt(won1.textContent);
    temp++;
    won1.textContent = temp;
  } else {
    let temp = parseInt(won2.textContent);
    temp++;
    won2.textContent = temp;
  }
}
function nextRound() {
  if (count < round) {
    overlay.style.display = "none";
    [...cellElements].forEach((e) => {
      if (e.classList.contains(X_CLASS)) {
        e.classList.remove(X_CLASS);
      } else if (e.classList.contains(O_CLASS)) e.classList.remove(O_CLASS);
    });
    startRound();
  } else if (count == round) {
    location.reload();
  }
}

/* array.some is useed to check if any of the value in the given
array passes the testn  case(function)
array.some(function_name) // note that there is no arg passed
agar koi ek bhi true hoga  test case toh array.some will bwecome
true
and talking about array.every  me saare shiiii honge toh hi 
array.every equal to true else nayi 
const arr = [1, 2, 4, 5];
console.log(arr.every(check));
function check(e) {
  return e >= 1;
}
*/
