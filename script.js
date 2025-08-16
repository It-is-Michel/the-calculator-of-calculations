function Calculator() {
  // Used to operate
  this.currentEntry = "0";
  this.operator = null;
  this.previousEntry = null;

  // Take a button as string and decide what to do
  this.pressButton = function(pressedButton) {
    // If the pressed button is a number or a dot, try add it to the current entry and return
    const pressedButtonIsNumber = isNaN(pressedButton) ? false : true;
    const pressedButtonIsDot = pressedButton === "." ? true : false;
    if (pressedButtonIsNumber || pressedButtonIsDot) {
      this.addToEntry(pressedButton);
      return;
    };

    // Compare pressed button with operands and control buttons, then do the action
    switch(pressedButton) {
      case "sum":
        this.sum(pressedButton);
        return;

      case "sub":
        this.sum(pressedButton);
        return;

      case "multi":
        this.multi(pressedButton);
        return;

      case "div":
        this.div(pressedButton);
        return;

      case "clear entry":
        this.clearEntry();
        return;

      case "clear all":
        this.clearAll();
        return;

      case "equal":
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

  // add method
  // subtract method
  // multiply method
  // divide method

  // get result method

  // clear entry method
  // clear all method
}