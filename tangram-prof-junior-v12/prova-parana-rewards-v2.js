(()=>{
 if(window.__raiProvaRewardsV2?.mounted)return;
 const STORE='raiProvaParana2026V2',BONUS_START=10;
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
 function decorate(){
  if(!root)return;levelsHost=root.querySelector('#levels');if(!levelsHost)return;const buttons=[...levelsHost.querySelectorAll('button.tl-level')],n=count();
  BONUS.forEach((meta,i)=>{const b=buttons[BONUS_START+i];if(!b)return;const unlocked=n>=meta.need;b.dataset.raiBonus=String(i);b.dataset.raiBonusNeed=String(meta.need);b.setAttribute('aria-disabled',unlocked?'false':'true');b.classList.add('rai-bonus-level');b.classList.toggle('rai-bonus-locked',!unlocked);b.classList.toggle('rai-bonus-unlocked',unlocked);let badge=b.querySelector('.rai-bonus-badge');if(!badge){badge=document.createElement('span');badge.className='rai-bonus-badge';b.appendChild(badge)}badge.textContent=unlocked?'🔓 ABRIR':`🔒 ${meta.need} aula${meta.need>1?'s':''}`;b.title=unlocked?'Abrir Desafio Bônus liberado pela conclusão das aulas do Especial Prova Paraná':`Conclua ${meta.need} aula${meta.need>1?'s':''} do Especial Prova Paraná`});ensureSection();lastCount=n;
 }
 function wire(){
  root=document.getElementById('tangram-levels');if(!root){setTimeout(wire,120);return}levelsHost=root.querySelector('#levels');if(!levelsHost){setTimeout(wire,120);return}
  root.addEventListener('click',e=>{const b=e.target?.closest?.('#levels button.tl-level[data-rai-bonus]');if(!b)return;const i=Number(b.dataset.raiBonus),meta=BONUS[i];if(!meta)return;if(count()<meta.need){e.preventDefault();e.stopImmediatePropagation();showLocked(i)}},true);
  let queued=false;observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorate()})});observer.observe(levelsHost,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','class']});decorate();
  setInterval(()=>{const n=count();if(n!==lastCount){try{window.__raiTangramBonusBridge?.refresh?.()}catch(e){}decorate()}},400);
 }
 window.__raiProvaRewardsV2={mounted:true,count,refresh:decorate,showLocked};wire();
})();
