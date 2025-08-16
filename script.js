const operatorsRegex = /[+\-x\/]/;

function Calculator() {
  this.memory = [];
  this.lastEntry = "0";
  this.currentEntry = "0";

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

    this.updateDisplay();
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
    const currentEntryIsOperator = operatorsRegex.test(this.currentEntry)

    if (!currentEntryIsOperator) this.saveEntry();

    this.currentEntry = operator;
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
    const currentEntryIsOperator = operatorsRegex.test(this.currentEntry)

    if (!currentEntryIsOperator) this.saveEntry();

    let answer = null;
    for (let calcIndex = 0; calcIndex < this.memory.length; calcIndex += 2) {
      let firstOperant = answer !== null ? answer : Number(this.memory[calcIndex]);
      let operator = this.memory[calcIndex + 1];
      let secondOperant = Number(this.memory[calcIndex + 2]);

      switch(operator){
        case "+":
          answer = firstOperant + secondOperant;
          break
        
        case "-":
          answer = firstOperant - secondOperant;
          break;

        case "x":
          answer = firstOperant * secondOperant;
          break;

        case "/":
          answer = firstOperant / secondOperant;
          break;
      };
    };
    this.clearAll();
    this.currentEntry = String(answer);
  };
};

// Create calculator
const calculatorDisplay = document.querySelector(".calculator__display");
const calculator = new Calculator();

// Add events to calculator buttons to call the calculator pressButton method
const calculatorButtons = document.querySelectorAll(".calculator__button");
for (let button of calculatorButtons) {             // OPTIMIZE USING BUBBLING
  button.addEventListener("click", (event) => {
    calculator.pressButton(event.target.textContent);
    calculatorDisplay.textContent = calculator.displayText;
  })
}