(()=>{
'use strict';
const V='54';
const key=new URLSearchParams(location.search).get('open');
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
 pulse:['[data-youth-sensory="pulse"]'],
 restart:['[data-youth-breathe="reset"]'],
 movequest:['[data-youth-physical="quest"]'],
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
function fallback(){
 if(key==='pulse'){
  if(clickFirst(['[data-mission="sensory"]']))setTimeout(()=>document.querySelector('[data-sensory-profile="pulse"]')?.click(),80);
  return;
 }
 if(key==='restart'){
  if(clickFirst(['[data-mission="breathe"]']))setTimeout(()=>document.querySelector('[data-breathe-mode="reset"]')?.click(),80);
  return;
 }
 if(key==='movequest'){
  if(clickFirst(['[data-mission="physical"]']))setTimeout(()=>document.querySelector('[data-physical-profile="quest"]')?.click(),80);
  return;
 }
 if(['react','memory','beat'].includes(key)){
  const homeLight=document.querySelector('[data-mission="light"]');
  if(homeLight){homeLight.click();setTimeout(()=>document.querySelector(`[data-light-mode="${key}"]`)?.click(),80);}
 }
}
function route(){
 if(routed)return true;
 if(clickFirst(selectors[key])){
  routed=true;
  document.documentElement.classList.add('tt-v54-routed');
  setTimeout(()=>window.scrollTo({top:0,left:0,behavior:'auto'}),30);
  return true;
 }
 return false;
}
function bootRoute(){
 if(route())return;
 [60,140,280,520,850,1250,1750,2300].forEach(ms=>setTimeout(()=>{if(!routed)route();},ms));
 setTimeout(()=>{if(!routed){fallback();setTimeout(()=>{routed=true;document.documentElement.classList.add('tt-v54-routed');},180);}},2500);
}

// Nas atividades, qualquer comando de retorno leva à nova home, não à home antiga embutida.
document.addEventListener('click',e=>{
 const home=e.target.closest('[data-home],#homeBrand,[data-nav="home"],.sensory-v40-home,.v41-breathe-home,.v41-physical-home');
 if(!home)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 location.href='./?v='+V;
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootRoute,{once:true});
else bootRoute();
})();
