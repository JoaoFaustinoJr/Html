(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_CLASSIC_V2__)return;
window.__TIA_TATI_TANGRAM_CLASSIC_V2__=true;

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';

/* Mesma geometria do Tangram Educativo validado anteriormente. */
const defs={
 L1:{type:'large',name:'Triângulo grande',color:'#ff5f6d',pts:[[0,0],[110,0],[0,110]]},
 L2:{type:'large',name:'Triângulo grande',color:'#ff9f43',pts:[[0,0],[110,0],[0,110]]},
 M:{type:'medium',name:'Triângulo médio',color:'#ffd93d',pts:[[0,0],[78,0],[0,78]]},
 S1:{type:'small',name:'Triângulo pequeno',color:'#6bff95',pts:[[0,0],[55,0],[0,55]]},
 S2:{type:'small',name:'Triângulo pequeno',color:'#3dd6ff',pts:[[0,0],[55,0],[0,55]]},
 Q:{type:'square',name:'Quadrado',color:'#7c83ff',pts:[[0,0],[54,0],[54,54],[0,54]]},
 P:{type:'para',name:'Paralelogramo',color:'#d66bff',pts:[[18,0],[82,0],[64,50],[0,50]]}
};

const starts={
 L1:{x:35,y:420,r:0},L2:{x:165,y:420,r:0},M:{x:300,y:430,r:0},
 S1:{x:410,y:440,r:0},S2:{x:490,y:440,r:0},Q:{x:575,y:435,r:0},P:{x:675,y:438,r:0}
};

/* Figuras simples já usadas no Tangram Educativo, mantendo as posições originais. */
const figures={
 house:{
  label:'Casa',emoji:'🏠',hint:'Monte primeiro o telhado.',
  solution:{
   L1:{x:350,y:165,r:315},L2:{x:470,y:165,r:225},M:{x:410,y:260,r:0},
   S1:{x:360,y:340,r:0},S2:{x:495,y:340,r:90},Q:{x:425,y:320,r:0},P:{x:480,y:270,r:90}
  }
 },
 rocket:{
  label:'Foguete',emoji:'🚀',hint:'Procure o eixo vertical.',
  solution:{
   L1:{x:420,y:80,r:45},L2:{x:420,y:190,r:225},M:{x:435,y:295,r:45},
   S1:{x:355,y:355,r:315},S2:{x:515,y:355,r:135},Q:{x:420,y:255,r:45},P:{x:445,y:365,r:90}
  }
 },
 cat:{
  label:'Gato',emoji:'🐈',hint:'Use os triângulos pequenos nas orelhas.',
  solution:{
   L1:{x:390,y:245,r:315},L2:{x:490,y:245,r:225},M:{x:435,y:170,r:45},
   S1:{x:395,y:130,r:225},S2:{x:495,y:130,r:315},Q:{x:445,y:245,r:45},P:{x:550,y:300,r:315}
  }
 },
 bird:{
  label:'Pássaro',emoji:'🐦',hint:'Comece pelas peças grandes do corpo.',
  solution:{
   L1:{x:320,y:210,r:315},L2:{x:490,y:210,r:225},M:{x:420,y:245,r:45},
   S1:{x:540,y:150,r:45},S2:{x:585,y:195,r:225},Q:{x:445,y:275,r:45},P:{x:375,y:330,r:0}
  }
 }
};

const css=`
.tt-tangram-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-tangram-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-classic,.tt-classic *{box-sizing:border-box}
.tt-classic{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-classic.open{display:block}
.ttc-shell{width:min(100%,680px);margin:auto;min-height:100dvh;padding:3px}
.ttc-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.97);border:1px solid #deebf0;border-radius:14px;padding:6px 8px}
.ttc-top strong{display:block;color:#0c4384;font-size:.98rem}.ttc-top small{display:block;color:#71889a;font-size:.6rem}
.ttc-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.ttc-panel{background:#fff;border:1px solid #e0ecf1;border-radius:15px;padding:7px;margin-top:5px;box-shadow:0 7px 18px #173d7110}
.ttc-figures{display:flex;justify-content:center;gap:5px;flex-wrap:wrap;margin-bottom:6px}
.ttc-fig{border:0;border-radius:999px;padding:6px 9px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.63rem}
.ttc-fig.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.ttc-hint{text-align:center;color:#6e8293;font-size:.62rem;margin-bottom:4px}
.ttc-board-wrap{position:relative;width:100%;height:min(57vh,430px);min-height:320px;border:2px dashed #cfe2ec;border-radius:14px;background:#fbfeff;overflow:hidden}
.ttc-board{width:100%;height:100%;display:block;touch-action:none;user-select:none}
.ttc-target{fill:#374151;stroke:none;opacity:.72;pointer-events:none}
.ttc-solution{stroke:#fff;stroke-width:2;pointer-events:none}
.ttc-piece{cursor:grab;filter:drop-shadow(0 3px 5px rgba(35,80,110,.22))}
.ttc-piece.selected{filter:drop-shadow(0 0 8px rgba(38,146,220,.9))}
.ttc-model-banner{display:none;position:absolute;top:7px;left:50%;transform:translateX(-50%);z-index:4;background:rgba(14,65,103,.92);color:#fff;border-radius:999px;padding:5px 9px;font-size:.59rem;font-weight:900}.ttc-model-banner.show{display:block}
.ttc-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:6px}
.ttc-actions button{border:0;border-radius:11px;padding:7px 2px;font-weight:900;font-size:.58rem}
.ttc-rot,.ttc-flip,.ttc-model{background:#eef6fa;color:#315c7a}.ttc-reset{background:#fff0f5;color:#a83a68}
.ttc-status{text-align:center;min-height:22px;margin-top:5px;color:#54758d;font-size:.65rem;font-weight:800}
@media(max-width:600px){.ttc-shell{padding:2px}.ttc-panel{padding:5px}.ttc-board-wrap{height:330px;min-height:330px}.ttc-fig{padding:5px 7px;font-size:.58rem}.ttc-actions button{font-size:.54rem;padding:6px 1px}}
`;

let overlay=null,current='house',pieces={},selected='L1',drag=null,showingModel=false,modelTimer=null;

function addStyle(){if($('#ttClassicStyle'))return;const s=document.createElement('style');s.id='ttClassicStyle';s.textContent=css;document.head.appendChild(s)}
function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=.9;speechSynthesis.speak(u)}catch(_){}}
function make(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
function fmt(a){return a.map(p=>p.join(',')).join(' ')}

function addCard(){
 const g=$('.home-v22-missions');if(!g)return false;
 let b=g.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');
 if(!b){b=document.createElement('button');b.type='button';b.className='home-v22-mission tt-new-game-card tt-tangram-card';g.appendChild(b)}
 b.dataset.newGame='tangram';b.className='home-v22-mission tt-new-game-card tt-tangram-card';
 b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Tangram da Tia Tati"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Casa • foguete • gato • pássaro</small></span></span><em>Nova missão</em>';
 b.onclick=open;return true;
}

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-classic';
 overlay.innerHTML='<div class="ttc-shell"><div class="ttc-top"><div><strong>Tangram da Tia Tati</strong><small>7 peças clássicas • figuras simples</small></div><button class="ttc-close">×</button></div><section class="ttc-panel"><div class="ttc-figures"></div><div class="ttc-hint"></div><div class="ttc-board-wrap"><div class="ttc-model-banner">👁️ Modelo</div><svg class="ttc-board" viewBox="250 40 500 500" preserveAspectRatio="xMidYMid meet"></svg></div><div class="ttc-actions"><button class="ttc-rot ttc-left">↺<br>45°</button><button class="ttc-rot ttc-right">↻<br>45°</button><button class="ttc-flip">⇋<br>Espelhar</button><button class="ttc-model">👁️<br>Modelo</button><button class="ttc-reset">↺<br>Recomeçar</button></div><div class="ttc-status"></div></section></div>';
 document.body.appendChild(overlay);
 $('.ttc-close',overlay).onclick=close;$('.ttc-left',overlay).onclick=()=>rotate(-45);$('.ttc-right',overlay).onclick=()=>rotate(45);$('.ttc-flip',overlay).onclick=flip;$('.ttc-model',overlay).onclick=showModel;$('.ttc-reset',overlay).onclick=reset;
 buildButtons();reset();
}

function buildButtons(){
 const box=$('.ttc-figures',overlay);box.innerHTML='';
 Object.entries(figures).forEach(([key,f])=>{const b=document.createElement('button');b.type='button';b.className='ttc-fig'+(key===current?' active':'');b.textContent=f.emoji+' '+f.label;b.onclick=()=>{current=key;$$('.ttc-fig',overlay).forEach(x=>x.classList.toggle('active',x===b));reset();speak(f.label)};box.appendChild(b)});
}

function target(svg){
 Object.entries(figures[current].solution).forEach(([id,s])=>svg.appendChild(make('polygon',{points:fmt(defs[id].pts),class:'ttc-target',transform:`translate(${s.x} ${s.y}) rotate(${s.r})`})));
}
function solution(svg){
 Object.entries(figures[current].solution).forEach(([id,s])=>svg.appendChild(make('polygon',{points:fmt(defs[id].pts),class:'ttc-solution',fill:defs[id].color,transform:`translate(${s.x} ${s.y}) rotate(${s.r})`})));
}
function render(){
 const svg=$('.ttc-board',overlay);svg.innerHTML='';target(svg);if(showingModel)solution(svg);
 Object.keys(defs).forEach(id=>{const s=pieces[id],g=make('g',{class:'ttc-piece '+(selected===id?'selected':''),transform:`translate(${s.x} ${s.y}) rotate(${s.r})`});const v=make('polygon',{points:fmt(defs[id].pts),fill:defs[id].color,stroke:'#fff','stroke-width':2});const h=make('polygon',{points:fmt(defs[id].pts),fill:'transparent',stroke:'transparent','stroke-width':18,'pointer-events':'all'});g.appendChild(v);g.appendChild(h);svg.appendChild(g);g.addEventListener('pointerdown',e=>begin(e,id));g.addEventListener('dblclick',()=>speak(defs[id].name))});
}
function reset(){clearTimeout(modelTimer);showingModel=false;pieces={};Object.keys(starts).forEach(id=>pieces[id]={...starts[id]});selected='L1';drag=null;$('.ttc-model-banner',overlay)?.classList.remove('show');$('.ttc-hint',overlay).textContent=figures[current].hint;$('.ttc-status',overlay).textContent='Arraste as sete peças para preencher a silhueta.';render()}
function svgPt(e){const svg=$('.ttc-board',overlay),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function begin(e,id){if(showingModel)return;e.preventDefault();selected=id;const q=svgPt(e),p=pieces[id];drag={id,dx:q.x-p.x,dy:q.y-p.y,el:e.currentTarget};try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){};$$('.ttc-piece',overlay).forEach(x=>x.classList.remove('selected'));e.currentTarget.classList.add('selected')}
function move(e){if(!drag)return;e.preventDefault();const q=svgPt(e),p=pieces[drag.id];p.x=q.x-drag.dx;p.y=q.y-drag.dy;if(drag.el?.isConnected)drag.el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r})`)}
function end(){drag=null}
window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);
function refresh(){const el=$('.ttc-piece.selected',overlay),p=pieces[selected];if(el&&p)el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r})`)}
function rotate(d){if(!pieces[selected]||showingModel)return;pieces[selected].r=(pieces[selected].r+d+360)%360;refresh()}
function flip(){/* Paralelogramo pode ser espelhado; para esta versão infantil, girar resolve os quatro modelos validados. */ if(selected==='P')speak('Para estas figuras, gire o paralelogramo até encontrar a posição.')}
function showModel(){if(showingModel)return;showingModel=true;$('.ttc-model-banner',overlay).classList.add('show');render();speak('Observe o modelo.');clearTimeout(modelTimer);modelTimer=setTimeout(()=>{showingModel=false;$('.ttc-model-banner',overlay).classList.remove('show');render();$('.ttc-status',overlay).textContent='Agora tente montar sozinho.'},2600)}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden';speak('Escolha uma figura para montar.')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');if(!b)return false;b.dataset.newGame='tangram';b.onclick=open;return true}

addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();