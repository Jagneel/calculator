// Query selectors
const numberList = document.querySelectorAll(".btn-number");
const operationList = document.querySelectorAll(".btn-math");
const decimel = document.getElementById("decimel");
let display = document.querySelector(".display");
let newNumber = document.querySelector(".newNumber");
let prevNumber = document.querySelector(".prevNumber");
let calculate = document.querySelector(".btn-calc");
let clear = document.querySelector(".btn-clear");

// Set the global variables
let currentNum = 0,
prevNum = 0,
newNum = 0,
calcValue = 0,
operator = undefined,
count = 0,
depth = 0;

 
// Arithmetic functions
function add (numOne, numTwo) {
    populateDisplay('clear')
    return populateDisplay(+numOne + +numTwo);
}

function substract (numOne, numTwo) {
    populateDisplay('clear')
    return populateDisplay(+numOne - +numTwo);
}

function multiply (numOne, numTwo) {
    populateDisplay('clear')
    return populateDisplay(+numOne * +numTwo);
}

function divide (numOne, numTwo) {
    populateDisplay('clear')
    return populateDisplay(+numOne / +numTwo);
}

// Operator function
function operate (operator, numOne, numTwo) {
    console.log(depth);
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

// Have a seperate function to populate the display
function populateDisplay (input) {
    input == "clear" ? newNumber.innerText = "" : newNumber.innerText += input;
}

// function to reset operation buttons
function resetOperations(){
    operationList.forEach((mathButton) => {
        mathButton.removeAttribute('disabled')
    });
}

// populate display when numbers are clicked
numberList.forEach((numButton) => {
    numButton.addEventListener("click", () => {
        resetOperations()
        prevNumber.setAttribute('hidden', true);
        decimel.removeAttribute('disabled');

        // ensure only one decimel point is placed.
        if(count > 0){
            populateDisplay('clear');
            count = 0;
        }
        populateDisplay(numButton.innerText);
        if(newNumber.innerText.includes('.')){
            decimel.setAttribute('disabled', true);
        }; 
        // count++;
    })
})

// function for when maths buttons are clicked
operationList.forEach((mathButton) => {
    mathButton.addEventListener("click", (e) => {
        // activate all buttons when new operand is clicked
        resetOperations()
        // disabled currently clicked operand
        const targetOperator = e.target
        targetOperator.setAttribute('disabled', true)
        if(prevNumber.innerText != ''){
            prevNum = prevNumber.innerText;
            newNum = newNumber.innerText;   
            if(depth > 1) {
                operate(operator, prevNum, newNum)
            }     
        }
        operator = mathButton.innerText;
        prevNumber.innerText= newNumber.innerText;
        depth++;
        console.log(depth)
        count++;
    })
})

// function for when = is clicked
calculate.addEventListener('click', () => {
    prevNum = prevNumber.innerText;
    newNum = newNumber.innerText;
    operate(operator, prevNum, newNum)
    count++;
})

// Clear display and values
clear.addEventListener('click', () => {
    resetOperations()
    currentNum = 0;
    newNum = 0;
    calcValue = 0;
    operator = undefined;
    populateDisplay('clear');
    // count++;
})

function compute (operator, prevNum, newNum) {
    operate(operator, prevNum, newNum);
    prevNum = operate(operator, prevNum, newNum);
}