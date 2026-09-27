(()=>{
 if(window.__raiCurriculumRewards?.mounted)return;
 const KEY='raiAulaT3DoneV18', ids=['rob6t3-1','rob6t3-2','rob6t3-3','rob6t3-4'];
 let root=null,host=null,obs=null,timer=null;
 const done=()=>{try{return new Set(JSON.parse(localStorage.getItem(KEY)||'[]'))}catch(e){return new Set()}};
 const buttons=()=>[...(host?.querySelectorAll('button.tl-level,#levels .tl-level')||[])];
 const numberOf=b=>{const m=(b?.textContent||'').trim().match(/^(?:🔒\s*)?(\d+)\./);return m?Number(m[1]):0};
 const byNumber=n=>buttons().find(b=>numberOf(b)===n)||null;
 function paint(){
  root=document.getElementById('tangram-levels');host=root?.querySelector('#levels');if(!host)return;
  // 11–14: progressão comum; sem regra Prova Paraná.
  for(let n=11;n<=14;n++){const b=byNumber(n);if(!b)continue;delete b.dataset.raiBonus;delete b.dataset.raiCurriculum;b.classList.remove('rai-bonus-unlocked','rai-bonus-locked','rai-parana-legacy');b.querySelectorAll('.rai-bonus-badge,.rai-curriculum-badge').forEach(x=>x.remove())}
  // 15–18: única coleção condicionada às aulas.
  const d=done();
  ids.forEach((id,i)=>{const n=15+i,b=byNumber(n);if(!b)return;const ok=d.has(id);b.dataset.raiCurriculum=String(n);b.disabled=!ok;b.setAttribute('aria-disabled',ok?'false':'true');b.classList.toggle('rai-bonus-unlocked',ok);b.classList.toggle('rai-bonus-locked',!ok);let badge=b.querySelector('.rai-curriculum-badge');if(!badge){badge=document.createElement('span');badge.className='rai-bonus-badge rai-curriculum-badge';b.appendChild(badge)}badge.textContent=ok?'🔓 ABRIR':'🔒 Aula '+(i+1);b.title=ok?'Abrir desafio curricular':'Conclua a aula '+(i+1)+' de Programação & Robótica'});
  host.querySelectorAll('.rai-bonus-section').forEach(x=>x.remove());
  const first=byNumber(15);if(first){const s=document.createElement('div');s.className='rai-bonus-section rai-curriculum-section';const n=ids.filter(id=>d.has(id)).length;s.innerHTML='<div class="rai-bonus-icon">🆕</div><div><b>Novos desafios • Programação & Robótica</b><span>3º trimestre • 6º ano • '+n+'/4 desbloqueados pelas aulas</span></div>';first.parentNode.insertBefore(s,first)}
 }
 function schedule(){clearTimeout(timer);timer=setTimeout(paint,60)}
 function boot(){root=document.getElementById('tangram-levels');host=root?.querySelector('#levels');if(!host){setTimeout(boot,120);return}paint();obs=new MutationObserver(schedule);obs.observe(host,{childList:true,subtree:true});window.addEventListener('storage',e=>{if(e.key===KEY)schedule()});document.addEventListener('rai:lesson-complete',schedule)}
 boot();window.__raiCurriculumRewards={mounted:true,refresh:paint};
})();