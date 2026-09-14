(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_NAV_V55__)return;
window.__TIA_TATI_JOVEM_NAV_V55__=true;

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
  try{window.scrollTo({top:0,behavior:'smooth'});}catch(_){window.scrollTo(0,0);}
  return true;
}

function clickChoice(selector){
  const choice=$(selector);
  if(!choice)return false;
  try{choice.click();}
  catch(_){choice.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}
  return true;
}

function routeCard(card){
  if(!card)return false;

  if(card.matches('[data-youth-light]')){
    const mode=card.dataset.youthLight||'react';
    clickChoice(`[data-light-mode="${mode}"]`);
    activateScreen('lightsetup');
    return true;
  }

  if(card.matches('[data-youth-sensory]')){
    clickChoice('[data-sensory-profile="pulse"]');
    activateScreen('sensorysetup');
    return true;
  }

  if(card.matches('[data-youth-breathe]')){
    clickChoice('[data-breathe-mode="reset"]');
    activateScreen('breathesetup');
    return true;
  }

  if(card.matches('[data-youth-physical]')){
    clickChoice('[data-physical-profile="quest"]');
    activateScreen('physicalsetup');
    return true;
  }

  return false;
}

// Fallback de navegação para os cards compartilhados.
// Fica em bubbling para não interferir nos listeners próprios do Ping Pong/Piano.
document.addEventListener('click',e=>{
  const card=e.target.closest?.('[data-youth-light],[data-youth-sensory],[data-youth-breathe],[data-youth-physical]');
  if(!card)return;
  e.preventDefault();
  routeCard(card);
},false);

// Teclado/acessibilidade: button já gera click; não duplicamos pointer/touch.
window.TiaTatiJovemNav={activateScreen,routeCard};
})();