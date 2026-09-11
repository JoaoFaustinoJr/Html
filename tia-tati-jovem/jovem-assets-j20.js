(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_J20__)return;
window.__TIA_TATI_JOVEM_ASSETS_J20__=true;
const safe={react:'assets/cards/reflexo-neon.webp?v=23',memory:'assets/cards/memorize.webp?v=23',beat:'assets/cards/beat-move.webp?v=23'};
function fallback(){
 const pairs=[['[data-youth-light="react"]',safe.react],['[data-youth-light="memory"]',safe.memory],['[data-youth-light="beat"]',safe.beat]];
 pairs.forEach(([sel,src])=>{const card=document.querySelector(sel),img=card?.querySelector('.youth-card-art img');if(img){img.src=src;img.onerror=()=>{img.onerror=null;img.style.display='none';};}});
 const hero=document.querySelectorAll('.jovem-home-art img');if(hero[0])hero[0].src='assets/welcome.webp?v=23';
}
fallback();
const script=document.createElement('script');script.src='jovem-illustrated-v23.js?v=23&t='+Date.now();script.async=true;script.onerror=fallback;document.body.appendChild(script);
window.addEventListener('tia:jovem-modules-ready',fallback,{once:true});
})();
