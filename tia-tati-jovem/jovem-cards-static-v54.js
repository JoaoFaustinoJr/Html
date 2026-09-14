(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_STATIC_CARDS_V55__)return;
window.__TIA_TATI_JOVEM_STATIC_CARDS_V55__=true;

const q=(s,r=document)=>r.querySelector(s);

const cards=[
  {sel:'[data-youth-light="react"]',art:'assets/jovem-v27/reflexo-neon.webp?v=55',title:'Reflexo Neon',desc:'Resposta rápida • atenção • alcance',badge:'REAÇÃO'},
  {sel:'[data-youth-light="memory"]',art:'assets/jovem-v27/memorize.webp?v=55',title:'Memorize',desc:'Sequência visual • memória de trabalho',badge:'MEMORIZE'},
  {sel:'[data-youth-light="beat"]',art:'assets/jovem-v27/ritmo-movimento.webp?v=55',title:'Ritmo e Movimento',desc:'Ritmo • coordenação • tempo de resposta',badge:'RITMO'},
  {sel:'[data-youth-sensory]',art:'assets/jovem-v27/laboratorio-pulso.webp?v=55',title:'Laboratório do Pulso',desc:'Exploração • foco • causa e efeito',badge:'LABORATÓRIO DO PULSO'},
  {sel:'[data-jlab="ping-focus"]',art:'assets/jovem-v27/pingpong-approved-v54.webp?v=55',title:'Ping Pong Focus',desc:'Reflexo • precisão • controle motor',badge:'PING PONG FOCUS'},
  {sel:'[data-jlab="piano-lab"]',art:'assets/jovem-v27/piano-lab.svg?v=55',title:'Piano Lab',desc:'Iniciação musical • ouvido • coordenação',badge:'PIANO LAB'},
  {sel:'[data-youth-breathe]',art:'assets/jovem-v27/recomeco.webp?v=55',title:'Recomeço',desc:'Pausa • foco • respiração guiada',badge:'RECOMEÇO'},
  {sel:'[data-youth-physical]',art:'assets/jovem-v27/missao-movimento.webp?v=55',title:'Missão Movimento',desc:'Movimento real • sequência • etapas',badge:'MISSÃO MOVIMENTO'}
];

function pasteFrame(card,cfg){
  if(!card)return false;
  card.classList.add('j55-static-card');
  card.setAttribute('aria-label','Abrir '+cfg.title);
  const art=q('.youth-card-art',card);
  if(art){
    art.classList.add('j55-static-art');
    const current=q('img',art);
    const already=current && current.getAttribute('src')===cfg.art && q('em.j27-badge',art);
    if(!already){
      art.innerHTML=`<img src="${cfg.art}" alt="${cfg.title}" decoding="async" loading="eager" draggable="false"><em class="j27-badge">${cfg.badge}</em>`;
    }
  }
  const strong=q('.youth-card-copy strong',card);if(strong)strong.textContent=cfg.title;
  const small=q('.youth-card-copy small',card);if(small)small.textContent=cfg.desc;
  const go=q('.youth-card-go',card);if(go)go.textContent='Abrir';
  return true;
}

function applyHero(){
  const art=q('.jovem-home-art');
  if(!art)return false;
  if(!q('img.j27-hero',art)){
    art.innerHTML='<img class="j27-hero" src="assets/jovem-v27/hero-jovem.webp?v=55" alt="Tia Tati • Modo Jovem" decoding="async" loading="eager" draggable="false">';
  }
  return true;
}

function apply(){
  const grid=q('.youth-card-grid');
  if(!grid)return false;
  let found=0;
  cards.forEach(cfg=>{
    const card=q(cfg.sel,grid);
    if(card){found++;pasteFrame(card,cfg);}
  });
  const head=q('.youth-challenges-head p');
  if(head)head.textContent='Oito experiências para atenção, ritmo, memória, regulação, música e movimento.';
  applyHero();
  document.documentElement.classList.toggle('j55-static-ready',found===cards.length);
  return found===cards.length;
}

function boot(){
  apply();
  [80,220,500,900,1600].forEach(ms=>setTimeout(apply,ms));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
window.addEventListener('tia:jovem-modules-ready',()=>setTimeout(apply,60));
window.addEventListener('pageshow',apply);
})();