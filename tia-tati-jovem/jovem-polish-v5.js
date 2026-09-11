(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_POLISH_V5__)return;
window.__TIA_TATI_JOVEM_POLISH_V5__=true;
const q=(s,r=document)=>r.querySelector(s);

const cards=[
 {sel:'[data-youth-light="react"]',cls:'react',title:'Reflexo Neon',desc:'Resposta rápida • atenção • alcance',badge:'REFLEXO NEON',art:'<img src="assets/cards/reflexo-neon.webp" alt="Reflexo Neon" decoding="async">'},
 {sel:'[data-youth-light="memory"]',cls:'memory',title:'Memorize',desc:'Sequência visual • memória de trabalho',badge:'MEMORIZE',art:'<img src="assets/cards/memorize.webp" alt="Memorize" decoding="async">'},
 {sel:'[data-youth-light="beat"]',cls:'beat',title:'Beat & Move',desc:'Ritmo • coordenação • tempo de resposta',badge:'BEAT & MOVE',art:'<img src="assets/cards/beat-move.webp" alt="Beat & Move" decoding="async">'},
 {sel:'[data-youth-sensory]',cls:'pulse-lab',title:'Pulse Lab',desc:'Exploração • foco • causa e efeito',badge:'PULSE LAB',art:'<img src="assets/pulse-lab.svg" alt="Pulse Lab" decoding="async">'},
 {sel:'[data-youth-breathe]',cls:'recomeco-j4',title:'Recomeço',desc:'Pausa • foco • respiração guiada',badge:'PAUSA NEON',art:'<img src="assets/relax.webp" alt="Recomeço" decoding="async">'},
 {sel:'[data-youth-physical]',cls:'movequest-j4',title:'Move Quest',desc:'Movimento real • sequência • checkpoints',badge:'MOVE QUEST',art:'<span class="youth-v5-quest"><span>MOVE QUEST</span><div class="track"></div><i></i><i></i><i></i><b>🏁</b></span>'}
];

function polishCard(cfg){
 const card=q(cfg.sel,q('.youth-challenges')||document);if(!card)return;
 card.classList.add('youth-v5-card',cfg.cls);
 if(card.dataset.v5Polished==='1')return;
 /* O botão externo não é substituído: preserva handlers do motor já validado. */
 card.innerHTML=`<span class="youth-card-art">${cfg.art}<em>${cfg.badge}</em></span><span class="youth-card-copy"><strong>${cfg.title}</strong><small>${cfg.desc}</small></span><span class="youth-card-go">Abrir</span>`;
 card.dataset.v5Polished='1';
 card.setAttribute('aria-label','Abrir '+cfg.title);
}

function polish(){
 const home=q('#screen-home');if(!home)return;
 const hero=q('.jovem-home-hero',home);if(hero)hero.classList.add('jovem-home-v5');
 const grid=q('.youth-card-grid',home);if(grid)grid.classList.add('youth-grid-v5');
 cards.forEach(polishCard);
 const section=q('.youth-challenges',home);if(section)section.classList.add('youth-challenges-v5');
}

function start(){
 polish();
 [80,220,520,950,1600,2600].forEach(t=>setTimeout(polish,t));
 window.addEventListener('tia:jovem-modules-ready',polish);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
