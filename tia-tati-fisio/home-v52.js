(()=>{
'use strict';
const VERSION='52';

function openActivity(key){
 if(key==='home'){window.scrollTo({top:0,behavior:'smooth'});return;}
 const url=new URL('./activity-v52.html',location.href);
 url.searchParams.set('open',key);
 url.searchParams.set('v',VERSION);
 url.searchParams.set('t',Date.now().toString());
 location.href=url.href;
}

document.addEventListener('click',e=>{
 const sc=e.target.closest('[data-scroll]');
 if(sc){
  e.preventDefault();
  const id=sc.dataset.scroll;
  if(id==='top')window.scrollTo({top:0,behavior:'smooth'});
  else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  return;
 }
 const op=e.target.closest('[data-open]');
 if(op){e.preventDefault();e.stopPropagation();openActivity(op.dataset.open);return;}
 const card=e.target.closest('[data-card-open]');
 if(card){e.preventDefault();openActivity('interventions');}
});

if('serviceWorker' in navigator){
 window.addEventListener('load',async()=>{
  try{await navigator.serviceWorker.register('./sw.js?v='+VERSION,{updateViaCache:'none'});}catch(_){ }
 });
}
})();
