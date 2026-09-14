(()=>{
 if(window.__raiPPWelcomeV2?.mounted)return;
 const VERSION='15.10.6',SEEN='raiPPWelcomeSeen_'+VERSION,CORE='raiProvaParana2026V2';
 let overlay=null;
 function completedCount(){try{const v=JSON.parse(localStorage.getItem(CORE)||'{}');return Math.min(4,new Set(Array.isArray(v.done)?v.done:[]).size)}catch(e){return 0}}
 function openSpecial(){try{if(window.__raiProvaParanaV1?.open){window.__raiProvaParanaV1.open();return}document.querySelector('.rai-pp-hero')?.click()}catch(e){}}
 function ensure(){
  if(overlay?.isConnected)return overlay;overlay=document.createElement('div');overlay.id='raiPPWelcomeOverlay';overlay.className='rai-pp-welcome-overlay';
  overlay.innerHTML=`<div class="rai-pp-welcome-stamp" role="dialog" aria-modal="true" aria-labelledby="raiPPWelcomeTitle"><button type="button" class="rai-pp-welcome-close" aria-label="Fechar">×</button><div class="rai-pp-welcome-seal">🎯</div><div class="rai-pp-welcome-badge">ESPECIAL PROVA PARANÁ</div><h3 class="rai-pp-welcome-title" id="raiPPWelcomeTitle"></h3><p class="rai-pp-welcome-text"></p><div class="rai-pp-welcome-progress"></div><div class="rai-pp-welcome-slogan">Conclua. Avance. Desbloqueie.</div><div class="rai-pp-welcome-actions"><button type="button" class="primary" data-go>Ir para o Especial</button><button type="button" data-close>Agora não</button></div><div class="rai-pp-welcome-note">Cada aula concluída libera progresso para uma nova Missão Bônus.</div></div>`;
  document.body.appendChild(overlay);const close=()=>hide();overlay.querySelector('.rai-pp-welcome-close').onclick=close;overlay.querySelector('[data-close]').onclick=close;overlay.querySelector('[data-go]').onclick=()=>{hide();setTimeout(openSpecial,40)};overlay.addEventListener('click',e=>{if(e.target===overlay)close()});return overlay;
 }
 function hide(){if(!overlay)return;overlay.classList.remove('show');setTimeout(()=>{if(overlay&&!overlay.classList.contains('show'))overlay.remove()},220)}
 function fill(){const o=ensure(),n=completedCount(),title=o.querySelector('.rai-pp-welcome-title'),text=o.querySelector('.rai-pp-welcome-text'),progress=o.querySelector('.rai-pp-welcome-progress'),go=o.querySelector('[data-go]');if(n===0){title.textContent='Novas aulas + novas missões';text.textContent='Conclua aulas do Especial Prova Paraná e desbloqueie Missões Bônus no Tangram.';go.textContent='Ir para o Especial'}else if(n<4){title.textContent='Continue desbloqueando';text.textContent='Seu avanço nas aulas já liberou missões. Conclua novas aulas para abrir os próximos desafios.';go.textContent='Continuar estudando'}else{title.textContent='Todas as missões liberadas';text.textContent='Você concluiu aulas suficientes para liberar as quatro Missões Bônus.';go.textContent='Revisar o Especial'}progress.textContent=`🎁 ${n}/4 Missões Bônus liberadas`}
 function show(force=false){if(!force&&sessionStorage.getItem(SEEN)==='1')return;fill();const o=ensure();requestAnimationFrame(()=>o.classList.add('show'));sessionStorage.setItem(SEEN,'1')}
 function start(){let tries=0;const t=setInterval(()=>{if(document.getElementById('tangram-levels')||tries++>40){clearInterval(t);show(false)}},180)}
 if(!window.__joaoAuthorshipUILoader){window.__joaoAuthorshipUILoader=1;const s=document.createElement('script');s.src='../authorship-ui.js?v=1';document.head.appendChild(s);}
 window.__raiPPWelcomeV2={mounted:true,show,hide,completedCount};start();
})();
