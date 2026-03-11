// Quiz JavaScript for Education Trust Website

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];
let quizData = [];
let quizActive = false;
let currentCategory = '';

// Quiz questions database
const quizzes = {
    physics: [
        {
            question: "What is the SI unit of force?",
            options: ["Kilogram", "Newton", "Joule", "Watt"],
            correct: 1
        },
        {
            question: "Which of the following is a scalar quantity?",
            options: ["Velocity", "Acceleration", "Speed", "Force"],
            correct: 2
        },
        {
            question: "What is the speed of light in vacuum?",
            options: ["3 x 10^8 m/s", "3 x 10^7 m/s", "3 x 10^9 m/s", "3 x 10^6 m/s"],
            correct: 0
        },
        {
            question: "Newton's first law of motion is also known as?",
            options: ["Law of acceleration", "Law of inertia", "Law of action-reaction", "Law of friction"],
            correct: 1
        },
        {
            question: "What is the SI unit of energy?",
            options: ["Newton", "Watt", "Joule", "Kilogram"],
            correct: 2
        }
    ],
    math: [
        {
            question: "What is the derivative of x²?",
            options: ["x", "2x", "x²", "2"],
            correct: 1
        },
        {
            question: "What is the value of π?",
            options: ["3.12", "3.14", "3.16", "3.18"],
            correct: 1
        },
        {
            question: "What is the sum of angles in a triangle?",
            options: ["90°", "180��", "270°", "360°"],
            correct: 1
        },
        {
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "13"],
            correct: 2
        },
        {
            question: "What is log₁₀(100)?",
            options: ["1", "2", "3", "10"],
            correct: 1
        }
    ],
    reasoning: [
        {
            question: "If all birds are animals and all parrots are birds, then all parrots are?",
            options: ["Birds", "Animals", "Flying creatures", "Feathered"],
            correct: 1
        },
        {
            question: "Complete the series: 2, 4, 8, 16, ?",
            options: ["24", "30", "32", "40"],
            correct: 2
        },
        {
            question: "If A is taller than B and B is taller than C, then A is?",
            options: ["Shorter than C", "Taller than C", "Equal to C", "Cannot be determined"],
            correct: 1
        },
        {
            question: "What comes next in the pattern: A, B, D, G, ?",
            options: ["K", "L", "M", "N"],
            correct: 0
        },
        {
            question: "If ABCD is 1234, then BCDE is?",
            options: ["2345", "1235", "1243", "2354"],
            correct: 0
        }
    ],
    gk: [
        {
            question: "What is the capital of France?",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correct: 2
        },
        {
            question: "Which is the largest planet in our solar system?",
            options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
            correct: 1
        },
        {
            question: "Who was the first President of India?",
            options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Sardar Vallabhbhai Patel", "Lal Bahadur Shastri"],
            correct: 1
        },
        {
            question: "What is the currency of Japan?",
            options: ["Dollar", "Euro", "Yuan", "Yen"],
            correct: 3
        },
        {
            question: "Which is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Malta"],
            correct: 1
        }
    ]
};

function startQuiz(category) {
    currentCategory = category;
    quizData = quizzes[category] || quizzes.physics;
    currentQuestion = 0;
    score = 0;
    selectedAnswers = new Array(quizData.length).fill(-1);
    quizActive = true;

    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('resultsSection').style.display = 'none';
    document.querySelector('.py-5:first-of-type').style.display = 'none';

    document.getElementById('totalQuestions').textContent = quizData.length;
    updateProgressBar();
    loadQuestion();
    generateQuestionButtons();
}

function loadQuestion() {
    if (currentQuestion >= quizData.length) return;

    const question = quizData[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        if (selectedAnswers[currentQuestion] === index) {
            div.classList.add('selected');
        }
        div.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option${index}" ${selectedAnswers[currentQuestion] === index ? 'checked' : ''}>
            <label for="option${index}" class="ms-3 mb-0">${option}</label>
        `;
        div.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(div);
    });

    updateNavigationButtons();
}

function selectOption(index) {
    selectedAnswers[currentQuestion] = index;
    loadQuestion();
    updateQuestionButtons();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateQuestionButtons();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        updateQuestionButtons();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

function updateNavigationButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === quizData.length - 1 ? 'Submit' : 'Next <i class="fas fa-chevron-right"></i>';
    
    if (currentQuestion === quizData.length - 1) {
        document.getElementById('nextBtn').onclick = submitQuiz;
    } else {
        document.getElementById('nextBtn').onclick = nextQuestion;
    }

    updateProgressBar();
}

function generateQuestionButtons() {
    const container = document.getElementById('questionButtons');
    container.innerHTML = '';

    quizData.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'question-btn';
        btn.textContent = index + 1;
        if (index === currentQuestion) btn.classList.add('current');
        if (selectedAnswers[index] !== -1) btn.classList.add('answered');
        btn.onclick = () => jumpToQuestion(index);
        
        const col = document.createElement('div');
        col.className = 'col-auto';
        col.appendChild(btn);
        container.appendChild(col);
    });
}

function updateQuestionButtons() {
    const buttons = document.querySelectorAll('.question-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('current');
        if (index === currentQuestion) btn.classList.add('current');
    });
}

function jumpToQuestion(index) {
    currentQuestion = index;
    loadQuestion();
    updateQuestionButtons();
}

function submitQuiz() {
    calculateScore();
    showResults();
}

function calculateScore() {
    score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
}

function showResults() {
    quizActive = false;
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';

    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = score;
    document.getElementById('totalAnswers').textContent = quizData.length;
    document.getElementById('correctCount').textContent = score;
    document.getElementById('incorrectCount').textContent = quizData.length - score;

    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excellent! You performed exceptionally well!';
    } else if (percentage >= 60) {
        message = '👍 Good job! Keep practicing to improve further!';
    } else if (percentage >= 40) {
        message = '📚 Fair performance. Review the material and try again!';
    } else {
        message = '💪 Keep learning! Practice makes perfect!';
    }
    
    document.getElementById('performanceMessage').textContent = message;
}

function retakeQuiz() {
    startQuiz(currentCategory);
}

function endQuiz() {
    if (confirm('Are you sure you want to end this quiz? Your progress will be lost.')) {
        document.getElementById('quizContainer').style.display = 'none';
        document.querySelector('.py-5:first-of-type').style.display = 'block';
        quizActive = false;
    }
}