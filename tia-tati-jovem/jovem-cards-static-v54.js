(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_STATIC_CARDS_V56__)return;
window.__TIA_TATI_JOVEM_STATIC_CARDS_V56__=true;

const q=(s,r=document)=>r.querySelector(s);
const qa=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement;
root.classList.add('j56-art-loading');

if(!q('#j56ArtGuard')){
  const st=document.createElement('style');
  st.id='j56ArtGuard';
  st.textContent='html.j56-art-loading #screen-home .youth-challenges,html.j56-art-loading #screen-home .jovem-home-hero{visibility:hidden!important}';
  document.head.appendChild(st);
}

const cards=[
  {sel:'[data-youth-light="react"]',art:'assets/jovem-v27/reflexo-neon.webp?v=56',title:'Reflexo Neon',desc:'Resposta rápida • atenção • alcance',badge:'REAÇÃO'},
  {sel:'[data-youth-light="memory"]',art:'assets/jovem-v27/memorize.webp?v=56',title:'Memorize',desc:'Sequência visual • memória de trabalho',badge:'MEMORIZE'},
  {sel:'[data-youth-light="beat"]',art:'assets/jovem-v27/ritmo-movimento.webp?v=56',title:'Ritmo e Movimento',desc:'Ritmo • coordenação • tempo de resposta',badge:'RITMO'},
  {sel:'[data-youth-sensory]',art:'assets/jovem-v27/laboratorio-pulso.webp?v=56',title:'Laboratório do Pulso',desc:'Exploração • foco • causa e efeito',badge:'LABORATÓRIO DO PULSO'},
  {sel:'[data-jlab="ping-focus"]',art:'assets/jovem-v27/pingpong-approved-v54.webp?v=56',title:'Ping Pong Focus',desc:'Reflexo • precisão • controle motor',badge:'PING PONG FOCUS'},
  {sel:'[data-jlab="piano-lab"]',art:'assets/jovem-v27/piano-lab.svg?v=56',title:'Piano Lab',desc:'Iniciação musical • ouvido • coordenação',badge:'PIANO LAB'},
  {sel:'[data-youth-breathe]',art:'assets/jovem-v27/recomeco.webp?v=56',title:'Recomeço',desc:'Pausa • foco • respiração guiada',badge:'RECOMEÇO'},
  {sel:'[data-youth-physical]',art:'assets/jovem-v27/missao-movimento.webp?v=56',title:'Missão Movimento',desc:'Movimento real • sequência • etapas',badge:'MISSÃO MOVIMENTO'}
];
const HERO='assets/jovem-v27/hero-jovem.webp?v=56';

function ensureNav(){
  if(window.__TIA_TATI_JOVEM_NAV_V56__)return Promise.resolve();
  return new Promise(resolve=>{
    let s=q('script[data-j56-nav]');
    if(!s){
      s=document.createElement('script');
      s.dataset.j56Nav='1';
      s.src='jovem-nav-v55.js?v=56';
      s.async=false;
      document.head.appendChild(s);
    }
    if(window.__TIA_TATI_JOVEM_NAV_V56__)return resolve();
    s.addEventListener('load',()=>resolve(),{once:true});
    s.addEventListener('error',()=>resolve(),{once:true});
    setTimeout(resolve,2500);
  });
}

function preload(src){
  return new Promise(resolve=>{
    const img=new Image();
    let done=false;
    const finish=ok=>{
      if(done)return;done=true;
      const dec=ok&&img.decode?img.decode().catch(()=>{}):Promise.resolve();
      Promise.resolve(dec).finally(()=>resolve({src,ok}));
    };
    img.onload=()=>finish(true);
    img.onerror=()=>finish(false);
    img.src=src;
    if(img.complete)finish(img.naturalWidth>0);
    setTimeout(()=>finish(img.naturalWidth>0),5000);
  });
}

async function waitForCards(){
  for(let i=0;i<40;i++){
    if(cards.every(c=>q(c.sel)))return true;
    await new Promise(r=>setTimeout(r,75));
  }
  return false;
}

function pasteFrame(card,cfg){
  if(!card)return;
  card.classList.add('j56-static-card');
  card.setAttribute('aria-label','Abrir '+cfg.title);
  const art=q('.youth-card-art',card);
  if(art){
    art.classList.add('j56-static-art');
    art.innerHTML=`<img src="${cfg.art}" alt="${cfg.title}" decoding="async" loading="eager" draggable="false"><em class="j27-badge">${cfg.badge}</em>`;
  }
  const strong=q('.youth-card-copy strong',card);if(strong)strong.textContent=cfg.title;
  const small=q('.youth-card-copy small',card);if(small)small.textContent=cfg.desc;
  const go=q('.youth-card-go',card);if(go)go.textContent='Abrir';
}

function apply(){
  const grid=q('.youth-card-grid');
  if(!grid)return false;
  cards.forEach(cfg=>pasteFrame(q(cfg.sel,grid),cfg));
  const head=q('.youth-challenges-head p');
  if(head)head.textContent='Oito experiências para atenção, ritmo, memória, regulação, música e movimento.';
  const art=q('.jovem-home-art');
  if(art)art.innerHTML=`<img class="j27-hero" src="${HERO}" alt="Tia Tati • Modo Jovem" decoding="async" loading="eager" draggable="false">`;
  window.TiaTatiJovemNav?.bindDirect?.();
  root.classList.add('j56-static-ready');
  root.classList.remove('j56-art-loading');
  return true;
}

window.TiaTatiJovemCardsReady=(async()=>{
  await ensureNav();
  await waitForCards();
  await Promise.all([...cards.map(c=>c.art),HERO].map(preload));
  apply();
  return true;
})().catch(err=>{
  console.warn('Tia Tati Jovem: arte estática v56',err);
  apply();
  root.classList.remove('j56-art-loading');
  return false;
});

window.addEventListener('pageshow',()=>window.TiaTatiJovemNav?.bindDirect?.());
})();