/* Tia Tati Kids — service worker de estabilidade.
   Atualizado para miniaturas de figurinhas com IMG real. */
const LEGACY_CACHE='tia-tati-v45-identity-20260910';
const AUDIO_VERSION='kids-audio-v3';
const MUSIC_VERSION='kids-music-v2';
const VOICE_EXPORT_VERSION='voice-export-v2';
const FINAL_CARD_VERSION='completion-v2';
const LAYOUT_VERSION='kids-layout-v12';
const CARDS_UI_VERSION='kids-cards-ui-v7';
const CARDS_EXPORT_VERSION='kids-cards-export-v5';

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
  if(url.pathname.endsWith('/tia-tati-kids/styles.css') || url.pathname.endsWith('/tia-tati-kids/kids-shell-v1.css') || url.pathname.endsWith('/tia-tati-kids/kids-theme-v2.css') || url.pathname.endsWith('/tia-tati-kids/kids-cards-v8.css')){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});if(!response.ok)return response;
        const headers=new Headers(response.headers);headers.set('cache-control','no-store, max-age=0');headers.delete('content-length');headers.delete('content-encoding');
        return new Response(await response.text(),{status:response.status,statusText:response.statusText,headers});
      }catch(_){return fetch(event.request,{cache:'reload'});}
    })());
    return;
  }
  if(url.pathname.endsWith('/tia-tati-kids/app.js')){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request,{cache:'no-store'});if(!response.ok)return response;
        const source=await response.text();
        const loader='\n;(()=>{if(window.__TIA_TATI_KIDS_AUDIO_LOADER__)return;window.__TIA_TATI_KIDS_AUDIO_LOADER__=true;const a=document.createElement("script");a.src="kids-audio-v1.js?'+AUDIO_VERSION+'";a.async=true;document.head.appendChild(a);const m=document.createElement("script");m.src="kids-music-v1.js?'+MUSIC_VERSION+'";m.async=true;document.head.appendChild(m);const v=document.createElement("script");v.src="voice-export-v1.js?'+VOICE_EXPORT_VERSION+'";v.async=true;document.head.appendChild(v);const f=document.createElement("script");f.src="final-avatar-v1.js?'+FINAL_CARD_VERSION+'";f.async=true;document.head.appendChild(f);const ce=document.createElement("script");ce.src="kids-cards-export-v1.js?'+CARDS_EXPORT_VERSION+'";ce.async=true;document.head.appendChild(ce);const cu=document.createElement("script");cu.src="kids-cards-ui-v7.js?'+CARDS_UI_VERSION+'";cu.async=true;document.head.appendChild(cu);document.documentElement.dataset.kidsLayout="'+LAYOUT_VERSION+'";})();\n';
        const headers=new Headers(response.headers);headers.set('content-type','application/javascript; charset=utf-8');headers.set('cache-control','no-store, max-age=0');headers.delete('content-length');headers.delete('content-encoding');
        return new Response(source+loader,{status:response.status,statusText:response.statusText,headers});
      }catch(_){return fetch(event.request,{cache:'reload'});}
    })());
  }
});
