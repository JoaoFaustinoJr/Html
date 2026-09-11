const CACHE='tia-tati-portal-pwa-v2';
const SHELL=[
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/icon-tia-tati.svg',
  './assets/tatiana-portal-v3.webp',
  './launch-kids.html'
];

const INSTALL_VISIBILITY_PATCH=`
<style id="portalInstallVisibilityV2">
  .install-zone{
    position:fixed!important;
    z-index:99990!important;
    left:50%!important;
    right:auto!important;
    top:auto!important;
    bottom:max(22px,calc(env(safe-area-inset-bottom) + 22px))!important;
    transform:translateX(-50%)!important;
    display:flex!important;
    justify-content:center!important;
    pointer-events:auto!important;
  }
  .install-btn{
    min-height:46px!important;
    padding:11px 20px!important;
    border:2px solid rgba(242,71,154,.22)!important;
    background:rgba(255,255,255,.98)!important;
    box-shadow:0 10px 30px rgba(17,61,109,.22)!important;
    color:#0b4382!important;
    font-size:.82rem!important;
    font-weight:900!important;
    backdrop-filter:blur(12px)!important;
  }
  .install-btn b{color:#f2479a!important}
  @media(max-width:520px){
    .install-zone{bottom:max(18px,calc(env(safe-area-inset-bottom) + 18px))!important}
    .install-btn{min-height:44px!important;padding:10px 17px!important;font-size:.78rem!important}
  }
  @media(display-mode:standalone){
    .install-zone{display:none!important}
  }
</style>`;

function patchPortalHtml(html){
  if(!html || html.includes('portalInstallVisibilityV2')) return html;
  return html.replace('</head>',INSTALL_VISIBILITY_PATCH+'\n</head>');
}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-portal-pwa-')&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  if(!url.pathname.includes('/Html/tia-tati/'))return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        const type=fresh.headers.get('content-type')||'';
        if(type.includes('text/html')){
          const html=patchPortalHtml(await fresh.text());
          const headers=new Headers(fresh.headers);
          headers.set('content-type','text/html; charset=utf-8');
          headers.set('cache-control','no-store, max-age=0');
          headers.delete('content-length');
          headers.delete('content-encoding');
          const patched=new Response(html,{status:fresh.status,statusText:fresh.statusText,headers});
          const cache=await caches.open(CACHE);
          cache.put('./index.html',patched.clone()).catch(()=>{});
          return patched;
        }
        return fresh;
      }catch(_){
        const cached=(await caches.match(event.request)) || (await caches.match('./index.html'));
        if(!cached)return Response.error();
        const type=cached.headers.get('content-type')||'';
        if(type.includes('text/html')){
          const html=patchPortalHtml(await cached.text());
          const headers=new Headers(cached.headers);
          headers.set('content-type','text/html; charset=utf-8');
          headers.delete('content-length');
          headers.delete('content-encoding');
          return new Response(html,{status:cached.status,statusText:cached.statusText,headers});
        }
        return cached;
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    try{
      const fresh=await fetch(event.request,{cache:'no-store'});
      if(fresh.ok){
        const cache=await caches.open(CACHE);
        cache.put(event.request,fresh.clone()).catch(()=>{});
        return fresh;
      }
      const cached=await caches.match(event.request);
      return cached||fresh;
    }catch(_){
      return (await caches.match(event.request)) || Response.error();
    }
  })());
});
