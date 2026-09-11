(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ILLUSTRATED_V23__)return;
window.__TIA_TATI_JOVEM_ILLUSTRATED_V23__=true;

const q=(s,r=document)=>r.querySelector(s);
const addTheme=()=>{
 if(document.querySelector('link[data-j23-theme]'))return;
 const l=document.createElement('link');l.rel='stylesheet';l.href='jovem-theme-v23.css?v=23';l.dataset.j23Theme='1';document.head.appendChild(l);
};
const safeImg=(src,alt='')=>{const img=document.createElement('img');img.src=src;img.alt=alt;img.decoding='async';img.loading='eager';img.onerror=()=>{img.onerror=null;img.style.display='none';};return img;};
function setArt(card,src,badge){
 if(!card)return;let box=q('.youth-card-art',card);if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box);}card.classList.remove('j13-symbol-card');box.textContent='';box.appendChild(safeImg(src,''));const em=document.createElement('em');em.textContent=badge;box.appendChild(em);
}
function applyHero(){
 const root=q('.jovem-home-art');if(!root)return;root.textContent='';const img=safeImg('assets/welcome.webp?v=23','');img.className='j23-hero-illustration';img.onerror=()=>{img.onerror=null;img.src='../tia-tati/assets/tatiana-portal-v3.webp?v=23';};root.appendChild(img);
}
function applyCards(){
 setArt(q('[data-youth-light="react"]'),'assets/cards/reflexo-neon.webp?v=23','REFLEXO');
 setArt(q('[data-youth-light="memory"]'),'assets/cards/memorize.webp?v=23','MEMORIZE');
 setArt(q('[data-youth-light="beat"]'),'assets/cards/beat-move.webp?v=23','RITMO E MOVIMENTO');
 setArt(q('[data-youth-sensory]'),'assets/pulse-lab.svg?v=23','LABORATÓRIO DO PULSO');
 setArt(q('[data-youth-breathe]'),'assets/relax.webp?v=23','RECOMEÇO');
 setArt(q('[data-youth-physical]'),'assets/guide.webp?v=23','MISSÃO MOVIMENTO');
}
function start(){document.documentElement.classList.add('tia-jovem-v23');addTheme();applyHero();applyCards();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start,{once:true});
})();
