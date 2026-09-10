(()=>{
'use strict';
const V='57';
const params=new URLSearchParams(location.search);
const key=params.get('route')||params.get('open');
if(!key)return;

const selectors={
 road:['[data-mission="road"]'],
 bee:['[data-mission="bee"]'],
 target:['[data-mission="target"]'],
 hands:['[data-mission="hands"]'],
 sensory:['[data-mission="sensory"]'],
 breathe:['[data-mission="breathe"]'],
 react:['[data-youth-light="react"]','[data-light-mode="react"]'],
 memory:['[data-youth-light="memory"]','[data-light-mode="memory"]'],
 beat:['[data-youth-light="beat"]','[data-light-mode="beat"]'],
 pulse:['[data-youth-sensory="pulse"]','[data-sensory-profile="pulse"]'],
 restart:['[data-youth-breathe="reset"]','[data-breathe-mode="reset"]'],
 movequest:['[data-youth-physical="quest"]','[data-physical-profile="quest"]'],
 circuit:['#circuitBtn','#bottomNav [data-nav="circuit"]'],
 voice:['#voiceStudioBtn','#voiceStatusBtn','#bottomNav [data-nav="voice"]'],
 reports:['#reportsBtn','#bottomNav [data-nav="reports"]'],
 fisio:['#settingsTopBtn','#bottomNav [data-nav="fisio"]'],
 interventions:['#interventionsBtn']
};

let routed=false;
function clickFirst(list){
 for(const sel of list||[]){
  const el=document.querySelector(sel);
  if(el){el.click();return true;}
 }
 return false;
}
function activeAwayFromHome(){
 const active=document.querySelector('.screen.active');
 return !!active && active.id!=='screen-home';
}
function markReady(){
 if(routed||!activeAwayFromHome())return false;
 routed=true;
 document.documentElement.classList.add('tt-v57-routed');
 window.scrollTo({top:0,left:0,behavior:'auto'});
 try{window.parent.postMessage({type:'tia-tati-route-ready',route:key,version:V},location.origin);}catch(_){ }
 return true;
}
function routeBase(){
 if(clickFirst(selectors[key]))return true;
 if(key==='pulse')return clickFirst(['[data-mission="sensory"]']);
 if(key==='restart')return clickFirst(['[data-mission="breathe"]']);
 if(key==='movequest')return clickFirst(['[data-mission="physical"]']);
 if(['react','memory','beat'].includes(key))return clickFirst(['[data-mission="light"]']);
 return false;
}
function chooseVariant(){
 try{
  if(['react','memory','beat'].includes(key))document.querySelector(`[data-light-mode="${key}"]`)?.click();
  if(key==='pulse')document.querySelector('[data-sensory-profile="pulse"],[data-sensory-mode="pulse"],[data-profile="pulse"]')?.click();
  if(key==='restart')document.querySelector('[data-breathe-mode="reset"],[data-breathe-mode="restart"]')?.click();
  if(key==='movequest')document.querySelector('[data-physical-profile="quest"],[data-physical-mode="quest"],[data-profile="quest"]')?.click();
 }catch(_){ }
}
function attempt(){
 if(routed)return;
 try{
  routeBase();
  setTimeout(chooseVariant,35);
  setTimeout(markReady,70);
 }catch(_){ }
}

// app.js carrega este arquivo por último, depois dos handlers principais.
[0,40,100,180,300,500,800,1200].forEach(ms=>setTimeout(attempt,ms));
const watch=setInterval(()=>{if(markReady())clearInterval(watch);},80);
setTimeout(()=>clearInterval(watch),4000);

// Dentro do shell, qualquer retorno sempre volta para a nova home.
document.addEventListener('click',e=>{
 const home=e.target.closest('[data-home],#homeBrand,[data-nav="home"],.sensory-v40-home,.v41-breathe-home,.v41-physical-home');
 if(!home)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const target='./?v='+V+'&t='+Date.now();
 try{if(window.top!==window)window.top.location.href=target;else location.href=target;}catch(_){location.href=target;}
},true);
})();
