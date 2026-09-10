(()=>{
'use strict';
const VERSION='48';
const host=document.getElementById('legacyHost');
const frame=document.getElementById('legacyFrame');
const loading=document.getElementById('legacyLoading');
const toast=document.getElementById('shellToast');
const home=document.getElementById('v48Home');
let wanted=null;
const routes={
 road:'[data-mission="road"]',bee:'[data-mission="bee"]',target:'[data-mission="target"]',hands:'[data-mission="hands"]',sensory:'[data-mission="sensory"]',breathe:'[data-mission="breathe"]',
 react:'[data-youth-light="react"]',memory:'[data-youth-light="memory"]',beat:'[data-youth-light="beat"]',pulse:'[data-youth-sensory]',restart:'[data-youth-breathe]',movequest:'[data-youth-physical]',
 circuit:'[data-nav="circuit"]',voice:'[data-nav="voice"]',reports:'[data-nav="reports"]',fisio:'[data-nav="fisio"]',interventions:'#interventionsBtn'
};
const cardRoutes={welcome:'[data-card="welcome"]',guide:'[data-card="guide"]',success:'[data-card="success"]',celebrate:'[data-card="celebrate"]'};
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2400);}
function closeLegacy(){wanted=null;host.hidden=true;home.hidden=false;document.body.style.overflow='';loading.classList.remove('hide');frame.src='about:blank';window.scrollTo({top:0,behavior:'instant'});}
function clickInside(selector,tries=0){
 let doc;try{doc=frame.contentDocument||frame.contentWindow.document;}catch(_){return fail();}
 const el=doc&&doc.querySelector(selector);
 if(el){loading.classList.add('hide');setTimeout(()=>{try{el.click();}catch(_){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}},30);return;}
 if(tries<50){setTimeout(()=>clickInside(selector,tries+1),100);return;}
 fail();
}
function fail(){loading.classList.add('hide');showToast('Não consegui abrir esta atividade. Tente novamente.');setTimeout(closeLegacy,900);}
function openLegacy(key,selectorOverride){
 const selector=selectorOverride||routes[key];
 if(key==='home'||!selector){window.scrollTo({top:0,behavior:'smooth'});return;}
 wanted=selector;home.hidden=true;host.hidden=false;document.body.style.overflow='hidden';loading.classList.remove('hide');
 const url='./index.html?legacy=1&shell=48&t='+Date.now();
 frame.onload=()=>{if(wanted)clickInside(wanted,0);};
 frame.src=url;
}
document.addEventListener('click',e=>{
 const scroll=e.target.closest('[data-scroll]');
 if(scroll){const id=scroll.dataset.scroll;if(id==='top'){window.scrollTo({top:0,behavior:'smooth'});}else document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 const open=e.target.closest('[data-open]');if(open){openLegacy(open.dataset.open);return;}
 const card=e.target.closest('[data-card-open]');if(card){openLegacy('card',cardRoutes[card.dataset.cardOpen]);}
});
document.getElementById('legacyHome').onclick=closeLegacy;
window.addEventListener('popstate',()=>{if(!host.hidden)closeLegacy();});
if('serviceWorker' in navigator){
 window.addEventListener('load',()=>{
  navigator.serviceWorker.register('./sw.js?v='+VERSION).catch(()=>{});
  let refreshed=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
   if(refreshed||new URL(location.href).searchParams.has('legacy'))return;
   refreshed=true;location.reload();
  });
 });
}
})();
