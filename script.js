const toggle = document.querySelector(".themes__toggle");
const toggleDark = () => {
  toggle.classList.toggle("themes__toggle--isActive");
};
toggle.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toggleDark();
  }
});
toggle.addEventListener("click", toggleDark);

let currentNumber = "";
let storedNumber = "";
let operation = "";
const calcResult = document.querySelector(".calc__result");
const calcKey = document.querySelectorAll("[data-type]");
const updateUi = (value) => {
  calcResult.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  currentNumber += value;
  updateUi(currentNumber);
};
const resetButton = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateUi(currentNumber);
};

const deleteButton = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateUi(currentNumber);
};

const Equal = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        currentNumber = "";
        updateUi(storedNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        currentNumber = "";
        updateUi(storedNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        currentNumber = "";
        updateUi(storedNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        currentNumber = "";
        updateUi(storedNumber);
        break;
    }
  }
};
const operationButton = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) Equal();
  }
};

const keyElement = (ele) => {
  ele.addEventListener("click", () => {
    const value = ele.dataset.value;
    if (ele.dataset.type === "number") {
      numberButtonHandler(value);
    } else if (ele.dataset.type === "operation") {
      switch (value) {
        case "c":
          resetButton();
          break;
        case "Backspace":
          deleteButton();
          break;
        case "Enter":
          Equal();
          break;
        default:
          operationButton(value);
      }
    }
  });
};

calcKey.forEach(keyElement);
