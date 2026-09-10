const CACHE='tia-tati-v47-direct-identity-20260910';
const CORE=[
 './','./index.html','./styles.css?v=39','./app.js?v=39','./manifest.webmanifest',
 './styles-base-v39.css?v=47','./app-base-v39.js?v=47',
 './sensory-v40.css?v=47','./sensory-v40.js?v=47',
 './remaining-v41.css?v=47','./remaining-v41.js?v=47',
 './naming-v42.js?v=47','./polish-v43.css?v=47',
 './final-v44.css?v=47','./final-v44.js?v=47',
 './identity-v45.css?v=47','./identity-v45.js?v=47',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg',
 './assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/beat-move.webp','./assets/cards/memorize.webp','./assets/cards/reflexo-neon.webp'
];

self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(CORE);
  await self.skipWaiting();
 })());
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
  const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  await Promise.all(clients.map(client=>{
   try{
    const url=new URL(client.url);
    if(url.pathname.includes('/tia-tati-fisio/')) return client.navigate(client.url);
   }catch(_){ }
   return Promise.resolve();
  }));
 })());
});

self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET') return;
 const url=new URL(event.request.url);
 if(url.origin!==location.origin) return;

 if(event.request.mode==='navigate'){
  event.respondWith((async()=>{
   try{
    const response=await fetch(event.request,{cache:'no-store'});
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
    return response;
   }catch(_){
    return (await caches.match('./index.html')) || Response.error();
   }
  })());
  return;
 }

 const directUI=/\/(styles|app)\.css$|\/(app)\.js$|\/(styles-base-v39\.css|app-base-v39\.js|sensory-v40\.(css|js)|remaining-v41\.(css|js)|naming-v42\.js|polish-v43\.css|final-v44\.(css|js)|identity-v45\.(css|js))$/.test(url.pathname);
 if(directUI){
  event.respondWith((async()=>{
   try{
    const response=await fetch(event.request,{cache:'no-store'});
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
   }catch(_){
    return (await caches.match(event.request)) || Response.error();
   }
  })());
  return;
 }

 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
  const copy=response.clone();
  caches.open(CACHE).then(cache=>cache.put(event.request,copy));
  return response;
 })));
});
