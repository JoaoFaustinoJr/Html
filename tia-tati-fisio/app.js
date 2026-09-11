(()=>{
'use strict';
const VERSION='63';
const essential=['app-base-v39.js'];
const extensions=['sensory-v40.js','remaining-v41.js','naming-v42.js','final-v44.js','identity-v45.js'];

function loadScript(src,timeoutMs=6000){
 return new Promise(resolve=>{
  const s=document.createElement('script');
  let done=false;
  const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(ok);};
  s.src=src+'?v='+VERSION+'&t='+Date.now();
  s.async=false;
  s.onload=()=>finish(true);
  s.onerror=()=>finish(false);
  const timer=setTimeout(()=>{try{s.remove();}catch(_){}finish(false);},timeoutMs);
  document.body.appendChild(s);
 });
}

(async()=>{
 const coreOk=await loadScript(essential[0],8000);
 document.documentElement.dataset.tiaCore=coreOk?'ready':'failed';
 if(!coreOk){
  const warn=document.createElement('div');
  warn.setAttribute('role','status');
  warn.style.cssText='position:fixed;left:12px;right:12px;bottom:76px;z-index:99999;padding:12px 14px;border-radius:14px;background:#fff3f6;color:#9c224b;font:700 14px system-ui;box-shadow:0 8px 30px #0002;text-align:center';
  warn.textContent='Não foi possível iniciar as atividades. Recarregue esta página.';
  document.body.appendChild(warn);
  return;
 }
 const startExtensions=async()=>{
  for(const src of extensions) await loadScript(src,5000);
 };
 if('requestIdleCallback' in window) requestIdleCallback(()=>startExtensions(),{timeout:1200});
 else setTimeout(startExtensions,120);
})();
})();
