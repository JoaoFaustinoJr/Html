const CACHE='tia-tati-v49-direct-activity-20260910';
const CORE=[
 './shell-v48.html?v=48','./shell-v48.css?v=48','./shell-v48.js?v=48','./manifest.webmanifest',
 './index.html?legacy=1&offline=1','./styles.css?v=39','./app.js?v=39','./legacy-bridge-v49.js?v=49',
 './app-base-v39.js?v=49','./sensory-v40.js?v=49','./remaining-v41.js?v=49','./naming-v42.js?v=49','./final-v44.js?v=49','./identity-v45.js?v=49',
 './styles-base-v39.css?v=47','./sensory-v40.css?v=47','./remaining-v41.css?v=47','./polish-v43.css?v=47','./final-v44.css?v=47','./identity-v45.css?v=47',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg',
 './assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/reflexo-neon.webp','./assets/cards/memorize.webp','./assets/cards/beat-move.webp'
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
async function shellResponse(){
 try{return await fetch('./shell-v48.html?v=48',{cache:'no-store'});}catch(_){return (await caches.match('./shell-v48.html?v=48'))||Response.error();}
}
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(event.request.mode==='navigate'){
  if(url.searchParams.has('legacy')){
   event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match('./index.html?legacy=1&offline=1')));
  }else{
   event.respondWith(shellResponse());
  }
  return;
 }
 if(url.origin!==location.origin)return;
 const fresh=/\/(shell-v48\.(?:css|js)|app\.js|legacy-bridge-v49\.js|styles\.css|app-base-v39\.js|sensory-v40\.(?:js|css)|remaining-v41\.(?:js|css)|naming-v42\.js|polish-v43\.css|final-v44\.(?:js|css)|identity-v45\.(?:js|css))$/.test(url.pathname);
 if(fresh){
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request)));
  return;
 }
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;})));
});
