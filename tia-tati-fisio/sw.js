const CACHE='tia-tati-v60-single-page-20260910';
const CORE=[
 './activity.html','./styles.css','./app.js',
 './app-base-v39.js','./sensory-v40.js','./remaining-v41.js','./naming-v42.js','./final-v44.js','./identity-v45.js',
 './styles-base-v39.css?v=47','./sensory-v40.css?v=47','./remaining-v41.css?v=47','./polish-v43.css?v=47','./final-v44.css?v=47','./identity-v45.css?v=47',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg','./assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/reflexo-neon.webp','./assets/cards/memorize.webp','./assets/cards/beat-move.webp'
];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.allSettled(CORE.map(url=>cache.add(url)));
  await self.skipWaiting();
 })());
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
   return (await caches.match('./activity.html'))||Response.error();
  }));
  return;
 }
 const fresh=/\/(?:app\.js|app-base-v39\.js|sensory-v40\.js|remaining-v41\.js|naming-v42\.js|final-v44\.js|identity-v45\.js|styles\.css)$/.test(url.pathname);
 if(fresh){
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{
   const copy=response.clone();
   caches.open(CACHE).then(cache=>cache.put(event.request,copy));
   return response;
  }).catch(()=>caches.match(event.request,{ignoreSearch:true})));
  return;
 }
 event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(hit=>hit||fetch(event.request).then(response=>{
  const copy=response.clone();
  caches.open(CACHE).then(cache=>cache.put(event.request,copy));
  return response;
 })));
});
