(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ILLUSTRATED_V24__)return;
window.__TIA_TATI_JOVEM_ILLUSTRATED_V24__=true;
const q=(s,r=document)=>r.querySelector(s);
const addStyle=(href,key)=>{if(document.querySelector(`link[data-${key}]`))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.setAttribute(`data-${key}`,'1');document.head.appendChild(l);};
const addTheme=()=>{addStyle('jovem-theme-v24.css?v=26&t='+Date.now(),'j24-theme');addStyle('jovem-fix-v26.css?v=26&t='+Date.now(),'j26-fix');};
const safeImg=(src,alt='')=>{const img=document.createElement('img');img.src=src;img.alt=alt;img.decoding='async';img.loading='eager';img.onerror=()=>{img.onerror=null;img.style.display='none';};return img;};
function setArt(card,src,badge){
 if(!card)return;let box=q('.youth-card-art',card);if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box);}card.classList.remove('j13-symbol-card');box.textContent='';const img=safeImg(src,'');box.appendChild(img);const em=document.createElement('em');em.className='j24-badge';em.textContent=badge;box.appendChild(em);
}
function applyHero(){
 const root=q('.jovem-home-art');if(!root)return;root.textContent='';root.classList.remove('j24-hero-noimage');
 const img=document.createElement('img');img.alt='Tia Tati';img.decoding='async';img.loading='eager';img.className='j24-hero-illustration';
 let fallbackUsed=false;
 img.onerror=()=>{if(!fallbackUsed){fallbackUsed=true;img.src='assets/completion-avatar.webp?v=26';return;}img.onerror=null;img.remove();root.classList.add('j24-hero-noimage');};
 img.src='assets/tia-tati-hero-v26.webp?v=26';
 root.appendChild(img);
}
function applyCards(){
 setArt(q('[data-youth-light="react"]'),'assets/cards/reflexo-neon.webp?v=26','REFLEXO');
 setArt(q('[data-youth-light="memory"]'),'assets/cards/memorize.webp?v=26','MEMORIZE');
 setArt(q('[data-youth-light="beat"]'),'assets/cards/beat-move.webp?v=26','RITMO E MOVIMENTO');
 setArt(q('[data-youth-sensory]'),'assets/pulse-lab.svg?v=26','LABORATÓRIO DO PULSO');
 setArt(q('[data-youth-breathe]'),'assets/relax.webp?v=26','RECOMEÇO');
 setArt(q('[data-youth-physical]'),'assets/guide.webp?v=26','MISSÃO MOVIMENTO');
}
function cleanup(){document.querySelectorAll('.youth-card-art canvas,.youth-card-art .j13-card-symbol,.youth-card-art .j22-card-symbol,.blur-oval,.glass-oval,.card-mask,.hero-mask').forEach(n=>n.remove());}
function start(){document.documentElement.classList.add('tia-jovem-v24');addTheme();cleanup();applyHero();applyCards();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start,{once:true});
})();
