(()=>{
'use strict';
function applyKidsMode(){
  document.title='Tia Tati Kids – Fisio Sensorial';

  const brandSmall=document.querySelector('.brand small');
  if(brandSmall) brandSmall.textContent='Fisio Sensorial Kids';

  const kicker=document.querySelector('.home-v22-kicker');
  if(kicker) kicker.textContent='DRA. TATIANA • FISIOTERAPIA • ÁREA KIDS';

  const title=document.querySelector('.home-v22-section-head h2');
  if(title) title.textContent='Escolha uma atividade Kids';

  document.querySelectorAll('.home-v22-mission.light,.home-v22-mission.physical,.youth-challenges').forEach(el=>el.remove());

  const grid=document.querySelector('.home-v22-missions');
  if(grid) grid.classList.add('kids-only-grid');
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyKidsMode,{once:true});
else applyKidsMode();
})();
