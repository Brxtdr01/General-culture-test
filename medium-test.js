/* =========================================================
   SCRIPT DU QUIZ GÉOGRAPHIE
   ========================================================= */

const QUESTIONS = [
  { q:"What is the capital of Algeria?", choices:["Oran","Algiers","Annaba","Constantine"], answer:1 },
  { q:"What is the capital of Tunisia?", choices:["Sfax","Sousse","Kairouan","Tunis"], answer:3 },
  { q:"What is the capital of Norway?", choices:["Oslo","Bergen","Trondheim","Stavanger"], answer:0 },
  { q:"What is the capital of Sweden?", choices:["Stockholm","Gothenburg","Malmö","Uppsala"], answer:0 },
  { q:"What is the capital of Poland?", choices:["Gdansk","Krakow","Warsaw","Wroclaw"], answer:2 },
  { q:"What is the capital of Morocco?", choices:["Fes","Casablanca","Marrakech","Rabat"], answer:3 },
  { q:"What is the capital of Chile?", choices:["Valparaiso","Santiago","Concepcion","Temuco"], answer:1 },
  { q:"What is the capital of Hungary?", choices:["Szeged","Bucharest","Budapest","Pecs"], answer:2 },
  { q:"What is the capital of Thailand?", choices:["Bangkok","Chiang Mai","Phuket","Pattaya"], answer:0 },
  { q:"What is the capital of New Zealand?", choices:["Auckland","Wellington","Christchurch","Hamilton"], answer:1 },
  { q:"What is the capital of Colombia?", choices:["Cali","Medellin","Bogotá","Cartagena"], answer:2 },
  { q:"What is the capital of Venezuela?", choices:["Barquisimeto","Maracaibo","Valencia","Caracas"], answer:3 },
  { q:"What is the capital of Kenya?", choices:["Nairobi","Mombasa","Kisumu","Eldoret"], answer:0 },
  { q:"What is the capital of Ethiopia?", choices:["Mekelle","Gondar","Addis Ababa","Bahir Dar"], answer:2 },
  { q:"What is the capital of Malaysia?", choices:["George Town","Kuala Lumpur","Johor Bahru","Malacca"], answer:1 }
];

const state={i:0,score:0,correct:0,wrong:0,start:null};

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
  restartBtn:document.getElementById('restartBtn'),
  autoNext:document.getElementById('autoNext')
};

function startQuiz(){
  state.i=0; state.score=0; state.correct=0; state.wrong=0;
  state.start=Date.now();

  el.startScreen.style.display="none";
  el.quizScreen.style.display="block";
  el.results.style.display="none";

  renderQ();
}

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
  if(el.autoNext.checked){
    setTimeout(nextQ,700); // délai de 0,7s
  }
}

// --- Déplacer ça en dehors de select(), une seule fois ---
el.autoNext.addEventListener("change", ()=>{
  el.nextBtn.style.display = el.autoNext.checked ? "none" : "inline-block";
});


function nextQ(){state.i++; renderQ();}
function skipQ(){state.i++; renderQ();}

function finish(){
  el.questionText.textContent="Quiz terminé";
  el.choices.innerHTML="";
  el.results.style.display="block";
  el.finalScore.textContent=`${state.score} points`;
  el.finalSummary.textContent=`${state.correct} bonnes / ${QUESTIONS.length} questions en ${Math.round((Date.now()-state.start)/1000)}s`;
}

setInterval(()=>{
  if(state.start){
    el.timerText.textContent="Temps: "+Math.round((Date.now()-state.start)/1000)+"s";
  }
},1000);

el.startBtn.onclick=startQuiz;
el.nextBtn.onclick=nextQ;
el.skipBtn.onclick=skipQ;
el.restartBtn.onclick=()=>{
  el.quizScreen.style.display="none";
  el.startScreen.style.display="flex";
};
