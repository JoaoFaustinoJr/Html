const CACHE='tangram-rai-v12-13';
const ASSETS=['./','./index.html','./content-v12.json','./manifest.webmanifest','./v10.css','./comfort-v11.css','./focus-v11.css','./performance-v12.css','./app-v10.js','./comfort-v11.js','./performance-v12.js','./icon-192.png','./icon-512.png','./apple-touch-icon.png','../tangram-prof-junior/rai-chalk.webp','../tangram-prof-junior/chunk01.txt','../tangram-prof-junior/chunk02-03.txt','../tangram-prof-junior/chunk04-05.txt','../tangram-prof-junior/chunk06-07.txt','../tangram-prof-junior/chunk08-09.txt'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(ASSETS.map(u=>cache.add(u).catch(()=>null)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tangram-rai-v12-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(resp=>{if(resp&&resp.ok){const clone=resp.clone();caches.open(CACHE).then(c=>c.put('./index.html',clone))}return resp}).catch(()=>caches.match('./index.html')));return;
  }
  const u=new URL(event.request.url);
  const live=/\/(app-v10\.js|comfort-v11\.js|performance-v12\.js|rai-tutor-v13\.js|v10\.css|comfort-v11\.css|focus-v11\.css|performance-v12\.css|rai-tutor-v13\.css|content-v12\.json|manifest\.webmanifest|icon-192\.png|icon-512\.png|apple-touch-icon\.png)$/.test(u.pathname);
  if(live){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(resp=>{if(resp&&resp.ok){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,clone))}return resp}).catch(()=>caches.match(event.request,{ignoreSearch:true})));
    return;
  }
  event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(cached=>cached||fetch(event.request).then(resp=>{if(resp&&resp.ok&&u.origin===self.location.origin){const clone=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,clone))}return resp})));
});
