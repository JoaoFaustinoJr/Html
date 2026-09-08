
(()=>{
 const OFFICIAL='https://joaofaustinojr.github.io/Html/tangram-prof-junior-v12/';
 if(location.pathname.includes('/tangram-prof-junior-v12/'))return;
 function mount(){
   if(document.getElementById('raiLegacyUpdate'))return;
   const bar=document.createElement('div');
   bar.id='raiLegacyUpdate';
   bar.style.cssText='position:fixed;left:8px;right:8px;bottom:max(8px,env(safe-area-inset-bottom));z-index:2147483640;display:flex;align-items:center;gap:9px;padding:9px 10px;border:1px solid #4c8092;border-radius:14px;background:rgba(7,27,40,.97);box-shadow:0 8px 28px rgba(0,0,0,.38);color:#eafaff;font:800 11px/1.3 system-ui';
   bar.innerHTML='<span style="font-size:18px">✨</span><span style="flex:1"><b style="color:#9ff0de">Nova versão disponível</b><br><small style="color:#a9ced8">Gamer, Aulas R.A.I. e atualização automática</small></span><button id="raiLegacyGo" type="button" style="border:0;border-radius:10px;padding:8px 10px;background:#f4c542;color:#10202c;font:900 11px system-ui">Atualizar</button><button id="raiLegacyHide" type="button" aria-label="Fechar" style="border:0;background:transparent;color:#fff;font-size:18px;padding:3px">×</button>';
   document.body.appendChild(bar);
   bar.querySelector('#raiLegacyHide').addEventListener('click',()=>bar.remove());
   bar.querySelector('#raiLegacyGo').addEventListener('click',async()=>{
     try{
       if('serviceWorker' in navigator){
         const regs=await navigator.serviceWorker.getRegistrations();
         const here=location.pathname.replace(/index\.html.*$/,'');
         await Promise.all(regs.filter(r=>r.scope.includes(here)).map(r=>r.unregister()));
       }
     }catch(e){}
     location.href=OFFICIAL;
   });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
