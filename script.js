// Selectors for html elements
const allButtons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.btn-number');
const operationButtons = document.querySelectorAll('.btn-math');
const equalsButton = document.querySelector('.btn-equals');
const deleteButton = document.querySelector('.btn-delete');
const clearButton = document.querySelector('.btn-clear');
const prevNumber = document.querySelector('.prevNumber');
const newNumber = document.querySelector('.newNumber');
const addition = document.getElementById('add')
const subtraction = document.getElementById('substract')
const multi = document.getElementById('multi')
const divi = document.getElementById('divide')

// Global variables

let operator = undefined;

// Clear the calculation when application starts
clear();

// Arithmetic functions
function add (numOne, numTwo) {
    let compute = newNumber.innerText = +numOne + +numTwo;
    compute = compute.toString();
    if(compute.length > 15) {
        compute = compute.slice(0, 15)
        newNumber.innerText = compute
    } 
    console.log(compute)
}   

function substract (numOne, numTwo) {
    let compute = newNumber.innerText = +numOne - +numTwo;
    compute = compute.toString();
    if(compute.length > 15) {
        compute = compute.slice(0, 15)
        newNumber.innerText = compute
    } 
    console.log(compute)
}

function multiply (numOne, numTwo) {
    let compute = newNumber.innerText = +numOne * +numTwo;
    compute = compute.toString();
    console.log(compute)
    if(compute.length > 15) {
        compute = compute.slice(0, 15)
        newNumber.innerText = compute
    } 
}

function divide (numOne, numTwo) {
    let compute = newNumber.innerText = +numOne / +numTwo;
    compute = compute.toString();
    if(compute.length > 15) {
        compute = compute.slice(0, 15)
        newNumber.innerText = compute
    } 
    console.log(compute)
    
}

// Operator function
function operate (operator, numOne, numTwo) {
    switch(operator){
        case '+':
            add(numOne, numTwo);
            break;
        case '-':
            substract(numOne, numTwo);
            break;
        case '×':
            multiply(numOne, numTwo);
            break;
        case '÷':
            divide(numOne, numTwo);
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

// Make all operation buttons clickable
function resetOperations(){
    operationButtons.forEach((mathButton) => {
        mathButton.removeAttribute('disabled')
    });
}

// Turn operation buttons back to orange
function resetOperationColors(){
    operationButtons.forEach(button => button.style.backgroundColor = 'orange')
}

// Reusable function for when numbers are clicked
function numberClick (button) {
    resetOperations();
    resetOperationColors()
    prevNumber.setAttribute('hidden', true);
    newNumber.removeAttribute('hidden');1
    if(newNumber.innerText.length < 15) {
        appendNumber(button);
    }
    updateDisplay();
} 

// Reusable function for when operations are clicked
function operationClick (button) {
    // Move current value to previous value and hide new value
    newNumber.setAttribute('hidden', true);
    prevNum = prevNumber.innerText;
    newNum = newNumber.innerText;

    // Calculate two values if both aren't empty, allowing for chaining arithmatic
    if(prevNum != '' && newNum != ''){
        prevNum = operate(operator, prevNum, newNum)
        }
    // Re-enable all operaiton buttons
    resetOperations();

    chooseOperation(button);
}

// Button Click Functions

// Number on click functions
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        numberClick(button.innerText)
    })
})


// Operation on click functions
operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Set colors of selected operation button
        resetOperationColors()
        e.target.style.backgroundColor = 'rgb(255, 223, 163)';

        // Run click function
        operationClick(button.innerText);

        // Disabled currently clicked operation
        const targetOperator = e.target
        targetOperator.setAttribute('disabled', true)
    })
})

equalsButton.addEventListener('click', () => {
    resetOperationColors()
    prevNum = prevNumber.innerText;
    newNum = newNumber.innerText;
    operate(operator, prevNum, newNum)
    prevNumber.innerText = '';
})

deleteButton.addEventListener('click', () => {
    backspace(newNumber.innerText);
    updateDisplay();
})

clearButton.addEventListener('click', () => {
    resetOperationColors()
    clear();
    resetOperations();
})



// Keyboard functionality

window.addEventListener('keydown', e => {
    if(e.key == '1' || 
        e.key == '2' || 
        e.key == '3' || 
        e.key == '4' || 
        e.key == '5' || 
        e.key == '6' || 
        e.key == '7' || 
        e.key == '8' || 
        e.key == '9' || 
        e.key == '0' ||
        e.key == '.'
    )
    {   
        numberClick(e.key)
        for(let i=0; i<numberButtons.length; i++){
            if(e.key == numberButtons[i].innerText){
                numberButtons[i].style.backgroundColor = 'rgb(133, 133, 133)'
            }
        }
    }
    if(e.key == '+'){
        operationClick(e.key)
        resetOperationColors()
        addition.style.backgroundColor = 'rgb(255, 223, 163)';
        
    } else if(e.key == '-'){
        operationClick(e.key)
        resetOperationColors()
        subtraction.style.backgroundColor = 'rgb(255, 223, 163)';
    } else if (e.key == '*') {
        operationClick('×')
        resetOperationColors()
        multi.style.backgroundColor = 'rgb(255, 223, 163)';
    } else if(e.key == '/') {
        operationClick('÷')
        resetOperationColors()
        divi.style.backgroundColor = 'rgb(255, 223, 163)';
    } else if(e.key == '=' || e.key == 'Enter') {
        resetOperationColors()
        prevNum = prevNumber.innerText;
        newNum = newNumber.innerText;
        operate(operator, prevNum, newNum)
        equalsButton.style.backgroundColor = 'rgb(255, 223, 163)';
        prevNumber.innerText = '';
    } else if(e.key == 'Backspace') {
        backspace(newNumber.innerText);
        deleteButton.style.backgroundColor = 'rgb(255, 223, 163)';
    } else if(e.key == 'Escape' || e.key == ' ') {
        resetOperationColors()
        clear();
        resetOperations();
        clearButton.style.backgroundColor = 'rgb(255, 223, 163)';
    }
}) 

window.addEventListener('keyup', e => {
    numberButtons.forEach(button => {
        button.style.backgroundColor = '#585858'
    })
    equalsButton.style.backgroundColor = 'orange'
    deleteButton.style.backgroundColor = 'orange'
    clearButton.style.backgroundColor = 'orange'
})

