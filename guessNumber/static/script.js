let randNum = parseInt(Math.random() * 100 + 1);
console.log(randNum);

const submit = document.querySelector("#subt")
const userInput = document.querySelector("#guessField");
const remaining = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");
const guessSlot = document.querySelector(".guesses");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p")

let prevGuess = []
let numOfGuess = 1

let playGame = true

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault()
        const guess = parseInt(userInput.value)
        // console.log(guess);
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please Enter a valid Num")
    } else if (guess < 0) {
        alert("Please Enter a Num greater than 0")
    } else if (guess > 100) {
        alert("Please Enter a Num less than 100")
    } else {
        prevGuess.push(guess)
        if (numOfGuess === 20) {
            displayGuess(guess)
            displayMessage(`Game Over, Number was ${randNum}`)
            endGame()
        }
        else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if (guess === randNum) {
        displayMessage(`You Guessed it right`)
        endGame()
    } else if (guess < randNum) {
        displayMessage(`You Guess is too low`)
    } else if (guess > randNum) {
        displayMessage(`You Guess is too High`)
    }
}

function displayGuess(guess) {
    userInput.value = ''
    guessSlot.innerHTML += `${guess}, `
    numOfGuess++;
    remaining.innerHTML = `${21 - numOfGuess}`
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h3>${message}</h3>`
}

function endGame() {
    userInput.value = ''
    userInput.setAttribute("disabled", "")
    p.classList.add("button")
    p.innerHTML = `<h3 id="newGame">Click Here to Start New Game</h3>`
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame() {
    let newGameBtn = document.querySelector("#newGame")
    newGameBtn.addEventListener("click", function (e) {
        randNum = parseInt(Math.random() * 100 + 1);
        prevGuess = []
        numOfGuess = 1
        guessSlot.innerHTML = ""
        remaining.innerHTML = `${21 - numOfGuess}`
        userInput.removeAttribute("disabled")
        startOver.removeChild(p)
        playGame = true
    })
}
