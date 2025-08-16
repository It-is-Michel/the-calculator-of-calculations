function Calculator() {

}

// Create calculator
const calculatorDisplay = document.querySelector(".calculator__display");
const calculator = new Calculator();

// Add events to calculator buttons to call the calculator pressButton method
const calculatorButtons = document.querySelectorAll(".calculator__button");
for (let button of calculatorButtons) {
  button.addEventListener("click", (event) => {
    calculator.pressButton(event.target.textContent);
    calculatorDisplay = calculator.displayText;
  })
}