/* Tia Tati Jovem — service worker neutro de estabilidade.
   Não intercepta navegação nem injeta scripts. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-jovem-')||k==='tia-tati-v45-identity-20260910').map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
