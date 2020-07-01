const button = document.getElementById('bottomNum');
const buttons = document.getElementsByClassName("button num");
const popup = document.getElementById('popup');
const calculator = document.getElementById('calcBody');
const keys = calculator.querySelector('.keys')
const display = document.querySelector('.display')


const calculate = (n1, operator, n2) => {
    let result = ''
    
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
    
    return result
  }

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const operatorKey = key.textContent
        const currentNum = display.textContent
        const previousType = calculator.dataset.previousType


        if (!action) {
            if (currentNum === '0') {
                display.textContent = operatorKey
            } else {
                display.textContent = currentNum + operatorKey
            }
        }


        if (action === 'decimal') {
            display.textContent = currentNum + '.'
            if (display.textContent.includes('..')) {
                display.textContent = currentNum
            }
        }

        if ( 
            action === 'add' ||   
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'     
        ) {
            calculator.dataset.previousType = 'operator'
            calculator.dataset.firstValue = currentNum
            calculator.dataset.operator = action
            display.textContent = '0'
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
            }
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = currentNum
            if (display.textContent.includes('0') || previousType != 'operator' ) {
                display.textContent = currentNum
            } else {
                display.textContent = calculate(firstValue, operator, secondValue)
            }
        }
    }
})


button.addEventListener('click', function(){
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    } else if (display.innerHTML.length === 7) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].setAttribute('disabled', true);
        }
    }
})

document.getElementById('zero').addEventListener('click', function(){
    if (display.innerHTML != 0) {
        display.innerHTML += 0;
    } else {
        popup.classList.toggle('show');
        setTimeout(function() {
            popup.classList.toggle('hide');
        }, 2000);
        setTimeout(function() {
            popup.classList.remove('show');
            popup.classList.remove('hide');
        }, 2700);
    }
})


document.getElementById('clearEntry').addEventListener('click', function() {
    display.innerHTML = display.innerHTML.slice(0, -1);
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
    if (display.innerHTML.length < 1) {
        display.innerHTML = 0
    }
})


document.getElementById('allClear').addEventListener('click', function() {
    display.innerHTML = 0
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
})
