const CACHE_PREFIX='tia-tati-kids-';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  try{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)).map(k=>caches.delete(k)));
  }catch(_){ }
  await self.clients.claim();
})()));
/* v6: o Service Worker não modifica HTML nem intercepta fetch.
   A aplicação é carregada diretamente pelo index.html para evitar corrida de inicialização. */
