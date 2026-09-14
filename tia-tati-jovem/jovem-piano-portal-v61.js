(()=>{
'use strict';
if(window.__TIA_TATI_PIANO_PORTAL_V61__)return;
window.__TIA_TATI_PIANO_PORTAL_V61__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let audioCtx=null,overlay=null,timers=[];
let mode='free',targetEvents=[],step=0,selectedSong='scale';

const notes=[
 ['C4','Dó',261.63,'white'],['Cs4','Dó♯',277.18,'black'],['D4','Ré',293.66,'white'],['Ds4','Ré♯',311.13,'black'],
 ['E4','Mi',329.63,'white'],['F4','Fá',349.23,'white'],['Fs4','Fá♯',369.99,'black'],['G4','Sol',392.00,'white'],
 ['Gs4','Sol♯',415.30,'black'],['A4','Lá',440.00,'white'],['As4','Lá♯',466.16,'black'],['B4','Si',493.88,'white'],['C5','Dó',523.25,'white']
];
const whiteIds=['C4','D4','E4','F4','G4','A4','B4','C5'];
const blackPos={Cs4:9.2,Ds4:21.7,Fs4:46.6,Gs4:59.1,As4:71.6};
const ev=(n,b=1)=>({n,b});
const songs={
 scale:{name:'Escala de Dó',bpm:104,events:whiteIds.map(n=>ev(n,.75))},
 twinkle:{name:'Brilha, Brilha',bpm:104,events:[ev('C4'),ev('C4'),ev('G4'),ev('G4'),ev('A4'),ev('A4'),ev('G4',2),ev('F4'),ev('F4'),ev('E4'),ev('E4'),ev('D4'),ev('D4'),ev('C4',2)]},
 joy:{name:'Ode à Alegria',bpm:112,events:[ev('E4'),ev('E4'),ev('F4'),ev('G4'),ev('G4'),ev('F4'),ev('E4'),ev('D4'),ev('C4'),ev('C4'),ev('D4'),ev('E4'),ev('E4',1.5),ev('D4',.5),ev('D4',2)]}
};

function addStyle(){
 if($('#pianoPortal61Style'))return;
 const s=document.createElement('style');
 s.id='pianoPortal61Style';
 s.textContent=`
#screen-home [data-piano-portal]{overflow:hidden}
#screen-home [data-piano-portal] .p61-card-art{position:relative;display:block;width:100%;aspect-ratio:2.88/1;overflow:hidden;background:linear-gradient(145deg,#071633,#141b59 58%,#35105e)}
#screen-home [data-piano-portal] .p61-card-art img{width:100%;height:100%;display:block;object-fit:cover}
#screen-home [data-piano-portal] .p61-card-art em{position:absolute;left:9px;top:7px;z-index:3;color:#fff;font-size:.46rem;font-style:normal;font-weight:950;letter-spacing:.08em;text-shadow:0 2px 7px rgba(0,0,0,.9)}
.p61-overlay,.p61-overlay *{box-sizing:border-box}.p61-overlay{position:fixed;z-index:510000;inset:0;display:none;background:radial-gradient(circle at 22% 0,rgba(44,199,255,.16),transparent 32%),linear-gradient(180deg,#06112c,#090f25 58%,#11112c);color:#eefaff;overflow:auto;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}.p61-overlay.open{display:block}
.p61-shell{width:min(1100px,100%);margin:auto;padding:12px}.p61-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border:1px solid rgba(78,231,255,.24);background:#0b183bdd;border-radius:20px;position:sticky;top:6px;z-index:20}.p61-brand{display:flex;align-items:center;gap:10px}.p61-brand img{width:42px;height:42px;border-radius:13px;object-fit:cover}.p61-brand small{display:block;color:#6eeeff;font-weight:800}.p61-close{border:1px solid #ffffff26;background:#ffffff10;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.45rem}
.p61-hero{text-align:center;padding:14px 8px}.p61-hero h1{margin:0;font-size:clamp(1.6rem,5vw,2.6rem)}.p61-hero h1 em{font-style:normal;color:#52e9ff}.p61-hero p{margin:6px auto 0;color:#aec6e8;max-width:720px}.p61-panel{border:1px solid rgba(78,231,255,.22);background:linear-gradient(145deg,#0b183ddd,#0c1634e8);border-radius:24px;padding:14px}
.p61-chips,.p61-modes,.p61-actions,.p61-legend{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.p61-chip,.p61-mode,.p61-btn,.p61-song{border:1px solid #50e6ff38;background:#10234c;color:#dff9ff;border-radius:999px;padding:10px 14px;font-weight:900}.p61-mode.active,.p61-btn.primary,.p61-song.active{background:linear-gradient(90deg,#13bfe8,#a93ee6);color:#fff;border-color:transparent}.p61-songs{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}.p61-songs.show{display:grid}.p61-song{border-radius:14px}
.p61-status{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;margin:10px 0}.p61-msg{padding:10px 12px;border-radius:14px;background:#101f45;color:#d7efff;font-weight:850;min-height:42px}.p61-progress{min-width:72px;text-align:center;padding:10px 12px;border-radius:14px;background:#101f45;color:#fff;font-weight:950}.p61-bar{grid-column:1/-1;height:6px;border-radius:999px;background:#ffffff18;overflow:hidden}.p61-bar>i{display:block;width:0;height:100%;background:linear-gradient(90deg,#45eaff,#ff4fa8);transition:width .18s ease}
.p61-legend{font-size:.78rem;color:#bfd4ef;margin:8px 0 2px}.p61-dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:5px}.p61-dot.demo{background:#45eaff;box-shadow:0 0 12px #45eaff}.p61-dot.you{background:#ff4fa8;box-shadow:0 0 12px #ff4fa8}
.p61-stage{margin-top:10px;padding:18px 10px 12px;border-radius:22px;background:linear-gradient(180deg,#020712,#101a30);overflow-x:auto}.p61-piano{position:relative;display:flex;width:min(930px,100%);min-width:690px;height:300px;margin:auto}.p61-key{touch-action:manipulation}.p61-key.white{position:relative;flex:1;border:1px solid #9aa9ba;background:linear-gradient(180deg,#fff,#e6edf5 72%,#cbd6e2);border-radius:0 0 11px 11px;color:#0c1830;box-shadow:inset 0 -9px 0 #b7c2cf,0 8px 14px #0008;z-index:1}.p61-key.black{position:absolute;top:0;width:6.7%;height:59%;z-index:4;background:linear-gradient(180deg,#070b15,#202a40 78%,#070b15);border:1px solid #43516d;border-radius:0 0 8px 8px;color:#fff}.p61-key span{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);font-weight:950}.p61-key.black span{bottom:9px;font-size:.65rem}.p61-key.played{box-shadow:0 0 0 4px #fff,0 0 0 9px #45eaff,0 0 34px #45eaff!important;z-index:8}.p61-key.demo{box-shadow:0 0 0 4px #fff,0 0 0 10px #45eaff,0 0 36px #45eaff!important;z-index:9}.p61-piano.user-turn .p61-key:not(.guide){opacity:.48}.p61-key.guide{box-shadow:0 0 0 4px #fff,0 0 0 10px #ff4fa8,0 0 36px #ff4fa8!important;z-index:9}
.p61-lessons{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}.p61-lesson{background:#111f42;border:1px solid #53e6ff30;border-radius:16px;padding:11px}.p61-lesson strong{display:block;color:#62edff}.p61-lesson small{color:#b9cde9}@media(max-width:720px){.p61-lessons{grid-template-columns:1fr}.p61-songs{grid-template-columns:1fr}.p61-piano{height:245px}.p61-shell{padding:8px}.p61-top{top:4px}.p61-stage{padding-left:4px;padding-right:4px}.p61-status{grid-template-columns:1fr}.p61-progress{justify-self:center}}
`;
 document.head.appendChild(s);
}

function noteInfo(id){return notes.find(n=>n[0]===id)}
function ctx(){
 if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==='suspended')audioCtx.resume();
 return audioCtx;
}
function hammer(c,now){
 const len=Math.max(1,Math.floor(c.sampleRate*.018)),buf=c.createBuffer(1,len,c.sampleRate),data=buf.getChannelData(0);
 for(let i=0;i<len;i++)data[i]=(Math.random()*2-1)*(1-i/len);
 const src=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();f.type='bandpass';f.frequency.value=1800;f.Q.value=.7;g.gain.setValueAtTime(.055,now);g.gain.exponentialRampToValueAtTime(.0001,now+.025);src.buffer=buf;src.connect(f);f.connect(g);g.connect(c.destination);src.start(now);
}
function tone(id,d=.72,visual='played'){
 const n=noteInfo(id);if(!n)return;
 const c=ctx(),now=c.currentTime,master=c.createGain(),filter=c.createBiquadFilter();
 filter.type='lowpass';filter.frequency.setValueAtTime(5200,now);filter.frequency.exponentialRampToValueAtTime(1900,now+Math.max(.35,d));
 master.gain.setValueAtTime(.0001,now);master.gain.exponentialRampToValueAtTime(.34,now+.008);master.gain.exponentialRampToValueAtTime(.105,now+.14);master.gain.exponentialRampToValueAtTime(.0001,now+Math.max(.28,d));
 filter.connect(master);master.connect(c.destination);hammer(c,now);
 [[1,'triangle',.72,0],[2,'sine',.16,-3],[3,'sine',.075,2],[4,'sine',.035,5]].forEach(([mul,type,vol,detune])=>{const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=n[2]*mul;o.detune.value=detune;g.gain.value=vol;o.connect(g);g.connect(filter);o.start(now);o.stop(now+Math.max(.3,d)+.06)});
 const k=overlay&&$(`.p61-key[data-note="${id}"]`,overlay);if(k){k.classList.add(visual);setTimeout(()=>k.classList.remove(visual),Math.min(700,Math.max(220,d*650)))}
}
function clearTimers(){timers.forEach(clearTimeout);timers=[];targetEvents=[];step=0;if(!overlay)return;const board=$('.p61-piano',overlay);board?.classList.remove('user-turn');$$('.p61-key',overlay).forEach(k=>k.classList.remove('guide','demo','played'));progress(0,0,'Pronto')}
function msg(t){const e=overlay&&$('#p61Msg',overlay);if(e)e.textContent=t}
function progress(done,total,label){if(!overlay)return;const p=$('#p61Progress',overlay),bar=$('#p61BarFill',overlay);if(p)p.textContent=total?`${done}/${total}`:label||'—';if(bar)bar.style.width=total?`${Math.max(0,Math.min(100,done/total*100))}%`:'0%'}
function guide(id){if(!overlay)return;const board=$('.p61-piano',overlay),k=$(`.p61-key[data-note="${id}"]`,overlay);if(!board||!k)return;board.classList.add('user-turn');$$('.p61-key',board).forEach(x=>x.classList.remove('guide','demo'));k.classList.add('guide')}
function demoKey(id){if(!overlay)return;const board=$('.p61-piano',overlay),k=$(`.p61-key[data-note="${id}"]`,overlay);board?.classList.remove('user-turn');$$('.p61-key',board).forEach(x=>x.classList.remove('guide','demo'));k?.classList.add('demo')}
function setMode(m){clearTimers();mode=m;if(!overlay)return;$$('[data-p61-mode]',overlay).forEach(b=>b.classList.toggle('active',b.dataset.p61Mode===m));$('#p61Songs',overlay).classList.toggle('show',m==='song');$('#p61Start',overlay).textContent=m==='song'?'▶ Ouvir música':m==='repeat'?'▶ Criar sequência':'🎹 Explorar';msg({free:'Explore o teclado livremente.',notes:'Toque uma tecla para descobrir a nota e a oitava.',repeat:'Ouça a sequência em ciano e repita quando ficar magenta.',song:'Escolha uma música e acompanhe o ritmo real das notas.'}[m]);progress(0,0,'Pronto')}
function normalizeEvents(input){return input.map(x=>typeof x==='string'?ev(x,1):x)}
function playSequence(input,bpm=106){
 clearTimers();ctx();const events=normalizeEvents(input),beatMs=60000/bpm;let elapsed=0;msg('Demonstração: observe as teclas em ciano e escute o ritmo.');progress(0,events.length,'Demo');
 events.forEach((event,i)=>{const durMs=beatMs*event.b;timers.push(setTimeout(()=>{demoKey(event.n);tone(event.n,Math.max(.24,durMs/1000*.82),'demo');progress(i+1,events.length,'Demo')},elapsed));elapsed+=durMs});
 timers.push(setTimeout(()=>{targetEvents=events.map(e=>({...e}));step=0;msg('Sua vez: siga a tecla magenta no mesmo caminho.');progress(0,targetEvents.length,'Sua vez');guide(targetEvents[0]?.n)},elapsed+220));
}
function hit(id){
 tone(id,.7,'played');
 if(mode==='notes'){const n=noteInfo(id);const octave=id.endsWith('5')?'5':'4';msg(`${n[1]}${octave} • ${n[3]==='black'?'semitom / tecla preta':'nota natural'}`);return}
 if((mode==='repeat'||mode==='song')&&targetEvents.length){
   if(id===targetEvents[step].n){step++;progress(step,targetEvents.length,'Sua vez');if(step>=targetEvents.length){msg('✓ Muito bem! Sequência concluída.');targetEvents=[];$('.p61-piano',overlay)?.classList.remove('user-turn');$$('.p61-key',overlay).forEach(k=>k.classList.remove('guide'));return}guide(targetEvents[step].n);msg(`Certo! Continue — ${step}/${targetEvents.length}.`)}
   else{msg(`Quase. Procure a tecla magenta — ${step}/${targetEvents.length}.`);guide(targetEvents[step].n)}
 }
}
function randomSequence(){const pool=['C4','D4','E4','F4','G4','A4'];return Array.from({length:5},()=>ev(pool[Math.floor(Math.random()*pool.length)],1))}
function makeOverlay(){
 if(overlay)return;
 const whites=whiteIds.map(id=>`<button type="button" class="p61-key white" data-note="${id}" aria-label="${noteInfo(id)[1]}"><span>${noteInfo(id)[1]}</span></button>`).join('');
 const blacks=Object.entries(blackPos).map(([id,left])=>`<button type="button" class="p61-key black" data-note="${id}" style="left:${left}%" aria-label="${noteInfo(id)[1]}"><span>♯</span></button>`).join('');
 overlay=document.createElement('div');overlay.className='p61-overlay';
 overlay.innerHTML=`<div class="p61-shell"><header class="p61-top"><div class="p61-brand"><img src="assets/welcome.webp" alt="Tia Tati"><div><strong>Tia Tati • Modo Jovem</strong><small>Portal Music Lab</small></div></div><button type="button" class="p61-close" aria-label="Fechar Piano Lab">×</button></header><div class="p61-hero"><h1>Piano <em>Lab</em> 🎹</h1><p>Ouvir, reconhecer, tocar e repetir — com timbre aprimorado, ritmo musical, coordenação, atenção e memória.</p></div><section class="p61-panel"><div class="p61-chips"><span class="p61-chip">🎼 notas</span><span class="p61-chip">👂 ouvido</span><span class="p61-chip">🧠 memória</span><span class="p61-chip">🤲 coordenação</span></div><div class="p61-modes"><button type="button" class="p61-mode active" data-p61-mode="free">Explorar</button><button type="button" class="p61-mode" data-p61-mode="notes">Notas</button><button type="button" class="p61-mode" data-p61-mode="repeat">Repita</button><button type="button" class="p61-mode" data-p61-mode="song">Música guiada</button></div><div class="p61-songs" id="p61Songs"><button type="button" class="p61-song active" data-song="scale">Escala de Dó</button><button type="button" class="p61-song" data-song="twinkle">Brilha, Brilha</button><button type="button" class="p61-song" data-song="joy">Ode à Alegria</button></div><div class="p61-status"><div class="p61-msg" id="p61Msg" aria-live="polite">Explore o teclado livremente.</div><div class="p61-progress" id="p61Progress">Pronto</div><div class="p61-bar"><i id="p61BarFill"></i></div></div><div class="p61-legend"><span><i class="p61-dot demo"></i>Ciano = observe e escute</span><span><i class="p61-dot you"></i>Magenta = sua vez</span></div><div class="p61-stage"><div class="p61-piano">${whites}${blacks}</div></div><div class="p61-actions"><button type="button" class="p61-btn primary" id="p61Start">🎹 Explorar</button><button type="button" class="p61-btn" id="p61Stop">■ Parar guia</button></div><div class="p61-lessons"><div class="p61-lesson"><strong>1. Escute</strong><small>Perceba altura, duração e direção do som.</small></div><div class="p61-lesson"><strong>2. Observe</strong><small>Associe o nome da nota à tecla e à oitava.</small></div><div class="p61-lesson"><strong>3. Repita</strong><small>Transforme som e ritmo em sequência motora.</small></div></div></section></div>`;
 document.body.appendChild(overlay);
 $('.p61-close',overlay).addEventListener('click',close);
 $$('[data-p61-mode]',overlay).forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.p61Mode)));
 $$('[data-song]',overlay).forEach(b=>b.addEventListener('click',()=>{selectedSong=b.dataset.song;$$('[data-song]',overlay).forEach(x=>x.classList.toggle('active',x===b));msg(`${songs[selectedSong].name} selecionada.`);progress(0,0,'Pronto')}));
 $$('.p61-key',overlay).forEach(k=>k.addEventListener('click',()=>hit(k.dataset.note)));
 $('#p61Start',overlay).addEventListener('click',()=>{if(mode==='repeat'){playSequence(randomSequence(),104);return}if(mode==='song'){const s=songs[selectedSong];playSequence(s.events,s.bpm);return}msg(mode==='notes'?'Toque uma tecla para descobrir nota e oitava.':'Explore o teclado livremente.');progress(0,0,'Livre')});
 $('#p61Stop',overlay).addEventListener('click',()=>{clearTimers();msg('Guia interrompido. Você pode continuar tocando livremente.')});
}
function open(){makeOverlay();overlay.classList.add('open');document.body.style.overflow='hidden';setMode('free')}
function close(){clearTimers();if(overlay)overlay.classList.remove('open');document.body.style.overflow=''}
function createCard(){
 const g=$('.youth-card-grid');if(!g||g.querySelector('[data-piano-portal]'))return false;
 const b=document.createElement('button');b.type='button';b.className='youth-card';b.dataset.pianoPortal='61';
 b.innerHTML=`<span class="youth-card-art p61-card-art"><img src="assets/jovem-v27/piano-lab.svg?v=61" alt="Piano Lab" decoding="async"><em>PIANO LAB</em></span><span class="youth-card-copy"><strong>Piano Lab</strong><small>Notas • ouvido • ritmo • coordenação</small></span><span class="youth-card-go">Abrir →</span>`;
 b.addEventListener('click',open);
 const physical=g.querySelector('[data-youth-physical]');physical?g.insertBefore(b,physical):g.appendChild(b);return true;
}
function install(){addStyle();createCard()}
install();[300,800,1500].forEach(t=>setTimeout(install,t));window.addEventListener('tia:jovem-modules-ready',install);
})();