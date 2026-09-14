(()=>{
'use strict';
if(window.__TIA_JOVEM_ROUTER44__)return;window.__TIA_JOVEM_ROUTER44__=true;
const q=(s,r=document)=>r.querySelector(s);
function fallbackMission(card,e){
 let sel=null;
 if(card.matches('[data-youth-light]'))sel='[data-mission="light"]';
 else if(card.matches('[data-youth-sensory]'))sel='[data-mission="sensory"]';
 else if(card.matches('[data-youth-breathe]'))sel='[data-mission="breathe"]';
 else if(card.matches('[data-youth-physical]'))sel='[data-mission="physical"]';
 if(!sel)return false;
 const base=q(sel);
 if(base&&typeof base.onclick==='function'){
  e.preventDefault();e.stopImmediatePropagation();
  try{base.onclick.call(base,e);return true}catch(err){console.error('Rota Jovem:',err)}
 }
 return false;
}
document.addEventListener('click',e=>{
 const card=e.target.closest&&e.target.closest('#screen-home .youth-card');
 if(!card)return;
 if(card.matches('[data-jlab="piano-lab"]')){
  if(window.TiaTatiPiano43&&typeof window.TiaTatiPiano43.open==='function'){
   e.preventDefault();e.stopImmediatePropagation();window.TiaTatiPiano43.open();
  }
  return;
 }
 if(card.matches('[data-jlab="ping-focus"]'))return;
 if(typeof card.onclick==='function'){
  e.preventDefault();e.stopImmediatePropagation();
  try{card.onclick.call(card,e)}catch(err){console.error('Atividade Jovem:',err);fallbackMission(card,e)}
  return;
 }
 fallbackMission(card,e);
},true);
})();