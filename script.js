let numberButtons = document.querySelectorAll('.number-button');
let numbers = document.querySelector('.numbers');
let clearBtn = document.querySelector('.clear-button');
let operators = document.querySelectorAll('.operator');

let inputText = [];

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    numbers.textContent = inputText.join('');
  });
});

operators.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    numbers.textContent = inputText.join('');
  });
});

clearBtn.addEventListener('click', () => {
  inputText = [];
  numbers.textContent = 0;
});
