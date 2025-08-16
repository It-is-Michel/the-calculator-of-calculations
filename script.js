function Calculator(displayNode = "not set") {
  // Used to operate
  this.currentEntry = "0";
  this.operator = null;
  this.previousEntry = null;

  // Take a button as string and decide what to do
  this.pressButton = function(pressedButton) {
    pressedButton = pressedButton.toLowerCase();
    // If the pressed button is a number or a dot, try add it to the current entry and return
    const pressedButtonIsNumber = isNaN(pressedButton) ? false : true;
    const pressedButtonIsDot = pressedButton === "." ? true : false;
    if (pressedButtonIsNumber || pressedButtonIsDot) {
      this.addToEntry(pressedButton);
      return;
    };

    // Compare pressed button with operands and control buttons, then do the action
    switch(pressedButton) {
      case "+":
      case "-":
      case "x":
      case "/":
        this.updateOperator(pressedButton);
        return;

      case "ce":
        this.clearEntry();
        return;

      case "ca":
        this.clearAll();
        return;

      case "=":
        this.calculateResult(pressedButton);
        return;

      default:
        // If any of the button possibilities match, there's an error. Then, warn and return.
        console.warn(`${pressedButton} isn't a valid input.`);
        return;
    };
  };

  // Add digits and dots to the current entry
  this.addToEntry = function(value) {
    let currentEntryIsZero;
    switch(value) {
      case "0":
        currentEntryIsZero = (this.currentEntry === "0");
        this.currentEntry = currentEntryIsZero ? "0" : this.currentEntry + value;
        break;

      case ".":
        const currentEntryHasADot = this.currentEntry.includes(".");
        this.currentEntry = currentEntryHasADot ? this.currentEntry : this.currentEntry + ".";
        break;

      default:
        currentEntryIsZero = (this.currentEntry === "0");
        this.currentEntry = currentEntryIsZero ? value : this.currentEntry + value;
        break;
    };
    this.updateDisplay();
  };

  this.updateOperator = function(newOperator) {
    this.previousEntry = this.currentEntry;
    this.currentEntry = "0";
    this.operator = newOperator;
    this.updateDisplay();
  }

  this.clearEntry = function () {
    const operatorsRegex = /[\+\-x/]/;
    if (!operatorsRegex.test(this.operator)) {
      this.currentEntry = "0";
    } else if (operatorsRegex.test(this.operator) && !this.currentEntry === "0") {
      this.currentEntry = this.previousEntry;
      this.previousEntry = "0";
      this.operator = null;
    } else {
      this.currentEntry = "0";
    };
    this.updateDisplay();
  };

  // Update display text
  this.displayText = "0";
  this.displayNode = displayNode;
  this.updateDisplay = function() {
    const currentInputType = this.getCurrentInputType();

    // Decide what to display based on last input
    switch(currentInputType) {
      case "number":
        this.displayNode.style["justify-content"] = "flex-end";
        this.displayText = this.currentEntry;
        break;

      case "operator":
        this.displayNode.style["justify-content"] = "flex-end";
        this.displayText = this.operator;
        break;

      case "error":
        this.displayNode.style["justify-content"] = "center";
        this.displayText = this.currentEntry;
        break;
    };

    // Update display text on the HTML if there are one
    if (this.displayNode !== "not set") {
      this.displayNode.textContent = this.displayText;
    };
  };

  // Find what was last input
  this.getCurrentInputType = function() {
    const operatorsRegex = /[\+\-x/]/;

    const CurrentInputIsNumber = !isNaN(this.currentEntry);
    const CurrentInputIsZero = this.currentEntry === "0";
    const CurrentInputIsDot = /\.$/.test(this.currentEntry);
    const isThereOperator = operatorsRegex.test(this.operator);
    const currentInputIsError = /^Error: /.test(this.currentEntry);

    if (isThereOperator && CurrentInputIsZero) {
      return "operator";
    } else if (CurrentInputIsNumber || CurrentInputIsDot) {
      return "number";
    } else if (currentInputIsError) {
      return "error";
    } else {
      console.warn(`getCurrentInputType didn't work with: ${this.currentEntry}`);
    };
  };

  // subtract method
  // multiply method
  // divide method

  // get result method

  // clear entry method
  // clear all method
}

// Create calculator
const calculatorDisplay = document.querySelector(".calculator__display");
const calculator = new Calculator(calculatorDisplay);

// Add events to calculator buttons to call the calculator pressButton method
const calculatorButtons = document.querySelectorAll(".calculator__button");
for (let button of calculatorButtons) {
  button.addEventListener("click", (event) => {
    calculator.pressButton(event.target.textContent);
  })
}