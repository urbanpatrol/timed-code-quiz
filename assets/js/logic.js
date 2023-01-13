// timer set to 75s
// timer decreases by 15 for each incorrect answer??
// 5 questions with 4 answers, one true for each

var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
// Time set to 75. Time left will also be the score.
var timeLeft = 75;
var timeId;


// Start button triggers the first question and then displays the 'next' button
// element.addEventListener("type-of-event", functionToExecute)
// Listening for click event on Start Quiz button
startButton.addEventListener("click", startQuiz);
// Listening for click event on Next button ????
nextButton.addEventListener("click", () => {
    currentQuestionindex++
    setNextQuestion()
});

// Start quiz
function startQuiz {
timerId = setInterval(tickerTimer, 1000);

}



// Timer countdown
function tickerTimer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
// save score
    }

}



