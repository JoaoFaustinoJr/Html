const CACHE='tia-tati-jovem-pwa-v36';
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-jovem-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=new URL(e.request.url);
 if(u.origin!==self.location.origin||!u.pathname.includes('/Html/tia-tati-jovem/'))return;
 e.respondWith(fetch(new Request(e.request,{cache:'no-cache'})).catch(()=>caches.match(e.request,{ignoreSearch:true})).then(async r=>{
  if(r&&r.ok){const c=await caches.open(CACHE);c.put(e.request,r.clone()).catch(()=>{});}return r;
 }));
});