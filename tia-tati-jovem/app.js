(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LOADER__)return;
window.__TIA_TATI_JOVEM_LOADER__=true;

document.documentElement.classList.add('tia-jovem-boot','tia-jovem-loading');
const critical=document.createElement('style');
critical.id='tia-jovem-critical';
critical.textContent=`
html.tia-jovem-boot body{background:#07132f!important}
html.tia-jovem-boot header.topbar,
html.tia-jovem-boot #bottomNav{display:none!important}
html.tia-jovem-boot #screen-home>.home-v22-hero,
html.tia-jovem-boot #screen-home>.audience-v44,
html.tia-jovem-boot #screen-home>.kids-v44,
html.tia-jovem-boot #screen-home>.home-v22-section-head,
html.tia-jovem-boot #screen-home>.home-v22-missions,
html.tia-jovem-boot #screen-home>.home-v22-autonomy,
html.tia-jovem-boot #screen-home>.support-v44,
html.tia-jovem-boot #screen-home>.home-v22-cards,
html.tia-jovem-boot #screen-home>.home-v22-tools,
html.tia-jovem-boot #screen-home>.finish-v44,
html.tia-jovem-boot #screen-home>.home-v22-footer-phrase{display:none!important}
html.tia-jovem-loading #screen-home .youth-card-grid{pointer-events:none!important;opacity:.72}
#tiaJovemBootStatus{position:fixed;z-index:9999;left:50%;bottom:18px;transform:translateX(-50%);padding:8px 12px;border-radius:999px;background:#101a49;color:#dffaff;border:1px solid rgba(61,224,255,.35);font:700 12px system-ui;box-shadow:0 8px 24px rgba(0,0,0,.28)}
html:not(.tia-jovem-loading) #tiaJovemBootStatus{display:none!important}
`;
document.head.appendChild(critical);

const status=document.createElement('div');
status.id='tiaJovemBootStatus';
status.textContent='Preparando desafios…';
(document.body||document.documentElement).appendChild(status);

const V='j6';
const stamp=Date.now();
const addCss=href=>{
 const old=[...document.querySelectorAll('link[rel="stylesheet"]')].find(x=>(x.getAttribute('href')||'').startsWith(href));
 if(old)old.remove();
 const l=document.createElement('link');
 l.rel='stylesheet';
 l.href=`${href}?v=${V}&t=${stamp}`;
 document.head.appendChild(l);
};
/* j5 foi removido do carregamento: era somente acabamento e introduziu a regressão. */
['sensory-v40.css','remaining-v41.css','polish-v43.css','jovem-v1.css'].forEach(addCss);

const loadOnce=src=>new Promise((resolve,reject)=>{
 const s=document.createElement('script');
 s.src=`${src}?v=${V}&t=${stamp}`;
 s.async=false;
 s.onload=()=>resolve(src);
 s.onerror=()=>reject(new Error('Falha ao carregar '+src));
 document.body.appendChild(s);
});

const loadSafe=async src=>{
 try{return await loadOnce(src);}
 catch(first){
  console.warn('Tia Tati Jovem: tentando novamente',src);
  try{
   const s=document.createElement('script');
   s.src=`${src}?v=${V}&retry=${Date.now()}`;
   s.async=false;
   await new Promise((resolve,reject)=>{s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
   return src;
  }catch(second){console.error('Tia Tati Jovem: módulo indisponível',src,second);return null;}
 }
};

(async()=>{
 /* Home isolada primeiro. */
 await loadSafe('jovem-v1.js');
 /* Motor principal estável V39. */
 const core=await loadSafe('app-core-v39.js');
 if(!core){
  status.textContent='Não foi possível iniciar. Reabra pelo Portal Tia Tati.';
  return;
 }
 /* Motores das experiências compartilhadas. */
 await loadSafe('sensory-v40.js');
 await loadSafe('remaining-v41.js');
 await loadSafe('naming-v42.js');
 document.documentElement.classList.add('tia-jovem-ready');
 document.documentElement.classList.remove('tia-jovem-loading');
 window.dispatchEvent(new Event('tia:jovem-modules-ready'));
})();
})();
