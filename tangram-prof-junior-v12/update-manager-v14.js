
(()=>{
 const APP_VERSION='15.4';
 const PERMANENT_PATH='/Html/tangram-prof-junior-v12/';
 let reg=null,reloading=false;

 function tools(){return document.querySelector('#tangram-levels .tl-brand-tools')}
 function ensureButton(){
   const host=tools();if(!host)return null;
   let b=document.getElementById('updateApp');
   if(!b){
     b=document.createElement('button');
     b.type='button';b.id='updateApp';b.className='tl-mini-action tl-update-action';
     b.innerHTML='↻ <span>Atualizar</span>';
     const about=document.getElementById('aboutApp');
     if(about)host.insertBefore(b,about);else host.appendChild(b);
   }
   return b;
 }
 function showReady(){
   const b=ensureButton();if(!b)return;
   b.classList.add('show','ready');
   b.innerHTML='✨ <span>Atualizar</span>';
   b.title='Nova versão disponível';
 }
 function showChecking(){
   const b=ensureButton();if(!b)return;
   b.classList.add('show');b.classList.remove('ready');
   b.innerHTML='↻ <span>Verificar</span>';
 }
 function hideButton(){const b=ensureButton();if(b){b.classList.remove('show','ready')}}
 function addVersion(){
   const body=document.querySelector('.tl-about-main .tl-about-body');
   if(!body||body.querySelector('.rai-version-line'))return;
   const p=document.createElement('p');p.className='rai-version-line';
   p.innerHTML='<b>Versão '+APP_VERSION+'</b> • endereço oficial permanente • atualizações pelo próprio aplicativo';
   const sig=body.querySelector('.tl-signature');if(sig)body.insertBefore(p,sig);else body.appendChild(p);
 }
 function bindAbout(){
   const about=document.getElementById('aboutApp');
   if(about)about.addEventListener('click',()=>setTimeout(addVersion,0));
   setTimeout(addVersion,500);
 }
 function listenRegistration(r){
   reg=r;
   if(r.waiting&&navigator.serviceWorker.controller)showReady();
   r.addEventListener('updatefound',()=>{
     const nw=r.installing;if(!nw)return;
     nw.addEventListener('statechange',()=>{
       if(nw.state==='installed'&&navigator.serviceWorker.controller)showReady();
     });
   });
 }
 async function check(){
   try{
     if(!('serviceWorker' in navigator))return;
     if(!reg)reg=await navigator.serviceWorker.getRegistration('./');
     if(reg){await reg.update();if(reg.waiting&&navigator.serviceWorker.controller)showReady()}
   }catch(e){console.warn('Atualização Tangram',e)}
 }
 async function apply(){
   try{
     if(!reg)reg=await navigator.serviceWorker.getRegistration('./');
     if(reg&&reg.waiting){
       const b=ensureButton();if(b){b.classList.add('show');b.classList.remove('ready');b.innerHTML='⏳ <span>Atualizando</span>'}
       reg.waiting.postMessage({type:'SKIP_WAITING'});return;
     }
     showChecking();await check();setTimeout(()=>{if(!(reg&&reg.waiting))hideButton()},1200);
   }catch(e){location.reload()}
 }
 const b=ensureButton();if(b)b.addEventListener('click',apply);
 bindAbout();

 // Recuperação automática quando a interface antiga ficou presa no cache.
 const visibleVersion=(()=>{
   const el=document.querySelector('#tangram-levels .tl-brand-credit,#tangram-levels .tl-sub');
   return el?el.textContent:'';
 })();
 if(visibleVersion && !visibleVersion.includes('v'+APP_VERSION)){
   const key='rai-force-version-'+APP_VERSION;
   const last=Number(sessionStorage.getItem(key)||0);
   if(Date.now()-last>15000){
     sessionStorage.setItem(key,String(Date.now()));
     setTimeout(async()=>{
       try{
         const r=await navigator.serviceWorker.getRegistration('./');
         if(r){await r.update();if(r.waiting)r.waiting.postMessage({type:'SKIP_WAITING'})}
       }catch(e){}
       const u=new URL(location.href);
       u.searchParams.set('v',APP_VERSION);
       u.searchParams.set('refresh',String(Date.now()));
       location.replace(u.toString());
     },700);
   }
 }

 if('serviceWorker' in navigator){
   navigator.serviceWorker.getRegistration('./').then(r=>{if(r)listenRegistration(r);check()}).catch(()=>{});
   navigator.serviceWorker.addEventListener('controllerchange',()=>{
     if(reloading)return;reloading=true;location.reload();
   });
   window.addEventListener('focus',check);
   document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')check()});
   setInterval(check,30*60*1000);
 }
 window.__raiUpdate={version:APP_VERSION,path:PERMANENT_PATH,check};
})();
