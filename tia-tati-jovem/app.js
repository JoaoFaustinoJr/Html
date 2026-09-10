(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LOADER__)return;window.__TIA_TATI_JOVEM_LOADER__=true;
const V='j2';
const addCss=href=>{if(document.querySelector(`link[href^="${href}"]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href+'?v='+V;document.head.appendChild(l);};
['sensory-v40.css','remaining-v41.css','polish-v43.css','final-v44.css','identity-v45.css','jovem-v1.css'].forEach(addCss);
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src+'?v='+V;s.async=false;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
(async()=>{
 try{
  await load('app-core-v39.js');
  await load('sensory-v40.js');
  await load('remaining-v41.js');
  await load('naming-v42.js');
  await load('final-v44.js');
  await load('identity-v45.js');
  await load('jovem-v1.js');
 }catch(err){console.error('Tia Tati Jovem: falha ao carregar módulo',err);}
})();
})();