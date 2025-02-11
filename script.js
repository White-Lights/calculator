const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const prevOp = document.querySelector("#previousOp");
const currentOp = document.querySelector("#currentOp");
const calcBtn = document.querySelector(".calculate");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const posNeg = document.querySelector(".posNeg");
const backspace = document.querySelector(".backspace");

let op = undefined;
let operandInProgress = "";
let leftOperand = "";
let rightOperand = "";

numbers.forEach((e) => e.addEventListener("click", addOperand));
operators.forEach((e) => e.addEventListener("click", assignOperator));
calcBtn.addEventListener("click", () => 
    operate(Number(leftOperand), op, Number(rightOperand)))
clear.addEventListener("click", clearCalc)
decimal.addEventListener("click", addDecimal);
posNeg.addEventListener("click", makeNegative)
backspace.addEventListener("click", backspaceOperand)

function addOperand(event) {
    operandInProgress += event.target.dataset.key;
    if(op === undefined) {
        leftOperand = operandInProgress;
        currentOp.textContent = formatNum(leftOperand);
    } else {
        rightOperand = operandInProgress;
        currentOp.textContent = formatNum(rightOperand);
    }
}

function assignOperator(event) {
    op = event.target.dataset.key;
    prevOp.textContent = `${formatNum(leftOperand)} ${op}`
    operandInProgress = "";
}

function addDecimal() {
    if(operandInProgress % 1 !== 0) {
        return;
    } else {
        operandInProgress += ".";
        currentOp.textContent = formatNum(operandInProgress);
    }
}

function makeNegative() {
    operandInProgress = operandInProgress - (operandInProgress * 2);
    if(op === undefined) {
        leftOperand = operandInProgress;
    } else {
        rightOperand = operandInProgress;
    }
    currentOp.textContent = formatNum(operandInProgress);
    return operandInProgress;
}

function backspaceOperand() {
    operandInProgress = operandInProgress.slice(0, operandInProgress.length - 1);
    if(op === undefined) {
        leftOperand = operandInProgress;
    } else {
        rightOperand = operandInProgress;
    }
    console.log(operandInProgress)
    if(operandInProgress == "") {
        currentOp.textContent =  "- - - - -"
    } else {
        currentOp.textContent = formatNum(operandInProgress);
    }
    return operandInProgress;
}

function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply (a, b) { return a * b };
function divide(a, b) { return a / b };

function operate(a, op, b) {
    switch(op) {
        case "+":
            answer = add(a, b);
            break;
        case "-":
            answer = subtract(a, b);
            break;
        case "*":
            answer = multiply(a, b);
            break;
        case "/":
            answer = divide(a, b);
            break;
    }
    answer = round(answer, 12);
    currentOp.textContent = formatNum(answer);
    leftOperand = answer;
    rightOperand = "";
    op = undefined;
    prevOp.textContent = "- - - - -";
    return answer;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearCalc() {
    op = undefined;
    leftOperand = "";
    rightOperand = "";
    operandInProgress = "";
    currentOp.textContent = "- - - - -";
    prevOp.textContent = "- - - - -";
} 

function formatNum(num) {
    let arr;
    if (num % 1 !== 0) {
        arr = num.toString().split(".");
        console.log(arr);
        arr[0] = numberWithCommas(arr[0]);
        num = arr.join(".");
    } else {
        num = numberWithCommas(num);
    }
    return num;
}

function round(num, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}