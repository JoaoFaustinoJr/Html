(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  const game=root.querySelector('.tl-game')||root.querySelector('.tl-stage');
  if(!game)return;

  const KEY='raiAulaPrV17';
  let state={section:'home',year:5};
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
  const order=['fund','pc','prog','math','digital'];
  const meta={
    fund:{icon:'🧠',title:'Fundamentos',sub:'Lógica, algoritmos, linguagens, dados, eixos da Computação e depuração',count:8,yearless:true},
    pc:{icon:'🧩',title:'Pensamento Computacional',sub:'Representar problemas, decompor, generalizar, reutilizar e modelar soluções',count:10},
    prog:{icon:'💻',title:'Programação',sub:'Progressão do 5º ao 9º ano, de algoritmos em blocos a estruturas, projetos e eventos',count:15},
    math:{icon:'🔷',title:'Matemática & Geometria',sub:'Tangram, ângulos, transformações, área, escala, semelhança e Pitágoras',count:15},
    digital:{icon:'🌐',title:'Mundo & Cultura Digital',sub:'Computadores, redes, segurança, cidadania, privacidade, autoria e impacto social',count:10}
  };
  let banks={fund:[],pc:[],prog:[],math:[],digital:[]};
  let ready=false;

  const sources={
    fund:'rai-fundamentos-v17.json?v=17',
    pc:'rai-pensamento-v17.json?v=17',
    prog:'rai-programacao-v17.json?v=17',
    math:'rai-matematica-v17.json?v=17',
    digital:'rai-mundo-digital-v17.json?v=17'
  };

  Promise.all(order.map(s=>fetch(sources[s],{cache:'no-store'})
    .then(r=>{if(!r.ok)throw new Error('Aulas '+s);return r.json()})
    .then(d=>{banks[s]=Array.isArray(d)?d:[]})))
    .then(()=>{ready=true;if(overlay.classList.contains('show'))renderHome()})
    .catch(e=>console.warn('Aulas R.A.I. v17',e));

  const overlay=document.createElement('div');
  overlay.className='rai-lesson-overlay rai-lesson-v17';
  overlay.innerHTML=
  '<div class="rai-lesson-card" role="dialog" aria-modal="true" aria-labelledby="raiLessonTitle">'+
    '<div class="rai-lesson-head">'+
      '<img src="rai-icon.svg?v=rai3" alt="R.A.I.">'+
      '<div><h3 id="raiLessonTitle">🎓 Aulas da R.A.I.</h3><small>Modo pedagógico • 5º ao 9º ano</small><div class="rai-lesson-every">58 microaulas • BNCC + Referencial Curricular do Paraná</div></div>'+
      '<button type="button" class="rai-lesson-close" aria-label="Fechar">×</button>'+
    '</div>'+
    '<div class="rai-lesson-body">'+
      '<div id="raiLessonHome">'+
        '<div class="rai-v17-philosophy"><b>No modo pedagógico, ensinar faz parte do jogo.</b><span>Escolha uma área. Para uma experiência sem intervenção didática, use o Modo Gamer.</span></div>'+
        '<div class="rai-v17-sections" id="raiV17Sections"></div>'+
        '<div class="rai-v17-curriculum"><b>Organização curricular</b><span>As trilhas seguem os eixos Pensamento Computacional, Mundo Digital e Cultura Digital da BNCC Computação e do Referencial Curricular do Paraná, além das referências de Matemática.</span></div>'+
      '</div>'+
      '<div id="raiSectionView" hidden>'+
        '<div class="rai-v17-breadcrumb"><button type="button" id="raiHomeFromSection">Trilhas</button><span>›</span><b id="raiSectionCrumb"></b></div>'+
        '<div class="rai-section-title" id="raiSectionTitle"></div>'+
        '<div class="rai-year-tabs" id="raiYearTabs"></div>'+
        '<div class="rai-lesson-list" id="raiLessonList"></div>'+
      '</div>'+
      '<div class="rai-lesson-detail" id="raiLessonDetail" hidden>'+
        '<div class="rai-v17-breadcrumb"><button type="button" id="raiHomeFromDetail">Trilhas</button><span>›</span><button type="button" id="raiSectionFromDetail"></button><span>›</span><b id="raiLessonCrumb"></b></div>'+
        '<div class="rai-lesson-topic" id="raiLessonTopic"></div>'+
        '<div class="rai-v17-objective"><span>🎯 Objetivo</span><p id="raiLessonObjectiveTop"></p></div>'+
        '<div class="rai-lesson-block"><span>💡 Explicação da R.A.I.</span><p id="raiLessonConcept"></p></div>'+
        '<div class="rai-v17-key"><span>🔤 Conceito-chave</span><b id="raiKeyTerm"></b><p id="raiKeyDefinition"></p></div>'+
        '<div class="rai-lesson-block rai-v17-example"><span>🧩 Exemplo</span><p id="raiLessonExample"></p></div>'+
        '<div class="rai-lesson-formula" id="raiLessonFormula"></div>'+
        '<div class="rai-lesson-notation" id="raiLessonRepresentation"></div>'+
        '<div class="rai-lesson-block"><span>🌍 Onde isso aparece?</span><p id="raiLessonUse"></p></div>'+
        '<div class="rai-v17-observe"><span>👀 Observe isto</span><p id="raiLessonObserve"></p></div>'+
        '<div class="rai-v17-guided"><span>🪜 Atividade guiada</span><p id="raiLessonGuided"></p></div>'+
        '<div class="rai-lesson-challenge"><span>🧠 Desafio da aula</span><p id="raiLessonChallenge"></p><button type="button" id="raiLessonAnswer">Ver resposta comentada</button><p class="rai-lesson-answer" id="raiLessonAnswerText"></p></div>'+
        '<div class="rai-v17-fix" id="raiFixBox"><div class="rai-v17-fix-head"><span>⚡ Fixação rápida</span><small>3 perguntas • revele depois de responder</small></div><div id="raiFixList"></div><div class="rai-v17-fix-done" id="raiFixDone">✓ Revisão concluída</div></div>'+
        '<button type="button" class="rai-teacher-toggle" id="raiTeacherToggle">ⓘ Professor</button>'+
        '<div class="rai-teacher-box" id="raiTeacherBox"><b>Alinhamento curricular e uso docente</b><p id="raiTeacherAxis"></p><p id="raiTeacherReference"></p><p id="raiTeacherObjective"></p><p id="raiTeacherTip"></p><small>Referências curriculares orientam o planejamento; não representam homologação institucional do aplicativo.</small></div>'+
        '<div class="rai-v17-lesson-nav"><button type="button" id="raiPrevLesson">← Anterior</button><button type="button" id="raiListLessons">☰ Aulas desta área</button><button type="button" id="raiNextLesson">Próxima →</button></div>'+
        '<div class="rai-lesson-actions"><button type="button" class="primary" id="raiLessonSpeak">🔊 Ouvir com a R.A.I.</button><button type="button" id="raiLessonTry">🎯 Aplicar desafio</button><button type="button" id="raiSwitchSection">🧭 Trocar disciplina</button><button type="button" id="raiLessonClose">Continuar jogando</button></div>'+
      '</div>'+
    '</div>'+
  '</div>';
  document.body.appendChild(overlay);

  const home=overlay.querySelector('#raiLessonHome');
  const sectionView=overlay.querySelector('#raiSectionView');
  const detail=overlay.querySelector('#raiLessonDetail');
  const tabs=overlay.querySelector('#raiYearTabs');
  const list=overlay.querySelector('#raiLessonList');
  const sections=overlay.querySelector('#raiV17Sections');
  const sectionTitle=overlay.querySelector('#raiSectionTitle');
  const sectionCrumb=overlay.querySelector('#raiSectionCrumb');
  const lessonCrumb=overlay.querySelector('#raiLessonCrumb');
  const sectionFromDetail=overlay.querySelector('#raiSectionFromDetail');
  const fixList=overlay.querySelector('#raiFixList');
  const fixDone=overlay.querySelector('#raiFixDone');

  const els={
    topic:overlay.querySelector('#raiLessonTopic'),
    objectiveTop:overlay.querySelector('#raiLessonObjectiveTop'),
    concept:overlay.querySelector('#raiLessonConcept'),
    keyTerm:overlay.querySelector('#raiKeyTerm'),
    keyDefinition:overlay.querySelector('#raiKeyDefinition'),
    example:overlay.querySelector('#raiLessonExample'),
    formula:overlay.querySelector('#raiLessonFormula'),
    representation:overlay.querySelector('#raiLessonRepresentation'),
    use:overlay.querySelector('#raiLessonUse'),
    observe:overlay.querySelector('#raiLessonObserve'),
    guided:overlay.querySelector('#raiLessonGuided'),
    challenge:overlay.querySelector('#raiLessonChallenge'),
    answer:overlay.querySelector('#raiLessonAnswerText'),
    answerBtn:overlay.querySelector('#raiLessonAnswer'),
    teacherBox:overlay.querySelector('#raiTeacherBox'),
    teacherAxis:overlay.querySelector('#raiTeacherAxis'),
    teacherReference:overlay.querySelector('#raiTeacherReference'),
    teacherObjective:overlay.querySelector('#raiTeacherObjective'),
    teacherTip:overlay.querySelector('#raiTeacherTip'),
    prev:overlay.querySelector('#raiPrevLesson'),
    next:overlay.querySelector('#raiNextLesson')
  };

  let current=null;
  let currentList=[];
  let currentIndex=-1;
  let fixSeen=new Set();

  function countLabel(section){
    const actual=(banks[section]||[]).length;
    return (actual||meta[section].count)+' aulas';
  }

  function renderHome(){
    state.section='home';save();
    home.hidden=false;sectionView.hidden=true;detail.hidden=true;
    sections.innerHTML=order.map(s=>{
      const m=meta[s];
      return '<button type="button" class="rai-v17-section '+s+'" data-section="'+s+'">'+
        '<span class="ico">'+m.icon+'</span><span class="copy"><b>'+m.title+'</b><small>'+m.sub+'</small></span><em>'+countLabel(s)+'</em><i>›</i>'+
      '</button>';
    }).join('');
  }

  function renderTabs(section){
    const m=meta[section];
    if(m.yearless){tabs.style.display='none';tabs.innerHTML='';return}
    tabs.style.display='grid';
    tabs.innerHTML=years.map(y=>{
      const n=(banks[section]||[]).filter(l=>Number(l.year)===y).length;
      return '<button type="button" data-year="'+y+'" class="'+(Number(state.year)===y?'active':'')+'">'+y+'º <small>'+n+'</small></button>';
    }).join('');
  }

  function getSectionLessons(section){
    const arr=banks[section]||[];
    if(meta[section]&&meta[section].yearless)return arr;
    return arr.filter(l=>Number(l.year)===Number(state.year));
  }

  function renderSection(section){
    if(!meta[section])section='fund';
    state.section=section;save();
    home.hidden=true;detail.hidden=true;sectionView.hidden=false;
    const m=meta[section];
    sectionCrumb.textContent=m.title;
    sectionTitle.innerHTML='<b>'+m.icon+' '+m.title+'</b><small>'+m.sub+'</small>';
    renderTabs(section);
    const arr=getSectionLessons(section);
    list.innerHTML=arr.length?arr.map((l,i)=>
      '<button type="button" class="rai-lesson-item" data-id="'+l.id+'">'+
        '<span class="rai-lesson-item-icon">'+l.icon+'</span><span><b>'+(i+1)+'. '+l.topic+'</b><small>'+l.objective+'</small><u>'+l.axis+'</u></span><em>›</em>'+
      '</button>'
    ).join(''):'<div class="rai-lesson-loading">'+(ready?'Nenhuma aula nesta seleção.':'Carregando aulas...')+'</div>';
  }

  function findLesson(id){
    for(const s of order){
      const l=(banks[s]||[]).find(x=>x.id===id);
      if(l)return l;
    }
    return null;
  }

  function renderFixation(){
    fixSeen=new Set();
    fixDone.classList.remove('show');
    const items=Array.isArray(current&&current.fixation)?current.fixation:[];
    fixList.innerHTML=items.map((f,i)=>
      '<div class="rai-v17-fix-item" data-fix="'+i+'"><p><b>'+(i+1)+'.</b> '+f.q+'</p><button type="button">Revelar resposta</button><div>'+f.a+'</div></div>'
    ).join('');
  }

  function openLesson(id){
    current=findLesson(id);if(!current)return;
    if(current.section && current.section!==state.section)state.section=current.section;
    if(current.year)state.year=current.year;
    save();
    currentList=getSectionLessons(state.section);
    currentIndex=currentList.findIndex(l=>l.id===current.id);

    home.hidden=true;sectionView.hidden=true;detail.hidden=false;
    const m=meta[state.section];
    sectionFromDetail.textContent=m.title;
    lessonCrumb.textContent=(current.year?current.year+'º ano • ':'')+current.topic;
    els.topic.textContent=current.icon+' '+(current.year?current.year+'º ano • ':'')+current.topic;
    els.objectiveTop.textContent=current.objective||'';
    els.concept.textContent=current.concept||'';
    els.keyTerm.textContent=current.keyTerm||'Conceito';
    els.keyDefinition.textContent=current.keyDefinition||'';
    els.example.textContent=current.example||'';
    els.formula.textContent=current.formula||'';
    els.formula.style.display=current.formula?'block':'none';
    els.representation.textContent=current.representation||'';
    els.representation.style.display=current.representation?'block':'none';
    els.use.textContent=current.use||'';
    els.observe.textContent=current.observe||'';
    els.guided.textContent=current.guided||'';
    els.challenge.textContent=current.challenge||'';
    els.answer.textContent=current.answer||'';
    els.answer.classList.remove('show');
    els.answerBtn.textContent='Ver resposta comentada';
    els.teacherBox.classList.remove('show');
    els.teacherAxis.textContent='Eixo/área: '+(current.axis||m.title);
    els.teacherReference.textContent='Referência: '+(current.reference||'BNCC / Referencial Curricular do Paraná');
    els.teacherObjective.textContent='Objetivo: '+(current.objective||'');
    els.teacherTip.textContent='Sugestão metodológica: '+(current.teacherTip||'Use a aula como apoio opcional à atividade.');
    els.prev.disabled=currentIndex<=0;
    els.next.disabled=currentIndex<0||currentIndex>=currentList.length-1;
    renderFixation();
  }

  sections.addEventListener('click',e=>{
    const b=e.target.closest('[data-section]');if(!b)return;
    renderSection(b.dataset.section);
  });
  tabs.addEventListener('click',e=>{
    const b=e.target.closest('button[data-year]');if(!b)return;
    state.year=Number(b.dataset.year);save();renderSection(state.section);
  });
  list.addEventListener('click',e=>{
    const b=e.target.closest('.rai-lesson-item');if(!b)return;openLesson(b.dataset.id);
  });

  function goHome(){renderHome()}
  overlay.querySelector('#raiHomeFromSection').addEventListener('click',goHome);
  overlay.querySelector('#raiHomeFromDetail').addEventListener('click',goHome);
  sectionFromDetail.addEventListener('click',()=>renderSection(state.section));
  overlay.querySelector('#raiListLessons').addEventListener('click',()=>renderSection(state.section));
  overlay.querySelector('#raiSwitchSection').addEventListener('click',goHome);

  els.prev.addEventListener('click',()=>{if(currentIndex>0)openLesson(currentList[currentIndex-1].id)});
  els.next.addEventListener('click',()=>{if(currentIndex>=0&&currentIndex<currentList.length-1)openLesson(currentList[currentIndex+1].id)});

  fixList.addEventListener('click',e=>{
    const item=e.target.closest('.rai-v17-fix-item');if(!item)return;
    const b=e.target.closest('button');if(!b)return;
    const ans=item.querySelector('div');
    const show=!ans.classList.contains('show');
    ans.classList.toggle('show',show);
    b.textContent=show?'Ocultar resposta':'Revelar resposta';
    if(show)fixSeen.add(Number(item.dataset.fix));
    if(current&&Array.isArray(current.fixation)&&fixSeen.size===current.fixation.length)fixDone.classList.add('show');
  });

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
    els.answerBtn.textContent=show?'Ocultar resposta':'Ver resposta comentada';
  });
  overlay.querySelector('#raiTeacherToggle').addEventListener('click',()=>els.teacherBox.classList.toggle('show'));

  overlay.querySelector('#raiLessonSpeak').addEventListener('click',()=>{
    if(!current)return;
    const prefix=current.year?'Aula do '+current.year+'º ano. ':'Fundamento. ';
    const parts=[
      prefix+current.topic+'.',
      'Objetivo. '+current.objective,
      current.concept,
      'Conceito chave. '+current.keyTerm+'. '+current.keyDefinition,
      'Exemplo. '+current.example,
      current.formula?'Regra ou representação. '+current.formula:'',
      'Onde isso aparece. '+current.use,
      'Agora o desafio. '+current.challenge
    ].filter(Boolean);
    try{if(window.__raiSpeak)window.__raiSpeak(parts,{force:true,pause:380})}catch(e){}
  });

  overlay.querySelector('#raiLessonTry').addEventListener('click',()=>{
    if(!current)return;
    close();
    const bubble=document.querySelector('.rai-tutor-bubble');
    if(bubble){
      bubble.innerHTML='<b>🤖 R.A.I. • '+(current.year?current.year+'º ano':'Fundamentos')+'</b><br>'+current.challenge;
      bubble.classList.add('show');clearTimeout(bubble._t);
      bubble._t=setTimeout(()=>bubble.classList.remove('show'),8500);
    }
    const stage=root.querySelector('.tl-stage');
    if(stage){stage.classList.add('rai-lesson-stage-pulse');setTimeout(()=>stage.classList.remove('rai-lesson-stage-pulse'),1400)}
    try{if(window.__raiSpeak)window.__raiSpeak([current.challenge],{force:true,pause:300})}catch(e){}
  });

  renderHome();
})();
