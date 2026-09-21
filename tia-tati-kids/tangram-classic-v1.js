(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_REF_MODELS__)return;
window.__TIA_TATI_TANGRAM_REF_MODELS__=true;

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const CARD='assets/file_0000000025f4820e94bf82c96720553a.png';

const defs={
 L1:{name:'Triângulo grande',color:'#ff5f6d',pts:[[0,0],[110,0],[0,110]]},
 L2:{name:'Triângulo grande',color:'#ff9f43',pts:[[0,0],[110,0],[0,110]]},
 M:{name:'Triângulo médio',color:'#ffd93d',pts:[[0,0],[78,0],[0,78]]},
 S1:{name:'Triângulo pequeno',color:'#6bff95',pts:[[0,0],[55,0],[0,55]]},
 S2:{name:'Triângulo pequeno',color:'#3dd6ff',pts:[[0,0],[55,0],[0,55]]},
 Q:{name:'Quadrado',color:'#7c83ff',pts:[[0,0],[54,0],[54,54],[0,54]]},
 P:{name:'Paralelogramo',color:'#d66bff',pts:[[18,0],[82,0],[64,50],[0,50]]}
};
const starts={
 L1:{x:18,y:410,r:0},L2:{x:145,y:410,r:0},M:{x:285,y:425,r:0},
 S1:{x:390,y:435,r:0},S2:{x:470,y:435,r:0},Q:{x:550,y:430,r:0},P:{x:625,y:432,r:0}
};

const figures={
 casa:{label:'Casa',emoji:'🏠',img:'assets/tangram-model-casa.svg'},
 barco:{label:'Barco',emoji:'⛵',img:'assets/tangram-model-barco.svg'},
 coelho:{label:'Coelho',emoji:'🐇',img:'assets/tangram-model-coelho.svg'},
 pato:{label:'Pato',emoji:'🦆',img:'assets/tangram-model-pato.svg'},
 gato:{label:'Gato',emoji:'🐈',img:'assets/tangram-model-gato.svg'},
 cisne:{label:'Cisne',emoji:'🦢',img:'assets/tangram-model-cisne.svg'},
 cavalo:{label:'Cavalo',emoji:'🐎',img:'assets/tangram-model-cavalo.svg'}
};

const css=`
.tt-tangram-card .home-v22-visual{position:relative;overflow:hidden;background:#fff;min-height:126px}
.tt-tangram-card img{width:100%;height:100%;object-fit:cover;object-position:center 8%;display:block}
.tt-ref-tangram,.tt-ref-tangram *{box-sizing:border-box}
.tt-ref-tangram{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff8fb);color:#173d71}
.tt-ref-tangram.open{display:block}
.ttr-shell{width:min(100%,700px);margin:auto;min-height:100dvh;padding:3px}
.ttr-top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.97);border:1px solid #deebf0;border-radius:14px;padding:6px 8px}
.ttr-top strong{display:block;color:#0c4384;font-size:.98rem}.ttr-top small{display:block;color:#71889a;font-size:.6rem}
.ttr-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.ttr-panel{background:#fff;border:1px solid #e0ecf1;border-radius:15px;padding:7px;margin-top:5px;box-shadow:0 7px 18px #173d7110}
.ttr-figures{display:flex;gap:5px;overflow-x:auto;padding-bottom:4px;margin-bottom:5px}
.ttr-fig{flex:0 0 auto;border:0;border-radius:999px;padding:6px 9px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.63rem}
.ttr-fig.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.ttr-hint{text-align:center;color:#6e8293;font-size:.63rem;margin-bottom:5px}
.ttr-board-wrap{position:relative;width:100%;height:min(58vh,440px);min-height:330px;border:2px dashed #cfe2ec;border-radius:14px;background:#fbfeff;overflow:hidden}
.ttr-board{width:100%;height:100%;display:block;touch-action:none;user-select:none}
.ttr-guide{opacity:.26;pointer-events:none}
.ttr-guide.full{opacity:1}
.ttr-piece{cursor:grab;filter:drop-shadow(0 3px 5px rgba(35,80,110,.22))}
.ttr-piece.selected{filter:drop-shadow(0 0 8px rgba(38,146,220,.9))}
.ttr-actions{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;margin-top:6px}
.ttr-actions button{border:0;border-radius:11px;padding:7px 2px;font-weight:900;font-size:.58rem}
.ttr-rot,.ttr-model{background:#eef6fa;color:#315c7a}.ttr-reset{background:#fff0f5;color:#a83a68}.ttr-done{background:#ffd34d;color:#6b5200}
.ttr-status{text-align:center;min-height:22px;margin-top:5px;color:#54758d;font-size:.65rem;font-weight:800}
@media(max-width:600px){.ttr-shell{padding:2px}.ttr-panel{padding:5px}.ttr-board-wrap{height:340px;min-height:340px}.ttr-fig{padding:5px 7px;font-size:.58rem}.ttr-actions button{font-size:.54rem;padding:6px 1px}}
`;

let overlay=null,current='casa',pieces={},selected='L1',drag=null,fullModel=false;

function addStyle(){if($('#ttRefTangramStyle'))return;const s=document.createElement('style');s.id='ttRefTangramStyle';s.textContent=css;document.head.appendChild(s)}
function speak(t){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='pt-BR';u.rate=.9;speechSynthesis.speak(u)}catch(_){}}
function make(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
function fmt(a){return a.map(p=>p.join(',')).join(' ')}

function addCard(){
 const g=$('.home-v22-missions');if(!g)return false;
 let b=g.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');
 if(!b){b=document.createElement('button');b.type='button';g.appendChild(b)}
 b.dataset.newGame='tangram';b.className='home-v22-mission tt-new-game-card tt-tangram-card';
 b.innerHTML='<span class="home-v22-visual"><img src="'+CARD+'" alt="Tangram da Tia Tati"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Casa • barco • coelho • pato • gato • cisne • cavalo</small></span></span><em>Nova missão</em>';
 b.onclick=open;return true;
}

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-ref-tangram';
 overlay.innerHTML='<div class="ttr-shell"><div class="ttr-top"><div><strong>Tangram da Tia Tati</strong><small>Modelos do quadro enviado • 7 peças</small></div><button class="ttr-close">×</button></div><section class="ttr-panel"><div class="ttr-figures"></div><div class="ttr-hint">Monte a figura observando o modelo.</div><div class="ttr-board-wrap"><svg class="ttr-board" viewBox="0 0 760 540" preserveAspectRatio="xMidYMid meet"></svg></div><div class="ttr-actions"><button class="ttr-rot ttr-left">↺<br>45°</button><button class="ttr-rot ttr-right">↻<br>45°</button><button class="ttr-model">👁️<br>Modelo</button><button class="ttr-reset">↺<br>Recomeçar</button><button class="ttr-done">⭐<br>Terminei</button></div><div class="ttr-status"></div></section></div>';
 document.body.appendChild(overlay);
 $('.ttr-close',overlay).onclick=close;$('.ttr-left',overlay).onclick=()=>rotate(-45);$('.ttr-right',overlay).onclick=()=>rotate(45);$('.ttr-model',overlay).onclick=toggleModel;$('.ttr-reset',overlay).onclick=reset;$('.ttr-done',overlay).onclick=done;
 buildButtons();reset();
}
function buildButtons(){
 const box=$('.ttr-figures',overlay);box.innerHTML='';
 Object.entries(figures).forEach(([key,f])=>{const b=document.createElement('button');b.type='button';b.className='ttr-fig'+(key===current?' active':'');b.textContent=f.emoji+' '+f.label;b.onclick=()=>{current=key;$$('.ttr-fig',overlay).forEach(x=>x.classList.toggle('active',x===b));reset();speak(f.label)};box.appendChild(b)});
}
function render(){
 const svg=$('.ttr-board',overlay);svg.innerHTML='';
 const f=figures[current];
 const img=make('image',{href:f.img,x:250,y:20,width:260,height:260,class:'ttr-guide'+(fullModel?' full':'')});
 svg.appendChild(img);
 Object.keys(defs).forEach(id=>{
  const s=pieces[id],g=make('g',{class:'ttr-piece '+(selected===id?'selected':''),transform:`translate(${s.x} ${s.y}) rotate(${s.r})`});
  const v=make('polygon',{points:fmt(defs[id].pts),fill:defs[id].color,stroke:'#fff','stroke-width':2,'stroke-linejoin':'round'});
  const h=make('polygon',{points:fmt(defs[id].pts),fill:'transparent',stroke:'transparent','stroke-width':18,'pointer-events':'all'});
  g.appendChild(v);g.appendChild(h);svg.appendChild(g);
  g.addEventListener('pointerdown',e=>begin(e,id));g.addEventListener('dblclick',()=>speak(defs[id].name));
 });
}
function reset(){pieces={};Object.keys(starts).forEach(id=>pieces[id]={...starts[id]});selected='L1';drag=null;fullModel=false;$('.ttr-status',overlay).textContent='Modelo: '+figures[current].label+'. Arraste as sete peças.';render()}
function svgPt(e){const svg=$('.ttr-board',overlay),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function begin(e,id){e.preventDefault();selected=id;const q=svgPt(e),p=pieces[id];drag={id,dx:q.x-p.x,dy:q.y-p.y,el:e.currentTarget};try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){};$$('.ttr-piece',overlay).forEach(x=>x.classList.remove('selected'));e.currentTarget.classList.add('selected')}
function move(e){if(!drag)return;e.preventDefault();const q=svgPt(e),p=pieces[drag.id];p.x=q.x-drag.dx;p.y=q.y-drag.dy;if(drag.el?.isConnected)drag.el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r})`)}
function end(){drag=null}
window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);
function refresh(){const el=$('.ttr-piece.selected',overlay),p=pieces[selected];if(el&&p)el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.r})`)}
function rotate(d){if(!pieces[selected])return;pieces[selected].r=(pieces[selected].r+d+360)%360;refresh()}
function toggleModel(){fullModel=!fullModel;render();$('.ttr-status',overlay).textContent=fullModel?'Modelo colorido visível. Observe as peças.':'Modelo suave. Agora tente reproduzir.'}
function done(){const f=figures[current];$('.ttr-status',overlay).textContent='🌟 Muito bem! Você terminou '+f.label+'.';speak('Muito bem! Você terminou '+f.label+'.')}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden';speak('Escolha uma figura para montar.')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';try{speechSynthesis.cancel()}catch(_){}}
function bindCard(){const b=document.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');if(!b)return false;b.dataset.newGame='tangram';b.onclick=open;return true}

addStyle();let tries=0,t=setInterval(()=>{addCard();if(bindCard()||++tries>40)clearInterval(t)},250);
})();