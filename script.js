const operatorsRegex = /[+\-x\/\^]/;

function Calculator() {
  this.memory = [];
  this.lastEntry = "0";
  this.currentEntry = "0";
  this.thereWasAnError = false;
  this.errorMessage = "";

  this.pressButton = function(button) {
    const isNumber = !isNaN(button);
    const isDot = (button === ".");
    const isOperator = operatorsRegex.test(button);
    const isClearEntry = (button === "CE");
    const isClearAll = (button === "CA");
    const isEqual = (button === "=");
    
    if (isNumber) {
      this.addNumberToEntry(button);
    } else if (isDot) {
      this.addDotToEntry();
    } else if (isOperator) {
      this.addOperatorToEntry(button);
    } else if (isClearEntry) {
      this.clearEntry();
    } else if (isClearAll) {
      this.clearAll();
    } else if (isEqual) {
      this.calculate();
    } else {
      console.error(`The method pressButton didn't detect the ${button} button.`)
      this.clearAll();
      this.displayText = "There was an error.";
      return;
    };

    if (this.thereWasAnError) {
      this.displayError()
    } else {
      this.updateDisplay();
    };
  };

  this.saveEntry = function() {
    const currentEntryEndsInDot = /\.$/.test(this.currentEntry);

    if (currentEntryEndsInDot) {this.currentEntry = this.currentEntry.slice(0, -1)}

    this.memory.push(this.currentEntry);
    this.lastEntry = this.currentEntry;
    this.currentEntry = "0";
  };

  this.displayText = "";
  this.updateDisplay = () => {this.displayText = this.currentEntry};

  this.displayError = () => {
    this.displayText = this.errorMessage;
    this.thereWasAnError = false;
  };

  this.raiseError = function(errorMessage) {
    this.thereWasAnError = true;
    this.errorMessage = errorMessage;
  }

  this.addNumberToEntry = function(value) {
    if (operatorsRegex.test(this.currentEntry)) this.saveEntry();

    if (this.currentEntry === "0" && value === "0") {
      return;
    } else if (this.currentEntry === "0") {
      this.currentEntry = value;
      return;
    } else {
      this.currentEntry += value;
    }
  };

  this.addDotToEntry = function() {
    const currentEntryHasDot = this.currentEntry.includes(".");
    const currentEntryIsOperator = operatorsRegex.test(this.currentEntry);

    if (!currentEntryHasDot && !currentEntryIsOperator) {this.currentEntry += "."};
  };

  this.addOperatorToEntry = function(operator) {
    const currentEntryIsNumber = !isNaN(this.currentEntry)

    if (currentEntryIsNumber) this.saveEntry();

    if (this.currentEntry === "x") {
      this.currentEntry = "^";
    } else {
    this.currentEntry = operator;
    };
  };

  this.clearEntry = function() {
    this.currentEntry = "0";
  };

  this.clearAll = function() {
    this.currentEntry = "0";
    this.lastEntry = "0";
    this.memory = [];
  };

  this.calculate = function() {
    const currentEntryIsOperator = operatorsRegex.test(this.currentEntry);
    const lastEntryIsOperator = operatorsRegex.test(this.lastEntry);
    if (!currentEntryIsOperator && lastEntryIsOperator) this.saveEntry();

    const isThereTwoOperands = this.memory.length >= 3;
    if (!isThereTwoOperands) return;

    let answer = null;
    for (let calcIndex = 0; calcIndex < this.memory.length - 1; calcIndex += 2) {
      let firstOperand = answer !== null ? answer : Number(this.memory[calcIndex]);
      let operator = this.memory[calcIndex + 1];
      let secondOperand = Number(this.memory[calcIndex + 2]);

      switch(operator){
        case "+":
          answer = firstOperand + secondOperand;
          break
        
        case "-":
          answer = firstOperand - secondOperand;
          break;

        case "x":
          answer = firstOperand * secondOperand;
          break;

        case "^":
          answer = firstOperand ** secondOperand;
          break;

        case "/":
          if (firstOperand === 0) {this.raiseError("Error: division by zero!")};

          answer = firstOperand / secondOperand;
          break;
      };
    };

    this.clearAll();

    if (answer === null) {
      this.raiseError("Error: unexpected error")
    };

    this.currentEntry = String(answer);
  };
};

// Create calculator
const calculatorNode = document.querySelector(".calculator");
const calculatorDisplay = document.querySelector(".calculator__display");
const calculator = new Calculator();

calculatorNode.addEventListener("click", (event) => {
  const targetIsCalculatorButton = event.target.classList.contains("calculator__button");
  if (!targetIsCalculatorButton) return;

  calculator.pressButton(event.target.textContent);
  calculatorDisplay.textContent = calculator.displayText;

  if (/Error/.test(calculatorDisplay.textContent)) {
    calculatorDisplay.style.color = "var(--accent-color)";
    calculatorDisplay.style.justifyContent = "center";
  } else {
    calculatorDisplay.style.color = "var(--main-color)";
    calculatorDisplay.style.justifyContent = "flex-end";
  }
  
});