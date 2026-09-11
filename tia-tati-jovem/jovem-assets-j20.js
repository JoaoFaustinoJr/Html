(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_ASSETS_V28__)return;
window.__TIA_TATI_JOVEM_ASSETS_V28__=true;
const q=(s,r=document)=>r.querySelector(s);
function addTheme(){
 if(document.querySelector('link[data-j28-theme]'))return;
 const l=document.createElement('link');l.rel='stylesheet';l.href='jovem-theme-v28.css?v=28&t='+Date.now();l.dataset.j28Theme='1';document.head.appendChild(l);
}
function safeImg(src,alt=''){
 const img=document.createElement('img');img.src=src;img.alt=alt;img.decoding='async';img.loading='eager';
 img.onerror=()=>{img.onerror=null;img.remove();};return img;
}
function setArt(card,src,badge){
 if(!card)return;let box=q('.youth-card-art',card);
 if(!box){box=document.createElement('span');box.className='youth-card-art';card.prepend(box);}
 box.textContent='';box.appendChild(safeImg(src,''));
 const em=document.createElement('em');em.className='j28-badge';em.textContent=badge;box.appendChild(em);
}
function setHero(){
 const hero=q('.jovem-home-art');if(!hero)return;
 hero.textContent='';
 const stage=document.createElement('div');stage.className='j28-stage';stage.innerHTML='<span class="brain">🧠</span><span class="rings"></span><span class="spark s1">✦</span><span class="spark s2">♥</span><span class="spark s3">⚡</span><span class="tag">VOCÊ CONSEGUE! ♥</span>';
 hero.appendChild(stage);
}
function apply(){
 addTheme();setHero();
 setArt(q('[data-youth-light="react"]'),'assets/jovem-v27/reflexo-neon.webp?v=28','REFLEXO');
 setArt(q('[data-youth-light="memory"]'),'assets/jovem-v27/memorize.webp?v=28','MEMORIZE');
 setArt(q('[data-youth-light="beat"]'),'assets/jovem-v27/ritmo-movimento.webp?v=28','RITMO');
 setArt(q('[data-youth-breathe]'),'assets/jovem-v27/recomeco.webp?v=28','RECOMEÇO');
 setArt(q('[data-youth-physical]'),'assets/jovem-v27/missao-movimento.webp?v=28','MOVIMENTO');
 setArt(q('[data-youth-sensory]'),'assets/jovem-v27/laboratorio-pulso.webp?v=28','PULSO');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
window.addEventListener('tia:jovem-modules-ready',apply,{once:true});
})();
