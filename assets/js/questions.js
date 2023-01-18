// Question variable containing questions and answers in a nested array.

const questions = [
    { 
        question: "How do you write 'Hello World' in an alert box?", 
        answers: [
            { text: "msg('Hello World')", correct: false },
            { text: "prompt('Hello World')", correct: false },
            { text: "alert('Hello World')" , correct: true },
            { text: "alertBox('Hello World')", correct: false }
        ]
    },
    { 
        question: "Which of the following variables takes precedence over the others if the names are the same?", 
        answers: [
            { text: "the local element", correct: true },
            { text: "global variable", correct: false },
            { text: "the two above statements", correct: false },
            { text: "none of the above", correct: false },
            
        ]
    },
    { 
        question: "The 'function' and 'var' are known as?", 
        answers: [
            { text: "keywords", correct: false },
            { text: "data types", correct: false },
            { text: "declaration statments", correct: true },
            { text: "prototypes", correct: false }
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