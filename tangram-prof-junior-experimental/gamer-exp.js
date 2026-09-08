
(()=>{
 const root=document.getElementById('tangram-levels');
 if(!root)return;
 const KEY='raiGamerExpV1';
 let store={records:{}};try{store=Object.assign(store,JSON.parse(localStorage.getItem(KEY)||'{}'));store.records=store.records||{}}catch(e){}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}};
 const missionName=()=>((root.querySelector('#title')?.textContent||'Missão').replace(/\s+/g,' ').trim()||'Missão');
 const keyFor=name=>name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const fmt=ms=>{ms=Math.max(0,Math.round(ms||0));const totalTenths=Math.floor(ms/100),tenths=totalTenths%10,totalSec=Math.floor(totalTenths/10),min=Math.floor(totalSec/60),sec=totalSec%60;return String(min).padStart(2,'0')+':'+String(sec).padStart(2,'0')+'.'+tenths};
 let active=false,running=false,startAt=0,elapsed=0,raf=0,countToken=0,lastVerifyAt=0,currentMission=missionName(),resultTimer=0;

 let button=document.getElementById('raiGamerButton');
 function bindButton(btn){
   if(!btn||btn.dataset.gamerBound==='1')return;
   btn.dataset.gamerBound='1';
   btn.addEventListener('click',()=>active?exit():enter());
 }
 function ensureButton(){
   button=document.getElementById('raiGamerButton');
   if(!button){
     button=document.createElement('button');
     button.type='button';
     button.id='raiGamerButton';
     button.className='rai-gamer-launch';
     button.innerHTML='<span class="rai-gamer-launch-icon">🎮</span><span><b>Modo Gamer</b><small>3 • 2 • 1 • GO!</small></span><em>NOVO</em>';
     const anchor=root.querySelector('.tl-head');
     if(anchor)anchor.insertAdjacentElement('afterend',button);
     else root.prepend(button);
   }
   bindButton(button);
   return true;
 }
 ensureButton();
 setTimeout(ensureButton,250);
 setTimeout(ensureButton,900);

 const hud=document.createElement('div');hud.className='rai-gamer-hud';hud.innerHTML='<div class="rai-gamer-timer-wrap"><div class="rai-gamer-label">Tempo</div><div class="rai-gamer-time" id="raiGamerTime">00:00.0</div></div><div class="rai-gamer-best">Recorde<br><b id="raiGamerBest">—</b></div><div class="rai-gamer-status" id="raiGamerStatus">PRONTO</div><button class="rai-gamer-exit" id="raiGamerExit" aria-label="Sair do modo gamer">×</button>';document.body.appendChild(hud);
 const countdown=document.createElement('div');countdown.className='rai-gamer-countdown';countdown.innerHTML='<div class="rai-gamer-count" id="raiGamerCount">3</div>';document.body.appendChild(countdown);
 const result=document.createElement('div');result.className='rai-gamer-result';result.innerHTML='<div class="trophy">🏆</div><h3 id="raiGamerResultTitle">Missão concluída!</h3><div class="final-time" id="raiGamerFinal">00:00.0</div><p id="raiGamerResultText"></p><button type="button" id="raiGamerResultClose">Continuar</button>';document.body.appendChild(result);
 const timeEl=hud.querySelector('#raiGamerTime'),bestEl=hud.querySelector('#raiGamerBest'),statusEl=hud.querySelector('#raiGamerStatus'),countEl=countdown.querySelector('#raiGamerCount');

 function bestFor(name=currentMission){const arr=store.records[keyFor(name)]||[];return arr.length?Math.min(...arr):null}
 function refreshBest(){const b=bestFor();bestEl.textContent=b==null?'—':fmt(b)}
 function tick(){if(!running)return;elapsed=performance.now()-startAt;timeEl.textContent=fmt(elapsed);raf=requestAnimationFrame(tick)}
 function stopClock(){if(!running)return elapsed;elapsed=performance.now()-startAt;running=false;cancelAnimationFrame(raf);raf=0;timeEl.textContent=fmt(elapsed);statusEl.textContent='PAROU';return elapsed}
 function resetClock(){running=false;cancelAnimationFrame(raf);raf=0;elapsed=0;timeEl.textContent='00:00.0';statusEl.textContent='PRONTO'}
 function startClock(){resetClock();startAt=performance.now();running=true;statusEl.textContent='CORRENDO';raf=requestAnimationFrame(tick)}
 const vibrate=p=>{try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}};
 function closeResult(){clearTimeout(resultTimer);result.classList.remove('show')}
 function showResult(ms,isRecord,prior){result.querySelector('#raiGamerResultTitle').textContent=isRecord?'🏆 NOVO RECORDE!':'✅ Missão concluída!';result.querySelector('#raiGamerFinal').textContent=fmt(ms);result.querySelector('#raiGamerResultText').textContent=isRecord?(prior==null?'Primeira marca registrada nesta missão.':'Você foi '+fmt(prior-ms)+' mais rápido que o recorde anterior.'):(prior!=null?'Recorde atual: '+fmt(prior):'Tempo registrado.');result.classList.add('show');resultTimer=setTimeout(closeResult,5200)}
 async function startCountdown(){
   if(!active)return;countToken++;const token=countToken;closeResult();resetClock();currentMission=missionName();refreshBest();
   countdown.classList.add('show');
   for(const v of ['3','2','1','GO!']){if(token!==countToken||!active)return;countEl.textContent=v;countEl.classList.toggle('go',v==='GO!');countEl.style.animation='none';void countEl.offsetWidth;countEl.style.animation='';vibrate(v==='GO!'?35:12);await new Promise(r=>setTimeout(r,v==='GO!'?520:760))}
   if(token!==countToken||!active)return;countdown.classList.remove('show');startClock();
 }
 function enter(){
   active=true;document.body.classList.add('rai-gamer-running');button?.classList.add('active');if(button)button.innerHTML='<span class="rai-gamer-launch-icon">🎮</span><span><b>Gamer ativo</b><small>cronômetro correndo</small></span><em>ON</em>';hud.classList.add('show');
   document.querySelector('.rai-curr-overlay')?.classList.remove('show');startCountdown();
 }
 function exit(){
   active=false;running=false;countToken++;cancelAnimationFrame(raf);raf=0;countdown.classList.remove('show');hud.classList.remove('show');closeResult();document.body.classList.remove('rai-gamer-running');button?.classList.remove('active');if(button)button.innerHTML='<span class="rai-gamer-launch-icon">🎮</span><span><b>Modo Gamer</b><small>3 • 2 • 1 • GO!</small></span><em>NOVO</em>';
 }
 function completeFromVerify(){
   if(!active||!running||Date.now()-lastVerifyAt>3500)return;
   const ms=stopClock(),k=keyFor(currentMission),prior=bestFor(currentMission),arr=store.records[k]||[];arr.push(Math.round(ms));store.records[k]=arr.slice(-30);save();
   const isRecord=prior==null||ms<prior;refreshBest();statusEl.textContent=isRecord?'RECORDE!':'CONCLUÍDO';vibrate(isRecord?[30,55,45]:[25,35,25]);showResult(ms,isRecord,prior);
 }
 hud.querySelector('#raiGamerExit').addEventListener('click',exit);
 result.querySelector('#raiGamerResultClose').addEventListener('click',closeResult);

 document.addEventListener('click',e=>{
   const b=e.target.closest?.('button');if(!b)return;const label=((b.textContent||'')+' '+(b.getAttribute('aria-label')||'')).toLowerCase();
   if(/verificar|check/.test(label)){
     lastVerifyAt=Date.now();
     if(active&&running)setTimeout(()=>{const txt=(root.querySelector('#msg')?.textContent||'');if(!/miss[aã]o conclu[ií]da/i.test(txt)&&running){statusEl.textContent='CONTINUA';setTimeout(()=>{if(running)statusEl.textContent='CORRENDO'},850)}},280);
   }
   if(active&&/reiniciar|recomeçar|restart|reset/.test(label))setTimeout(startCountdown,120);
 },true);

 const msg=root.querySelector('#msg');
 if(msg)new MutationObserver(()=>{const txt=(msg.textContent||'').replace(/\s+/g,' ');if(/miss[aã]o conclu[ií]da/i.test(txt))completeFromVerify()}).observe(msg,{subtree:true,childList:true,characterData:true});
 const title=root.querySelector('#title');
 if(title)new MutationObserver(()=>{const n=missionName();if(n===currentMission)return;currentMission=n;if(active)setTimeout(startCountdown,220);else refreshBest()}).observe(title,{subtree:true,childList:true,characterData:true});
 refreshBest();
 window.__raiGamerExp={enter,exit,start:startCountdown,get active(){return active}};
})();
