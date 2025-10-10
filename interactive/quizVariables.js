const quizData = [
  {
    question: "Which of the following is a valid variable name in Python?",
    options: ["2name", "first_name", "first-name", "first name"],
    correct: 1
  },
  {
    question: "What data type is returned by the expression: type(3.14)?",
    options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
    correct: 2
  },
  {
    question: "What is the output of: type(True)?",
    options: ["<class 'str'>", "<class 'bool'>", "<class 'int'>", "<class 'float'>"],
    correct: 1
  },
  {
    question: "Which statement correctly assigns a string value?",
    options: ["name = 'Lucienne'", "name = Lucienne", "name == 'Lucienne'", "string(name) = 'Lucienne'"],
    correct: 0
  },
  {
    question: "What is the type of the variable x after: x = [1, 2, 3]?",
    options: ["tuple", "list", "set", "dictionary"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("quiz-option");
    btn.onclick = () => checkAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
  scoreEl.textContent = "";
}

function checkAnswer(selected, btn) {
  const correct = quizData[currentQuestion].correct;
  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach(b => (b.disabled = true));

  if (selected === correct) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Complete!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.textContent = `Your final score: ${score} / ${quizData.length}`;
}

document.addEventListener("DOMContentLoaded", loadQuestion);
