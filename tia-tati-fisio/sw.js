const CACHE_PREFIX='tia-tati-';
self.addEventListener('install',event=>{
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)).map(k=>caches.delete(k)));
    }catch(_){}
    await self.clients.claim();
  })());
});
/* v61 recovery worker: intentionally no fetch interception.
   The app runs network-first while navigation is stabilized. */
