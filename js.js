class AdvancedMathSolver {
  constructor(prevResultTextElement, currResultTextElement) {
    this.prevResultTextElement = prevResultTextElement;
    this.currResultTextElement = currResultTextElement;
    this.resetSolver();
  }

  resetSolver() {
    this.currentResult = '';
    this.previousResult = '';
    this.selectedOperation = undefined;
  }

  removeLastDigit() {
    this.currentResult = this.currentResult.toString().slice(0, -1);
  }

  addDigitToCurrent(digit) {
    if (digit === '.' && this.currentResult.includes('.')) return;
    this.currentResult = this.currentResult.toString() + digit.toString();
  }

  chooseOperation(operation) {
    if (this.currentResult === '') return;
    if (this.previousResult !== '') {
      this.performCalculation();
    }
    this.selectedOperation = operation;
    this.previousResult = this.currentResult;
    this.currentResult = '';
  }

  performCalculation() {
    let result;
    const prevNum = parseFloat(this.previousResult);
    const currNum = parseFloat(this.currentResult);
    if (isNaN(prevNum) || isNaN(currNum)) return;
    switch (this.selectedOperation) {
      case '+':
        result = prevNum + currNum;
        break;
      case '-':
        result = prevNum - currNum;
        break;
      case '*':
        result = prevNum * currNum;
        break;
      case '÷':
        result = prevNum / currNum;
        break;
      default:
        return;
    }
    this.currentResult = result;
    this.selectedOperation = undefined;
    this.previousResult = '';
  }

  getFormattedNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split('.')[0]);
    const decimalPart = stringNumber.split('.')[1];
    let formattedIntegerPart;
    if (isNaN(integerPart)) {
      formattedIntegerPart = '';
    } else {
      formattedIntegerPart = integerPart.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalPart != null) {
      return `${formattedIntegerPart}.${decimalPart}`;
    } else {
      return formattedIntegerPart;
    }
  }

  updateDisplay() {
    this.currResultTextElement.innerText = this.getFormattedNumber(this.currentResult);
    if (this.selectedOperation != null) {
      this.prevResultTextElement.innerText =
        `${this.getFormattedNumber(this.previousResult)} ${this.selectedOperation}`;
    } else {
      this.prevResultTextElement.innerText = '';
    }
  }
}

const numButtons = document.querySelectorAll('[data-digit]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-evaluate]');
const delButton = document.querySelector('[data-remove]');
const clearAllButton = document.querySelector('[data-clear-all]');
const prevResultTextElement = document.querySelector('[data-previous-result]');
const currResultTextElement = document.querySelector('[data-current-result]');

const advancedMathSolver = new AdvancedMathSolver(prevResultTextElement, currResultTextElement);

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    advancedMathSolver.addDigitToCurrent(button.innerText);
    advancedMathSolver.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    advancedMathSolver.chooseOperation(button.innerText);
    advancedMathSolver.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  advancedMathSolver.performCalculation();
  advancedMathSolver.updateDisplay();
});

clearAllButton.addEventListener('click', () => {
  advancedMathSolver.resetSolver();
  advancedMathSolver.updateDisplay();
});

delButton.addEventListener('click', () => {
  advancedMathSolver.removeLastDigit();
  advancedMathSolver.updateDisplay();
});