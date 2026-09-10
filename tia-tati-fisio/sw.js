const CACHE='tia-tati-v46-identity-hotfix-20260910';
const VERSION='46';
const CORE=[
 './','./index.html','./styles.css?v=39','./app.js?v=39','./manifest.webmanifest',
 './sensory-v40.css?v=46','./sensory-v40.js?v=46','./remaining-v41.css?v=46','./remaining-v41.js?v=46',
 './naming-v42.js?v=46','./polish-v43.css?v=46','./final-v44.css?v=46','./final-v44.js?v=46',
 './identity-v45.css?v=46','./identity-v45.js?v=46',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg',
 './assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/beat-move.webp','./assets/cards/memorize.webp','./assets/cards/reflexo-neon.webp'
];

const inject=html=>{
 const css=[
  ['sensory-v40.css',`<link rel="stylesheet" href="sensory-v40.css?v=${VERSION}">`],
  ['remaining-v41.css',`<link rel="stylesheet" href="remaining-v41.css?v=${VERSION}">`],
  ['polish-v43.css',`<link rel="stylesheet" href="polish-v43.css?v=${VERSION}">`],
  ['final-v44.css',`<link rel="stylesheet" href="final-v44.css?v=${VERSION}">`],
  ['identity-v45.css',`<link rel="stylesheet" href="identity-v45.css?v=${VERSION}">`]
 ];
 const js=[
  ['sensory-v40.js',`<script src="sensory-v40.js?v=${VERSION}"></script>`],
  ['remaining-v41.js',`<script src="remaining-v41.js?v=${VERSION}"></script>`],
  ['naming-v42.js',`<script src="naming-v42.js?v=${VERSION}"></script>`],
  ['final-v44.js',`<script src="final-v44.js?v=${VERSION}"></script>`],
  ['identity-v45.js',`<script src="identity-v45.js?v=${VERSION}"></script>`]
 ];
 css.forEach(([key,tag])=>{if(!html.includes(key))html=html.replace('</head>',tag+'\n</head>');});
 js.forEach(([key,tag])=>{if(!html.includes(key))html=html.replace('</body>',tag+'\n</body>');});
 html=html.replace('<html lang="pt-BR">','<html lang="pt-BR" data-tia-build="46">');
 return html;
};

const enhancedResponse=async response=>{
 const html=inject(await response.text());
 return new Response(html,{status:response.status,statusText:response.statusText,headers:{
  'content-type':'text/html; charset=utf-8',
  'cache-control':'no-store, max-age=0'
 }});
};

self.addEventListener('install',e=>{
 e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
 e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
  const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  await Promise.all(windows.map(client=>{
   try{
    const u=new URL(client.url);
    if(u.pathname.includes('/tia-tati-fisio/'))return client.navigate(client.url);
   }catch(_){}
   return Promise.resolve();
  }));
 })());
});

self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{
   try{
    const net=await fetch(e.request,{cache:'no-store'});
    const raw=net.clone();
    caches.open(CACHE).then(c=>c.put('./index.html',raw));
    return enhancedResponse(net);
   }catch(_){
    const cached=await caches.match('./index.html');
    return cached?enhancedResponse(cached):Response.error();
   }
  })());
  return;
 }
 if(url.origin===location.origin){
  const isUiAsset=/\/(identity-v45|final-v44|polish-v43|remaining-v41|sensory-v40)\.(css|js)$/.test(url.pathname);
  if(isUiAsset){
   e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
    const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;
   }).catch(()=>caches.match(e.request)));
   return;
  }
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{
   const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;
  })));
 }
});
