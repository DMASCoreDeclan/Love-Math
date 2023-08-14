// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');
    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute('data-type') === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded.
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    
    // Creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
    
    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}.  Aborting!`
    }

}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array 
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === Math.floor(calculatedAnswer[0]);
    if (isCorrect) {
        alert('Congratulations, you got it right :)');
        incrementScore();
    } else {
        alert(`Awwww, you got it wrong.  You answered ${userAnswer}.  The correct answer is ${Math.floor(calculatedAnswer[0])} :(`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
   
}
/**
 * Gets the operands (the numbers) and the operator (plus, minus, times, divide)
 * directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operator = document.getElementById('operator').innerText;
    let operand2 = parseInt(document.getElementById('operand2').innerText);

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`We haven't programmed this yet ${operator}`);
        throw `We haven't programmed this yet ${operator}.  Aborting!`;
    }
}
/**
 * Gets the current CORRECT score from the DOM and increments it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').textContent = ++oldScore;    
}

/**
 * Gets the current INCORRECT score from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').textContent = ++oldScore; 
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = "+";
    document.getElementById('operand2').textContent = operand2;
}

function displaySubtractQuestion(operand1, operand2) {
    if (operand1 > operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = "-";
    document.getElementById('operand2').textContent = operand2;
    } else {
    document.getElementById('operand2').textContent = operand1;
    document.getElementById('operator').textContent = "-";
    document.getElementById('operand1').textContent = operand2;
    }
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operator').textContent = "x";
    document.getElementById('operand2').textContent = operand2;
}

function displayDivideQuestion(operand1, operand2) {
    if (operand1 > operand2) {
        document.getElementById('operand1').textContent = operand1;
        document.getElementById('operator').textContent = "/";
        document.getElementById('operand2').textContent = operand2;
        } else {
        document.getElementById('operand2').textContent = operand1;
        document.getElementById('operator').textContent = "/";
        document.getElementById('operand1').textContent = operand2;
        }
}
