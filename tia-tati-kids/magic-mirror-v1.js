(()=>{
'use strict';
if(window.__TIA_TATI_MAGIC_MIRROR_BOOT_V4__)return;
window.__TIA_TATI_MAGIC_MIRROR_BOOT_V4__=true;
function load(src,key,done){if(window[key]){done?.();return}const s=document.createElement('script');s.src=src;s.async=false;s.onload=()=>done?.();s.onerror=()=>console.warn('Espelho Mágico: falha ao carregar',src);document.head.appendChild(s)}
load('magic-mirror-network-v1.js?v=4','__TIA_TATI_MAGIC_MIRROR_NETWORK_V1__',()=>load('magic-mirror-core-v2.js?v=4','__TIA_TATI_MAGIC_MIRROR_V2__',()=>load('magic-mirror-visual-v2.js?v=4','__TIA_TATI_MAGIC_MIRROR_VISUAL_V2__')));
})();