//----Query Selectors----//
const numberButtons = document.querySelectorAll('.number-button');
const textDisplay = document.querySelector('.textDisplay');
const clearBtn = document.querySelector('.clear-button');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const backspaceBtn = document.querySelector('.backspace');
//----End Query Selectors----//

//----Calc Logic & State----//
let x = '';
let y = '';
let operator = '';

const calculationsObj = {
  '+': (x, y) => parseFloat((Number(x) + Number(y)).toFixed(2)),
  '-': (x, y) => parseFloat((Number(x) - Number(y)).toFixed(2)),
  '*': (x, y) => parseFloat((Number(x) * Number(y)).toFixed(2)),
  '/': (x, y) =>
    y === '0' ? 'Error' : parseFloat((Number(x) / Number(y)).toFixed(2)),
};
//---- End Calc Logic & State----//

//----Helper Functions----//
const updateDisplay = () => {
  textDisplay.textContent = `${x} ${operator} ${y}`;

  if (x.length === 0) {
    textDisplay.textContent = 0;
  } else {
    textDisplay.textContent = `${x} ${operator} ${y}`;
  }

  console.log(`X: ${x}, OPERATOR: ${operator}, Y: ${y} `);
};

const clear = () => {
  x = '';
  y = '';
  operator = '';
  updateDisplay();
};

const equate = (existingOperator) => {
  if (x === '0' && operator === '/') {
    textDisplay.textContent = 'You shall not pass!';
    setTimeout(() => {
      clear();
    }, 2000);
  }

  if (!y) return;

  const result = calculationsObj[operator](x, y);
  x = result.toString();
  y = '';

  if (existingOperator) {
    operator = existingOperator;
  } else {
    operator = '';
  }

  updateDisplay();
};
//----End Helper Functions----//

//----Event Listeners----//
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log('button type', typeof button.textContent);
    if (!operator) {
      x += button.textContent;
    } else {
      y += button.textContent;
    }
    updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    if (x && !operator) {
      operator = button.textContent;
      updateDisplay();
    } else if (x && operator && y) {
      equate(button.textContent);
    }
  });
});

equalSign.addEventListener('click', () => equate());
clearBtn.addEventListener('click', clear);

backspaceBtn.addEventListener('click', () => {
  if (y.length > 0) {
    y = y.slice(0, -1);
  } else if (operator) {
    operator = '';
  } else if (x.length > 0) {
    x = x.slice(0, -1);
  }
  updateDisplay();
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  console.log(event.key);
  console.log(typeof event.key);

  // Check for number keys (0-9) or the decimal point
  if (!isNaN(key)) {
    const button = Array.from(numberButtons).find(
      (button) => button.textContent === key
    );
    if (button) {
      button.click();
    }
  }
  // Check for operator keys (+, -, *, /)
  else if (['+', '-', '*', '/'].includes(key)) {
    const button = Array.from(operators).find(
      (button) => button.textContent === key
    );
    if (button) {
      button.click();
    }
  } else if (key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    equalSign.click();
  } else if (key === 'Backspace') {
    backspaceBtn.click();
  } else if (key === 'Escape') {
    clear();
  }
});
//----End Event Listeners----//
