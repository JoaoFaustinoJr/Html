(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_UI_V4__)return;
window.__TIA_TATI_KIDS_CARDS_UI_V4__=true;
const CARDS=[
 {id:'boas-vindas',title:'Boas-vindas',subtitle:'Vamos juntos?',sprite:'assets/cards/cards-pair-1.webp',side:0},
 {id:'cada-conquista',title:'Cada conquista importa!',subtitle:'Movimento, confiança e alegria.',sprite:'assets/cards/cards-pair-1.webp',side:1},
 {id:'eu-consigo-tati',title:'Eu consigo!',subtitle:'Você é capaz!',sprite:'assets/cards/cards-pair-2.webp',side:0},
 {id:'voce-consegue',title:'Você consegue!',subtitle:'Vamos juntos!',sprite:'assets/cards/cards-pair-2.webp',side:1},
 {id:'respira-comigo',title:'Respira comigo',subtitle:'Pausa • calma • bem-estar',sprite:'assets/cards/cards-pair-3.webp',side:0},
 {id:'forca',title:'Força!',subtitle:'Tente mais uma vez!',sprite:'assets/cards/cards-pair-3.webp',side:1},
 {id:'eu-consigo-menino',title:'Eu consigo!',subtitle:'Pequenas vitórias!',sprite:'assets/cards/cards-pair-4.webp',side:0},
 {id:'juntos',title:'Juntos!',subtitle:'Você não está sozinho!',sprite:'assets/cards/cards-pair-4.webp',side:1},
 {id:'descobertas',title:'Descobertas',subtitle:'Explorar é aprender!',sprite:'assets/cards/cards-pair-5.webp',side:0},
 {id:'preciso-ajuda',title:'Preciso de ajuda',subtitle:'Tudo bem pedir ajuda!',sprite:'assets/cards/cards-pair-5.webp',side:1},
 {id:'muito-bem',title:'Muito bem!',subtitle:'Você está evoluindo!',sprite:'assets/cards/cards-pair-6.webp',side:0},
 {id:'juntos-mais-fortes',title:'Juntos somos mais fortes!',subtitle:'Inclusão, respeito e amizade.',sprite:'assets/cards/cards-pair-6.webp',side:1}
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
 qa('img[src*="assets/welcome.webp"]').forEach(img=>img.src='assets/cards/boas-vindas-v2.webp?v=4');
 qa('img[src*="assets/success.webp"]').forEach(img=>img.src='assets/cards/muito-bem-v2.webp?v=4');
}
function artMarkup(c){const pos=c.side?'100%':'0%';return `<span class="tati-card-art"><span class="tati-sprite-art" role="img" aria-label="${c.title}" style="--tati-sprite:url('${c.sprite}?v=4');--tati-pos:${pos}"></span></span>`;}
function cardMarkup(c){return `<article class="tati-card" data-tati-card="${c.id}">${artMarkup(c)}<span class="tati-card-copy"><strong>${c.title}</strong><small>${c.subtitle}</small></span><button class="tati-sticker-download" type="button" data-sticker="${c.id}">⬇️ Baixar figurinha</button></article>`;}
function buildSection(){
 const home=q('#screen-home'),head=q('.home-v22-section-head.compact',home),grid=q('.home-v22-cards',home);if(!home||!head||!grid)return false;
 q('#tatiCardsModal')?.remove();q('.tati-cards-actions',home)?.remove();document.body.classList.remove('tati-modal-open');
 head.classList.add('tati-cards-head','is-collapsed');
 head.innerHTML=`<div><h2>Cards da Tia Tati</h2><p>Figurinhas de acolhimento, incentivo e autonomia.</p></div><button class="tati-cards-toggle" type="button" aria-expanded="false">Expandir ↓</button>`;
 grid.className='home-v22-cards tati-cards-grid';grid.innerHTML=CARDS.map(cardMarkup).join('');grid.hidden=true;
 const toggle=head.querySelector('.tati-cards-toggle');
 const setExpanded=expanded=>{grid.hidden=!expanded;head.classList.toggle('is-collapsed',!expanded);toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Recolher ↑':'Expandir ↓';};
 toggle.onclick=()=>setExpanded(toggle.getAttribute('aria-expanded')!=='true');
 grid.addEventListener('click',e=>{const b=e.target.closest('[data-sticker]');if(!b)return;const card=CARDS.find(c=>c.id===b.dataset.sticker);if(!card)return;if(window.TiaTatiCardExport)window.TiaTatiCardExport.downloadSticker(card);else notice('Recurso preparando… tente novamente.');});
 setExpanded(false);return true;
}
function notice(text){let t=q('#tatiCardsNotice');if(!t){t=document.createElement('div');t.id='tatiCardsNotice';t.className='tati-cards-notice';document.body.appendChild(t);}t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2600);}window.TiaTatiCardsNotice=notice;
function start(){normalizeBrand();fixHeaderImages();if(!buildSection()){setTimeout(start,180);return;}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();