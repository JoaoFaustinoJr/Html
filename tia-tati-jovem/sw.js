/* Tia Tati Jovem — service worker neutro de estabilidade.
   Não intercepta navegação nem injeta scripts enquanto os apps são estabilizados. */
const LEGACY_CACHE='tia-tati-v45-identity-20260910';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k===LEGACY_CACHE||k.startsWith('tia-tati-jovem-')).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
