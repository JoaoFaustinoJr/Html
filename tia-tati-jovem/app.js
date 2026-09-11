(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_LOADER__)return;
window.__TIA_TATI_JOVEM_LOADER__=true;

/* Isolamento crítico: entra antes dos módulos compartilhados para que a home Kids
   nunca seja exibida como interface do Modo Jovem. */
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

const V='j3';
const addCss=href=>{
 if(document.querySelector(`link[href^="${href}"]`))return;
 const l=document.createElement('link');
 l.rel='stylesheet';
 l.href=href+'?v='+V;
 document.head.appendChild(l);
};
/* V44/V45 eram camadas de apresentação combinada Kids+Jovem. Não são necessárias
   para os motores e não devem participar da home independente do Jovem. */
['sensory-v40.css','remaining-v41.css','polish-v43.css','jovem-v1.css'].forEach(addCss);

const load=src=>new Promise((resolve,reject)=>{
 const s=document.createElement('script');
 s.src=src+'?v='+V;
 s.async=false;
 s.onload=resolve;
 s.onerror=reject;
 document.body.appendChild(s);
});

(async()=>{
 try{
  await load('app-core-v39.js');
  await load('sensory-v40.js');
  await load('remaining-v41.js');
  await load('naming-v42.js');
  await load('jovem-v1.js');
  document.documentElement.classList.add('tia-jovem-ready');
 }catch(err){
  console.error('Tia Tati Jovem: falha ao carregar módulo',err);
 }
})();
})();
