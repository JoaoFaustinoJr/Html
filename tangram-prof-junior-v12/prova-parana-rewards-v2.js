(()=>{
 if(window.__raiProvaRewardsV2?.mounted)return;
 const STORE='raiProvaParana2026V2',BONUS_START=5;
 const BONUS=[
  {title:'Gato Espelhado',need:1,icon:'🐈'},
  {title:'Corredor Invertido',need:2,icon:'🏃'},
  {title:'Cisne Reflexo',need:3,icon:'🦢'},
  {title:'Foguete Reverso',need:4,icon:'🚀'}
 ];
 let root=null,levelsHost=null,observer=null,overlay=null,lastCount=-1;
 function state(){try{const v=JSON.parse(localStorage.getItem(STORE)||'{}');return{done:Array.isArray(v.done)?v.done:[]}}catch(e){return{done:[]}}}
 function count(){return Math.min(4,new Set(state().done).size)}
 function openProva(){try{if(window.__raiProvaParanaV1?.open){window.__raiProvaParanaV1.open();return}document.querySelector('.rai-pp-hero')?.click()}catch(e){}}
 function ensureOverlay(){
  if(overlay?.isConnected)return overlay;
  overlay=document.createElement('div');overlay.className='rai-bonus-overlay';
  overlay.innerHTML=`<div class="rai-bonus-card" role="dialog" aria-modal="true"><button type="button" class="rai-bonus-close" aria-label="Fechar">×</button><div class="rai-bonus-trophy">🎁</div><small>MISSÃO DA RAÍ</small><h3></h3><p></p><div class="rai-bonus-actions"><button type="button" data-study>🎯 Ir para Prova Paraná</button><button type="button" data-close>Fechar</button></div></div>`;
  document.body.appendChild(overlay);const close=()=>overlay.classList.remove('show');
  overlay.querySelector('.rai-bonus-close').onclick=close;overlay.querySelector('[data-close]').onclick=close;overlay.querySelector('[data-study]').onclick=()=>{close();openProva()};overlay.addEventListener('click',e=>{if(e.target===overlay)close()});return overlay;
 }
 function showLocked(i){const meta=BONUS[i],n=count(),missing=Math.max(1,meta.need-n),o=ensureOverlay();o.querySelector('.rai-bonus-trophy').textContent='🔒';o.querySelector('h3').textContent=meta.icon+' '+meta.title;o.querySelector('p').innerHTML=missing===1?'Conclua mais <b>1 aula</b> do Especial Prova Paraná para liberar esta missão.':`Conclua mais <b>${missing} aulas</b> do Especial Prova Paraná para liberar esta missão.`;o.classList.add('show')}
 function bonusButton(i){if(!levelsHost)return null;return [...levelsHost.querySelectorAll('button.tl-level')][BONUS_START+i]||null}
 function ensureSection(){const first=bonusButton(0);if(!first)return;let s=levelsHost.querySelector('.rai-bonus-section');if(!s){s=document.createElement('div');s.className='rai-bonus-section';first.parentNode.insertBefore(s,first)}s.innerHTML=`<span>🎯</span><div><b>Desafios Bônus</b><small>Prova Paraná • ${count()}/4 liberados</small></div>`}
 function curriculumDone(){try{return new Set(JSON.parse(localStorage.getItem('raiAulaT3DoneV18')||'[]'))}catch(e){return new Set()}}
 function decorateCurriculum(buttons){
  const done=curriculumDone(),ids=['rob6t3-1','rob6t3-2','rob6t3-3','rob6t3-4'];
  ids.forEach((id,i)=>{const b=buttons[14+i];if(!b)return;const unlocked=done.has(id);b.dataset.raiCurriculum=String(i);delete b.dataset.raiBonus;b.disabled=!unlocked;b.setAttribute('aria-disabled',unlocked?'false':'true');b.classList.toggle('rai-bonus-unlocked',unlocked);b.classList.toggle('rai-bonus-locked',!unlocked);let badge=b.querySelector('.rai-curriculum-badge');if(!badge){badge=document.createElement('span');badge.className='rai-bonus-badge rai-curriculum-badge';b.appendChild(badge)}badge.textContent=unlocked?'🔓 ABRIR':'🔒 Aula '+(i+1);b.title=unlocked?'Abrir novo desafio curricular':'Conclua a aula '+(i+1)+' de Programação & Robótica do 6º ano'});
 }
 function decorate(){
  if(!root)return;levelsHost=root.querySelector('#levels');if(!levelsHost)return;
  const buttons=[...levelsHost.querySelectorAll('button.tl-level')];
  // Legado Prova Paraná (11–14): coleção histórica, agora aberta para todos.
  [5,6,7,8].forEach((idx,j)=>{const b=buttons[idx];if(!b)return;delete b.dataset.raiBonus;delete b.dataset.raiCurriculum;b.disabled=false;b.removeAttribute('disabled');b.setAttribute('aria-disabled','false');b.classList.remove('locked','rai-bonus-locked');b.classList.add('rai-bonus-unlocked','rai-parana-legacy');let badge=b.querySelector('.rai-bonus-badge');if(!badge){badge=document.createElement('span');badge.className='rai-bonus-badge';b.appendChild(badge)}badge.textContent='🎯 PROVA PARANÁ • ABERTO';b.title='Desafio especial da coleção Prova Paraná — acesso livre'});
  decorateCurriculum(buttons);
  let old=levelsHost.querySelector('.rai-bonus-section');if(old)old.remove();
  let head=levelsHost.querySelector('.rai-curriculum-section');if(!head){head=document.createElement('div');head.className='rai-bonus-section rai-curriculum-section';const anchor=buttons[9];anchor?levelsHost.insertBefore(head,anchor):levelsHost.appendChild(head)}
  const done=curriculumDone(),n=['rob6t3-1','rob6t3-2','rob6t3-3','rob6t3-4'].filter(id=>done.has(id)).length;
  head.innerHTML='<div class="rai-bonus-icon">🆕</div><div><b>Novos desafios • Programação & Robótica</b><span>3º trimestre • 6º ano • '+n+'/4 desbloqueados pelas aulas</span></div>';
  lastCount=4;
 }

