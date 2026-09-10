(()=>{
'use strict';
const VERSION='53';

document.addEventListener('click',e=>{
 const sc=e.target.closest('[data-scroll]');
 if(!sc)return;
 e.preventDefault();
 const id=sc.dataset.scroll;
 if(id==='top') window.scrollTo({top:0,behavior:'smooth'});
 else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
});

if('serviceWorker' in navigator){
 window.addEventListener('load',async()=>{
  try{
   const reg=await navigator.serviceWorker.register('./sw.js?v='+VERSION,{updateViaCache:'none'});
   await reg.update();
  }catch(_){ }
 });
}
})();