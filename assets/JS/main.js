document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav a");

    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
});

// ............................... CALCULATOR ...................................

function addToDisplay(value) {
    document.getElementById("display").value += value;
}

function deleteLastCharacter() {
    let displayValue = document.getElementById("display").value;
    document.getElementById("display").value = displayValue.slice(0, -1);
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculateResult() {
    let expression = document.getElementById("display").value;
    expression = expression.replace("%", "/100");
    let result = eval(expression);
    document.getElementById("display").value = result;
}


// .......................................................................................

//.................................. GUESS THE NUMBERA ..............................


let attemptsLeft = 5;
let score = 0;
let randomNumber = generateRandomNumber();
console.log(randomNumber);

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    const userGuess = parseInt(document.getElementById("userGuess").value);
    const result = document.getElementById("result");
    const attemptsDisplay = document.getElementById("attempts");

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        result.textContent = "გთხოვთ შეიყვანოთ მნიშვნელობა 0-დან 100-მდე.";
        result.style.color= "orange";
    } else {
        if (userGuess === randomNumber) {
            result.textContent = `გილოცავთ! თქვენ გამოიცანით მნიშვნელობა ${randomNumber}!`;
            result.style.color = "green";
            increaseScore();
        } else {
            attemptsLeft--;
            attemptsDisplay.textContent = attemptsLeft;
            result.textContent = userGuess > randomNumber ? "ჩაფიქრებულზე მაღალია!" : "ჩამიქრებულზე დაბალია!";
            result.style.color = "red";
            checkLoss();
        }
    }
}

function increaseScore() {
    score += 10;
    document.getElementById("score").textContent = score;
    if (attemptsLeft >= 10) {
        setTimeout(function() {
            restartGame();
            disableInputAndButton();
        }, 100);
    } else {
        randomNumber = generateRandomNumber(); 
        console.log(randomNumber);
    }
}

function checkLoss() {
    if (attemptsLeft === 0) {
        setTimeout(function() {
            alert(`თქვენ წააგეთ და დააგროვეთ ${score} ქულა, სცადეთ კიდევ ერთხელ .`);
            restartGame();
            restartGame();
        }, 100);
    }
}



function restartGame() {
    attemptsLeft = 5;
    score = 0;
    document.getElementById("attempts").textContent = attemptsLeft;
    document.getElementById('score').textContent = score;
    document.getElementById("userGuess").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("result").style.color = "";
    document.getElementById("userGuess").disabled = false;
    document.querySelector("button").disabled = false;
}

function disableInputAndButton() {
    document.getElementById("userGuess").disabled = true;
    document.querySelector("button").disabled = true;
}
