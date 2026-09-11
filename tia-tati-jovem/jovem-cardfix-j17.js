(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_CARDFIX_J18__)return;
window.__TIA_TATI_JOVEM_CARDFIX_J18__=true;

// Usa diretamente o WebP que já funciona no Portal Tia Tati.
// O SVG anterior continha uma imagem WebP embutida e alguns navegadores Android
// exibiam o ícone de imagem quebrada dentro dos cards.
const TATI='../tia-tati/assets/tatiana-portal-v3.webp?v=j18';
const q=(s,r=document)=>r.querySelector(s);

function safePortrait(){
  const img=document.createElement('img');
  img.className='j17-tati';
  img.src=TATI;
  img.alt='';
  img.loading='eager';
  img.decoding='async';
  // Se a imagem não puder ser decodificada, removemos o elemento. O visual vetorial
  // do card continua completo e nunca aparece o ícone de arquivo quebrado.
  img.onerror=()=>img.remove();
  return img;
}

function buildVisual(kind){
  const wrap=document.createElement('div');
  wrap.className='j17-card-visual';
  wrap.appendChild(safePortrait());

  if(kind==='react'){
    wrap.insertAdjacentHTML('beforeend','<span class="j17-orb"></span><span class="j17-hand">☝️</span><span class="j17-title">REFLEXO<b>Neon</b></span>');
  }else if(kind==='memory'){
    wrap.insertAdjacentHTML('beforeend','<span class="j17-memory-grid"><i>1</i><i>2</i><i>3</i><i>4</i></span><span class="j17-title">MEMÓRIA<b>Sequência</b></span>');
  }else{
    wrap.insertAdjacentHTML('beforeend','<span class="j17-notes">♫ ♪</span><span class="j17-eq"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="j17-orb"></span><span class="j17-title">RITMO<b>Movimento</b></span>');
  }
  return wrap;
}

function paint(sel,kind,badge){
  const card=q(sel);if(!card)return;
  const box=q('.youth-card-art',card);if(!box)return;
  box.querySelectorAll('img,.j17-card-visual').forEach(n=>n.remove());
  box.insertBefore(buildVisual(kind),box.firstChild);
  let em=q(':scope > em',box);
  if(!em){em=document.createElement('em');box.appendChild(em);}
  em.textContent=badge;
}

function makeHeroCard(kind,title){
  const d=document.createElement('div');
  d.className='j17-hero-card';
  const img=document.createElement('img');
  img.src=TATI;img.alt='';img.loading='eager';img.decoding='async';img.onerror=()=>img.remove();
  d.appendChild(img);
  if(kind==='react')d.insertAdjacentHTML('beforeend','<span class="j17-orb"></span>');
  else d.insertAdjacentHTML('beforeend','<span class="j17-notes">♫ ♪</span><span class="j17-eq"><i></i><i></i><i></i><i></i><i></i><i></i></span>');
  const s=document.createElement('strong');s.textContent=title;d.appendChild(s);
  return d;
}

function hero(){
  const h=q('.jovem-home-art');if(!h)return;
  if(h.dataset.j18==='1')return;
  h.dataset.j18='1';
  h.innerHTML='';
  h.appendChild(makeHeroCard('react','Reflexo Neon'));
  h.appendChild(makeHeroCard('beat','Ritmo e Movimento'));
}

function apply(){
  paint('[data-youth-light="react"]','react','REFLEXO');
  paint('[data-youth-light="memory"]','memory','MEMORIZE');
  paint('[data-youth-light="beat"]','beat','RITMO E MOVIMENTO');
  hero();
}
function start(){apply();[80,260,650,1200,2200].forEach(ms=>setTimeout(apply,ms));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.addEventListener('tia:jovem-modules-ready',start);
})();