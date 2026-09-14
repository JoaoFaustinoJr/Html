(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LABS_LOADER_V2__)return;
window.__TIA_TATI_JOVEM_LABS_LOADER_V2__=true;
const q=(s,r=document)=>r.querySelector(s);
function reorder(){
 const grid=q('.youth-card-grid');
 if(!grid)return false;
 const ping=q('[data-jlab="ping-focus"]',grid);
 const piano=q('[data-jlab="piano-lab"]',grid);
 const breathe=q('[data-youth-breathe]',grid);
 const physical=q('[data-youth-physical]',grid);
 const anchor=breathe||physical;
 if(ping&&anchor&&ping.nextElementSibling!==piano)grid.insertBefore(ping,anchor);
 if(piano&&anchor)grid.insertBefore(piano,anchor);
 const p=q('.youth-challenges-head p');
 if(p)p.textContent='Oito experiências para atenção, ritmo, memória, regulação, movimento e iniciação musical.';
 return !!(ping&&piano);
}
function reloadLabs(){
 if(reorder())return;
 window.__TIA_TATI_JOVEM_LABS_V1__=false;
 const old=document.querySelector('script[data-jlab-reload]');
 if(old)old.remove();
 const s=document.createElement('script');
 s.src='jovem-labs-v1.js?v=32&t='+Date.now();
 s.async=false;
 s.dataset.jlabReload='1';
 s.onload=()=>{reorder();setTimeout(reorder,120);setTimeout(reorder,500)};
 document.body.appendChild(s);
}
function boot(){
 reorder();
 setTimeout(reloadLabs,120);
 [400,900,1800,3200].forEach(t=>setTimeout(()=>{if(!reorder())reloadLabs();},t));
 const grid=q('.youth-card-grid');
 if(grid){
  const mo=new MutationObserver(()=>reorder());
  mo.observe(grid,{childList:true});
  setTimeout(()=>mo.disconnect(),7000);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('tia:jovem-modules-ready',boot);
})();