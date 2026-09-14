(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_V57__)return;
window.__TIA_TATI_JOVEM_V57__=true;

const V='57';
const root=document.documentElement;
root.classList.add('tia-jovem-boot');

const critical=document.createElement('style');
critical.id='tia-jovem-critical';
critical.textContent=`
html.tia-jovem-boot body{background:#07132f!important}
html.tia-jovem-boot header.topbar,html.tia-jovem-boot #bottomNav{display:none!important}
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
html.tia-jovem-boot:not(.tia-jovem-ready) #screen-home>.youth-challenges,
html.tia-jovem-boot:not(.tia-jovem-ready) #screen-home>.jovem-home-hero{visibility:hidden!important}
#tiaJovemStatus{position:fixed;z-index:99999;left:50%;top:50%;transform:translate(-50%,-50%);width:min(88vw,360px);padding:16px 18px;border-radius:18px;background:rgba(10,20,58,.97);border:1px solid rgba(61,224,255,.35);box-shadow:0 18px 50px rgba(0,0,0,.42);color:#eefcff;text-align:center;font:700 14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
#tiaJovemStatus b{display:block;color:#45e8ff;font-size:16px;margin-bottom:4px}
html.tia-jovem-ready #tiaJovemStatus{display:none!important}
`;
document.head.appendChild(critical);

const status=document.createElement('div');
status.id='tiaJovemStatus';
status.innerHTML='<b>Modo Jovem</b>Preparando atividades…';
(document.body||document.documentElement).appendChild(status);

try{
  if('caches'in window)caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-jovem-')).map(k=>caches.delete(k)))).catch(()=>{});
  if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js?v=57',{updateViaCache:'none'}).catch(()=>{});
}catch(_){}

function loadStyle(file){
  return new Promise(resolve=>{
    [...document.querySelectorAll('link[rel="stylesheet"]')].filter(l=>(l.getAttribute('href')||'').split('?')[0]===file).forEach(l=>l.remove());
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=file+'?v='+V;
    link.onload=()=>resolve(true);
    link.onerror=()=>resolve(false);
    document.head.appendChild(link);
    setTimeout(()=>resolve(false),5000);
  });
}

function loadScript(file,{optional=false}={}){
  return new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=file+'?v='+V;
    s.async=false;
    s.dataset.tiaJovemModule=file;
    s.onload=()=>resolve(true);
    s.onerror=()=>optional?resolve(false):reject(new Error('Falha ao carregar '+file));
    document.head.appendChild(s);
  });
}

function applyCompletionAvatar(){
  document.querySelectorAll('#screen-done .done > img').forEach(img=>{
    img.src='assets/completion-avatar.webp?v=57';
    img.alt='Tia Tati comemorando a conquista';
    img.decoding='async';
  });
}

(async()=>{
  try{
    status.innerHTML='<b>Modo Jovem</b>Carregando visual…';
    await Promise.all([
      'sensory-v40.css',
      'remaining-v41.css',
      'polish-v43.css',
      'jovem-v1.css',
      'jovem-theme-v27.css',
      'jovem-hotfix-v57.css'
    ].map(loadStyle));

    // Primeiro carregamos todos os motores que CRIAM cards.
    const engines=[
      'app-core-v39.js',
      'sensory-v40.js',
      'remaining-v41.js',
      'jovem-v1.js',
      'jovem-labs-v1.js',
      'jovem-nav-v55.js'
    ];
    for(const file of engines){
      status.innerHTML='<b>Modo Jovem</b>Carregando '+file.replace('.js','')+'…';
      await loadScript(file);
    }

    // Força os criadores dinâmicos (inclusive Ping/Piano) antes de colar as artes.
    window.dispatchEvent(new Event('tia:jovem-modules-ready'));
    await new Promise(r=>setTimeout(r,120));

    status.innerHTML='<b>Modo Jovem</b>Preparando cards…';
    await loadScript('jovem-cards-static-v54.js');

    if(window.TiaTatiJovemCardsReady){
      status.innerHTML='<b>Modo Jovem</b>Preparando imagens…';
      await window.TiaTatiJovemCardsReady;
    }

    applyCompletionAvatar();
    window.TiaTatiJovemNav?.bindDirect?.();
    root.classList.add('tia-jovem-ready');
    window.dispatchEvent(new Event('tia:jovem-modules-ready'));

    loadScript('naming-v42.js',{optional:true});
  }catch(err){
    console.error('Tia Tati Jovem v57',err);
    status.innerHTML='<b>Não foi possível iniciar</b>'+String(err.message||err)+'<br><small>Reabra esta página.</small>';
  }
})();

window.addEventListener('pageshow',()=>{
  applyCompletionAvatar();
  window.TiaTatiJovemNav?.bindDirect?.();
});
})();