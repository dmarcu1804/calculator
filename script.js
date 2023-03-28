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
const operators = [];
const numbers = [];
let temp = 0;
let resFinal = 0;
//seems to work now for most operations - need to adjust what happens for when equals is pressed
buttons.forEach(button => button.addEventListener('click', (e) =>{
    if(isFinite(e.target.value)){
        displayCurrent.innerHTML += e.target.value;
        result.innerText = "";
        
    }else{
        temp = displayCurrent.textContent;
        numbers.push(temp);
        operators.push(e.target.value);
        displayCurrent.innerHTML = "";
        if(operators.length > 1){
            if(operators[0] != "="){
                resFinal = operate(operators[0], Number(numbers[0]), Number(numbers[1]));
                numbers.splice(0,2);
                numbers.push(resFinal);
                operators.splice(0,1);
                result.innerText = resFinal;
            }else{
                if(numbers[1] == ""){
                    numbers.splice(1,1);
                }
                operators.splice(0,1);
                resFinal = operate(operators[0], Number(numbers[0]), Number(numbers[1]));
            }
        }
        displayCurrent.innerHTML = "";
    }
    

    
}));