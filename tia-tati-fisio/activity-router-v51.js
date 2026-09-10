(()=>{
'use strict';
const params=new URLSearchParams(location.search);
const key=params.get('open');
if(!key)return;

const screenMap={
 road:'roadsetup',bee:'beesetup',target:'targetsetup',hands:'handssetup',
 react:'lightsetup',memory:'lightsetup',beat:'lightsetup',
 sensory:'sensorysetup',pulse:'sensorysetup',
 breathe:'breathesetup',restart:'breathesetup',
 physical:'physicalsetup',movequest:'physicalsetup',
 circuit:'circuit',voice:'voice',reports:'reports',fisio:'fisio',interventions:'interventions'
};

function setPref(storageKey,patch){
 try{
  const cur=JSON.parse(localStorage.getItem(storageKey)||'{}');
  localStorage.setItem(storageKey,JSON.stringify({...cur,...patch}));
 }catch(_){ }
}

function preconfigure(){
 if(['react','memory','beat'].includes(key)) setPref('tiaTatiV12Prefs',{lightMode:key});
 if(key==='pulse') setPref('tiaTatiSensoryV40',{profile:'pulse'});
 if(key==='restart') setPref('tiaTatiBreatheV41',{mode:'reset'});
 if(key==='movequest') setPref('tiaTatiPhysicalV41',{profile:'quest'});
}

function activate(id){
 const target=document.getElementById('screen-'+id);
 if(!target)return false;
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 target.classList.add('active');
 const app=document.getElementById('app');
 if(app){
  app.classList.toggle('road-setup-mode',id==='roadsetup');
  app.classList.toggle('bee-setup-mode',id==='beesetup');
  app.classList.toggle('target-setup-mode',id==='targetsetup');
  app.classList.toggle('hands-setup-mode',id==='handssetup');
  app.classList.toggle('light-setup-mode',id==='lightsetup');
 }
 window.scrollTo({top:0,left:0,behavior:'auto'});
 return true;
}

function bootRoute(attempt=0){
 const id=screenMap[key];
 if(!id)return;
 if(activate(id)){
  document.documentElement.classList.add('activity-ready');
  return;
 }
 if(attempt<100)setTimeout(()=>bootRoute(attempt+1),80);
}

preconfigure();
document.documentElement.classList.add('activity-deeplink');

document.addEventListener('click',e=>{
 if(e.target.closest('[data-home],#homeBrand,[data-nav="home"]')){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  location.href='./';
 }
},true);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>bootRoute(),180),{once:true});
else setTimeout(()=>bootRoute(),180);
})();
