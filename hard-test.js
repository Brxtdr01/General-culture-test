/* =========================================================
   SCRIPT DU QUIZ GÉOGRAPHIE
   ========================================================= */

const QUESTIONS = [
  { q:"What is the capital of Chad? 🇹🇩", choices:["N’Djamena","Sarh","Moundou","Abéché"], answer:0 },
  { q:"What is the capital of Bhutan? 🇧🇹", choices:["Punakha","Thimphu","Phuntsholing","Paro"], answer:1 },
  { q:"What is the capital of Marshall Islands? 🇲🇭", choices:["Ebeye","Majuro","Wotje","Jaluit"], answer:1 },
  { q:"What is the capital of Suriname? 🇸🇷", choices:["Lelydorp","Paramaribo","Nieuw Nickerie","Moengo"], answer:1 },
  { q:"What is the capital of Mali? 🇲🇱", choices:["Timbuktu","Sikasso","Segou","Bamako"], answer:3 },
  { q:"What is the capital of Laos? 🇱🇦", choices:["Pakse","Vientiane","Luang Prabang","Savannakhet"], answer:1 },
  { q:"What is the capital of Kyrgyzstan? 🇰🇬", choices:["Osh","Bishkek","Jalal-Abad","Karakol"], answer:1 },
  { q:"What is the capital of Mongolia? 🇲🇳", choices:["Ulaanbaatar","Choibalsan","Darkhan","Erdenet"], answer:0 },
  { q:"What is the capital of Vanuatu? 🇻🇺", choices:["Tanna","Luganville","Santo","Port Vila"], answer:3 },
  { q:"What is the capital of Seychelles? 🇸🇨", choices:["Bel Ombre","Victoria","Beau Vallon","Anse Boileau"], answer:1 },
  { q:"What is the capital of Solomon Islands? 🇸🇧", choices:["Auki","Honiara","Munda","Gizo"], answer:1 },
  { q:"What is the capital of Gabon? 🇬🇦", choices:["Franceville","Port-Gentil","Libreville","Oyem"], answer:2 },
  { q:"What is the capital of Equatorial Guinea? 🇬🇶", choices:["Bata","Malabo","Mongomo","Ebebiyin"], answer:1 },
  { q:"What is the capital of Belize? 🇧🇿", choices:["Belize City","Belmopan","Dangriga","San Ignacio"], answer:1 },
  { q:"What is the capital of Dominica? 🇩🇲", choices:["Roseau","Castle Bruce","Marigot","Portsmouth"], answer:0 },
  { q:"What is the capital of Saint Kitts and Nevis? 🇰🇳", choices:["Basseterre","Sandy Point","Charlestown","Cayon"], answer:0 },
  { q:"What is the capital of Comoros? 🇰🇲", choices:["Domoni","Mitsamiouli","Fomboni","Moroni"], answer:3 },
  { q:"What is the capital of Djibouti? 🇩🇯", choices:["Ali Sabieh","Djibouti","Obock","Tadjoura"], answer:1 },
  { q:"What is the capital of Eritrea? 🇪🇷", choices:["Massawa","Mendefera","Keren","Asmara"], answer:3 },
  { q:"What is the capital of Palau? 🇵🇼", choices:["Melekeok","Airai","Koror","Ngerulmud"], answer:3 }
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
    setTimeout(nextQ,100); // délai de 0,7s
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
