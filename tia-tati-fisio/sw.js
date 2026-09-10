const CACHE='tia-tati-v59-native-route-20260910';
const CORE=[
 './index.html','./home-v51.css?v=54','./home-v51-polish.css?v=54','./home-v53.css?v=54','./home-v53-linkfix.css?v=54','./home-v54.css?v=54','./home-v54.js?v=58','./manifest.webmanifest?v=54',
 './activity-v54.html','./activity-v56.html','./activity-v57.html','./activity-v58.html','./activity.html','./styles.css?v=59','./app.js?v=39','./deep-link-v59.js?v=59',
 './app-base-v39.js?v=59','./sensory-v40.js?v=59','./remaining-v41.js?v=59','./naming-v42.js?v=59','./final-v44.js?v=59','./identity-v45.js?v=59',
 './styles-base-v39.css?v=47','./sensory-v40.css?v=47','./remaining-v41.css?v=47','./polish-v43.css?v=47','./final-v44.css?v=47','./identity-v45.css?v=47',
 './assets/tati-approved-avatar.webp','./assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg','./assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/reflexo-neon.webp','./assets/cards/memorize.webp','./assets/cards/beat-move.webp'
];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);await Promise.allSettled(CORE.map(url=>cache.add(url)));await self.skipWaiting();})());});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(async()=>{
   if(/\/activity-v(?:54|56|57|58)\.html$/.test(url.pathname))return(await caches.match('./activity-v58.html'))||Response.error();
   if(url.pathname.endsWith('/activity.html'))return(await caches.match('./activity.html'))||Response.error();
   return(await caches.match('./index.html'))||Response.error();
  }));return;
 }
 const fresh=/\/(home-v54\.js|activity-v(?:54|56|57|58)\.html|activity\.html|app\.js|deep-link-v59\.js|styles\.css|app-base-v39\.js|sensory-v40\.(?:js|css)|remaining-v41\.(?:js|css)|naming-v42\.js|polish-v43\.css|final-v44\.(?:js|css)|identity-v45\.(?:js|css)|assets\/cards\/(?:reflexo-neon|memorize|beat-move)\.webp)$/.test(url.pathname);
 if(fresh){event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;}).catch(()=>caches.match(event.request,{ignoreSearch:true})));return;}
 event.respondWith(caches.match(event.request,{ignoreSearch:true}).then(hit=>hit||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;})));
});
