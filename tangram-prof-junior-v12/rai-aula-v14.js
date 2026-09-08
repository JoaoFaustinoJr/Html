
(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  const game=root.querySelector('.tl-game')||root.querySelector('.tl-stage');
  if(!game)return;

  const KEY='raiAulaPrV14';
  let state={year:6};
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
  let bank={5:[],6:[],7:[],8:[],9:[]};
  Promise.all(years.map(function(y){
    return fetch('rai-lessons-'+y+'-v14.json?v=14',{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('Aulas '+y);return r.json()})
      .then(function(data){bank[y]=Array.isArray(data)?data:[]});
  })).catch(function(e){console.warn('Aulas R.A.I.',e)});

  const overlay=document.createElement('div');
  overlay.className='rai-lesson-overlay rai-lesson-v14';
  overlay.innerHTML=
    '<div class="rai-lesson-card" role="dialog" aria-modal="true" aria-labelledby="raiLessonTitle">'+
      '<div class="rai-lesson-head">'+
        '<img src="rai-icon.svg?v=rai3" alt="R.A.I.">'+
        '<div><h3 id="raiLessonTitle">🎓 Aulas da R.A.I.</h3><small>5º ao 9º ano • Matemática, lógica e computação</small><div class="rai-lesson-every">15 aulas • CREP/PR + BNCC</div></div>'+
        '<button type="button" class="rai-lesson-close" aria-label="Fechar">×</button>'+
      '</div>'+
      '<div class="rai-lesson-body">'+
        '<div class="rai-year-tabs" id="raiYearTabs"></div>'+
        '<div class="rai-lesson-list" id="raiLessonList"></div>'+
        '<div class="rai-lesson-detail" id="raiLessonDetail" hidden>'+
          '<button type="button" class="rai-back-lessons" id="raiBackLessons">← Voltar às aulas</button>'+
          '<div class="rai-lesson-topic" id="raiLessonTopic"></div>'+
          '<div class="rai-lesson-block"><span>💡 Ideia</span><p id="raiLessonConcept"></p></div>'+
          '<div class="rai-lesson-formula" id="raiLessonFormula"></div>'+
          '<div class="rai-lesson-notation" id="raiLessonNotation"></div>'+
          '<div class="rai-lesson-challenge"><span>🧠 Desafio da aula</span><p id="raiLessonChallenge"></p><button type="button" id="raiLessonAnswer">Ver resposta</button><p class="rai-lesson-answer" id="raiLessonAnswerText"></p></div>'+
          '<button type="button" class="rai-teacher-toggle" id="raiTeacherToggle">ⓘ Professor</button>'+
          '<div class="rai-teacher-box" id="raiTeacherBox"><b>Alinhamento curricular</b><p id="raiTeacherCrep"></p><p id="raiTeacherObjective"></p><p id="raiTeacherComp"></p><small id="raiTeacherTrim"></small></div>'+
          '<div class="rai-lesson-actions"><button type="button" class="primary" id="raiLessonSpeak">🔊 Ouvir</button><button type="button" id="raiLessonTry">🎯 Testar no Tangram</button><button type="button" id="raiLessonClose">Continuar jogando</button></div>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(overlay);

  const tabs=overlay.querySelector('#raiYearTabs');
  const list=overlay.querySelector('#raiLessonList');
  const detail=overlay.querySelector('#raiLessonDetail');
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
    trim:overlay.querySelector('#raiTeacherTrim')
  };
  let current=null;

  function renderTabs(){
    tabs.innerHTML=years.map(function(y){
      return '<button type="button" data-year="'+y+'" class="'+(Number(state.year)===y?'active':'')+'">'+y+'º ano</button>';
    }).join('');
  }
  function renderList(){
    const y=Number(state.year)||6;
    const arr=bank[y]||[];
    list.innerHTML=arr.length?arr.map(function(l,i){
      return '<button type="button" class="rai-lesson-item" data-id="'+l.id+'"><span class="rai-lesson-item-icon">'+l.icon+'</span><span><b>'+(i+1)+'. '+l.topic+'</b><small>'+l.objective+'</small></span><em>›</em></button>';
    }).join(''):'<div class="rai-lesson-loading">Carregando aulas...</div>';
    detail.hidden=true;
    list.hidden=false;
  }
  function findLesson(id){
    for(const y of years){const l=(bank[y]||[]).find(function(x){return x.id===id});if(l)return l}
    return null;
  }
  function openLesson(id){
    current=findLesson(id);if(!current)return;
    list.hidden=true;detail.hidden=false;
    els.topic.textContent=current.icon+' '+current.year+'º ano • '+current.topic;
    els.concept.textContent=current.concept;
    els.formula.textContent=current.formula;
    els.notation.textContent=current.notation||'';
    els.notation.style.display=current.notation?'block':'none';
    els.challenge.textContent=current.challenge;
    els.answer.textContent=current.answer;
    els.answer.classList.remove('show');
    els.answerBtn.textContent='Ver resposta';
    els.teacherBox.classList.remove('show');
    els.crep.textContent='CREP/PR: '+current.crep;
    els.objective.textContent='Objetivo: '+current.objective;
    els.comp.textContent=current.comp||'';
    els.comp.style.display=current.comp?'block':'none';
    els.trim.textContent=current.trim;
  }

  renderTabs();renderList();
  setTimeout(renderList,450);

  tabs.addEventListener('click',function(e){
    const b=e.target.closest('button[data-year]');if(!b)return;
    state.year=Number(b.dataset.year);save();renderTabs();renderList();
  });
  list.addEventListener('click',function(e){
    const b=e.target.closest('.rai-lesson-item');if(!b)return;openLesson(b.dataset.id);
  });
  overlay.querySelector('#raiBackLessons').addEventListener('click',renderList);

  function close(){
    overlay.classList.remove('show');
    try{if(window.__raiStopSpeak)window.__raiStopSpeak()}catch(e){}
  }
  launch.addEventListener('click',function(){renderTabs();renderList();overlay.classList.add('show')});
  overlay.querySelector('.rai-lesson-close').addEventListener('click',close);
  overlay.querySelector('#raiLessonClose').addEventListener('click',close);
  overlay.addEventListener('click',function(e){if(e.target===overlay)close()});

  els.answerBtn.addEventListener('click',function(){
    const show=!els.answer.classList.contains('show');
    els.answer.classList.toggle('show',show);
    els.answerBtn.textContent=show?'Ocultar resposta':'Ver resposta';
  });
  overlay.querySelector('#raiTeacherToggle').addEventListener('click',function(){els.teacherBox.classList.toggle('show')});
  overlay.querySelector('#raiLessonSpeak').addEventListener('click',function(){
    if(!current)return;
    const parts=['Aula do '+current.year+'º ano. '+current.topic+'.',current.concept,current.formula.replace(/•/g,'.'),'Agora o desafio.',current.challenge];
    try{if(window.__raiSpeak)window.__raiSpeak(parts,{force:true,pause:340})}catch(e){}
  });
  overlay.querySelector('#raiLessonTry').addEventListener('click',function(){
    if(!current)return;close();
    const bubble=document.querySelector('.rai-tutor-bubble');
    if(bubble){
      bubble.innerHTML='<b>🤖 R.A.I. • '+current.year+'º ano</b><br>'+current.challenge;
      bubble.classList.add('show');clearTimeout(bubble._t);
      bubble._t=setTimeout(function(){bubble.classList.remove('show')},7600);
    }
    const stage=root.querySelector('.tl-stage');
    if(stage){stage.classList.add('rai-lesson-stage-pulse');setTimeout(function(){stage.classList.remove('rai-lesson-stage-pulse')},1400)}
    try{if(window.__raiSpeak)window.__raiSpeak([current.challenge],{force:true,pause:300})}catch(e){}
  });
})();
