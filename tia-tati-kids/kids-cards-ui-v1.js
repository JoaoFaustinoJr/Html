(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_UI_V6__)return;
window.__TIA_TATI_KIDS_CARDS_UI_V6__=true;
const CARDS=[
 {id:'boas-vindas',title:'Boas-vindas',subtitle:'Vamos começar?',sprite:'assets/cards/cards-pair-1.webp',side:0},
 {id:'cada-conquista',title:'Cada conquista importa!',subtitle:'Todo avanço merece ser celebrado.',sprite:'assets/cards/cards-pair-1.webp',side:1},
 {id:'respira-comigo',title:'Respira comigo',subtitle:'Pausa, calma e acolhimento.',sprite:'assets/cards/cards-pair-3.webp',side:0},
 {id:'muito-bem',title:'Muito bem! Você conseguiu!',subtitle:'Incentivo com a Tia Tati.',sprite:'assets/cards/cards-pair-2.webp',side:1},
 {id:'eu-consigo',title:'Eu consigo!',subtitle:'Confiança e autonomia.',sprite:'assets/cards/cards-pair-4.webp',side:0},
 {id:'juntos',title:'Juntos vamos mais longe!',subtitle:'Acolhimento, vínculo e amizade.',sprite:'assets/cards/cards-pair-4.webp',side:1}
];
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
window.TiaTatiKidsCardsData=CARDS;
function normalizeBrand(){const a=q('.brand small');if(a)a.textContent='Fisio Sensório-Motora';const b=q('.home-v22-pill');if(b)b.textContent='FISIO SENSÓRIO-MOTORA';const c=q('.home-v22-footer-phrase small');if(c)c.textContent='Tia Tati • Fisio Sensório-Motora';document.title='Tia Tati – Fisio Sensório-Motora';}
function fixHeaderImages(){qa('img[src*="assets/welcome.webp"]').forEach(img=>img.src='assets/cards/boas-vindas-v2.webp?v=6');}
function artMarkup(c){const pos=c.side?'100%':'0%';return `<span class="tati-card-art"><span class="tati-cutout-art" role="img" aria-label="${c.title}" style="--tati-sprite:url('${c.sprite}?v=6');--tati-pos:${pos}"></span></span>`;}
function cardMarkup(c){return `<article class="tati-card tati-sticker-card" data-tati-card="${c.id}"><button class="tati-sticker-preview-btn" type="button" data-preview="${c.id}" aria-label="Ver figurinha ${c.title}">${artMarkup(c)}</button><strong class="tati-sticker-title">${c.title}</strong><small class="tati-sticker-subtitle">${c.subtitle}</small><button class="tati-sticker-download" type="button" data-sticker="${c.id}">⬇️ Baixar figurinha</button></article>`;}
function buildSection(){
 const home=q('#screen-home'),head=q('.home-v22-section-head.compact',home),grid=q('.home-v22-cards',home);if(!home||!head||!grid)return false;
 q('#tatiCardsModal')?.remove();q('.tati-cards-actions',home)?.remove();document.body.classList.remove('tati-modal-open');
 head.classList.add('tati-cards-head','is-collapsed');
 head.innerHTML=`<div><h2>Cards da Tia Tati</h2><p>Figurinhas fofas para acolher, incentivar e celebrar.</p></div><button class="tati-cards-toggle" type="button" aria-expanded="false">Expandir ↓</button>`;
 grid.className='home-v22-cards tati-cards-grid';grid.innerHTML=CARDS.map(cardMarkup).join('');grid.hidden=true;
 const toggle=head.querySelector('.tati-cards-toggle');
 const setExpanded=expanded=>{grid.hidden=!expanded;head.classList.toggle('is-collapsed',!expanded);toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Recolher ↑':'Expandir ↓';try{localStorage.setItem('tatiCardsExpanded',expanded?'1':'0');}catch(_){}};
 toggle.onclick=()=>setExpanded(toggle.getAttribute('aria-expanded')!=='true');
 grid.addEventListener('click',e=>{const p=e.target.closest('[data-preview]');if(p){const c=CARDS.find(x=>x.id===p.dataset.preview);if(c&&window.TiaTatiCardExport)window.TiaTatiCardExport.previewSticker(c);return;}const b=e.target.closest('[data-sticker]');if(!b)return;const c=CARDS.find(x=>x.id===b.dataset.sticker);if(c&&window.TiaTatiCardExport)window.TiaTatiCardExport.downloadSticker(c);else notice('Recurso preparando… tente novamente.');});
 let saved=false;try{saved=localStorage.getItem('tatiCardsExpanded')==='1';}catch(_){ }setExpanded(saved);return true;
}
function notice(text){let t=q('#tatiCardsNotice');if(!t){t=document.createElement('div');t.id='tatiCardsNotice';t.className='tati-cards-notice';document.body.appendChild(t);}t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600);}window.TiaTatiCardsNotice=notice;
function start(){normalizeBrand();fixHeaderImages();if(!buildSection())setTimeout(start,180);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();