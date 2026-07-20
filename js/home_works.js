// const inputElem = document.querySelector("#gmail_input");
// const btnElem = document.querySelector("#gmail_button");
// const resultElem = document.querySelector("#gmail_result");

// const regex = /^[a-zA-Z0-9._-]+@gmail\.com$/;

// btnElem.addEventListener("click", () => {
//   if (regex.test(inputElem.value)) {
//     resultElem.textContent = "Ok";
//     resultElem.style.color = "green";
//   } else {
//     resultElem.textContent = "Not ok";
//     resultElem.style.color = "red";
//   }
// });

// const parent = document.querySelector(".parent_block");
// const child = document.querySelector(".child_block");

// let positionX = 0;
// let positionY = 0;

// let maxRight = parent.clientWidth - child.offsetWidth;
// let maxDown = parent.clientHeight - child.offsetHeight;

// const moveBlock = () => {
//   if (positionX <= maxRight && positionY <= 0) {
//     positionX++;
//     child.style.left = `${positionX}px`;
//     requestAnimationFrame(moveBlock);
//   } else if (positionX >= maxRight && positionY <= maxDown) {
//     positionY++;
//     child.style.top = `${positionY}px`;
//     requestAnimationFrame(moveBlock);
//   } else if (positionX >= 0 && positionY >= maxDown) {
//     positionX--;
//     child.style.left = `${positionX}px`;
//     requestAnimationFrame(moveBlock);
//   } else if (positionX <= 0 && positionY >= 0) {
//     positionY--;
//     child.style.top = `${positionY}px`;
//     requestAnimationFrame(moveBlock);
//   }
// };

// moveBlock();

// const secondsElem = document.querySelector("#seconds");
// const startBtn = document.querySelector("#start");
// const stopBtn = document.querySelector("#stop");
// const resetBtn = document.querySelector("#reset");

// let seconds = 0;
// let intervalId = null;

// startBtn.addEventListener("click", () => {
//   if (intervalId !== null) return;
//   intervalId = setInterval(() => {
//     seconds += 1;
//     secondsElem.textContent = seconds;
//   }, 1000);
// });

// stopBtn.addEventListener("click", () => {
//   clearInterval(intervalId);
//   intervalId = null;
// });

// resetBtn.addEventListener("click", () => {
//   clearInterval(intervalId);
//   intervalId = null;
//   seconds = 0;
//   secondsElem.textContent = seconds;
// });

// const prom1A = new Promise((resolve) => resolve("Успех 1"));
// const prom2A = new Promise((resolve) => resolve("Успех 2"));

// prom1A
//   .then((resolve1) => {
//     console.log("Кейс 1 — Первый:", resolve1);
//     return prom2A;
//   })
//   .then((resolve2) => {
//     console.log("Кейс 1 — второй:", resolve2);
//   })
//   .catch((error) => {
//     console.log("Кейс 1 — ошибка:", error);
//   });

// const prom1B = new Promise((resolve) => resolve("Успех 1"));
// const prom2B = new Promise((resolve, reject) => reject("Ошибка 2"));

// prom1B
//   .then((resolve1) => {
//     console.log("Кейс 2 — Первый:", resolve1);
//     return prom2B;
//   })
//   .then((resolve2) => {
//     console.log("Кейс 2 — второй:", resolve2);
//   })
//   .catch((error) => {
//     console.log("Кейс 2 — ошибка:", error);
//   });

// const prom1C = new Promise((resolve, reject) => reject("Ошибка 1"));
// const prom2C = new Promise((resolve) => resolve("Успех 2"));

// prom1C
//   .then((resolve1) => {
//     console.log("Кейс 3 — Первый:", resolve1);
//     return prom2C;
//   })
//   .then((resolve2) => {
//     console.log("Кейс 3 — второй:", resolve2);
//   })
//   .catch((error) => {
//     console.log("Кейс 3 — ошибка:", error);
//   });

// const prom1D = new Promise((resolve, reject) => reject("Ошибка 1"));
// const prom2D = new Promise((resolve, reject) => reject("Ошибка 2"));

// prom1D
//   .then((resolve1) => {
//     console.log("Кейс 4 — Первый:", resolve1);
//     return prom2D;
//   })
//   .then((resolve2) => {
//     console.log("Кейс 4 — второй:", resolve2);
//   })
//   .catch((error) => {
//     console.log("Кейс 4 — ошибка:", error);
//   });

function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail
        ? reject(new Error(`Ошибка при обработке: ${value}`))
        : resolve(value);
    }, ms);
  });
}

delay(1, 500)
  .then((resolve1) => {
    console.log("Первый:", resolve1);
    return delay(2, 500, true);
  })
  .then((resolve2) => {
    console.log("Второй:", resolve2);
    return delay(3, 500);
  })
  .then((resolve3) => {
    console.log("Третий:", resolve3);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finally сработал");
  });

async function processDelays() {
  try {
    const r1 = await delay(1, 500);
    console.log("Первый:", r1);
    const r2 = await delay(2, 500, true);
    console.log("Второй:", r2);
    const r3 = await delay(3, 500);
    console.log("Третий:", r3);
  } catch (error) {
    console.log("Ошибка:", error);
  } finally {
    console.log("Finally сработал");
  }

  const values = [1, 2, 3, 4];
  const results = [];

  for (const value of values) {
    try {
      const shouldFail = Math.random() > 0.7;
      const res = await delay(value, 300, shouldFail);
      results.push({ value: res, error: null });
    } catch (error) {
      results.push({ value: value, error: error });
    }
  }

  console.log(results);
}

processDelays();

async function runAll() {
  try {
    const results = await Promise.all([
      delay(1, 300),
      delay(2, 400, true),
      delay(3, 500),
      delay(4, 600),
    ]);
    console.log("Все успешно:", results);
  } catch (error) {
    console.log("Promise.all упал:", error);
  }
}

runAll();

async function runAllSettled() {
  const results = await Promise.allSettled([
    delay(1, 300),
    delay(2, 400, true),
    delay(3, 500),
    delay(4, 600),
  ]);

  const succeeded = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);
  const failed = results
    .filter((r) => r.status === "rejected")
    .map((r) => r.reason);

  console.log("Succeeded:", succeeded);
  console.log("Failed:", failed);
}

runAllSettled();

async function runRace() {
  try {
    const result = await Promise.race([
      delay("полезные данные", 2000),
      delay(null, 500, true),
    ]);
    console.log("Race успех:", result);
  } catch (error) {
    console.log("Race — сработал таймаут:", error);
  }
}

runRace();
