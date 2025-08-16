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
        this.sum(pressedButton);
        return;

      case "-":
        this.sub(pressedButton);
        return;

      case "x":
        this.multi(pressedButton);
        return;

      case "/":
        this.div(pressedButton);
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
  }

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
    }
    this.updateDisplay();
  }

  // Update display text
  this.displayText = "0";
  this.displayNode = displayNode;
  this.updateDisplay = function() {
    // Find what was last input
    let lastInput = "not set";
    const operatorsRegex = /[\+\-x/]/;
    if (this.currentEntry !== "0") {
      lastInput = "number";
    } else if (operatorsRegex.test(this.currentEntry)) {
      lastInput = "operator";
    } else if (this.currentEntry === this.displayText) {
      lastInput = "invalid input";
    } else if (this.currentEntry.contains("Error: ")) {
      lastInput = "error";
    } else {
      this.displayText = "There was an error.";
      console.warn(`Error: updateDisplay couldn't find the last input with ${this.currentEntry}.`);
      return;
    }

    // Decide what to display based on last input
    switch(lastInput) {
      case "number":
      case "invalid input":
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
    }

    // Update display text on the HTML if there are one
    if (this.displayNode !== "not set") {
      this.displayNode.textContent = this.displayText;
    };
  };

  // add method
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