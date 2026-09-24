/* Tia Tati Kids — SW v22: estabilidade, sem reescrita de HTML/JS. */
const CACHE='tia-tati-kids-v22';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-kids-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin===self.location.origin && url.pathname.includes('/tia-tati-kids/')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));
  }
});