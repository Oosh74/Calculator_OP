const numberButtons = document.querySelectorAll('.number-button');
const textDisplay = document.querySelector('.textDisplay');
const clearBtn = document.querySelector('.clear-button');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');

let inputText = [];
let x = '';
let y = '';
let operator = '';

let calculationsObj = {
  '+': (x, y) => {
    let result = Number(x) + Number(y);
    return result % 1 === 0 ? result : parseFloat(result.toFixed(2));
  },
  '-': (x, y) => {
    let result = Number(x) - Number(y);
    return result % 1 === 0 ? result : parseFloat(result.toFixed(2));
  },
  '/': (x, y) => {
    let result = Number(x) / Number(y);
    return result % 1 === 0 ? result : parseFloat(result.toFixed(2));
  },
  '*': (x, y) => {
    let result = Number(x) * Number(y);
    return result % 1 === 0 ? result : parseFloat(result.toFixed(2));
  },
};

const equate = (existingOperator = false, operatorClicked) => {
  if (x === '0' && operator === '/') {
    textDisplay.value = 'You shall not pass!';
    setTimeout(() => {
      clear();
    }, 2000);
    return;
  }

  if (!y) {
    return;
  }

  if (existingOperator === true) {
    // Perform calculation with current x, y, and operator
    textDisplay.value = `${calculationsObj[operator](x, y)}`;
    // Update x to the result
    x = textDisplay.value;
    // Reset y and set the new operator
    y = '';
    operator = operatorClicked;
    // Update the display with the result and new operator
    inputText = [x, operatorClicked];
    textDisplay.value = inputText.join('');
  } else {
    textDisplay.value = `${calculationsObj[operator](x, y)}`;
    inputText = [textDisplay.value];
    x = textDisplay.value;
    y = '';
    operator = '';
  }
};

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    textDisplay.value = inputText.join('');
    if (operator.length === 0) {
      x += button.textContent;
    } else {
      y += button.textContent;
    }
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    if (operator && !y) {
      return;
    }

    if (operator.length > 0 && y.length > 0) {
      equate(true, button.textContent);
    } else {
      operator = button.textContent;
      inputText.push(operator);
      textDisplay.value = inputText.join('');
    }
  });
});

const clear = () => {
  inputText = [];
  textDisplay.value = 0;
  x = '';
  y = '';
  operator = '';
};

textDisplay.addEventListener('input', (event) => {
  inputText.push(event.target.value);
  textDisplay.value = event.target.value;
  console.log('keypressed', event.target.value);
});

clearBtn.addEventListener('click', clear);
equalSign.addEventListener('click', equate);

/* TODO:

- You should round answers with long decimals so that they don’t overflow the display.

Extra credit
-Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
- Add a . button and let users input decimals! Make sure you don’t let them type more 
than one though, like: 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
- Add a “backspace” button, so the user can undo their last input if they click the wrong number.
- Add keyboard support!
*/
