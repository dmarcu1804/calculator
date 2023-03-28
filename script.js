function add(num1, num2){
    return num1+num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1/num2;
}

function remainder(num1, num2){
    return num1 % num2;
}

function operate(operator, num1, num2){
    if(operator === '+'){
        return add(num1,num2);
    }
    else if(operator === '-'){
        return subtract(num1, num2);
    }
    else if(operator === '*'){
        return multiply(num1, num2);
    }
    else if(operator === '/'){
        return divide(num1,num2);
    }else if(operator === '%'){
        return remainder(num1, num2);
    }
}

const displayCurrent = Array.from(document.getElementsByClassName("current-operand"))[0];
const output = document.querySelector(".output");
const displayPrevious = Array.from(document.getElementsByClassName("previous-operand"))[0];
const buttons = Array.from(document.querySelectorAll('button'));
const operatorSelector = document.querySelectorAll(".operator");
const result = document.createElement('div');
result.classList.add('result');
output.appendChild(result);
// console.log(output);
let operators = [];
let numbers = [];
let temp = 0;
let resFinal = 0;




function displayOperations(evt){
    //checks if the numbers pressed are numbers or operators - if they are numbers, the we display
    //digits pressed in displayCurrent and remove the result after calculated
    if(isFinite(evt.target.value)){
        displayCurrent.innerHTML += evt.target.value;
        result.innerText = "";
    }
    //if the button pressed is C, then we want to remove the last digit of the number
    else if(evt.target.value == "C"){
        displayCurrent.innerText = displayCurrent.innerText.slice(0,-1);
    }

    //if AC was pressed, then we'd like to clear everything
    else if(evt.target.value == "AC"){
        operators = [];
        numbers = [];
        temp = 0;
        resFinal = 0;
        result.innerHTML = "";
        displayCurrent.innerHTML = "";
    }

    //if operator was pressed (+,-,/ or *, then we want to wait for next number so operation can be performed)

    else{
        temp = displayCurrent.textContent;
        //adding numbers to an array so they can be used for operations
        numbers.push(temp);
        //storing operator that was pressed in array
        operators.push(evt.target.value);
        //clearing current display
        displayCurrent.innerHTML = "";

        //if equal operator was pressed, then we want to remove the empty slot in numbers array (created when 
        // = is pressed - can't perform operation on empty)
        // if any other operator is pressed, then we want to wait for the second number, add to array, calculate
        // using operator pressed and store the result in numbers array so it can be used in subsequent operation
        if(operators.length > 1){
            if(operators[0] != "="){
                resFinal = operate(operators[0], Number(numbers[0]), Number(numbers[1]));
                numbers.splice(0,2);
                numbers.push(resFinal);
                operators.splice(0,1);
                result.innerText = resFinal;
            }
            else{
                if(numbers[1] == ""){
                    numbers.splice(1,1);
                }
                operators.splice(0,1);
                resFinal = operate(operators[0], Number(numbers[0]), Number(numbers[1]));
            }
        }
        displayCurrent.innerHTML = "";
    }
}
//works for all operations
buttons.forEach(button => button.addEventListener('click', displayOperations));