(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_NAV_V56__)return;
window.__TIA_TATI_JOVEM_NAV_V56__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

function activateScreen(name){
  const screen=$('#screen-'+name);
  if(!screen)return false;
  document.body.style.overflow='';
  $$('.screen').forEach(s=>s.classList.remove('active'));
  screen.classList.add('active');
  const app=$('#app');
  if(app){
    app.classList.toggle('light-setup-mode',name==='lightsetup');
    app.classList.toggle('road-setup-mode',name==='roadsetup');
    app.classList.toggle('bee-setup-mode',name==='beesetup');
    app.classList.toggle('target-setup-mode',name==='targetsetup');
    app.classList.toggle('hands-setup-mode',name==='handssetup');
  }
  try{window.scrollTo({top:0,behavior:'auto'});}catch(_){window.scrollTo(0,0);}
  return true;
}

function choose(selector){
  const el=$(selector);
  if(!el)return false;
  try{el.click();}
  catch(_){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}
  return true;
}

function route(card){
  if(!card)return false;
  if(card.matches('[data-youth-light]')){
    const mode=card.dataset.youthLight||'react';
    choose(`[data-light-mode="${mode}"]`);
    return activateScreen('lightsetup');
  }
  if(card.matches('[data-youth-sensory]')){
    choose('[data-sensory-profile="pulse"]');
    return activateScreen('sensorysetup');
  }
  if(card.matches('[data-youth-breathe]')){
    choose('[data-breathe-mode="reset"]');
    return activateScreen('breathesetup');
  }
  if(card.matches('[data-youth-physical]')){
    choose('[data-physical-profile="quest"]');
    return activateScreen('physicalsetup');
  }
  return false;
}

function bindDirect(){
  $$('[data-youth-light],[data-youth-sensory],[data-youth-breathe],[data-youth-physical]').forEach(card=>{
    if(card.dataset.j56Bound)return;
    card.dataset.j56Bound='1';
    card.addEventListener('click',e=>{
      if(e.defaultPrevented)return;
      route(card);
    });
  });
}

// Capture garante os três desafios de luz mesmo se outra camada alterar o bubbling.
document.addEventListener('click',e=>{
  const card=e.target.closest?.('[data-youth-light]');
  if(!card)return;
  e.preventDefault();
  route(card);
},true);

// As demais experiências já possuem seus próprios capturadores; o binding direto é apenas redundância segura.
bindDirect();
const mo=new MutationObserver(()=>bindDirect());
mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(()=>{bindDirect();mo.disconnect();},5000);

window.TiaTatiJovemNav={activateScreen,route,bindDirect};
})();