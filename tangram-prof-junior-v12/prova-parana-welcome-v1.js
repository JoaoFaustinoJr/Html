(()=>{
 if(window.__raiPPWelcomeV1?.mounted)return;
 const VERSION='15.10.3';
 const SEEN='raiPPWelcomeSeen_'+VERSION;
 const MASTER='raiProvaParanaMasteryV1',CORE='raiProvaParana2026V2';
 let overlay=null;
 function masteredCount(){
  try{
   const a=JSON.parse(localStorage.getItem(MASTER)||'{}'),b=JSON.parse(localStorage.getItem(CORE)||'{}');
   const aa=Array.isArray(a.mastered)?a.mastered:[],bb=Array.isArray(b.mastered)?b.mastered:[];
   return Math.min(4,new Set([...aa,...bb]).size);
  }catch(e){return 0}
 }
 function openSpecial(){
  try{
   if(window.__raiProvaParanaV1?.open){window.__raiProvaParanaV1.open();return}
   document.querySelector('.rai-pp-hero')?.click();
  }catch(e){}
 }
 function ensure(){
  if(overlay?.isConnected)return overlay;
  overlay=document.createElement('div');overlay.id='raiPPWelcomeOverlay';overlay.className='rai-pp-welcome-overlay';
  overlay.innerHTML=`<div class="rai-pp-welcome-stamp" role="dialog" aria-modal="true" aria-labelledby="raiPPWelcomeTitle">
   <button type="button" class="rai-pp-welcome-close" aria-label="Fechar">×</button>
   <div class="rai-pp-welcome-seal" aria-hidden="true">🎯</div>
   <div class="rai-pp-welcome-badge">ESPECIAL PROVA PARANÁ</div>
   <h3 class="rai-pp-welcome-title" id="raiPPWelcomeTitle"></h3>
   <p class="rai-pp-welcome-text"></p>
   <div class="rai-pp-welcome-progress"></div>
   <div class="rai-pp-welcome-slogan">Aprenda. Acerte. Desbloqueie.</div>
   <div class="rai-pp-welcome-actions"><button type="button" class="primary" data-go>Ir para o Especial</button><button type="button" data-close>Agora não</button></div>
   <div class="rai-pp-welcome-note">Conclua as aulas com bom aproveitamento para liberar novas Missões Bônus no Tangram.</div>
  </div>`;
  document.body.appendChild(overlay);
  const close=()=>hide();
  overlay.querySelector('.rai-pp-welcome-close').addEventListener('click',close);
  overlay.querySelector('[data-close]').addEventListener('click',close);
  overlay.querySelector('[data-go]').addEventListener('click',()=>{hide();setTimeout(openSpecial,40)});
  overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
  return overlay;
 }
 function hide(){if(!overlay)return;overlay.classList.remove('show');setTimeout(()=>{if(overlay&&!overlay.classList.contains('show'))overlay.remove()},220)}
 function fill(kind='welcome',detail={}){
  const o=ensure(),n=kind==='unlock'?Math.min(4,Number(detail.mastered||masteredCount())):masteredCount();
  const title=o.querySelector('.rai-pp-welcome-title'),text=o.querySelector('.rai-pp-welcome-text'),progress=o.querySelector('.rai-pp-welcome-progress'),go=o.querySelector('[data-go]'),seal=o.querySelector('.rai-pp-welcome-seal');
  if(kind==='unlock'){
   seal.textContent='🔓';title.textContent='Nova Missão Bônus!';
   text.textContent='Seu estudo no Especial Prova Paraná liberou uma nova missão no Tangram. Continue com a Raí para desbloquear ainda mais.';
   go.textContent='Ver o Especial';
  }else if(n===0){
   seal.textContent='🎯';title.textContent='Novas aulas + novas missões';
   text.textContent='Estude com a Raí, conclua os testes do Especial Prova Paraná e desbloqueie Missões Bônus no Tangram.';
   go.textContent='Ir para o Especial';
  }else if(n<4){
   seal.textContent='🎯';title.textContent='Continue desbloqueando';
   text.textContent='Você já avançou no Especial Prova Paraná. Continue estudando com a Raí para liberar novas Missões Bônus.';
   go.textContent='Continuar estudando';
  }else{
   seal.textContent='🏆';title.textContent='Todas as missões liberadas';
   text.textContent='Você já liberou as quatro Missões Bônus do Especial Prova Paraná. Continue revisando para consolidar suas habilidades.';
   go.textContent='Revisar o Especial';
  }
  progress.textContent=`🎁 ${n}/4 Missões Bônus liberadas`;
 }
 function show(force=false){
  if(!force&&sessionStorage.getItem(SEEN)==='1')return;
  fill();const o=ensure();requestAnimationFrame(()=>o.classList.add('show'));sessionStorage.setItem(SEEN,'1');
 }
 function showUnlocked(detail){fill('unlock',detail||{});const o=ensure();requestAnimationFrame(()=>o.classList.add('show'))}
 function start(){let tries=0;const t=setInterval(()=>{if(document.getElementById('tangram-levels')||tries++>40){clearInterval(t);show(false)}},180)}
 window.addEventListener('rai-prova-mastered',e=>showUnlocked(e.detail));
 window.__raiPPWelcomeV1={mounted:true,show,showUnlocked,hide};
 start();
})();
