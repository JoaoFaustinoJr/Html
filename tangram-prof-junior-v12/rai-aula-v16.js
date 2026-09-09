(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  const game=root.querySelector('.tl-game')||root.querySelector('.tl-stage');
  if(!game)return;

  const KEY='raiAulaPrV16';
  let state={section:'home',year:6};
  try{state=Object.assign(state,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}};

  let launch=document.getElementById('raiLessonDock');
  if(!launch){
    launch=document.createElement('button');
    launch.type='button';
    launch.id='raiLessonDock';
    launch.className='rai-lesson-dock';
    launch.setAttribute('aria-label','Abrir Aulas da R.A.I.');
    launch.innerHTML='<span class="rai-lesson-dock-icon">🎓</span><span class="rai-lesson-dock-text">Aulas R.A.I.</span>';
    game.appendChild(launch);
  }

  const years=[5,6,7,8,9];
  let fundamentals=[],programming=[],geo={5:[],6:[],7:[],8:[],9:[]};

  const loads=[
    fetch('rai-fundamentos-v16.json?v=16',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Fundamentos');return r.json()}).then(d=>{fundamentals=Array.isArray(d)?d:[]}),
    fetch('rai-programacao-v16.json?v=16',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('Programação');return r.json()}).then(d=>{programming=Array.isArray(d)?d:[]})
  ];
  years.forEach(y=>{
    loads.push(fetch('rai-lessons-'+y+'-v14.json?v=14',{cache:'no-store'})
      .then(r=>{if(!r.ok)throw new Error('Tangram '+y);return r.json()})
      .then(d=>{geo[y]=Array.isArray(d)?d:[]}));
  });
  Promise.all(loads).then(()=>{if(overlay.classList.contains('show'))renderHome()}).catch(e=>console.warn('Aulas R.A.I.',e));

  const overlay=document.createElement('div');
  overlay.className='rai-lesson-overlay rai-lesson-v16';
  overlay.innerHTML=
    '<div class="rai-lesson-card" role="dialog" aria-modal="true" aria-labelledby="raiLessonTitle">'+
      '<div class="rai-lesson-head">'+
        '<img src="rai-icon.svg?v=rai3" alt="R.A.I.">'+
        '<div><h3 id="raiLessonTitle">🎓 Aulas da R.A.I.</h3><small>Fundamentos • Programação • Tangram & Geometria</small><div class="rai-lesson-every">26 aulas • 5º ao 9º ano</div></div>'+
        '<button type="button" class="rai-lesson-close" aria-label="Fechar">×</button>'+
      '</div>'+
      '<div class="rai-lesson-body">'+
        '<div id="raiLessonHome">'+
          '<div class="rai-section-intro"><b>Escolha uma trilha</b><span>A R.A.I. apresenta conceitos curtos, exemplos, desafios e fixação rápida.</span></div>'+
          '<div class="rai-section-grid">'+
            '<button type="button" class="rai-section-card fund" data-section="fund"><span>🧠</span><b>Fundamentos</b><small>Lógica • algoritmos • linguagens • pensamento computacional • programação • bugs</small><em>6 aulas</em></button>'+
            '<button type="button" class="rai-section-card prog" data-section="prog"><span>💻</span><b>Programação por série</b><small>Do 5º ao 9º ano, com progressão de blocos, dados, depuração, listas e eventos</small><em>5 aulas</em></button>'+
            '<button type="button" class="rai-section-card geo" data-section="geo"><span>🔷</span><b>Tangram & Geometria</b><small>Mantém as aulas atuais de matemática, lógica, transformações e estratégia</small><em>15 aulas</em></button>'+
          '</div>'+
        '</div>'+
        '<div id="raiSectionView" hidden>'+
          '<button type="button" class="rai-back-lessons" id="raiBackSections">← Voltar às trilhas</button>'+
          '<div class="rai-section-title" id="raiSectionTitle"></div>'+
          '<div class="rai-year-tabs" id="raiYearTabs"></div>'+
          '<div class="rai-lesson-list" id="raiLessonList"></div>'+
        '</div>'+
        '<div class="rai-lesson-detail" id="raiLessonDetail" hidden>'+
          '<button type="button" class="rai-back-lessons" id="raiBackLessons">← Voltar às aulas</button>'+
          '<div class="rai-lesson-topic" id="raiLessonTopic"></div>'+
          '<div class="rai-lesson-block"><span>💡 Ideia</span><p id="raiLessonConcept"></p></div>'+
          '<div class="rai-lesson-formula" id="raiLessonFormula"></div>'+
          '<div class="rai-lesson-notation" id="raiLessonNotation"></div>'+
          '<div class="rai-lesson-challenge"><span>🧠 Desafio da aula</span><p id="raiLessonChallenge"></p><button type="button" id="raiLessonAnswer">Ver resposta</button><p class="rai-lesson-answer" id="raiLessonAnswerText"></p></div>'+
          '<div class="rai-quick-quiz" id="raiQuickQuiz"><div class="rai-quiz-head"><span>⚡ Fixação rápida</span><small>3 perguntas</small></div><div id="raiQuizQuestions"></div><div class="rai-quiz-result" id="raiQuizResult"></div><button type="button" class="rai-quiz-reset" id="raiQuizReset">Tentar novamente</button></div>'+
          '<button type="button" class="rai-teacher-toggle" id="raiTeacherToggle">ⓘ Professor</button>'+
          '<div class="rai-teacher-box" id="raiTeacherBox"><b>Alinhamento curricular</b><p id="raiTeacherCrep"></p><p id="raiTeacherObjective"></p><p id="raiTeacherComp"></p><small id="raiTeacherTrim"></small></div>'+
          '<div class="rai-lesson-actions"><button type="button" class="primary" id="raiLessonSpeak">🔊 Ouvir</button><button type="button" id="raiLessonTry">🎯 Aplicar desafio</button><button type="button" id="raiLessonClose">Continuar jogando</button></div>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(overlay);

  const home=overlay.querySelector('#raiLessonHome');
  const sectionView=overlay.querySelector('#raiSectionView');
  const tabs=overlay.querySelector('#raiYearTabs');
  const list=overlay.querySelector('#raiLessonList');
  const detail=overlay.querySelector('#raiLessonDetail');
  const sectionTitle=overlay.querySelector('#raiSectionTitle');
  const quizQuestions=overlay.querySelector('#raiQuizQuestions');
  const quizResult=overlay.querySelector('#raiQuizResult');
  const quizReset=overlay.querySelector('#raiQuizReset');

  const els={
    topic:overlay.querySelector('#raiLessonTopic'),
    concept:overlay.querySelector('#raiLessonConcept'),
    formula:overlay.querySelector('#raiLessonFormula'),
    notation:overlay.querySelector('#raiLessonNotation'),
    challenge:overlay.querySelector('#raiLessonChallenge'),
    answer:overlay.querySelector('#raiLessonAnswerText'),
    answerBtn:overlay.querySelector('#raiLessonAnswer'),
    teacherBox:overlay.querySelector('#raiTeacherBox'),
    crep:overlay.querySelector('#raiTeacherCrep'),
    objective:overlay.querySelector('#raiTeacherObjective'),
    comp:overlay.querySelector('#raiTeacherComp'),
    trim:overlay.querySelector('#raiTeacherTrim'),
    tryBtn:overlay.querySelector('#raiLessonTry')
  };

  let current=null,quizState={answered:0,score:0};

  function renderHome(){
    state.section='home';save();
    home.hidden=false;sectionView.hidden=true;detail.hidden=true;
  }

  function sectionMeta(section){
    if(section==='fund')return {title:'🧠 Fundamentos da Programação',sub:'Conceitos essenciais para compreender computação e programação.'};
    if(section==='prog')return {title:'💻 Programação por série',sub:'Progressão do 5º ao 9º ano.'};
    return {title:'🔷 Tangram & Geometria',sub:'Matemática, lógica, transformações e estratégia.'};
  }

  function renderTabs(){
    if(state.section==='fund'){tabs.innerHTML='';tabs.style.display='none';return}
    tabs.style.display='grid';
    tabs.innerHTML=years.map(y=>'<button type="button" data-year="'+y+'" class="'+(Number(state.year)===y?'active':'')+'">'+y+'º ano</button>').join('');
  }

  function currentLessons(){
    if(state.section==='fund')return fundamentals;
    if(state.section==='prog')return programming.filter(l=>Number(l.year)===Number(state.year));
    return geo[Number(state.year)]||[];
  }

  function renderSection(section){
    state.section=section;save();
    const meta=sectionMeta(section);
    home.hidden=true;detail.hidden=true;sectionView.hidden=false;
    sectionTitle.innerHTML='<b>'+meta.title+'</b><small>'+meta.sub+'</small>';
    renderTabs();
    const arr=currentLessons();
    list.innerHTML=arr.length?arr.map((l,i)=>
      '<button type="button" class="rai-lesson-item" data-id="'+l.id+'"><span class="rai-lesson-item-icon">'+l.icon+'</span><span><b>'+(i+1)+'. '+l.topic+'</b><small>'+l.objective+'</small></span><em>›</em></button>'
    ).join(''):'<div class="rai-lesson-loading">Carregando aulas...</div>';
  }

  function allLessons(){
    return fundamentals.concat(programming).concat(...years.map(y=>geo[y]||[]));
  }
  function findLesson(id){return allLessons().find(l=>l.id===id)||null}

  function renderQuiz(){
    quizState={answered:0,score:0};
    quizResult.textContent='';quizResult.className='rai-quiz-result';quizReset.style.display='none';
    const quiz=Array.isArray(current&&current.quiz)?current.quiz:[];
    const box=overlay.querySelector('#raiQuickQuiz');
    if(!quiz.length){box.style.display='none';return}
    box.style.display='block';
    quizQuestions.innerHTML=quiz.map((q,qi)=>
      '<div class="rai-quiz-q" data-q="'+qi+'"><p><b>'+(qi+1)+'.</b> '+q.q+'</p><div class="rai-quiz-options">'+
      q.options.map((o,oi)=>'<button type="button" data-o="'+oi+'">'+o+'</button>').join('')+
      '</div><small class="rai-quiz-feedback"></small></div>'
    ).join('');
  }

  function openLesson(id){
    current=findLesson(id);if(!current)return;
    home.hidden=true;sectionView.hidden=true;detail.hidden=false;
    els.topic.textContent=current.icon+' '+(current.year?current.year+'º ano • ':'')+current.topic;
    els.concept.textContent=current.concept;
    els.formula.textContent=current.formula;
    els.notation.textContent=current.notation||'';
    els.notation.style.display=current.notation?'block':'none';
    els.challenge.textContent=current.challenge;
    els.answer.textContent=current.answer;
    els.answer.classList.remove('show');
    els.answerBtn.textContent='Ver resposta';
    els.teacherBox.classList.remove('show');
    els.crep.textContent='Referência: '+(current.crep||'BNCC Computação / Referencial Curricular do Paraná');
    els.objective.textContent='Objetivo: '+current.objective;
    els.comp.textContent=current.comp||'';
    els.comp.style.display=current.comp?'block':'none';
    els.trim.textContent=current.trim||'';
    els.tryBtn.textContent=current.section==='geo'?'🎯 Testar no Tangram':'🎯 Aplicar desafio';
    renderQuiz();
  }

  home.addEventListener('click',e=>{
    const b=e.target.closest('[data-section]');if(!b)return;
    renderSection(b.dataset.section);
  });
  overlay.querySelector('#raiBackSections').addEventListener('click',renderHome);
  overlay.querySelector('#raiBackLessons').addEventListener('click',()=>renderSection(state.section==='home'?'fund':state.section));

  tabs.addEventListener('click',e=>{
    const b=e.target.closest('button[data-year]');if(!b)return;
    state.year=Number(b.dataset.year);save();renderSection(state.section);
  });
  list.addEventListener('click',e=>{
    const b=e.target.closest('.rai-lesson-item');if(!b)return;openLesson(b.dataset.id);
  });

  quizQuestions.addEventListener('click',e=>{
    const b=e.target.closest('button[data-o]');if(!b||!current)return;
    const qEl=b.closest('.rai-quiz-q');if(!qEl||qEl.dataset.done==='1')return;
    const qi=Number(qEl.dataset.q),oi=Number(b.dataset.o),q=current.quiz[qi];
    qEl.dataset.done='1';quizState.answered++;
    const buttons=[...qEl.querySelectorAll('button[data-o]')];
    buttons.forEach((btn,i)=>{btn.disabled=true;if(i===q.correct)btn.classList.add('correct')});
    const feedback=qEl.querySelector('.rai-quiz-feedback');
    if(oi===q.correct){quizState.score++;b.classList.add('chosen-correct');feedback.textContent='✓ '+q.explanation}
    else{b.classList.add('wrong');feedback.textContent='↳ '+q.explanation}
    feedback.classList.add('show');
    if(quizState.answered===current.quiz.length){
      if(quizState.score===current.quiz.length){quizResult.textContent='✓ Conceito dominado • '+quizState.score+'/'+current.quiz.length;quizResult.classList.add('mastered')}
      else if(quizState.score>=2){quizResult.textContent='Muito bem • '+quizState.score+'/'+current.quiz.length+' • revise apenas o ponto que errou.';quizResult.classList.add('good')}
      else{quizResult.textContent='Revise a ideia principal e tente novamente • '+quizState.score+'/'+current.quiz.length;quizResult.classList.add('review')}
      quizReset.style.display='inline-flex';
    }
  });
  quizReset.addEventListener('click',renderQuiz);

  function close(){
    overlay.classList.remove('show');
    try{if(window.__raiStopSpeak)window.__raiStopSpeak()}catch(e){}
  }
  launch.addEventListener('click',()=>{renderHome();overlay.classList.add('show')});
  overlay.querySelector('.rai-lesson-close').addEventListener('click',close);
  overlay.querySelector('#raiLessonClose').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});

  els.answerBtn.addEventListener('click',()=>{
    const show=!els.answer.classList.contains('show');
    els.answer.classList.toggle('show',show);
    els.answerBtn.textContent=show?'Ocultar resposta':'Ver resposta';
  });
  overlay.querySelector('#raiTeacherToggle').addEventListener('click',()=>els.teacherBox.classList.toggle('show'));
  overlay.querySelector('#raiLessonSpeak').addEventListener('click',()=>{
    if(!current)return;
    const prefix=current.year?'Aula do '+current.year+'º ano. ':'Fundamento. ';
    const parts=[prefix+current.topic+'.',current.concept,current.formula.replace(/•/g,'.'),'Agora o desafio.',current.challenge];
    try{if(window.__raiSpeak)window.__raiSpeak(parts,{force:true,pause:340})}catch(e){}
  });
  els.tryBtn.addEventListener('click',()=>{
    if(!current)return;close();
    const bubble=document.querySelector('.rai-tutor-bubble');
    if(bubble){
      bubble.innerHTML='<b>🤖 R.A.I. • '+(current.year?current.year+'º ano':'Fundamentos')+'</b><br>'+current.challenge;
      bubble.classList.add('show');clearTimeout(bubble._t);
      bubble._t=setTimeout(()=>bubble.classList.remove('show'),7600);
    }
    const stage=root.querySelector('.tl-stage');
    if(stage){stage.classList.add('rai-lesson-stage-pulse');setTimeout(()=>stage.classList.remove('rai-lesson-stage-pulse'),1400)}
    try{if(window.__raiSpeak)window.__raiSpeak([current.challenge],{force:true,pause:300})}catch(e){}
  });
})();
