(()=>{
'use strict';
if(window.__TIA_TATI_KIDS_CARDS_UI_V23__)return;
window.__TIA_TATI_KIDS_CARDS_UI_V23__=true;
const CARDS=[
 {id:'colecao-atividades-v23',title:'Conquistas das Atividades',subtitle:'Figurinhas especiais para celebrar o esforço!',image:'assets/cards/tia-tati-rewards-v23.webp',sheet:true},
 {id:'espelho-magico',title:'Espelho Mágico',subtitle:'Veja como você é especial!',image:'assets/file_00000000106481fdbe4c95bf18c9eff7.png'},
 {id:'abelhinha',title:'Abelhinha',subtitle:'Você consegue!',image:'assets/file_0000000059a88211bd424dfb72428755.png'},
 {id:'carro-tia-tati',title:'Carro da Tia Tati',subtitle:'Vamos juntos!',image:'assets/file_00000000ee508211b76cde0b825efc6d.png'},
 {id:'bom-dia',title:'Bom dia!',subtitle:'Que seu dia seja incrível!',image:'assets/cards/sticker-bom-dia-v17.svg'},
 {id:'gratidao',title:'Gratidão!',subtitle:'Um coração agradecido.',image:'assets/cards/sticker-gratidao-v17.svg'},
 {id:'forca',title:'Força!',subtitle:'Você consegue!',image:'assets/cards/sticker-forca-v17.svg'},
 {id:'vamos-frente',title:'Vamos em frente!',subtitle:'Um passo de cada vez.',image:'assets/cards/sticker-vamos-frente-v17.svg'},
 {id:'sonhe',title:'Sonhe sempre!',subtitle:'Seus sonhos importam.',image:'assets/cards/sticker-sonhe-v17.svg'},
 {id:'hora-estudar',title:'Hora de estudar!',subtitle:'Aprender é uma aventura.',image:'assets/cards/sticker-hora-estudar-v17.svg'},
 {id:'musica',title:'Música alegra o dia!',subtitle:'Vamos sentir o ritmo.',image:'assets/cards/sticker-musica-v17.svg'},
 {id:'escola',title:'Grandes sonhos!',subtitle:'A escola abre caminhos.',image:'assets/cards/sticker-escola-v17.svg'}
,
 {id:'mini-coracao',title:'Coração',subtitle:'Carinho da Tia Tati',image:'assets/cards/diecut-coracao-v18.svg'},
 {id:'mini-estrela',title:'Estrela',subtitle:'Brilhe sempre!',image:'assets/cards/diecut-estrela-v18.svg'},
 {id:'mini-borboleta',title:'Borboleta',subtitle:'Transformar e crescer.',image:'assets/cards/diecut-borboleta-v18.svg'},
 {id:'mini-flor',title:'Flor',subtitle:'Floresça!',image:'assets/cards/diecut-flor-v18.svg'},
 {id:'mini-abelhinha',title:'Abelhinha',subtitle:'Juntos vamos mais longe!',image:'assets/cards/diecut-abelhinha-mini-v18.svg'},
 {id:'mini-livros',title:'Livros',subtitle:'Conhecimento abre portas.',image:'assets/cards/diecut-livros-v18.svg'},
 {id:'mini-lapis',title:'Lápis',subtitle:'Crie suas ideias!',image:'assets/cards/diecut-lapis-v18.svg'},
 {id:'mini-sol',title:'Sol',subtitle:'Tenha um dia incrível!',image:'assets/cards/diecut-sol-v18.svg'},
 {id:'reward-tangram',title:'Mestre das Formas!',subtitle:'Tangram concluído!',image:'assets/cards/reward-tangram-v19.svg'},
 {id:'reward-caminho',title:'Missão cumprida!',subtitle:'Caminho Seguro',image:'assets/cards/reward-caminho-v19.svg'},
 {id:'reward-relogio',title:'Craque das Horas!',subtitle:'Desafio do relógio',image:'assets/cards/reward-relogio-v19.svg'},
 {id:'reward-xilofone',title:'Mandou bem no ritmo!',subtitle:'Xilofone',image:'assets/cards/reward-xilofone-v19.svg'},
 {id:'reward-velha',title:'Boa estratégia!',subtitle:'Jogo da Velha',image:'assets/cards/reward-velha-v19.svg'},
 {id:'reward-pingpong',title:'Foco total!',subtitle:'Ping Pong',image:'assets/cards/reward-pingpong-v19.svg'},
 {id:'reward-espelho',title:'Você é especial!',subtitle:'Espelho Mágico',image:'assets/cards/reward-espelho-v19.svg'},
 {id:'reward-persistencia',title:'Não desistiu!',subtitle:'Persistência',image:'assets/cards/reward-persistencia-v19.svg'},
 {id:'reward-tentou',title:'Tentou novamente!',subtitle:'Coragem para tentar',image:'assets/cards/reward-tentou-v19.svg'},
 {id:'reward-superou',title:'Superou o desafio!',subtitle:'Conquista',image:'assets/cards/reward-superou-v19.svg'}];
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
window.TiaTatiKidsCardsData=CARDS;
function normalizeBrand(){const a=q('.brand small');if(a)a.textContent='Fisio Sensório-Motora';const b=q('.home-v22-pill');if(b)b.textContent='FISIO SENSÓRIO-MOTORA';const c=q('.home-v22-footer-phrase small');if(c)c.textContent='Tia Tati • Fisio Sensório-Motora';document.title='Tia Tati – Fisio Sensório-Motora';}
function fixHeaderImages(){qa('img[src*="assets/welcome.webp"]').forEach(img=>img.src='assets/cards/boas-vindas-v2.webp?v=8');}
function preload(){[...new Set(CARDS.map(c=>c.image||c.sprite))].forEach(src=>{const i=new Image();i.src=src+'?v=8';});}
function artMarkup(c){if(c.image)return `<span class="tati-card-art${c.sheet?' tati-sheet-art':''}"><img class="tati-sprite-img" src="${c.image}?v=23" alt="${c.title}" decoding="async" loading="eager" draggable="false" style="width:100%;height:100%;object-fit:${c.sheet?'contain':'cover'};object-position:center"></span>`;const shift=c.side?'-50%':'0%';return `<span class="tati-card-art"><img class="tati-sprite-img" src="${c.sprite}?v=8" alt="${c.title}" decoding="async" loading="eager" draggable="false" style="--tati-shift:${shift}"></span>`;}
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