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
 screen:'home', circuit:['road'], lastCircuit:['road'], step:0, interactions:0, assists:0, collisions:0, started:0, checkpoints:0, roadDestination:'school', roadControl:'drag', roadRoute:2,
 size:92,speed:2,amplitude:3,stimuli:2,reach:'all',context:'APAE',easy:true,guide:true,projection:false,reduced:false,therapeutic:true,
 paused:false,currentPhrase:null,currentText:'',cleanup:null,idleTimers:[],lastObservation:''
};
try{Object.assign(state,JSON.parse(localStorage.getItem(prefsKey)||'{}'));}catch(e){}
function savePrefs(){try{localStorage.setItem(prefsKey,JSON.stringify({size:state.size,speed:state.speed,amplitude:state.amplitude,stimuli:state.stimuli,reach:state.reach,context:state.context,easy:state.easy,guide:state.guide,projection:state.projection,reduced:state.reduced,therapeutic:state.therapeutic}));}catch(e){}}

function show(name){
 if(state.cleanup){state.cleanup();state.cleanup=null;}
 clearIdle(); state.paused=false;
 $$('.screen').forEach(s=>s.classList.remove('active'));
 $('#screen-'+name)?.classList.add('active'); state.screen=name;
 $$('#bottomNav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));
 app.classList.toggle('projection',state.projection);
 window.scrollTo({top:0,behavior:'smooth'});
 if(name==='reports')renderReports();
 if(name==='voice')renderVoice();
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
 let active=false;
 const move=e=>{if(!active||state.paused)return;const r=field.getBoundingClientRect(),x=Math.max(0,Math.min(r.width,e.clientX-r.left)),y=Math.max(0,Math.min(r.height,e.clientY-r.top));el.style.left=(x-el.offsetWidth/2)+'px';el.style.top=(y-el.offsetHeight/2)+'px';onMove?.(x,y,r);resetIdle();};
 el.addEventListener('pointerdown',e=>{active=true;el.setPointerCapture(e.pointerId);move(e);});
 el.addEventListener('pointermove',move);
 el.addEventListener('pointerup',e=>{if(!active)return;active=false;onEnd?.(e);});
 state.cleanup=()=>{active=false;};
}
function distSeg(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,l=dx*dx+dy*dy;if(!l)return Math.hypot(px-x1,py-y1);let t=((px-x1)*dx+(py-y1)*dy)/l;t=Math.max(0,Math.min(1,t));return Math.hypot(px-(x1+t*dx),py-(y1+t*dy));}
function minPathDist(px,py,pts,w,h){let d=1e9;for(let i=0;i<pts.length-1;i++)d=Math.min(d,distSeg(px,py,pts[i][0]*w,pts[i][1]*h,pts[i+1][0]*w,pts[i+1][1]*h));return d;}

function road(){
 const area=$('#activityArea'),wrap=document.createElement('div');wrap.className='road-wrap';
 const dest=ROAD_DESTINATIONS[state.roadDestination]||ROAD_DESTINATIONS.school;
 const level=Number(state.roadRoute)||2;
 const goalY={school:.18,home:.78,park:.40}[state.roadDestination]??.18;
 const routeControls={
  1:[[.07,.72],[.28,.67],[.48,.60],[.68,.51],[.91,goalY]],
  2:[[.07,.78],[.24,.67],[.39,.78],[.51,.57],[.39,.38],[.58,.21],[.76,.35],[.91,goalY]],
  3:[[.07,.80],[.19,.64],[.34,.73],[.48,.49],[.34,.29],[.54,.15],[.72,.31],[.62,.55],[.78,.67],[.91,goalY]]
 };
 const controls=(routeControls[level]||routeControls[2]).map(p=>[p[0],p[1]]);
 const vw=800,vh=400;
 const baseWidth=level===1?120:level===2?96:82;
 const roadWidth=Math.max(66,Math.min(132,baseWidth+(3-state.amplitude)*7));

 const quad=(a,c,b,t)=>[(1-t)*(1-t)*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)*(1-t)*a[1]+2*(1-t)*t*c[1]+t*t*b[1]];
 const midpoint=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const samples=[];let d='M '+(controls[0][0]*vw)+' '+(controls[0][1]*vh);let segStart=controls[0];
 for(let i=1;i<controls.length-1;i++){
  const control=controls[i],segEnd=midpoint(controls[i],controls[i+1]);
  d+=' Q '+(control[0]*vw)+' '+(control[1]*vh)+' '+(segEnd[0]*vw)+' '+(segEnd[1]*vh);
  for(let k=0;k<18;k++)samples.push(quad(segStart,control,segEnd,k/18));
  segStart=segEnd;
 }
 const lastControl=controls[controls.length-2],lastEnd=controls[controls.length-1];
 d+=' Q '+(lastControl[0]*vw)+' '+(lastControl[1]*vh)+' '+(lastEnd[0]*vw)+' '+(lastEnd[1]*vh);
 for(let k=0;k<=24;k++)samples.push(quad(segStart,lastControl,lastEnd,k/24));

 const checkpointFractions=level===1?[.28,.55,.80]:level===2?[.22,.45,.68,.84]:[.18,.36,.54,.70,.84];
 const checkpointPoints=checkpointFractions.map(fr=>samples[Math.min(samples.length-1,Math.round(fr*(samples.length-1)))]);
 const trafficEvents=[
  {fraction:.29,type:'curve',icon:'↪',text:'Curvas pedem atenção e velocidade reduzida.',phrase:'traffic_curve'},
  {fraction:.52,type:'cross',icon:'🚸',text:'Atenção à faixa de pedestres. Observe antes de seguir.',phrase:'traffic_crosswalk'},
  {fraction:.72,type:'slow',icon:'DEV',text:'Devagar também é dirigir bem. Siga com cuidado.',phrase:'traffic_slow'}
 ];
 if(state.roadDestination==='school')trafficEvents.push({fraction:.86,type:'school',icon:'🏫',text:'Zona escolar: atenção redobrada e velocidade reduzida.',phrase:'traffic_school'});

 const carSvg='<svg viewBox="0 0 96 70" aria-hidden="true"><defs><linearGradient id="carRed" x1="0" x2="1"><stop stop-color="#ff6a76"/><stop offset="1" stop-color="#e94158"/></linearGradient></defs><path d="M15 42 L23 24 Q26 17 35 17 H62 Q69 17 74 24 L81 42 Q89 44 89 52 V57 Q89 62 84 62 H12 Q7 62 7 57 V51 Q7 45 15 42Z" fill="url(#carRed)" stroke="#fff" stroke-width="3"/><path d="M31 22 H60 Q65 22 69 31 H27 Q28 25 31 22Z" fill="#bfeaff"/><path d="M48 22 V31" stroke="#fff" stroke-width="2" opacity=".8"/><rect x="17" y="39" width="13" height="7" rx="3" fill="#fff4a8"/><rect x="68" y="39" width="11" height="7" rx="3" fill="#fff4a8"/><circle cx="24" cy="59" r="9" fill="#263946" stroke="#fff" stroke-width="3"/><circle cx="72" cy="59" r="9" fill="#263946" stroke="#fff" stroke-width="3"/><circle cx="24" cy="59" r="3" fill="#9aabb5"/><circle cx="72" cy="59" r="3" fill="#9aabb5"/></svg>';

 wrap.innerHTML=
  '<div class="road-scenery">'+
   '<span style="left:4%;top:7%">☁️</span><span style="left:34%;top:8%">☀️</span><span style="left:74%;top:6%">☁️</span>'+
   '<span style="left:7%;bottom:7%">🌲</span><span style="left:28%;bottom:5%">🌼</span><span style="left:56%;bottom:7%">🌳</span><span style="right:6%;bottom:8%">🌷</span>'+
  '</div>'+
  '<svg class="road-svg" viewBox="0 0 '+vw+' '+vh+'" preserveAspectRatio="none">'+
   '<path d="'+d+'" fill="none" stroke="#eef3f4" stroke-width="'+(roadWidth+25)+'" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path d="'+d+'" fill="none" stroke="#5d6770" stroke-width="'+roadWidth+'" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path class="road-guide" d="'+d+'" fill="none" stroke="#8de0d1" stroke-width="'+Math.max(roadWidth-25,42)+'" stroke-linecap="round" stroke-linejoin="round"/>'+
   '<path d="'+d+'" fill="none" stroke="#ffd95d" stroke-width="4" stroke-dasharray="20 16" stroke-linecap="round"/>'+
  '</svg>'+
  '<div class="road-hud">Pontos seguros: <span class="road-count">0</span>/'+checkpointPoints.length+'</div>'+
  '<div class="road-route-label">Rota '+level+(level===2?' • Curvas em S':level===1?' • Início':' • Desafio')+'</div>'+
  '<div class="goal-badge">'+dest.icon+' '+dest.label+'</div>'+
  '<div class="traffic-tip">🚦 Observe a sinalização e dirija com cuidado.</div>'+
  '<div class="crash-pop">CRASH!</div>'+
  (!state.therapeutic?'<div class="road-hearts">❤️❤️❤️</div>':'');

 const car=document.createElement('div');car.className='game-object car-token';car.innerHTML=carSvg;wrap.appendChild(car);

 const checkpoints=checkpointPoints.map((p,i)=>{
  const cp=document.createElement('button');cp.type='button';cp.className='road-checkpoint checkpoint-flag'+(state.roadControl==='tap'?' tap-mode':'');cp.textContent='⚑';cp.dataset.index=i;wrap.appendChild(cp);return cp;
 });

 trafficEvents.forEach(ev=>{
  const p=samples[Math.min(samples.length-1,Math.round(ev.fraction*(samples.length-1)))];
  const sign=document.createElement('div');sign.className='road-sign '+ev.type;sign.innerHTML='<span class="sign-face">'+ev.icon+'</span><span class="pole"></span>';sign.style.left=(p[0]*100)+'%';sign.style.top=(Math.max(.10,Math.min(.90,p[1]-.13))*100)+'%';wrap.appendChild(sign);
  if(ev.type==='cross'){const cross=document.createElement('div');cross.className='crosswalk';cross.style.left=(p[0]*100)+'%';cross.style.top=(p[1]*100)+'%';wrap.appendChild(cross);}
 });

 area.appendChild(wrap);
 let checkpoint=0,lastErr=0,helpLevel=0,lives=3,finished=false,lastTrafficIndex=-1;
 const crashPop=wrap.querySelector('.crash-pop'),tipBox=wrap.querySelector('.traffic-tip');

 const pointAtFraction=fr=>samples[Math.min(samples.length-1,Math.round(fr*(samples.length-1)))];
 const place=()=>{
  const w=wrap.clientWidth,h=wrap.clientHeight,start=samples[0];
  car.style.left=(start[0]*w-car.offsetWidth/2)+'px';car.style.top=(start[1]*h-car.offsetHeight/2)+'px';
  checkpoints.forEach((cp,k)=>{const p=checkpointPoints[k];cp.style.left=(p[0]*w)+'px';cp.style.top=(p[1]*h)+'px';cp.classList.toggle('current',state.roadControl==='tap'&&k===0);});
 };
 requestAnimationFrame(place);

 const trafficForProgress=progress=>{
  let idx=-1;trafficEvents.forEach((ev,i)=>{if(progress>=ev.fraction)idx=i;});
  if(idx>lastTrafficIndex&&idx>=0){
   lastTrafficIndex=idx;const ev=trafficEvents[idx];tipBox.textContent='🚦 '+ev.text;
   setTutor('guide',MISSIONS.road.name+' • '+dest.label,ev.text,ev.phrase,false);playVoice(ev.phrase,false);
  }
 };

 const updateCheckpoint=(idx)=>{
  if(idx<=checkpoint)return;
  checkpoint=Math.min(idx,checkpointPoints.length);state.checkpoints=Math.max(state.checkpoints,checkpoint);
  checkpoints.forEach((cp,k)=>{cp.classList.toggle('done',k<checkpoint);cp.classList.toggle('current',state.roadControl==='tap'&&k===checkpoint);});
  wrap.querySelector('.road-count').textContent=checkpoint;
  if(checkpoint<=checkpointPoints.length){feedback('Muito bem! Ponto seguro alcançado.');playVoice('road_checkpoint',false);}
 };

 const recover=()=>{
  const p=checkpoint===0?samples[0]:checkpointPoints[Math.min(checkpoint-1,checkpointPoints.length-1)],r=wrap.getBoundingClientRect();car.classList.add('recovering');
  car.style.left=(p[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(p[1]*r.height-car.offsetHeight/2)+'px';
  setTimeout(()=>car.classList.remove('recovering'),470);
 };

 const showCrash=()=>{
  crashPop.classList.remove('show');void crashPop.offsetWidth;crashPop.classList.add('show');buzz([35,25,45]);
 };

 const deviate=()=>{
  if(Date.now()-lastErr<950||finished)return;lastErr=Date.now();state.collisions++;helpLevel++;showCrash();
  if(state.therapeutic){
    setTutor('retry',MISSIONS.road.name+' • '+dest.label,'Crash! Ops! Vamos voltar para a pista com calma. Eu te ajudo a retomar do último ponto seguro.','road_crash',false);
    playVoice('road_crash',false);feedback('Retomando do último ponto seguro.');recover();
    if(helpLevel>=2){wrap.querySelector('.road-guide')?.classList.add('visible');state.assists++;tipBox.textContent='💗 Ajuda visual ativada: siga a faixa verde-clara.';feedback('A Tia Tati deixou o caminho mais visível para ajudar.');}
  }else{
    lives--;const hearts=wrap.querySelector('.road-hearts');if(hearts)hearts.textContent='❤️'.repeat(Math.max(0,lives))+'🩶'.repeat(3-Math.max(0,lives));
    softError('Crash! O carro saiu da pista. Tente novamente.');
    if(lives<=0){lives=3;checkpoint=0;wrap.querySelector('.road-count').textContent='0';checkpoints.forEach(cp=>cp.classList.remove('done'));feedback('Vamos recomeçar o caminho com calma.');}
    recover();
  }
 };

 const reachedGoal=(x,y,r)=>{const g=samples.at(-1);return Math.hypot(x-g[0]*r.width,y-g[1]*r.height)<76;};
 const finishRoad=()=>{
  if(finished)return;finished=true;state.interactions++;
  setTutor('success',MISSIONS.road.name+' • '+dest.label,dest.finish,'road_finish',false);playVoice('road_finish',false);tipBox.textContent='✅ Missão concluída com atenção e cuidado.';feedback(dest.finish);
  setTimeout(finishStep,620);
 };

 if(state.roadControl==='drag'){
  dragObject(car,wrap,(x,y,r)=>{
   let best=Infinity,bestIndex=0;
   for(let i=0;i<samples.length;i++){const p=samples[i],q=Math.hypot(x-p[0]*r.width,y-p[1]*r.height);if(q<best){best=q;bestIndex=i;}}
   const progress=bestIndex/(samples.length-1),allow=(roadWidth/2)+10+(helpLevel>=2?17:0);
   const cpReached=checkpointFractions.filter(fr=>progress>=fr).length;
   if(best<allow&&cpReached>checkpoint)updateCheckpoint(cpReached);
   if(best>allow+18)deviate();
   trafficForProgress(progress);
   if(reachedGoal(x,y,r))finishRoad();
  });
 }else{
  car.style.cursor='default';
  checkpoints.forEach((cp,k)=>cp.addEventListener('click',()=>{
   if(state.paused||finished)return;
   if(k!==checkpoint){setTutor('retry',MISSIONS.road.name+' • '+dest.label,'Procure a próxima bandeirinha iluminada. Vamos na ordem.','road_recover',false);feedback('Uma bandeirinha de cada vez.');return;}
   const p=checkpointPoints[k],r=wrap.getBoundingClientRect();car.style.transition='left .42s ease, top .42s ease';
   car.style.left=(p[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(p[1]*r.height-car.offsetHeight/2)+'px';state.interactions++;updateCheckpoint(k+1);trafficForProgress(checkpointFractions[k]);
   if(k===checkpoints.length-1)setTimeout(()=>{const g=samples.at(-1);car.style.left=(g[0]*r.width-car.offsetWidth/2)+'px';car.style.top=(g[1]*r.height-car.offsetHeight/2)+'px';setTimeout(finishRoad,440);},500);
  }));
 }
 state.cleanup=()=>{finished=true;};
}
function bee(){
 const area=$('#activityArea'),f=document.createElement('div');f.className='playfield';f.style.background='linear-gradient(#dff6ff,#eaf8d8)';
 const pts=[[.12,.72],[.28,.58],[.36,.42],[.54,.61],[.67,.44],[.84,.28]];
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','trail');svg.setAttribute('viewBox','0 0 800 400');svg.setAttribute('preserveAspectRatio','none');svg.innerHTML='<polyline points="'+pts.map(p=>p[0]*800+','+p[1]*400).join(' ')+'" fill="none" stroke="#2d7d68" stroke-width="6" stroke-dasharray="13 12" stroke-linecap="round"/>';f.appendChild(svg);
 const b=document.createElement('div');b.className='game-object bee-token';b.textContent='🐝';const flower=document.createElement('div');flower.className='game-object flower-goal';flower.textContent='🌸';f.append(b,flower);area.appendChild(f);
 requestAnimationFrame(()=>{b.style.left=(pts[0][0]*f.clientWidth-b.offsetWidth/2)+'px';b.style.top=(pts[0][1]*f.clientHeight-b.offsetHeight/2)+'px';flower.style.left=(pts.at(-1)[0]*f.clientWidth-flower.offsetWidth/2)+'px';flower.style.top=(pts.at(-1)[1]*f.clientHeight-flower.offsetHeight/2)+'px';});
 let lastErr=0;
 dragObject(b,f,(x,y,r)=>{const d=minPathDist(x,y,pts,r.width,r.height),allow=55+(5-state.amplitude)*4;if(d>allow&&Date.now()-lastErr>1200){lastErr=Date.now();softError('Quase! Vamos voltar para a trilha com calma.');}const g=pts.at(-1);if(Math.hypot(x-g[0]*r.width,y-g[1]*r.height)<70){state.interactions++;finishStep();}});
}
function targetMission(){
 const f=document.createElement('div');f.className='playfield';$('#activityArea').appendChild(f);
 const sets={all:[[.18,.22],[.80,.20],[.50,.48],[.20,.77],[.80,.76]],left:[[.16,.20],[.28,.38],[.14,.62],[.31,.77],[.23,.50]],right:[[.72,.20],[.86,.38],[.70,.62],[.86,.78],[.78,.50]],top:[[.15,.17],[.33,.13],[.50,.20],[.68,.13],[.85,.17]],bottom:[[.15,.78],[.33,.72],[.50,.82],[.68,.72],[.85,.78]],cross:[[.18,.22],[.78,.30],[.22,.48],[.80,.64],[.25,.79]]};
 let i=0;const colors=['#ff596f','#40a1ff','#52bd77','#ffc848','#9b78ed'];const b=document.createElement('button');b.className='game-object target-dot';b.type='button';const s=targetSize();b.style.width=b.style.height=s+'px';f.appendChild(b);
 const pos=()=>{const p=(sets[state.reach]||sets.all)[i];b.style.left=(p[0]*100)+'%';b.style.top=(p[1]*100)+'%';b.style.transform='translate(-50%,-50%)';b.style.background=colors[i%colors.length];};pos();
 b.onclick=()=>{state.interactions++;i++;buzz();i>=5?finishStep():(pos(),feedback('Muito bem! Procure o próximo alvo.'));};
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
 clearActivity();const duration=Math.max(1,Math.round((Date.now()-state.started)/60000));const rec={id:Date.now(),date:new Date().toISOString(),activities:state.circuit.map(id=>MISSIONS[id].name),duration,interactions:state.interactions,assists:state.assists,collisions:state.collisions,checkpoints:state.checkpoints,roadDestination:state.circuit.includes('road')?state.roadDestination:null,roadRoute:state.circuit.includes('road')?state.roadRoute:null,context:state.context,observation:''};const list=reports();list.unshift(rec);saveReports(list);
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

buildCircuitPicker();buildInterventions();syncSettings();
$('#homeBrand').onclick=()=>show('home');$$('[data-home]').forEach(b=>b.onclick=()=>show('home'));
$$('#bottomNav button').forEach(b=>b.onclick=()=>show(b.dataset.nav));
$$('[data-mission]').forEach(b=>b.onclick=()=>b.dataset.mission==='road'?show('roadsetup'):startCircuit([b.dataset.mission]));
$$('[data-card]').forEach(b=>b.onclick=()=>{const id=b.dataset.card,c=CARDS[id];toast(c.label+': '+c.text);playVoice(id,false);});
$('#circuitBtn').onclick=()=>show('circuit');$('#settingsTopBtn').onclick=()=>{syncSettings();show('fisio');};$('#voiceStatusBtn').onclick=$('#voiceStudioBtn').onclick=()=>show('voice');$('#interventionsBtn').onclick=()=>show('interventions');$('#reportsBtn').onclick=()=>show('reports');
$('#projectionBtn').onclick=()=>{state.projection=!state.projection;savePrefs();app.classList.toggle('projection',state.projection);toast(state.projection?'Modo projeção ativado.':'Modo projeção desativado.');};
$$('[data-destination]').forEach(b=>b.onclick=()=>{state.roadDestination=b.dataset.destination;$$('[data-destination]').forEach(x=>x.classList.toggle('active',x===b));playVoice('choice',false);});
$$('[data-road-route]').forEach(b=>b.onclick=()=>{state.roadRoute=Number(b.dataset.roadRoute)||2;$$('[data-road-route]').forEach(x=>x.classList.toggle('active',x===b));});
$$('[data-road-control]').forEach(b=>b.onclick=()=>{state.roadControl=b.dataset.roadControl;$$('[data-road-control]').forEach(x=>x.classList.toggle('active',x===b));});
$('#startRoadMission').onclick=()=>startCircuit(['road']);
$('#startCircuit').onclick=()=>{const ids=$$('#circuitPicker input:checked').map(x=>x.value);if(ids.length<2){$('#circuitMsg').textContent='Escolha pelo menos duas missões.';return;}$('#circuitMsg').textContent='';startCircuit(ids);};
$('#fisioForm').onsubmit=e=>{e.preventDefault();state.size=+$('#targetSize').value;state.speed=+$('#speed').value;state.amplitude=+$('#amplitude').value;state.stimuli=+$('#stimuli').value;state.reach=$('#reachRegion').value;state.context=$('#contextUse').value;state.easy=$('#easyTouch').checked;state.guide=$('#guideAssist').checked;state.projection=$('#projectionMode').checked;state.reduced=$('#reducedMotion').checked;state.therapeutic=$('#therapeuticMode').checked;savePrefs();show('home');toast('Configurações terapêuticas salvas.');};
[['targetSize','targetSizeValue',' px'],['speed','speedValue','/5'],['amplitude','amplitudeValue','/5'],['stimuli','stimuliValue','/5']].forEach(([id,out,suf])=>$('#'+id).oninput=e=>$('#'+out).textContent=e.target.value+suf);
$('#repeatVoice').onclick=()=>playVoice(state.currentPhrase,true);$('#hintGame').onclick=()=>{state.assists++;const id=state.circuit[state.step],m=MISSIONS[id];setTutor('guide',m.name,m.hint,id+'_hint',false);playVoice(id+'_hint',false);resetIdle();};
$('#pauseGame').onclick=e=>{state.paused=!state.paused;e.currentTarget.textContent=state.paused?'▶️ Continuar':'⏸️ Pausar';feedback(state.paused?'Atividade pausada.':'Vamos continuar no seu tempo.');};
$('#exitGame').onclick=()=>show('home');$('#repeatSession').onclick=()=>startCircuit(state.lastCircuit);$('#refreshVoice').onclick=()=>renderVoice();$('#saveObservation').onclick=saveObservation;
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAudio();clearIdle();}});
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js?v=12').catch(()=>{});
})();