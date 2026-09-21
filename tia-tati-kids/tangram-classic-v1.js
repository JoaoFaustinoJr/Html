(()=>{
'use strict';
if(window.__TIA_TATI_TANGRAM_EXACT__)return;
window.__TIA_TATI_TANGRAM_EXACT__=true;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)], NS='http://www.w3.org/2000/svg';
const MODELS={"casa":[{"id":"teal","pts":[[135,0],[0,124.2],[135,124.2]],"target":[245.9,72.9]},{"id":"blue","pts":[[0,0.3],[0.3,125.4],[130.2,125.4]],"target":[383.7,72.1]},{"id":"yellow","pts":[[0,94.4],[19.3,94.7],[118.8,0],[0.3,0]],"target":[256.1,200]},{"id":"coral","pts":[[157.7,77.1],[81.4,0],[0,77.4]],"target":[279.6,217.3]},{"id":"pink","pts":[[0,0],[65.8,72.3],[65.8,0.3]],"target":[443,200]},{"id":"purple","pts":[[0,0.3],[0,77.4],[60.1,77.4],[80,59],[79.7,0]],"target":[284.1,25]},{"id":"green","pts":[[0,14.5],[77.7,94.7],[144.9,94.4],[144.9,76.9],[74.9,0],[15.3,0]],"target":[363.8,200]}],"barco":[{"id":"teal","pts":[[147.8,81.9],[147.8,0],[0,0.3],[82.2,81.9]],"target":[230,190]},{"id":"blue","pts":[[0,81.6],[65.7,81.9],[148.6,0],[0.3,0]],"target":[381.1,190]},{"id":"yellow1","pts":[[140.3,0],[0,138.4],[70.15,138.4]],"target":[237.8,48.1]},{"id":"yellow2","pts":[[140.3,0],[70.15,138.4],[140.3,138.4]],"target":[237.8,48.1]},{"id":"coral","pts":[[0.3,0],[0,72.2],[72.2,72.2]],"target":[381.4,47.8]},{"id":"pink","pts":[[0.3,0],[0.3,63],[64.3,63]],"target":[448.1,123.5]},{"id":"purple","pts":[[0,0],[0,63],[63.5,63],[63.5,0]],"target":[381.4,123.5]}],"coelho":[{"id":"teal","pts":[[67.5,0],[0,66.3],[67.7,132.3]],"target":[296,140.6]},{"id":"blue","pts":[[0,0.2],[0.5,85.6],[87.8,85.4]],"target":[293.8,209.1]},{"id":"yellow","pts":[[57.8,0],[0,57.1],[57.8,114.2]],"target":[384.6,25]},{"id":"coral","pts":[[0,0],[0.5,108.9],[56.3,54.8]],"target":[366.5,146.8]},{"id":"pink","pts":[[0,0.5],[9.4,52.4],[67.7,63.8]],"target":[332.7,38.6]},{"id":"purple","pts":[[38,0],[0,36],[37.5,73.2],[75.4,37.2]],"target":[364.5,103.7]},{"id":"green","pts":[[0,27.3],[37.7,69.2],[92.1,69],[29,0]],"target":[373.9,225.3]}],"pato":[{"id":"teal","pts":[[0,37.3],[66.9,105.8],[144.4,105.8],[38.1,0]],"target":[296.4,141.4]},{"id":"blue","pts":[[71.5,0],[0,64.4],[31.5,96.8],[71.8,57.1]],"target":[262.9,79.9]},{"id":"yellow","pts":[[0,0.3],[87.3,86.7],[129.4,44.9],[69.3,44.6],[112.6,0.3]],"target":[338,141.1]},{"id":"coral","pts":[[47,0],[0,45.7],[46.8,45.7]],"target":[232.5,25.5]},{"id":"pink","pts":[[52.5,0],[0,0.5],[0.3,53],[52.7,52.7]],"target":[282,25]},{"id":"purple","pts":[[53.6,0],[48.1,0],[0,45.4],[53.6,45.4]],"target":[314.6,249.3]},{"id":"green","pts":[[116.1,0],[63.6,0],[0,64.2],[57.4,64.2]],"target":[411.1,119.9]}],"gato":[{"id":"teal","pts":[[0,0],[0,104.1],[103.9,104.4]],"target":[294.1,190.4]},{"id":"blue","pts":[[0.2,0],[80.3,80.5],[93.3,39.3],[53.5,0]],"target":[321.8,214.2]},{"id":"yellow","pts":[[0,0],[0,53.3],[24.8,78.1],[78.6,78.1]],"target":[294.1,133.5]},{"id":"coral","pts":[[41.5,0],[0,39.8],[40.7,79.8]],"target":[321.5,25.5]},{"id":"pink","pts":[[0.7,0],[0.2,79.8],[41.2,40]],"target":[270,25]},{"id":"purple","pts":[[44.6,0],[0,42.9],[43.2,86.1],[87.8,43.2]],"target":[271.6,64.1]},{"id":"green","pts":[[84.9,0],[32.5,29.7],[0.2,136.2],[54.7,100.5]],"target":[405,158.6]}],"cisne":[{"id":"teal1","pts":[[77.3,0],[0,75.5],[45.7,121.2]],"target":[279.3,149.7]},{"id":"teal2","pts":[[77.3,0],[45.7,121.2],[77.1,121.2]],"target":[279.3,149.7]},{"id":"blue","pts":[[110.7,0],[49.3,0],[0,48],[31.8,79.6]],"target":[419,186.5]},{"id":"yellow","pts":[[0,0],[47,75.5],[74.7,49.1],[46.7,0]],"target":[281.9,97.3]},{"id":"coral","pts":[[47.3,0],[0,46],[47.3,46.2]],"target":[230,49]},{"id":"pink","pts":[[0,0],[57.5,57.5],[116.9,0.5]],"target":[359.7,174.9]},{"id":"purple","pts":[[45.5,0],[0,0.3],[0.5,46.5],[46,46.2]],"target":[280.6,48.8]}],"cavalo":[{"id":"teal","pts":[[34.6,0],[0.8,32.2],[0.5,80.4],[78.8,126.2]],"target":[327.8,90.2]},{"id":"blue","pts":[[23.3,71.5],[93.8,0],[0,0]],"target":[385.6,143.9]},{"id":"yellow","pts":[[31.9,0],[0,30.1],[30.1,60.5],[62.3,30.1]],"target":[298.9,57.7]},{"id":"coral","pts":[[72.5,26.2],[45.8,0],[0,44.3],[52.9,44.3]],"target":[250.8,89.7]},{"id":"pink","pts":[[0.5,0],[0,60.8],[31.4,31.2]],"target":[297.9,25]},{"id":"purple","pts":[[83,21.2],[46.4,0],[0,96.6]],"target":[291.4,179.5]},{"id":"green","pts":[[51.6,0],[0,52.4],[69.4,146.9],[81.4,114.7],[51.1,70.7]],"target":[427.5,147.8]}]};
const LABELS={"casa":["Casa","🏠"],"barco":["Barco","⛵"],"coelho":["Coelho","🐇"],"pato":["Pato","🦆"],"gato":["Gato","🐈"],"cisne":["Cisne","🦢"],"cavalo":["Cavalo","🐎"]};
const COLORS={"teal":"#12CDD7","blue":"#45A8F4","yellow":"#FFD426","coral":"#FF6E62","pink":"#FD69A0","purple":"#8D4CF6","green":"#7BCF49"};
const colorOf=id=>COLORS[id.replace(/[12]$/,'')]||'#4DAAF7';
const css=`
.tt-exact,.tt-exact *{box-sizing:border-box}
.tt-exact{position:fixed;z-index:230100;inset:0;display:none;overflow:auto;background:linear-gradient(180deg,#eefaff,#fff9fb);color:#173d71}
.tt-exact.open{display:block}
.tte-shell{width:min(100%,700px);margin:auto;min-height:100dvh;padding:3px}
.tte-top{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.97);border:1px solid #deebf0;border-radius:14px;padding:6px 8px}
.tte-top strong{display:block;color:#0c4384;font-size:1rem}.tte-top small{display:block;color:#71889a;font-size:.6rem}
.tte-close{width:36px;height:36px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.25rem;font-weight:950}
.tte-panel{background:#fff;border:1px solid #e0ecf1;border-radius:15px;padding:6px;margin-top:5px;box-shadow:0 7px 18px #173d7110}
.tte-tabs{display:flex;gap:5px;overflow-x:auto;padding-bottom:4px;margin-bottom:5px}
.tte-tab{flex:0 0 auto;border:0;border-radius:999px;padding:6px 9px;background:#eef6fa;color:#315c7a;font-weight:900;font-size:.62rem}
.tte-tab.active{background:#dff3ff;color:#0b5ea8;box-shadow:inset 0 0 0 2px #9cd7ff}
.tte-help{text-align:center;color:#6e8293;font-size:.63rem;margin-bottom:5px}
.tte-board-wrap{position:relative;width:100%;height:min(60vh,470px);min-height:350px;border:2px dashed #cfe2ec;border-radius:14px;background:#fbfeff;overflow:hidden}
.tte-board{width:100%;height:100%;display:block;touch-action:none;user-select:none}
.tte-target{opacity:.16;stroke:#557b95;stroke-width:1.4;pointer-events:none}
.tte-target.model{opacity:.92;stroke:#fff;stroke-width:2}
.tte-piece{cursor:grab;filter:drop-shadow(0 3px 5px rgba(35,80,110,.24))}
.tte-piece.locked{filter:none}
.tte-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px}
.tte-actions button{border:0;border-radius:12px;padding:8px 4px;font-weight:900;font-size:.62rem}
.tte-model{background:#eef6fa;color:#315c7a}.tte-reset{background:#fff0f5;color:#a83a68}.tte-next{background:#ffd34d;color:#6b5200}
.tte-status{text-align:center;min-height:22px;margin-top:5px;color:#54758d;font-size:.66rem;font-weight:800}
@media(max-width:600px){.tte-shell{padding:2px}.tte-panel{padding:5px}.tte-board-wrap{height:360px;min-height:360px}.tte-tab{padding:5px 7px;font-size:.58rem}.tte-actions button{font-size:.57rem;padding:7px 2px}}
`;
let overlay=null,current='casa',state=[],drag=null,showModel=false;
function style(){if($('#tteStyle'))return;const s=document.createElement('style');s.id='tteStyle';s.textContent=css;document.head.appendChild(s)}
function speak(t){}catch(_){}}
function mk(tag,a={}){const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));return n}
function pts(a){return a.map(p=>p.join(',')).join(' ')}
function packStart(items){
 const out=[];let x=22,y=355,rowH=0;
 items.forEach((it,i)=>{const w=Math.max(...it.pts.map(p=>p[0])),h=Math.max(...it.pts.map(p=>p[1]));if(x+w>735){x=22;y+=rowH+10;rowH=0}out.push({x,y});x+=w+13;rowH=Math.max(rowH,h)});
 return out;
}
function addCard(){
 const g=$('.home-v22-missions');if(!g)return;
 let b=g.querySelector('[data-new-game="tangram"],[data-new-game="mosaic"]');if(!b){b=document.createElement('button');g.appendChild(b)}
 b.type='button';b.dataset.newGame='tangram';b.className='home-v22-mission tt-new-game-card tt-tangram-card';
 b.innerHTML='<span class="home-v22-visual"><img src="assets/file_0000000025f4820e94bf82c96720553a.png" alt="Tangram da Tia Tati"></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🔷</span><span><strong>Tangram da Tia Tati</strong><small>Modelos e peças correspondentes</small></span></span><em>Nova missão</em>';
 b.onclick=open;
}
function buildUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='tt-exact';
 overlay.innerHTML='<div class="tte-shell"><div class="tte-top"><div><strong>Tangram da Tia Tati</strong><small>As peças foram recortadas do próprio modelo</small></div><button class="tte-close">×</button></div><section class="tte-panel"><div class="tte-tabs"></div><div class="tte-help">Arraste cada peça colorida até a mesma forma no modelo.</div><div class="tte-board-wrap"><svg class="tte-board" viewBox="0 0 760 560" preserveAspectRatio="xMidYMid meet"></svg></div><div class="tte-actions"><button class="tte-model">👁️ Modelo</button><button class="tte-reset">↺ Recomeçar</button><button class="tte-next">⭐ Próxima</button></div><div class="tte-status"></div></section></div>';
 document.body.appendChild(overlay);$('.tte-close',overlay).onclick=close;$('.tte-model',overlay).onclick=()=>{showModel=!showModel;render()};$('.tte-reset',overlay).onclick=reset;$('.tte-next',overlay).onclick=next;
 const tabs=$('.tte-tabs',overlay);Object.entries(LABELS).forEach(([k,[lab,em]])=>{const b=document.createElement('button');b.className='tte-tab'+(k===current?' active':'');b.textContent=em+' '+lab;b.onclick=()=>{current=k;$$('.tte-tab',overlay).forEach(x=>x.classList.toggle('active',x===b));reset();speak(lab)};tabs.appendChild(b)});
 reset();
}
function reset(){
 const items=MODELS[current], starts=packStart(items);showModel=false;
 state=items.map((it,i)=>({x:starts[i].x,y:starts[i].y,locked:false}));
 $('.tte-status',overlay).textContent='Modelo: '+LABELS[current][0]+'. As sete peças têm exatamente o mesmo tamanho da fôrma.';
 render();
}
function render(){
 const svg=$('.tte-board',overlay);svg.innerHTML='';
 MODELS[current].forEach(it=>svg.appendChild(mk('polygon',{points:pts(it.pts),transform:'translate('+it.target[0]+' '+it.target[1]+')',fill:colorOf(it.id),class:'tte-target'+(showModel?' model':'')})));
 MODELS[current].forEach((it,i)=>{const s=state[i],g=mk('g',{class:'tte-piece'+(s.locked?' locked':''),transform:'translate('+s.x+' '+s.y+')'});g.appendChild(mk('polygon',{points:pts(it.pts),fill:colorOf(it.id),stroke:'#fff','stroke-width':2,'stroke-linejoin':'round'}));if(!s.locked)g.addEventListener('pointerdown',e=>begin(e,i,g));svg.appendChild(g)});
}
function svgPt(e){const svg=$('.tte-board',overlay),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse())}
function begin(e,i,el){e.preventDefault();const q=svgPt(e),s=state[i];drag={i,dx:q.x-s.x,dy:q.y-s.y,el};try{el.setPointerCapture(e.pointerId)}catch(_){}}
function move(e){if(!drag)return;e.preventDefault();const q=svgPt(e),s=state[drag.i];s.x=q.x-drag.dx;s.y=q.y-drag.dy;drag.el.setAttribute('transform','translate('+s.x+' '+s.y+')')}
function end(){
 if(!drag)return;const i=drag.i,s=state[i],t=MODELS[current][i].target;const d=Math.hypot(s.x-t[0],s.y-t[1]);if(d<28){s.x=t[0];s.y=t[1];s.locked=true;speak('Muito bem!')}drag=null;render();const done=state.every(x=>x.locked);if(done){$('.tte-status',overlay).textContent='🌟 Figura completa!';speak('Muito bem! Figura completa!')}
}
window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',end);
function next(){const ks=Object.keys(MODELS),i=(ks.indexOf(current)+1)%ks.length;current=ks[i];$$('.tte-tab',overlay).forEach((b,j)=>b.classList.toggle('active',j===i));reset();speak(LABELS[current][0])}
function open(){buildUI();overlay.classList.add('open');document.body.style.overflow='hidden';speak('Escolha uma figura e monte com as peças correspondentes.')}
function close(){overlay?.classList.remove('open');document.body.style.overflow='';}
style();addCard();let n=0,t=setInterval(()=>{addCard();if(document.querySelector('[data-new-game="tangram"]')||++n>30)clearInterval(t)},250);
})();