(()=>{
'use strict';
const p=new URLSearchParams(location.search);
if(!p.has('legacy'))return;
document.documentElement.dataset.shellLegacy='50';

const style=document.createElement('style');
style.textContent=`
html[data-shell-legacy="50"] .topbar{display:none!important}
html[data-shell-legacy="50"] .bottom-nav{display:none!important}
html[data-shell-legacy="50"] .app{padding-top:8px!important;padding-bottom:26px!important}
html[data-shell-legacy="50"] body{overscroll-behavior:none}
`;
document.head.appendChild(style);

function backToShell(){
 location.href=new URL('./',location.href).href;
}

document.addEventListener('click',e=>{
 if(e.target.closest('[data-home],#homeBrand,[data-nav="home"]')){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();backToShell();
 }
},true);

const screenMap={
 road:'roadsetup',bee:'beesetup',target:'targetsetup',hands:'handssetup',
 react:'lightsetup',memory:'lightsetup',beat:'lightsetup',
 sensory:'sensorysetup',pulse:'sensorysetup',
 breathe:'breathesetup',restart:'breathesetup',
 movequest:'physicalsetup',
 circuit:'circuit',voice:'voice',reports:'reports',fisio:'fisio',interventions:'interventions'
};

function activateScreen(name){
 const target=document.getElementById('screen-'+name);
 if(!target)return false;
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 target.classList.add('active');
 const app=document.getElementById('app');
 if(app){
  app.classList.toggle('road-setup-mode',name==='roadsetup');
  app.classList.toggle('bee-setup-mode',name==='beesetup');
  app.classList.toggle('target-setup-mode',name==='targetsetup');
  app.classList.toggle('hands-setup-mode',name==='handssetup');
  app.classList.toggle('light-setup-mode',name==='lightsetup');
 }
 window.scrollTo({top:0,behavior:'auto'});
 return true;
}

function applyPreset(key){
 const selectors={
  react:'[data-light-mode="react"]',memory:'[data-light-mode="memory"]',beat:'[data-light-mode="beat"]',
  pulse:'[data-sensory-profile="pulse"]',restart:'[data-breathe-mode="reset"]',movequest:'[data-physical-profile="quest"]'
 };
 const s=selectors[key];
 if(!s)return;
 const el=document.querySelector(s);
 if(el){try{el.click();}catch(_){}}
}

function openRequested(tries=0){
 const key=p.get('open');
 const name=screenMap[key];
 if(!name)return;
 if(activateScreen(name)){
  setTimeout(()=>applyPreset(key),60);
  return;
 }
 if(tries<100)setTimeout(()=>openRequested(tries+1),80);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>openRequested(),80),{once:true});
else setTimeout(()=>openRequested(),80);
})();
