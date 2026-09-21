(()=>{'use strict';
try{
 document.querySelectorAll('.tt-mosaic-overlay,.tt-simple-tangram,.tt-classic').forEach(x=>x.remove());
 const old=document.getElementById('ttMosaicStyle'); if(old)old.remove();
}catch(_){}
if(window.__TIA_TATI_CLASSIC_BOOTSTRAP__)return;
window.__TIA_TATI_CLASSIC_BOOTSTRAP__=true;
const s=document.createElement('script');
s.src='tangram-classic-v1.js?v=20260921-1156';
s.async=false;
(document.head||document.documentElement).appendChild(s);
})();