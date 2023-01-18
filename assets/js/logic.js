// Start the quiz with a timer set to 75. 
// Timer left also will be the final score.
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;

// Adds an event listener to the "startButton" element which listens for a "click" event
// Triggers the "startGame" function when teh button is clicked
startButton.addEventListener("click", startGame);
// Adds an event listener to the "nextButton" element which listens for a "click" event
// Triggers an anonymous function when button is clicked
// The function increases the value of the "currentQuestionIndex" variable by 1, and then calls teh "setNextQuestion" function
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Countdown timer
// The 'timeTick' function reduces the value of the "timeLeft" variable by 1 in each call
// Update the value of the id "timerEl" with the string "Time" followed by the current value of "timeLeft"
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    // if the value of the "timeLeft" variable is less than or equal to 0, then the function 'saveScore()' is called
    if (timeLeft <= 0) {
        saveScore();
    }
}

// Start Quiz
// Assigns the return value of 'setInterval(timeTick, 1000)' to the variable 'timerID' causing the 'timeTick' function to be called every second
function startGame() {
    timerID = setInterval(timeTick, 1000);
    // Hide the start screen of the game
    startContainerEl.classList.add("hide");
    // Shuffle the questions array and assigns it to the variable "shuffledQuestions" by using the 'sort' method with a callback function that returns a random number between 0 and 1
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    // Resets the value of the "currentQuestionIndex" variable to 0
    currentQuestionIndex = 0
    // Removes the "hide" from the "questionContainerEl" element allowing the question screen of the game
    questionContainerEl.classList.remove("hide");

    // Calls the 'timeTick' function to start the time
    timeTick();
    // Calls the 'setNextQuestion' function to set the next question
    setNextQuestion();
};

// Go to next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// Display questions
// This function will be called each time the 'setNextQuestion' function is called and will diplay the question text and all of its answers as clickable buttons in HTML
function showQuestion(question) {
    // Assigns the question text of the question object to the "questionEl" element by using 'innerText' property
    questionEl.innerText = question.question
    // Loops through all the answers of the question object by using the forEach method 
    question.answers.forEach(answer => {
        let button = document.createElement("button")
        // Assigns answer text to the innerText of the button
        button.innerText = answer.text
        // Adds the class "btn" to the button element using the classList.add() method
        button.classList.add("btn")
        // If the answer is correct, it sets the "correct" attribute of the button to the value of the correct property of the answer object by using the "dataset" property
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // Adds and event listener to the button element that listens for a "click" event and triggers the "selectAnswer" function
        button.addEventListener("click", selectAnswer)
        // Appends the button element to the "answerButtonsEl" element
        answerButtonsEl.appendChild(button)
    })
};

// Reset state of the game
// The function will be called each time the 'setNextQuestion' function is called and prepares the game for the next question by hiding the next button, hiding the check answer element and removing all the answer buttons from the previous question 
function resetState() {
    // adds the class "hide" to ethe "nextButton" element hiding the next button
    nextButton.classList.add("hide")
    // adds the class "hide" to the "checkAnswerEl" element hiding the check answer element
    checkAnswerEl.classList.add("hide")
    // The while loop removes all the children of the "answerButttonsEl" element and continues to loop as long as the first child of the answerButtonsEl exists
    while (answerButtonsEl.firstChild) {
        // removes the first child of the answerButtonsEl
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

// Select answer function that allows the user to select an answer, check if the answer is correct and show the next question if any.
function selectAnswer(e) {
    // assigns event target to the variable "selectedButton"
    let selectedButton = e.target;
    // assigns the value of the "correct" attribute of the selected button to the variable "correct" using the "dataset" property
    let correct = selectedButton.dataset.correct;
    // removes the class "hide" from the "checkAnswerEl" element, which will display the check answer element
    checkAnswerEl.classList.remove("hide")
    // Checks if the answer is correct by checking the value of the "correct" variable and displays the appropriate message in the checkAnswerEl element
    if (correct) {
        checkAnswerEl.innerHTML = "You got it right!";
    } else {
        checkAnswerEl.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the answer is wrong, it deducts 10 seconds from the "timeLeft" variable if there is more than 10 seconds left, or set it to 0 if there is less than 10 seconds left
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
// Checks if there are more questions left by comparing the length of the "shufffledQuestions" array and teh "currentQuestionIndex" variable
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // If there are no more questions, it removes the "hide" class from the "nextButton" displaying the next button
        nextButton.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        //  If there are no more questions, it removes the "hide" class from the "startButton" element which will display the start button and calls the "saveScore" function to save the score.
        startButton.classList.remove("hide")
        saveScore();
    }
};

// Function to set the appropriate class to the answer button elements depending on whether they are correct or not. It will clear any existing classes and set the class to "correct" or "wrong" dependng on the value of the "correct" variable passed in as an argument.
// Calls the 'clearStatusClass' function and passes in the element removing any existuing status class from the element.
function setStatusClass(element, correct) {
    clearStatusClass(element)
    // Checks the value of the "correct" variable passed in as an argument
    // If value is true, it adds the class "correct" to the element using the 'classList.add()' method
    if (correct) {
        element.classList.add("correct");
        // If value is false, it adds the class "wrong" to the element using the 'classList.add()' method
    } else {
        element.classList.add("wrong");
    }
};

// Function is used to ensure that the status class added to the element is accurate and doesn't contain multiple classes
// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

// Function will be called when the user answers the last question or time runs out.
// Stops the timer, displays final score and hides the question screen
function saveScore() {
    // stops the timer by calling the 'clearInterval' function and passing in the "timerID" variable
    clearInterval(timerID);
    // updates the text content of the "timerEl" element with the final time left using "timeLeft" variable
    timerEl.textContent = "Time: " + timeLeft;
    // uses 'setTimeout' function to delay the execution of the follwing code by 2 secs
    setTimeout(function () {
        // adds the class "hide" to the "questionContainerEl" element, which will hide the question screen
        questionContainerEl.classList.add("hide");
        // removes the class "hide" from the "score-container" element, which will display the score container
        document.getElementById("score-container").classList.remove("hide");
        // updates the text content of the "your-score" element with the string "Your final score is " followed by the final time left using the "timeLeft" variable
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};

// Load scores function to load scores from local storage
let loadScores = function () {
// If 'savedScores' is false, there are no scores in local storage and function stops
    if (!savedScores) {
        return false;
    }

    //Saves the score and initials of the player after the game is finished, it assigns the values to an object and saves it in an array, it then logs the array and displays the initials and scores in the HTML. 
    // Also converts the string from local storage back to an array using the JSON.parse() method.
    // assigns the parse value of 'savedScores' using 'JSON.parse()' method to 'savedScores' variable
    savedScores = JSON.parse(savedScores);
    // assigns the value entered in the "initials-field" element to the 'initials' variable by using the 'querySelector()' method
    let initials = document.querySelector("#initials-field").value;
    // Creates a new object called 'newScore' which is an object that contains two properties, 'score' which is the value of 'timeLeft' and 'initials' which is the value of the 'initials' variable
    let newScore = {
        score: timeLeft,
        initials: initials
    }
    // pushes the new score to the 'savedScores' array
    savedScores.push(newScore);
    console.log(savedScores)
// uses a forEach method to loop through teh 'savedScores' array for each scoe it assigns the initials to the 'initialsField' element and the score to the 'scoreField' element
    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

// Show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        let score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        let div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        let div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// View high scores link
viewHighScores.addEventListener("click", showHighScores);


submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    let initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});