const CACHE='tia-tati-v52-route-clean-20260910';
const CORE=[
 './index.html','./home-v51.css?v=52','./home-v51-polish.css?v=52','./home-v51.js?v=52','./manifest.webmanifest',
 './activity-v52.html','./activity.html','./styles.css?v=52','./app.js?v=52','./activity-router-v52.js?v=52',
 './app-base-v39.js?v=52','./sensory-v40.js?v=52','./remaining-v41.js?v=52','./naming-v42.js?v=52','./final-v44.js?v=52','./identity-v45.js?v=52',
 './styles-base-v39.css?v=47','./sensory-v40.css?v=47','./remaining-v41.css?v=47','./polish-v43.css?v=47','./final-v44.css?v=47','./identity-v45.css?v=47',
 './assets/tati-approved-avatar.webp',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg',
 './assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg'
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(async()=>{
   if(url.pathname.endsWith('/activity-v52.html')) return (await caches.match('./activity-v52.html'))||Response.error();
   if(url.pathname.endsWith('/activity.html')) return (await caches.match('./activity.html'))||Response.error();
   return (await caches.match('./index.html'))||Response.error();
  }));
  return;
 }
 const fresh=/\/(home-v51(?:-polish)?\.(?:css|js)|home-v52\.js|activity-v52\.html|app\.js|activity-router-v52\.js|styles\.css|app-base-v39\.js|sensory-v40\.(?:js|css)|remaining-v41\.(?:js|css)|naming-v42\.js|polish-v43\.css|final-v44\.(?:js|css)|identity-v45\.(?:js|css))$/.test(url.pathname);
 if(fresh){
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request)));
  return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;})));
});
