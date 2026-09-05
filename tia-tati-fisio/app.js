(()=>{
'use strict';
const app=document.getElementById('app'); if(!app||app.dataset.ready)return; app.dataset.ready='1';
const $=(s,r=app)=>r.querySelector(s), $$=(s,r=app)=>[...r.querySelectorAll(s)];
const CARDS={
 welcome:{label:'Boas-vindas',text:'Olá! Eu sou a Tia Tati. Vamos juntos?',img:'assets/welcome.webp'},
 guide:{label:'Orientação',text:'Olhe aqui… agora é a sua vez!',img:'assets/guide.webp'},
 success:{label:'Incentivo',text:'Muito bem! Você conseguiu!',img:'assets/success.webp'},
 retry:{label:'Motivação',text:'Mais uma vez? Você consegue!',img:'assets/retry.webp'},
 relax:{label:'Relaxamento',text:'Respira comigo… isso, muito bem!',img:'assets/relax.webp'},
 celebrate:{label:'Comemoração',text:'Que esforço lindo! Parabéns!',img:'assets/celebrate.webp'}
};
const ACT={
 stars:{n:'Toque nas estrelas',i:'⭐',d:'Coordenação olho-mão e alcance.',g:'Vamos encontrar cinco estrelas. Toque em cada uma quando ela aparecer.',h:'Procure a estrela brilhante na tela.'},
 reach:{n:'Alcance terapêutico',i:'🎯',d:'Alcance dirigido por regiões.',g:'Vamos alcançar os alvos. Procure o círculo e toque nele.',h:'Olhe com calma para a região indicada.'},
 hands:{n:'Duas mãos',i:'🤲',d:'Coordenação bilateral.',g:'Agora vamos usar as duas mãos. Toque nos dois lados.',h:'Uma mão em cada lado. Vamos juntos.'},
 sequence:{n:'Sequência motora',i:'🔢',d:'Atenção e planejamento motor.',g:'Toque nos números na ordem: um, dois, três e quatro.',h:'Comece pelo número um.'},
 colors:{n:'Luzes e cores',i:'🌈',d:'Percepção visual e resposta ao estímulo.',g:'Observe a cor e toque no círculo.',h:'Observe o desenho e a cor no centro.'},
 follow:{n:'Siga a luz',i:'✨',d:'Rastreamento visual e precisão.',g:'Acompanhe a luz e toque nela quando conseguir.',h:'Acompanhe primeiro com os olhos e depois toque.'},
 sensory:{n:'Causa e efeito',i:'🫧',d:'Exploração sensorial por toque.',g:'Toque na tela e veja o que acontece.',h:'Experimente tocar em diferentes lugares.'},
 breathe:{n:'Respiração guiada',i:'🌿',d:'Pausa e autorregulação.',g:'Agora vamos fazer uma pausa. Respira comigo, devagar.',h:'Inspire quando o círculo crescer e solte quando diminuir.'},
 physical:{n:'Estação física',i:'👣',d:'Integra o app ao circuito real.',g:'Agora é hora da estação física preparada pela fisioterapeuta.',h:'Siga a orientação da fisioterapeuta.'}
};
const PRESETS={motor:['stars','reach','hands','sequence','breathe'],sensorial:['colors','follow','sensory','breathe'],coordenacao:['stars','reach','hands','sequence'],relaxamento:['sensory','follow','breathe']};
const BUNDLED_AUDIO={
  "welcome": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/a0645d94-0350-4c51-a7e8-355d9a23b299.mp3",
  "guide": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/9132191e-19f9-48af-8469-170fd0a8f9b6.mp3",
  "success": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/7f9d5713-1871-448c-8603-f0c7d0473012.mp3",
  "retry": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f62ffcaa-b41c-4b06-9189-7b72e18cbdfa.mp3",
  "relax": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/77a206ce-7de7-44e6-a094-fc2e40c03461.mp3",
  "celebrate": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/1fecb04d-75f5-4d43-a3a7-c366f8711afe.mp3",
  "stars": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/dd171f83-35c5-4814-ae10-dc8c6eac7190.mp3",
  "reach": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/073e522f-7980-464f-89d5-f0a5d425b9f8.mp3",
  "hands": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/59f2a55f-fb66-4b3c-82c1-34f358e2b590.mp3",
  "sequence": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d4fed52c-7be1-4f0c-b8c4-f956a19895aa.mp3",
  "colors": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/6a6dda82-b6e8-4e59-92c8-44fc9d1b0f36.mp3",
  "follow": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/2e168fab-d95b-4a37-93ee-d934f7f94b5d.mp3",
  "sensory": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/62a3b692-994c-4da4-b37e-cffd673d7428.mp3",
  "breathe": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/2b59498b-d0ca-4dd7-982f-39e50134626a.mp3",
  "physical": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/9f9e72a2-ae36-472c-840d-de698c651e19.mp3",
  "hint_stars": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/5a0a5874-e83d-4063-b60b-adf1b90d4f79.mp3",
  "hint_reach": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/169c90b6-55a4-4920-a880-a8db35d1ec43.mp3",
  "hint_hands": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/3ac6b0df-23d3-4049-9810-c94f4fe71108.mp3",
  "hint_sequence": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/de980aba-2bd2-4d4d-9e5e-53d4e5c0797b.mp3",
  "hint_colors": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d6b0f8ac-3e4f-4732-83a4-91f95073701f.mp3",
  "hint_follow": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/716b44a9-0ac0-4c0b-8b21-2f06be681f57.mp3",
  "hint_sensory": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/b72b8b5f-9af7-4fb0-b202-0fe099df9b28.mp3",
  "hint_breathe": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d38dd414-3449-487a-a420-655d184cecea.mp3",
  "hint_physical": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/3cdf3f39-79ca-43e5-bdd2-204cda2588a1.mp3",
  "inhale": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/8e4808c0-1472-47e6-9d32-1207f3a9360b.mp3",
  "exhale": "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/26604002-eebe-45d7-9fb0-65976d81f9a6.mp3"
};
const PHRASE_KEY_BY_TEXT={};
Object.entries(CARDS).forEach(([id,c])=>PHRASE_KEY_BY_TEXT[c.text]=id);
Object.entries(ACT).forEach(([id,a])=>{PHRASE_KEY_BY_TEXT[a.g]=id;PHRASE_KEY_BY_TEXT[a.h]='hint_'+id;});
PHRASE_KEY_BY_TEXT['Inspire devagar.']='inhale';
PHRASE_KEY_BY_TEXT['Agora solte o ar devagar.']='exhale';
const bundledAvailability={};
const state={circuit:PRESETS.motor.slice(),last:PRESETS.motor.slice(),step:0,inter:0,assists:0,start:0,size:88,reach:'all',easy:true,reduced:false,projection:false,autoVoice:true,sound:true,haptic:true,context:'APAE',voices:[],voice:null,speech:'',mode:'guide',cleanup:null};
const key='tiaTatiPrefsV9';
const recordedIds=new Set();
let ttsPrimed=false;
try{Object.assign(state,JSON.parse(localStorage.getItem(key)||'{}'));}catch(e){}
function save(){try{localStorage.setItem(key,JSON.stringify({size:state.size,reach:state.reach,easy:state.easy,reduced:state.reduced,projection:state.projection,autoVoice:state.autoVoice,sound:state.sound,haptic:state.haptic,context:state.context,voiceName:state.voice&&state.voice.name}));}catch(e){}}
function show(n){if(state.cleanup){state.cleanup();state.cleanup=null;}stop();$$('.screen').forEach(x=>x.classList.remove('active'));$('#screen-'+n)?.classList.add('active');app.dataset.screen=n;window.scrollTo({top:0,behavior:'smooth'});}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200);}
function buzz(p=22){if(state.haptic&&navigator.vibrate)navigator.vibrate(p);}
function stop(){if('speechSynthesis'in window)try{speechSynthesis.cancel();}catch(e){} if(window.tatiAudio){try{window.tatiAudio.pause();URL.revokeObjectURL(window.tatiAudio.src);}catch(e){}window.tatiAudio=null;}}
const DB={db:null,open(){if(this.db)return Promise.resolve(this.db);return new Promise((ok,no)=>{if(!indexedDB)return no();const r=indexedDB.open('tiaTatiVoiceDB',1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('clips'))r.result.createObjectStore('clips',{keyPath:'id'});};r.onsuccess=()=>{this.db=r.result;ok(this.db);};r.onerror=()=>no(r.error);});},async get(id){const d=await this.open();return new Promise((ok,no)=>{const r=d.transaction('clips').objectStore('clips').get(id);r.onsuccess=()=>ok(r.result);r.onerror=()=>no();});},async put(id,blob){const d=await this.open();return new Promise((ok,no)=>{const x=d.transaction('clips','readwrite');x.objectStore('clips').put({id,blob});x.oncomplete=ok;x.onerror=no;});},async del(id){const d=await this.open();return new Promise((ok,no)=>{const x=d.transaction('clips','readwrite');x.objectStore('clips').delete(id);x.oncomplete=ok;x.onerror=no;});}};
async function recorded(id){if(!state.sound)return false;try{const r=await DB.get(id);if(!r||!r.blob)return false;stop();const u=URL.createObjectURL(r.blob),a=new Audio(u);window.tatiAudio=a;a.onended=a.onerror=()=>{URL.revokeObjectURL(u);if(window.tatiAudio===a)window.tatiAudio=null;};await a.play();return true;}catch(e){return false;}}
async function bundled(id){
  if(!state.sound||!BUNDLED_AUDIO[id])return false;
  if(bundledAvailability[id]===false)return false;
  try{
    stop();
    const a=new Audio(BUNDLED_AUDIO[id]);
    a.preload='auto';window.tatiAudio=a;
    await new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(new Error('timeout')),2500);
      a.oncanplaythrough=()=>{clearTimeout(timer);resolve();};
      a.onerror=()=>{clearTimeout(timer);reject(new Error('missing'));};
      a.load();
    });
    await a.play();
    bundledAvailability[id]=true;
    a.onended=()=>{if(window.tatiAudio===a)window.tatiAudio=null;};
    return true;
  }catch(e){
    bundledAvailability[id]=false;
    if(window.tatiAudio){try{window.tatiAudio.pause();}catch(_){}window.tatiAudio=null;}
    return false;
  }
}
function systemSpeak(text){
  if(!state.sound||!('speechSynthesis'in window))return false;
  try{
    stop();
    const u=new SpeechSynthesisUtterance(text);
    if(state.voice)u.voice=state.voice;
    u.lang='pt-BR';u.rate=.93;u.pitch=1;u.volume=1;
    u.onerror=()=>{loadVoices();toast('Não consegui usar a voz do aparelho. Toque em “Testar voz” no Estúdio de Voz.');};
    speechSynthesis.resume();
    speechSynthesis.speak(u);
    ttsPrimed=true;
    return true;
  }catch(e){return false;}
}
async function speak(mode,text){
  state.mode=mode;state.speech=text;
  const isCardPhrase=CARDS[mode]&&CARDS[mode].text===text;
  if(isCardPhrase&&recordedIds.has(mode)){ if(await recorded(mode))return true; recordedIds.delete(mode); }
  const phraseKey=PHRASE_KEY_BY_TEXT[text]||((mode==='retry'||mode==='success'||mode==='celebrate')?mode:null);
  if(phraseKey&&await bundled(phraseKey))return true;
  return systemSpeak(text);
}
function loadVoices(){
  if(!('speechSynthesis'in window)){state.voices=[];state.voice=null;voiceUI();return;}
  const all=speechSynthesis.getVoices();
  const exact=all.filter(v=>(v.lang||'').toLowerCase()==='pt-br');
  const portuguese=all.filter(v=>(v.lang||'').toLowerCase().startsWith('pt'));
  state.voices=exact.length?exact:portuguese;
  const pref=(()=>{try{return JSON.parse(localStorage.getItem(key)||'{}').voiceName||'';}catch(e){return'';}})();
  state.voice=state.voices.find(v=>v.name===pref)||state.voices.find(v=>/maria|camila|francisca|fernanda|luciana|female|google/i.test(v.name))||state.voices[0]||null;
  voiceUI();
}
function voiceUI(){const s=$('#systemVoiceSelect'),m=$('#systemVoiceStatus'),b=$('#voiceBannerText');if(s){s.innerHTML='';if(!state.voices.length){s.disabled=true;s.add(new Option('Nenhuma voz pt-BR disponível',''));}else{state.voices.forEach((v,i)=>s.add(new Option(v.name+' ('+v.lang+')',i,false,state.voice&&v.name===state.voice.name)));s.disabled=false;}}if(m){m.className='inline-message '+(state.voice?'success':'error');m.textContent=state.voice?'Voz pt-BR selecionada: '+state.voice.name+'.':'Nenhuma voz pt-BR encontrada. O app não usará voz estrangeira; grave a voz da Tatiana.';}if(b)b.textContent=state.voice?'Voz pt-BR: '+state.voice.name+'. Gravações da Tatiana têm prioridade.':'Sem voz pt-BR. O app não usa voz estrangeira; use o Estúdio de Voz.';$('#voiceQuickBtn').textContent=state.sound?'🔊':'🔇';}
if('speechSynthesis'in window){
  loadVoices();
  speechSynthesis.onvoiceschanged=loadVoices;
  [150,400,900,1800,3200].forEach(ms=>setTimeout(loadVoices,ms));
  document.addEventListener('pointerdown',()=>{try{speechSynthesis.resume();loadVoices();ttsPrimed=true;}catch(e){}},{once:true,capture:true});
}else voiceUI();
function tutor(mode,title,text,auto=true){const c=CARDS[mode]||CARDS.guide;$('#tutorCard').src=c.img;$('#tutorLabel').textContent=c.label;$('#stationTitle').textContent=title;$('#speechBubble').textContent=text;state.mode=mode;state.speech=text;if(auto&&state.autoVoice)speak(mode,text);}
function stationPicker(){const r=$('#stationPicker');r.innerHTML='';Object.entries(ACT).forEach(([id,a])=>{const l=document.createElement('label');l.className='station-option';l.innerHTML='<input class="station-check" type="checkbox" value="'+id+'"><span class="station-icon">'+a.i+'</span><span><strong>'+a.n+'</strong><small>'+a.d+'</small></span>';const c=l.querySelector('input');c.checked=['stars','reach','breathe'].includes(id);c.onchange=()=>{if(id==='physical')$('#physicalConfig').hidden=!c.checked;};r.appendChild(l);});}
function cardGallery(){const r=$('#cardsGallery');r.innerHTML='';Object.entries(CARDS).forEach(([id,c])=>{const x=document.createElement('article');x.className='tutor-card-tile';x.innerHTML='<img src="'+c.img+'" alt="'+c.label+'"><div class="tutor-card-body"><h3>'+c.label+'</h3><p>'+c.text+'</p><button class="btn card-play" type="button">🔊 Ouvir</button></div>';x.querySelector('button').onclick=()=>speak(id,c.text);r.appendChild(x);});}
async function recorderList(){const r=$('#phraseRecorderList');r.innerHTML='';for(const [id,c] of Object.entries(CARDS)){let has=false;try{has=!!(await DB.get(id));if(has)recordedIds.add(id);else recordedIds.delete(id);}catch(e){}const row=document.createElement('div');row.className='phrase-row';row.innerHTML='<div><strong>'+c.label+'</strong><small>'+c.text+'</small></div><div class="phrase-actions"><button class="mini-action play" type="button">'+(has?'▶️ Ouvir':'🔊 Voz pt-BR')+'</button><button class="mini-action rec" type="button">🎙️ '+(has?'Regravar':'Gravar')+'</button>'+(has?'<button class="mini-action del" type="button">🗑️</button>':'')+'</div>';row.querySelector('.play').onclick=()=>speak(id,c.text);row.querySelector('.rec').onclick=()=>record(id,c,row);row.querySelector('.del')?.addEventListener('click',async()=>{await DB.del(id);recordedIds.delete(id);recorderList();toast('Gravação removida.');});r.appendChild(row);}}
async function record(id,c,row){if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('Gravação indisponível neste navegador.');return;}let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true});}catch(e){toast('Permissão do microfone não concedida.');return;}const chunks=[],rec=new MediaRecorder(stream),btn=row.querySelector('.rec');btn.textContent='⏹️ Parar gravação';rec.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};rec.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());if(chunks.length){await DB.put(id,new Blob(chunks,{type:rec.mimeType||'audio/webm'}));recordedIds.add(id);}recorderList();toast('Fala '+c.label+' salva neste aparelho.');};btn.onclick=()=>{if(rec.state==='recording')rec.stop();};rec.start();}
function sync(){const p=state.context==='APAE'?'APAE e outros':state.context;$('#contextChip').textContent=p;if($('#targetSize'))$('#targetSize').value=state.size;if($('#reachBias'))$('#reachBias').value=state.reach;if($('#easyTouch'))$('#easyTouch').checked=state.easy;if($('#reducedMotion'))$('#reducedMotion').checked=state.reduced;if($('#projectionMode'))$('#projectionMode').checked=state.projection;if($('#autoVoice'))$('#autoVoice').checked=state.autoVoice;if($('#contextSelect'))$('#contextSelect').value=state.context;if($('#soundEnabled'))$('#soundEnabled').checked=state.sound;if($('#hapticEnabled'))$('#hapticEnabled').checked=state.haptic;voiceUI();}
function size(){return Math.max(64,Math.min(126,Number(state.size)+(state.easy?10:0)+(state.projection?8:0)));}
function target(icon){const b=document.createElement('button');b.type='button';b.className='touch-target';b.textContent=icon;const s=size();b.style.width=s+'px';b.style.height=s+'px';return b;}
function clear(){if(state.cleanup){state.cleanup();state.cleanup=null;}stop();$('#activityArea').innerHTML='';$('#gameFeedback').textContent='';}
function progress(){const n=state.step+1,t=state.circuit.length;$('#stationCounter').textContent=Math.min(n,t)+'/'+t;$('#progressFill').style.width=Math.min(100,state.step/t*100)+'%';}
function start(ids){state.circuit=ids.slice();state.last=ids.slice();state.step=0;state.inter=0;state.assists=0;state.start=Date.now();$('#gameShell').classList.toggle('projection-mode',state.projection);try{if('speechSynthesis'in window){speechSynthesis.resume();loadVoices();}}catch(e){}show('game');render();}
function doneStation(){buzz([20,35,20]);tutor('success',ACT[state.circuit[state.step]]?.n||'Estação',CARDS.success.text,true);$('#gameFeedback').textContent='Estação concluída!';setTimeout(()=>{state.step++;state.step>=state.circuit.length?finish():render();},700);}
function render(){clear();progress();const id=state.circuit[state.step],a=ACT[id];tutor(id==='breathe'?'relax':'guide',a.n,a.g,true);({stars,reach,hands,sequence,colors,follow,sensory,breathe,physical}[id]||doneStation)();}
function stars(){const f=document.createElement('div');f.className='playfield';const b=target('⭐');f.appendChild(b);$('#activityArea').appendChild(f);let n=0;const move=()=>{const s=size();b.style.left=(6+Math.random()*Math.max(0,f.clientWidth-s-12))+'px';b.style.top=(6+Math.random()*Math.max(0,f.clientHeight-s-12))+'px';};requestAnimationFrame(move);b.onclick=()=>{state.inter++;n++;buzz();$('#gameFeedback').textContent='Muito bem! '+n+' de 5.';n>=5?doneStation():move();};}
function reach(){const f=document.createElement('div');f.className='playfield';$('#activityArea').appendChild(f);const sets={all:[[12,18],[82,18],[50,46],[16,78],[82,78]],left:[[14,18],[28,38],[16,62],[31,78],[22,49]],right:[[72,18],[86,38],[70,62],[85,78],[78,49]],top:[[12,16],[32,13],[50,18],[68,13],[86,16]],bottom:[[12,78],[32,72],[50,82],[68,72],[86,78]]};let i=0,b=target('🎯');f.appendChild(b);const pos=()=>{const p=(sets[state.reach]||sets.all)[i];b.style.left=p[0]+'%';b.style.top=p[1]+'%';b.style.transform='translate(-50%,-50%)';};pos();b.onclick=()=>{state.inter++;i++;buzz();i>=5?doneStation():(pos(),$('#gameFeedback').textContent='Ótimo! Procure o próximo.');};}
function hands(){const g=document.createElement('div');g.className='bilateral-grid';const a=document.createElement('button'),b=document.createElement('button');a.type=b.type='button';a.className=b.className='hand-pad';a.textContent='✋';b.textContent='🤚';g.append(a,b);$('#activityArea').appendChild(g);let ta=0,tb=0,x=false;const ck=()=>{if(!x&&ta&&tb&&Math.abs(ta-tb)<1700){x=true;state.inter+=2;doneStation();}};a.onpointerdown=()=>{ta=Date.now();ck();};b.onpointerdown=()=>{tb=Date.now();ck();};}
function sequence(){const g=document.createElement('div');g.className='sequence-board';$('#activityArea').appendChild(g);let e=1;for(let i=1;i<=4;i++){const b=document.createElement('button');b.type='button';b.className='sequence-btn '+(i===1?'active':'');b.textContent=i;b.dataset.n=i;g.appendChild(b);b.onclick=()=>{state.inter++;if(+b.dataset.n!==e){tutor('retry',ACT.sequence.n,'Quase! Procure o número '+e+'.',true);return;}b.textContent='✓';b.classList.remove('active');e++;g.querySelector('[data-n="'+e+'"]')?.classList.add('active');e===5?doneStation():$('#gameFeedback').textContent='Agora o '+e+'.';};}}
function colors(){const w=document.createElement('div');w.className='color-game';const x=document.createElement('div'),b=document.createElement('button'),c=document.createElement('div');b.type='button';b.className='color-target';c.className='color-caption';x.append(b,c);w.appendChild(x);$('#activityArea').appendChild(w);const v=[['🌞','#ffe58a','amarelo'],['💧','#b9e4ff','azul'],['🌸','#ffd3e4','rosa'],['🍃','#cfeecd','verde']];let i=0;const paint=()=>{b.textContent=v[i][0];b.style.background=v[i][1];c.textContent='Toque no '+v[i][2]+'.';};paint();b.onclick=()=>{state.inter++;i++;i>=v.length?doneStation():paint();};}
function follow(){const f=document.createElement('div');f.className='playfield',b=target('✨');f.appendChild(b);$('#activityArea').appendChild(f);let n=0,t=null,p=false;const ctrl=document.createElement('div'),btn=document.createElement('button');ctrl.style='text-align:center;margin-top:10px';btn.type='button';btn.className='btn';btn.textContent='Pausar movimento';ctrl.appendChild(btn);$('#activityArea').appendChild(ctrl);const mv=()=>{if(p)return;const s=size();b.style.left=(6+Math.random()*Math.max(0,f.clientWidth-s-12))+'px';b.style.top=(6+Math.random()*Math.max(0,f.clientHeight-s-12))+'px';};requestAnimationFrame(mv);if(!state.reduced)t=setInterval(mv,1200);b.onclick=()=>{state.inter++;n++;n>=4?doneStation():(state.reduced&&mv(),$('#gameFeedback').textContent='Você encontrou a luz! '+n+' de 4.');};btn.onclick=()=>{p=!p;btn.textContent=p?'Continuar movimento':'Pausar movimento';};state.cleanup=()=>t&&clearInterval(t);}
function sensory(){const c=document.createElement('div');c.className='sensory-canvas';$('#activityArea').appendChild(c);let n=0,cols=['#8fd9d0','#ffd3e4','#b9e4ff','#ffe58a','#d8c7ff'];c.onpointerdown=e=>{state.inter++;n++;const r=c.getBoundingClientRect(),d=document.createElement('span');d.className='sensory-dot';d.style.width=d.style.height=(60+Math.random()*42)+'px';d.style.left=e.clientX-r.left+'px';d.style.top=e.clientY-r.top+'px';d.style.background=cols[n%cols.length];c.appendChild(d);setTimeout(()=>d.remove(),850);$('#gameFeedback').textContent='Exploração '+n+' de 6.';n>=6&&setTimeout(doneStation,250);};}
function breathe(){const s=document.createElement('div');s.className='breath-stage';const x=document.createElement('div'),c=document.createElement('div'),b=document.createElement('button');c.className='breath-circle';c.textContent='Respire comigo';b.type='button';b.className='btn btn-primary';b.textContent='Começar respiração';x.append(c,b);s.appendChild(x);$('#activityArea').appendChild(s);let timers=[];b.onclick=()=>{state.inter++;b.disabled=true;c.textContent='Inspire…';if(!state.reduced)c.classList.add('grow');speak('relax','Inspire devagar.');timers.push(setTimeout(()=>{c.textContent='Solte…';c.classList.remove('grow');speak('relax','Agora solte o ar devagar.');},3200));timers.push(setTimeout(doneStation,6500));};state.cleanup=()=>timers.forEach(clearTimeout);}
function physical(){const s=document.createElement('div');s.className='physical-stage';s.innerHTML='<div class="big-icon">👣</div><p></p><button class="btn btn-primary" type="button">Concluído</button>';s.querySelector('p').textContent=$('#physicalInstruction')?.value.trim()||'Realize a estação física preparada pela fisioterapeuta.';s.querySelector('button').onclick=()=>{state.inter++;doneStation();};$('#activityArea').appendChild(s);}
function finish(){clear();show('done');const min=Math.max(1,Math.round((Date.now()-state.start)/60000));$('#sessionSummary').innerHTML='<div class="summary-box"><strong>'+state.circuit.length+'</strong><small>estações</small></div><div class="summary-box"><strong>'+state.inter+'</strong><small>interações</small></div><div class="summary-box"><strong>'+min+' min</strong><small>duração aproximada</small></div>';speak('celebrate',CARDS.celebrate.text);}
stationPicker();cardGallery();sync();recorderList().catch(()=>{});
if('serviceWorker'in navigator&&location.protocol.indexOf('http')===0)navigator.serviceWorker.register('./sw.js').catch(()=>{});
$('#brandHome').onclick=()=>show('home');$$('[data-back]').forEach(b=>b.onclick=()=>show(b.dataset.back||'home'));
$('#builderBtn').onclick=()=>{sync();show('builder');};$('#cardsBtn').onclick=()=>show('cards');$('#openVoiceStudio').onclick=$('#voiceQuickBtn').onclick=()=>{recorderList();show('voice');};$('#settingsBtn').onclick=()=>{sync();show('settings');};
$$('[data-circuit]').forEach(b=>b.onclick=()=>start(PRESETS[b.dataset.circuit]||PRESETS.motor));
$('#builderForm').onsubmit=e=>{e.preventDefault();const ids=$$('.station-check:checked').map(x=>x.value),m=$('#builderMessage');if(ids.length<2){m.className='inline-message error';m.textContent='Escolha pelo menos duas estações.';return;}m.textContent='';state.size=+$('#targetSize').value||88;state.reach=$('#reachBias').value;state.easy=$('#easyTouch').checked;state.reduced=$('#reducedMotion').checked;state.projection=$('#projectionMode').checked;state.autoVoice=$('#autoVoice').checked;save();start(ids);};
$('#settingsForm').onsubmit=e=>{e.preventDefault();state.context=$('#contextSelect').value;state.sound=$('#soundEnabled').checked;state.haptic=$('#hapticEnabled').checked;save();sync();show('home');toast('Preferências salvas.');};
$('#systemVoiceSelect').onchange=e=>{state.voice=state.voices[+e.target.value]||null;save();voiceUI();systemSpeak('Olá! Esta é a voz selecionada para a Tia Tati.');};
$('#testSystemVoice')?.addEventListener('click',()=>{
  state.sound=true;loadVoices();voiceUI();
  const ok=systemSpeak('Olá! Eu sou a Tia Tati. A voz está funcionando.');
  if(!ok)toast('Seu navegador não liberou a síntese de voz. Tente abrir pelo Chrome ou instalar o app na tela inicial.');
});
$('#refreshRecordings').onclick=()=>recorderList();$('#repeatSpeechBtn').onclick=()=>speak(state.mode,state.speech);
$('#hintBtn').onclick=()=>{const a=ACT[state.circuit[state.step]];if(!a)return;state.assists++;tutor('guide',a.n,a.h,false);speak('guide',a.h);};
$('#muteGameBtn').onclick=e=>{state.sound=!state.sound;e.currentTarget.textContent=state.sound?'🔈 Voz':'🔇 Voz';if(!state.sound)stop();save();voiceUI();};
$('#exitGameBtn').onclick=()=>{clear();show('home');};$('#repeatCircuitBtn').onclick=()=>start(state.last);$('#doneHomeBtn').onclick=()=>show('home');
document.addEventListener('visibilitychange',()=>document.hidden&&stop());
})();