(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_J13__)return;
window.__TIA_TATI_JOVEM_J13__=true;

const V='j13-v55';
const FINAL_AVATAR='assets/completion-avatar.webp?v=completion-v1';
const root=document.documentElement;
root.classList.add('tia-jovem-boot');

function applyCompletionAvatar(){
  document.querySelectorAll('#screen-done .done > img').forEach(img=>{
    if((img.getAttribute('src')||'')!==FINAL_AVATAR) img.setAttribute('src',FINAL_AVATAR);
    img.setAttribute('alt','Tia Tati comemorando a conquista');
    img.setAttribute('decoding','async');
  });
}

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
html.tia-jovem-boot:not(.tia-jovem-ready) #screen-home>.youth-challenges{visibility:hidden!important}
#tiaJovemStatus{position:fixed;z-index:99999;left:50%;top:50%;transform:translate(-50%,-50%);width:min(88vw,360px);padding:16px 18px;border-radius:18px;background:rgba(10,20,58,.96);border:1px solid rgba(61,224,255,.35);box-shadow:0 18px 50px rgba(0,0,0,.42);color:#eefcff;text-align:center;font:700 14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
#tiaJovemStatus b{display:block;color:#45e8ff;font-size:16px;margin-bottom:4px}
html.tia-jovem-ready #tiaJovemStatus{display:none!important}
`;
document.head.appendChild(critical);

['sensory-v40.css','remaining-v41.css','polish-v43.css','jovem-v1.css','jovem-theme-v27.css'].forEach(href=>{
  const old=[...document.querySelectorAll('link[rel="stylesheet"]')].find(x=>(x.getAttribute('href')||'').startsWith(href));
  if(old)old.remove();
  const l=document.createElement('link');
  l.rel='stylesheet';
  l.href=href+'?v='+V+'&t='+Date.now();
  document.head.appendChild(l);
});

const status=document.createElement('div');
status.id='tiaJovemStatus';
status.innerHTML='<b>Modo Jovem</b>Preparando os desafios…';
(document.body||document.documentElement).appendChild(status);

const wait=ms=>new Promise(r=>setTimeout(r,ms));

async function getCode(src,{attempts=3,timeout=9000,showStatus=true}={}){
  let lastErr=null;
  for(let attempt=1;attempt<=attempts;attempt++){
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),timeout);
    try{
      if(showStatus)status.innerHTML=`<b>Modo Jovem</b>Carregando ${src.replace('.js','')}…`;
      const res=await fetch(src+'?v='+V+'&a='+attempt+'&t='+Date.now(),{
        cache:'no-store',
        credentials:'same-origin',
        signal:ctrl.signal
      });
      clearTimeout(timer);
      if(!res.ok)throw new Error('HTTP '+res.status);
      const code=await res.text();
      if(!code||code.length<80)throw new Error('arquivo vazio ou incompleto');
      return code;
    }catch(err){
      clearTimeout(timer);
      lastErr=err;
      if(attempt<attempts)await wait(250*attempt);
    }
  }
  throw new Error(src+': '+(lastErr?.message||'falha de carregamento'));
}

function runCode(src,code){
  try{
    const fn=new Function(code+'\n//# sourceURL='+src+'?'+V);
    fn.call(window);
  }catch(err){
    throw new Error(src+': erro ao executar — '+err.message);
  }
}

async function loadOptional(src){
  try{
    const code=await getCode(src,{attempts:1,timeout:5000,showStatus:false});
    runCode(src,code);
  }catch(err){
    console.warn('Módulo opcional ignorado:',err);
  }
}

(async()=>{
  try{
    const coreOrder=[
      'app-core-v39.js',
      'sensory-v40.js',
      'remaining-v41.js',
      'jovem-v1.js',
      'jovem-labs-v1.js',
      'jovem-nav-v55.js',
      'jovem-cards-static-v54.js'
    ];
    for(const src of coreOrder){
      const code=await getCode(src);
      runCode(src,code);
    }

    applyCompletionAvatar();
    root.classList.add('tia-jovem-ready');
    window.dispatchEvent(new Event('tia:jovem-modules-ready'));

    loadOptional('naming-v42.js');
  }catch(err){
    console.error('Tia Tati Jovem j13-v55',err);
    status.innerHTML='<b>Não foi possível iniciar</b>'+String(err.message||err)+'<br><small>Atualize a página e tente novamente.</small>';
  }
})();

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',applyCompletionAvatar,{once:true});
}else{
  applyCompletionAvatar();
}
window.addEventListener('pageshow',applyCompletionAvatar);
})();