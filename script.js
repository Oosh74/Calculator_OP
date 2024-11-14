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

equalSign.addEventListener('click', () => {
  numbers.textContent = `${operatorObj[operator](x, y)}`;
});
