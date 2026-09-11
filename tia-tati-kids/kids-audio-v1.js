(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_AUDIO_V1__)return;
window.__TIA_TATI_KIDS_AUDIO_V1__=true;

const PREF='tiaTatiKidsSfx';
let enabled=localStorage.getItem(PREF)!=='0';
let ctx=null, master=null, engineTimer=null, beeTimer=null;
const cooldown=new Map();

function unlock(){
  if(!enabled)return null;
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC)return null;
  if(!ctx){ctx=new AC();master=ctx.createGain();master.gain.value=.24;master.connect(ctx.destination);}
  if(ctx.state==='suspended')ctx.resume().catch(()=>{});
  return ctx;
}
function allow(key,ms=300){const now=Date.now(),last=cooldown.get(key)||0;if(now-last<ms)return false;cooldown.set(key,now);return true;}
function envGain(at,dur,vol=.15){const g=ctx.createGain();g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(Math.max(.0002,vol),at+.018);g.gain.exponentialRampToValueAtTime(.0001,at+dur);g.connect(master);return g;}
function tone(freq=440,end=freq,dur=.15,type='sine',vol=.12,delay=0){if(!unlock())return;const at=ctx.currentTime+delay,o=ctx.createOscillator(),g=envGain(at,dur,vol);o.type=type;o.frequency.setValueAtTime(freq,at);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),at+dur);o.connect(g);o.start(at);o.stop(at+dur+.03);}
function noise(dur=.18,vol=.08,cut=1200,delay=0){if(!unlock())return;const at=ctx.currentTime+delay,len=Math.max(1,Math.floor(ctx.sampleRate*dur)),b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=envGain(at,dur,vol);f.type='lowpass';f.frequency.value=cut;s.buffer=b;s.connect(f);f.connect(g);s.start(at);}

const SFX={
  ready(){tone(330,520,.11,'sine',.07);tone(520,720,.12,'sine',.06,.09);},
  carStart(){tone(55,105,.34,'sawtooth',.065);tone(85,125,.26,'triangle',.035,.08);},
  engine(){tone(78,96,.16,'sawtooth',.022);tone(42,48,.17,'triangle',.016);},
  brake(){if(!allow('brake',800))return;noise(.18,.055,2800);tone(980,230,.22,'sine',.045);},
  crash(){if(!allow('crash',700))return;noise(.32,.13,900);tone(115,42,.30,'sawtooth',.075);tone(620,150,.18,'square',.03);},
  bee(){tone(168,210,.12,'sawtooth',.035);tone(220,175,.11,'square',.018,.055);},
  collect(){tone(700,980,.09,'sine',.055);tone(980,1320,.09,'sine',.045,.07);},
  target(){tone(480,760,.09,'sine',.05);},
  hands(){tone(390,520,.11,'triangle',.045);tone(585,720,.12,'sine',.035,.06);},
  breathe(){tone(240,330,.34,'sine',.026);},
  success(){if(!allow('success',450))return;tone(523,523,.13,'sine',.06);tone(659,659,.13,'sine',.055,.11);tone(784,784,.20,'sine',.06,.22);},
  finish(){if(!allow('finish',1000))return;tone(523,523,.12,'sine',.065);tone(659,659,.12,'sine',.06,.1);tone(784,784,.14,'sine',.065,.2);tone(1047,1047,.25,'sine',.07,.31);}
};

function startEngine(){if(engineTimer)return;SFX.carStart();engineTimer=setInterval(()=>{if(!document.hidden)SFX.engine();},180);}
function stopEngine(){if(engineTimer){clearInterval(engineTimer);engineTimer=null;}}
function startBee(){if(beeTimer)return;SFX.bee();beeTimer=setInterval(()=>{if(!document.hidden)SFX.bee();},260);}
function stopBee(){if(beeTimer){clearInterval(beeTimer);beeTimer=null;}}

const missingVoice=new Set();
async function hasLocalVoice(id){try{return await new Promise(resolve=>{const r=indexedDB.open('TiaTatiVoiceV12',1);r.onerror=()=>resolve(false);r.onupgradeneeded=()=>resolve(false);r.onsuccess=()=>{try{const q=r.result.transaction('clips').objectStore('clips').get(id);q.onsuccess=()=>resolve(!!q.result?.blob);q.onerror=()=>resolve(false);}catch(_){resolve(false);}};});}catch(_){return false;}}
async function playPackedVoice(id){if(!id||missingVoice.has(id)||await hasLocalVoice(id))return false;for(const ext of ['mp3','m4a','webm']){const url='audio/voice/'+encodeURIComponent(id)+'.'+ext;try{const r=await fetch(url,{cache:'force-cache'});if(!r.ok)continue;const blob=await r.blob();const a=new Audio(URL.createObjectURL(blob));a.onended=a.onerror=()=>URL.revokeObjectURL(a.src);await a.play();return true;}catch(_){}}missingVoice.add(id);return false;}
function norm(s=''){return s.normalize?.('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()||'';}
const VOICE_RULES=[
  [/crash|voltar para a pista|ponto seguro/,'road_crash'],
  [/cuidado com a curva/,'traffic_curve'],
  [/faixa de pedestres/,'traffic_crosswalk'],
  [/zona escolar|perto da escola/,'traffic_school'],
  [/devagar tambem|reduza a velocidade/,'traffic_slow'],
  [/chegamos.*escola|chegamos ao destino/,'road_finish'],
  [/abelhinha.*flor|siga a trilha/,'bee_hint'],
  [/alcancar os alvos|alvo colorido/,'target_hint'],
  [/duas maos|uma mao de cada lado/,'hands_hint'],
  [/respira comigo|inspire|solte o ar/,'breathe_in'],
  [/muito bem.*conseguiu/,'success'],
  [/voce consegue/,'retry'],
  [/vamos juntos|eu sou a tia tati/,'welcome']
];
function voiceIdFor(text){const n=norm(text);for(const [rx,id] of VOICE_RULES)if(rx.test(n))return id;return null;}
let lastPackedText='';
function maybePackedVoice(text){const n=norm(text);if(!n||n===lastPackedText)return;lastPackedText=n;const id=voiceIdFor(text);if(id)setTimeout(()=>playPackedVoice(id),90);}

function wireRoad(shell){if(!shell||shell.dataset.audioWired)return;shell.dataset.audioWired='1';const stage=shell.querySelector('.road-game-stage'),crash=shell.querySelector('.road-crash'),points=shell.querySelector('.road-points'),msg=shell.querySelector('.road-tutor-msg'),praise=shell.querySelector('.road-praise');
  stage?.addEventListener('pointerdown',startEngine,{passive:true});window.addEventListener('pointerup',stopEngine,{passive:true});window.addEventListener('pointercancel',stopEngine,{passive:true});
  if(crash)new MutationObserver(()=>{if(crash.classList.contains('show')){stopEngine();SFX.brake();setTimeout(()=>SFX.crash(),80);}}).observe(crash,{attributes:true,attributeFilter:['class']});
  if(points){let old=Number(points.textContent)||0;new MutationObserver(()=>{const n=Number(points.textContent)||0;if(n>old)SFX.collect();old=n;}).observe(points,{childList:true,characterData:true,subtree:true});}
  if(msg){let last='';new MutationObserver(()=>{const t=msg.textContent||'',n=norm(t);if(n!==last&&/(curva|devagar|reduza|atencao)/.test(n))SFX.brake();if(n!==last)maybePackedVoice(t);last=n;}).observe(msg,{childList:true,characterData:true,subtree:true});}
  if(praise)new MutationObserver(()=>{const t=norm(praise.textContent||'');if(/chegamos|conquista|muito bem/.test(t))SFX.success();}).observe(praise,{childList:true,characterData:true,subtree:true});
}
function wireBee(shell){if(!shell||shell.dataset.audioWired)return;shell.dataset.audioWired='1';const stage=shell.querySelector('.bee-stage'),count=shell.querySelector('.bee-pollen-count'),praise=shell.querySelector('.bee-praise'),msg=shell.querySelector('.bee-tutor-msg');
  stage?.addEventListener('pointerdown',startBee,{passive:true});window.addEventListener('pointerup',stopBee,{passive:true});window.addEventListener('pointercancel',stopBee,{passive:true});
  if(count){let old=Number(count.textContent)||0;new MutationObserver(()=>{const n=Number(count.textContent)||0;if(n>old)SFX.collect();old=n;}).observe(count,{childList:true,characterData:true,subtree:true});}
  if(praise)new MutationObserver(()=>{const t=norm(praise.textContent||'');if(/muito bem|chegou|parabens/.test(t))SFX.success();}).observe(praise,{childList:true,characterData:true,subtree:true});
  if(msg)new MutationObserver(()=>maybePackedVoice(msg.textContent||'')).observe(msg,{childList:true,characterData:true,subtree:true});
}
function scan(){document.querySelectorAll('.road-game-shell').forEach(wireRoad);document.querySelectorAll('.bee-game-shell').forEach(wireBee);}

const speech=document.querySelector('#speechBubble');
if(speech)new MutationObserver(()=>maybePackedVoice(speech.textContent||'')).observe(speech,{childList:true,characterData:true,subtree:true});

const rootObserver=new MutationObserver(muts=>{let needScan=false;for(const m of muts){if(m.type==='childList'&&m.addedNodes.length)needScan=true;if(m.type==='attributes'&&m.target?.id==='screen-done'&&m.target.classList.contains('active'))SFX.finish();}if(needScan)scan();});
rootObserver.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});

function clickHandler(e){unlock();const t=e.target.closest?.('button,.target-dot,.hand-pad,.breath-circle');if(!t)return;
  if(t.id==='startRoadMission'){SFX.carStart();return;}
  if(t.id==='startBeeMission'){SFX.bee();return;}
  if(t.id==='startTargetMission'||t.id==='startHandsMission'||t.id==='startLightMission'||t.id==='startCircuit'){SFX.ready();return;}
  if(t.classList.contains('target-dot')){SFX.target();return;}
  if(t.classList.contains('hand-pad')){SFX.hands();return;}
  if(t.classList.contains('breath-circle')){SFX.breathe();return;}
}
document.addEventListener('pointerdown',unlock,{capture:true,passive:true,once:true});
document.addEventListener('click',clickHandler,{capture:true,passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopEngine();stopBee();}});
scan();

window.TiaTatiAudio={effectsEnabled:()=>enabled,setEffectsEnabled(v){enabled=!!v;localStorage.setItem(PREF,enabled?'1':'0');if(!enabled){stopEngine();stopBee();}},sfx:SFX,playPackedVoice};
})();
