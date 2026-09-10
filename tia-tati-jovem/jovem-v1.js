(()=>{
'use strict';
if(window.__TIA_TATI_JOVEM_V2__)return;window.__TIA_TATI_JOVEM_V2__=true;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];

function buildHero(){
 const home=q('#screen-home');if(!home||q('.jovem-home-hero',home))return;
 const section=q('.youth-challenges',home);if(!section)return;
 const hero=document.createElement('section');hero.className='jovem-home-hero';
 hero.innerHTML=`<div class="jovem-home-copy"><a class="jovem-home-back" href="../tia-tati/">← Portal Tia Tati</a><span class="jovem-home-kicker">TIA TATI • FISIO SENSORIAL</span><h1>Modo <em>Jovem</em></h1><p>No seu ritmo, você evolui. Desafios terapêuticos com uma linguagem visual mais madura, vibrante e direta.</p><div class="jovem-home-pills"><span>⚡ Resposta</span><span>🧠 Foco</span><span>🎵 Ritmo</span><span>🏁 Autonomia</span></div></div><div class="jovem-home-art" aria-hidden="true"><img src="assets/cards/reflexo-neon.webp" alt=""><img src="assets/cards/beat-move.webp" alt=""></div>`;
 home.insertBefore(hero,section);
}

function tuneCards(){
 const s=q('.youth-challenges');if(!s)return;
 const title=q('.youth-challenges-head h2',s);if(title)title.innerHTML='Escolha seu <span style="color:#ff55da">desafio</span>';
 const p=q('.youth-challenges-head p',s);if(p)p.textContent='Seis experiências para atenção, ritmo, memória, regulação e movimento.';
 const tag=q('.youth-challenges-tag',s);if(tag)tag.textContent='Jovens • adultos';
 const map=[
  ['[data-youth-light="react"]','Reflexo Neon','Resposta rápida • atenção • alcance'],
  ['[data-youth-light="memory"]','Memorize','Sequência visual • memória de trabalho'],
  ['[data-youth-light="beat"]','Beat & Move','Ritmo • coordenação • tempo de resposta'],
  ['[data-youth-sensory]','Pulse Lab','Exploração • foco • causa e efeito'],
  ['[data-youth-breathe]','Recomeço','Pausa • foco • respiração guiada'],
  ['[data-youth-physical]','Move Quest','Movimento real • sequência • checkpoints']
 ];
 map.forEach(([sel,name,desc])=>{const c=q(sel,s);if(!c)return;const st=q('.youth-card-copy strong',c);if(st)st.textContent=name;const sm=q('.youth-card-copy small',c);if(sm)sm.textContent=desc;const go=q('.youth-card-go',c);if(go)go.textContent='Abrir';});
}

function hideSectionContaining(el){
 const sec=el?.closest('section');
 if(sec)sec.classList.add('jovem-hide-shared-choice');
}

function isolateSensory(){
 const s=q('#screen-sensorysetup');if(!s)return;
 s.classList.add('jovem-shared-screen','jovem-pulse-screen');
 const h=q('.sensory-v40-head h2',s);if(h)h.textContent='Pulse Lab';
 const p=q('.sensory-v40-head p',s);if(p)p.textContent='Exploração visual, alcance e causa e efeito em linguagem neon.';
 const heroBadge=q('.mission-badge',s);if(heroBadge)heroBadge.textContent='⚡ PULSE LAB';
 const heroTitle=q('.sensory-v40-hero h1',s);if(heroTitle)heroTitle.innerHTML='Toque. Conecte.<br><em>Crie seu padrão.</em>';
 const profile=q('[data-sensory-profile="pulse"]',s);if(profile){profile.classList.add('active');hideSectionContaining(profile);}
}

function isolateBreathe(){
 const s=q('#screen-breathesetup');if(!s)return;
 s.classList.add('jovem-shared-screen','jovem-recomeco-screen');
 const h=q('.v41-head h2',s);if(h)h.textContent='Recomeço';
 const p=q('.v41-head p',s);if(p)p.textContent='Pausa guiada, foco e respiração em uma experiência visual jovem.';
 const badge=q('.mission-badge',s);if(badge)badge.textContent='⚡ RECOMEÇO';
 const title=q('.breathe-v41-hero h1',s);if(title)title.innerHTML='Pausa. Foco.<br><em>Recomeço.</em>';
 const mode=q('[data-breathe-mode="reset"]',s);if(mode){mode.classList.add('active');hideSectionContaining(mode);}
}

function isolatePhysical(){
 const s=q('#screen-physicalsetup');if(!s)return;
 s.classList.add('jovem-shared-screen','jovem-movequest-screen');
 const h=q('.v41-head h2',s);if(h)h.textContent='Move Quest';
 const p=q('.v41-head p',s);if(p)p.textContent='Checkpoints, sequência e movimento real em uma linguagem de desafio.';
 const badge=q('.mission-badge',s);if(badge)badge.textContent='🏁 MOVE QUEST';
 const title=q('.physical-v41-hero h1',s);if(title)title.innerHTML='Movimento.<br><em>Missão. Conquista.</em>';
 const profile=q('[data-physical-profile="quest"]',s);if(profile){profile.classList.add('active');hideSectionContaining(profile);}
}

function isolateLight(){
 const s=q('#screen-lightsetup');if(!s)return;
 s.classList.add('jovem-shared-screen','jovem-light-screen');
 const p=q('.light-v18-head p, .light-head p',s);if(p)p.textContent='Escolha a experiência jovem e avance no seu ritmo.';
}

function isolateHome(){
 const home=q('#screen-home');if(!home)return;
 home.classList.add('jovem-home-only');
 qa('.home-v22-missions,.kids-v44,.audience-v44,.home-v22-autonomy,.support-v44,.home-v22-cards,.home-v22-tools,.finish-v44,.home-v22-footer-phrase',home).forEach(el=>el.classList.add('jovem-kids-hidden'));
}

function apply(){
 document.documentElement.classList.add('tia-jovem-v2');
 buildHero();tuneCards();isolateHome();isolateSensory();isolateBreathe();isolatePhysical();isolateLight();
 const nav=q('#bottomNav');if(nav)nav.classList.add('jovem-nav-hidden');
}

[0,60,180,450,900,1600].forEach(t=>setTimeout(apply,t));
const obs=new MutationObserver(()=>apply());
if(document.body)obs.observe(document.body,{childList:true,subtree:true});
})();