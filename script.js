function add(a, b){
    return Math.round((a + b) * 100000) / 100000;
};

function subtract(a, b){
    return Math.round((a - b) * 100000) / 100000;
};

function multiply(a, b){
    return Math.round((a * b) * 100000) / 100000;
};

function divide(a, b){
    if(b === 0) return 'ERROR';
    return Math.round((a / b) * 100000) / 100000;
};

function operate(operator, firstNumber, secondNumber){
    let num1 = Number(firstNumber);
    let num2 = Number(secondNumber);
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

function calculate(calculation){
    let array = calculation.split(' ');
    return operate(array[1], array[0], array[2]);
}

let operator;
let firstNumber;
let secondNumber;
let operatorTyped; // checa se já escreveu um operador antes
let secondOperation; // operações subsequentes
let decimalTyped = false;

let display = document.querySelector('#display');

let btn = document.querySelectorAll('button');

btn.forEach(item => item.addEventListener('click', () => {
    const op = ['+', '-', '*', '/'];
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    if(nums.includes(item.textContent)){
        if(item.textContent == '.' && display.textContent == '') {
            display.textContent = '';
        } else if (secondOperation === true || op.includes(display.textContent)) {
            display.textContent = item.textContent;
            secondOperation = false;
        } else if (item.textContent == '.' && decimalTyped === false) {
            display.textContent += item.textContent;
            decimalTyped = true;
        } else if (item.textContent != '.') {
            display.textContent += item.textContent;
        };
    };
    if(op.includes(item.textContent)){
        if (op.includes(display.textContent)) {
            display.textContent = item.textContent;
            operator = item.textContent;
        } else if (nums.includes(display.textContent.charAt(display.textContent.length-1)) && operatorTyped === true) {
            secondNumber = display.textContent;
            display.textContent = operate(operator, firstNumber, secondNumber);
            firstNumber = display.textContent;
            operator = item.textContent;
            secondOperation = true;
            decimalTyped = false;
        } else {
            firstNumber = display.textContent;
            display.textContent = item.textContent;
            operator = item.textContent;
            operatorTyped = true;
            decimalTyped = false;
        };
    };
    if(item.textContent == '=') {
        if (display.textContent === ''){
            operator = undefined;
            firstNumber = undefined;
            secondNumber = undefined;
            operatorTyped = false;
            secondOperation = false;
            decimalTyped = false;
        };
        if (nums.includes(display.textContent.charAt(display.textContent.length-1))){
            secondNumber = display.textContent;
            display.textContent = operate(operator, firstNumber, secondNumber);
            operator = undefined;
            firstNumber = undefined;
            secondNumber = undefined;
            operatorTyped = false;
            secondOperation = false;
            decimalTyped = false;
        };
    };
    if(item.textContent == 'AC') {
        display.textContent = '';
        operator = undefined;
        firstNumber = undefined;
        secondNumber = undefined;
        operatorTyped = false;
        secondOperation = false;
        decimalTyped = false;
    };
    if(item.textContent == '+/-' && nums.includes(display.textContent.charAt(display.textContent.length-1))) {
        if(Number(display.textContent) > 0) {
            display.textContent = `-${display.textContent}`;
        } else if(Number(display.textContent) < 0) {
            let slicedString = display.textContent.slice(1);
            display.textContent = slicedString;
        };
    };
    if(item.textContent == '⌫'){
        if (display.textContent.charAt(display.textContent.length-1) == '.' && decimalTyped === true) {
            display.textContent = display.textContent.slice(0, -1);
            decimalTyped = false;
        } else if (nums.includes(display.textContent.charAt(display.textContent.length-1))) {
            display.textContent = display.textContent.slice(0, -1);
        };
    };
}));