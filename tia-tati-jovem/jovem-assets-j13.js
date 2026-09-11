(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_J13__)return;
window.__TIA_TATI_JOVEM_ASSETS_J13__=true;

const STABLE_TATI='../tia-tati/assets/tatiana-portal-v3.webp?v=j13';
const CARD_SOURCES={
  '[data-youth-light="react"]':'assets/cards/reflexo-neon.webp?v=j13',
  '[data-youth-light="memory"]':'assets/cards/memorize.webp?v=j13',
  '[data-youth-light="beat"]':'assets/cards/beat-move.webp?v=j13',
  '[data-youth-sensory]':'assets/pulse-lab.svg?v=j13'
};

function ensureArt(card,src,badge){
  if(!card)return;
  let art=card.querySelector('.youth-card-art');
  if(!art){art=document.createElement('span');art.className='youth-card-art';card.prepend(art);}
  card.classList.remove('j13-symbol-card');
  let img=art.querySelector('img');
  if(!img){img=document.createElement('img');art.prepend(img);}
  img.src=src; img.alt=''; img.loading='eager'; img.decoding='async';
  let em=art.querySelector('em');
  if(!em){em=document.createElement('em');art.appendChild(em);}
  em.textContent=badge;
}

function ensureSymbolArt(card,symbol,badge){
  if(!card)return;
  let art=card.querySelector('.youth-card-art');
  if(!art){art=document.createElement('span');art.className='youth-card-art';card.prepend(art);}
  card.classList.add('j13-symbol-card');
  art.innerHTML='<span class="j13-card-symbol" aria-hidden="true">'+symbol+'</span><em>'+badge+'</em>';
}

function fixHomeCards(){
  Object.entries(CARD_SOURCES).forEach(([sel,src])=>{
    const card=document.querySelector(sel);
    const badge=sel.includes('react')?'REFLEXO':sel.includes('memory')?'MEMORIZE':sel.includes('beat')?'BEAT & MOVE':'PULSE LAB';
    ensureArt(card,src,badge);
  });
  ensureSymbolArt(document.querySelector('[data-youth-breathe]'),'🌿','RECOMEÇO');
  ensureSymbolArt(document.querySelector('[data-youth-physical]'),'🏁','MOVE QUEST');
}

function isSharedBroken(src){
  if(!src)return false;
  return /\/assets\/(welcome|guide|success|retry|relax|celebrate)\.webp(?:[?#]|$)/i.test(src);
}
function fixImage(img){
  if(!(img instanceof HTMLImageElement))return;
  const raw=img.getAttribute('src')||'';
  if(isSharedBroken(raw))img.src=STABLE_TATI;
}
function fixSharedImages(root=document){
  root.querySelectorAll?.('img').forEach(fixImage);
  const done=document.querySelector('#screen-done .done>img');
  if(done)done.src=STABLE_TATI;
}

function apply(){fixHomeCards();fixSharedImages();}

function installTargetedObserver(){
  const app=document.getElementById('app');
  if(!app||app.dataset.j13AssetObserver)return;
  app.dataset.j13AssetObserver='1';
  const obs=new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.type==='attributes'&&m.target instanceof HTMLImageElement)fixImage(m.target);
      m.addedNodes.forEach(n=>{
        if(n.nodeType!==1)return;
        if(n instanceof HTMLImageElement)fixImage(n);
        n.querySelectorAll?.('img').forEach(fixImage);
      });
    });
  });
  obs.observe(app,{subtree:true,childList:true,attributes:true,attributeFilter:['src']});
}

function start(){
  apply();
  installTargetedObserver();
  [80,250,700,1500].forEach(t=>setTimeout(apply,t));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start,{once:true});
})();
