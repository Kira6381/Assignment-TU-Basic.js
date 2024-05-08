const calculator = {
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
};

function updateDisplay() {
  const display = document.getElementById("display");
  display.value = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  updateDisplay();
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }

  updateDisplay();
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

const performCalculation = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
  "=": (x, y) => y,
};

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
}

document.addEventListener("DOMContentLoaded", function () {
  const buttonsContainer = document.getElementById("buttons");

  const buttons = [
    { id: "button-7", text: "7" },
    { id: "button-8", text: "8" },
    { id: "button-9", text: "9" },
    { id: "button-add", text: "+" },
    { id: "button-4", text: "4" },
    { id: "button-5", text: "5" },
    { id: "button-6", text: "6" },
    { id: "button-subtract", text: "-" },
    { id: "button-1", text: "1" },
    { id: "button-2", text: "2" },
    { id: "button-3", text: "3" },
    { id: "button-multiply", text: "*" },
    { id: "button-0", text: "0" },
    { id: "button-decimal", text: "." },
    { id: "button-clear", text: "C" },
    { id: "button-equal", text: "=" },
    { id: "button-divide", text: "/" },
  ];

  buttons.forEach((button) => {
    const btn = document.createElement("button");
    btn.textContent = button.text;
    btn.id = button.id;
    btn.classList.add("button");
    buttonsContainer.appendChild(btn);

    if (button.id === "button-equal" || button.id === "button-clear") {
      btn.addEventListener("click", () => {
        if (button.id === "button-equal") {
          handleOperator(button.text);
          updateDisplay();
        } else {
          resetCalculator();
          updateDisplay();
        }
      });
    } else {
      btn.addEventListener("click", () => {
        if (button.text === ".") {
          inputDecimal(button.text);
        } else if (!isNaN(parseFloat(button.text))) {
          inputDigit(button.text);
        } else {
          handleOperator(button.text);
        }
      });
    }
  });
});
