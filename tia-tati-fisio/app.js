(()=>{
'use strict';
const app=document.getElementById('app'); if(!app||app.dataset.booted)return; app.dataset.booted='1';
const $=(s,r=app)=>r.querySelector(s), $$=(s,r=app)=>[...r.querySelectorAll(s)];

const CARDS={
 welcome:{label:'Boas-vindas',img:'assets/welcome.webp',text:'Olá! Eu sou a Tia Tati. Vamos juntos?'},
 guide:{label:'Orientação',img:'assets/guide.webp',text:'Olhe aqui… agora é a sua vez!'},
 success:{label:'Incentivo',img:'assets/success.webp',text:'Muito bem! Você conseguiu!'},
 retry:{label:'Motivação',img:'assets/retry.webp',text:'Mais uma vez? Você consegue!'},
 relax:{label:'Relaxamento',img:'assets/relax.webp',text:'Respira comigo… isso, muito bem!'},
 celebrate:{label:'Comemoração',img:'assets/celebrate.webp',text:'Que esforço lindo! Parabéns!'}
};

const MISSIONS={
 road:{name:'Caminho Seguro',icon:'🚗',therapy:'Coordenação olho-mão • controle de trajetória • planejamento motor',intro:'Vamos levar o carro até a escola. Fique na estrada e vá com calma.',hint:'Olhe com calma para a estrada. Siga o caminho até a escola.'},
 bee:{name:'Abelhinha e a Flor',icon:'🐝',therapy:'Rastreamento visual • precisão • direção e sentido',intro:'Ajude a abelhinha a chegar até a flor. Siga o caminho com calma.',hint:'Acompanhe a trilha com os olhos e leve a abelhinha até a flor.'},
 target:{name:'Alcance ao Alvo',icon:'🎯',therapy:'Alcance funcional • lateralidade • coordenação',intro:'Agora vamos alcançar os alvos. Toque em cada círculo que aparecer.',hint:'Olhe para o alvo colorido e alcance com calma.'},
 hands:{name:'Duas Mãos',icon:'🤲',therapy:'Coordenação bilateral • simultaneidade • integração motora',intro:'Vamos usar as duas mãos. Toque nos dois lados quase ao mesmo tempo.',hint:'Uma mão de cada lado. Eu espero você.'},
 light:{name:'Siga a Luz',icon:'⭐',therapy:'Rastreamento visual • atenção sustentada • resposta motora',intro:'Siga a luz com os olhos e toque nela quando conseguir.',hint:'Primeiro acompanhe com os olhos. Depois toque na estrela.'},
 sensory:{name:'Descobertas',icon:'🫧',therapy:'Causa e efeito • exploração sensorial • iniciativa',intro:'Toque na tela e descubra o que acontece.',hint:'Experimente tocar em lugares diferentes da tela.'},
 breathe:{name:'Respira Comigo',icon:'🌿',therapy:'Autorregulação • pausa • consciência respiratória',intro:'Agora vamos fazer uma pausa. Respira comigo, devagar.',hint:'Inspire quando o círculo crescer e solte o ar quando ele diminuir.'},
 physical:{name:'Missão no Mundo Real',icon:'👣',therapy:'Transferência para tarefa funcional • movimento corporal guiado',intro:'Agora é hora de sair da tela e fazer a missão preparada pela fisioterapeuta.',hint:'Siga a orientação da Dra. Tatiana e depois toque em Concluído.'}
};

const ROAD_DESTINATIONS={
 school:{label:'Escola',icon:'🏫',intro:'Vamos levar o carro até a escola. Fique na estrada e vá com calma.',finish:'Chegamos à escola! Muito bem!'},
 home:{label:'Casa',icon:'🏠',intro:'Vamos levar o carro até em casa. Observe a estrada e dirija com calma.',finish:'Chegamos em casa! Muito bem!'},
 park:{label:'Parque',icon:'🌳',intro:'Vamos levar o carro até o parque. Siga a estrada com atenção.',finish:'Chegamos ao parque! Parabéns!'}
};

const PHRASES=[
 ['welcome','Boas-vindas',CARDS.welcome.text],['guide','Orientação',CARDS.guide.text],['success','Incentivo',CARDS.success.text],
 ['retry','Motivação',CARDS.retry.text],['relax','Relaxamento',CARDS.relax.text],['celebrate','Comemoração',CARDS.celebrate.text],
 ...Object.entries(MISSIONS).flatMap(([id,m])=>[[id+'_intro',m.name+' — início',m.intro],[id+'_hint',m.name+' — dica',m.hint]]),
 ['breathe_in','Respiração — inspire','Puxe o ar pelo nariz, devagar.'],['breathe_out','Respiração — solte','Agora solte o ar devagar pela boca.'],
 ['posture','Postura','Vamos alinhar a postura. Ombros relaxados e olhar para frente.'],
 ['attention','Atenção','Olhe com calma. Veja por onde vamos passar.'],
 ['choice','Escolha','Qual você quer fazer agora?'],
 ['road_school_intro','Caminho Seguro — Escola',ROAD_DESTINATIONS.school.intro],
 ['road_home_intro','Caminho Seguro — Casa',ROAD_DESTINATIONS.home.intro],
 ['road_park_intro','Caminho Seguro — Parque',ROAD_DESTINATIONS.park.intro],
 ['road_checkpoint','Caminho Seguro — ponto seguro','Muito bem! Você chegou a um ponto seguro. Continue pelo caminho.'],
 ['road_recover','Caminho Seguro — retomada','Ops! Vamos olhar a estrada outra vez. Eu te ajudo a voltar ao último ponto seguro.'],
 ['road_finish','Caminho Seguro — chegada','Chegamos ao destino! Parabéns pelo cuidado no caminho.'],
 ['road_crash','Caminho Seguro — saída da pista','Crash! Ops! Vamos voltar para a pista com calma.'],
 ['traffic_curve','Trânsito — curva','Cuidado com a curva. Reduza a velocidade e mantenha a atenção.'],
 ['traffic_crosswalk','Trânsito — faixa de pedestres','Atenção à faixa de pedestres. No trânsito, cuidamos de quem está atravessando.'],
 ['traffic_slow','Trânsito — devagar','Devagar também é dirigir bem. Observe a sinalização e siga com cuidado.'],
 ['traffic_school','Trânsito — zona escolar','Estamos perto da escola. Atenção redobrada e velocidade reduzida.']
];

const INTERVENTIONS=[
 {emoji:'⭐',title:'Incentivo',items:['Muito bem!','Você conseguiu!','Excelente esforço!','Continue assim!']},
 {emoji:'👍',title:'Motivação',items:['Vamos tentar mais uma vez?','Com calma, você consegue.','Eu te ajudo.','Estamos quase lá.']},
 {emoji:'🌿',title:'Respiração e relaxamento',items:['Puxe o ar pelo nariz.','Solte devagar pela boca.','Relaxe os ombros.','Respira comigo.']},
 {emoji:'🧍',title:'Postura e alinhamento',items:['Vamos alinhar a postura.','Olhar para frente.','Ombros relaxados.','Fique firme e confortável.']},
 {emoji:'🎯',title:'Alcance e coordenação',items:['Alcance o alvo.','Agora mais alto.','Agora do outro lado.','Siga o caminho.']},
 {emoji:'🤲',title:'Bilateralidade',items:['Use as duas mãos.','Uma mão de cada lado.','Agora juntas.','Muito bem, mantenha o controle.']},
 {emoji:'👀',title:'Atenção e psicopedagogia',items:['Olhe com calma.','Uma coisa de cada vez.','Primeiro observe, depois faça.','Quer uma dica?']},
 {emoji:'🧩',title:'Autonomia e escolha',items:['Qual você quer fazer?','Quer tentar sozinho ou com ajuda?','Você escolhe o próximo desafio.','Vamos no seu tempo.']}
];

const prefsKey='tiaTatiV12Prefs', reportsKey='tiaTatiV12Reports';
const state={
 screen:'home', circuit:['road'], lastCircuit:['road'], step:0, interactions:0, assists:0, collisions:0, started:0, checkpoints:0, roadDestination:'school', roadControl:'drag', roadRoute:2, beeRoute:2, beeFlower:'pink', beeControl:'drag', targetReach:'all', targetCount:5, targetTheme:'rings',
 size:92,speed:2,amplitude:3,stimuli:2,reach:'all',context:'APAE',easy:true,guide:true,projection:false,reduced:false,therapeutic:true,
 paused:false,currentPhrase:null,currentText:'',cleanup:null,idleTimers:[],lastObservation:''
};
try{Object.assign(state,JSON.parse(localStorage.getItem(prefsKey)||'{}'));}catch(e){}
function savePrefs(){try{localStorage.setItem(prefsKey,JSON.stringify({size:state.size,speed:state.speed,amplitude:state.amplitude,stimuli:state.stimuli,reach:state.reach,context:state.context,easy:state.easy,guide:state.guide,projection:state.projection,reduced:state.reduced,therapeutic:state.therapeutic,beeRoute:state.beeRoute,beeFlower:state.beeFlower,beeControl:state.beeControl,targetReach:state.targetReach,targetCount:state.targetCount,targetTheme:state.targetTheme}));}catch(e){}}

function show(name){
 if(state.cleanup){state.cleanup();state.cleanup=null;}
 clearIdle(); state.paused=false;
 $$('.screen').forEach(s=>s.classList.remove('active'));
 $('#screen-'+name)?.classList.add('active'); state.screen=name;
 $$('#bottomNav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
 app.classList.toggle('projection',state.projection); app.classList.toggle('road-setup-mode',name==='roadsetup'); app.classList.toggle('bee-setup-mode',name==='beesetup'); app.classList.toggle('target-setup-mode',name==='targetsetup');
 window.scrollTo({top:0,behavior:'smooth'});
 if(name==='reports')renderReports();
 if(name==='voice')renderVoice();
 if(name==='roadsetup')syncRoadSetup();
 if(name==='beesetup')syncBeeSetup();
 if(name==='targetsetup')syncTargetSetup();
}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2300);}
function buzz(p=20){if(navigator.vibrate)navigator.vibrate(p);}
function clearIdle(){state.idleTimers.forEach(clearTimeout);state.idleTimers=[];$$('.pulse').forEach(x=>x.classList.remove('pulse'));}
function resetIdle(){
 clearIdle(); if(!state.guide||state.paused||state.screen!=='game')return;
 state.idleTimers.push(setTimeout(()=>{const o=$('.game-object,.target-dot,.hand-pad,.breath-circle');o?.classList.add('pulse');$('#feedback').textContent='Olhe com calma. Há uma pista visual para você.';},6000));
 state.idleTimers.push(setTimeout(()=>{state.assists++;const id=state.circuit[state.step],m=MISSIONS[id];setTutor('guide',m.name,m.hint,id+'_hint',false);playVoice(id+'_hint',false);},10500));
}
function setTutor(mode,title,text,phraseId,auto=false){
 const c=CARDS[mode]||CARDS.guide; $('#tutorImage').src=c.img;$('#tutorState').textContent=c.label.toUpperCase();$('#activityTitle').textContent=title;$('#speechBubble').textContent=text;
 state.currentPhrase=phraseId||mode;state.currentText=text;if(auto)playVoice(state.currentPhrase,false);
}
function targetSize(){return Math.max(64,Math.min(136,state.size+(state.easy?10:0)+(state.projection?14:0)));}
function syncRoadSummary(){
 const dest=ROAD_DESTINATIONS[state.roadDestination]||ROAD_DESTINATIONS.school;
 const control=state.roadControl==='tap'?'Tocar':'Arrastar';
 const el=$('#roadActionSummary');if(el)el.textContent=dest.label+' • Rota '+(Number(state.roadRoute)||2)+' • '+control;
}
function syncRoadSetup(){
 $$('[data-destination]').forEach(x=>x.classList.toggle('active',x.dataset.destination===state.roadDestination));
 $$('[data-road-route]').forEach(x=>x.classList.toggle('active',Number(x.dataset.roadRoute)===(Number(state.roadRoute)||2)));
 $$('[data-road-control]').forEach(x=>x.classList.toggle('active',x.dataset.roadControl===state.roadControl));
 syncRoadSummary();
}
function syncBeeSummary(){
 const flower={pink:'Flor rosa',sun:'Girassol',white:'Margarida'}[state.beeFlower]||'Flor rosa';
 const control=state.beeControl==='tap'?'Tocar':'Arrastar';
 const el=$('#beeActionSummary');if(el)el.textContent='Caminho '+(Number(state.beeRoute)||2)+' • '+flower+' • '+control;
}
function syncBeeSetup(){
 $$('[data-bee-route]').forEach(x=>x.classList.toggle('active',Number(x.dataset.beeRoute)===(Number(state.beeRoute)||2)));
 $$('[data-bee-flower]').forEach(x=>x.classList.toggle('active',x.dataset.beeFlower===state.beeFlower));
 $$('[data-bee-control]').forEach(x=>x.classList.toggle('active',x.dataset.beeControl===state.beeControl));
 syncBeeSummary();
}
function syncTargetSummary(){
 const reach={all:'Tela inteira',left:'Lado esquerdo',right:'Lado direito',cross:'Cruzado'}[state.targetReach]||'Tela inteira';
 const theme={rings:'Alvo clássico',stars:'Estrelas',flowers:'Flores'}[state.targetTheme]||'Alvo clássico';
 const el=$('#targetActionSummary');if(el)el.textContent=reach+' • '+(Number(state.targetCount)||5)+' alvos • '+theme;
}
function syncTargetSetup(){
 $$('[data-target-reach]').forEach(x=>x.classList.toggle('active',x.dataset.targetReach===state.targetReach));
 $$('[data-target-count]').forEach(x=>x.classList.toggle('active',Number(x.dataset.targetCount)===(Number(state.targetCount)||5)));
 $$('[data-target-theme]').forEach(x=>x.classList.toggle('active',x.dataset.targetTheme===state.targetTheme));
 syncTargetSummary();
}
function feedback(msg){$('#feedback').textContent=msg;resetIdle();}

const VoiceDB={
 db:null,
 open(){if(this.db)return Promise.resolve(this.db);return new Promise((ok,no)=>{if(!window.indexedDB)return no(new Error('IndexedDB indisponível'));const r=indexedDB.open('TiaTatiVoiceV12',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('clips'))r.result.createObjectStore('clips',{keyPath:'id'});};r.onsuccess=()=>{this.db=r.result;ok(this.db);};r.onerror=()=>no(r.error);});},
 async get(id){const d=await this.open();return new Promise((ok,no)=>{const r=d.transaction('clips').objectStore('clips').get(id);r.onsuccess=()=>ok(r.result||null);r.onerror=()=>no(r.error);});},
 async put(id,blob){const d=await this.open();return new Promise((ok,no)=>{const tx=d.transaction('clips','readwrite');tx.objectStore('clips').put({id,blob,at:Date.now()});tx.oncomplete=()=>ok();tx.onerror=()=>no(tx.error);});},
 async del(id){const d=await this.open();return new Promise((ok,no)=>{const tx=d.transaction('clips','readwrite');tx.objectStore('clips').delete(id);tx.oncomplete=()=>ok();tx.onerror=()=>no(tx.error);});}
};
let activeAudio=null;
function stopAudio(){if(activeAudio){try{activeAudio.pause();URL.revokeObjectURL(activeAudio.src);}catch(e){}activeAudio=null;}}
async function playVoice(id,notify=true){
 stopAudio();
 try{
  const rec=await VoiceDB.get(id);
  if(!rec?.blob){if(notify)toast('Esta fala da Tatiana ainda não foi gravada.');return false;}
  const url=URL.createObjectURL(rec.blob),a=new Audio(url);activeAudio=a;
  a.onended=a.onerror=()=>{URL.revokeObjectURL(url);if(activeAudio===a)activeAudio=null;};await a.play();return true;
 }catch(e){if(notify)toast('Não consegui reproduzir a gravação neste aparelho.');return false;}
}

function syncSettings(){
 $('#targetSize').value=state.size;$('#speed').value=state.speed;$('#amplitude').value=state.amplitude;$('#stimuli').value=state.stimuli;$('#reachRegion').value=state.reach;$('#contextUse').value=state.context;
 $('#easyTouch').checked=state.easy;$('#guideAssist').checked=state.guide;$('#projectionMode').checked=state.projection;$('#reducedMotion').checked=state.reduced;$('#therapeuticMode').checked=state.therapeutic;
 $('#targetSizeValue').textContent=state.size+' px';$('#speedValue').textContent=state.speed+'/5';$('#amplitudeValue').textContent=state.amplitude+'/5';$('#stimuliValue').textContent=state.stimuli+'/5';
}
function buildCircuitPicker(){
 const root=$('#circuitPicker');root.innerHTML='';
 Object.entries(MISSIONS).forEach(([id,m])=>{const l=document.createElement('label');l.className='circuit-item';l.innerHTML='<input type="checkbox" value="'+id+'"><span>'+m.icon+'</span><span><strong>'+m.name+'</strong><small>'+m.therapy+'</small></span>';root.appendChild(l);});
}
function buildInterventions(){
 const root=$('#interventionGrid');root.innerHTML='';
 INTERVENTIONS.forEach(c=>{const d=document.createElement('article');d.className='intervention-card';d.innerHTML='<span class="emoji">'+c.emoji+'</span><strong>'+c.title+'</strong><ul>'+c.items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';root.appendChild(d);});
}
async function renderVoice(){
 const root=$('#phraseList');root.innerHTML='';let count=0;
 for(const [id,label,text] of PHRASES){
  let has=false;try{has=!!(await VoiceDB.get(id));if(has)count++;}catch(e){}
  const row=document.createElement('div');row.className='phrase-row';row.innerHTML='<div><strong>'+label+'</strong><small>'+text+'</small></div><div class="phrase-actions"><button class="listen" type="button">'+(has?'▶️ Ouvir':'🔇 Vazio')+'</button><button class="record" type="button">🎙️ '+(has?'Regravar':'Gravar')+'</button>'+(has?'<button class="delete" type="button">🗑️</button>':'')+'</div>';
  row.querySelector('.listen').onclick=()=>playVoice(id,true);row.querySelector('.record').onclick=()=>recordPhrase(id,row);
  row.querySelector('.delete')?.addEventListener('click',async()=>{await VoiceDB.del(id);renderVoice();toast('Gravação removida.');});root.appendChild(row);
 }
 $('#voiceCount').textContent=count+' de '+PHRASES.length+' falas gravadas';
}
async function recordPhrase(id,row){
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('A gravação não está disponível neste navegador. Use Chrome/Edge via HTTPS.');return;}
 let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true});}catch(e){toast('Permissão do microfone não concedida.');return;}
 const chunks=[],rec=new MediaRecorder(stream),btn=row.querySelector('.record');row.classList.add('recording');btn.textContent='⏹️ Parar';
 rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 rec.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());row.classList.remove('recording');if(chunks.length){await VoiceDB.put(id,new Blob(chunks,{type:rec.mimeType||'audio/webm'}));toast('Gravação salva neste aparelho.');}renderVoice();};
 btn.onclick=()=>{if(rec.state==='recording')rec.stop();};rec.start();
}

function startCircuit(ids){
 if(!ids?.length)return;state.circuit=ids.slice();state.lastCircuit=ids.slice();state.step=0;state.interactions=0;state.assists=0;state.collisions=0;state.checkpoints=0;state.started=Date.now();show('game');renderMission();
}
function gameProgress(){const total=state.circuit.length,idx=Math.min(state.step+1,total);$('#gameProgressText').textContent=idx+'/'+total;$('#gameProgressFill').style.width=(state.step/total*100)+'%';}
function clearActivity(){clearIdle();$('#activityArea').innerHTML='';$('#feedback').textContent='';stopAudio();}
function renderMission(){
 clearActivity();gameProgress();const id=state.circuit[state.step],m=MISSIONS[id];$('#therapyNote').textContent='Foco terapêutico: '+m.therapy;
 const intro=(id==='road'?(ROAD_DESTINATIONS[state.roadDestination]||ROAD_DESTINATIONS.school).intro:m.intro);
 const title=(id==='road'?m.name+' • '+(ROAD_DESTINATIONS[state.roadDestination]||ROAD_DESTINATIONS.school).label:m.name);
 const phrase=(id==='road'?'road_'+state.roadDestination+'_intro':id+'_intro');
 setTutor(id==='breathe'?'relax':'guide',title,intro,phrase,true);
 ({road,bee,target:targetMission,hands,light,sensory,breathe,physical}[id]||(()=>finishStep()))();resetIdle();
}
function finishStep(){
 clearIdle();buzz([20,35,20]);const m=MISSIONS[state.circuit[state.step]];setTutor('success',m.name,CARDS.success.text,'success',true);feedback('Missão concluída!');setTimeout(()=>{state.step++;if(state.step>=state.circuit.length)finishSession();else renderMission();},720);
}
function softError(msg){
 state.collisions++;setTutor('retry',MISSIONS[state.circuit[state.step]].name,msg,'retry',true);feedback(msg);buzz(35);
}
function dragObject(el,field,onMove,onEnd){
 let active=false,pointerId=null;
 el.style.touchAction='none';el.style.userSelect='none';el.style.webkitUserDrag='none';
 el.querySelectorAll?.('*').forEach(n=>{n.style.pointerEvents='none';n.style.userSelect='none';});
 const point=e=>{
  if(e.touches?.length)return e.touches[0];
  if(e.changedTouches?.length)return e.changedTouches[0];
  return e;
 };
 const move=e=>{
  if(!active||state.paused)return;
  if(e.cancelable)e.preventDefault();
  const p=point(e),r=field.getBoundingClientRect();
  const x=Math.max(0,Math.min(r.width,p.clientX-r.left)),y=Math.max(0,Math.min(r.height,p.clientY-r.top));
  el.style.left=(x-el.offsetWidth/2)+'px';el.style.top=(y-el.offsetHeight/2)+'px';
  onMove?.(x,y,r);resetIdle();
 };
 const removeGlobal=()=>{
  window.removeEventListener('pointermove',move);
  window.removeEventListener('pointerup',end);
  window.removeEventListener('pointercancel',end);
  window.removeEventListener('touchmove',move);
  window.removeEventListener('touchend',end);
  window.removeEventListener('touchcancel',end);
  window.removeEventListener('mousemove',move);
  window.removeEventListener('mouseup',end);
 };
 const end=e=>{
  if(!active)return;active=false;el.classList.remove('dragging');removeGlobal();onEnd?.(e);
 };
 const start=e=>{
  if(state.paused)return;
  if(e.cancelable)e.preventDefault();
  active=true;pointerId=e.pointerId??null;el.classList.add('dragging');
  try{if(pointerId!=null)el.setPointerCapture(pointerId);}catch(_){}
  if(window.PointerEvent){
   window.addEventListener('pointermove',move,{passive:false});
   window.addEventListener('pointerup',end,{passive:false});
   window.addEventListener('pointercancel',end,{passive:false});
  }else if(e.type.startsWith('touch')){
   window.addEventListener('touchmove',move,{passive:false});
   window.addEventListener('touchend',end,{passive:false});
   window.addEventListener('touchcancel',end,{passive:false});
  }else{
   window.addEventListener('mousemove',move,{passive:false});
   window.addEventListener('mouseup',end,{passive:false});
  }
  move(e);
 };
 if(window.PointerEvent)el.addEventListener('pointerdown',start,{passive:false});
 else{el.addEventListener('touchstart',start,{passive:false});el.addEventListener('mousedown',start,{passive:false});}
 return ()=>{active=false;el.classList.remove('dragging');removeGlobal();};
}
function distSeg(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,l=dx*dx+dy*dy;if(!l)return Math.hypot(px-x1,py-y1);let t=((px-x1)*dx+(py-y1)*dy)/l;t=Math.max(0,Math.min(1,t));return Math.hypot(px-(x1+t*dx),py-(y1+t*dy));}
function minPathDist(px,py,pts,w,h){let d=1e9;for(let i=0;i<pts.length-1;i++)d=Math.min(d,distSeg(px,py,pts[i][0]*w,pts[i][1]*h,pts[i+1][0]*w,pts[i+1][1]*h));return d;}

function road(){
 const area=$('#activityArea'),screen=$('#screen-game');
 screen.classList.add('road-immersive');
 app.classList.add('road-game-mode');
 document.body.classList.add('road-game-active');
 area.classList.add('road-activity');
 const dest=ROAD_DESTINATIONS[state.roadDestination]||ROAD_DESTINATIONS.school;
 const level=Number(state.roadRoute)||2;
 const routeName=level===1?'Reta e larga':level===2?'Curvas em S':'Desafio';

 const goalByDestination={
  school:[.73,.12],
  home:[.72,.12],
  park:[.56,.12]
 };
 const goal=goalByDestination[state.roadDestination]||goalByDestination.school;
 const routeControls={
  1:[[.50,.93],[.50,.78],[.50,.61],[.51,.44],[.57,.28],goal],
  2:[[.52,.93],[.70,.82],[.69,.67],[.34,.58],[.31,.43],[.68,.33],[.65,.20],goal],
  3:[[.48,.94],[.70,.84],[.62,.70],[.31,.64],[.27,.49],[.60,.43],[.72,.31],[.45,.23],[.37,.15],goal]
 };
 const controls=(routeControls[level]||routeControls[2]).map(p=>[p[0],p[1]]);
 const vw=420,vh=720;
 const roadWidth=level===1?98:level===2?82:72;

 const quad=(a,c,b,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]];
 const midpoint=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const samples=[];let path='M '+(controls[0][0]*vw)+' '+(controls[0][1]*vh);let segStart=controls[0];
 for(let i=1;i<controls.length-1;i++){
  const control=controls[i],segEnd=midpoint(controls[i],controls[i+1]);
  path+=' Q '+(control[0]*vw)+' '+(control[1]*vh)+' '+(segEnd[0]*vw)+' '+(segEnd[1]*vh);
  for(let k=0;k<22;k++)samples.push(quad(segStart,control,segEnd,k/22));
  segStart=segEnd;
 }
 const lc=controls[controls.length-2],le=controls[controls.length-1];
 path+=' Q '+(lc[0]*vw)+' '+(lc[1]*vh)+' '+(le[0]*vw)+' '+(le[1]*vh);
 for(let k=0;k<=28;k++)samples.push(quad(segStart,lc,le,k/28));

 const checkpointFractions=level===1?[.28,.54,.78]:level===2?[.22,.43,.64,.82]:[.18,.36,.54,.70,.84];
 const starFractions=level===1?[.20,.48,.74]:level===2?[.18,.47,.76]:[.16,.38,.61,.81];
 const checkpointPoints=checkpointFractions.map(fr=>samples[Math.min(samples.length-1,Math.round(fr*(samples.length-1)))]);
 const starPoints=starFractions.map(fr=>samples[Math.min(samples.length-1,Math.round(fr*(samples.length-1)))]);
 const trafficEvents=[
  {fraction:.25,type:'curve',icon:'↪',text:'Cuidado com a curva. Reduza a velocidade e mantenha a atenção.',phrase:'traffic_curve'},
  {fraction:.52,type:'cross',icon:'🚸',text:'Faixa de pedestres: observe antes de seguir.',phrase:'traffic_crosswalk'},
  {fraction:.72,type:'slow',icon:'30',text:'Devagar também é dirigir bem. Respeite a velocidade.',phrase:'traffic_slow'}
 ];
 if(state.roadDestination==='school')trafficEvents.push({fraction:.87,type:'school',icon:'🏫',text:'Zona escolar: atenção redobrada e velocidade reduzida.',phrase:'traffic_school'});

 const carAsset='assets/argo-hgt-game.svg';

 const scene=document.createElement('div');scene.className='road-game-shell';
 scene.innerHTML=
 '<div class="road-game-bg"></div>'+
 '<div class="road-game-top">'+
  '<div class="road-mini-tutor"><img src="assets/guide.webp" alt="Tia Tati"><div><small>TIA TATI</small><strong class="road-tutor-msg">Cuidado com a curva!</strong><em>Vamos com calma 💗</em></div></div>'+
  '<div class="road-score"><span class="score-star">⭐ <b class="road-points">0</b><small>pontos</small></span><span class="score-dest">🚩 <b>'+dest.label+'</b><small>destino</small></span></div>'+
  '<div class="road-game-actions"><button class="road-exit-btn" type="button" aria-label="Voltar">←</button><button class="road-voice-btn" type="button" aria-label="Ouvir Tia Tati">🔊</button><button class="road-hint-btn" type="button" aria-label="Dica">💡</button><button class="road-pause-btn" type="button" aria-label="Pausar">⏸️</button></div>'+
 '</div>'+
 '<div class="road-game-stage">'+
  '<svg class="road-world" viewBox="0 0 '+vw+' '+vh+'" preserveAspectRatio="none" aria-label="Estrada do Caminho Seguro">'+
   '<defs><filter id="roadShadow"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-opacity=".20"/></filter></defs>'+
   '<image href="assets/road-'+state.roadDestination+'.svg" x="0" y="0" width="'+vw+'" height="'+vh+'" preserveAspectRatio="none"/>'+
   '<path d="'+path+'" fill="none" stroke="#e6eef0" stroke-width="'+(roadWidth+26)+'" stroke-linecap="round" stroke-linejoin="round" filter="url(#roadShadow)"/>'+
   '<path d="'+path+'" fill="none" stroke="#4f5961" stroke-width="'+roadWidth+'" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path class="road-guide" d="'+path+'" fill="none" stroke="#76d8c3" stroke-width="'+Math.max(roadWidth-26,40)+'" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path d="'+path+'" fill="none" stroke="#fff" stroke-width="3.5" stroke-dasharray="20 18" stroke-linecap="round"/>'+
  '</svg>'+
  '<div class="road-route-chip">🚗 Rota '+level+' • '+routeName+'</div>'+
  '<div class="road-progress-chip"><span class="rp-current">0</span>/'+checkpointPoints.length+' pontos seguros</div>'+
  '<div class="road-autonomy-chip">💗 Caminhos para a autonomia</div>'+
  '<div class="road-crash">CRASH!</div>'+
  '<div class="road-traffic-bubble">🚦 Observe as placas e dirija com cuidado.</div>'+
 '</div>'+
 '<div class="road-praise" aria-live="polite">⭐ Muito bem! Continue assim!</div>'+
 '<div class="road-game-footer">'+
  '<div class="road-progress-track"><span class="road-progress-fill"></span></div>'+
  '<div class="road-progress-nodes">'+checkpointPoints.map((_,i)=>'<i data-progress-node="'+i+'"></i>').join('')+'<b class="finish-flag">🏁</b></div>'+
  '<div class="road-stars-summary"><span>⭐ <b class="road-stars-count">0</b>/'+starPoints.length+' estrelas</span><span>Pequenos trajetos, grandes conquistas! 💗</span></div>'+
 '</div>';
 area.appendChild(scene);
 const stage=scene.querySelector('.road-game-stage');

 const car=document.createElement('div');car.className='game-object argo-token';car.innerHTML='<img src="'+carAsset+'" alt="Carrinho azul da Tia Tati" draggable="false">';stage.appendChild(car);

 const starEls=starPoints.map((p,i)=>{
  const star=document.createElement('div');star.className='road-star';star.textContent='⭐';star.dataset.i=i;stage.appendChild(star);return star;
 });
 const checkpoints=checkpointPoints.map((p,i)=>{
  const cp=document.createElement('button');cp.type='button';cp.className='road-checkpoint road-flag'+(state.roadControl==='tap'?' tap-mode':'');cp.textContent='⚑';cp.dataset.index=i;stage.appendChild(cp);return cp;
 });

 const signSpecs=[
  {fr:.27,kind:'curve',txt:'↪'},
  {fr:.52,kind:'cross',txt:'🚸'},
  {fr:.72,kind:'speed',txt:'30'}
 ];
 if(state.roadDestination==='school')signSpecs.push({fr:.87,kind:'school',txt:'🏫'});
 signSpecs.forEach(spec=>{
  const p=samples[Math.round(spec.fr*(samples.length-1))],el=document.createElement('div');
  el.className='road-sign-card '+spec.kind;el.textContent=spec.txt;el.style.left=(p[0]*100)+'%';el.style.top=(p[1]*100)+'%';stage.appendChild(el);
  if(spec.kind==='cross'){const cw=document.createElement('div');cw.className='road-crosswalk';cw.style.left=(p[0]*100)+'%';cw.style.top=(p[1]*100)+'%';stage.appendChild(cw);}
 });

 let checkpoint=0,lastErr=0,helpLevel=0,lives=3,finished=false,lastTrafficIndex=-1,stars=0;
 const collected=new Set(),pointsEl=scene.querySelector('.road-points'),starsEl=scene.querySelector('.road-stars-count'),tutorMsg=scene.querySelector('.road-tutor-msg'),trafficBubble=scene.querySelector('.road-traffic-bubble'),crashEl=scene.querySelector('.road-crash'),progressFill=scene.querySelector('.road-progress-fill'),praise=scene.querySelector('.road-praise'),progressNodes=[...scene.querySelectorAll('[data-progress-node]')];
 scene.querySelector('.road-exit-btn').onclick=()=>show('roadsetup');
 scene.querySelector('.road-voice-btn').onclick=()=>playVoice(state.currentPhrase,true);
 scene.querySelector('.road-hint-btn').onclick=()=>{state.assists++;tutorMsg.textContent=MISSIONS.road.hint;trafficBubble.textContent='💡 '+MISSIONS.road.hint;playVoice('road_hint',false);};
 scene.querySelector('.road-pause-btn').onclick=e=>{state.paused=!state.paused;e.currentTarget.textContent=state.paused?'▶️':'⏸️';trafficBubble.textContent=state.paused?'⏸️ Pausado. Continue quando estiver pronto.':'🚗 Vamos continuar com calma.';};

 const showPraise=(text,kind='good')=>{
  praise.textContent=text;praise.className='road-praise show '+kind;
  clearTimeout(praise._timer);praise._timer=setTimeout(()=>praise.classList.remove('show'),1700);
 };
 const setCarAngle=(bestIndex)=>{
  const i=Math.max(1,Math.min(samples.length-2,bestIndex)),a=samples[i-1],b=samples[i+1];
  const dx=(b[0]-a[0])*stage.clientWidth,dy=(b[1]-a[1])*stage.clientHeight;
  const angle=Math.atan2(dy,dx)*180/Math.PI+90;
  car.style.setProperty('--car-angle',angle.toFixed(1)+'deg');
 };
 const place=()=>{
  const w=stage.clientWidth,h=stage.clientHeight,start=samples[0];
  car.style.left=(start[0]*w-car.offsetWidth/2)+'px';car.style.top=(start[1]*h-car.offsetHeight/2)+'px';setCarAngle(1);
  checkpoints.forEach((cp,k)=>{const p=checkpointPoints[k];cp.style.left=(p[0]*w)+'px';cp.style.top=(p[1]*h)+'px';cp.classList.toggle('current',state.roadControl==='tap'&&k===0);});
  starEls.forEach((st,k)=>{const p=starPoints[k];st.style.left=(p[0]*w)+'px';st.style.top=(p[1]*h)+'px';});
 };
 requestAnimationFrame(place);
 window.addEventListener('resize',place,{passive:true});

 const trafficForProgress=progress=>{
  let idx=-1;trafficEvents.forEach((ev,i)=>{if(progress>=ev.fraction)idx=i;});
  if(idx>lastTrafficIndex&&idx>=0){
   lastTrafficIndex=idx;const ev=trafficEvents[idx];trafficBubble.textContent='🚦 '+ev.text;tutorMsg.textContent=ev.text;
   setTutor('guide',MISSIONS.road.name+' • '+dest.label,ev.text,ev.phrase,false);playVoice(ev.phrase,false);
  }
 };

 const collectForProgress=progress=>{
  starFractions.forEach((fr,i)=>{
   if(progress>=fr&&!collected.has(i)){collected.add(i);stars++;state.interactions++;starEls[i]?.classList.add('collected');pointsEl.textContent=String(stars*40);starsEl.textContent=String(stars);buzz(18);showPraise('⭐ Muito bem! Continue assim!');feedback('Estrela conquistada! Continue com atenção.');}
  });
 };

 const updateProgress=progress=>{progressFill.style.width=Math.max(0,Math.min(100,progress*100))+'%';collectForProgress(progress);trafficForProgress(progress);};

 const updateCheckpoint=(idx)=>{
  if(idx<=checkpoint)return;checkpoint=Math.min(idx,checkpointPoints.length);state.checkpoints=Math.max(state.checkpoints,checkpoint);
  checkpoints.forEach((cp,k)=>{cp.classList.toggle('done',k<checkpoint);cp.classList.toggle('current',state.roadControl==='tap'&&k===checkpoint);});
  scene.querySelector('.rp-current').textContent=String(checkpoint);progressNodes.forEach((n,k)=>n.classList.toggle('done',k<checkpoint));showPraise('✅ Muito bem! Ponto seguro!');feedback('Muito bem! Ponto seguro alcançado.');playVoice('road_checkpoint',false);
 };

 const recover=()=>{
  const p=checkpoint===0?samples[0]:checkpointPoints[Math.min(checkpoint-1,checkpointPoints.length-1)],r=stage.getBoundingClientRect();
  car.classList.add('recovering');car.style.left=(p[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(p[1]*r.height-car.offsetHeight/2)+'px';setTimeout(()=>car.classList.remove('recovering'),500);
 };

 const showCrash=()=>{crashEl.classList.remove('show');void crashEl.offsetWidth;crashEl.classList.add('show');buzz([35,25,45]);};

 const deviate=()=>{
  if(Date.now()-lastErr<1050||finished)return;lastErr=Date.now();state.collisions++;helpLevel++;showCrash();
  tutorMsg.textContent='Ops! Vamos voltar ao ponto seguro.';showPraise('💗 Tudo bem. Vamos tentar de novo!','retry');
  if(state.therapeutic){
   setTutor('retry',MISSIONS.road.name+' • '+dest.label,'Crash! Ops! Vamos voltar para a pista com calma.','road_crash',false);playVoice('road_crash',false);trafficBubble.textContent='💗 Sem problema: volte ao último ponto seguro.';recover();
   if(helpLevel>=2){scene.querySelector('.road-guide')?.classList.add('visible');state.assists++;trafficBubble.textContent='💗 Ajuda visual ativada. Siga a faixa verde-clara.';}
  }else{
   lives--;softError('Crash! O carro saiu da pista.');recover();if(lives<=0){lives=3;checkpoint=0;feedback('Vamos recomeçar com calma.');}
  }
 };

 const finishRoad=()=>{
  if(finished)return;finished=true;car.classList.add('arrived');progressFill.style.width='100%';progressNodes.forEach(n=>n.classList.add('done'));tutorMsg.textContent='Chegamos! Muito bem!';trafficBubble.textContent='✅ Missão concluída com atenção e cuidado.';showPraise('🏁 Chegamos! Que conquista linda!');
  setTutor('success',MISSIONS.road.name+' • '+dest.label,dest.finish,'road_finish',false);playVoice('road_finish',false);feedback(dest.finish);setTimeout(finishStep,850);
 };

 if(state.roadControl==='drag'){
  let dragging=false;
  const driveAt=(clientX,clientY)=>{
   if(state.paused||finished)return;
   const r=stage.getBoundingClientRect(),x=Math.max(0,Math.min(r.width,clientX-r.left)),y=Math.max(0,Math.min(r.height,clientY-r.top));
   car.style.left=(x-car.offsetWidth/2)+'px';car.style.top=(y-car.offsetHeight/2)+'px';
   let best=Infinity,bestIndex=0;for(let i=0;i<samples.length;i++){const p=samples[i],q=Math.hypot(x-p[0]*r.width,y-p[1]*r.height);if(q<best){best=q;bestIndex=i;}}
   setCarAngle(bestIndex);const progress=bestIndex/(samples.length-1),allow=(roadWidth/2)+12+(helpLevel>=2?20:0),cpReached=checkpointFractions.filter(fr=>progress>=fr).length;
   if(best<allow&&cpReached>checkpoint)updateCheckpoint(cpReached);if(best>allow+22)deviate();updateProgress(progress);if(progress>.97&&best<allow+14)finishRoad();resetIdle();
  };
  const nearCar=(clientX,clientY)=>{
   const r=stage.getBoundingClientRect(),cr=car.getBoundingClientRect(),cx=cr.left+cr.width/2-r.left,cy=cr.top+cr.height/2-r.top;
   return Math.hypot(clientX-r.left-cx,clientY-r.top-cy)<Math.max(72,cr.width*.9);
  };
  const tstart=e=>{if(!e.touches?.length)return;const t=e.touches[0];if(nearCar(t.clientX,t.clientY)){dragging=true;car.classList.add('dragging');if(e.cancelable)e.preventDefault();driveAt(t.clientX,t.clientY);}};
  const tmove=e=>{if(!dragging||!e.touches?.length)return;if(e.cancelable)e.preventDefault();const t=e.touches[0];driveAt(t.clientX,t.clientY);};
  const tend=e=>{if(!dragging)return;dragging=false;car.classList.remove('dragging');if(e.cancelable)e.preventDefault();};
  const pdown=e=>{if(e.pointerType==='touch')return;if(!nearCar(e.clientX,e.clientY))return;dragging=true;car.classList.add('dragging');if(e.cancelable)e.preventDefault();driveAt(e.clientX,e.clientY);};
  const pmove=e=>{if(!dragging||e.pointerType==='touch')return;if(e.cancelable)e.preventDefault();driveAt(e.clientX,e.clientY);};
  const pup=()=>{dragging=false;car.classList.remove('dragging');};
  stage.addEventListener('touchstart',tstart,{passive:false});stage.addEventListener('touchmove',tmove,{passive:false});stage.addEventListener('touchend',tend,{passive:false});stage.addEventListener('touchcancel',tend,{passive:false});
  stage.addEventListener('pointerdown',pdown,{passive:false});window.addEventListener('pointermove',pmove,{passive:false});window.addEventListener('pointerup',pup,{passive:true});
  var roadInputCleanup=()=>{stage.removeEventListener('touchstart',tstart);stage.removeEventListener('touchmove',tmove);stage.removeEventListener('touchend',tend);stage.removeEventListener('touchcancel',tend);stage.removeEventListener('pointerdown',pdown);window.removeEventListener('pointermove',pmove);window.removeEventListener('pointerup',pup);};
 }else{
  car.style.cursor='default';
  checkpoints.forEach((cp,k)=>cp.addEventListener('click',()=>{
   if(state.paused||finished)return;if(k!==checkpoint){tutorMsg.textContent='Procure a próxima bandeirinha.';feedback('Uma bandeirinha de cada vez.');return;}
   const p=checkpointPoints[k],r=stage.getBoundingClientRect();car.style.transition='left .42s ease, top .42s ease';car.style.left=(p[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(p[1]*r.height-car.offsetHeight/2)+'px';setCarAngle(Math.round(checkpointFractions[k]*(samples.length-1)));state.interactions++;updateCheckpoint(k+1);updateProgress(checkpointFractions[k]);
   if(k===checkpoints.length-1)setTimeout(()=>{const g=samples.at(-1);car.style.left=(g[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(g[1]*r.height-car.offsetHeight/2)+'px';updateProgress(1);setTimeout(finishRoad,500);},520);
  }));
 }
 state.cleanup=()=>{finished=true;try{roadInputCleanup?.();}catch(_){}window.removeEventListener('resize',place);screen.classList.remove('road-immersive');app.classList.remove('road-game-mode');document.body.classList.remove('road-game-active');area.classList.remove('road-activity');};
}
function bee(){
 const area=$('#activityArea'),screen=$('#screen-game');
 screen.classList.add('bee-immersive');app.classList.add('bee-game-mode');document.body.classList.add('bee-game-active');area.classList.add('bee-activity');
 const level=Number(state.beeRoute)||2;
 const flowerIcon={pink:'🌸',sun:'🌻',white:'🌼'}[state.beeFlower]||'🌸';
 const flowerName={pink:'flor rosa',sun:'girassol',white:'margarida'}[state.beeFlower]||'flor rosa';

 const routeWaypoints={
  // Caminho 1: diagonal simples, sem curva em S.
  1:[[.16,.86],[.32,.70],[.48,.54],[.64,.38],[.82,.20]],
  // Caminho 2: curva em S suave.
  2:[[.16,.86],[.57,.77],[.30,.61],[.67,.47],[.48,.33],[.82,.20]],
  // Caminho 3: maior amplitude lateral e cruzamentos repetidos da linha média.
  3:[[.16,.86],[.76,.74],[.24,.59],[.77,.45],[.23,.31],[.82,.20]]
 };
 const controls=(routeWaypoints[level]||routeWaypoints[2]).map(p=>[p[0],p[1]]);
 const vw=420,vh=720;
 const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
 const catmull=(p0,p1,p2,p3,t)=>{
  const t2=t*t,t3=t2*t;
  return [
   .5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
   .5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)
  ];
 };
 const samples=[];
 if(level===1){
  // Rota 1 intencionalmente reta/segmentada para ficar visualmente inequívoca.
  for(let i=0;i<controls.length-1;i++){
   for(let k=0;k<24;k++)samples.push(lerp(controls[i],controls[i+1],k/24));
  }
  samples.push(controls.at(-1));
 }else{
  for(let i=0;i<controls.length-1;i++){
   const p0=controls[Math.max(0,i-1)],p1=controls[i],p2=controls[i+1],p3=controls[Math.min(controls.length-1,i+2)];
   for(let k=0;k<26;k++)samples.push(catmull(p0,p1,p2,p3,k/26));
  }
  samples.push(controls.at(-1));
 }
 const path='M '+samples.map((p,i)=>(i?'L ':'')+(p[0]*vw).toFixed(1)+' '+(p[1]*vh).toFixed(1)).join(' ');

 const leafFractions=level===1?[.27,.54,.78]:level===2?[.22,.43,.64,.82]:[.18,.36,.54,.70,.84];
 const pollenFractions=level===1?[.20,.48,.74]:level===2?[.18,.47,.76]:[.16,.38,.60,.80];
 const leafPoints=leafFractions.map(fr=>samples[Math.round(fr*(samples.length-1))]);
 const pollenPoints=pollenFractions.map(fr=>samples[Math.round(fr*(samples.length-1))]);

 const scene=document.createElement('div');scene.className='bee-game-shell';
 scene.innerHTML=
 '<div class="bee-game-top">'+
   '<div class="bee-mini-tutor"><img src="assets/guide.webp" alt="Tia Tati"><div><small>TIA TATI</small><strong class="bee-tutor-msg">Siga a trilha com calma.</strong><em>Olhe primeiro, depois mova 💗</em></div></div>'+
   '<div class="bee-score"><span>✨ <b class="bee-points">0</b><small>pólen</small></span><span>'+flowerIcon+' <b>'+flowerName+'</b><small>destino</small></span></div>'+
   '<div class="bee-game-actions"><button class="bee-exit-btn" type="button">←</button><button class="bee-pause-btn" type="button">⏸️</button></div>'+
 '</div>'+
 '<div class="bee-stage">'+
   '<svg class="bee-world" viewBox="0 0 '+vw+' '+vh+'" preserveAspectRatio="none">'+
     '<image href="assets/bee-garden.svg" x="0" y="0" width="'+vw+'" height="'+vh+'" preserveAspectRatio="none"/>'+
     '<path class="bee-trail-soft" d="'+path+'" fill="none" stroke="#fff" stroke-width="25" stroke-linecap="round" stroke-linejoin="round" opacity=".56"/>'+
     '<path class="bee-trail" d="'+path+'" fill="none" stroke="#f4a9c8" stroke-width="5" stroke-dasharray="12 13" stroke-linecap="round"/>'+
   '</svg>'+
   '<div class="bee-route-chip">🐝 Caminho '+level+' • '+(level===1?'reto':level===2?'curvas suaves':'cruza a linha média')+'</div>'+
   '<div class="bee-focus-chip">👀 Siga com os olhos</div>'+
   '<div class="bee-bzzz">BZZZ!</div>'+
   '<div class="bee-hint-bubble">🌿 Leve a abelhinha até a '+flowerName+'.</div>'+
 '</div>'+
 '<div class="bee-praise" aria-live="polite">✨ Muito bem!</div>'+
 '<div class="bee-game-footer">'+
   '<div class="bee-progress-track"><span class="bee-progress-fill"></span></div>'+
   '<div class="bee-progress-nodes">'+leafPoints.map((_,i)=>'<i data-bee-node="'+i+'"></i>').join('')+'<b>'+flowerIcon+'</b></div>'+
   '<div class="bee-footer-copy"><span>✨ <b class="bee-pollen-count">0</b>/'+pollenPoints.length+' pólen</span><span>Movimento com propósito 💗</span></div>'+
 '</div>';
 area.appendChild(scene);
 const stage=scene.querySelector('.bee-stage');
 const bee=document.createElement('div');bee.className='game-object bee-game-token';bee.innerHTML='<img src="assets/bee-game.svg" alt="Abelhinha" draggable="false">';stage.appendChild(bee);
 const flower=document.createElement('div');flower.className='bee-flower-goal';flower.textContent=flowerIcon;stage.appendChild(flower);
 const leaves=leafPoints.map((p,i)=>{const el=document.createElement('button');el.type='button';el.className='bee-leaf'+(state.beeControl==='tap'?' tap-mode':'');el.textContent='🍃';el.dataset.i=i;stage.appendChild(el);return el;});
 const pollen=pollenPoints.map((p,i)=>{const el=document.createElement('span');el.className='bee-pollen';el.textContent='✨';stage.appendChild(el);return el;});

 let checkpoint=0,lastErr=0,helpLevel=0,finished=false,collected=0;
 const got=new Set(),praise=scene.querySelector('.bee-praise'),points=scene.querySelector('.bee-points'),pollenCount=scene.querySelector('.bee-pollen-count'),progressFill=scene.querySelector('.bee-progress-fill'),nodes=[...scene.querySelectorAll('[data-bee-node]')],msg=scene.querySelector('.bee-tutor-msg'),hint=scene.querySelector('.bee-hint-bubble'),bzzz=scene.querySelector('.bee-bzzz');
 const showPraise=(txt,kind='good')=>{praise.textContent=txt;praise.className='bee-praise show '+kind;clearTimeout(praise._t);praise._t=setTimeout(()=>praise.classList.remove('show'),1500);};
 const angleAt=i=>{const k=Math.max(1,Math.min(samples.length-2,i)),a=samples[k-1],b=samples[k+1];return Math.atan2((b[1]-a[1])*stage.clientHeight,(b[0]-a[0])*stage.clientWidth)*180/Math.PI;};
 const place=()=>{
  const w=stage.clientWidth,h=stage.clientHeight,start=samples[0],goal=samples.at(-1);
  bee.style.left=(start[0]*w-bee.offsetWidth/2)+'px';bee.style.top=(start[1]*h-bee.offsetHeight/2)+'px';bee.style.setProperty('--bee-angle',angleAt(1)+'deg');
  flower.style.left=(goal[0]*w)+'px';flower.style.top=(goal[1]*h)+'px';
  leaves.forEach((el,i)=>{const p=leafPoints[i];el.style.left=(p[0]*w)+'px';el.style.top=(p[1]*h)+'px';el.classList.toggle('current',state.beeControl==='tap'&&i===0);});
  pollen.forEach((el,i)=>{const p=pollenPoints[i];el.style.left=(p[0]*w)+'px';el.style.top=(p[1]*h)+'px';});
 };
 requestAnimationFrame(place);window.addEventListener('resize',place,{passive:true});

 const collect=progress=>{
  pollenFractions.forEach((fr,i)=>{if(progress>=fr&&!got.has(i)){got.add(i);collected++;state.interactions++;pollen[i]?.classList.add('collected');points.textContent=String(collected*25);pollenCount.textContent=String(collected);buzz(16);showPraise('✨ Pólen coletado! Muito bem!');}});
 };
 const updateProgress=progress=>{progressFill.style.width=Math.max(0,Math.min(100,progress*100))+'%';collect(progress);};
 const updateCheckpoint=idx=>{if(idx<=checkpoint)return;checkpoint=Math.min(idx,leafPoints.length);nodes.forEach((n,k)=>n.classList.toggle('done',k<checkpoint));leaves.forEach((n,k)=>{n.classList.toggle('done',k<checkpoint);n.classList.toggle('current',state.beeControl==='tap'&&k===checkpoint);});showPraise('🍃 Ótimo! Continue pelo caminho.');};
 const showBzzz=()=>{bzzz.classList.remove('show');void bzzz.offsetWidth;bzzz.classList.add('show');buzz([20,18,20]);};
 const recover=()=>{const p=checkpoint===0?samples[0]:leafPoints[Math.min(checkpoint-1,leafPoints.length-1)],r=stage.getBoundingClientRect();bee.classList.add('recovering');bee.style.left=(p[0]*r.width-bee.offsetWidth/2)+'px';bee.style.top=(p[1]*r.height-bee.offsetHeight/2)+'px';setTimeout(()=>bee.classList.remove('recovering'),420);};
 const deviate=()=>{if(Date.now()-lastErr<1100||finished)return;lastErr=Date.now();state.collisions++;helpLevel++;showBzzz();msg.textContent='Bzzz... por aqui! Vamos voltar à trilha.';hint.textContent='💗 Tudo bem. Volte ao último ponto seguro.';showPraise('💗 Vamos tentar outra vez.','retry');recover();if(helpLevel>=2){scene.querySelector('.bee-trail-soft')?.classList.add('visible');state.assists++;hint.textContent='💡 A trilha ficou mais visível para ajudar.';}};
 const finishBee=()=>{if(finished)return;finished=true;progressFill.style.width='100%';nodes.forEach(n=>n.classList.add('done'));bee.classList.add('arrived');msg.textContent='Conseguimos! A abelhinha encontrou a flor!';hint.textContent='🌼 As abelhas ajudam as flores levando pólen de uma para outra.';showPraise('🌸 Que voo lindo! Parabéns!');setTutor('success',MISSIONS.bee.name,'Conseguimos! A abelhinha encontrou a flor!','bee_success',false);playVoice('bee_success',false);setTimeout(finishStep,1000);};

 scene.querySelector('.bee-exit-btn').onclick=()=>show('beesetup');
 scene.querySelector('.bee-pause-btn').onclick=e=>{state.paused=!state.paused;e.currentTarget.textContent=state.paused?'▶️':'⏸️';hint.textContent=state.paused?'⏸️ Pausado. Continue quando estiver pronto.':'🐝 Vamos continuar no seu tempo.';};

 if(state.beeControl==='drag'){
  let dragging=false;
  const near=(cx,cy)=>{const r=stage.getBoundingClientRect(),br=bee.getBoundingClientRect(),x=br.left+br.width/2-r.left,y=br.top+br.height/2-r.top;return Math.hypot(cx-r.left-x,cy-r.top-y)<Math.max(70,br.width);};
  const drive=(cx,cy)=>{if(state.paused||finished)return;const r=stage.getBoundingClientRect(),x=Math.max(0,Math.min(r.width,cx-r.left)),y=Math.max(0,Math.min(r.height,cy-r.top));bee.style.left=(x-bee.offsetWidth/2)+'px';bee.style.top=(y-bee.offsetHeight/2)+'px';let best=Infinity,bi=0;for(let i=0;i<samples.length;i++){const p=samples[i],d=Math.hypot(x-p[0]*r.width,y-p[1]*r.height);if(d<best){best=d;bi=i;}}bee.style.setProperty('--bee-angle',angleAt(bi)+'deg');const progress=bi/(samples.length-1),allow=54+(state.easy?10:0)+(helpLevel>=2?16:0),cp=leafFractions.filter(fr=>progress>=fr).length;if(best<allow&&cp>checkpoint)updateCheckpoint(cp);if(best>allow+23)deviate();updateProgress(progress);if(progress>.97&&best<allow+12)finishBee();resetIdle();};
  const ts=e=>{if(!e.touches?.length)return;const t=e.touches[0];if(near(t.clientX,t.clientY)){dragging=true;bee.classList.add('dragging');e.preventDefault();drive(t.clientX,t.clientY);}};
  const tm=e=>{if(!dragging||!e.touches?.length)return;e.preventDefault();const t=e.touches[0];drive(t.clientX,t.clientY);};
  const te=e=>{if(!dragging)return;dragging=false;bee.classList.remove('dragging');if(e.cancelable)e.preventDefault();};
  const pd=e=>{if(e.pointerType==='touch'||!near(e.clientX,e.clientY))return;dragging=true;bee.classList.add('dragging');e.preventDefault();drive(e.clientX,e.clientY);};
  const pm=e=>{if(!dragging||e.pointerType==='touch')return;e.preventDefault();drive(e.clientX,e.clientY);};
  const pu=()=>{dragging=false;bee.classList.remove('dragging');};
  stage.addEventListener('touchstart',ts,{passive:false});stage.addEventListener('touchmove',tm,{passive:false});stage.addEventListener('touchend',te,{passive:false});stage.addEventListener('touchcancel',te,{passive:false});stage.addEventListener('pointerdown',pd,{passive:false});window.addEventListener('pointermove',pm,{passive:false});window.addEventListener('pointerup',pu,{passive:true});
  var beeInputCleanup=()=>{stage.removeEventListener('touchstart',ts);stage.removeEventListener('touchmove',tm);stage.removeEventListener('touchend',te);stage.removeEventListener('touchcancel',te);stage.removeEventListener('pointerdown',pd);window.removeEventListener('pointermove',pm);window.removeEventListener('pointerup',pu);};
 }else{
  leaves.forEach((el,k)=>el.addEventListener('click',()=>{if(state.paused||finished)return;if(k!==checkpoint){showPraise('🍃 Procure a próxima folhinha.','retry');return;}const p=leafPoints[k],r=stage.getBoundingClientRect();bee.style.left=(p[0]*r.width-bee.offsetWidth/2)+'px';bee.style.top=(p[1]*r.height-bee.offsetHeight/2)+'px';bee.style.setProperty('--bee-angle',angleAt(Math.round(leafFractions[k]*(samples.length-1)))+'deg');state.interactions++;updateCheckpoint(k+1);updateProgress(leafFractions[k]);if(k===leaves.length-1)setTimeout(()=>{const g=samples.at(-1);bee.style.left=(g[0]*r.width-bee.offsetWidth/2)+'px';bee.style.top=(g[1]*r.height-bee.offsetHeight/2)+'px';updateProgress(1);setTimeout(finishBee,450);},500);}));
 }
 state.cleanup=()=>{finished=true;try{beeInputCleanup?.();}catch(_){}window.removeEventListener('resize',place);screen.classList.remove('bee-immersive');app.classList.remove('bee-game-mode');document.body.classList.remove('bee-game-active');area.classList.remove('bee-activity');};
}
function targetMission(){
 const area=$('#activityArea'),screen=$('#screen-game');
 screen.classList.add('target-immersive');app.classList.add('target-game-mode');document.body.classList.add('target-game-active');area.classList.add('target-activity');

 const reach=state.targetReach||state.reach||'all';
 const total=Math.max(5,Math.min(9,Number(state.targetCount)||5));
 const theme=state.targetTheme||'rings';
 const label={all:'Tela inteira',left:'Lado esquerdo',right:'Lado direito',cross:'Cruzando o centro'}[reach]||'Tela inteira';
 const positions={
  all:[[.20,.22],[.78,.20],[.52,.42],[.18,.61],[.81,.67],[.50,.79],[.30,.38],[.69,.52],[.35,.75]],
  left:[[.22,.20],[.35,.36],[.18,.53],[.37,.70],[.22,.82],[.41,.24],[.16,.39],[.33,.58],[.18,.73]],
  right:[[.78,.20],[.65,.36],[.82,.53],[.63,.70],[.78,.82],[.59,.24],[.84,.39],[.67,.58],[.82,.73]],
  cross:[[.20,.22],[.79,.30],[.22,.43],[.80,.55],[.24,.68],[.78,.80],[.31,.34],[.70,.47],[.33,.75]]
 };
 const seq=(positions[reach]||positions.all).slice(0,total);
 const palette=['coral','blue','green','yellow','purple','pink','teal','orange','sky'];

 const scene=document.createElement('div');scene.className='target-game-shell';
 scene.innerHTML=
 '<div class="target-game-top">'+
   '<div class="target-mini-tutor"><img src="assets/guide.webp" alt="Tia Tati"><div><small>TIA TATI</small><strong class="target-tutor-msg">Olhe primeiro... depois toque.</strong><em>Um alvo de cada vez 💗</em></div></div>'+
   '<div class="target-score"><span>⭐ <b class="target-points">0</b><small>pontos</small></span><span>🎯 <b class="target-step">1</b>/'+total+'<small>alvos</small></span></div>'+
   '<div class="target-game-actions"><button class="target-exit-btn" type="button">←</button><button class="target-pause-btn" type="button">⏸️</button></div>'+
 '</div>'+
 '<div class="target-stage '+(reach==='cross'?'cross-mode':'')+'">'+
   '<img class="target-board-bg" src="assets/target-board.svg" alt="">'+
   '<div class="target-region-chip">↔️ '+label+'</div>'+
   '<div class="target-focus-chip">👀 Procure o alvo</div>'+
   '<div class="target-center-guide"></div>'+
   '<div class="target-hit-pop">✨</div>'+
   '<div class="target-hint-bubble">🎯 Toque no alvo quando estiver pronto.</div>'+
 '</div>'+
 '<div class="target-praise" aria-live="polite">Muito bem!</div>'+
 '<div class="target-game-footer">'+
   '<div class="target-progress-track"><span class="target-progress-fill"></span></div>'+
   '<div class="target-progress-nodes">'+Array.from({length:total},(_,i)=>'<i data-target-node="'+i+'"></i>').join('')+'<b>🏁</b></div>'+
   '<div class="target-footer-copy"><span>🎯 Alcance com calma</span><span>Pequenas conquistas, grandes caminhos 💗</span></div>'+
 '</div>';
 area.appendChild(scene);

 const stage=scene.querySelector('.target-stage'),pointsEl=scene.querySelector('.target-points'),stepEl=scene.querySelector('.target-step'),fill=scene.querySelector('.target-progress-fill'),nodes=[...scene.querySelectorAll('[data-target-node]')],msg=scene.querySelector('.target-tutor-msg'),hint=scene.querySelector('.target-hint-bubble'),praise=scene.querySelector('.target-praise'),pop=scene.querySelector('.target-hit-pop');
 const target=document.createElement('button');target.type='button';target.className='game-object target-v27 '+theme;target.setAttribute('aria-label','Alvo');stage.appendChild(target);
 let index=0,finished=false,assistLevel=0,guideTimer=null,strongGuideTimer=null;

 const themeContent=()=>theme==='stars'?'⭐':theme==='flowers'?'🌸':'';
 target.textContent=themeContent();

 const showPraise=(text,kind='good')=>{praise.textContent=text;praise.className='target-praise show '+kind;clearTimeout(praise._timer);praise._timer=setTimeout(()=>praise.classList.remove('show'),1450);};
 const clearGuideTimers=()=>{clearTimeout(guideTimer);clearTimeout(strongGuideTimer);guideTimer=strongGuideTimer=null;};
 const armGuide=()=>{
  clearGuideTimers();if(!state.guide||finished||state.paused)return;
  guideTimer=setTimeout(()=>{target.classList.add('guided');hint.textContent='👀 Olhe para o alvo que está pulsando.';},4300);
  strongGuideTimer=setTimeout(()=>{assistLevel++;state.assists++;target.classList.add('strong-guide');msg.textContent='Aqui está o alvo. Alcance no seu tempo.';hint.textContent='💗 A área de toque foi ampliada para ajudar.';},7600);
 };
 const place=()=>{
  if(finished)return;const p=seq[index],r=stage.getBoundingClientRect(),size=targetSize();
  target.style.width=target.style.height=size+'px';
  target.style.left=(p[0]*r.width)+'px';target.style.top=(p[1]*r.height)+'px';
  target.className='game-object target-v27 '+theme+' '+palette[index%palette.length];
  target.textContent=themeContent();
  requestAnimationFrame(()=>target.classList.add('enter'));
  armGuide();
 };
 const markProgress=()=>{
  nodes.forEach((n,k)=>n.classList.toggle('done',k<index));
  fill.style.width=(index/total*100)+'%';pointsEl.textContent=String(index*20);stepEl.textContent=String(Math.min(total,index+1));
 };
 const celebrateHit=()=>{
  const tr=target.getBoundingClientRect(),sr=stage.getBoundingClientRect();
  pop.style.left=(tr.left-sr.left+tr.width/2)+'px';pop.style.top=(tr.top-sr.top+tr.height/2)+'px';pop.classList.remove('show');void pop.offsetWidth;pop.classList.add('show');
 };
 const finishTarget=()=>{
  if(finished)return;finished=true;clearGuideTimers();nodes.forEach(n=>n.classList.add('done'));fill.style.width='100%';stepEl.textContent=String(total);target.classList.add('complete');msg.textContent='Você encontrou todos os alvos!';hint.textContent='💗 Missão concluída no seu tempo.';showPraise('🏁 Que conquista linda! Parabéns!');setTutor('success',MISSIONS.target.name,'Você encontrou todos os alvos!','target_success',false);playVoice('target_success',false);setTimeout(finishStep,900);
 };
 target.onclick=e=>{
  e.stopPropagation();if(state.paused||finished)return;clearGuideTimers();state.interactions++;celebrateHit();buzz(18);index++;markProgress();
  if(index>=total){finishTarget();return;}
  showPraise(index%2?'⭐ Muito bem! Procure o próximo.':'💗 Ótimo alcance! Continue assim.');
  msg.textContent=index%2?'Muito bem! Agora procure o próximo.':'Isso! Alcance com calma.';
  target.classList.add('hit');setTimeout(()=>{target.classList.remove('hit');place();},180);resetIdle();
 };
 stage.addEventListener('pointerdown',e=>{if(state.paused||finished||e.target===target)return;const r=stage.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;if(x<0||y<0||x>r.width||y>r.height)return;hint.textContent='🌟 Sem problema. Procure o alvo colorido.';target.classList.add('guided');setTimeout(()=>target.classList.remove('guided'),900);});
 scene.querySelector('.target-exit-btn').onclick=()=>show('targetsetup');
 scene.querySelector('.target-pause-btn').onclick=e=>{state.paused=!state.paused;e.currentTarget.textContent=state.paused?'▶️':'⏸️';hint.textContent=state.paused?'⏸️ Pausado. Continue quando estiver pronto.':'🎯 Vamos continuar no seu tempo.';if(state.paused)clearGuideTimers();else armGuide();};

 const resize=()=>place();window.addEventListener('resize',resize,{passive:true});
 requestAnimationFrame(()=>{markProgress();place();});
 state.cleanup=()=>{finished=true;clearGuideTimers();window.removeEventListener('resize',resize);screen.classList.remove('target-immersive');app.classList.remove('target-game-mode');document.body.classList.remove('target-game-active');area.classList.remove('target-activity');};
}
function hands(){
 const g=document.createElement('div');g.className='hands-board';const a=document.createElement('button'),b=document.createElement('button');a.type=b.type='button';a.className=b.className='hand-pad';a.textContent='✋';b.textContent='🤚';g.append(a,b);$('#activityArea').appendChild(g);
 let ta=0,tb=0,done=false;const check=()=>{if(!done&&ta&&tb&&Math.abs(ta-tb)<1900){done=true;state.interactions+=2;finishStep();}};
 a.onpointerdown=()=>{ta=Date.now();a.classList.add('pulse');check();resetIdle();};b.onpointerdown=()=>{tb=Date.now();b.classList.add('pulse');check();resetIdle();};
}
function light(){
 const f=document.createElement('div');f.className='playfield';const b=document.createElement('button');b.type='button';b.className='game-object target-dot';b.textContent='⭐';b.style.fontSize='42px';b.style.width=b.style.height=targetSize()+'px';b.style.background='#fff0a8';f.appendChild(b);$('#activityArea').appendChild(f);let n=0,timer=null,stopped=false;
 const move=()=>{if(state.paused||stopped)return;const w=f.clientWidth-b.offsetWidth,h=f.clientHeight-b.offsetHeight;b.style.left=(Math.random()*Math.max(0,w))+'px';b.style.top=(Math.random()*Math.max(0,h))+'px';};requestAnimationFrame(move);if(!state.reduced)timer=setInterval(move,Math.max(700,1800-state.speed*180));
 b.onclick=()=>{state.interactions++;n++;n>=4?(stopped=true,finishStep()):(state.reduced&&move(),feedback('Você encontrou a luz! '+n+' de 4.'));};state.cleanup=()=>timer&&clearInterval(timer);
}
function sensory(){
 const f=document.createElement('div');f.className='sensory-field';$('#activityArea').appendChild(f);let n=0;const cols=['#4ca6ff','#ff71a9','#77cf87','#ffd95f','#a98df3'];
 f.onpointerdown=e=>{if(state.paused)return;state.interactions++;n++;const r=f.getBoundingClientRect(),d=document.createElement('span');d.className='bubble-dot';const z=55+Math.random()*45;d.style.width=d.style.height=z+'px';d.style.left=(e.clientX-r.left)+'px';d.style.top=(e.clientY-r.top)+'px';d.style.background=cols[n%cols.length];f.appendChild(d);setTimeout(()=>d.remove(),850);feedback('Descoberta '+n+' de 6.');if(n>=6)setTimeout(finishStep,300);};
}
function breathe(){
 const s=document.createElement('div');s.className='breath-stage';const box=document.createElement('div'),c=document.createElement('div'),btn=document.createElement('button');c.className='breath-circle';c.textContent='Respire comigo';btn.className='primary';btn.type='button';btn.textContent='Começar respiração';box.append(c,btn);s.appendChild(box);$('#activityArea').appendChild(s);let timers=[];
 btn.onclick=()=>{btn.disabled=true;state.interactions++;c.textContent='Inspire…';if(!state.reduced)c.classList.add('grow');playVoice('breathe_in',false);timers.push(setTimeout(()=>{c.textContent='Solte…';c.classList.remove('grow');playVoice('breathe_out',false);},3200));timers.push(setTimeout(finishStep,6500));};
 state.cleanup=()=>timers.forEach(clearTimeout);
}
function physical(){
 const s=document.createElement('div');s.className='physical-stage';const instruction=$('#physicalInstruction')?.value.trim()||'Caminhe até o cone azul, contorne e volte com calma.';s.innerHTML='<div><div class="big">👣</div><h2>Missão no mundo real</h2><p></p><button class="primary" type="button">Concluído</button></div>';s.querySelector('p').textContent=instruction;s.querySelector('button').onclick=()=>{state.interactions++;finishStep();};$('#activityArea').appendChild(s);
}

function reports(){try{return JSON.parse(localStorage.getItem(reportsKey)||'[]');}catch(e){return[];}}
function saveReports(list){try{localStorage.setItem(reportsKey,JSON.stringify(list.slice(0,30)));}catch(e){}}
function finishSession(){
 clearActivity();const duration=Math.max(1,Math.round((Date.now()-state.started)/60000));const rec={id:Date.now(),date:new Date().toISOString(),activities:state.circuit.map(id=>MISSIONS[id].name),duration,interactions:state.interactions,assists:state.assists,collisions:state.collisions,checkpoints:state.checkpoints,roadDestination:state.circuit.includes('road')?state.roadDestination:null,roadRoute:state.circuit.includes('road')?state.roadRoute:null,targetReach:state.circuit.includes('target')?state.targetReach:null,targetCount:state.circuit.includes('target')?state.targetCount:null,targetTheme:state.circuit.includes('target')?state.targetTheme:null,context:state.context,observation:''};const list=reports();list.unshift(rec);saveReports(list);
 $('#doneStats').innerHTML='<div class="summary-box"><strong>'+state.circuit.length+'</strong><small>missões</small></div><div class="summary-box"><strong>'+state.interactions+'</strong><small>interações</small></div><div class="summary-box"><strong>'+duration+' min</strong><small>duração</small></div>';
 $('#gameProgressFill').style.width='100%';show('done');playVoice('celebrate',false);
}
function renderReports(){
 const list=reports(),root=$('#reportList');root.innerHTML='';const total=list.length,mins=list.reduce((a,x)=>a+x.duration,0),inter=list.reduce((a,x)=>a+x.interactions,0),help=list.reduce((a,x)=>a+x.assists,0);
 $('#reportSummary').innerHTML='<div class="report-summary-grid"><div class="summary-box"><strong>'+total+'</strong><small>sessões</small></div><div class="summary-box"><strong>'+mins+'</strong><small>minutos</small></div><div class="summary-box"><strong>'+inter+'</strong><small>interações</small></div><div class="summary-box"><strong>'+help+'</strong><small>dicas</small></div></div>';
 if(!list.length){root.innerHTML='<div class="panel pad muted">Ainda não há sessões registradas neste aparelho.</div>';return;}
 list.forEach(x=>{const d=document.createElement('div');d.className='report-row';const date=new Date(x.date).toLocaleDateString('pt-BR');d.innerHTML='<strong>'+x.activities.join(' • ')+'</strong><span>'+date+'<br>'+x.context+'</span><span>'+x.duration+' min<br>'+x.interactions+' interações</span><small>'+(x.observation||('Dicas: '+x.assists+' • retomadas: '+x.collisions))+'</small>';root.appendChild(d);});
}
function saveObservation(){
 const txt=$('#sessionObservation').value.trim();if(!txt)return toast('Escreva uma observação primeiro.');const list=reports();if(!list.length)return toast('Ainda não há sessão registrada.');list[0].observation=txt;saveReports(list);$('#sessionObservation').value='';renderReports();toast('Observação salva no último registro.');
}

buildCircuitPicker();buildInterventions();syncSettings();syncRoadSummary();
$('#homeBrand').onclick=()=>show('home');$$('[data-home]').forEach(b=>b.onclick=()=>show('home'));
$$('#bottomNav button').forEach(b=>b.onclick=()=>show(b.dataset.nav));
$$('[data-mission]').forEach(b=>b.onclick=()=>b.dataset.mission==='road'?show('roadsetup'):b.dataset.mission==='bee'?show('beesetup'):b.dataset.mission==='target'?show('targetsetup'):startCircuit([b.dataset.mission]));
$$('[data-card]').forEach(b=>b.onclick=()=>{const id=b.dataset.card,c=CARDS[id];toast(c.label+': '+c.text);playVoice(id,false);});
$('#circuitBtn').onclick=()=>show('circuit');$('#settingsTopBtn').onclick=()=>{syncSettings();show('fisio');};$('#voiceStatusBtn').onclick=$('#voiceStudioBtn').onclick=()=>show('voice');$('#interventionsBtn').onclick=()=>show('interventions');$('#reportsBtn').onclick=()=>show('reports');
$('#projectionBtn').onclick=()=>{state.projection=!state.projection;savePrefs();app.classList.toggle('projection',state.projection);toast(state.projection?'Modo projeção ativado.':'Modo projeção desativado.');};
$$('[data-destination]').forEach(b=>b.onclick=()=>{state.roadDestination=b.dataset.destination;$$('[data-destination]').forEach(x=>x.classList.toggle('active',x===b));syncRoadSummary();playVoice('choice',false);});
$$('[data-road-route]').forEach(b=>b.onclick=()=>{state.roadRoute=Number(b.dataset.roadRoute)||2;$$('[data-road-route]').forEach(x=>x.classList.toggle('active',x===b));syncRoadSummary();});
$$('[data-road-control]').forEach(b=>b.onclick=()=>{state.roadControl=b.dataset.roadControl;$$('[data-road-control]').forEach(x=>x.classList.toggle('active',x===b));syncRoadSummary();});
$('#startRoadMission').onclick=()=>startCircuit(['road']);
$$('[data-bee-route]').forEach(b=>b.onclick=()=>{state.beeRoute=Number(b.dataset.beeRoute)||2;$$('[data-bee-route]').forEach(x=>x.classList.toggle('active',x===b));syncBeeSummary();});
$$('[data-bee-flower]').forEach(b=>b.onclick=()=>{state.beeFlower=b.dataset.beeFlower;$$('[data-bee-flower]').forEach(x=>x.classList.toggle('active',x===b));syncBeeSummary();playVoice('choice',false);});
$$('[data-bee-control]').forEach(b=>b.onclick=()=>{state.beeControl=b.dataset.beeControl;$$('[data-bee-control]').forEach(x=>x.classList.toggle('active',x===b));syncBeeSummary();});
$('#startBeeMission').onclick=()=>startCircuit(['bee']);
$$('[data-target-reach]').forEach(b=>b.onclick=()=>{state.targetReach=b.dataset.targetReach;$$('[data-target-reach]').forEach(x=>x.classList.toggle('active',x===b));syncTargetSummary();});
$$('[data-target-count]').forEach(b=>b.onclick=()=>{state.targetCount=Number(b.dataset.targetCount)||5;$$('[data-target-count]').forEach(x=>x.classList.toggle('active',x===b));syncTargetSummary();});
$$('[data-target-theme]').forEach(b=>b.onclick=()=>{state.targetTheme=b.dataset.targetTheme;$$('[data-target-theme]').forEach(x=>x.classList.toggle('active',x===b));syncTargetSummary();playVoice('choice',false);});
$('#startTargetMission').onclick=()=>startCircuit(['target']);
$('#startCircuit').onclick=()=>{const ids=$$('#circuitPicker input:checked').map(x=>x.value);if(ids.length<2){$('#circuitMsg').textContent='Escolha pelo menos duas missões.';return;}$('#circuitMsg').textContent='';startCircuit(ids);};
$('#fisioForm').onsubmit=e=>{e.preventDefault();state.size=+$('#targetSize').value;state.speed=+$('#speed').value;state.amplitude=+$('#amplitude').value;state.stimuli=+$('#stimuli').value;state.reach=$('#reachRegion').value;state.context=$('#contextUse').value;state.easy=$('#easyTouch').checked;state.guide=$('#guideAssist').checked;state.projection=$('#projectionMode').checked;state.reduced=$('#reducedMotion').checked;state.therapeutic=$('#therapeuticMode').checked;savePrefs();show('home');toast('Configurações terapêuticas salvas.');};
[['targetSize','targetSizeValue',' px'],['speed','speedValue','/5'],['amplitude','amplitudeValue','/5'],['stimuli','stimuliValue','/5']].forEach(([id,out,suf])=>$('#'+id).oninput=e=>$('#'+out).textContent=e.target.value+suf);
$('#repeatVoice').onclick=()=>playVoice(state.currentPhrase,true);$('#hintGame').onclick=()=>{state.assists++;const id=state.circuit[state.step],m=MISSIONS[id];setTutor('guide',m.name,m.hint,id+'_hint',false);playVoice(id+'_hint',false);resetIdle();};
$('#pauseGame').onclick=e=>{state.paused=!state.paused;e.currentTarget.textContent=state.paused?'▶️ Continuar':'⏸️ Pausar';feedback(state.paused?'Atividade pausada.':'Vamos continuar no seu tempo.');};
$('#exitGame').onclick=()=>show('home');$('#repeatSession').onclick=()=>startCircuit(state.lastCircuit);$('#refreshVoice').onclick=()=>renderVoice();$('#saveObservation').onclick=saveObservation;
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAudio();clearIdle();}});
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js?v=30').catch(()=>{});
})();