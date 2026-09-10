(()=>{
'use strict';
if(window.__TIA_TATI_FINAL_V44__)return;window.__TIA_TATI_FINAL_V44__=true;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function make(tag,cls,html){const el=document.createElement(tag);if(cls)el.className=cls;if(html!=null)el.innerHTML=html;return el;}

function updateHero(){
 const home=q('#screen-home');if(!home)return;
 home.classList.add('home-final-v44');
 const heroText=q('.home-v22-copy > p',home);
 if(heroText)heroText.textContent='Missões terapêuticas com movimento, psicopedagogia, ludicidade e adaptação individual — em cada fase da vida.';
 const side=q('.home-v22-side-note',home);if(side)side.textContent='Movimento também é vida!';
}

function buildAudienceSwitch(){
 const home=q('#screen-home'),hero=q('.home-v22-hero',home);if(!home||!hero||q('.audience-v44',home))return;
 const nav=make('section','audience-v44',`
  <button class="audience-v44-btn kids active" data-area-jump="kids" type="button"><span>😊</span><div><strong>Área Kids</strong><small>Brincar, aprender e se desenvolver</small></div><b>›</b></button>
  <button class="audience-v44-btn young" data-area-jump="young" type="button"><span>🎮</span><div><strong>Área Jovem</strong><small>Seu ritmo, suas conquistas</small></div><b>›</b></button>`);
 hero.insertAdjacentElement('afterend',nav);
 nav.addEventListener('click',e=>{
  const b=e.target.closest('[data-area-jump]');if(!b)return;
  qa('.audience-v44-btn',nav).forEach(x=>x.classList.toggle('active',x===b));
  const target=q(b.dataset.areaJump==='young'?'.youth-challenges':'.kids-v44');
  target?.scrollIntoView({behavior:'smooth',block:'start'});
 });
}

function buildKidsArea(){
 const home=q('#screen-home'),missions=q('.home-v22-missions',home),head=q('.home-v22-section-head:not(.compact)',home),young=q('.youth-challenges',home);
 if(!home||!missions||!head||!young||q('.kids-v44',home))return;
 const area=make('section','kids-v44');
 area.id='areaKids';
 const banner=make('div','kids-v44-banner',`<div class="kids-v44-title"><span>☀️</span><div><span class="kicker">ÁREA KIDS</span><h2>Pequenos passos, grandes descobertas!</h2><p>Brincar, aprender, movimentar e conquistar.</p></div></div><span class="kids-v44-badge">fofura + propósito 💗</span>`);
 area.appendChild(banner);
 area.appendChild(head);
 area.appendChild(missions);
 young.parentNode.insertBefore(area,young);
 head.classList.add('kids-v44-head');
 const title=q('h2',head);if(title)title.textContent='Escolha uma missão';
 const kicker=q('.kicker',head);if(kicker)kicker.textContent='MISSÕES KIDS';
 const p=q('p',head);if(p)p.textContent='Uma tarefa de cada vez, com pistas visuais e reforço positivo.';
 // Reflexo Neon e Mundo Real têm acessos próprios na Área Jovem; evitamos duplicação visual na Área Kids.
 const neon=q('[data-mission="light"]',missions);if(neon)neon.classList.add('v44-young-only');
 const physical=q('[data-mission="physical"]',missions);if(physical)physical.classList.add('v44-young-only');
 // Destaques terapêuticos sem alterar a mecânica das atividades.
 const tags={road:['Atenção','Planejamento'],bee:['Coordenação','Precisão'],target:['Alcance','Lateralidade'],hands:['Coordenação','Autonomia'],sensory:['Atenção','Curiosidade'],breathe:['Respiração','Bem-estar']};
 Object.entries(tags).forEach(([id,vals])=>{
  const card=q(`[data-mission="${id}"]`,missions);if(!card||q('.kids-v44-tags',card))return;
  const t=make('span','kids-v44-tags',`<i>${vals[0]}</i><i>${vals[1]}</i>`);card.appendChild(t);
 });
 const cheer=make('div','kids-v44-cheer',`<img src="assets/success.webp" alt="Tia Tati"><div><span class="kicker">TIA TATI</span><strong>Sonhe. Brinque. Conquiste.</strong><small>Cada movimento conta! 💗</small></div>`);
 missions.appendChild(cheer);
}

function polishYouth(){
 const section=q('.youth-challenges');if(!section)return;
 section.id='areaJovem';section.classList.add('youth-v44');
 const head=q('.youth-challenges-head',section);if(head&&!q('.youth-v44-icon',head)){
  const div=q('.youth-challenges-head > div',section);if(div){
   const kicker=q('.kicker',div);if(kicker)kicker.textContent='ÁREA JOVEM';
   const title=q('h2',div);if(title)title.innerHTML='<span class="youth-v44-icon">🎮</span> Seu potencial em movimento!';
   const p=q('p',div);if(p)p.textContent='Desafios com identidade neon, foco, ritmo, memória e autonomia.';
  }
 }
 // Corrige qualquer vestígio visual do nome antigo sem alterar a chave interna de compatibilidade.
 qa('[data-youth-breathe]',section).forEach(card=>{
  card.classList.add('recomeco-v44');
  const title=q('.youth-card-copy strong',card);if(title)title.textContent='Recomeço';
  const badge=q('.youth-card-art em',card);if(badge)badge.textContent='RECOMEÇO';
  const img=q('img',card);if(img)img.alt='Recomeço';
 });
 // Microtags jovens: ajudam leitura rápida e aproximam a identidade do mockup aprovado.
 const map=[
  ['[data-youth-light="react"]',['Atenção','Tempo de resposta']],
  ['[data-youth-light="memory"]',['Memória','Concentração']],
  ['[data-youth-light="beat"]',['Ritmo','Coordenação']],
  ['[data-youth-sensory]',['Atenção','Autocontrole']],
  ['[data-youth-breathe]',['Autonomia','Regulação']],
  ['[data-youth-physical]',['Planejamento','Superação']]
 ];
 map.forEach(([sel,tags])=>{
  const card=q(sel,section);if(!card||q('.youth-v44-tags',card))return;
  const copy=q('.youth-card-copy',card);if(copy)copy.insertAdjacentHTML('beforeend',`<span class="youth-v44-tags"><i>${tags[0]}</i><i>${tags[1]}</i></span>`);
 });
}

function buildSupportHub(){
 const home=q('#screen-home'),cards=q('.home-v22-cards',home),compact=q('.home-v22-section-head.compact',home),tools=q('.home-v22-tools',home);
 if(!home||!cards||!compact||!tools||q('.support-v44',home))return;
 const hub=make('section','support-v44');
 const cardsPane=make('div','support-v44-cards');
 const voicePane=make('button','support-v44-voice',`<span class="support-v44-mic">🎙️</span><div><span class="kicker">VOZ DA TIA TATI</span><strong>Orientações que acolhem e inspiram.</strong><small>Grave, ouça e atualize as falas oficiais no Estúdio de Voz.</small><span class="support-v44-phrases"><i>▶ Vamos com calma</i><i>▶ Atenção ao movimento</i><i>▶ Você consegue!</i></span></div><b>Ver estúdio ›</b>`);
 voicePane.type='button';voicePane.onclick=()=>q('#voiceStudioBtn')?.click();
 hub.appendChild(cardsPane);hub.appendChild(voicePane);
 compact.parentNode.insertBefore(hub,compact);
 cardsPane.appendChild(compact);cardsPane.appendChild(cards);
 const title=q('h2',compact);if(title)title.textContent='Cards da Tia Tati';
 const p=q('p',compact);if(p)p.textContent='Orientações, incentivos e aprendizados para o dia a dia.';
 tools.classList.add('tools-v44');
}

function addFinishStamp(){
 const home=q('#screen-home');if(!home||q('.finish-v44',home))return;
 const footer=q('.home-v22-footer-phrase',home);if(!footer)return;
 const stamp=make('div','finish-v44','<span>💗</span><div><strong>Movimento que inclui.</strong><small>Aprender, brincar e conquistar — em cada fase da vida.</small></div>');
 footer.parentNode.insertBefore(stamp,footer);
}

function enhance(){updateHero();buildAudienceSwitch();buildKidsArea();polishYouth();buildSupportHub();addFinishStamp();document.documentElement.classList.add('tia-v44-ready');}
function start(){setTimeout(enhance,0);setTimeout(enhance,220);setTimeout(enhance,700);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
