const C='divina-misericordia-v11';
const A=['./manifest.webmanifest','./music.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){
  e.respondWith(fetch(r,{cache:'no-store'}).then(async res=>{
   if(!res.ok)return res;let html=await res.text();
   if(!html.includes('music.js'))html=html.replace('</body>','<script src="./music.js?v=11"></script></body>');
   return new Response(html,{status:res.status,statusText:res.statusText,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}})
  }).catch(()=>caches.match('./index.html')));return;
 }
 const fresh=u.pathname.endsWith('/index.html')||u.pathname.endsWith('/styles-v2.css')||u.pathname.endsWith('/music.js')||u.pathname.endsWith('/sw.js');
 if(fresh){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{const copy=res.clone();caches.open(C).then(c=>c.put(r,copy));return res}).catch(()=>caches.match(r)));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&res.ok){const copy=res.clone();caches.open(C).then(c=>c.put(r,copy))}return res})));
});