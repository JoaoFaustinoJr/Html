const CACHE='tia-tati-v18-1-20260909';
const CORE=[
 './','./index.html','./styles.css?v=18.1','./app.js?v=18.1','./manifest.webmanifest',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r;}).catch(()=>caches.match('./index.html')));
  return;
 }
 if(url.origin===location.origin){
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;})));
 }
});