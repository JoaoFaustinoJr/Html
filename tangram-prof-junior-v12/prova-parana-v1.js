(()=>{
  if(window.__raiProvaParanaV1)return;
  window.__raiProvaParanaV1=true;
  const root=document.getElementById('tangram-levels');
  const lessonsOverlay=document.querySelector('.rai-lesson-overlay');
  const lessonHome=document.getElementById('raiLessonHome');
  const dock=document.getElementById('raiLessonDock');
  if(!root||!lessonsOverlay||!lessonHome||!dock)return;

  const DATA_FILES=['prova-parana-6-v1.json?v=1','prova-parana-7-v1.json?v=1','prova-parana-8a-v1.json?v=1','prova-parana-8b-v1.json?v=1','prova-parana-8c-v1.json?v=1','prova-parana-8d-v1.json?v=1','prova-parana-9-v1.json?v=1'];
  const TEACHER_FILE='prova-parana-professor-v1.json?v=1';
  const STORE='raiProvaParana2026V1';
  let lessons=[],teacher=null,year=6,current=null,answered={};
  let saved={done:[]};
  try{saved={...saved,...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch(e){}
  if(!Array.isArray(saved.done))saved.done=[];
  const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(saved))}catch(e){}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  dock.classList.add('rai-pp-dock');
  if(!dock.querySelector('.rai-pp-dock-badge')){
    const badge=document.createElement('span');badge.className='rai-pp-dock-badge';badge.textContent='🎯 Paraná';dock.appendChild(badge);
  }

  const hero=document.createElement('button');
  hero.type='button';hero.className='rai-pp-hero';
  hero.innerHTML='<span class="rai-pp-hero-ico">🎯</span><span><b>Especial Prova Paraná 2026</b><small>Revisão de Matemática • habilidades recorrentes • 6º ao 9º ano</small></span><em>ABRIR</em>';
  lessonHome.insertBefore(hero,lessonHome.firstChild);

  const overlay=document.createElement('div');
  overlay.className='rai-pp-overlay';
  overlay.innerHTML=`<div class="rai-pp-card" role="dialog" aria-modal="true" aria-labelledby="raiPPTitle">
    <header class="rai-pp-head"><div class="rai-pp-mark">🎯</div><div><h3 id="raiPPTitle">Especial Prova Paraná 2026</h3><small>Matemática • revisão objetiva da Raí</small></div><button type="button" class="rai-pp-close" aria-label="Fechar">×</button></header>
    <div class="rai-pp-body">
      <section id="raiPPHome">
        <div class="rai-pp-intro"><b>Direto ao ponto.</b><span>Conteúdo curto, exemplo resolvido, atenção aos erros comuns e teste rápido. Priorização baseada em matrizes oficiais recentes.</span></div>
        <div class="rai-pp-years" id="raiPPYears"></div>
        <div class="rai-pp-list" id="raiPPList"><div class="rai-pp-loading">Carregando especial...</div></div>
        <div class="rai-pp-note">Conteúdo autoral do Tangram Educativo. Não é material oficial da Seed-PR e não pretende antecipar questões da prova.</div>
        <button type="button" class="rai-pp-teacher" id="raiPPTeacher">ⓘ Professor — diretrizes e recorrências</button>
      </section>
      <section id="raiPPDetail" hidden></section>
      <section id="raiPPTeacherView" hidden></section>
    </div>
  </div>`;
  document.body.appendChild(overlay);

  const home=overlay.querySelector('#raiPPHome'),detail=overlay.querySelector('#raiPPDetail'),teacherView=overlay.querySelector('#raiPPTeacherView');
  const years=overlay.querySelector('#raiPPYears'),list=overlay.querySelector('#raiPPList');
  const open=()=>{lessonsOverlay.classList.remove('show');overlay.classList.add('show');renderHome()};
  const close=()=>{overlay.classList.remove('show');try{window.__raiStopSpeak?.()}catch(e){}};
  hero.addEventListener('click',open);
  overlay.querySelector('.rai-pp-close').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show'))close()});

  function recurrenceClass(v){return /muito/i.test(v||'')?'very':'high'}
  function renderYears(){years.innerHTML=[6,7,8,9].map(y=>`<button type="button" data-year="${y}" class="${y===year?'active':''}">${y}º ano</button>`).join('')}
  function renderHome(){
    current=null;answered={};home.hidden=false;detail.hidden=true;teacherView.hidden=true;renderYears();
    const arr=lessons.filter(l=>Number(l.year)===year);
    list.innerHTML=arr.length?arr.map((l,i)=>`<button type="button" class="rai-pp-item" data-id="${esc(l.id)}"><span class="n">${i+1}</span><span class="copy"><b>${esc(l.title)}</b><small>${esc(l.summary)}</small><u class="${recurrenceClass(l.recurrence)}">Recorrência ${esc(l.recurrence)}</u></span><em>${saved.done.includes(l.id)?'✓':'›'}</em></button>`).join(''):'<div class="rai-pp-loading">Conteúdo indisponível para este ano.</div>';
  }
  years.addEventListener('click',e=>{const b=e.target.closest('button[data-year]');if(!b)return;year=Number(b.dataset.year);renderHome()});
  list.addEventListener('click',e=>{const b=e.target.closest('.rai-pp-item');if(!b)return;openLesson(b.dataset.id)});

  function openLesson(id){
    current=lessons.find(l=>l.id===id);if(!current)return;answered={};
    home.hidden=true;teacherView.hidden=true;detail.hidden=false;
    const rules=(current.rules||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const desc=(current.descriptors||[]).map(x=>`<span>${esc(x)}</span>`).join('');
    const quiz=(current.quiz||[]).map((q,i)=>`<div class="rai-pp-q" data-q="${i}"><p><b>${i+1}.</b> ${esc(q.q)}</p><div class="rai-pp-options">${q.options.map((o,j)=>`<button type="button" data-opt="${j}">${String.fromCharCode(65+j)}) ${esc(o)}</button>`).join('')}</div><div class="rai-pp-feedback"></div></div>`).join('');
    detail.innerHTML=`<div class="rai-pp-crumb"><button type="button" data-back>← ${current.year}º ano</button><span>Especial Prova Paraná</span></div>
      <div class="rai-pp-title-row"><div><small>${current.year}º ANO</small><h4>${esc(current.title)}</h4></div><u class="${recurrenceClass(current.recurrence)}">Recorrência ${esc(current.recurrence)}</u></div>
      ${desc?`<div class="rai-pp-desc">${desc}</div>`:''}
      <div class="rai-pp-summary">${esc(current.summary)}</div>
      <div class="rai-pp-block"><b>⚡ Lembre disto</b><ul>${rules}</ul></div>
      <div class="rai-pp-example"><b>🧩 Exemplo</b><p>${esc(current.example?.problem||'')}</p><strong>${esc(current.example?.solution||'')}</strong></div>
      <div class="rai-pp-alert"><b>⚠️ Atenção</b><p>${esc(current.pitfall||'')}</p></div>
      <div class="rai-pp-quiz"><div class="rai-pp-quiz-head"><b>✅ Teste rápido</b><small>Responda antes de revelar a explicação.</small></div>${quiz}</div>
      <div class="rai-pp-actions"><button type="button" class="primary" data-speak>🔊 Ouvir com a Raí</button><button type="button" data-teacher>ⓘ Professor</button><button type="button" data-back>← Voltar às aulas</button></div>`;
    detail.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',renderHome));
    detail.querySelector('[data-teacher]')?.addEventListener('click',renderTeacher);
    detail.querySelector('[data-speak]')?.addEventListener('click',speakCurrent);
    detail.querySelectorAll('.rai-pp-q').forEach(qel=>qel.addEventListener('click',handleAnswer));
    detail.scrollTop=0;
  }

  function handleAnswer(e){
    const b=e.target.closest('button[data-opt]');if(!b)return;
    const qel=e.currentTarget,i=Number(qel.dataset.q);if(answered[i])return;
    const q=current?.quiz?.[i];if(!q)return;answered[i]=true;
    const chosen=Number(b.dataset.opt),ok=chosen===Number(q.correct);
    qel.querySelectorAll('button[data-opt]').forEach((x,j)=>{x.disabled=true;if(j===Number(q.correct))x.classList.add('correct');else if(j===chosen)x.classList.add('wrong')});
    const fb=qel.querySelector('.rai-pp-feedback');fb.classList.add('show',ok?'ok':'review');fb.innerHTML=(ok?'<b>✓ Correto.</b> ':'<b>Revise.</b> ')+esc(q.explain||'');
    if(Object.keys(answered).length>=(current.quiz||[]).length&&!saved.done.includes(current.id)){saved.done.push(current.id);save()}
  }

  function speakCurrent(){
    if(!current)return;
    const parts=[`${current.year}º ano. ${current.title}.`,current.summary,'Lembre disto.',...(current.rules||[]),`Exemplo. ${current.example?.problem||''} ${current.example?.solution||''}`,`Atenção. ${current.pitfall||''}`];
    try{window.__raiSpeak?.(parts,{force:true,pause:330})}catch(e){}
  }

  overlay.querySelector('#raiPPTeacher').addEventListener('click',renderTeacher);
  function renderTeacher(){
    home.hidden=true;detail.hidden=true;teacherView.hidden=false;
    if(!teacher){teacherView.innerHTML='<div class="rai-pp-loading">Carregando orientações...</div>';return}
    const dirs=(teacher.directives||[]).map(x=>`<li>${esc(x)}</li>`).join('');
    const rec=(teacher.recurrences||[]).map(r=>`<div class="rai-pp-rec"><b>${esc(r.year)}</b><ul>${(r.items||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');
    const sources=(teacher.sources||[]).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">↗ ${esc(s.label)}</a>`).join('');
    teacherView.innerHTML=`<div class="rai-pp-crumb"><button type="button" data-back>← Especial</button><span>Professor</span></div><h4>ⓘ ${esc(teacher.title)}</h4>
      <div class="rai-pp-teacher-block"><b>1. Diretrizes oficiais</b><ul>${dirs}</ul></div>
      <div class="rai-pp-teacher-block"><b>2. Recorrências priorizadas</b><p>Começamos por elas porque são as habilidades que mais justificam uma revisão concentrada.</p>${rec}</div>
      <div class="rai-pp-teacher-block"><b>3. Como a seleção foi feita</b><p>${esc(teacher.method)}</p></div>
      <div class="rai-pp-teacher-block"><b>4. Fontes oficiais consultadas</b><div class="rai-pp-sources">${sources}</div></div>
      <div class="rai-pp-disclaimer">${esc(teacher.disclaimer)}</div>
      <button type="button" class="rai-pp-back-wide" data-back>← Voltar ao especial</button>`;
    teacherView.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',renderHome));
    teacherView.scrollTop=0;
  }

  Promise.all([
    Promise.all(DATA_FILES.map(f=>fetch(f,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(f);return r.json()}))),
    fetch(TEACHER_FILE,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(TEACHER_FILE);return r.json()})
  ]).then(([sets,t])=>{
    lessons=sets.flatMap(x=>Array.isArray(x.lessons)?x.lessons:[]);
    teacher=t;
    if(overlay.classList.contains('show'))renderHome();
  }).catch(err=>{console.warn('Especial Prova Paraná',err);list.innerHTML='<div class="rai-pp-loading">Não foi possível carregar o especial. Atualize o aplicativo e tente novamente.</div>'});
})();