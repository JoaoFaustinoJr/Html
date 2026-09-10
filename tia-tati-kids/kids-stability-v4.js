(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_STABILITY_V4__)return;
window.__TIA_TATI_KIDS_STABILITY_V4__=true;

document.documentElement.classList.add('tia-kids-v4');

const allowed=new Set(['road','bee','target','hands','sensory','breathe']);

/*
  Não removemos mais elementos da árvore durante o boot.
  A separação Kids/Jovem é apenas visual (CSS), para preservar a montagem V44/V45
  e todos os handlers funcionais aprovados.
*/
function markKids(){
  document.title='Tia Tati Kids – Fisio Sensorial';
  const brand=document.querySelector('.brand small');
  if(brand)brand.textContent='Fisio Sensorial Kids';
  const kicker=document.querySelector('.home-v22-kicker');
  if(kicker)kicker.textContent='DRA. TATIANA • FISIOTERAPIA • ÁREA KIDS';
}

/*
  Hotfix de toque: no Android, garantimos que o card execute o handler original
  do app.js mesmo se alguma camada visual interceptar o evento de bolha.
*/
document.addEventListener('click',e=>{
  const card=e.target.closest('#screen-home [data-mission]');
  if(!card||!allowed.has(card.dataset.mission))return;
  if(typeof card.onclick!=='function')return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  card.onclick.call(card,e);
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',markKids,{once:true});
else markKids();

setTimeout(markKids,250);
setTimeout(markKids,900);
})();
