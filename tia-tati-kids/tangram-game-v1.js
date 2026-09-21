(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_GAME__)return;
window.__TIA_TATI_TANGRAM_GAME__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';

const pieces=[
 {id:'lg1',name:'Triângulo grande',c:'#ff4f86',clip:'polygon(0 100%,100% 100%,100% 0)',w:86,h:74},
 {id:'lg2',name:'Triângulo grande',c:'#249cff',clip:'polygon(0 0,100% 100%,0 100%)',w:86,h:74},
 {id:'md',name:'Triângulo médio',c:'#ff922b',clip:'polygon(0 100%,50% 0,100% 100%)',w:72,h:62},
 {id:'sm1',name:'Triângulo pequeno',c:'#ffd43b',clip:'polygon(0 100%,100% 100%,0 0)',w:58,h:50},
 {id:'sm2',name:'Triângulo pequeno',c:'#4dabf7',clip:'polygon(0 0,100% 100%,0 100%)',w:58,h:50},
 {id:'sq',name:'Quadrado',c:'#69db7c',clip:'polygon(0 0,100% 0,100% 100%,0 100%)',w:58,h:58},
 {id:'pg',name:'Paralelogramo',c:'#b197fc',clip:'polygon(25% 0,100% 0,75% 100%,0 100%)',w:78,h:52}
];

const challenges={
 house:{
   label:'Casa',emoji:'🏠',
   guide:'polygon(16% 82%,16% 42%,31% 42%,50% 18%,69% 42%,84% 42%,84% 82%)'
 },
 castle:{
   label:'Castelo',emoji:'🏰',
   guide:'polygon(14% 82%,14% 40%,26% 40%,26% 28%,38% 28%,38% 40%,48% 40%,48% 24%,58% 24%,58% 40%,70% 40%,70% 28%,82% 28%,82% 82%)'
 },
 rocket:{
   label:'Foguete',emoji:'🚀',
   guide:'polygon(50% 10%,68% 30%,68% 66%,78% 82%,60% 76%,50% 90%,40% 76%,22% 82%,32% 66%,32% 30%)'
 },
 free:{label:'Livre',emoji:'✨',guide:null}
};

const css=`
.tt-tangram-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-tangram-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-tangram-overlay,.tt-tangram-overlay *{box-sizing:border-box}
.tt-tangram-overlay{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-tangram-overlay.open{display:block}
.tt-tangram-shell{width:min(100%,720px);margin:auto;min-height:100dvh;padding:6px}
.tt-tangram-top{position:sticky;top:0;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.96);backdrop-filter:blur(10px);border:1px solid #deebf0;border-radius:18px;padding:7px 10px;box-shadow:0 7px 20px #173d7112}
.tt-tangram-brand strong{display:block;color:#0c4384;font-size:1rem}.tt-tangram-brand small{display:block;color:#71889a;font-size:.6rem}
.tt-tangram-close{width:38px;height:38px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.3rem;font-weight:950}
.tt-tangram-hero{margin:6px 0;padding:7px;border-radius:19px;background:#fff;border:1px solid #e3edf2;box-shadow:0 7px 20px #173d7110}
.tt-tangram-hero img{width:100%;max-height:155px;object-fit:cover;object-position:center 12%;border-radius:14px}
.tt-tangram-hero h1{margin:6px 3px 0;color:#0b4382;font-size:clamp(1.25rem,5.5vw,1.75rem)}
.tt-tangram-hero p{margin:2px 3px 4px;color:#6e8293;font-size:.72rem}
.tt-tangram-modes{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:7px 0}
.tt-tangram-mode{border:0;border-radius:16px;padding:10px 7px;font-weight:950;font-size:.82rem}
.tt-tangram-mode.learn{background:#f54b91;color:white}.tt-tangram-mode.build{background:#279eea;color:white}
.tt-tangram-panel{background:#fff;border:1px solid #e0ecf1;border-radius:19px;padding:9px;box-shadow:0 8px 22px #173d7112}
.tt-tangram-head{display:flex;align-items:center;justify-content:space-between;gap:7px;margin-bottom:7px}
.tt-tangram-head strong{color:#143f77;font-size:1rem}
.tt-tangram-all{border:0;border-radius:999px;padding:7px 10px;background:#eef8ff;color:#0d5f9a;font-weight:900;font-size:.72rem}
.tt-shape-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
.tt-shape-card{border:0;border-radius:14px;background:linear-gradient(145deg,#f8fbff,#fff7fb);padding:7px;min-height:104px;text-align:center;color:#1c4676;font-weight:900}
.tt-shape-card .shape{width:62px;height:54px;margin:2px auto 5px;filter:drop-shadow(0 4px 5px #1b5b7c20)}
.tt-shape-card small{display:block;font-size:.58rem;line-height:1.15}
.tt-tangram-spoken{margin-top:8px;padding:8px;border-radius:13px;background:linear-gradient(135deg,#fff2f7,#eefaff);text-align:center;font-weight:900;color:#214f7d;min-height:36px;font-size:.72rem}
.tt-build-area{display:none}.tt-build-area.active{display:block}.tt-learn-area.hidden{display:none}
.tt-challenges{display:flex;gap:5px;flex-wrap:wrap;margin:2px 0 7px}
.tt-challenge{border:0;border-radius:999px;padding:7px 9px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.67rem}
.tt-challenge.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.tt-build-hint{text-align:center;font-size:.67rem;color:#71889a;margin-bottom:6px}
.tt-build-board{position:relative;height:310px;min-height:310px;border:2px dashed #cfe2ec;border-radius:18px;background:linear-gradient(180deg,#fbfeff,#fffafd);overflow:hidden;touch-action:none}
.tt-guide{position:absolute;left:50%;top:50%;width:54%;height:62%;transform:translate(-50%,-50%);background:rgba(62,143,212,.10);border:2px dashed rgba(62,143,212,.22);pointer-events:none}
.tt-piece{position:absolute;touch-action:none;cursor:grab;filter:drop-shadow(0 4px 7px #1f5a7b25)}
.tt-build-actions{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-top:7px}
.tt-build-actions button{border:0;border-radius:999px;padding:8px 11px;font-weight:900;font-size:.7rem}
.tt-build-reset{background:#eef6fa;color:#315c7a}.tt-build-speak{background:#f54b91;color:#fff}.tt-build-celebrate{background:#ffd34d;color:#6b5200}
@media(max-width:600px){
 .tt-tangram-shell{padding:3px}
 .tt-tangram-top{border-radius:15px;padding:6px 8px}
 .tt-tangram-hero{padding:6px;border-radius:16px}
 .tt-tangram-hero img{max-height:118px}
 .tt-tangram-hero h1{font-size:1.2rem}.tt-tangram-hero p{font-size:.65rem}
 .tt-tangram-modes{margin:5px 0}.tt-tangram-mode{padding:9px 5px;font-size:.74rem}
 .tt-tangram-panel{padding:7px;border-radius:16px}
 .tt-shape-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
 .tt-shape-card{min-height:92px;padding:6px}.tt-shape-card .shape{width:54px;height:46px}
 .tt-build-board{height:270px;min-height:270px}
 .tt-guide{width:56%;height:60%}
 .tt-challenge{padding:6px 8px;font-size:.62rem}
 .tt-build-actions button{padding:7px 9px;font-size:.64rem}
}
`;

function addStyle(){if($('#ttTangramStyle'))return;const s=document.createElement('style');s.id='ttTangramStyle';s.textContent=css;document.head.appendChild(s)}
function speak(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)}catch(_){}}
function addCard(){const g=$('.home-v22-missions');if(!g||g.querySelector('[data-new-game="tangram"]'))return false;const b=document.createElement('button');b.type='button';b.className='home-v22-mission tt-new-game-card tt-tangram-card';b.dataset.newGame='tangram';b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Tangram da Tia Tati" decoding="async"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Formas • percepção espacial • coordenação</small><span class="tt-level-strip"><span>⭐ Explorar</span><span>⭐⭐ Montar</span></span></span></span><em>Nova missão</em>';g.appendChild(b);b.onclick=open;return true}

let overlay=null,drag=null,dx=0,dy=0,current='house';

function make(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-tangram-overlay';
 overlay.innerHTML='<div class="tt-tangram-shell"><div class="tt-tangram-top"><div class="tt-tangram-brand"><strong>Tangram da Tia Tati</strong><small>Formas • percepção espacial • coordenação</small></div><button class="tt-tangram-close">×</button></div><section class="tt-tangram-hero"><img src="'+CARD+'" alt="Tangram da Tia Tati"><h1>Tangram da Tia Tati</h1><p>Toque nas peças para ouvir o nome ou escolha um desafio simples para montar.</p></section><div class="tt-tangram-modes"><button class="tt-tangram-mode learn">🔷 Conhecer as formas</button><button class="tt-tangram-mode build">🧩 Montar</button></div><section class="tt-tangram-panel"><div class="tt-learn-area"><div class="tt-tangram-head"><strong>Peças do Tangram</strong><button class="tt-tangram-all">🔊 Ouvir todas</button></div><div class="tt-shape-grid"></div><div class="tt-tangram-spoken">Toque em uma peça para ouvir o nome. 💗</div></div><div class="tt-build-area"><div class="tt-tangram-head"><strong>Escolha um desafio</strong></div><div class="tt-challenges"></div><div class="tt-build-hint">Monte uma casa usando as sete peças.</div><div class="tt-build-board"><div class="tt-guide"></div></div><div class="tt-build-actions"><button class="tt-build-reset">↻ Recomeçar</button><button class="tt-build-speak">🔊 Ouvir formas</button><button class="tt-build-celebrate">⭐ Terminei</button></div></div></section></div>';
 document.body.appendChild(overlay);
 $('.tt-tangram-close',overlay).onclick=close;
 $('.tt-tangram-mode.learn',overlay).onclick=()=>mode('learn');
 $('.tt-tangram-mode.build',overlay).onclick=()=>mode('build');
 $('.tt-tangram-all',overlay).onclick=()=>{const names=pieces.map(p=>p.name);speak(names.join('. '));$('.tt-tangram-spoken',overlay).textContent='Triângulos, quadrado e paralelogramo. ✨'};
 buildLearn();buildChallenges();buildBoard();
 $('.tt-build-reset',overlay).onclick=buildBoard;
 $('.tt-build-speak',overlay).onclick=()=>speak('Triângulos grandes, triângulo médio, triângulos pequenos, quadrado e paralelogramo.');
 $('.tt-build-celebrate',overlay).onclick=()=>{speak('Muito bem! Você concluiu o desafio do tangram!');$('.tt-build-hint',overlay).textContent='Muito bem! 🌟 Você concluiu o desafio.'}
}

function buildLearn(){const grid=$('.tt-shape-grid',overlay);grid.innerHTML='';pieces.forEach(p=>{const b=document.createElement('button');b.className='tt-shape-card';b.type='button';b.innerHTML='<div class="shape" style="background:'+p.c+';clip-path:'+p.clip+'"></div><small>'+p.name+'</small>';b.onclick=()=>{speak(p.name);$('.tt-tangram-spoken',overlay).textContent=p.name+' 🔊'};grid.appendChild(b)})}

function buildChallenges(){
 const box=$('.tt-challenges',overlay);box.innerHTML='';
 Object.entries(challenges).forEach(([key,c])=>{const b=document.createElement('button');b.className='tt-challenge'+(key===current?' active':'');b.type='button';b.textContent=c.emoji+' '+c.label;b.onclick=()=>{current=key;$$('.tt-challenge',overlay).forEach(x=>x.classList.toggle('active',x===b));setGuide();buildBoard();speak('Desafio '+c.label)};box.appendChild(b)});
 setGuide();
}

function setGuide(){
 const g=$('.tt-guide',overlay),c=challenges[current];
 if(!c.guide){g.style.display='none'}else{g.style.display='block';g.style.clipPath=c.guide}
 $('.tt-build-hint',overlay).textContent=current==='free'?'Modo livre: monte o que imaginar.':'Desafio: '+c.label+'. Use as sete peças.';
}

function positions(){
 return [{x:8,y:8},{x:100,y:8},{x:192,y:12},{x:10,y:92},{x:76,y:100},{x:142,y:94},{x:208,y:100}]
}

function buildBoard(){
 const board=$('.tt-build-board',overlay);
 $$('.tt-piece',board).forEach(x=>x.remove());
 const compact=window.innerWidth<=600,scale=compact?.82:1;
 positions().forEach((pos,i)=>{const p=pieces[i],el=document.createElement('div');el.className='tt-piece';el.dataset.id=p.id;el.dataset.name=p.name;el.style.background=p.c;el.style.clipPath=p.clip;el.style.width=Math.round(p.w*scale)+'px';el.style.height=Math.round(p.h*scale)+'px';el.style.left=pos.x+'px';el.style.top=pos.y+'px';el.ondblclick=()=>speak(p.name);el.addEventListener('pointerdown',startDrag);board.appendChild(el)});
 setGuide();
}

function startDrag(e){drag=e.currentTarget;const r=drag.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;drag.setPointerCapture?.(e.pointerId);drag.style.zIndex=20;e.preventDefault()}
function moveDrag(e){if(!drag)return;const board=$('.tt-build-board',overlay),r=board.getBoundingClientRect();let x=e.clientX-r.left-dx,y=e.clientY-r.top-dy;x=Math.max(0,Math.min(r.width-drag.offsetWidth,x));y=Math.max(0,Math.min(r.height-drag.offsetHeight,y));drag.style.left=x+'px';drag.style.top=y+'px';e.preventDefault()}
function endDrag(){if(drag){drag.style.zIndex='';drag=null}}
window.addEventListener('pointermove',moveDrag,{passive:false});window.addEventListener('pointerup',endDrag);

function mode(m){const learn=$('.tt-learn-area',overlay),build=$('.tt-build-area',overlay);if(m==='learn'){learn.classList.remove('hidden');build.classList.remove('active');speak('Vamos conhecer as formas do tangram.')}else{learn.classList.add('hidden');build.classList.add('active');buildBoard();speak('Escolha um desafio para montar.')}}

function open(){make();overlay.classList.add('open');document.body.style.overflow='hidden';mode('learn')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="tangram"]');if(!b)return false;b.onclick=open;return true}
addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();