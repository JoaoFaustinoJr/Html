// Tangram Educativo — Service Worker v15.15.2
// Rede é a fonte de verdade. O cache existe somente para contingência offline.
const CACHE='tangram-rai-v12-83';
const PREFIX='tangram-rai-v12-';
const OFFLINE_SHELL=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.webp','./apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(OFFLINE_SHELL.map(url=>new Request(url,{cache:'reload'}))))
      .catch(()=>{})
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirst(request, fallbackUrl){
  const cache=await caches.open(CACHE);
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response&&response.ok){
      await cache.put(request,response.clone()).catch(()=>{});
      if(fallbackUrl)await cache.put(fallbackUrl,response.clone()).catch(()=>{});
    }
    return response;
  }catch(error){
    const cached=await cache.match(request,{ignoreSearch:true}) || (fallbackUrl&&await cache.match(fallbackUrl,{ignoreSearch:true}));
    if(cached)return cached;
    throw error;
  }
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith(networkFirst(event.request,'./index.html'));
    return;
  }

  // HTML, JS, CSS, JSON e manifesto nunca devem ser substituídos por uma
  // versão antiga enquanto a rede estiver disponível.
  if(/\.(?:html?|js|css|json|webmanifest)$/i.test(url.pathname)){
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Imagens/fontes: cache primeiro é seguro; atualiza o cache quando necessário.
  event.respondWith(
    caches.match(event.request,{ignoreSearch:true}).then(cached=>{
      if(cached)return cached;
      return fetch(event.request).then(response=>{
        if(response&&response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});
        }
        return response;
      });
    })
  );
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
  if(event.data&&event.data.type==='CLEAR_OLD_CACHES'){
    event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  }
});
