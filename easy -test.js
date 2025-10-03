/* =========================================================
   SCRIPT DU QUIZ GÉOGRAPHIE
   ========================================================= */

/* ------------------------------
   LISTE DES QUESTIONS
   Chaque question est un objet avec :
   - q : texte de la question
   - choices : tableau contenant les 4 réponses possibles
   - answer : index de la bonne réponse
-------------------------------- */
const QUESTIONS = [
  { q:"Capitale de l'Australie ?", choices:["Sydney","Canberra","Melbourne","Perth"], answer:1 },
  { q:"Fleuve le plus long du monde ?", choices:["Amazone","Nil","Yangtsé","Mississippi"], answer:0 },
  { q:"Pays le plus vaste ?", choices:["Chine","USA","Russie","Canada"], answer:2 }
];

/* ------------------------------
   OBJET STATE
   Sert à stocker la progression du joueur
   - i : numéro de la question actuelle
   - score : total des points
   - correct : nb de bonnes réponses
   - wrong : nb de mauvaises réponses
   - start : timestamp au lancement
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
   Reset des variables + affichage 1ère question
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
  // Fin du quiz si on dépasse la longueur
  if(state.i>=QUESTIONS.length){finish();return;}

  const q=QUESTIONS[state.i];
  el.qnum.textContent=`${state.i+1}/${QUESTIONS.length}`;
  el.questionText.textContent=q.q;
  el.choices.innerHTML="";

  // Création dynamique des boutons réponses
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

  // Vérifie chaque bouton pour afficher vert/rouge
  Array.from(el.choices.children).forEach((b,i)=>{
    b.disabled=true; // empêche de recliquer
    if(i===q.answer){b.classList.add("correct");}
    else if(i===idx){b.classList.add("wrong");}
  });

  // Mise à jour des stats
  if(idx===q.answer){state.score+=10; state.correct++;}
  else{state.wrong++;}
}

/* ------------------------------
   QUESTION SUIVANTE OU PASSER
-------------------------------- */
function nextQ(){state.i++;renderQ();}
function skipQ(){state.i++;renderQ();}

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
