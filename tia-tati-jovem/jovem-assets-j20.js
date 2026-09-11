(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_V27__)return;
window.__TIA_TATI_JOVEM_ASSETS_V27__=true;
const q=(s,r=document)=>r.querySelector(s);
function addTheme(){
 if(document.querySelector('link[data-j27-theme]'))return;
 const l=document.createElement('link');l.rel='stylesheet';l.href='jovem-theme-v27.css?v=27&t='+Date.now();l.dataset.j27Theme='1';document.head.appendChild(l);
}
function safeImg(src,alt=''){
 const img=document.createElement('img');img.src=src;img.alt=alt;img.decoding='async';img.loading='eager';
 img.onerror=()=>{img.onerror=null;img.remove();};return img;
}
function setArt(card,src,badge){
 if(!card)return;let box=q('.youth-card-art',card);
 if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box);}
 box.textContent='';box.appendChild(safeImg(src,''));
 const em=document.createElement('em');em.className='j27-badge';em.textContent=badge;box.appendChild(em);
}
function apply(){
 addTheme();
 const hero=q('.jovem-home-art');
 if(hero){hero.textContent='';const img=safeImg('assets/jovem-v27/hero-jovem.webp?v=27','Tia Tati – Modo Jovem');img.className='j27-hero';hero.appendChild(img);}
 setArt(q('[data-youth-light="react"]'),'assets/jovem-v27/reflexo-neon.webp?v=27','REFLEXO');
 setArt(q('[data-youth-light="memory"]'),'assets/jovem-v27/memorize.webp?v=27','MEMORIZE');
 setArt(q('[data-youth-light="beat"]'),'assets/jovem-v27/ritmo-movimento.webp?v=27','RITMO E MOVIMENTO');
 setArt(q('[data-youth-breathe]'),'assets/jovem-v27/recomeco.webp?v=27','RECOMEÇO');
 setArt(q('[data-youth-physical]'),'assets/jovem-v27/missao-movimento.webp?v=27','MISSÃO MOVIMENTO');
 setArt(q('[data-youth-sensory]'),'assets/jovem-v27/laboratorio-pulso.webp?v=27','LABORATÓRIO DO PULSO');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
window.addEventListener('tia:jovem-modules-ready',apply,{once:true});
})();
