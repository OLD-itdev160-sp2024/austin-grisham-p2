// Quiz data
const quizQuestions = [
    {
        question: "What year did the Milwaukee Brewers arrive in Milwaukee?",
        choices: ["1968", "1969", "1970", "1971"],
        correctAnswer: 2,
        multipleChoice: false
    },
    {
        question: "What year did the Milwaukee Brewers move from the American League to the National League?",
        choices: ["1995", "1996", "1997", "1998"],
        correctAnswer: 3,
        multipleChoice: false
    },
    {
        question: "Who owns the Milwaukee Brewers?",
        choices: ["Mark Attanasio", "Matt Arnold", "Pat Murphy", "Herb Kohl"],
        correctAnswer: 0,
        multipleChoice: false
    }
];

// Function for questions
function renderQuestions() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = ''; // Clear previous questions

    for (let i = 0; i < quizQuestions.length; i++) {
        const questionItem = document.createElement('div');
        questionItem.classList.add('question');
        questionItem.innerHTML = `
            <p>${quizQuestions[i].question}</p>
            <ul class="choices" id="choices-${i}">
                <!-- Choices will be injected here -->
            </ul>
        `;
        questionContainer.appendChild(questionItem);

        // choices
        renderChoices(i);
    }
}

// Function for choices for question
function renderChoices(questionIndex) {
    const choicesContainer = document.getElementById(`choices-${questionIndex}`);
    const multipleChoice = quizQuestions[questionIndex].multipleChoice;

    for (let j = 0; j < quizQuestions[questionIndex].choices.length; j++) {
        const choiceItem = document.createElement('li');

        if (multipleChoice) {
            choiceItem.innerHTML = `
                <input type="checkbox" name="choice-${questionIndex}" value="${j}">
                <label>${quizQuestions[questionIndex].choices[j]}</label>
            `;
        } else {
            choiceItem.innerHTML = `
                <input type="radio" name="choice-${questionIndex}" value="${j}">
                <label>${quizQuestions[questionIndex].choices[j]}</label>
            `;
        }

        choicesContainer.appendChild(choiceItem);
    }
}

// Function to check answers
function checkAnswers() {
    let correctAnswers = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
        const selectedChoices = document.querySelectorAll(`input[name='choice-${i}']:checked`);
        if (selectedChoices.length > 0) {
            const selectedAnswers = Array.from(selectedChoices).map(choice => parseInt(choice.value));
            const correctAnswer = quizQuestions[i].correctAnswer;

            if (selectedAnswers.includes(correctAnswer)) {
                correctAnswers++;
            }
        }
    }
    document.title = "RESULTS"; 

    // Results alert
    alert("Results are in! You got " + correctAnswers + " out of " + quizQuestions.length + " questions correct.");
}


// Event listener for submitting answers
document.getElementById('submitButton').addEventListener('click', checkAnswers);

renderQuestions();
