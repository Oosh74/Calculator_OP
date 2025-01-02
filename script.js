//----Query Selectors----//
const numberButtons = document.querySelectorAll('.number-button');
const textDisplay = document.querySelector('.textDisplay');
const clearBtn = document.querySelector('.clear-button');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const backspaceBtn = document.querySelector('.backspace');
//----End Query Selectors----//

//----Calc Logic & State----//
let x = '0';
let y = '';
let operator = '';
textDisplay.textContent = 0;

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
};

const clear = () => {
  x = '0';
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
    if (button.textContent === '0') {
      // Prevent pressing multiple zeros when x or y is already '0'
      if (x === '0' && !operator) return; // Prevent adding '0' to x if it's already '0'
      if (y === '0' && operator) return; // Prevent adding '0' to y if it's already '0'
    }

    if (!operator && x.length === 1 && x === '0') {
      x = button.textContent;
    } else if (!operator) {
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
  } else if (x.length > 1) {
    x = x.slice(0, -1);
  } else if (x.length === 1 && x !== '0') {
    x = '0';
  }
  updateDisplay();
});

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key)) {
    const button = Array.from(numberButtons).find(
      (button) => button.textContent === key
    );
    if (button) {
      button.click();
    }
  } else if (['+', '-', '*', '/'].includes(key)) {
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
  } else if (key === ' ') {
    event.preventDefault;
    return;
  }
});
//----End Event Listeners----//
