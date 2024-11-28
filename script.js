let currentInput = '0'; 
let previousInput = ''; 
let operator = null; 
let shouldResetScreen = false; 

function updateScreen() {
  const screen = document.getElementById('screen');
  screen.value = currentInput.length > 12 
    ? parseFloat(currentInput).toExponential(6) 
    : currentInput;
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentInput = ''; 
    shouldResetScreen = false;
  }

  if (currentInput === '0' && number !== '.') {
    currentInput = number; 
  } else if (number === '.' && currentInput.includes('.')) {
    return;
  } else {
    currentInput += number;
  }
  updateScreen();
}

function chooseOperator(selectedOperator) {
  if (currentInput === '') return;
  if (previousInput !== '') calculate(); 

  operator = selectedOperator;
  previousInput = currentInput;
  shouldResetScreen = true; 
}

function calculate() {
  if (previousInput === '' || currentInput === '' || operator === null) return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  let result = 0;
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        alert("Division by zero is impossible!");
        clearScreen();
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  updateScreen();
}

function calculateSquareRoot() {
  if (currentInput === '') return;
  const value = parseFloat(currentInput);
  if (value < 0) {
    alert("You can't extract the square root of a negative number!");
    return;
  }
  currentInput = Math.sqrt(value).toString();
  updateScreen();
}

function calculatePower() {
  if (currentInput === '') return;
  const value = parseFloat(currentInput);
  currentInput = Math.pow(value, 2).toString();
  updateScreen();
}

function calculatePercentage() {
  if (currentInput === '') return;
  const value = parseFloat(currentInput);
  currentInput = (value / 100).toString();
  updateScreen();
}

function clearScreen() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  updateScreen();
}
