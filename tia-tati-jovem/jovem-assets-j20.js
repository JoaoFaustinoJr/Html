(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_J20__)return;
window.__TIA_TATI_JOVEM_ASSETS_J20__=true;
const safe={react:'assets/cards/reflexo-neon.webp?v=25',memory:'assets/cards/memorize.webp?v=25',beat:'assets/cards/beat-move.webp?v=25'};
function fallback(){const pairs=[['[data-youth-light="react"]',safe.react],['[data-youth-light="memory"]',safe.memory],['[data-youth-light="beat"]',safe.beat]];pairs.forEach(([sel,src])=>{const card=document.querySelector(sel),img=card?.querySelector('.youth-card-art img');if(img){img.src=src;img.onerror=()=>{img.onerror=null;img.style.display='none';};}});}
fallback();
const script=document.createElement('script');script.src='jovem-illustrated-v24.js?v=25&t='+Date.now();script.async=true;script.onerror=fallback;document.body.appendChild(script);
window.addEventListener('tia:jovem-modules-ready',fallback,{once:true});
})();
