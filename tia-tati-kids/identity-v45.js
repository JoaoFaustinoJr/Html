(()=>{
'use strict';
if(window.__TIA_TATI_IDENTITY_V45__)return;window.__TIA_TATI_IDENTITY_V45__=true;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function ensureKidsV3(){
 document.documentElement.classList.add('tia-kids-v3');
 if(!q('link[data-kids-home-v3]')){
  const l=document.createElement('link');
  l.rel='stylesheet';l.href='kids-home-v3.css?v=3';l.dataset.kidsHomeV3='1';
  document.head.appendChild(l);
 }
 document.title='Tia Tati Kids – Fisio Sensorial';
 const brand=q('.brand');
 if(brand){
  const strong=q('strong',brand),small=q('small',brand);
  if(strong)strong.textContent='Tia Tati Kids';
  if(small)small.textContent='Fisio Sensorial';
 }
}

function replaceVisual(card,html){const v=q('.home-v22-visual',card);if(v&&!v.dataset.v45){v.dataset.v45='1';v.innerHTML=html;}}
function hero(){
 const h=q('#screen-home .home-v22-hero');if(!h)return;
 h.classList.add('hero-v45');
 const copy=q('.home-v22-copy',h),tutor=q('.home-v22-tutor',h);if(!copy||!tutor)return;
 if(!q('.hero-v45-note',h)) copy.insertAdjacentHTML('afterbegin','<div class="hero-v45-note">Movimento<br>também é<br>vida! <b>♡</b></div>');
 const p=q('.home-v22-copy>p',h);if(p)p.textContent='Missões terapêuticas com movimento, psicopedagogia, ludicidade e afeto — no tempo de cada criança.';
 const side=q('.home-v22-side-note',h);if(side)side.innerHTML='Mais aprendizado<br>Mais autonomia<br>Mais conquistas! ♡';
 const bubble=q('.home-v22-bubble',h);if(bubble)bubble.innerHTML='<strong>Você consegue!</strong><small>Vamos juntos nessa jornada?</small>';
 const values=q('.home-v22-values',h);if(values){
  values.innerHTML='<span>💗 <b>Atenção</b></span><span>🏃 <b>Movimento</b></span><span>★ <b>Autonomia</b></span><span>🧠 <b>Confiança</b></span>';
 }
}

function kids(){
 const area=q('.kids-v44');if(!area)return;area.classList.add('kids-v45');
 const title=q('.kids-v44-title h2',area);if(title)title.innerHTML='<span>Área</span> Kids';
 const p=q('.kids-v44-title p',area);if(p)p.textContent='Pequenos passos, grandes descobertas!';
 const mission=q('.home-v22-missions',area);if(!mission)return;
 const road=q('[data-mission="road"]',mission);if(road) replaceVisual(road,'<img class="v45-fit" src="assets/road-school.svg" alt="Caminho Seguro"><img class="v45-car" src="assets/argo-hgt-blue.svg" alt="">');
 const bee=q('[data-mission="bee"]',mission);if(bee) replaceVisual(bee,'<img class="v45-fit" src="assets/bee-garden.svg" alt="Abelhinha e a Flor"><img class="v45-bee" src="assets/bee-game.svg" alt="">');
 const target=q('[data-mission="target"]',mission);if(target) replaceVisual(target,'<img class="v45-fit" src="assets/target-board.svg" alt="Alcance ao Alvo"><span class="v45-target">🎯</span>');
 const hands=q('[data-mission="hands"]',mission);if(hands) replaceVisual(hands,'<img class="v45-fit" src="assets/hands-board.svg" alt="Duas Mãos"><span class="v45-hands">🤲</span>');
 const sensory=q('[data-mission="sensory"]',mission);if(sensory) replaceVisual(sensory,'<div class="v45-discovery"><span>🔎</span><b>🦋</b><i>✦</i></div>');
 const breathe=q('[data-mission="breathe"]',mission);if(breathe) replaceVisual(breathe,'<img class="v45-photo" src="assets/relax.webp" alt="Respira Comigo"><span class="v45-breathe-leaf">🌿</span>');
 const subtitles={road:'Planeje, observe e siga o caminho!',bee:'Coordene e alcance seu objetivo!',target:'Força, controle e precisão!',hands:'Movimentos que se encontram!',sensory:'Explorar é aprender!',breathe:'Vamos respirar e ficar bem!'};
 Object.entries(subtitles).forEach(([id,txt])=>{const c=q(`[data-mission="${id}"]`,mission),s=c&&q('.home-v22-mission-copy small',c);if(s)s.textContent=txt;});
 const cheer=q('.kids-v44-cheer',area);if(cheer){const strong=q('strong',cheer);if(strong)strong.innerHTML='Sonhe.<br>Brinque.<br>Conquiste.<br><em>Você consegue!</em>';const sm=q('small',cheer);if(sm)sm.textContent='Pequenas ações, grandes conquistas!';}
}

function hideYouth(){
 qa('#screen-home .youth-challenges,#screen-home [data-mission="light"],#screen-home [data-mission="physical"],#screen-home .audience-v44').forEach(el=>{el.hidden=true;el.setAttribute('aria-hidden','true');});
}

function support(){
 const hub=q('.support-v44');if(!hub)return;hub.classList.add('support-v45');
 const head=q('.support-v44-cards .home-v22-section-head h2',hub);if(head)head.textContent='💗 Cards da Tia Tati';
 const intro=q('.support-v44-cards .home-v22-section-head p',hub);if(intro)intro.textContent='Orientações, incentivos e aprendizados para o dia a dia.';
 const cards=q('.support-v44-cards .home-v22-cards',hub);if(cards){qa('button',cards).forEach((b,i)=>b.classList.toggle('v45-hide-card',i>3));}
 const v=q('.support-v44-voice',hub);if(v){const strong=q('strong',v);if(strong)strong.textContent='Voz da Tia Tati';const small=q('small',v);if(small)small.textContent='Orientações que acolhem e inspiram.';const phrases=q('.support-v44-phrases',v);if(phrases)phrases.innerHTML='<i>▶ Vamos com calma <b>0:28</b></i><i>▶ Atenção ao movimento <b>0:32</b></i><i>▶ Postura também importa <b>0:33</b></i><i>▶ Você consegue! <b>0:24</b></i>';}
}

function nav(){const n=q('#bottomNav');if(n)n.classList.add('nav-v45');}
function apply(){ensureKidsV3();hero();kids();hideYouth();support();nav();document.documentElement.classList.add('identity-v45-ready');}
function start(){[0,120,500,1200].forEach(t=>setTimeout(apply,t));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
