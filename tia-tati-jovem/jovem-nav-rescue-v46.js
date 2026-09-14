(()=>{
'use strict';
if(window.__TIA_JOVEM_NAV_RESCUE_V46__)return;
window.__TIA_JOVEM_NAV_RESCUE_V46__=true;
const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
function activate(name){
 const target=q('#screen-'+name); if(!target)return false;
 qa('.screen').forEach(s=>s.classList.remove('active'));
 target.classList.add('active');
 const app=q('#app');
 if(app){
  app.classList.toggle('light-setup-mode',name==='lightsetup');
  app.classList.toggle('sensory-setup-mode',name==='sensorysetup');
  app.classList.toggle('breathe-setup-mode',name==='breathesetup');
  app.classList.toggle('physical-setup-mode',name==='physicalsetup');
 }
 try{window.scrollTo({top:0,behavior:'auto'})}catch(_){window.scrollTo(0,0)}
 return true;
}
function routeCard(card){
 if(card.matches('[data-youth-light]')){
  const mode=card.dataset.youthLight||'react';
  activate('lightsetup');
  const choice=q(`[data-light-mode="${mode}"]`); if(choice)try{choice.click()}catch(_){}
  return true;
 }
 if(card.matches('[data-youth-sensory]')){activate('sensorysetup');return true;}
 if(card.matches('[data-youth-breathe]')){activate('breathesetup');return true;}
 if(card.matches('[data-youth-physical]')){activate('physicalsetup');return true;}
 return false;
}
document.addEventListener('click',e=>{
 const card=e.target.closest&&e.target.closest('#screen-home .youth-card');
 if(card && !card.matches('[data-jlab]')){
  setTimeout(()=>{
   const home=q('#screen-home');
   if(home&&home.classList.contains('active')) routeCard(card);
  },0);
 }
 const back=e.target.closest&&e.target.closest('[data-home]');
 if(back)setTimeout(()=>{const active=q('.screen.active');if(active&&active.id!=='screen-home')activate('home')},0);
},false);
window.TiaTatiNavRescue46={activate,routeCard};
document.documentElement.dataset.navRescue='46';
})();