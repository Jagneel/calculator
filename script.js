// Selectors for html elements
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-math');
const equalsButton = document.querySelector('.btn-equals');
const deleteButton = document.querySelector('.btn-delete');
const clearButton = document.querySelector('.btn-clear');
const prevNumber = document.querySelector('.prevNumber');
const newNumber = document.querySelector('.newNumber');

// Global variables

let operator = undefined;

// Clear the calculation when application starts
clear();

// Arithmetic functions
function add (numOne, numTwo) {
    newNumber.innerText = +numOne + +numTwo;
}

function substract (numOne, numTwo) {
    newNumber.innerText = +numOne - +numTwo;
}

function multiply (numOne, numTwo) {
    newNumber.innerText = +numOne * +numTwo;
}

function divide (numOne, numTwo) {
    newNumber.innerText = +numOne / +numTwo;
}

// Operator function
function operate (operator, numOne, numTwo) {
    switch(operator){
        case '+':
            add(numOne, numTwo)
            break;
        case '-':
            substract(numOne, numTwo);
            calcValue = substract(numOne, numTwo);
            break;
        case '×':
            multiply(numOne, numTwo);
            calcValue = multiply(numOne, numTwo);
            break;
        case '÷':
            divide(numOne, numTwo);
            calcValue = divide(numOne, numTwo);
    }
}

// Functions for buttons
function clear () {
    newNumber.innerText = '';
    prevNumber.innerText = '';
    operation = undefined;
}

function backspace (number) {
    let sliced = number.slice(0, -1);
    newNumber.innerText = sliced;
}

function appendNumber(number) {
    if(number === '.' && newNumber.innerText.includes('.')) return 
    newNumber.innerText += number;
}

function chooseOperation(operation) {
    operator = operation;
    if(newNumber.innerText != '') prevNumber.innerText = newNumber.innerText;
    newNumber.innerText = '';
    prevNumber.removeAttribute('hidden');
}

function updateDisplay() {
    newNumber.innerText 
}

function resetOperations(){
    operationButtons.forEach((mathButton) => {
        mathButton.removeAttribute('disabled')
    });
}

// Button Click Functions

// Number click functi
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        resetOperations();
        prevNumber.setAttribute('hidden', true);

        appendNumber(button.innerText);
        updateDisplay();
    })
})


// Operation click functions
operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        prevNum = prevNumber.innerText;
        newNum = newNumber.innerText;
        if(prevNum != '' && newNum != ''){
            prevNum = operate(operator, prevNum, newNum)
            }
        resetOperations();
        const targetOperator = e.target
        targetOperator.setAttribute('disabled', true)

        chooseOperation(button.innerText);
        
        // updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    prevNum = prevNumber.innerText;
    newNum = newNumber.innerText;
    operate(operator, prevNum, newNum)
})

deleteButton.addEventListener('click', () => {
    backspace(newNumber.innerText);
    updateDisplay();
})

clearButton.addEventListener('click', () => {
    clear();
    resetOperations();
})

