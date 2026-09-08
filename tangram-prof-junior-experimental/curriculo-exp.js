
(async()=>{
 const root=document.getElementById('tangram-levels');
 if(!root)return;
 let data;
 try{const r=await fetch('curriculo-missoes.json?v=1',{cache:'no-store'});if(!r.ok)throw new Error('banco');data=await r.json()}catch(e){console.warn('R.A.I. Currículo indisponível',e);return}
 const missions=data.missions||[];
 const KEY='raiCurriculoExpV1';
 let state={xp:0,completed:{},wrongTotal:0,persistence:false,lastMission:null};
 try{state=Object.assign(state,JSON.parse(localStorage.getItem(KEY)||'{}'));state.completed=state.completed||{}}catch(e){}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}};
 const trackByYear={6:'Explorador',7:'Inventor',8:'Programador',9:'Maker'};
 const levelFor=xp=>xp>=1500?'Mestre R.A.I.':xp>=1000?'Maker':xp>=600?'Programador':xp>=250?'Inventor':'Explorador';
 const completedIds=()=>Object.keys(state.completed).filter(k=>state.completed[k]);
 const countTag=tag=>completedIds().filter(id=>(missions.find(m=>m.id===id)?.tags||[]).includes(tag)).length;
 const badges=()=>[
   {id:'first',icon:'🌟',name:'Primeiro Passo',desc:'Conclua sua primeira missão curricular.',ok:completedIds().length>=1},
   {id:'logic',icon:'🧠',name:'Mente Lógica',desc:'Conclua 5 missões de lógica.',ok:countTag('logica')>=5},
   {id:'geo',icon:'📐',name:'Olho Geométrico',desc:'Conclua 5 missões de geometria.',ok:countTag('geometria')>=5},
   {id:'bugs',icon:'🐞',name:'Caçador de Bugs',desc:'Conclua 3 missões relacionadas à depuração.',ok:countTag('debugging')>=3},
   {id:'loops',icon:'🔁',name:'Mestre dos Loops',desc:'Conclua 3 missões de repetição ou recursão.',ok:countTag('loop')+countTag('recursao')>=3},
   {id:'persist',icon:'💪',name:'Persistência',desc:'Acerte uma missão depois de pelo menos duas tentativas.',ok:!!state.persistence},
   {id:'tracks',icon:'🧭',name:'Quatro Trilhas',desc:'Conclua ao menos uma missão de cada ano.',ok:[6,7,8,9].every(y=>completedIds().some(id=>missions.find(m=>m.id===id)?.year===y))},
   {id:'master',icon:'🏆',name:'Mestre R.A.I.',desc:'Conclua todas as missões do protótipo.',ok:completedIds().length===missions.length&&missions.length>0}
 ];

 document.body.classList.add('rai-exp-curriculo');
 const sub=root.querySelector('.tl-sub');
 if(sub&&!sub.querySelector('.rai-exp-badge')){const b=document.createElement('span');b.className='rai-exp-badge';b.textContent='🧪 EXP Currículo';sub.appendChild(b)}

 const hub=document.createElement('section');hub.className='rai-curr-hub';
 hub.innerHTML='<div class="rai-curr-hub-top"><div class="rai-curr-title">🎓 Missões R.A.I. <small>BNCC • 6º ao 9º</small></div><div class="rai-curr-actions"><button class="rai-curr-btn primary" data-open="mission">Missão da Aula</button><button class="rai-curr-btn" data-open="tracks">🧭 Trilhas</button><button class="rai-curr-btn" data-open="passport">🏅 Passaporte</button></div><div class="rai-curr-xp" id="raiCurrXp">⭐ 0 XP</div></div>';
 const head=root.querySelector('.tl-head');if(head)head.insertAdjacentElement('afterend',hub);else root.prepend(hub);

 const overlay=document.createElement('div');overlay.className='rai-curr-overlay';
 overlay.innerHTML='<div class="rai-curr-card" role="dialog" aria-modal="true" aria-labelledby="raiCurrTitle"><div class="rai-curr-head"><img src="rai-icon.svg?v=rai3" alt="R.A.I."><div><h3 id="raiCurrTitle">🎓 Missões R.A.I.</h3><small>Laboratório curricular experimental</small></div><button class="rai-curr-close" aria-label="Fechar">×</button></div><div class="rai-curr-tabs"><button class="rai-curr-tab" data-tab="mission">🎯 Missão</button><button class="rai-curr-tab" data-tab="tracks">🧭 Trilhas</button><button class="rai-curr-tab" data-tab="passport">🏅 Passaporte</button><button class="rai-curr-tab" data-tab="teacher">👩‍🏫 Professor</button></div><div class="rai-curr-body" id="raiCurrBody"></div></div>';
 document.body.appendChild(overlay);
 const body=overlay.querySelector('#raiCurrBody');
 let activeTab='mission',selectedYear=6,current=null,attempts=0,locked=false;

 const xpRefresh=()=>{const x=document.getElementById('raiCurrXp');if(x)x.textContent='⭐ '+(state.xp||0)+' XP'};
 const pick=(year=selectedYear)=>{const pool=missions.filter(m=>m.year===Number(year));if(!pool.length)return null;const unfinished=pool.filter(m=>!state.completed[m.id]);const set=unfinished.length?unfinished:pool;return set[Math.floor(Math.random()*set.length)]};
 const speak=text=>{try{if(window.__raiSpeak)window.__raiSpeak([text],{force:true,pause:280});else if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';speechSynthesis.speak(u)}}catch(e){}};
 const pulseGame=challenge=>{overlay.classList.remove('show');const stage=root.querySelector('.tl-stage');if(stage){stage.classList.add('rai-curr-stage-pulse');setTimeout(()=>stage.classList.remove('rai-curr-stage-pulse'),1400)}const bubble=document.querySelector('.rai-tutor-bubble');if(bubble){bubble.innerHTML='<b>🤖 R.A.I. • Desafio da aula</b><br>'+challenge;bubble.classList.add('show');clearTimeout(bubble._t);bubble._t=setTimeout(()=>bubble.classList.remove('show'),8000)}speak(challenge)};

 function yearRow(){
   return '<div class="rai-curr-yearrow">'+[6,7,8,9].map(y=>'<button class="rai-year-chip '+(selectedYear===y?'active':'')+'" data-year="'+y+'">'+y+'º • '+trackByYear[y]+'</button>').join('')+'</div>'
 }
 function renderMission(newPick=false){
   if(newPick||!current||current.year!==selectedYear){current=pick(selectedYear);attempts=0;locked=false;if(current){state.lastMission=current.id;save()}}
   if(!current){body.innerHTML='<p>Nenhuma missão encontrada.</p>';return}
   body.innerHTML=yearRow()+
   '<div class="rai-mission-meta"><span class="rai-pill">'+current.track+'</span><span class="rai-pill">'+current.area+'</span><span class="rai-pill">'+current.topic+'</span><span class="rai-pill">+'+current.xp+' XP</span></div>'+
   '<div class="rai-mission-title">'+current.title+'</div><div class="rai-mission-prompt">'+current.prompt+'</div>'+
   '<div class="rai-options">'+current.options.map((o,i)=>'<button class="rai-option" data-answer="'+i+'">'+String.fromCharCode(65+i)+'. '+o+'</button>').join('')+'</div>'+
   '<div class="rai-feedback" id="raiCurrFeedback"></div>'+
   '<div class="rai-mission-tools"><button class="rai-curr-btn" id="raiSpeakMission">🔊 R.A.I. lê</button><button class="rai-curr-btn" id="raiAnother">↻ Outra missão</button><button class="rai-curr-btn primary" id="raiToGame">🧩 Levar ao Tangram</button></div>'+
   '<div class="rai-curr-note">Código da missão: <b>'+current.id+'</b> • O professor pode usar este código para indicar a mesma atividade à turma.</div>';
   body.querySelectorAll('[data-year]').forEach(b=>b.onclick=()=>{selectedYear=Number(b.dataset.year);renderMission(true)});
   body.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answerMission(Number(b.dataset.answer),b));
   body.querySelector('#raiSpeakMission').onclick=()=>speak(current.prompt);
   body.querySelector('#raiAnother').onclick=()=>renderMission(true);
   body.querySelector('#raiToGame').onclick=()=>pulseGame(current.prompt);
 }
 function answerMission(i,btn){
   if(locked)return;attempts++;
   const fb=body.querySelector('#raiCurrFeedback');const buttons=[...body.querySelectorAll('[data-answer]')];
   if(i===current.answer){
     locked=true;buttons[current.answer]?.classList.add('correct');
     let earned=0;
     if(!state.completed[current.id]){
       earned=current.xp+(attempts===1?10:0);state.completed[current.id]=true;state.xp=(state.xp||0)+earned;
       if(attempts>=3)state.persistence=true;save();xpRefresh();
     }
     fb.classList.add('show');fb.innerHTML='<strong>✅ Muito bem!</strong> '+current.explanation+(earned?'<br>⭐ +'+earned+' XP'+(attempts===1?' (bônus de primeira tentativa)':''):'<br>Missão já concluída — sem XP duplicado.');
     speak('Muito bem! '+current.explanation);
   }else{
     btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),700);state.wrongTotal=(state.wrongTotal||0)+1;save();
     fb.classList.add('show');fb.innerHTML='<strong>🤖 R.A.I.:</strong> Ainda não. Releia a situação e teste outra hipótese.';
   }
 }
 function renderTracks(){
   const cards=data.tracks.map(t=>{const total=missions.filter(m=>m.year===t.year).length,done=completedIds().filter(id=>missions.find(m=>m.id===id)?.year===t.year).length,pct=total?Math.round(done/total*100):0;return '<div class="rai-track"><h4>'+t.year+'º ano • '+t.name+'</h4><p>'+t.focus+'</p><p><b>'+done+'/'+total+' missões</b></p><div class="rai-progress"><span style="width:'+pct+'%"></span></div><button class="rai-curr-btn" data-startyear="'+t.year+'" style="margin-top:9px">Abrir trilha</button></div>'}).join('');
   body.innerHTML='<div class="rai-track-grid">'+cards+'</div><div class="rai-curr-note">As trilhas não substituem a aula: funcionam como aquecimento, desafio de aplicação ou fechamento.</div>';
   body.querySelectorAll('[data-startyear]').forEach(b=>b.onclick=()=>{selectedYear=Number(b.dataset.startyear);activeTab='mission';syncTabs();renderMission(true)});
 }
 function renderPassport(){
   const list=badges();body.innerHTML='<div class="rai-passport-hero"><div><div class="rai-passport-level">Nível atual: '+levelFor(state.xp||0)+'</div><div class="rai-curr-note">'+completedIds().length+' de '+missions.length+' missões concluídas</div></div><div class="rai-passport-xp">⭐ '+(state.xp||0)+'</div></div><div class="rai-badge-grid">'+list.map(b=>'<div class="rai-badge-card '+(b.ok?'':'locked')+'"><div class="rai-badge-icon">'+b.icon+'</div><h4>'+b.name+(b.ok?' ✓':' 🔒')+'</h4><p>'+b.desc+'</p></div>').join('')+'</div>';
 }
 function renderTeacher(){
   const m=current||missions.find(x=>x.id===state.lastMission)||pick(selectedYear);if(m)current=m;
   body.innerHTML=yearRow()+
   '<div class="rai-teacher-box"><b>Missão selecionada</b><p><strong>'+m.id+' — '+m.title+'</strong></p><p>'+m.objective+'</p></div>'+
   '<div class="rai-teacher-box"><b>Alinhamento curricular</b><div class="rai-bncc-list">'+m.bncc.map(x=>'<span class="rai-code">'+x+'</span>').join('')+'</div><p>Eixo/Unidade: '+m.eixo+' • Tema: '+m.topic+'</p></div>'+
   '<div class="rai-teacher-box"><b>Sugestão de uso (25–30 min)</b><p>1. Aquecimento com a pergunta da missão (3–5 min).<br>2. Discussão rápida da estratégia (5 min).<br>3. Aplicação no Tangram (12–15 min).<br>4. Fechamento: aluno explica o raciocínio (5 min).</p></div>'+
   '<div class="rai-teacher-box"><b>Avaliação formativa</b><p>Observe se o aluno identifica a estratégia, justifica a escolha e consegue transferi-la para a montagem. Velocidade não é o único critério.</p></div>'+
   '<div class="rai-curr-note">'+data.note+'</div>';
   body.querySelectorAll('[data-year]').forEach(b=>b.onclick=()=>{selectedYear=Number(b.dataset.year);current=pick(selectedYear);renderTeacher()});
 }
 function syncTabs(){overlay.querySelectorAll('.rai-curr-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===activeTab))}
 function render(){syncTabs();if(activeTab==='mission')renderMission(false);else if(activeTab==='tracks')renderTracks();else if(activeTab==='passport')renderPassport();else renderTeacher()}
 function open(tab){activeTab=tab||'mission';if(state.lastMission){const lm=missions.find(m=>m.id===state.lastMission);if(lm){current=lm;selectedYear=lm.year}}render();overlay.classList.add('show')}
 hub.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));
 overlay.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{activeTab=b.dataset.tab;render()});
 overlay.querySelector('.rai-curr-close').onclick=()=>overlay.classList.remove('show');
 overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('show')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')overlay.classList.remove('show')});
 xpRefresh();
 window.__raiCurriculoExp={open,state,data};
})();
