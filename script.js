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
    return Number(x) + Number(y);
  },
  '-': (x, y) => {
    return Number(x) - Number(y);
  },
  '/': (x, y) => {
    return Number(x) / Number(y);
  },
  '*': (x, y) => {
    return Number(x) * Number(y);
  },
};

const equate = (existingOperator = false, operatorClicked) => {
  if (existingOperator === true) {
    // Perform calculation with current x, y, and operator
    textDisplay.textContent = `${calculationsObj[operator](x, y)}`;
    // Update x to the result
    x = textDisplay.textContent;
    // Reset y and set the new operator
    y = '';
    operator = operatorClicked;
    // Update the display with the result and new operator
    inputText = [x, operatorClicked];
    textDisplay.textContent = inputText.join('');
  } else {
    console.log('existingOperator', existingOperator);
    textDisplay.textContent = `${calculationsObj[operator](x, y)}`;
    inputText = [textDisplay.textContent];
    x = textDisplay.textContent;
    y = '';
    operator = '';
  }
};

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    textDisplay.textContent = inputText.join('');
    if (operator.length === 0) {
      x += button.textContent;
    } else {
      y += button.textContent;
    }
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    if (operator.length > 0 && y.length > 0) {
      equate(true, button.textContent);
    } else {
      operator = button.textContent;
      inputText.push(operator);
      textDisplay.textContent = inputText.join('');
    }
  });
});

clearBtn.addEventListener('click', () => {
  inputText = [];
  textDisplay.textContent = 0;
  x = '';
  y = '';
  operator = '';
});

equalSign.addEventListener('click', equate);

/* TODO:
Gotchas: watch out for and fix these bugs if they show up in your code:
- Your calculator should not evaluate more than a single pair of numbers at a time. Example: you enter a number (12), followed by an operator button (+), a second number button (7), and a second operator button (-). Your calculator should then do the following: first, evaluate the initial pair of numbers (12 + 7), then display the result of that calculation (19). Finally, use that result (19) as the first number in a new calculation, along with the next operator (-). An example of the behavior we’re looking for can be seen in this student’s calculator live preview.
- You should round answers with long decimals so that they don’t overflow the display.
- Pressing = before entering all of the numbers or an operator could cause problems!
- Pressing “clear” should wipe out any existing data. Make sure the user is really starting fresh after pressing “clear”.
- Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

Extra credit
-Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. 
- Add a . button and let users input decimals! Make sure you don’t let them type more 
than one though, like: 12.3.56.5. Disable the . button if there’s already a decimal separator in the display.
- Add a “backspace” button, so the user can undo their last input if they click the wrong number.
- Add keyboard support!
*/
