(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LABS_LOADER_V3__)return;
window.__TIA_TATI_JOVEM_LABS_LOADER_V3__=true;
const q=(s,r=document)=>r.querySelector(s);
function reorder(){
 const grid=q('.youth-card-grid');
 if(!grid)return false;
 const ping=q('[data-jlab="ping-focus"]',grid);
 const piano=q('[data-jlab="piano-lab"]',grid);
 const breathe=q('[data-youth-breathe]',grid);
 const physical=q('[data-youth-physical]',grid);
 const anchor=breathe||physical;
 if(ping&&anchor)grid.insertBefore(ping,anchor);
 if(piano&&anchor)grid.insertBefore(piano,anchor);
 const p=q('.youth-challenges-head p');
 if(p&&ping&&piano)p.textContent='Oito experiências para atenção, ritmo, memória, regulação, movimento e iniciação musical.';
 return !!(ping&&piano);
}
function boot(){
 reorder();
 [100,350,800,1500].forEach(t=>setTimeout(reorder,t));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('tia:jovem-modules-ready',boot);
window.addEventListener('tia:jovem-labs-ready',boot);
})();