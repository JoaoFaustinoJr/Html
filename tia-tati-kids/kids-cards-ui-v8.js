(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_UI_V8__)return;
window.__TIA_TATI_KIDS_CARDS_UI_V8__=true;
const CARDS=[
 {id:'boas-vindas',title:'Boas-vindas',subtitle:'Vamos começar?',sprite:'assets/cards/cards-pair-1.webp',side:0},
 {id:'cada-conquista',title:'Cada conquista importa!',subtitle:'Todo avanço merece ser celebrado.',sprite:'assets/cards/cards-pair-1.webp',side:1},
 {id:'muito-bem-tati',title:'Muito bem! Você conseguiu!',subtitle:'Incentivo direto da Tia Tati.',sprite:'assets/cards/cards-pair-2.webp',side:0},
 {id:'voce-consegue-menino',title:'Você consegue!',subtitle:'Acolhimento e incentivo com a Tia Tati.',sprite:'assets/cards/cards-pair-2.webp',side:1},
 {id:'respira-comigo',title:'Respira comigo',subtitle:'Pausa, calma e acolhimento.',sprite:'assets/cards/cards-pair-3.webp',side:0},
 {id:'forca-menina',title:'Você consegue!',subtitle:'Confiança, alegria e perseverança.',sprite:'assets/cards/cards-pair-3.webp',side:1},
 {id:'eu-consigo-menino',title:'Eu consigo!',subtitle:'Confiança e autonomia.',sprite:'assets/cards/cards-pair-4.webp',side:0},
 {id:'juntos-sempre',title:'Juntos sempre!',subtitle:'Vínculo, presença e acolhimento.',sprite:'assets/cards/cards-pair-4.webp',side:1},
 {id:'descobertas',title:'Vamos descobrir!',subtitle:'Curiosidade também é aprender.',sprite:'assets/cards/cards-pair-5.webp',side:0},
 {id:'preciso-ajuda',title:'Preciso de ajuda',subtitle:'Tudo bem pedir ajuda quando precisar.',sprite:'assets/cards/cards-pair-5.webp',side:1},
 {id:'muito-bem',title:'Muito bem!',subtitle:'Seu esforço merece ser reconhecido.',sprite:'assets/cards/cards-pair-6.webp',side:0},
 {id:'amizade',title:'Amizade também move o mundo!',subtitle:'Inclusão, respeito e amizade.',sprite:'assets/cards/cards-pair-6.webp',side:1}
];
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
window.TiaTatiKidsCardsData=CARDS;
function normalizeBrand(){const a=q('.brand small');if(a)a.textContent='Fisio Sensório-Motora';const b=q('.home-v22-pill');if(b)b.textContent='FISIO SENSÓRIO-MOTORA';const c=q('.home-v22-footer-phrase small');if(c)c.textContent='Tia Tati • Fisio Sensório-Motora';document.title='Tia Tati – Fisio Sensório-Motora';}
function fixHeaderImages(){qa('img[src*="assets/welcome.webp"]').forEach(img=>img.src='assets/cards/boas-vindas-v2.webp?v=8');}
function preload(){[...new Set(CARDS.map(c=>c.sprite))].forEach(src=>{const i=new Image();i.src=src+'?v=8';});}
function artMarkup(c){const shift=c.side?'-50%':'0%';return `<span class="tati-card-art"><img class="tati-sprite-img" src="${c.sprite}?v=8" alt="${c.title}" decoding="async" loading="eager" draggable="false" style="--tati-shift:${shift}"></span>`;}
function cardMarkup(c){return `<article class="tati-card tati-sticker-card" data-tati-card="${c.id}"><button class="tati-sticker-preview-btn" type="button" data-preview="${c.id}" aria-label="Ver figurinha ${c.title}">${artMarkup(c)}</button><strong class="tati-sticker-title">${c.title}</strong><small class="tati-sticker-subtitle">${c.subtitle}</small><button class="tati-sticker-download" type="button" data-sticker="${c.id}">⬇️ Baixar figurinha</button></article>`;}
function buildSection(){
 const home=q('#screen-home'),head=q('.home-v22-section-head.compact',home),grid=q('.home-v22-cards',home);if(!home||!head||!grid)return false;
 q('#tatiCardsModal')?.remove();q('.tati-cards-actions',home)?.remove();document.body.classList.remove('tati-modal-open');
 head.classList.add('tati-cards-head','is-collapsed');
 head.innerHTML=`<div><h2>Cards da Tia Tati</h2><p>Figurinhas fofas para acolher, incentivar e celebrar.</p></div><button class="tati-cards-toggle" type="button" aria-expanded="false">Expandir ↓</button>`;
 grid.className='home-v22-cards tati-cards-grid';grid.innerHTML=CARDS.map(cardMarkup).join('');grid.hidden=true;
 grid.querySelectorAll('.tati-sprite-img').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('tati-img-error');img.alt='Imagem temporariamente indisponível';});});
 const toggle=head.querySelector('.tati-cards-toggle');
 const setExpanded=expanded=>{grid.hidden=!expanded;head.classList.toggle('is-collapsed',!expanded);toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Recolher ↑':'Expandir ↓';};
 toggle.onclick=()=>setExpanded(toggle.getAttribute('aria-expanded')!=='true');
 grid.addEventListener('click',e=>{const p=e.target.closest('[data-preview]');if(p){const c=CARDS.find(x=>x.id===p.dataset.preview);if(c&&window.TiaTatiCardExport)window.TiaTatiCardExport.previewSticker(c);return;}const b=e.target.closest('[data-sticker]');if(!b)return;const c=CARDS.find(x=>x.id===b.dataset.sticker);if(c&&window.TiaTatiCardExport)window.TiaTatiCardExport.downloadSticker(c);else notice('Recurso preparando… tente novamente.');});
 setExpanded(false);return true;
}
function notice(text){let t=q('#tatiCardsNotice');if(!t){t=document.createElement('div');t.id='tatiCardsNotice';t.className='tati-cards-notice';document.body.appendChild(t);}t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600);}window.TiaTatiCardsNotice=notice;
function start(){normalizeBrand();fixHeaderImages();preload();if(!buildSection())setTimeout(start,180);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();