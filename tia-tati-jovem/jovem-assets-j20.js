(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_J20__)return;
window.__TIA_TATI_JOVEM_ASSETS_J20__=true;

const STABLE_TATI='../tia-tati/assets/tatiana-portal-v3.webp?v=20';
const CARD_SOURCES={
  '[data-youth-light="react"]':'assets/cards/reflexo-neon-v2.webp?v=20',
  '[data-youth-light="memory"]':'assets/cards/memorize-v2.webp?v=20',
  '[data-youth-light="beat"]':'assets/cards/ritmo-movimento-v2.webp?v=20',
  '[data-youth-sensory]':'assets/pulse-lab.svg?v=20'
};

function ensureArt(card,src,badge){
  if(!card)return;
  let art=card.querySelector('.youth-card-art');
  if(!art){art=document.createElement('span');art.className='youth-card-art';card.prepend(art);}
  card.classList.remove('j13-symbol-card');
  art.querySelectorAll('.j17-card-visual,.j18-card-visual').forEach(n=>n.remove());
  let img=art.querySelector('img');
  if(!img){img=document.createElement('img');art.prepend(img);}
  if(img.getAttribute('src')!==src)img.src=src;
  img.alt='';
  img.loading='eager';
  img.decoding='async';
  img.style.removeProperty('display');
  let em=art.querySelector(':scope > em');
  if(!em){em=document.createElement('em');art.appendChild(em);}
  em.textContent=badge;
}

function ensureSymbolArt(card,symbol,badge){
  if(!card)return;
  let art=card.querySelector('.youth-card-art');
  if(!art){art=document.createElement('span');art.className='youth-card-art';card.prepend(art);}
  card.classList.add('j13-symbol-card');
  const current=art.querySelector('.j20-card-symbol');
  if(!current){art.innerHTML='<span class="j13-card-symbol j20-card-symbol" aria-hidden="true">'+symbol+'</span><em>'+badge+'</em>';}
}

function fixHomeCards(){
  Object.entries(CARD_SOURCES).forEach(([sel,src])=>{
    const card=document.querySelector(sel);
    const badge=sel.includes('react')?'REFLEXO':sel.includes('memory')?'MEMORIZE':sel.includes('beat')?'RITMO E MOVIMENTO':'LABORATÓRIO DO PULSO';
    ensureArt(card,src,badge);
  });
  ensureSymbolArt(document.querySelector('[data-youth-breathe]'),'🌿','RECOMEÇO');
  ensureSymbolArt(document.querySelector('[data-youth-physical]'),'🏁','MISSÃO MOVIMENTO');
}

function isSharedTutor(src){
  return /\/assets\/(welcome|guide|success|retry|relax|celebrate)\.webp(?:[?#]|$)/i.test(src||'');
}
function fixImage(img){
  if(!(img instanceof HTMLImageElement))return;
  const raw=img.getAttribute('src')||'';
  if(isSharedTutor(raw)&&raw!==STABLE_TATI)img.src=STABLE_TATI;
}
function fixSharedImages(root=document){
  root.querySelectorAll?.('img').forEach(fixImage);
  const done=document.querySelector('#screen-done .done>img');
  if(done&&done.getAttribute('src')!==STABLE_TATI)done.src=STABLE_TATI;
}

function apply(){fixHomeCards();fixSharedImages();}

function installTargetedObserver(){
  const app=document.getElementById('app');
  if(!app||app.dataset.j20AssetObserver)return;
  app.dataset.j20AssetObserver='1';
  const obs=new MutationObserver(muts=>{
    for(const m of muts){
      if(m.type==='attributes'&&m.target instanceof HTMLImageElement)fixImage(m.target);
      for(const n of m.addedNodes){
        if(n.nodeType!==1)continue;
        if(n instanceof HTMLImageElement)fixImage(n);
        n.querySelectorAll?.('img').forEach(fixImage);
      }
    }
  });
  obs.observe(app,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
}

function start(){apply();installTargetedObserver();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start,{once:true});
})();
