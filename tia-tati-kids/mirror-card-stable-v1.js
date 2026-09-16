(()=>{
'use strict';
if(window.__TIA_TATI_MIRROR_CARD_STABLE_V1__)return;
window.__TIA_TATI_MIRROR_CARD_STABLE_V1__=true;

function install(){
  const grid=document.querySelector('.home-v22-missions');
  if(!grid)return false;
  if(grid.querySelector('[data-mirror-stable]'))return true;

  const card=document.createElement('button');
  card.type='button';
  card.className='home-v22-mission mirror-stable-card';
  card.dataset.mirrorStable='1';
  card.innerHTML=`
    <span class="home-v22-visual" style="position:relative;overflow:hidden;background:linear-gradient(145deg,#ffeaf5,#eef7ff)">
      <img src="../tia-tati-espelho/assets/mask-v6-2.webp?v=31" alt="Espelho Encantado da Tia Tati" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block">
      <span style="position:absolute;left:10px;bottom:8px;color:#fff7c4;font-size:16px;letter-spacing:4px;text-shadow:0 1px 8px #a64b97">✦ ✨ ✦</span>
    </span>
    <span class="home-v22-mission-copy">
      <span class="home-v22-mission-icon">🪞</span>
      <span><strong>Espelho Encantado</strong><small>Expressões • voz • saberes</small></span>
    </span>
    <em>Novo</em>`;
  card.addEventListener('click',()=>{
    location.href='../tia-tati-espelho/?from=kids&v=31&fresh='+Date.now();
  });
  grid.appendChild(card);
  return true;
}

function boot(){
  if(install())return;
  setTimeout(boot,250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
