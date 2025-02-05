const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const prevOp = document.querySelector("#previousOp");
const currentOp = document.querySelector("#currentOp");
const calcBtn = document.querySelector(".calculate");

let op = undefined;
let leftOperand = "";
let rightOperand = "";

numbers.forEach((e) => e.addEventListener("click", addOperand));
operators.forEach((e) => e.addEventListener("click", assignOperator));
calcBtn.addEventListener("click", () => 
    operate(Number(leftOperand), op, Number(rightOperand)))

function addOperand(event) {
    if(op === undefined) {
        if(leftOperand.length < 12) {
            leftOperand += event.target.dataset.key;
            currentOp.textContent = numberWithCommas(leftOperand);
            console.log(leftOperand);
        }
    } else {
        if(rightOperand.length < 12) {
            rightOperand += event.target.dataset.key;
            currentOp.textContent = numberWithCommas(rightOperand);
            console.log(rightOperand);
        }
    }
}

function assignOperator(event) {
    op = event.target.dataset.key;
    prevOp.textContent = `${numberWithCommas(leftOperand)} ${op}`
}

function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply (a, b) { return a * b };
function divide(a, b) { return a / b };

function operate(a, op, b) {
    console.log("is it working");
    let answer;
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
            answer = divide (a, b);
            break;
    }
    currentOp.textContent = answer;
    prevOp.textContent = "- - - - -";
    return answer;
}

function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}