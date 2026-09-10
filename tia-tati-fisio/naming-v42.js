(()=>{
'use strict';
if(window.__TIA_TATI_NAMING_V42__)return;window.__TIA_TATI_NAMING_V42__=true;

const apply=()=>{
  document.querySelectorAll('[data-breathe-mode="reset"]').forEach(btn=>{
    const title=btn.querySelector('strong');
    if(title) title.textContent='Recomeço';
    const desc=btn.querySelector('small');
    if(desc && /Pausa jovem/i.test(desc.textContent||'')) desc.textContent='Pausa jovem em tons neon.';
  });

  const summary=document.querySelector('#breatheV41Summary');
  if(summary && /^Reset\b/.test(summary.textContent||'')) summary.textContent=summary.textContent.replace(/^Reset\b/,'Recomeço');

  document.querySelectorAll('[data-youth-breathe]').forEach(card=>{
    const title=card.querySelector('.youth-card-copy strong');
    if(title) title.textContent='Recomeço';
    const badge=card.querySelector('.youth-card-art em');
    if(badge) badge.textContent='RECOMEÇO';
    const img=card.querySelector('img[alt]');
    if(img) img.alt='Recomeço';
  });

  document.querySelectorAll('.v41-home-chip').forEach(chip=>{
    if((chip.textContent||'').includes('Calma • Focus • Reset')) chip.textContent='Calma • Focus • Recomeço';
  });
};

const start=()=>{
  apply();
  const obs=new MutationObserver(()=>apply());
  obs.observe(document.body,{childList:true,subtree:true,characterData:false});
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
