/* Tia Tati Kids — service worker de estabilidade.
   Mantém o runtime intacto e corrige apenas o avatar final,
   evitando a cópia antiga em cache do celebrate.webp. */
const LEGACY_CACHE='tia-tati-v45-identity-20260910';
const FINAL_AVATAR_VERSION='kids-final-avatar-v4';

self.addEventListener('install',()=>self.skipWaiting());

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k===LEGACY_CACHE||k.startsWith('tia-tati-kids-')).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(!url.pathname.endsWith('/tia-tati-kids/assets/celebrate.webp')) return;

  const avatarUrl=new URL('./assets/guide.webp?'+FINAL_AVATAR_VERSION,self.location.href);
  event.respondWith(
    fetch(avatarUrl.toString(),{cache:'no-store',credentials:'same-origin'})
      .catch(()=>fetch(event.request,{cache:'reload'}))
  );
});
