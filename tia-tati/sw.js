const CACHE='tia-tati-portal-pwa-v12';
const SHELL=['./','./index.html','./manifest.webmanifest','./assets/icon-tia-tati-192.webp','./assets/icon-tia-tati-512.webp','./assets/tatiana-portal-v3.webp','./assets/tatiana-about-v2.webp','./launch-kids.html','./launch-jovem.html','./portal-runtime-v12.js'];

function patchPortalHtml(html){
  if(!html)return html;
  let patched=html
    .replace(/manifest\.webmanifest\?v=\d+/g,'manifest.webmanifest?v=3')
    .replace(/assets\/icon-tia-tati(?:-v2)?\.svg(?:\?v=\d+)?/g,'assets/icon-tia-tati-192.webp?v=3')
    .replace(/assets\/icon-tia-tati-192\.webp(?:\?v=\d+)?/g,'assets/icon-tia-tati-192.webp?v=3')
    .replace(/\.\.\/tia-tati-jovem\/entry-j12\.html\?v=j14/g,'launch-jovem.html?v=29')
    .replace(/FISIO SENSORIAL/g,'FISIO SENSÓRIO-MOTORA')
    .replace(/Fisio Sensorial/g,'Fisio Sensório-Motora');
  if(!patched.includes('apple-touch-icon'))patched=patched.replace('</head>','<link rel="apple-touch-icon" href="assets/icon-tia-tati-192.webp?v=3">\n</head>');
  else patched=patched.replace(/<link rel="apple-touch-icon"[^>]*>/g,'<link rel="apple-touch-icon" href="assets/icon-tia-tati-192.webp?v=3">');
  if(!patched.includes('portal-runtime-v12.js'))patched=patched.replace('</body>','<script src="portal-runtime-v12.js?v=12"></script>\n</body>');
  return patched;
}
function isPortalHome(url){return /\/tia-tati\/(?:index\.html)?$/.test(url.pathname);}

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tia-tati-portal-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin||!url.pathname.includes('/Html/tia-tati/'))return;
  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        const type=fresh.headers.get('content-type')||'';
        if(!type.includes('text/html'))return fresh;
        const html=patchPortalHtml(await fresh.text());
        const headers=new Headers(fresh.headers);headers.set('content-type','text/html; charset=utf-8');headers.set('cache-control','no-store, max-age=0');headers.delete('content-length');headers.delete('content-encoding');
        const response=new Response(html,{status:fresh.status,statusText:fresh.statusText,headers});
        const cache=await caches.open(CACHE);if(isPortalHome(url))cache.put('./index.html',response.clone()).catch(()=>{});else cache.put(event.request,response.clone()).catch(()=>{});
        return response;
      }catch(_){
        const cached=(await caches.match(event.request))||(isPortalHome(url)?await caches.match('./index.html'):null);if(!cached)return Response.error();
        const type=cached.headers.get('content-type')||'';if(!type.includes('text/html'))return cached;
        const html=patchPortalHtml(await cached.text());const headers=new Headers(cached.headers);headers.set('content-type','text/html; charset=utf-8');headers.delete('content-length');headers.delete('content-encoding');return new Response(html,{status:cached.status,statusText:cached.statusText,headers});
      }
    })());
    return;
  }
  event.respondWith((async()=>{try{const fresh=await fetch(event.request,{cache:'no-store'});if(fresh.ok){const cache=await caches.open(CACHE);cache.put(event.request,fresh.clone()).catch(()=>{});}return fresh;}catch(_){return(await caches.match(event.request))||Response.error();}})());
});
