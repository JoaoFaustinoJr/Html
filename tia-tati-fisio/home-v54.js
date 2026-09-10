(()=>{
'use strict';
const VERSION='58';

document.addEventListener('click',e=>{
 const a=e.target.closest('a[href*="activity-v54.html?open="],a[href*="activity-v56.html?open="],a[href*="activity-v57.html?open="],a[href*="activity-v58.html?open="],a[href*="activity.html?open="]');
 if(a){
  e.preventDefault();
  e.stopPropagation();
  const u=new URL(a.href,location.href);
  const open=u.searchParams.get('open');
  if(open){
   location.href='./activity-v58.html?open='+encodeURIComponent(open)+'&v='+VERSION+'&t='+Date.now();
   return;
  }
 }
 const sc=e.target.closest('[data-scroll]');
 if(!sc)return;
 e.preventDefault();
 const id=sc.dataset.scroll;
 if(id==='top')window.scrollTo({top:0,behavior:'smooth'});
 else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
},true);

if('serviceWorker' in navigator){
 window.addEventListener('load',async()=>{
  try{
   const reg=await navigator.serviceWorker.register('./sw.js?v='+VERSION,{updateViaCache:'none'});
   await reg.update();
  }catch(_){ }
 });
}
})();
