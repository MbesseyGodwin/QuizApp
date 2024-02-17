const questions = {
    math: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: "4" }
    ],
    science: [
        { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
        { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" }
    ],
    history: [
        { question: "Who was the first president of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
        { question: "In what year did World War II end?", options: ["1945", "1918", "1939", "1950"], answer: "1945" }
    ]
};

let currentCategory;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentCategory = document.getElementById("category").value;
    document.getElementById("quiz").style.display = "block";
    showQuestion();
    
    // Change the button text to "End Quiz"
    const startBtn = document.getElementById("startBtn");
    startBtn.textContent = "End Quiz";
    // Change the onclick attribute to call endQuiz() function
    startBtn.onclick = endQuiz;
}


function showQuestion() {
    const categoryQuestions = questions[currentCategory];
    if (currentQuestionIndex < categoryQuestions.length) {
        const questionObj = categoryQuestions[currentQuestionIndex];
        document.getElementById("question").textContent = questionObj.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        questionObj.options.forEach((option, index) => {
            const optionButton = document.createElement("button");
            optionButton.textContent = option;
            optionButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "mr-4", "mb-4", "hover:bg-blue-600", "focus:outline-none", "focus:bg-blue-600");
            optionButton.onclick = () => checkAnswer(option, questionObj.answer);
            optionsContainer.appendChild(optionButton);
        });
    } else {
        endQuiz();
    }
}


function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
    updateScore();
}

function updateScore() {
    document.getElementById("score").textContent = score;
}

function endQuiz() {
    const modal = document.getElementById("modal");
    const finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
    modal.classList.remove("hidden");

    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", function() {
        modal.classList.add("hidden");
        score = 0;
        currentQuestionIndex = 0;
        document.getElementById("quiz").style.display = "none";
    });
}

