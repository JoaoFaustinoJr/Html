const CACHE='tia-tati-jovem-pwa-v34';
const SHELL=['./entry-j20.html','./index.html','./manifest.webmanifest','./manual-jovem.html','./styles.css','./sensory-v40.css','./remaining-v41.css','./polish-v43.css','./jovem-v1.css','./jovem-refine-j12.css','./jovem-assets-j13.css','./jovem-layout-j15.css','./app-core-v39.js','./sensory-v40.js','./remaining-v41.js','./jovem-v20.js','./jovem-ptbr-j16.js','./jovem-assets-j20.js','./jovem-finish-v29.js','./jovem-music-v1.js','./jovem-labs-v1.js'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-jovem-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 if(!url.pathname.includes('/Html/tia-tati-jovem/'))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,c)).catch(()=>{});return r;}).catch(()=>caches.match('./entry-j20.html')));
  return;
 }
 event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(hit=>hit||fetch(event.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,c)).catch(()=>{});}return r;})));
});