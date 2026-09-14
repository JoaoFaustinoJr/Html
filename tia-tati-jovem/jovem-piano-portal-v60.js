(()=>{
'use strict';
if(window.__TIA_TATI_PIANO_PORTAL_V60__)return;
window.__TIA_TATI_PIANO_PORTAL_V60__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let audioCtx=null,overlay=null,timers=[];
let mode='free',targetSeq=[],step=0,selectedSong='scale';

const notes=[
 ['C4','Dó',261.63,'white'],['Cs4','Dó♯',277.18,'black'],['D4','Ré',293.66,'white'],['Ds4','Ré♯',311.13,'black'],
 ['E4','Mi',329.63,'white'],['F4','Fá',349.23,'white'],['Fs4','Fá♯',369.99,'black'],['G4','Sol',392.00,'white'],
 ['Gs4','Sol♯',415.30,'black'],['A4','Lá',440.00,'white'],['As4','Lá♯',466.16,'black'],['B4','Si',493.88,'white'],['C5','Dó',523.25,'white']
];
const whiteIds=['C4','D4','E4','F4','G4','A4','B4','C5'];
const blackPos={Cs4:9.2,Ds4:21.7,Fs4:46.6,Gs4:59.1,As4:71.6};
const songs={
 scale:{name:'Escala de Dó',seq:whiteIds},
 twinkle:{name:'Brilha, Brilha',seq:['C4','C4','G4','G4','A4','A4','G4','F4','F4','E4','E4','D4','D4','C4']},
 joy:{name:'Ode à Alegria',seq:['E4','E4','F4','G4','G4','F4','E4','D4','C4','C4','D4','E4','E4','D4','D4']}
};

function addStyle(){
 if($('#pianoPortal60Style'))return;
 const s=document.createElement('style');
 s.id='pianoPortal60Style';
 s.textContent=`
#screen-home [data-piano-portal]{overflow:hidden}
#screen-home [data-piano-portal] .p60-card-art{position:relative;display:block;width:100%;aspect-ratio:2.88/1;overflow:hidden;background:linear-gradient(145deg,#071633,#141b59 58%,#35105e)}
#screen-home [data-piano-portal] .p60-card-art img{width:100%;height:100%;display:block;object-fit:cover}
#screen-home [data-piano-portal] .p60-card-art em{position:absolute;left:9px;top:7px;z-index:3;color:#fff;font-size:.46rem;font-style:normal;font-weight:950;letter-spacing:.08em;text-shadow:0 2px 7px rgba(0,0,0,.9)}
.p60-overlay,.p60-overlay *{box-sizing:border-box}
.p60-overlay{position:fixed;z-index:510000;inset:0;display:none;background:radial-gradient(circle at 22% 0,rgba(44,199,255,.16),transparent 32%),linear-gradient(180deg,#06112c,#090f25 58%,#11112c);color:#eefaff;overflow:auto;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
.p60-overlay.open{display:block}
.p60-shell{width:min(1100px,100%);margin:auto;padding:12px}
.p60-top{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 14px;border:1px solid rgba(78,231,255,.24);background:#0b183bdd;border-radius:20px;position:sticky;top:6px;z-index:20}
.p60-brand{display:flex;align-items:center;gap:10px}.p60-brand img{width:42px;height:42px;border-radius:13px;object-fit:cover}.p60-brand small{display:block;color:#6eeeff;font-weight:800}
.p60-close{border:1px solid #ffffff26;background:#ffffff10;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.45rem}
.p60-hero{text-align:center;padding:14px 8px}.p60-hero h1{margin:0;font-size:clamp(1.6rem,5vw,2.6rem)}.p60-hero h1 em{font-style:normal;color:#52e9ff}.p60-hero p{margin:6px auto 0;color:#aec6e8;max-width:720px}
.p60-panel{border:1px solid rgba(78,231,255,.22);background:linear-gradient(145deg,#0b183ddd,#0c1634e8);border-radius:24px;padding:14px}
.p60-chips,.p60-modes,.p60-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.p60-chip,.p60-mode,.p60-btn,.p60-song{border:1px solid #50e6ff38;background:#10234c;color:#dff9ff;border-radius:999px;padding:10px 14px;font-weight:900}
.p60-mode.active,.p60-btn.primary,.p60-song.active{background:linear-gradient(90deg,#13bfe8,#a93ee6);color:#fff;border-color:transparent}
.p60-songs{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}.p60-songs.show{display:grid}
.p60-song{border-radius:14px}.p60-msg{text-align:center;margin:10px 0;padding:10px 12px;border-radius:14px;background:#101f45;color:#d7efff;font-weight:850;min-height:42px}
.p60-stage{margin-top:12px;padding:18px 10px 12px;border-radius:22px;background:linear-gradient(180deg,#020712,#101a30);overflow-x:auto}
.p60-piano{position:relative;display:flex;width:min(930px,100%);min-width:690px;height:300px;margin:auto}
.p60-key{touch-action:manipulation}.p60-key.white{position:relative;flex:1;border:1px solid #9aa9ba;background:linear-gradient(180deg,#fff,#e6edf5 72%,#cbd6e2);border-radius:0 0 11px 11px;color:#0c1830;box-shadow:inset 0 -9px 0 #b7c2cf,0 8px 14px #0008;z-index:1}
.p60-key.black{position:absolute;top:0;width:6.7%;height:59%;z-index:4;background:linear-gradient(180deg,#070b15,#202a40 78%,#070b15);border:1px solid #43516d;border-radius:0 0 8px 8px;color:#fff}
.p60-key span{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);font-weight:950}.p60-key.black span{bottom:9px;font-size:.65rem}.p60-key.on{box-shadow:0 0 0 4px #fff,0 0 0 9px #45eaff,0 0 34px #45eaff!important;z-index:8}.p60-piano.has-guide .p60-key:not(.guide){opacity:.42}.p60-key.guide{box-shadow:0 0 0 4px #fff,0 0 0 10px #ff4fa8,0 0 34px #ff4fa8!important;z-index:9}
.p60-lessons{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}.p60-lesson{background:#111f42;border:1px solid #53e6ff30;border-radius:16px;padding:11px}.p60-lesson strong{display:block;color:#62edff}.p60-lesson small{color:#b9cde9}
@media(max-width:720px){.p60-lessons{grid-template-columns:1fr}.p60-songs{grid-template-columns:1fr}.p60-piano{height:245px}.p60-shell{padding:8px}.p60-top{top:4px}.p60-stage{padding-left:4px;padding-right:4px}}
`;
 document.head.appendChild(s);
}

function noteInfo(id){return notes.find(n=>n[0]===id)}
function ctx(){
 if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 if(audioCtx.state==='suspended')audioCtx.resume();
 return audioCtx;
}
function tone(id,d=.72){
 const n=noteInfo(id);if(!n)return;
 const c=ctx(),now=c.currentTime,g=c.createGain();
 g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.34,now+.01);g.gain.exponentialRampToValueAtTime(.11,now+.17);g.gain.exponentialRampToValueAtTime(.0001,now+d);
 g.connect(c.destination);
 [[1,'triangle',.78],[2,'sine',.17],[3,'sine',.06]].forEach(([mul,type,vol])=>{const o=c.createOscillator(),og=c.createGain();o.type=type;o.frequency.value=n[2]*mul;og.gain.value=vol;o.connect(og);og.connect(g);o.start(now);o.stop(now+d+.05)});
 const k=overlay&&$(`.p60-key[data-note="${id}"]`,overlay);if(k){k.classList.add('on');setTimeout(()=>k.classList.remove('on'),220)}
}
function clearTimers(){timers.forEach(clearTimeout);timers=[];if(!overlay)return;$('.p60-piano',overlay)?.classList.remove('has-guide');$$('.p60-key',overlay).forEach(k=>k.classList.remove('guide'))}
function msg(t){const e=overlay&&$('#p60Msg',overlay);if(e)e.textContent=t}
function guide(id){
 if(!overlay)return;const board=$('.p60-piano',overlay),k=$(`.p60-key[data-note="${id}"]`,overlay);if(!board||!k)return;
 board.classList.add('has-guide');$$('.p60-key',board).forEach(x=>x.classList.remove('guide'));k.classList.add('guide');
}
function setMode(m){
 clearTimers();mode=m;targetSeq=[];step=0;
 if(!overlay)return;
 $$('[data-p60-mode]',overlay).forEach(b=>b.classList.toggle('active',b.dataset.p60Mode===m));
 $('#p60Songs',overlay).classList.toggle('show',m==='song');
 $('#p60Start',overlay).textContent=m==='song'?'▶ Ouvir música':m==='repeat'?'▶ Criar sequência':'🎹 Explorar';
 msg({free:'Explore o teclado livremente.',notes:'Toque uma tecla para descobrir a nota.',repeat:'Ouça a sequência e depois repita.',song:'Escolha uma música e toque em Ouvir música.'}[m]);
}
function playSequence(seq){
 clearTimers();ctx();targetSeq=[];step=0;msg('Ouça e observe as teclas…');
 seq.forEach((id,i)=>timers.push(setTimeout(()=>{tone(id,.55);guide(id)},i*620)));
 timers.push(setTimeout(()=>{targetSeq=[...seq];step=0;msg('Agora é sua vez. Siga a tecla iluminada.');guide(targetSeq[0]);},seq.length*620+250));
}
function hit(id){
 tone(id);
 if(mode==='notes'){
   const n=noteInfo(id);msg(`${n[1]} • ${n[3]==='black'?'semitom / tecla preta':'nota natural'}`);return;
 }
 if((mode==='repeat'||mode==='song')&&targetSeq.length){
   if(id===targetSeq[step]){
     step++;
     if(step>=targetSeq.length){msg('✓ Muito bem! Sequência concluída.');targetSeq=[];$('.p60-piano',overlay).classList.remove('has-guide');$$('.p60-key',overlay).forEach(k=>k.classList.remove('guide'));return;}
     guide(targetSeq[step]);msg('Certo. Próxima nota…');
   }else{msg('Quase. Toque a tecla iluminada.');guide(targetSeq[step]);}
 }
}
function randomSequence(){
 const pool=['C4','D4','E4','F4','G4','A4'];
 return Array.from({length:5},()=>pool[Math.floor(Math.random()*pool.length)]);
}
function makeOverlay(){
 if(overlay)return;
 const whites=whiteIds.map(id=>`<button type="button" class="p60-key white" data-note="${id}" aria-label="${noteInfo(id)[1]}"><span>${noteInfo(id)[1]}</span></button>`).join('');
 const blacks=Object.entries(blackPos).map(([id,left])=>`<button type="button" class="p60-key black" data-note="${id}" style="left:${left}%" aria-label="${noteInfo(id)[1]}"><span>♯</span></button>`).join('');
 overlay=document.createElement('div');overlay.className='p60-overlay';
 overlay.innerHTML=`<div class="p60-shell"><header class="p60-top"><div class="p60-brand"><img src="assets/welcome.webp" alt="Tia Tati"><div><strong>Tia Tati • Modo Jovem</strong><small>Portal Music Lab</small></div></div><button type="button" class="p60-close" aria-label="Fechar Piano Lab">×</button></header><div class="p60-hero"><h1>Piano <em>Lab</em> 🎹</h1><p>Ouvir, reconhecer, tocar e repetir — com notas reais e atividades curtas de coordenação, atenção e memória musical.</p></div><section class="p60-panel"><div class="p60-chips"><span class="p60-chip">🎼 notas</span><span class="p60-chip">👂 ouvido</span><span class="p60-chip">🧠 memória</span><span class="p60-chip">🤲 coordenação</span></div><div class="p60-modes"><button type="button" class="p60-mode active" data-p60-mode="free">Explorar</button><button type="button" class="p60-mode" data-p60-mode="notes">Notas</button><button type="button" class="p60-mode" data-p60-mode="repeat">Repita</button><button type="button" class="p60-mode" data-p60-mode="song">Música guiada</button></div><div class="p60-songs" id="p60Songs"><button type="button" class="p60-song active" data-song="scale">Escala de Dó</button><button type="button" class="p60-song" data-song="twinkle">Brilha, Brilha</button><button type="button" class="p60-song" data-song="joy">Ode à Alegria</button></div><div class="p60-msg" id="p60Msg">Explore o teclado livremente.</div><div class="p60-stage"><div class="p60-piano">${whites}${blacks}</div></div><div class="p60-actions"><button type="button" class="p60-btn primary" id="p60Start">🎹 Explorar</button><button type="button" class="p60-btn" id="p60Stop">■ Parar guia</button></div><div class="p60-lessons"><div class="p60-lesson"><strong>1. Escute</strong><small>Perceba se o som sobe ou desce.</small></div><div class="p60-lesson"><strong>2. Observe</strong><small>Associe o nome da nota à tecla.</small></div><div class="p60-lesson"><strong>3. Repita</strong><small>Transforme som em sequência motora.</small></div></div></section></div>`;
 document.body.appendChild(overlay);
 $('.p60-close',overlay).addEventListener('click',close);
 $$('[data-p60-mode]',overlay).forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.p60Mode)));
 $$('[data-song]',overlay).forEach(b=>b.addEventListener('click',()=>{selectedSong=b.dataset.song;$$('[data-song]',overlay).forEach(x=>x.classList.toggle('active',x===b));msg(`${songs[selectedSong].name} selecionada.`)}));
 $$('.p60-key',overlay).forEach(k=>k.addEventListener('click',()=>hit(k.dataset.note)));
 $('#p60Start',overlay).addEventListener('click',()=>{
   if(mode==='repeat'){playSequence(randomSequence());return;}
   if(mode==='song'){playSequence(songs[selectedSong].seq);return;}
   msg(mode==='notes'?'Toque uma tecla e descubra a nota.':'Explore o teclado livremente.');
 });
 $('#p60Stop',overlay).addEventListener('click',()=>{clearTimers();targetSeq=[];step=0;msg('Guia interrompido. Você pode continuar tocando livremente.');});
}
function open(){makeOverlay();overlay.classList.add('open');document.body.style.overflow='hidden';setMode('free')}
function close(){clearTimers();targetSeq=[];step=0;if(overlay)overlay.classList.remove('open');document.body.style.overflow=''}
function createCard(){
 const g=$('.youth-card-grid');if(!g||g.querySelector('[data-piano-portal]')||g.querySelector('[data-jlab="piano-lab"]'))return false;
 const b=document.createElement('button');b.type='button';b.className='youth-card';b.dataset.pianoPortal='1';b.setAttribute('aria-label','Abrir Piano Lab');
 b.innerHTML=`<span class="youth-card-art p60-card-art"><img src="assets/jovem-v27/piano-lab.svg?v=60" alt="Piano Lab" decoding="async"><em>PIANO LAB</em></span><span class="youth-card-copy"><strong>Piano Lab</strong><small>Notas • ouvido • coordenação • memória</small></span><span class="youth-card-go">Abrir →</span>`;
 b.addEventListener('click',open);
 const anchor=g.querySelector('[data-youth-breathe]')||g.querySelector('[data-youth-physical]');
 if(anchor)g.insertBefore(b,anchor);else g.appendChild(b);
 return true;
}
function install(){addStyle();createCard()}
install();[250,700,1400,2500].forEach(t=>setTimeout(install,t));
window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(install,720));
})();