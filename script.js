const numberButtons = document.querySelectorAll('.number-button');
const numbers = document.querySelector('.numbers');
const clearBtn = document.querySelector('.clear-button');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');

let inputText = [];
let x = '';
let y = '';
let operator = '';

let operatorObj = {
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

const equate = () => {
  numbers.textContent = `${operatorObj[operator](x, y)}`;
  inputText = [numbers.textContent];
  console.log('regular equate text object', numbers.textContent);
  console.log('regular equate input Array', inputText);
  x = numbers.textContent;
  y = '';
  operator = '';
};

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    numbers.textContent = inputText.join('');
    if (operator.length === 0) {
      x += button.textContent;
    } else {
      y += button.textContent;
    }
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    // if (operator.length > 0) {
    //   equate('operator', button.textContent);
    // } else {
    inputText.push(button.textContent);
    numbers.textContent = inputText.join('');
    operator = button.textContent;
  });
});

clearBtn.addEventListener('click', () => {
  inputText = [];
  numbers.textContent = 0;
  x = '';
  y = '';
  operator = '';
});

equalSign.addEventListener('click', equate);

/* TODO:
Change how the text display is updated, it should update based on the X, Y, and Operator values. Make the calculator
 work! You’ll need to store the first and second numbers input by the user and then operate() 
 on them when the user presses the = button, according to the operator that was selected between the numbers.

You should already have the code that can populate the display, so once operate has been called, update the display 
with the result of the operation.
This is the hardest part of the project. You need to figure out how to store all the values and call 
the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

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
