(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_UI_V3__)return;
window.__TIA_TATI_KIDS_CARDS_UI_V3__=true;
const CARDS=[
 {id:'boas-vindas',title:'Boas-vindas',subtitle:'Vamos começar?',img:'assets/cards/boas-vindas-v2.webp'},
 {id:'cada-conquista',title:'Cada conquista importa!',subtitle:'Movimento, confiança e alegria.',img:'assets/cards/tia-tati-menina.webp'},
 {id:'muito-bem',title:'Muito bem!',subtitle:'Você conseguiu!',img:'assets/cards/muito-bem-v2.webp'}
];
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
window.TiaTatiKidsCardsData=CARDS;
function normalizeBrand(){
 const a=q('.brand small');if(a)a.textContent='Fisio Sensório-Motora';
 const b=q('.home-v22-pill');if(b)b.textContent='FISIO SENSÓRIO-MOTORA';
 const c=q('.home-v22-footer-phrase small');if(c)c.textContent='Tia Tati • Fisio Sensório-Motora';
 document.title='Tia Tati – Fisio Sensório-Motora';
}
function fixHeaderImages(){
 qa('img[src*="assets/welcome.webp"]').forEach(img=>img.src='assets/cards/boas-vindas-v2.webp?v=3');
 qa('img[src*="assets/success.webp"]').forEach(img=>img.src='assets/cards/muito-bem-v2.webp?v=3');
}
function cardMarkup(c){return `<article class="tati-card" data-tati-card="${c.id}"><span class="tati-card-art"><img src="${c.img}?v=3" alt="${c.title}" decoding="async" loading="lazy"></span><span class="tati-card-copy"><strong>${c.title}</strong><small>${c.subtitle}</small></span><button class="tati-sticker-download" type="button" data-sticker="${c.id}">⬇️ Baixar figurinha</button></article>`;}
function buildSection(){
 const home=q('#screen-home'),head=q('.home-v22-section-head.compact',home),grid=q('.home-v22-cards',home);if(!home||!head||!grid)return false;
 q('#tatiCardsModal')?.remove();q('.tati-cards-actions',home)?.remove();document.body.classList.remove('tati-modal-open');
 head.classList.add('tati-cards-head','is-collapsed');
 head.innerHTML=`<div><h2>Cards da Tia Tati</h2><p>Figurinhas de acolhimento e incentivo.</p></div><button class="tati-cards-toggle" type="button" aria-expanded="false">Expandir ↓</button>`;
 grid.className='home-v22-cards tati-cards-grid';grid.innerHTML=CARDS.map(cardMarkup).join('');grid.hidden=true;
 const toggle=head.querySelector('.tati-cards-toggle');
 const setExpanded=expanded=>{grid.hidden=!expanded;head.classList.toggle('is-collapsed',!expanded);toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Recolher ↑':'Expandir ↓';};
 toggle.onclick=()=>setExpanded(toggle.getAttribute('aria-expanded')!=='true');
 grid.addEventListener('click',e=>{const b=e.target.closest('[data-sticker]');if(!b)return;const card=CARDS.find(c=>c.id===b.dataset.sticker);if(!card)return;if(window.TiaTatiCardExport)window.TiaTatiCardExport.downloadSticker(card);else notice('Recurso preparando… tente novamente.');});
 setExpanded(false);return true;
}
function notice(text){let t=q('#tatiCardsNotice');if(!t){t=document.createElement('div');t.id='tatiCardsNotice';t.className='tati-cards-notice';document.body.appendChild(t);}t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2400);}window.TiaTatiCardsNotice=notice;
function start(){normalizeBrand();fixHeaderImages();if(!buildSection()){setTimeout(start,180);return;}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();