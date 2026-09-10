(()=>{
'use strict';
const params=new URLSearchParams(location.search);
const key=params.get('open');
if(!key){document.documentElement.classList.add('v52-ready');return;}

const screenMap={
 road:'roadsetup',bee:'beesetup',target:'targetsetup',hands:'handssetup',
 react:'lightsetup',memory:'lightsetup',beat:'lightsetup',
 sensory:'sensorysetup',pulse:'sensorysetup',
 breathe:'breathesetup',restart:'breathesetup',
 physical:'physicalsetup',movequest:'physicalsetup',
 circuit:'circuit',voice:'voice',reports:'reports',fisio:'fisio',interventions:'interventions'
};
let stopped=false;

function selectMode(){
 try{
  if(['react','memory','beat'].includes(key)) document.querySelector(`[data-light-mode="${key}"]`)?.click();
  if(key==='pulse') document.querySelector('[data-sensory-profile="pulse"],[data-sensory-mode="pulse"],[data-profile="pulse"]')?.click();
  if(key==='restart') document.querySelector('[data-breathe-mode="reset"],[data-breathe-mode="restart"],[data-breathe-mode="recomeço"]')?.click();
  if(key==='movequest') document.querySelector('[data-physical-profile="quest"],[data-physical-mode="quest"],[data-profile="quest"]')?.click();
 }catch(_){ }
}

function activate(){
 const id=screenMap[key];
 const target=id&&document.getElementById('screen-'+id);
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
 selectMode();
 document.documentElement.classList.add('v52-ready','activity-ready');
 window.scrollTo({top:0,left:0,behavior:'auto'});
 return true;
}

function enforce(){if(!stopped)activate();}
[0,80,180,350,650,1000,1450].forEach(ms=>setTimeout(enforce,ms));
setTimeout(()=>{stopped=true;document.documentElement.classList.add('v52-ready');observer.disconnect();},1800);

const observer=new MutationObserver(()=>{
 if(stopped)return;
 const home=document.getElementById('screen-home');
 const target=document.getElementById('screen-'+screenMap[key]);
 if(home?.classList.contains('active') || (target && !target.classList.contains('active'))) activate();
});
if(document.documentElement) observer.observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class']});

document.addEventListener('pointerdown',e=>{
 if(e.target.closest('#startRoadMission,#startBeeMission,#startTargetMission,#startHandsMission,#startLightMission,#startSensoryMission,#startBreatheMission,#startPhysicalMission,.primary')){
  stopped=true;observer.disconnect();
 }
},{capture:true,once:false});

document.addEventListener('click',e=>{
 if(e.target.closest('[data-home],#homeBrand,[data-nav="home"],.back-btn[data-home]')){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();location.href='./';
 }
},true);

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(enforce,30),{once:true});
else enforce();
})();
