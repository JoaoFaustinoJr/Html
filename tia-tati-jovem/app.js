(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LOADER__)return;
window.__TIA_TATI_JOVEM_LOADER__=true;

document.documentElement.classList.add('tia-jovem-boot');
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
`;
document.head.appendChild(critical);

const V='j4';
const stamp=Date.now();
const addCss=href=>{
 const old=[...document.querySelectorAll('link[rel="stylesheet"]')].find(x=>(x.getAttribute('href')||'').startsWith(href));
 if(old)old.remove();
 const l=document.createElement('link');
 l.rel='stylesheet';
 l.href=`${href}?v=${V}&t=${stamp}`;
 document.head.appendChild(l);
};
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
 /* A camada Jovem entra primeiro para que hero e seis cards não dependam dos motores. */
 await loadSafe('jovem-v1.js');
 /* O motor base é preservado; os módulos especializados podem falhar isoladamente sem abortar a home. */
 await loadSafe('app-core-v39.js');
 await loadSafe('sensory-v40.js');
 await loadSafe('remaining-v41.js');
 await loadSafe('naming-v42.js');
 document.documentElement.classList.add('tia-jovem-ready');
 window.dispatchEvent(new Event('tia:jovem-modules-ready'));
})();
})();
