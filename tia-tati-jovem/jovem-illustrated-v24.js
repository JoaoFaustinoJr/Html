(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ILLUSTRATED_V24__)return;
window.__TIA_TATI_JOVEM_ILLUSTRATED_V24__=true;
const q=(s,r=document)=>r.querySelector(s);
const addTheme=()=>{if(document.querySelector('link[data-j24-theme]'))return;const l=document.createElement('link');l.rel='stylesheet';l.href='jovem-theme-v24.css?v=24&t='+Date.now();l.dataset.j24Theme='1';document.head.appendChild(l);};
const safeImg=(src,alt='')=>{const img=document.createElement('img');img.src=src;img.alt=alt;img.decoding='async';img.loading='eager';img.onerror=()=>{img.onerror=null;img.style.display='none';};return img;};
function setArt(card,src,badge){
 if(!card)return;let box=q('.youth-card-art',card);if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box);}card.classList.remove('j13-symbol-card');box.textContent='';const img=safeImg(src,'');box.appendChild(img);const em=document.createElement('em');em.className='j24-badge';em.textContent=badge;box.appendChild(em);
}
function applyHero(){
 const root=q('.jovem-home-art');if(!root)return;root.textContent='';const img=safeImg('../tia-tati/assets/icon-tia-tati-v2.svg?v=24','Tia Tati');img.className='j24-hero-illustration';img.onerror=()=>{img.onerror=null;img.src='../tia-tati/assets/icon-tia-tati-512.webp?v=24';};root.appendChild(img);
}
function applyCards(){
 setArt(q('[data-youth-light="react"]'),'assets/cards/reflexo-neon.webp?v=24','REFLEXO');
 setArt(q('[data-youth-light="memory"]'),'assets/cards/memorize.webp?v=24','MEMORIZE');
 setArt(q('[data-youth-light="beat"]'),'assets/cards/beat-move.webp?v=24','RITMO E MOVIMENTO');
 setArt(q('[data-youth-sensory]'),'assets/pulse-lab.svg?v=24','LABORATÓRIO DO PULSO');
 setArt(q('[data-youth-breathe]'),'assets/relax.webp?v=24','RECOMEÇO');
 setArt(q('[data-youth-physical]'),'assets/guide.webp?v=24','MISSÃO MOVIMENTO');
}
function cleanup(){
 document.querySelectorAll('.youth-card-art canvas,.youth-card-art .j13-card-symbol,.youth-card-art .j22-card-symbol,.blur-oval,.glass-oval,.card-mask,.hero-mask').forEach(n=>n.remove());
}
function start(){document.documentElement.classList.add('tia-jovem-v24');addTheme();cleanup();applyHero();applyCards();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start,{once:true});
})();
