(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_SYNC_BOOT__)return;
window.__TIA_TATI_JOVEM_SYNC_BOOT__=true;

/*
  J7: bootstrap deliberadamente simples.
  O antigo loader assíncrono podia deixar a home visível enquanto aguardava
  um módulo e mantinha os cards sem clique. Aqui não há Promise, onload ou
  estado de espera: os scripts entram na fila do parser em ordem fixa.
*/
const V='j7';

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

['sensory-v40.css','remaining-v41.css','polish-v43.css','jovem-v1.css'].forEach(href=>{
  const l=document.createElement('link');
  l.rel='stylesheet';
  l.href=href+'?v='+V;
  document.head.appendChild(l);
});

const scripts=[
  'app-core-v39.js',
  'sensory-v40.js',
  'remaining-v41.js',
  'naming-v42.js',
  'jovem-v1.js'
];
for(const src of scripts){
  document.write('<script src="'+src+'?v='+V+'"></'+'script>');
}
})();
