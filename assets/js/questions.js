// Question variable containing questions and answers in a nested array.

const questions = [
    { 
        question: "How do you write 'Hello World' in an alert box?", 
        answers: [
            { text: "msg('Hello World')", correct: false },
            { text: "alert('Hello World')" , correct: true },
            { text: "prompt('Hello World')", correct: false },
            { text: "alertBox('Hello World')", correct: false }
        ]
    },
    { 
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 3?", 
        answers: [
            { text: "if (i != 3)", correct: true },
            { text: "if i =! 3", correct: false },
            { text: "if (i <> 3)", correct: false },
            { text: "if (i !=== 3)", correct: false }
        ]
    },
    { 
        question: "Which of the following function of Array object calls a function for each element in the array?", 
        answers: [
            { text: "concat()", correct: false },
            { text: "filter()", correct: false },
            { text: "forEach()", correct: true },
            { text: "split()", correct: false }
        ]
    },
    { 
        question: "What is the correct way to write a JavaScript array?", 
        answers: [
            { text: "var takeaway = (0:'sushi', 1:'pizza', 2:'burger')", correct: false },
            { text: "var takeaway = ['sushi', 'pizza', 'burger']", correct: true },
            { text: "var takeaway = (sushi, pizza, burger)", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    { 
        question: "Who invented JavaScript?",
        answers: [
            { text: "Douglas Crockford", correct: false },
            { text: "Sheryl Sandberg", correct: false },
            { text: "Brendan Eich", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
];