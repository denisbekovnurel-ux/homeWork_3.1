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

const parentElem = document.querySelector(".parent_block");
const childElem = document.querySelector(".child_block");

let left = 0;
const step = 1;
const maxLeft = parentElem.clientWidth - childElem.offsetWidth; // 500 - 50

const moveChild = () => {
  childElem.style.left = left + "px";
  left += step;

  if (left <= maxLeft) {
    setTimeout(moveChild, 10);
  }
};

moveChild();
