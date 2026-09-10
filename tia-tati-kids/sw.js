const CACHE='tia-tati-kids-v5-20260910';
const CORE=[
 './','./index.html','./styles.css?v=39','./app.js?v=39','./manifest.webmanifest','./kids-clean-v5.css?v=5',
 './sensory-v40.css','./sensory-v40.js','./remaining-v41.css','./remaining-v41.js',
 './naming-v42.js?v=43','./polish-v43.css','./final-v44.css','./final-v44.js','./identity-v45.css','./identity-v45.js',
 './assets/welcome.webp','./assets/guide.webp','./assets/success.webp','./assets/retry.webp','./assets/relax.webp','./assets/celebrate.webp',
 './assets/road-school.svg','./assets/road-home.svg','./assets/road-park.svg','./assets/argo-hgt-blue.svg','./assets/argo-hgt-game.svg',
 './assets/bee-game.svg','./assets/bee-garden.svg','./assets/target-board.svg','./assets/hands-board.svg','./assets/pulse-lab.svg',
 './assets/cards/beat-move.webp','./assets/cards/memorize.webp','./assets/cards/reflexo-neon.webp'
];
const inject=html=>{
 if(!html.includes('sensory-v40.css'))html=html.replace('</head>','<link rel="stylesheet" href="sensory-v40.css"></head>');
 if(!html.includes('remaining-v41.css'))html=html.replace('</head>','<link rel="stylesheet" href="remaining-v41.css"></head>');
 if(!html.includes('polish-v43.css'))html=html.replace('</head>','<link rel="stylesheet" href="polish-v43.css"></head>');
 if(!html.includes('final-v44.css'))html=html.replace('</head>','<link rel="stylesheet" href="final-v44.css"></head>');
 if(!html.includes('identity-v45.css'))html=html.replace('</head>','<link rel="stylesheet" href="identity-v45.css"></head>');
 if(!html.includes('kids-clean-v5.css'))html=html.replace('</head>','<link rel="stylesheet" href="kids-clean-v5.css?v=5"></head>');
 if(!html.includes('sensory-v40.js'))html=html.replace('</body>','<script src="sensory-v40.js"></script></body>');
 if(!html.includes('remaining-v41.js'))html=html.replace('</body>','<script src="remaining-v41.js"></script></body>');
 if(!html.includes('naming-v42.js?v=43'))html=html.replace('</body>','<script src="naming-v42.js?v=43"></script></body>');
 if(!html.includes('final-v44.js'))html=html.replace('</body>','<script src="final-v44.js"></script></body>');
 if(!html.includes('identity-v45.js'))html=html.replace('</body>','<script src="identity-v45.js"></script></body>');
 return html;
};
const enhancedResponse=async response=>{
 const html=inject(await response.text());
 return new Response(html,{status:response.status,statusText:response.statusText,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-cache'}});
};
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(CORE.map(url=>c.add(url)))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-kids-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.origin!==location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{
   try{
    const net=await fetch(e.request,{cache:'no-store'});
    const raw=net.clone();caches.open(CACHE).then(c=>c.put('./index.html',raw));
    return enhancedResponse(net);
   }catch(_){
    const cached=await caches.match('./index.html',{cacheName:CACHE});
    return cached?enhancedResponse(cached):Response.error();
   }
  })());
  return;
 }
 e.respondWith(caches.match(e.request,{cacheName:CACHE}).then(hit=>hit||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;})));
});
