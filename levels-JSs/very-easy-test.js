/* =========================================================
   QUIZ GÉOGRAPHIE - VERSION FONCTIONNELLE
   ========================================================= */

/* ------------------------------
   LISTE DES QUESTIONS
-------------------------------- */
const QUESTIONS = [
  { q:"What is the capital of France?", choices:["Paris","Lyon","Marseille","Nice"], answer:0 },
  { q:"What is the capital of Italy?", choices:["Milan","Rome","Naples","Venice"], answer:1 },
  { q:"What is the capital of Spain?", choices:["Barcelona","Valencia","Madrid","Seville"], answer:2 },
  { q:"What is the capital of Germany?", choices:["Berlin","Munich","Frankfurt","Hamburg"], answer:0 },
  { q:"What is the capital of United Kingdom?", choices:["Manchester","London","Edinburgh","Belfast"], answer:1 },
  { q:"What is the capital of USA?", choices:["New York","Washington D.C.","Los Angeles","Chicago"], answer:1 },
  { q:"What is the capital of Canada?", choices:["Toronto","Ottawa","Montreal","Vancouver"], answer:1 },
  { q:"What is the capital of Japan?", choices:["Osaka","Kyoto","Tokyo","Nagoya"], answer:2 },
  { q:"What is the capital of Netherlands?", choices:["Amsterdam","Rotterdam","The Hague","Utrecht"], answer:0 },
  { q:"What is the capital of Portugal?", choices:["Lisbon","Porto","Coimbra","Braga"], answer:0 },
];

/* ------------------------------
   OBJET STATE
-------------------------------- */
const state = { i:0, score:0, correct:0, wrong:0, start:null };

/* ------------------------------
   Raccourcis vers les éléments HTML
-------------------------------- */
const el = {
  startScreen: document.getElementById('startScreen'),
  startBtn: document.getElementById('startBtn'),
  quizScreen: document.getElementById('quizScreen'),
  qnum: document.getElementById('qnum'),
  questionText: document.getElementById('questionText'),
  choices: document.getElementById('choices'),
  nextBtn: document.getElementById('nextBtn'),
  skipBtn: document.getElementById('skipBtn'),
  timerText: document.getElementById('timerText'),
  results: document.getElementById('results'),
  finalScore: document.getElementById('finalScore'),
  finalSummary: document.getElementById('finalSummary'),
  restartBtn: document.getElementById('restartBtn'),
  autoNext: document.getElementById('autoNext') // <- ajouté proprement ici
};

/* ------------------------------
   LANCER LE QUIZ
-------------------------------- */
function startQuiz() {
  state.i = 0;
  state.score = 0;
  state.correct = 0;
  state.wrong = 0;
  state.start = Date.now();

  el.startScreen.style.display = "none";
  el.quizScreen.style.display = "block";
  el.results.style.display = "none";

  renderQ();
}

/* ------------------------------
   AFFICHER UNE QUESTION
-------------------------------- */
function renderQ() {
  if (state.i >= QUESTIONS.length) { finish(); return; }

  const q = QUESTIONS[state.i];
  el.qnum.textContent = `${state.i + 1}/${QUESTIONS.length}`;
  el.questionText.textContent = q.q;
  el.choices.innerHTML = "";

  q.choices.forEach((c, idx) => {
    const b = document.createElement('button');
    b.className = "choice";
    b.textContent = c;
    b.onclick = () => select(idx);
    el.choices.appendChild(b);
  });
}

/* ------------------------------
   GESTION D’UNE RÉPONSE
-------------------------------- */
function select(idx) {
  const q = QUESTIONS[state.i];

  Array.from(el.choices.children).forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add("correct");
    else if (i === idx) b.classList.add("wrong");
  });

  if (idx === q.answer) {
    state.score += 10;
    state.correct++;
  } else {
    state.wrong++;
  }

  if (el.autoNext && el.autoNext.checked) {
    setTimeout(nextQ, 700); // petit délai pour voir la couleur
  }
}

/* ------------------------------
   PASSER OU SUIVRE
-------------------------------- */
function nextQ() {
  state.i++;
  renderQ();
}

function skipQ() {
  state.i++;
  renderQ();
}

/* ------------------------------
   FIN DU QUIZ
-------------------------------- */
function finish() {
  el.questionText.textContent = "Quiz terminé";
  el.choices.innerHTML = "";
  el.results.style.display = "block";

  const elapsed = Math.round((Date.now() - state.start) / 1000);
  el.finalScore.textContent = `${state.score} points`;
  el.finalSummary.textContent = `${state.correct} bonnes / ${QUESTIONS.length} questions en ${elapsed}s`;
}

/* ------------------------------
   TIMER
-------------------------------- */
setInterval(() => {
  if (state.start) {
    el.timerText.textContent = "Temps: " + Math.round((Date.now() - state.start) / 1000) + "s";
  }
}, 1000);

/* ------------------------------
   LISTENERS
-------------------------------- */
if (el.autoNext) {
  el.autoNext.addEventListener("change", () => {
    el.nextBtn.style.display = el.autoNext.checked ? "none" : "inline-block";
  });
}

el.startBtn.onclick = startQuiz;
el.nextBtn.onclick = nextQ;
el.skipBtn.onclick = skipQ;
el.restartBtn.onclick = () => {
  el.quizScreen.style.display = "none";
  el.startScreen.style.display = "flex";
};
