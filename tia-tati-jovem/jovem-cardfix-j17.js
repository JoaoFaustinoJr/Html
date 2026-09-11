(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_CARDFIX_J17__)return;
window.__TIA_TATI_JOVEM_CARDFIX_J17__=true;
const TATI='../tia-tati/assets/icon-tia-tati-v2.svg?v=j17';
const q=(s,r=document)=>r.querySelector(s);

function art(kind){
 const person=`<img class="j17-tati" src="${TATI}" alt="" loading="eager" decoding="async">`;
 if(kind==='react')return `<div class="j17-card-visual">${person}<span class="j17-orb"></span><span class="j17-hand">☝️</span><span class="j17-title">REFLEXO<b>Neon</b></span></div>`;
 if(kind==='memory')return `<div class="j17-card-visual">${person}<span class="j17-memory-grid"><i>1</i><i>2</i><i>3</i><i>4</i></span><span class="j17-title">MEMÓRIA<b>Sequência</b></span></div>`;
 return `<div class="j17-card-visual">${person}<span class="j17-notes">♫ ♪</span><span class="j17-eq"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="j17-orb"></span><span class="j17-title">RITMO<b>Movimento</b></span></div>`;
}
function paint(sel,kind,badge){
 const card=q(sel);if(!card)return;
 const box=q('.youth-card-art',card);if(!box)return;
 box.querySelectorAll('img,.j17-card-visual').forEach(n=>n.remove());
 box.insertAdjacentHTML('afterbegin',art(kind));
 let em=q(':scope > em',box);if(!em){em=document.createElement('em');box.appendChild(em);}em.textContent=badge;
}
function hero(){
 const h=q('.jovem-home-art');if(!h||h.dataset.j17==='1')return;
 h.dataset.j17='1';
 h.innerHTML=`<div class="j17-hero-card"><img src="${TATI}" alt=""><span class="j17-orb"></span><strong>Reflexo Neon</strong></div><div class="j17-hero-card"><img src="${TATI}" alt=""><span class="j17-notes">♫ ♪</span><span class="j17-eq"><i></i><i></i><i></i><i></i><i></i><i></i></span><strong>Ritmo e Movimento</strong></div>`;
}
function apply(){
 paint('[data-youth-light="react"]','react','REFLEXO');
 paint('[data-youth-light="memory"]','memory','MEMORIZE');
 paint('[data-youth-light="beat"]','beat','RITMO E MOVIMENTO');
 hero();
}
function start(){apply();[80,260,650,1200,2200].forEach(ms=>setTimeout(apply,ms));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start);
})();