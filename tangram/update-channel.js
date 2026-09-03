(()=>{
  const CHANNEL='stable';
  const VERSION='1.1.0';
  let refreshing=false;

  const style=document.createElement('style');
  style.textContent=`
    #raiUpdateBanner{position:fixed;left:50%;bottom:max(14px,env(safe-area-inset-bottom));transform:translate(-50%,18px);z-index:2147483647;width:min(520px,calc(100vw - 24px));box-sizing:border-box;background:rgba(7,27,40,.98);color:#eaffff;border:1px solid #4d8aa1;border-radius:16px;padding:12px 13px;box-shadow:0 14px 42px rgba(0,0,0,.45);font-family:system-ui;opacity:0;pointer-events:none;transition:.2s ease}
    #raiUpdateBanner.show{opacity:1;transform:translate(-50%,0);pointer-events:auto}
    #raiUpdateBanner .rai-up-title{font-weight:900;font-size:14px;color:#93efff;margin-bottom:3px}
    #raiUpdateBanner .rai-up-text{font-size:12px;line-height:1.4;color:#cde9f1}
    #raiUpdateBanner .rai-up-actions{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
    #raiUpdateBanner button{border:1px solid #48788d;background:#102f40;color:#fff;border-radius:10px;padding:9px 11px;font-weight:850;cursor:pointer}
    #raiUpdateBanner button.primary{background:linear-gradient(135deg,#0a9bb8,#0b806f);border-color:#70ead2}
    @media(max-width:520px){#raiUpdateBanner{bottom:max(9px,env(safe-area-inset-bottom));border-radius:14px}}
  `;
  document.head.appendChild(style);

  const banner=document.createElement('div');
  banner.id='raiUpdateBanner';
  banner.setAttribute('role','status');
  banner.setAttribute('aria-live','polite');
  banner.innerHTML=`<div class="rai-up-title">✨ Nova atualização disponível</div>
    <div class="rai-up-text">Há uma versão mais recente do Tangram R.A.I. pronta para usar.</div>
    <div class="rai-up-actions"><button type="button" class="primary" id="raiUpdateNow">Atualizar agora</button><button type="button" id="raiUpdateLater">Depois</button></div>`;
  document.body.appendChild(banner);

  const show=reg=>{
    if(!reg||!reg.waiting)return;
    banner.classList.add('show');
    banner.querySelector('#raiUpdateNow').onclick=()=>{
      const btn=banner.querySelector('#raiUpdateNow');
      btn.disabled=true;
      btn.textContent='Atualizando...';
      reg.waiting.postMessage({type:'SKIP_WAITING'});
    };
    banner.querySelector('#raiUpdateLater').onclick=()=>banner.classList.remove('show');
  };

  if(!('serviceWorker' in navigator))return;

  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(refreshing)return;
    refreshing=true;
    location.reload();
  });

  const wire=async()=>{
    try{
      let reg=await navigator.serviceWorker.getRegistration('./');
      if(!reg)reg=await navigator.serviceWorker.register('sw.js',{scope:'./',updateViaCache:'none'});
      if(reg.waiting&&navigator.serviceWorker.controller)show(reg);

      reg.addEventListener('updatefound',()=>{
        const worker=reg.installing;
        if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed'&&navigator.serviceWorker.controller)show(reg);
        });
      });

      const check=()=>reg.update().catch(()=>{});
      document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check()});
      window.addEventListener('online',check);
      setInterval(check,60*60*1000);
      setTimeout(check,2500);
    }catch(e){
      console.warn('Canal de atualização',e);
    }
  };
  wire();

  window.TangramRAI={channel:CHANNEL,version:VERSION,checkUpdates:wire};
})();
