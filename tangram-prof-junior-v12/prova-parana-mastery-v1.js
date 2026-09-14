(()=>{
 if(window.__raiPPMasteryV1?.mounted)return;
 const CORE='raiProvaParana2026V2',STORE='raiProvaParanaMasteryV1';
 let current='',answers={};
 const read=()=>{try{const v=JSON.parse(localStorage.getItem(STORE)||'{}');return{mastered:Array.isArray(v.mastered)?v.mastered:[]}}catch(e){return{mastered:[]}}};
 const save=s=>{try{localStorage.setItem(STORE,JSON.stringify(s))}catch(e){}};
 const count=()=>read().mastered.length;
 const need=n=>n?Math.max(1,Math.ceil(n*2/3)):0;
 function syncCore(){try{const c=JSON.parse(localStorage.getItem(CORE)||'{}'),m=read().mastered;c.mastered=m;localStorage.setItem(CORE,JSON.stringify(c))}catch(e){}}
 function decorate(){
  const o=document.querySelector('.rai-pp-overlay');if(!o)return;
  const home=o.querySelector('#raiPPHome');
  if(home&&!home.hidden){let b=home.querySelector('.rai-pp-unlock-info');if(!b){b=document.createElement('div');b.className='rai-pp-unlock-info';home.querySelector('.rai-pp-intro')?.after(b)}const n=Math.min(4,count());b.innerHTML=`<span class="rai-pp-gift">🎁</span><div><b>Aprenda. Acerte. Desbloqueie.</b><small>Cada aula concluída com aproveitamento mínimo libera progresso para um novo Desafio Bônus.</small></div><em>${n}/4 bônus</em>`;const s=read();home.querySelectorAll('.rai-pp-item[data-id]').forEach(x=>{if(s.mastered.includes(x.dataset.id)){const m=x.querySelector('em');if(m)m.textContent='★'}})}
  const d=o.querySelector('#raiPPDetail');if(!d||d.hidden||!current)return;
  const total=d.querySelectorAll('.rai-pp-q').length;if(!total)return;
  let b=d.querySelector('.rai-pp-reward');if(!b){b=document.createElement('div');b.className='rai-pp-reward';d.querySelector('.rai-pp-summary')?.after(b)}
  const s=read();if(s.mastered.includes(current)){b.className='rai-pp-reward success';b.innerHTML='<span>🏆</span><div><b>Recompensa conquistada</b><p>Esta aula já contou para desbloquear os Desafios Bônus do Tangram.</p><small>⭐ Domínio registrado neste aparelho.</small></div>';return}
  const done=Object.keys(answers).length,score=Object.values(answers).filter(Boolean).length;b.className='rai-pp-reward';b.innerHTML=`<span>🎁</span><div><b>Missão da Raí</b><p>Conclua o teste e acerte pelo menos <strong>${need(total)} de ${total}</strong> questões para avançar no desbloqueio de um novo Desafio Bônus.</p><small>⭐ ${done}/${total} respondidas • ${score} acerto${score===1?'':'s'}</small></div>`;
 }
 function finish(){
  const o=document.querySelector('.rai-pp-overlay'),d=o?.querySelector('#raiPPDetail');if(!d||d.hidden||!current)return;const total=d.querySelectorAll('.rai-pp-q').length;if(!total||Object.keys(answers).length<total)return;
  const score=Object.values(answers).filter(Boolean).length,req=need(total),box=d.querySelector('.rai-pp-reward');if(!box)return;
  if(score>=req){const s=read(),before=s.mastered.length,first=!s.mastered.includes(current);if(first)s.mastered.push(current);save(s);syncCore();box.className='rai-pp-reward success';box.innerHTML=`<span>🔓</span><div><b>Desafio desbloqueado!</b><p>Você acertou ${score} de ${total}. Seu estudo avançou o desbloqueio dos Desafios Bônus.</p><small>🎯 Aprender também faz o jogo avançar.</small></div>`;if(first)window.dispatchEvent(new CustomEvent('rai-prova-mastered',{detail:{lessonId:current,previousMastered:before,mastered:s.mastered.length}}))}
  else{box.className='rai-pp-reward retry';box.innerHTML=`<span>🎯</span><div><b>Quase lá!</b><p>Você acertou ${score} de ${total}. São necessários ${req} acertos para conquistar a recompensa.</p><button type="button" class="rai-pp-retry">↻ Revisar e tentar novamente</button></div>`;box.querySelector('.rai-pp-retry')?.addEventListener('click',()=>{const id=current;answers={};d.querySelector('[data-back]')?.click();setTimeout(()=>o.querySelector(`.rai-pp-item[data-id="${CSS.escape(id)}"]`)?.click(),40)})}
 }
 document.addEventListener('click',e=>{
  const item=e.target?.closest?.('.rai-pp-item[data-id]');if(item){current=item.dataset.id;answers={};setTimeout(decorate,20);return}
  const opt=e.target?.closest?.('.rai-pp-q button[data-opt]');if(!opt||!current)return;const q=opt.closest('.rai-pp-q'),i=Number(q?.dataset.q);setTimeout(()=>{answers[i]=opt.classList.contains('correct')&&!opt.classList.contains('wrong');decorate();finish();syncCore()},0);
 });
 syncCore();setInterval(()=>{syncCore();decorate()},700);
 window.__raiPPMasteryV1={mounted:true,count,refresh:decorate};
})();
