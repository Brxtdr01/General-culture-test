/* =========================================================
   SCRIPT DU QUIZ GÉOGRAPHIE
   ========================================================= */

/* ------------------------------
   LISTE DES QUESTIONS
-------------------------------- */
const QUESTIONS = [
  { q:"What is the capital of Brazil?", choices:["Rio de Janeiro","São Paulo","Brasília","Salvador"], answer:2 },
  { q:"What is the capital of Ireland?", choices:["Dublin","Cork","Galway","Belfast"], answer:0 },
  { q:"What is the capital of Belgium?", choices:["Brussels","Antwerp","Ghent","Liege"], answer:0 },
  { q:"What is the capital of Mexico?", choices:["Mexico City","Guadalajara","Monterrey","Cancun"], answer:0 },
  { q:"What is the capital of South Korea?", choices:["Seoul","Busan","Incheon","Daegu"], answer:0 },
  { q:"What is the capital of Egypt?", choices:["Cairo","Alexandria","Giza","Luxor"], answer:0 },
  { q:"What is the capital of Argentina?", choices:["Buenos Aires","Cordoba","Rosario","Mendoza"], answer:0 },
  { q:"What is the capital of Greece?", choices:["Athens","Thessaloniki","Patras","Heraklion"], answer:0 },
  { q:"What is the capital of Australia?", choices:["Sydney","Melbourne","Canberra","Perth"], answer:2 },
  { q:"What is the capital of Turkey?", choices:["Istanbul","Ankara","Izmir","Bursa"], answer:1 }
];




/* ------------------------------
   OBJET STATE
-------------------------------- */
const state={i:0,score:0,correct:0,wrong:0,start:null};

/* ------------------------------
   Raccourcis vers les éléments HTML
-------------------------------- */
const el={
  startScreen:document.getElementById('startScreen'),
  startBtn:document.getElementById('startBtn'),
  quizScreen:document.getElementById('quizScreen'),
  qnum:document.getElementById('qnum'),
  questionText:document.getElementById('questionText'),
  choices:document.getElementById('choices'),
  nextBtn:document.getElementById('nextBtn'),
  skipBtn:document.getElementById('skipBtn'),
  timerText:document.getElementById('timerText'),
  results:document.getElementById('results'),
  finalScore:document.getElementById('finalScore'),
  finalSummary:document.getElementById('finalSummary'),
  restartBtn:document.getElementById('restartBtn')
};

/* ------------------------------
   DÉMARRER LE QUIZ
-------------------------------- */
function startQuiz(){
  state.i=0; state.score=0; state.correct=0; state.wrong=0;
  state.start=Date.now();

  el.startScreen.style.display="none";
  el.quizScreen.style.display="block";
  el.results.style.display="none";

  renderQ();
}

/* ------------------------------
   AFFICHER UNE QUESTION
-------------------------------- */
function renderQ(){
  if(state.i>=QUESTIONS.length){finish(); return;}

  const q=QUESTIONS[state.i];
  el.qnum.textContent=`${state.i+1}/${QUESTIONS.length}`;
  el.questionText.textContent=q.q;
  el.choices.innerHTML="";

  q.choices.forEach((c,idx)=>{
    const b=document.createElement('button');
    b.className="choice";
    b.textContent=c;
    b.onclick=()=>select(idx);
    el.choices.appendChild(b);
  });
}

/* ------------------------------
   GESTION D’UNE RÉPONSE
-------------------------------- */
function select(idx){
  const q=QUESTIONS[state.i];

  Array.from(el.choices.children).forEach((b,i)=>{
    b.disabled=true;
    if(i===q.answer){b.classList.add("correct");}
    else if(i===idx){b.classList.add("wrong");}
  });

  if(idx===q.answer){state.score+=10; state.correct++;}
  else{state.wrong++;}

  // Auto-next activé ?
  const autoNext = document.getElementById('autoNext'); // raccourci
  if(autoNext && autoNext.checked){
    setTimeout(nextQ,100); // délai  avant la question suivante
  }
}
document.getElementById('autoNext').addEventListener("change", e=>{
  el.nextBtn.style.display = e.target.checked ? "none" : "inline-block";
});

/* ------------------------------
   QUESTION SUIVANTE OU PASSER
-------------------------------- */
function nextQ(){state.i++; renderQ();}
function skipQ(){state.i++; renderQ();}

/* ------------------------------
   FIN DU QUIZ
-------------------------------- */
function finish(){
  el.questionText.textContent="Quiz terminé";
  el.choices.innerHTML="";
  el.results.style.display="block";

  el.finalScore.textContent=`${state.score} points`;
  el.finalSummary.textContent=`${state.correct} bonnes / ${QUESTIONS.length} questions en ${Math.round((Date.now()-state.start)/1000)}s`;
}

/* ------------------------------
   TIMER EN DIRECT
-------------------------------- */
setInterval(()=>{
  if(state.start){
    el.timerText.textContent="Temps: "+Math.round((Date.now()-state.start)/1000)+"s";
  }
},1000);

/* ------------------------------
   LISTENERS DES BOUTONS
-------------------------------- */
el.startBtn.onclick=startQuiz;
el.nextBtn.onclick=nextQ;
el.skipBtn.onclick=skipQ;
el.restartBtn.onclick=()=>{
  el.quizScreen.style.display="none";
  el.startScreen.style.display="flex";
};
