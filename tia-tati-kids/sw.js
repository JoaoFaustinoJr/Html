/* Tia Tati Kids — service worker neutro de estabilidade.
   Nesta fase ele NÃO intercepta navegação nem injeta scripts.
   O objetivo é preservar exatamente o runtime funcional do app. */
const LEGACY_CACHE='tia-tati-v45-identity-20260910';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k===LEGACY_CACHE||k.startsWith('tia-tati-kids-')).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
