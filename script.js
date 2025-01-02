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
  console.log(`X: ${x}, OPERATOR: ${operator}, Y: ${y}. `);

  if (x.length === 0) {
    textDisplay.textContent = 0;
  }
};

const clear = () => {
  x = '';
  y = '';
  operator = '';
  textDisplay.textContent = '0';
};

const equate = (existingOperator = false, operatorClicked) => {
  if (x === '0' && operator === '/') {
    textDisplay.textContent = 'You shall not pass!';
    setTimeout(() => {
      clear();
    }, 2000);
    return;
  }

  if (!y) return;

  const result = calculationsObj[operator](x, y);
  x = result.toString();
  y = '';
  operator = existingOperator ? operatorClicked : '';
  updateDisplay();
};
//----End Helper Functions----//

//----Event Listeners----//
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
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
      equate(true, button.textContent);
    }
  });
});

equalSign.addEventListener('click', () => equate(false));
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
  if (!isNaN(key)) {
    if (!operator) {
      x += key;
    } else {
      y += key;
    }
    updateDisplay();
  } else if (['*', '+', '/', '-'].includes(key)) {
    if (x && !operator) {
      operator = key;
      updateDisplay();
    } else if (x && operator && y) {
      equate(true, key);
    }
  } else if (key === 'Enter') {
    if (y === '' || operator === '') {
      return;
    } else {
      equate();
    }
  } else if (key === 'Backspace') {
    backspaceBtn.click();
  } else if (key === 'Escape') {
    clear();
  }
});
//----End Event Listeners----//
