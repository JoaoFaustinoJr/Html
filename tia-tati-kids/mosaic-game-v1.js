(()=>{
'use strict';
if(window.__TIA_TATI_MOSAIC_ENGINEERED_V6__)return;
window.__TIA_TATI_MOSAIC_ENGINEERED_V6__=true;
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));

const TYPES=[
 {id:'sqRed',name:'Quadrado vermelho',count:4,color:'#e94a43'},
 {id:'sqYellow',name:'Quadrado amarelo',count:4,color:'#f7c928'},
 {id:'paraBlue',name:'Paralelogramo azul',count:4,color:'#238de0'},
 {id:'triGreen',name:'Triângulo isósceles',count:8,color:'#49a956'}
];

const SLOTS=[
 {id:'c1',type:'sqRed',x:25,y:25,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'c2',type:'sqRed',x:50,y:25,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'c3',type:'sqRed',x:25,y:50,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'c4',type:'sqRed',x:50,y:50,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'q1',type:'sqYellow',x:0,y:0,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'q2',type:'sqYellow',x:75,y:0,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'q3',type:'sqYellow',x:0,y:75,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'q4',type:'sqYellow',x:75,y:75,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%,0 100%)'},
 {id:'tTopL',type:'triGreen',x:25,y:0,w:25,h:25,clip:'polygon(0 0,0 100%,100% 100%)'},
 {id:'pTop',type:'paraBlue',x:25,y:0,w:50,h:25,clip:'polygon(0 0,50% 0,100% 100%,50% 100%)'},
 {id:'tTopR',type:'triGreen',x:50,y:0,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%)'},
 {id:'tBotL',type:'triGreen',x:25,y:75,w:25,h:25,clip:'polygon(0 0,0 100%,100% 100%)'},
 {id:'pBot',type:'paraBlue',x:25,y:75,w:50,h:25,clip:'polygon(0 0,50% 0,100% 100%,50% 100%)'},
 {id:'tBotR',type:'triGreen',x:50,y:75,w:25,h:25,clip:'polygon(0 0,100% 0,100% 100%)'},
 {id:'tLeftT',type:'triGreen',x:0,y:25,w:25,h:25,clip:'polygon(0 0,100% 0,0 100%)'},
 {id:'pLeft',type:'paraBlue',x:0,y:25,w:25,h:50,clip:'polygon(100% 0,100% 50%,0 100%,0 50%)'},
 {id:'tLeftB',type:'triGreen',x:0,y:50,w:25,h:25,clip:'polygon(100% 0,100% 100%,0 100%)'},
 {id:'tRightT',type:'triGreen',x:75,y:25,w:25,h:25,clip:'polygon(0 0,100% 0,0 100%)'},
 {id:'pRight',type:'paraBlue',x:75,y:25,w:25,h:50,clip:'polygon(100% 0,100% 50%,0 100%,0 50%)'},
 {id:'tRightB',type:'triGreen',x:75,y:50,w:25,h:25,clip:'polygon(100% 0,100% 100%,0 100%)'}
];

const css=`
.ttmw,.ttmw *{box-sizing:border-box}.ttmw{position:fixed;z-index:240000;inset:0;display:none;overflow:auto;background:#fff9ef;color:#153e70}.ttmw.open{display:block}
.ttmw-shell{width:min(100%,760px);margin:auto;min-height:100dvh;padding:4px 6px 16px}.ttmw-top{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;background:rgba(255,252,247,.98);border-radius:18px;padding:7px 9px;box-shadow:0 5px 18px #47331c17}
.ttmw-title{display:flex;align-items:center;gap:9px}.ttmw-avatar{width:46px;height:46px;border-radius:50%;object-fit:cover;border:3px solid #ffd7e6}.ttmw-title strong{display:block;font-size:1rem;color:#0a56a0}.ttmw-title small{display:block;color:#7890a2;font-size:.6rem}.ttmw-close{width:38px;height:38px;border:0;border-radius:50%;background:#edf6fb;color:#315c7a;font-size:1.2rem;font-weight:900}
.ttmw-modes{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:5px 0}.ttmw-mode{border:0;border-radius:15px;padding:8px 3px;font-weight:950;font-size:.63rem}.ttmw-mode.build{background:#dff7e9;color:#137b43}.ttmw-mode.explore{background:#fff0d7;color:#a35b00}.ttmw-mode.model{background:#dff2ff;color:#075eae}.ttmw-mode.sym{background:#eee7ff;color:#5140b7}.ttmw-mode.active{box-shadow:inset 0 0 0 3px rgba(0,0,0,.13)}
.ttmw-panel{background:#fff;border:1px solid #eee0cf;border-radius:20px;padding:6px;box-shadow:0 10px 25px #62452612}.ttmw-instruction{text-align:center;font-size:.64rem;color:#667f92;margin:0 0 5px}
.ttmw-frame{position:relative;width:min(94vw,calc(100dvh - 280px),520px);min-width:235px;aspect-ratio:1;margin:auto;border:12px solid transparent;border-radius:17px;background:linear-gradient(#efd2a7,#e7b872) padding-box,repeating-linear-gradient(90deg,#b8793d 0 18px,#c88b49 18px 36px,#aa6933 36px 52px) border-box;box-shadow:inset 0 0 0 3px #8c5a2c,0 8px 18px #6a462324}
.ttmw-board{position:absolute;inset:7px;background:linear-gradient(180deg,#efd8b7,#e8c79a);border:3px solid #8d5729;box-shadow:inset 0 0 0 2px #f5dfbd,inset 0 0 18px rgba(93,54,22,.14);overflow:hidden;touch-action:none}
.ttmw-axis{display:none;position:absolute;top:0;bottom:0;left:50%;border-left:3px dashed rgba(83,66,181,.4);pointer-events:none}.ttmw.symmetry .ttmw-axis{display:block}
.ttmw-piece{position:absolute;touch-action:none;cursor:grab;transform-origin:center;filter:drop-shadow(0 1px 1.5px rgba(59,34,13,.26));background-image:linear-gradient(115deg,rgba(255,255,255,.16),rgba(0,0,0,.07));border:1px solid rgba(92,54,23,.14)}
.ttmw-palette-title{font-size:.75rem;font-weight:950;margin:8px 4px 4px;color:#0b4a88}.ttmw-palette{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;background:#fff;border:1px solid #eee0cf;border-radius:17px;padding:7px}
.ttmw-type{border:0;background:#fff;border-radius:12px;padding:5px 2px 4px;min-width:0}.ttmw-type.selected{background:#eef8ff;box-shadow:inset 0 0 0 2px #79c8f5}.ttmw-swatch-wrap{height:43px;display:grid;place-items:center}.ttmw-swatch{width:44px;height:44px;max-width:90%;background-image:linear-gradient(115deg,rgba(255,255,255,.18),rgba(0,0,0,.07));filter:drop-shadow(0 2px 2px rgba(73,43,20,.2))}.ttmw-type small{display:block;margin-top:2px;font-size:.47rem;color:#547088;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ttmw-count{display:inline-block;margin-top:2px;padding:2px 7px;border-radius:999px;background:#f3f6f8;color:#173d71;font-size:.64rem;font-weight:950}
.ttmw-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}.ttmw-actions button{border:0;border-radius:15px;padding:9px 4px;font-weight:950;font-size:.67rem}.ttmw-view{background:#dff2ff;color:#075eae}.ttmw-clear{background:#fff0f4;color:#b63162}.ttmw-next{background:#2dbb63;color:white}.ttmw-status{text-align:center;min-height:22px;margin-top:5px;font-size:.65rem;color:#55748a;font-weight:800}
.ttmw-modal{display:none;position:fixed;z-index:240100;inset:0;background:rgba(10,32,52,.5);align-items:center;justify-content:center;padding:16px}.ttmw-modal.show{display:flex}.ttmw-modal-card{width:min(94vw,420px);background:#fff;border-radius:22px;padding:12px;text-align:center;box-shadow:0 20px 60px #0004}.ttmw-model-board{position:relative;width:100%;aspect-ratio:1;border:10px solid #c68a49;border-radius:14px;background:#e8c79a;overflow:hidden}.ttmw-model-piece{position:absolute;background-image:linear-gradient(115deg,rgba(255,255,255,.15),rgba(0,0,0,.05));border:1px solid rgba(92,54,23,.12)}.ttmw-modal-card button{margin-top:8px;border:0;border-radius:14px;background:#0d73c7;color:#fff;font-weight:900;padding:9px 18px}
.tt-mosaic-wood-card .home-v22-visual{background:linear-gradient(145deg,#fff8e9,#edfaff);overflow:hidden}.tt-mosaic-mini{width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(145deg,#e9c38d,#b77a3f);padding:8px}.tt-mosaic-mini-board{position:relative;width:84%;aspect-ratio:1;border:7px solid #c88c4c;border-radius:10px;background:#e8c79a;overflow:hidden;box-shadow:inset 0 0 0 2px #8f5d2f}.tt-mosaic-mini-board i{position:absolute}
@media(max-width:600px){.ttmw-shell{padding:2px}.ttmw-top{padding:4px 6px}.ttmw-avatar{width:40px;height:40px}.ttmw-modes{margin:3px 0}.ttmw-mode{padding:6px 2px;font-size:.56rem}.ttmw-panel{padding:4px}.ttmw-instruction{margin-bottom:3px}.ttmw-frame{width:min(95vw,calc(100dvh - 260px),410px);min-width:225px;border-width:9px}.ttmw-palette{grid-template-columns:repeat(4,1fr);padding:5px}.ttmw-swatch-wrap{height:36px}.ttmw-swatch{width:38px;height:38px}.ttmw-type small{font-size:.43rem}.ttmw-actions button{font-size:.62rem;padding:8px 2px}}
`;

let overlay=null,selected='sqRed',placed=[],history=[],drag=null,dragBefore=null,mode='build';

function colorOf(type){const t=TYPES.find(x=>x.id===type);return t?t.color:'#999'}
function slotById(id){return SLOTS.find(s=>s.id===id)}
function pieceGeom(p){
 const s=slotById(p.sourceSlotId||p.slotId);
 return {w:p.w||s.w,h:p.h||s.h,clip:p.clip||s.clip};
}
function cloneState(){return placed.map(p=>({id:p.id,type:p.type,slotId:p.slotId,sourceSlotId:p.sourceSlotId,x:p.x,y:p.y,w:p.w,h:p.h,clip:p.clip,rot:p.rot||0}))}
function pushHistory(){history.push(cloneState());if(history.length>80)history.shift()}
function remaining(type){return TYPES.find(x=>x.id===type).count-placed.filter(p=>p.type===type).length}
function occupied(slotId,ignoreId){return placed.some(p=>p.slotId===slotId&&p.id!==ignoreId)}
function slotCenter(s){return{x:s.x+s.w/2,y:s.y+s.h/2}}
function available(type,ignoreId){return SLOTS.filter(s=>s.type===type&&!occupied(s.id,ignoreId))}
function nearestSlot(type,x,y,ignoreId){const a=available(type,ignoreId);if(!a.length)return null;return a.reduce((best,s)=>{const c=slotCenter(s),d=Math.hypot(c.x-x,c.y-y);return !best||d<best.d?{s,d}:best},null).s}
function style(){if($('#ttmwStyle'))return;const s=document.createElement('style');s.id='ttmwStyle';s.textContent=css;document.head.appendChild(s)}
function clipPoints(clip,w,h){
 const raw=clip.replace('polygon(','').replace(')','').split(',');
 return raw.map(pair=>{const n=pair.trim().split(/\s+/);return {x:parseFloat(n[0])*w/100,y:parseFloat(n[1])*h/100}});
}
function polygonFor(p,xOverride,yOverride,rotOverride){
 const g=pieceGeom(p),x=xOverride==null?(p.x||0):xOverride,y=yOverride==null?(p.y||0):yOverride,rot=(rotOverride==null?(p.rot||0):rotOverride)*Math.PI/180;
 const cx=x+g.w/2,cy=y+g.h/2;
 return clipPoints(g.clip,g.w,g.h).map(q=>{const px=x+q.x,py=y+q.y,dx=px-cx,dy=py-cy;return{x:cx+dx*Math.cos(rot)-dy*Math.sin(rot),y:cy+dx*Math.sin(rot)+dy*Math.cos(rot)}});
}
function axes(poly){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],dx=b.x-a.x,dy=b.y-a.y,l=Math.hypot(dx,dy)||1;out.push({x:-dy/l,y:dx/l})}return out}
function project(poly,a){let min=Infinity,max=-Infinity;poly.forEach(p=>{const v=p.x*a.x+p.y*a.y;min=Math.min(min,v);max=Math.max(max,v)});return{min,max}}
function overlapsPoly(a,b){const eps=.35;for(const ax of axes(a).concat(axes(b))){const pa=project(a,ax),pb=project(b,ax);if(pa.max<=pb.min+eps||pb.max<=pa.min+eps)return false}return true}
function inside(poly){return poly.every(p=>p.x>=-.15&&p.y>=-.15&&p.x<=100.15&&p.y<=100.15)}
function collides(p,x,y,rot){const poly=polygonFor(p,x,y,rot);if(!inside(poly))return true;return placed.some(o=>o.id!==p.id&&overlapsPoly(poly,polygonFor(o)))}
function clampFree(p,x,y,rot){let nx=x,ny=y,poly=polygonFor(p,nx,ny,rot),minX=Math.min(...poly.map(q=>q.x)),maxX=Math.max(...poly.map(q=>q.x)),minY=Math.min(...poly.map(q=>q.y)),maxY=Math.max(...poly.map(q=>q.y));if(minX<0)nx-=minX;if(maxX>100)nx-=maxX-100;if(minY<0)ny-=minY;if(maxY>100)ny-=maxY-100;return{x:nx,y:ny}}

function renderMini(){const host=document.createElement('span');host.className='tt-mosaic-mini-board';SLOTS.forEach(s=>{const i=document.createElement('i');i.style.left=s.x+'%';i.style.top=s.y+'%';i.style.width=s.w+'%';i.style.height=s.h+'%';i.style.clipPath=s.clip;i.style.background=colorOf(s.type);host.appendChild(i)});return host.outerHTML}
function addCard(){const g=$('.home-v22-missions');if(!g)return false;let b=g.querySelector('[data-new-game="mosaic-wood"]');if(!b){b=document.createElement('button');g.appendChild(b)}b.type='button';b.className='home-v22-mission tt-new-game-card tt-mosaic-wood-card';b.dataset.newGame='mosaic-wood';b.innerHTML='<span class="home-v22-visual"><span class="tt-mosaic-mini">'+renderMini()+'</span></span><span class="home-v22-mission-copy"><span class="home-v22-mission-icon">🧩</span><span><strong>Mosaico da Tia Tati</strong><small>Monte e depois explore novas formas</small></span></span><em>Nova missão</em>';b.onclick=open;return true}

function makeUI(){
 if(overlay)return;
 overlay=document.createElement('div');overlay.className='ttmw';
 overlay.innerHTML='<div class="ttmw-shell"><div class="ttmw-top"><div class="ttmw-title"><img class="ttmw-avatar" src="assets/guide.webp" alt="Tia Tati"><div><strong>Mosaico da Tia Tati</strong><small>As mesmas peças podem formar novos desenhos</small></div></div><button class="ttmw-close">×</button></div><div class="ttmw-modes"><button class="ttmw-mode build active">🧩 Montar</button><button class="ttmw-mode explore">✨ Explorar</button><button class="ttmw-mode model">👁️ Modelo</button><button class="ttmw-mode sym">◐ Simetria</button></div><section class="ttmw-panel"><p class="ttmw-instruction">No modo Montar as peças procuram seus encaixes. Em Explorar a peça fica exatamente onde você soltar, desde que não sobreponha outra peça, e pode ser girada.</p><div class="ttmw-frame"><div class="ttmw-board"><div class="ttmw-axis"></div></div></div><div class="ttmw-palette-title">Peças disponíveis</div><div class="ttmw-palette"></div><div class="ttmw-actions"><button class="ttmw-view">👁️ Modelo</button><button class="ttmw-clear">↶ Desfazer</button><button class="ttmw-next">↻ Recomeçar</button></div><div class="ttmw-status">Monte o mosaico ou escolha Explorar.</div></section></div><div class="ttmw-modal"><div class="ttmw-modal-card"><h3>Modelo completo</h3><div class="ttmw-model-board"></div><button>Fechar modelo</button></div></div>';
 document.body.appendChild(overlay);
 $('.ttmw-close',overlay).onclick=close;$('.ttmw-mode.build',overlay).onclick=()=>setMode('build');$('.ttmw-mode.explore',overlay).onclick=()=>setMode('explore');$('.ttmw-mode.model',overlay).onclick=showModel;$('.ttmw-mode.sym',overlay).onclick=()=>setMode('symmetry');$('.ttmw-view',overlay).onclick=showModel;$('.ttmw-clear',overlay).onclick=undo;$('.ttmw-next',overlay).onclick=restart;$('.ttmw-modal button',overlay).onclick=()=>$('.ttmw-modal',overlay).classList.remove('show');
 $('.ttmw-board',overlay).onclick=e=>{if(e.target===e.currentTarget||e.target.classList.contains('ttmw-axis'))placeAt(e)};
 buildPalette();renderPieces();
}
function buildPalette(){const p=$('.ttmw-palette',overlay);p.innerHTML='';TYPES.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='ttmw-type'+(t.id===selected?' selected':'');const s=SLOTS.find(x=>x.type===t.id),ratio=s.w/s.h,w=ratio>=1?44:Math.max(22,44*ratio),h=ratio>=1?Math.max(22,44/ratio):44;b.innerHTML='<div class="ttmw-swatch-wrap"><div class="ttmw-swatch" style="width:'+w+'px;height:'+h+'px;background-color:'+t.color+';clip-path:'+s.clip+'"></div></div><small>'+t.name+'</small><span class="ttmw-count" data-count="'+t.id+'">×'+remaining(t.id)+'</span>';b.onclick=()=>{selected=t.id;$$('.ttmw-type',overlay).forEach(x=>x.classList.toggle('selected',x===b))};p.appendChild(b)})}
function refreshCounts(){TYPES.forEach(t=>{const e=$('[data-count="'+t.id+'"]',overlay);if(e)e.textContent='×'+remaining(t.id)})}
function boardPoint(e){const b=$('.ttmw-board',overlay),r=b.getBoundingClientRect();return{x:Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100)),y:Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100))}}
function placeAt(e){
 if(remaining(selected)<=0){status('Você já usou todas as peças desse tipo.');return}
 const pt=boardPoint(e),source=SLOTS.find(s=>s.type===selected&&!placed.some(p=>p.sourceSlotId===s.id));
 if(!source)return;
 pushHistory();
 if(mode==='explore'){
   const p={id:Date.now()+Math.random(),type:selected,sourceSlotId:source.id,x:pt.x-source.w/2,y:pt.y-source.h/2,w:source.w,h:source.h,clip:source.clip,rot:0};
   const q=clampFree(p,p.x,p.y,0);p.x=q.x;p.y=q.y;
   if(collides(p,p.x,p.y,0)){history.pop();status('Não há espaço livre aqui.');return}
   placed.push(p);
 }else{
   const s=nearestSlot(selected,pt.x,pt.y,null);if(!s){history.pop();status('Não há encaixe compatível livre.');return}
   placed.push({id:Date.now()+Math.random(),type:selected,slotId:s.id,sourceSlotId:s.id,rot:0});
 }
 renderPieces();refreshCounts();afterMove();
}
function renderPieces(){
 const board=$('.ttmw-board',overlay);$$('.ttmw-piece',board).forEach(e=>e.remove());
 placed.forEach(p=>{let s,g;if(p.slotId&&mode!=='explore'){s=slotById(p.slotId);g={x:s.x,y:s.y,w:s.w,h:s.h,clip:s.clip,rot:0}}else{if(p.slotId&&!p.x){s=slotById(p.slotId);p.x=s.x;p.y=s.y;p.w=s.w;p.h=s.h;p.clip=s.clip;p.rot=0}g={x:p.x,y:p.y,w:p.w,h:p.h,clip:p.clip,rot:p.rot||0}}
 const el=document.createElement('div');el.className='ttmw-piece';el.dataset.id=p.id;el.style.left=g.x+'%';el.style.top=g.y+'%';el.style.width=g.w+'%';el.style.height=g.h+'%';el.style.clipPath=g.clip;el.style.backgroundColor=colorOf(p.type);el.style.transform='rotate('+g.rot+'deg)';
 el.addEventListener('pointerdown',ev=>startDrag(ev,p,el));el.addEventListener('dblclick',ev=>{ev.stopPropagation();rotatePiece(p)});board.appendChild(el)});
}
function startDrag(e,p,el){
 e.preventDefault();dragBefore=cloneState();
 if(mode==='explore'&&p.slotId){const s=slotById(p.slotId);p.x=s.x;p.y=s.y;p.w=s.w;p.h=s.h;p.clip=s.clip;p.rot=0;p.slotId=null}
 const b=$('.ttmw-board',overlay).getBoundingClientRect(),pt=boardPoint(e);
 drag={p,el,dx:pt.x-p.x,dy:pt.y-p.y,startX:p.x,startY:p.y,startRot:p.rot||0};try{el.setPointerCapture(e.pointerId)}catch(_){}
}
function moveDrag(e){
 if(!drag)return;e.preventDefault();const b=$('.ttmw-board',overlay),r=b.getBoundingClientRect(),pt=boardPoint(e),g=pieceGeom(drag.p);
 if(mode==='explore'){const q=clampFree(drag.p,pt.x-drag.dx,pt.y-drag.dy,drag.p.rot||0);drag.p.x=q.x;drag.p.y=q.y;drag.el.style.left=q.x+'%';drag.el.style.top=q.y+'%'}
 else{const x=Math.max(0,Math.min(100-g.w,pt.x-g.w/2)),y=Math.max(0,Math.min(100-g.h,pt.y-g.h/2));drag.el.style.left=x+'%';drag.el.style.top=y+'%'}
}
function finishDrag(e){
 if(!drag)return;
 const p=drag.p,pt=boardPoint(e);
 if(mode==='explore'){
   const q=clampFree(p,p.x,p.y,p.rot||0);
   if(collides(p,q.x,q.y,p.rot||0)){placed=dragBefore;status('Esse espaço está ocupado. A peça voltou.')}else{p.x=q.x;p.y=q.y;history.push(dragBefore);if(history.length>80)history.shift();status('Peça solta exatamente onde você deixou.')}
 }else{
   const s=nearestSlot(p.type,pt.x,pt.y,p.id);
   if(s&&s.id!==p.slotId){history.push(dragBefore);if(history.length>80)history.shift();p.slotId=s.id;status('Peça reposicionada.')}else status('A peça permaneceu no encaixe anterior.');
 }
 renderPieces();drag=null;dragBefore=null;afterMove();
}
function rotatePiece(p){
 if(mode!=='explore'){status('Use o modo Explorar para girar livremente.');return}
 pushHistory();const nr=((p.rot||0)+90)%360,q=clampFree(p,p.x,p.y,nr);
 if(collides(p,q.x,q.y,nr)){history.pop();status('Não há espaço para girar essa peça aqui.');return}
 p.x=q.x;p.y=q.y;p.rot=nr;renderPieces();status('Peça girada 90°.');
}
function afterMove(){
 if(mode==='build'&&placed.length===SLOTS.length&&placed.every(p=>p.slotId)){status('🌟 Mosaico completo! Agora experimente o modo Explorar.');try{const u=new SpeechSynthesisUtterance('Muito bem! Agora experimente novas formas no modo explorar.');u.lang='pt-BR';speechSynthesis.speak(u)}catch(_){}}
 else if(mode==='explore')status('Explore novas combinações. Arraste e dê dois toques para girar.');
 else status('Peça encaixada. Faltam '+(SLOTS.length-placed.length)+' peças.');
}
function undo(){if(!history.length){status('Não há movimento para desfazer.');return}placed=history.pop();renderPieces();refreshCounts();status('Último movimento desfeito.')}
function restart(){if(placed.length)pushHistory();placed=[];renderPieces();refreshCounts();status('As peças foram retiradas. Comece novamente.')}
function setMode(m){
 mode=m==='symmetry'?'explore':m;overlay.classList.toggle('symmetry',m==='symmetry');$$('.ttmw-mode',overlay).forEach(x=>x.classList.remove('active'));const q=$('.ttmw-mode.'+(m==='symmetry'?'sym':m),overlay);if(q)q.classList.add('active');
 if(mode==='explore'){placed.forEach(p=>{if(p.slotId){const s=slotById(p.slotId);p.x=s.x;p.y=s.y;p.w=s.w;p.h=s.h;p.clip=s.clip;p.rot=0;p.slotId=null}});renderPieces();status(m==='symmetry'?'Explore mantendo a linha central como referência.':'Explore livremente: a peça permanece exatamente onde for solta. Gire com dois toques.')}
 else status('Modo Montar: as peças procuram os encaixes do mosaico original.');
}
function showModel(){const b=$('.ttmw-model-board',overlay);b.innerHTML='';SLOTS.forEach(s=>{const e=document.createElement('div');e.className='ttmw-model-piece';e.style.left=s.x+'%';e.style.top=s.y+'%';e.style.width=s.w+'%';e.style.height=s.h+'%';e.style.clipPath=s.clip;e.style.backgroundColor=colorOf(s.type);b.appendChild(e)});$('.ttmw-modal',overlay).classList.add('show')}
function status(t){$('.ttmw-status',overlay).textContent=t}
function open(){makeUI();overlay.classList.add('open');document.body.style.overflow='hidden'}
function close(){if(overlay)overlay.classList.remove('open');document.body.style.overflow=''}
window.addEventListener('pointermove',moveDrag,{passive:false});window.addEventListener('pointerup',finishDrag);
style();let tries=0,t=setInterval(()=>{if(addCard()||++tries>40)clearInterval(t)},250);
})();