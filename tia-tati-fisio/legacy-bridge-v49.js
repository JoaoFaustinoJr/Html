(()=>{
'use strict';
const p=new URLSearchParams(location.search);
if(!p.has('legacy'))return;
document.documentElement.dataset.shellLegacy='49';

const routes={
 road:'[data-mission="road"]',bee:'[data-mission="bee"]',target:'[data-mission="target"]',hands:'[data-mission="hands"]',sensory:'[data-mission="sensory"]',breathe:'[data-mission="breathe"]',
 react:'[data-youth-light="react"]',memory:'[data-youth-light="memory"]',beat:'[data-youth-light="beat"]',pulse:'[data-youth-sensory]',restart:'[data-youth-breathe]',movequest:'[data-youth-physical]',
 circuit:'[data-nav="circuit"]',voice:'[data-nav="voice"]',reports:'[data-nav="reports"]',fisio:'[data-nav="fisio"]',interventions:'#interventionsBtn'
};

const style=document.createElement('style');
style.textContent=`
html[data-shell-legacy="49"] .topbar{display:none!important}
html[data-shell-legacy="49"] .bottom-nav{display:none!important}
html[data-shell-legacy="49"] .app{padding-top:8px!important;padding-bottom:26px!important}
html[data-shell-legacy="49"] body{overscroll-behavior:none}
`;
document.head.appendChild(style);

function backToShell(){
 const url=new URL('./',location.href);
 location.href=url.href;
}

document.addEventListener('click',e=>{
 if(e.target.closest('[data-home],#homeBrand,[data-nav="home"]')){
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();backToShell();
 }
},true);

function openRequested(tries=0){
 const key=p.get('open');
 const selector=p.get('selector')||routes[key];
 if(!selector)return;
 const el=document.querySelector(selector);
 if(el){
  try{el.click();}catch(_){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}
  return;
 }
 if(tries<80)setTimeout(()=>openRequested(tries+1),100);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>openRequested(),120),{once:true});
else setTimeout(()=>openRequested(),120);
})();
