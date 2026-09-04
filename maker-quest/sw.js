const CACHE='maker-quest-v4-install-20260904';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./rai-icon.svg','./icon-mq-192-v3.png','./icon-mq-512-v3.png','./maker-quest-share.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(x=>x.put(e.request,cp));return r}).catch(()=>caches.match('./index.html'))))});