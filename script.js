let numberButtons = document.querySelectorAll('.number-button');
let numbers = document.querySelector('.numbers');

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    numbers.textContent += button.textContent;
  });
});
