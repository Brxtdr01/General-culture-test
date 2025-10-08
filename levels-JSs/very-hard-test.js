/* =========================================================
   SCRIPT DU QUIZ GÉOGRAPHIE
   ========================================================= */

const QUESTIONS = [
  { q:"What is the capital of Malta? 🇲🇹", choices:["Sliema","Mdina","Valletta","Birkirkara"], answer:2 },
  { q:"What is the capital of Tuvalu? 🇹🇻", choices:["Funafuti","Vaitupu","Nanumea","Niutao"], answer:0 },
  { q:"What is the capital of Namibia 🇳🇦? ", choices:["Pretoria","Windhoek","Marigot","Cape Town"], answer:1 },
  { q:"What is the capital of Botswana? 🇧🇼", choices:["Yaren","Aiwo","Denigomodu","Gaborone"], answer:3 },
  { q:"What is the capital of Zambia? 🇿🇲", choices:["Lusaka","Melekeok","Ngerulmud","Babeldaob"], answer:0 },
  { q:"What is the capital of São Tomé and Príncipe? 🇸🇹", choices:["Santo António","São Tomé","Neves","Trindade"], answer:1 },
  { q:"What is the capital of Fiji? 🇫🇯", choices:["Lautoka","Nadi","Suva","Levuka"], answer:2 },
  { q:"What is the capital of Barbados? 🇧🇧", choices:["Oistins","Speightstown","Bridgetown","Holetown"], answer:2 },
  { q:"What is the capital of Cape Verde? 🇨🇻", choices:["Mindelo","Praia","Santa Maria","Ribeira Grande"], answer:1 },
  { q:"What is the capital of Kiribati? 🇰🇮", choices:["Bikenibeu","Banaba","Betio","Tarawa"], answer:3 },
  { q:"What is the capital of Antigua and Barbuda? 🇦🇬", choices:["Saint John's","Liberta","All Saints","Falmouth"], answer:0 },
  { q:"What is the capital of Saint Lucia? 🇱🇨", choices:["Soufrière","Castries","Gros Islet","Vieux Fort"], answer:1 },
  { q:"What is the capital of Micronesia? 🇫🇲", choices:["Weno","Kolonia","Palikir","Yap"], answer:2 },
  { q:"What is the capital of Comoros? 🇰🇲", choices:["Moroni","Mutsamudu","Fomboni","Domoni"], answer:0 },
  { q:"What is the capital of Maldives? 🇲🇻", choices:["Fuvahmulah","Malé","Hithadhoo","Addu City"], answer:1 },
  { q:"What is the capital of Tonga? 🇹🇴", choices:["Vaini","Neiafu","Haveluloto","Nukuʻalofa"], answer:3 },
  { q:"What is the capital of Turkmenistan? 🇹🇲", choices:["Türkmenabat","Ashgabat","Türkmenbaşy","Daşoguz"], answer:1 },
  { q:"What is the capital of Mauritius? 🇲🇺", choices:["Port Louis","Curepipe","Vacoas","Quatre Bornes"], answer:0 },
  { q:"What is the capital of Saint Vincent and the Grenadines? 🇻🇨", choices:["Barrouallie","Chateaubelair","Kingstown","Layou"], answer:2 },
  { q:"What is the capital of Grenada? 🇬🇩", choices:["Victoria","Grenville","Gouyave","St. George's"], answer:3 },
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
