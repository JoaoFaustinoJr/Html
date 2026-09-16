const C='divina-misericordia-v7';
const A=['./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  const u=new URL(r.url);
  const fresh=r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/styles-v2.css')||u.pathname.endsWith('/sw.js');
  if(fresh){
    e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r).then(x=>x||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(C).then(c=>c.put(r,copy))}return res})));
});