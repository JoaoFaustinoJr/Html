(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_SIMPLE__)return;
window.__TIA_TATI_TANGRAM_SIMPLE__=true;

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';

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
 L1:{x:15,y:515,r:0,flip:1},L2:{x:170,y:515,r:0,flip:1},M:{x:430,y:540,r:0,flip:1},
 S1:{x:565,y:548,r:0,flip:1},S2:{x:685,y:548,r:0,flip:1},Q:{x:555,y:648,r:0,flip:1},P:{x:725,y:645,r:0,flip:1}
};

/* Modelos simples clássicos. Todos usam exatamente as 7 peças. */
const figures={
 house:{
  label:'Casa',emoji:'🏠',
  solution:{
   L1:{x:350,y:165,r:315,flip:1},L2:{x:470,y:165,r:225,flip:1},M:{x:410,y:260,r:0,flip:1},
   S1:{x:360,y:340,r:0,flip:1},S2:{x:495,y:340,r:90,flip:1},Q:{x:425,y:320,r:0,flip:1},P:{x:480,y:270,r:90,flip:1}
  }
 },
 boat:{
  label:'Barco',emoji:'⛵',
  solution:{
   S2:{x:320,y:45,r:0,flip:1},S1:{x:320,y:225,r:270,flip:1},M:{x:380,y:165,r:270,flip:1},
   L2:{x:380,y:45,r:0,flip:1},P:{x:320,y:105,r:90,flip:1},L1:{x:740,y:45,r:90,flip:1},Q:{x:320,y:165,r:0,flip:1}
  }
 },
 rabbit:{
  label:'Coelho',emoji:'🐇',
  solution:{
   L1:{x:430,y:275,r:315,flip:1},L2:{x:530,y:275,r:225,flip:1},M:{x:480,y:190,r:45,flip:1},
   S1:{x:460,y:80,r:315,flip:1},S2:{x:530,y:105,r:225,flip:1},Q:{x:475,y:285,r:45,flip:1},P:{x:610,y:330,r:315,flip:1}
  }
 },
 duck:{
  label:'Pato',emoji:'🦆',
  solution:{
   S2:{x:470,y:285,r:0,flip:1},M:{x:650,y:405,r:180,flip:1},L1:{x:650,y:405,r:180,flip:1},
   Q:{x:410,y:345,r:0,flip:1},P:{x:470,y:225,r:90,flip:1},L2:{x:650,y:45,r:90,flip:1},S1:{x:410,y:285,r:90,flip:1}
  }
 }
};

const css=`
.tt-tangram-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-tangram-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-simple-tangram,.tt-simple-tangram *{box-sizing:border-box}
.tt-simple-tangram{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-simple-tangram.open{display:block}
.tt-st-shell{width:min(100%,720px);margin:auto;min-height:100dvh;padding:4px}
.tt-st-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.97);border:1px solid #deebf0;border-radius:16px;padding:7px 9px;box-shadow:0 7px 20px #173d7112}
.tt-st-top strong{display:block;color:#0c4384;font-size:1rem}.tt-st-top small{display:block;color:#71889a;font-size:.61rem}
.tt-st-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.tt-st-card{background:#fff;border:1px solid #e0ecf1;border-radius:18px;padding:8px;margin-top:6px;box-shadow:0 7px 20px #173d7112}
.tt-st-intro{display:flex;gap:9px;align-items:center}.tt-st-intro img{width:88px;height:66px;object-fit:cover;border-radius:12px}.tt-st-intro h1{font-size:1.08rem;margin:0;color:#0b4382}.tt-st-intro p{font-size:.66rem;margin:2px 0;color:#6e8293}
.tt-st-figures{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px}
.tt-st-figure{border:0;border-radius:999px;padding:7px 9px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.65rem}
.tt-st-figure.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.tt-st-help{font-size:.65rem;color:#6e8293;text-align:center;margin-bottom:5px}
.tt-st-board-wrap{position:relative;width:100%;height:min(53vh,390px);min-height:300px;border:2px dashed #cfe2ec;border-radius:16px;background:linear-gradient(180deg,#fbfeff,#fffafd);overflow:hidden}
.tt-st-board{width:100%;height:100%;display:block;touch-action:none;user-select:none}
.tt-st-target{fill:#d4d8dc;stroke:none;opacity:.78;pointer-events:none}
.tt-st-solution-piece{stroke:#fff;stroke-width:3;opacity:.95;pointer-events:none}
.tt-st-piece{cursor:grab;filter:drop-shadow(0 4px 5px rgba(35,80,110,.25))}
.tt-st-piece.selected{filter:drop-shadow(0 0 9px rgba(255,255,255,.98))}
.tt-st-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:6px}
.tt-st-actions button{border:0;border-radius:12px;padding:8px 3px;font-weight:900;font-size:.61rem}
.tt-st-rot,.tt-st-flip,.tt-st-model{background:#eef6fa;color:#315c7a}.tt-st-reset{background:#fff0f5;color:#a83a68}.tt-st-done{background:#ffd34d;color:#6b5200}
.tt-st-status{text-align:center;min-height:24px;margin-top:6px;color:#54758d;font-size:.68rem;font-weight:800}
.tt-st-model-banner{display:none;position:absolute;top:7px;left:50%;transform:translateX(-50%);z-index:4;background:rgba(14,65,103,.92);color:#fff;border-radius:999px;padding:6px 10px;font-size:.61rem;font-weight:900}.tt-st-model-banner.show{display:block}
@media(max-width:600px){
 .tt-st-shell{padding:2px}.tt-st-top{padding:6px 7px;border-radius:13px}
 .tt-st-card{padding:6px;border-radius:14px}.tt-st-intro img{width:74px;height:56px}.tt-st-intro h1{font-size:1rem}.tt-st-intro p{font-size:.59rem}
 .tt-st-board-wrap{height:315px;min-height:315px}
 .tt-st-figure{padding:6px 8px;font-size:.6rem}.tt-st-actions button{padding:7px 2px;font-size:.56rem}
}
`;

let overlay=null,current='house',pieces={},selected='L1',drag=null,modelTimer=null,showingModel=false;

function addStyle(){if($('#ttSimpleTangramStyle'))return;const s=document.createElement('style');s.id='ttSimpleTangramStyle';s.textContent=css;document.head.appendChild(s)}
function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=.9;u.pitch=1.06;speechSynthesis.speak(u)}catch(_){}}
function make(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
function fmtPts(a){return a.map(p=>p.join(',')).join(' ')}

function addCard(){
 const g=$('.home-v22-missions');if(!g)return false;
 let b=g.querySelector('[data-new-game="mosaic"],[data-new-game="tangram"]');
 if(!b){b=document.createElement('button');b.type='button';b.className='home-v22-mission tt-new-game-card tt-tangram-card';g.appendChild(b)}
 b.dataset.newGame='tangram';b.classList.remove('tt-mosaic-card');b.classList.add('tt-tangram-card');
 b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Tangram da Tia Tati" decoding="async"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Figuras • formas • percepção espacial</small><span class="tt-level-strip"><span>⭐ Casa</span><span>⭐⭐ Barco</span></span></span></span><em>Nova missão</em>';
 b.onclick=open;return true;
}

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-simple-tangram';
 overlay.innerHTML='<div class="tt-st-shell"><div class="tt-st-top"><div><strong>Tangram da Tia Tati</strong><small>7 peças • figuras simples</small></div><button class="tt-st-close">×</button></div><section class="tt-st-card tt-st-intro"><img src="'+CARD+'" alt="Tangram da Tia Tati"><div><h1>Escolha uma figura</h1><p>Arraste as sete peças para montar a silhueta. Há botão para ver o modelo por alguns segundos.</p></div></section><section class="tt-st-card"><div class="tt-st-figures"></div><div class="tt-st-help">Toque numa peça para selecionar. Use os botões para girar ou espelhar.</div><div class="tt-st-board-wrap"><div class="tt-st-model-banner">👁️ Modelo</div><svg class="tt-st-board" viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid meet"></svg></div><div class="tt-st-actions"><button class="tt-st-rot tt-st-left">↺<br>45°</button><button class="tt-st-rot tt-st-right">↻<br>45°</button><button class="tt-st-flip">⇋<br>Espelhar</button><button class="tt-st-model">👁️<br>Modelo</button><button class="tt-st-reset">↺<br>Recomeçar</button></div><button class="tt-st-done" style="width:100%;margin-top:6px;border:0;border-radius:12px;padding:9px;font-weight:900">⭐ Terminei</button><div class="tt-st-status">Monte a figura usando as sete peças.</div></section></div>';
 document.body.appendChild(overlay);
 $('.tt-st-close',overlay).onclick=close;
 $('.tt-st-left',overlay).onclick=()=>rotate(-45);$('.tt-st-right',overlay).onclick=()=>rotate(45);
 $('.tt-st-flip',overlay).onclick=flip;$('.tt-st-model',overlay).onclick=showModel;$('.tt-st-reset',overlay).onclick=reset;
 $('.tt-st-done',overlay).onclick=()=>{const f=figures[current];$('.tt-st-status',overlay).textContent='🌟 Muito bem! Você terminou o '+f.label+'.';speak('Muito bem! Você terminou o '+f.label+'.')};
 buildFigureButtons();reset();
}

function buildFigureButtons(){
 const box=$('.tt-st-figures',overlay);box.innerHTML='';
 Object.entries(figures).forEach(([key,f])=>{const b=document.createElement('button');b.type='button';b.className='tt-st-figure'+(key===current?' active':'');b.textContent=f.emoji+' '+f.label;b.onclick=()=>{current=key;$$('.tt-st-figure',overlay).forEach(x=>x.classList.toggle('active',x===b));reset();speak(f.label)};box.appendChild(b)});
}

function target(svg){
 const sol=figures[current].solution;
 Object.entries(sol).forEach(([id,s])=>{const p=make('polygon',{points:fmtPts(defs[id].pts),class:'tt-st-target',transform:`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.flip} 1)`});svg.appendChild(p)});
}
function solution(svg){
 const sol=figures[current].solution;
 Object.entries(sol).forEach(([id,s])=>{const p=make('polygon',{points:fmtPts(defs[id].pts),class:'tt-st-solution-piece',fill:defs[id].color,transform:`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.flip} 1)`});svg.appendChild(p)});
}
function render(){
 const svg=$('.tt-st-board',overlay);svg.innerHTML='';target(svg);if(showingModel)solution(svg);
 Object.keys(defs).forEach(id=>{const s=pieces[id],g=make('g',{class:'tt-st-piece '+(selected===id?'selected':''),transform:`translate(${s.x} ${s.y}) rotate(${s.r}) scale(${s.flip} 1)`});const v=make('polygon',{points:fmtPts(defs[id].pts),fill:defs[id].color,stroke:'#fff','stroke-width':3,'stroke-linejoin':'round'});const h=make('polygon',{points:fmtPts(defs[id].pts),fill:'transparent',stroke:'transparent','stroke-width':20,'pointer-events':'all'});g.appendChild(v);g.appendChild(h);svg.appendChild(g);g.addEventListener('pointerdown',e=>begin(e,id));g.addEventListener('click',()=>{selected=id;$$('.tt-st-piece',overlay).forEach(x=>x.classList.remove('selected'));g.classList.add('selected')});g.addEventListener('dblclick',()=>speak(defs[id].name))});
}
function reset(){
 clearTimeout(modelTimer);showingModel=false;$('.tt-st-model-banner',overlay)?.classList.remove('show');
 pieces={};Object.keys(starts).forEach(id=>pieces[id]={...starts[id]});selected='L1';drag=null;render();
 $('.tt-st-status',overlay).textContent='Monte '+figures[current].label+' usando as sete peças.';
}
function svgPt(e){const svg=$('.tt-st-board',overlay),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function begin(e,id){if(showingModel)return;e.preventDefault();selected=id;const q=svgPt(e),p=pieces[id];drag={id,dx:q.x-p.x,dy:q.y-p.y,el:e.currentTarget};try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){};$$('.tt-st-piece',overlay).forEach(x=>x.classList.remove('selected'));e.currentTarget.classList.add('selected')}
function move(e){if(!drag)return;e.preventDefault();const q=svgPt(e),p=pieces[drag.id];p.x=q.x-drag.dx;p.y=q.y-drag.dy;if(drag.el?.isConnected)drag.el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.flip} 1)`)}
function end(){drag=null}
window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);
function refreshSelected(){const el=$('.tt-st-piece.selected',overlay),p=pieces[selected];if(el&&p)el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r}) scale(${p.flip} 1)`)}
function rotate(d){if(!pieces[selected]||showingModel)return;pieces[selected].r=(pieces[selected].r+d+360)%360;refreshSelected()}
function flip(){if(!pieces[selected]||showingModel)return;pieces[selected].flip*=-1;refreshSelected()}
function showModel(){
 if(showingModel)return;showingModel=true;$('.tt-st-model-banner',overlay).classList.add('show');render();speak('Observe o modelo.');
 clearTimeout(modelTimer);modelTimer=setTimeout(()=>{showingModel=false;$('.tt-st-model-banner',overlay).classList.remove('show');render();$('.tt-st-status',overlay).textContent='Agora tente montar sozinho.'},2500);
}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden';speak('Escolha uma figura para montar.')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="mosaic"],[data-new-game="tangram"]');if(!b)return false;b.dataset.newGame='tangram';b.onclick=open;return true}

addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();