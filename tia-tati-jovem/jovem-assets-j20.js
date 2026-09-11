(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_J20__)return;
window.__TIA_TATI_JOVEM_ASSETS_J20__=true;
const safe={react:'assets/cards/reflexo-neon.webp?v=21',memory:'assets/cards/memorize.webp?v=21',beat:'assets/cards/beat-move.webp?v=21'};
function fallback(){
 const pairs=[['[data-youth-light="react"]',safe.react],['[data-youth-light="memory"]',safe.memory],['[data-youth-light="beat"]',safe.beat]];
 pairs.forEach(([sel,src])=>{const card=document.querySelector(sel),img=card?.querySelector('.youth-card-art img');if(img){img.src=src;img.onerror=()=>{img.onerror=null;img.style.display='none';};}});
 const hero=document.querySelectorAll('.jovem-home-art img');if(hero[0])hero[0].src=safe.react;if(hero[1])hero[1].src=safe.beat;
}
fallback();
const script=document.createElement('script');script.src='jovem-assets-j21.js?v=21&t='+Date.now();script.async=true;script.onerror=fallback;document.body.appendChild(script);
window.addEventListener('tia:jovem-modules-ready',fallback,{once:true});
})();
