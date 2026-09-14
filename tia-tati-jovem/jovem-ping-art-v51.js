(()=>{
'use strict';
if(window.__TIA_TATI_COMPAT_STATIC_V56__)return;
window.__TIA_TATI_COMPAT_STATIC_V56__=true;

function ensureTheme(){
  if([...document.querySelectorAll('link[rel="stylesheet"]')].some(l=>(l.getAttribute('href')||'').split('?')[0].endsWith('jovem-theme-v27.css')))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='jovem-theme-v27.css?v=56';
  document.head.appendChild(link);
}

function ensureScript(src,key){
  if(document.querySelector(`script[data-${key}]`))return;
  const s=document.createElement('script');
  s.setAttribute('data-'+key,'1');
  s.src=src+'?v=56';
  s.async=false;
  document.head.appendChild(s);
}

function boot(){
  ensureTheme();
  if(!window.__TIA_TATI_JOVEM_NAV_V56__)ensureScript('jovem-nav-v55.js','j56-nav-compat');
  if(!window.__TIA_TATI_JOVEM_STATIC_CARDS_V56__)ensureScript('jovem-cards-static-v54.js','j56-cards-compat');
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('pageshow',boot);
})();