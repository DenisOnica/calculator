class Calculator{
    constructor(previousOperandElement, currentOperandElement){
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.allClear();
    }

    allClear(){
        this.previousOperand = ''
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumbers(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay(){
        this.currentOperandElement.innerText = this.currentOperand;
        this.previousOperandElement.innerText = this.previousOperand;
    }

    compute(){
        let result;
        let current = parseFloat(this.currentOperand);
        let prev = parseFloat(this.previousOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+': result = prev + current;
            break;
            case '-': result = prev - current;
            break;
            case '*': result = prev * current;
            break;
            case '%': result = prev / current;
            break;
            default: return
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.currentOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
}

const btnNumbers = document.querySelectorAll('[data-number]');
const btnOperation = document.querySelectorAll('[data-operation]');
const btnAllClear = document.querySelector('[data-all-clear]');
const btnDelete = document.querySelector('[data-delete]');
const previousOperandElement = document.querySelector('[data-previous-operand]');
const currentOperandElement = document.querySelector('[data-current-operand]');
const btnEquals = document.querySelector('#equals');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

btnNumbers.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumbers(button.innerText);
        calculator.updateDisplay();
        
    })
})

btnOperation.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
    
})

btnAllClear.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
    
})

btnDelete.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

btnEquals.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
})

