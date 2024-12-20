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
    if (x === '') {
      //Prevents user from entering operator before x value
      return;
    }

    if (operator && !y) {
      //Prevents user from prematurely performing an equation without y value
      return;
    }

    if (operator.length > 0 && y.length > 0) {
      //Allows for stringing equations by equating when hitting the next desired operator,
      //will equate and update equation/display with result and preceeding operator
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
  const allowedChars = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '*',
    '+',
    '/',
    '-',
  ];

  const filterChar = [...event.target.value].filter((char) => {
    if (!allowedChars.includes(event.target.value)) {
      console.log(allowedChars.includes(event.target.value));
      console.log('keypressed', event.target.value);
      console.log(typeof event.target.value);
      return;
    } else {
      return char;
    }
  });

  inputText.push(filterChar);
  textDisplay.value += filterChar;
});

document.addEventListener('click', () => {
  textDisplay.focus();
});

clearBtn.addEventListener('click', clear);
equalSign.addEventListener('click', equate);

/* TODO:
- Make it so first typed text input replaces the 0
- Make it so typed text input gets assigned to correct x, y, and operator variables
- Refactor calculator so that updating the display is modular/a helper function
- Organize code better (serparate helper functions, event listeners, etc, global vars, etc)

Extra credit
-Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
- Add a . button and let users input decimals! Make sure you don’t let them type more 
than one though, like: 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
- Add a “backspace” button, so the user can undo their last input if they click the wrong number.
- Add keyboard support!



*/
