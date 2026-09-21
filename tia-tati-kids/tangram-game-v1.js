(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_GAME__)return;
window.__TIA_TATI_TANGRAM_GAME__=true;

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';
const NS='http://www.w3.org/2000/svg';

const defs={
 L1:{name:'Triângulo grande',color:'#ff5f6d',pts:[[0,0],[0,240],[120,120]]},
 L2:{name:'Triângulo grande',color:'#ff9f43',pts:[[0,120],[240,120],[120,0]]},
 M:{name:'Triângulo médio',color:'#ffd93d',pts:[[0,0],[120,0],[120,120]]},
 S1:{name:'Triângulo pequeno',color:'#6bff95',pts:[[0,0],[120,0],[60,60]]},
 S2:{name:'Triângulo pequeno',color:'#3dd6ff',pts:[[60,0],[60,120],[0,60]]},
 Q:{name:'Quadrado',color:'#7c83ff',pts:[[0,60],[60,0],[120,60],[60,120]]},
 P:{name:'Paralelogramo',color:'#d66bff',pts:[[0,0],[120,0],[180,60],[60,60]]}
};

const starts={
 L1:{x:40,y:515,r:0,flip:1},L2:{x:185,y:515,r:0,flip:1},M:{x:445,y:545,r:0,flip:1},
 S1:{x:585,y:555,r:0,flip:1},S2:{x:705,y:555,r:0,flip:1},Q:{x:580,y:650,r:0,flip:1},P:{x:755,y:650,r:0,flip:1}
};

/* Casa e Foguete reaproveitam os modelos clássicos do Tangram Educativo.
   Castelo segue a mesma gramática geométrica: 7 peças reais, rotações de 45° e solução demonstrável. */
const challenges={
 house:{
  label:'Casa',emoji:'🏠',
  hint:'Comece pelo telhado com os triângulos grandes.',
  solution:{
   L1:{x:350,y:165,r:315,flip:1},L2:{x:470,y:165,r:225,flip:1},M:{x:410,y:260,r:0,flip:1},
   S1:{x:360,y:340,r:0,flip:1},S2:{x:495,y:340,r:90,flip:1},Q:{x:425,y:320,r:0,flip:1},P:{x:480,y:270,r:90,flip:1}
  }
 },
 rocket:{
  label:'Foguete',emoji:'🚀',
  hint:'Procure o eixo vertical. A ponta do foguete é um triângulo grande.',
  solution:{
   L1:{x:420,y:80,r:45,flip:1},L2:{x:420,y:190,r:225,flip:1},M:{x:435,y:295,r:45,flip:1},
   S1:{x:355,y:355,r:315,flip:1},S2:{x:515,y:355,r:135,flip:1},Q:{x:420,y:255,r:45,flip:1},P:{x:445,y:365,r:90,flip:1}
  }
 },
 castle:{
  label:'Castelo',emoji:'🏰',
  hint:'Monte primeiro as duas torres com os triângulos grandes e feche o centro com as peças menores.',
  solution:{
   L1:{x:325,y:255,r:315,flip:1},L2:{x:505,y:255,r:225,flip:1},M:{x:415,y:175,r:45,flip:1},
   S1:{x:345,y:125,r:225,flip:1},S2:{x:535,y:125,r:315,flip:1},Q:{x:430,y:265,r:45,flip:1},P:{x:430,y:350,r:0,flip:1}
  }
 },
 free:{label:'Livre',emoji:'✨',hint:'Monte o que imaginar.',solution:null}
};

const css=`
.tt-tangram-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-tangram-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-tangram-overlay,.tt-tangram-overlay *{box-sizing:border-box}
.tt-tangram-overlay{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-tangram-overlay.open{display:block}
.tt-tangram-shell{width:min(100%,720px);margin:auto;min-height:100dvh;padding:4px}
.tt-tangram-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.97);backdrop-filter:blur(8px);border:1px solid #deebf0;border-radius:16px;padding:6px 9px;box-shadow:0 7px 20px #173d7112}
.tt-tangram-brand strong{display:block;color:#0c4384;font-size:.98rem}.tt-tangram-brand small{display:block;color:#71889a;font-size:.58rem}
.tt-tangram-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.tt-tangram-hero{margin:5px 0;padding:6px;border-radius:17px;background:#fff;border:1px solid #e3edf2;box-shadow:0 6px 18px #173d7110}
.tt-tangram-hero img{width:100%;max-height:105px;object-fit:cover;object-position:center 11%;border-radius:12px}
.tt-tangram-hero h1{margin:5px 3px 0;color:#0b4382;font-size:1.15rem}
.tt-tangram-hero p{margin:1px 3px 3px;color:#6e8293;font-size:.64rem}
.tt-tangram-modes{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:5px 0}
.tt-tangram-mode{border:0;border-radius:14px;padding:8px 5px;font-weight:950;font-size:.73rem}
.tt-tangram-mode.learn{background:#f54b91;color:white}.tt-tangram-mode.build{background:#279eea;color:white}
.tt-tangram-panel{background:#fff;border:1px solid #e0ecf1;border-radius:17px;padding:7px;box-shadow:0 7px 20px #173d7112}
.tt-tangram-head{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:6px}
.tt-tangram-head strong{color:#143f77;font-size:.95rem}
.tt-tangram-all{border:0;border-radius:999px;padding:6px 9px;background:#eef8ff;color:#0d5f9a;font-weight:900;font-size:.68rem}
.tt-shape-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.tt-shape-card{border:0;border-radius:13px;background:linear-gradient(145deg,#f8fbff,#fff7fb);padding:6px;min-height:94px;text-align:center;color:#1c4676;font-weight:900}
.tt-shape-card svg{width:58px;height:50px;display:block;margin:0 auto 4px}
.tt-shape-card small{display:block;font-size:.56rem;line-height:1.12}
.tt-tangram-spoken{margin-top:7px;padding:7px;border-radius:12px;background:linear-gradient(135deg,#fff2f7,#eefaff);text-align:center;font-weight:900;color:#214f7d;min-height:34px;font-size:.68rem}
.tt-build-area{display:none}.tt-build-area.active{display:block}.tt-learn-area.hidden{display:none}
.tt-challenges{display:flex;gap:5px;flex-wrap:wrap;margin:2px 0 6px}
.tt-challenge{border:0;border-radius:999px;padding:6px 8px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.64rem}
.tt-challenge.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.tt-build-hint{text-align:center;font-size:.64rem;color:#71889a;margin-bottom:5px}
.tt-board-wrap{position:relative;width:100%;height:min(49vh,350px);min-height:260px;border:2px dashed #cfe2ec;border-radius:16px;background:linear-gradient(180deg,#fbfeff,#fffafd);overflow:hidden}
.tt-build-board{width:100%;height:100%;display:block;touch-action:none;user-select:none}
.tt-target{fill:#dff2fb;stroke:#80c9ef;stroke-width:6;stroke-linejoin:round;opacity:.75;pointer-events:none}
.tt-piece{cursor:grab;filter:drop-shadow(0 4px 5px rgba(35,80,110,.25))}
.tt-piece.selected{filter:drop-shadow(0 0 8px rgba(255,255,255,.95))}
.tt-build-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:6px}
.tt-build-actions button{border:0;border-radius:12px;padding:7px 4px;font-weight:900;font-size:.61rem}
.tt-left,.tt-right,.tt-flip,.tt-sample{background:#eef6fa;color:#315c7a}.tt-build-reset{background:#fff0f5;color:#a83a68}
.tt-complete{margin-top:5px;text-align:center;font-size:.66rem;color:#54758d;min-height:20px}
.tt-sample-banner{display:none;position:absolute;top:8px;left:50%;transform:translateX(-50%);z-index:4;background:rgba(14,65,103,.93);color:#fff;border-radius:999px;padding:6px 10px;font-size:.62rem;font-weight:900}.tt-sample-banner.show{display:block}
@media(max-width:600px){
 .tt-tangram-shell{padding:2px}.tt-tangram-top{border-radius:13px;padding:5px 7px}
 .tt-tangram-hero{padding:5px;border-radius:14px}.tt-tangram-hero img{max-height:86px}
 .tt-tangram-hero h1{font-size:1.05rem}.tt-tangram-hero p{font-size:.59rem}
 .tt-tangram-mode{padding:7px 4px;font-size:.68rem}
 .tt-tangram-panel{padding:6px;border-radius:14px}
 .tt-shape-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}
 .tt-shape-card{min-height:84px;padding:5px}.tt-shape-card svg{width:52px;height:44px}
 .tt-board-wrap{height:300px;min-height:300px}
 .tt-build-actions button{padding:7px 2px;font-size:.57rem}
 .tt-challenge{padding:5px 7px;font-size:.59rem}
}
`;

function addStyle(){if($('#ttTangramStyle'))return;const s=document.createElement('style');s.id='ttTangramStyle';s.textContent=css;document.head.appendChild(s)}
function speak(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.88;u.pitch=1.08;speechSynthesis.speak(u)}catch(_){}}
function fmtPts(a){return a.map(p=>p.join(',')).join(' ')}
function make(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
function transformed(id,pieceState=pieces[id]){const d=defs[id],a=pieceState.r*Math.PI/180;return d.pts.map(([x,y])=>{x*=pieceState.flip;return[pieceState.x+x*Math.cos(a)-y*Math.sin(a),pieceState.y+x*Math.sin(a)+y*Math.cos(a)]})}

function addCard(){const g=$('.home-v22-missions');if(!g||g.querySelector('[data-new-game="tangram"]'))return false;const b=document.createElement('button');b.type='button';b.className='home-v22-mission tt-new-game-card tt-tangram-card';b.dataset.newGame='tangram';b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Tangram da Tia Tati" decoding="async"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Formas • percepção espacial • coordenação</small><span class="tt-level-strip"><span>⭐ Explorar</span><span>⭐⭐ Montar</span></span></span></span><em>Nova missão</em>';g.appendChild(b);b.onclick=open;return true}

let overlay=null,current='house',pieces={},selected='L1',drag=null,sampleActive=false,sampleTimer=null,savedSample=null;

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-tangram-overlay';
 overlay.innerHTML='<div class="tt-tangram-shell"><div class="tt-tangram-top"><div class="tt-tangram-brand"><strong>Tangram da Tia Tati</strong><small>Formas • percepção espacial • coordenação</small></div><button class="tt-tangram-close">×</button></div><section class="tt-tangram-hero"><img src="'+CARD+'" alt="Tangram da Tia Tati"><h1>Tangram da Tia Tati</h1><p>Conheça as sete peças e depois monte figuras de verdade.</p></section><div class="tt-tangram-modes"><button class="tt-tangram-mode learn">🔷 Conhecer</button><button class="tt-tangram-mode build">🧩 Montar</button></div><section class="tt-tangram-panel"><div class="tt-learn-area"><div class="tt-tangram-head"><strong>Peças do Tangram</strong><button class="tt-tangram-all">🔊 Ouvir todas</button></div><div class="tt-shape-grid"></div><div class="tt-tangram-spoken">Toque em uma peça para ouvir o nome.</div></div><div class="tt-build-area"><div class="tt-tangram-head"><strong>Escolha um desafio</strong></div><div class="tt-challenges"></div><div class="tt-build-hint"></div><div class="tt-board-wrap"><div class="tt-sample-banner">👁️ Amostra de solução</div><svg class="tt-build-board" viewBox="240 40 520 470" preserveAspectRatio="xMidYMid meet"></svg></div><div class="tt-build-actions"><button class="tt-left">↺<br>45°</button><button class="tt-right">↻<br>45°</button><button class="tt-flip">⇋<br>Espelhar</button><button class="tt-sample">👁️<br>Amostra</button><button class="tt-build-reset">↺<br>Recomeçar</button></div><div class="tt-complete"></div></div></section></div>';
 document.body.appendChild(overlay);
 $('.tt-tangram-close',overlay).onclick=close;
 $('.tt-tangram-mode.learn',overlay).onclick=()=>mode('learn');
 $('.tt-tangram-mode.build',overlay).onclick=()=>mode('build');
 $('.tt-tangram-all',overlay).onclick=()=>{speak('Triângulo grande. Triângulo grande. Triângulo médio. Triângulo pequeno. Triângulo pequeno. Quadrado. Paralelogramo.')};
 $('.tt-left',overlay).onclick=()=>rotate(-45);$('.tt-right',overlay).onclick=()=>rotate(45);$('.tt-flip',overlay).onclick=flip;$('.tt-sample',overlay).onclick=showSample;$('.tt-build-reset',overlay).onclick=resetBoard;
 buildLearn();buildChallenges();resetBoard();
}

function buildLearn(){
 const grid=$('.tt-shape-grid',overlay);grid.innerHTML='';
 Object.entries(defs).forEach(([id,d])=>{const b=document.createElement('button');b.className='tt-shape-card';b.type='button';const svg=make('svg',{viewBox:'-10 -10 260 260'}),p=make('polygon',{points:fmtPts(d.pts),fill:d.color,stroke:'#fff','stroke-width':4});svg.appendChild(p);b.appendChild(svg);const sm=document.createElement('small');sm.textContent=d.name;b.appendChild(sm);b.onclick=()=>{speak(d.name);$('.tt-tangram-spoken',overlay).textContent=d.name+' 🔊'};grid.appendChild(b)});
}

function buildChallenges(){
 const box=$('.tt-challenges',overlay);box.innerHTML='';
 Object.entries(challenges).forEach(([key,c])=>{const b=document.createElement('button');b.type='button';b.className='tt-challenge'+(key===current?' active':'');b.textContent=c.emoji+' '+c.label;b.onclick=()=>{current=key;$$('.tt-challenge',overlay).forEach(x=>x.classList.toggle('active',x===b));resetBoard();speak('Desafio '+c.label)};box.appendChild(b)});
}

function resetBoard(){
 clearTimeout(sampleTimer);sampleActive=false;savedSample=null;
 pieces={};Object.keys(starts).forEach(id=>pieces[id]={...starts[id]});selected='L1';
 $('.tt-sample-banner',overlay)?.classList.remove('show');
 const c=challenges[current];$('.tt-build-hint',overlay).textContent=c.hint;$('.tt-complete',overlay).textContent=current==='free'?'Modo livre: monte o que imaginar.':'Use as sete peças. Toque duas vezes numa peça para ouvir o nome.';
 renderBoard();
}

function renderTarget(svg){
 const c=challenges[current];if(!c.solution)return;
 /* A silhueta é a união visual das sete peças da solução; sem desenho inventado. */
 Object.entries(c.solution).forEach(([id,state])=>{const poly=make('polygon',{points:fmtPts(transformed(id,state)),class:'tt-target'});svg.appendChild(poly)});
}
function renderBoard(){
 const svg=$('.tt-build-board',overlay);svg.innerHTML='';renderTarget(svg);
 Object.keys(defs).forEach(id=>{const st=pieces[id],g=make('g',{class:'tt-piece '+(selected===id?'selected':''),transform:`translate(${st.x} ${st.y}) rotate(${st.r}) scale(${st.flip} 1)`});const vis=make('polygon',{points:fmtPts(defs[id].pts),fill:defs[id].color,stroke:'#fff','stroke-width':3,'stroke-linejoin':'round'});const hit=make('polygon',{points:fmtPts(defs[id].pts),fill:'transparent',stroke:'transparent','stroke-width':20,'pointer-events':'all'});g.appendChild(vis);g.appendChild(hit);svg.appendChild(g);g.addEventListener('pointerdown',e=>begin(e,id));g.addEventListener('dblclick',()=>speak(defs[id].name));g.addEventListener('click',()=>{selected=id;renderBoard()})});
}
function svgPt(e){const svg=$('.tt-build-board',overlay),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function begin(e,id){if(sampleActive)return;e.preventDefault();selected=id;const q=svgPt(e),p=pieces[id];drag={id,dx:q.x-p.x,dy:q.y-p.y,pointerId:e.pointerId};try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){};renderBoard()}
function move(e){if(!drag)return;e.preventDefault();const q=svgPt(e),p=pieces[drag.id];p.x=q.x-drag.dx;p.y=q.y-drag.dy;renderBoard()}
function end(){drag=null}
window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);
function rotate(d){if(!pieces[selected]||sampleActive)return;pieces[selected].r=(pieces[selected].r+d+360)%360;renderBoard()}
function flip(){if(!pieces[selected]||sampleActive)return;pieces[selected].flip*=-1;renderBoard()}
function showSample(){
 const c=challenges[current];if(!c.solution||sampleActive)return;
 sampleActive=true;savedSample={};Object.keys(pieces).forEach(id=>savedSample[id]={...pieces[id]});
 pieces={};Object.entries(c.solution).forEach(([id,s])=>pieces[id]={...s});$('.tt-sample-banner',overlay).classList.add('show');renderBoard();speak('Observe a amostra. Depois tente montar do seu jeito.');
 clearTimeout(sampleTimer);sampleTimer=setTimeout(()=>{pieces={};Object.keys(savedSample).forEach(id=>pieces[id]={...savedSample[id]});sampleActive=false;$('.tt-sample-banner',overlay).classList.remove('show');renderBoard();$('.tt-complete',overlay).textContent='Agora tente montar do seu jeito.'},2600);
}

function mode(m){const learn=$('.tt-learn-area',overlay),build=$('.tt-build-area',overlay);if(m==='learn'){learn.classList.remove('hidden');build.classList.remove('active');speak('Vamos conhecer as formas do tangram.')}else{learn.classList.add('hidden');build.classList.add('active');resetBoard();speak('Escolha uma figura para montar.')}}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden';mode('learn')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="tangram"]');if(!b)return false;b.onclick=open;return true}
addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();