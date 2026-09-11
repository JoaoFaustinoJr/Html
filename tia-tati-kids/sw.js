/* Tia Tati Kids — service worker de estabilidade.
   Mantém o runtime funcional, corrige o avatar final e injeta
   as camadas leves de efeitos e música sem alterar a lógica dos jogos. */
const LEGACY_CACHE='tia-tati-v45-identity-20260910';
const FINAL_AVATAR_VERSION='kids-final-avatar-v4';
const AUDIO_VERSION='kids-audio-v3';
const MUSIC_VERSION='kids-music-v1';

self.addEventListener('install',()=>self.skipWaiting());

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k===LEGACY_CACHE||k.startsWith('tia-tati-kids-')).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);

  if(url.pathname.endsWith('/tia-tati-kids/assets/celebrate.webp')){
    const avatarUrl=new URL('./assets/guide.webp?'+FINAL_AVATAR_VERSION,self.location.href);
    event.respondWith(
      fetch(avatarUrl.toString(),{cache:'no-store',credentials:'same-origin'})
        .catch(()=>fetch(event.request,{cache:'reload'}))
    );
    return;
  }

  if(url.pathname.endsWith('/tia-tati-kids/app.js')){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});
        if(!response.ok)return response;
        const source=await response.text();
        const loader='\n;(()=>{if(window.__TIA_TATI_KIDS_AUDIO_LOADER__)return;window.__TIA_TATI_KIDS_AUDIO_LOADER__=true;const a=document.createElement("script");a.src="kids-audio-v1.js?'+AUDIO_VERSION+'";a.async=true;document.head.appendChild(a);const m=document.createElement("script");m.src="kids-music-v1.js?'+MUSIC_VERSION+'";m.async=true;document.head.appendChild(m);})();\n';
        const headers=new Headers(response.headers);
        headers.set('content-type','application/javascript; charset=utf-8');
        headers.set('cache-control','no-store, max-age=0');
        headers.delete('content-length');
        headers.delete('content-encoding');
        return new Response(source+loader,{status:response.status,statusText:response.statusText,headers});
      }catch(_){return fetch(event.request,{cache:'reload'});}
    })());
  }
});
