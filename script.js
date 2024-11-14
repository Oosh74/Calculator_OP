let numberButtons = document.querySelectorAll('.number-button');
let numbers = document.querySelector('.numbers');
let clearBtn = document.querySelector('.clear-button');
let inputText = [];

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    inputText.push(button.textContent);
    numbers.textContent = inputText.join('');
  });
});

clearBtn.addEventListener('click', () => {
  inputText = [];
  numbers.textContent = 0;
});
