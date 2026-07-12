const inputElem = document.querySelector("#gmail_input");
const btnElem = document.querySelector("#gmail_button");
const resultElem = document.querySelector("#gmail_result");

const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

btnElem.addEventListener("click", () => {
  if (regex.test(inputElem.value)) {
    resultElem.textContent = "Ok";
    resultElem.style.color = "green";
  } else {
    resultElem.textContent = "Not ok";
    resultElem.style.color = "red";
  }
});

const parent = document.querySelector(".parent_block");
const child = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;

let maxRight = parent.clientWidth - child.offsetWidth;
let maxDown = parent.clientHeight - child.offsetHeight;

const moveBlock = () => {
  if (positionX <= maxRight && positionY <= 0) {
    positionX++;
    child.style.left = `${positionX}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX >= maxRight && positionY <= maxDown) {
    positionY++;
    child.style.top = `${positionY}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX >= 0 && positionY >= maxDown) {
    positionX--;
    child.style.left = `${positionX}px`;
    requestAnimationFrame(moveBlock);
  } else if (positionX <= 0 && positionY >= 0) {
    positionY--;
    child.style.top = `${positionY}px`;
    requestAnimationFrame(moveBlock);
  }
};

moveBlock();

const secondsElem = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let seconds = 0;
let intervalId = null;

startBtn.addEventListener("click", () => {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    seconds += 1;
    secondsElem.textContent = seconds;
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  seconds = 0;
  secondsElem.textContent = seconds;
});

const prom1A = new Promise((resolve) => resolve("Успех 1"));
const prom2A = new Promise((resolve) => resolve("Успех 2"));

prom1A
  .then((resolve1) => {
    console.log("Кейс 1 — Первый:", resolve1);
    return prom2A;
  })
  .then((resolve2) => {
    console.log("Кейс 1 — второй:", resolve2);
  })
  .catch((error) => {
    console.log("Кейс 1 — ошибка:", error);
  });

const prom1B = new Promise((resolve) => resolve("Успех 1"));
const prom2B = new Promise((resolve, reject) => reject("Ошибка 2"));

prom1B
  .then((resolve1) => {
    console.log("Кейс 2 — Первый:", resolve1);
    return prom2B;
  })
  .then((resolve2) => {
    console.log("Кейс 2 — второй:", resolve2);
  })
  .catch((error) => {
    console.log("Кейс 2 — ошибка:", error);
  });

const prom1C = new Promise((resolve, reject) => reject("Ошибка 1"));
const prom2C = new Promise((resolve) => resolve("Успех 2"));

prom1C
  .then((resolve1) => {
    console.log("Кейс 3 — Первый:", resolve1);
    return prom2C;
  })
  .then((resolve2) => {
    console.log("Кейс 3 — второй:", resolve2);
  })
  .catch((error) => {
    console.log("Кейс 3 — ошибка:", error);
  });

const prom1D = new Promise((resolve, reject) => reject("Ошибка 1"));
const prom2D = new Promise((resolve, reject) => reject("Ошибка 2"));

prom1D
  .then((resolve1) => {
    console.log("Кейс 4 — Первый:", resolve1);
    return prom2D;
  })
  .then((resolve2) => {
    console.log("Кейс 4 — второй:", resolve2);
  })
  .catch((error) => {
    console.log("Кейс 4 — ошибка:", error);
  });
