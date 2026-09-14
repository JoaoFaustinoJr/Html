(()=>{
'use strict';
if(window.__TIA_TATI_COMPAT_STATIC_V54__)return;
window.__TIA_TATI_COMPAT_STATIC_V54__=true;

async function loadStaticCards(){
  if(window.__TIA_TATI_JOVEM_STATIC_CARDS_V54__)return;
  try{
    const url=new URL('jovem-cards-static-v54.js?v=54&t='+Date.now(),document.baseURI);
    const res=await fetch(url.href,{cache:'no-store',credentials:'same-origin'});
    if(!res.ok)throw new Error('HTTP '+res.status);
    const code=await res.text();
    if(!code||code.length<100)throw new Error('módulo incompleto');
    const fn=new Function(code+'\n//# sourceURL=jovem-cards-static-v54.js?compat');
    fn.call(window);
  }catch(err){
    console.warn('Tia Tati Jovem: compatibilidade v54 não pôde ser aplicada.',err);
    const img=document.querySelector('[data-jlab="ping-focus"] .youth-card-art img');
    if(img)img.src='assets/jovem-v27/pingpong-approved-v54.webp?v=54';
  }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',loadStaticCards,{once:true});
else loadStaticCards();
window.addEventListener('pageshow',loadStaticCards);
})();