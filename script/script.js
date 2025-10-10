// =======================
// Interactive Quiz
// =======================
const quizData = [
  {
    question: "What is the first step in backward design?",
    options: ["Create activities", "Identify desired results", "Plan assessments", "Choose textbook"],
    correct: 1
  },
  {
    question: "Which approach best supports diverse learners?",
    options: ["One-size-fits-all content", "Universal Design for Learning", "Text-only materials", "Lecture-only format"],
    correct: 1
  },
  {
    question: "What makes an assessment 'authentic'?",
    options: ["Multiple choice only", "Real-world application", "Timed format", "Memorization-based"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById('question').textContent = q.question;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('quiz-option');
    btn.onclick = () => checkAnswer(index);
    optionsDiv.appendChild(btn);
  });

  document.getElementById('result').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(selected) {
  const q = quizData[currentQuestion];
  const resultDiv = document.getElementById('result');
  const buttons = document.getElementById('options').getElementsByTagName('button');

  Array.from(buttons).forEach(btn => btn.disabled = true);

  if (selected === q.correct) {
    score++;
    resultDiv.textContent = '✓ Correct! Great job.';
    resultDiv.style.background = '#c6f6d5';
  } else {
    resultDiv.textContent = '✗ Not quite. The correct answer is: ' + q.options[q.correct];
    resultDiv.style.background = '#fed7d7';
  }

  resultDiv.style.display = 'block';

  if (currentQuestion < quizData.length - 1) {
    document.getElementById('next-btn').style.display = 'block';
  } else {
    resultDiv.textContent += `\n\nQuiz complete! Your score: ${score}/${quizData.length}`;
  }
}

document.getElementById('next-btn').onclick = () => {
  currentQuestion++;
  loadQuestion();
};

// =======================
// Smooth Scrolling
// =======================
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

loadQuestion();
