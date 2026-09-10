(()=>{
'use strict';
if(window.__TIA_TATI_SENSORY_V40__)return;window.__TIA_TATI_SENSORY_V40__=true;
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const prefsKey='tiaTatiSensoryV40';
const cfg={profile:'play',mode:'burst',count:6};
try{Object.assign(cfg,JSON.parse(localStorage.getItem(prefsKey)||'{}'));}catch(_){}
const save=()=>{try{localStorage.setItem(prefsKey,JSON.stringify(cfg));}catch(_){}};

function ensureSetup(){
 if(q('#screen-sensorysetup'))return;
 const section=document.createElement('section');section.className='screen sensory-v40-setup';section.id='screen-sensorysetup';
 section.innerHTML=`
  <div class="sensory-v40-head">
   <button class="back-btn sensory-v40-home" type="button">←</button>
   <div><span class="kicker">EXPLORAÇÃO SENSORIAL + INICIATIVA</span><h2>Descobertas</h2><p>Uma mesma proposta em linguagem lúdica ou jovem.</p></div>
   <div class="sensory-v40-tutor"><img src="assets/guide.webp" alt="Tia Tati"><span>Escolha a experiência que combina com você. 💗</span></div>
  </div>
  <section class="sensory-v40-hero panel">
   <div><span class="mission-badge">🫧 DESCOBERTAS</span><h1>Toque. Conecte.<br><em>Descubra.</em></h1><p>Interações de causa e efeito com estímulos visuais graduais. Para crianças, adolescentes e adultos, sem aparência infantil obrigatória.</p><div class="sensory-v40-pills"><span>👀 Atenção</span><span>☝️ Iniciativa</span><span>↔️ Alcance</span><span>✨ Causa e efeito</span></div></div>
   <div class="sensory-v40-hero-art"><img src="assets/pulse-lab.svg" alt="Pulse Lab"></div>
  </section>
  <section class="sensory-v40-section"><div class="road-v18-section-title"><span>1</span><div><strong>Escolha o visual</strong><small>A mecânica é terapêutica; a linguagem visual pode mudar.</small></div></div>
   <div class="sensory-v40-grid">
    <button class="sensory-v40-card" data-sensory-profile="play" type="button"><span class="sensory-v40-icon">🫧</span><strong>Explorar</strong><small>Cores claras, bolhas e descobertas suaves.</small></button>
    <button class="sensory-v40-card" data-sensory-profile="pulse" type="button"><span class="sensory-v40-icon">⚡</span><strong>Pulse Lab</strong><small>Neon, trilhas e linguagem visual jovem.</small></button>
   </div>
  </section>
  <section class="sensory-v40-section"><div class="road-v18-section-title"><span>2</span><div><strong>Escolha a experiência</strong><small>Uma instrução simples de cada vez.</small></div></div>
   <div class="sensory-v40-grid">
    <button class="sensory-v40-card" data-sensory-mode="burst" type="button"><span class="sensory-v40-icon">✨</span><strong>Impacto</strong><small>Cada toque cria uma resposta visual.</small></button>
    <button class="sensory-v40-card" data-sensory-mode="trail" type="button"><span class="sensory-v40-icon">〰️</span><strong>Traço</strong><small>Os toques formam um caminho na tela.</small></button>
    <button class="sensory-v40-card" data-sensory-mode="constellation" type="button"><span class="sensory-v40-icon">✦</span><strong>Constelação</strong><small>Pontos permanecem e se conectam.</small></button>
   </div>
  </section>
  <section class="sensory-v40-section"><div class="road-v18-section-title"><span>3</span><div><strong>Quantidade de descobertas</strong><small>Ajuste a duração da experiência.</small></div></div>
   <div class="sensory-v40-grid">
    <button class="sensory-v40-card" data-sensory-count="6" type="button"><strong>6 toques</strong><small>Curto</small></button>
    <button class="sensory-v40-card" data-sensory-count="10" type="button"><strong>10 toques</strong><small>Moderado</small></button>
    <button class="sensory-v40-card" data-sensory-count="14" type="button"><strong>14 toques</strong><small>Mais exploração</small></button>
   </div>
  </section>
  <div class="sensory-v40-learn panel"><span>💗</span><p><strong>Sem resposta “errada”.</strong><br>Cada toque produz uma consequência visual. O foco é iniciativa, exploração, alcance e atenção.</p></div>
  <div class="sensory-v40-dock"><div><small>Pronto para começar</small><strong id="sensoryV40Summary"></strong></div><button class="primary" id="sensoryV40Start" type="button">✨ Iniciar experiência</button></div>`;
 const game=q('#screen-game');game?.parentNode?.insertBefore(section,game);
 section.addEventListener('click',e=>{
  const p=e.target.closest('[data-sensory-profile]');if(p){cfg.profile=p.dataset.sensoryProfile;save();syncSetup();return;}
  const m=e.target.closest('[data-sensory-mode]');if(m){cfg.mode=m.dataset.sensoryMode;save();syncSetup();return;}
  const c=e.target.closest('[data-sensory-count]');if(c){cfg.count=Number(c.dataset.sensoryCount)||6;save();syncSetup();return;}
 });
 q('.sensory-v40-home',section).onclick=()=>showHome();q('#sensoryV40Start',section).onclick=()=>startGame();
 syncSetup();
}
function syncSetup(){
 const s=q('#screen-sensorysetup');if(!s)return;
 qa('[data-sensory-profile]',s).forEach(x=>x.classList.toggle('active',x.dataset.sensoryProfile===cfg.profile));
 qa('[data-sensory-mode]',s).forEach(x=>x.classList.toggle('active',x.dataset.sensoryMode===cfg.mode));
 qa('[data-sensory-count]',s).forEach(x=>x.classList.toggle('active',Number(x.dataset.sensoryCount)===Number(cfg.count)));
 const profile=cfg.profile==='pulse'?'Pulse Lab':'Explorar';const mode={burst:'Impacto',trail:'Traço',constellation:'Constelação'}[cfg.mode]||'Impacto';
 const t=q('#sensoryV40Summary',s);if(t)t.textContent=`${profile} • ${mode} • ${cfg.count} toques`;
}
function hideScreens(){qa('.screen').forEach(x=>x.classList.remove('active'));}
function showHome(){q('#sensoryV40Overlay')?.remove();hideScreens();q('#screen-home')?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
function showSetup(profile){ensureSetup();if(profile)cfg.profile=profile;save();syncSetup();hideScreens();q('#screen-sensorysetup')?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}

function addYouthCard(){
 const grid=q('.youth-card-grid');if(!grid||q('[data-youth-sensory]'))return;
 const b=document.createElement('button');b.className='youth-card pulse-lab';b.type='button';b.dataset.youthSensory='pulse';b.innerHTML=`<span class="youth-card-art"><img src="assets/pulse-lab.svg" alt="Pulse Lab"><em>PULSE LAB</em></span><span class="youth-card-copy"><strong>Pulse Lab</strong><small>Exploração • alcance • causa e efeito</small></span><span class="youth-card-go">Abrir →</span>`;grid.appendChild(b);
}

function startGame(){
 q('#sensoryV40Overlay')?.remove();
 const wrap=document.createElement('div');wrap.id='sensoryV40Overlay';wrap.className=cfg.profile==='pulse'?'pulse':'play';
 const modeName={burst:'IMPACTO',trail:'TRAÇO',constellation:'CONSTELAÇÃO'}[cfg.mode]||'IMPACTO';
 wrap.innerHTML=`<div class="sv40-top"><div class="sv40-tati"><img src="assets/guide.webp" alt="Tia Tati"><div><small>TIA TATI</small><strong>${cfg.profile==='pulse'?'Explore o espaço e crie seu padrão.':'Toque na tela e descubra.'}</strong><em>${cfg.profile==='pulse'?'Seu movimento vira luz ⚡':'Cada toque é uma descoberta 💗'}</em></div></div><div class="sv40-count"><b id="sv40Now">0</b> / ${cfg.count}</div><div class="sv40-actions"><button id="sv40Back" type="button">←</button><button id="sv40Pause" type="button">⏸️</button></div></div><div class="sv40-stage"><div class="sv40-titlechip">${cfg.profile==='pulse'?'⚡ PULSE LAB':'🫧 EXPLORAR'} • ${modeName}</div><div class="sv40-hint">${cfg.mode==='constellation'?'Toque em pontos diferentes e forme sua constelação.':cfg.mode==='trail'?'Crie um caminho com seus toques.':'Toque onde quiser e veja o que acontece.'}</div><div class="sv40-praise"></div><div class="sv40-finish"><div class="sv40-finish-card"><b>${cfg.profile==='pulse'?'⚡':'✨'}</b><h3>Experiência concluída</h3><p>${cfg.profile==='pulse'?'Padrão criado. Ótimo controle!':'Muito bem! Você completou as descobertas.'}</p><button class="primary" id="sv40Done" type="button">Voltar</button></div></div></div><div class="sv40-footer"><div class="sv40-progress"><span></span></div></div>`;
 document.body.appendChild(wrap);document.body.style.overflow='hidden';
 const stage=q('.sv40-stage',wrap),hint=q('.sv40-hint',wrap),praise=q('.sv40-praise',wrap),progress=q('.sv40-progress span',wrap),now=q('#sv40Now',wrap),finish=q('.sv40-finish',wrap);
 let n=0,paused=false,last=null,ended=false;
 const colorsPlay=['#4cccf3','#ff76b0','#85d88e','#ffd95f','#9d84f3'];
 const showPraise=t=>{praise.textContent=t;praise.classList.add('show');clearTimeout(praise._t);praise._t=setTimeout(()=>praise.classList.remove('show'),700);};
 const line=(a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;const el=document.createElement('span');el.className='sv40-line';el.style.left=a.x+'px';el.style.top=a.y+'px';el.style.width=len+'px';el.style.transform=`rotate(${ang}deg)`;stage.appendChild(el);if(cfg.mode==='trail')setTimeout(()=>el.remove(),1500);};
 const touch=(x,y)=>{
  if(paused||ended)return;const r=stage.getBoundingClientRect();x=Math.max(15,Math.min(r.width-15,x-r.left));y=Math.max(55,Math.min(r.height-55,y-r.top));
  n++;now.textContent=n;progress.style.width=(n/cfg.count*100)+'%';
  const ring=document.createElement('span');ring.className='sv40-ring';ring.style.left=x+'px';ring.style.top=y+'px';stage.appendChild(ring);setTimeout(()=>ring.remove(),760);
  const p=document.createElement('span');p.className='sv40-point';const size=cfg.profile==='pulse'?54:60;p.style.width=p.style.height=size+'px';p.style.left=x+'px';p.style.top=y+'px';if(cfg.profile!=='pulse')p.style.background=colorsPlay[n%colorsPlay.length];stage.appendChild(p);
  if(last&&(cfg.mode==='trail'||cfg.mode==='constellation'))line(last,{x,y});last={x,y};
  if(cfg.mode==='burst')setTimeout(()=>p.remove(),1200);else if(cfg.mode==='trail')setTimeout(()=>p.remove(),1800);
  if(n===1)showPraise(cfg.profile==='pulse'?'NICE ⚡':'Descoberta 1 ✨');else if(n===Math.ceil(cfg.count/2))showPraise('Muito bem!');
  if(n>=cfg.count){ended=true;hint.textContent='Experiência concluída.';setTimeout(()=>finish.classList.add('show'),450);}
 };
 stage.addEventListener('pointerdown',e=>{e.preventDefault();touch(e.clientX,e.clientY);},{passive:false});
 q('#sv40Pause',wrap).onclick=e=>{paused=!paused;e.currentTarget.textContent=paused?'▶️':'⏸️';hint.textContent=paused?'Pausado. Continue quando quiser.':(cfg.mode==='trail'?'Continue seu caminho.':cfg.mode==='constellation'?'Continue sua constelação.':'Continue explorando.');};
 q('#sv40Back',wrap).onclick=()=>{document.body.style.overflow='';wrap.remove();showSetup();};
 q('#sv40Done',wrap).onclick=()=>{document.body.style.overflow='';wrap.remove();showSetup();};
}

function boot(){
 ensureSetup();addYouthCard();
 document.addEventListener('click',e=>{
  const mission=e.target.closest('[data-mission="sensory"]');if(mission){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();showSetup();return;}
  const youth=e.target.closest('[data-youth-sensory]');if(youth){e.preventDefault();e.stopPropagation();showSetup('pulse');}
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();