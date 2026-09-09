
(()=>{
 const root=document.getElementById('tangram-levels'); if(!root)return;
 const button=document.getElementById('gamerApp'); if(!button)return;
 const KEY='raiGamerOfficialV1';
 let store={records:{}};try{store=Object.assign(store,JSON.parse(localStorage.getItem(KEY)||'{}'));store.records=store.records||{}}catch(e){}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}};
 const missionName=()=>((root.querySelector('#title')?.textContent||'Missão').replace(/\s+/g,' ').trim()||'Missão');
 const keyFor=name=>name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 const fmt=ms=>{ms=Math.max(0,Math.round(ms||0));const t=Math.floor(ms/100),d=t%10,s=Math.floor(t/10),m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+String(s%60).padStart(2,'0')+'.'+d};
 let active=false,running=false,startAt=0,elapsed=0,raf=0,countToken=0,lastVerifyAt=0,currentMission=missionName(),resultTimer=0;

 const hud=document.createElement('div');
 hud.className='rai-gamer-official-hud';
 hud.innerHTML='<div class="rai-gamer-official-time">00:00.0</div><button type="button" class="rai-gamer-official-exit" aria-label="Sair do modo gamer">×</button>';
 const stage=root.querySelector('.tl-stage'); if(stage)stage.prepend(hud); else root.prepend(hud);
 const countdown=document.createElement('div');
 countdown.className='rai-gamer-official-countdown';
 countdown.innerHTML='<div>3</div>'; document.body.appendChild(countdown);
 const result=document.createElement('div');
 result.className='rai-gamer-official-result';
 result.innerHTML='<div class="ico">🏆</div><h3>Missão concluída!</h3><div class="tm">00:00.0</div><p></p><button type="button">Continuar</button>';
 document.body.appendChild(result);

 const timeEl=hud.querySelector('.rai-gamer-official-time'),countEl=countdown.querySelector('div'),nativeTimer=root.querySelector('#timer');
 const setTime=t=>{timeEl.textContent=t;if(nativeTimer)nativeTimer.textContent=t};
 const vibrate=p=>{try{if(navigator.vibrate)navigator.vibrate(p)}catch(e){}};
 const bestFor=(n=currentMission)=>{const a=store.records[keyFor(n)]||[];return a.length?Math.min(...a):null};

 function ensureFocus(){
   if(root.classList.contains('tl-focus'))return;
   const b=document.getElementById('focusZoom')||document.getElementById('mFull');
   if(b){try{b.click();return}catch(e){}}
   root.classList.add('tl-focus');document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';
 }
 function leaveFocus(){
   try{if(window.__tangramExitFocus){window.__tangramExitFocus(true);return}}catch(e){}
   root.classList.remove('tl-focus');document.documentElement.style.overflow='';document.body.style.overflow='';
 }
 function tick(){if(!running)return;elapsed=performance.now()-startAt;setTime(fmt(elapsed));raf=requestAnimationFrame(tick)}
 function reset(){running=false;cancelAnimationFrame(raf);raf=0;elapsed=0;setTime('00:00.0')}
 function startClock(){reset();startAt=performance.now();running=true;raf=requestAnimationFrame(tick)}
 function stopClock(){if(!running)return elapsed;elapsed=performance.now()-startAt;running=false;cancelAnimationFrame(raf);raf=0;setTime(fmt(elapsed));return elapsed}
 function closeResult(){clearTimeout(resultTimer);result.classList.remove('show')}
 function showResult(ms,isRecord,prior){
   result.querySelector('h3').textContent=isRecord?'🏆 Novo recorde!':'✅ Missão concluída!';
   result.querySelector('.tm').textContent=fmt(ms);
   result.querySelector('p').textContent=isRecord?(prior==null?'Primeira marca registrada nesta missão.':fmt(prior-ms)+' mais rápido que o recorde anterior.'):(prior!=null?'Recorde atual: '+fmt(prior):'Tempo registrado.');
   result.classList.add('show');resultTimer=setTimeout(closeResult,4500);
 }
 async function startCountdown(){
   if(!active)return;ensureFocus();countToken++;const token=countToken;closeResult();reset();currentMission=missionName();
   countdown.classList.add('show');
   for(const v of ['3','2','1','GO!']){
     if(token!==countToken||!active)return;
     countEl.textContent=v;countEl.classList.toggle('go',v==='GO!');
     countEl.style.animation='none';void countEl.offsetWidth;countEl.style.animation='';
     vibrate(v==='GO!'?30:10);await new Promise(r=>setTimeout(r,v==='GO!'?450:650));
   }
   if(token!==countToken||!active)return;countdown.classList.remove('show');startClock();
 }
 function enter(){
   active=true;document.body.classList.add('rai-gamer-running');button.classList.add('active');ensureFocus();hud.classList.add('show');
   try{document.querySelector('.rai-lesson-overlay')?.classList.remove('show');document.querySelector('.rai-tutor-overlay')?.classList.remove('show')}catch(e){}
   startCountdown();
 }
 function exit(){
   active=false;running=false;countToken++;cancelAnimationFrame(raf);raf=0;countdown.classList.remove('show');hud.classList.remove('show');closeResult();document.body.classList.remove('rai-gamer-running');button.classList.remove('active');leaveFocus();
   setTimeout(()=>{try{if(window.__tlRefreshMetrics)window.__tlRefreshMetrics()}catch(e){}},80);
 }
 function complete(){
   if(!active||!running||Date.now()-lastVerifyAt>3500)return;
   const ms=stopClock(),prior=bestFor(),k=keyFor(currentMission),a=store.records[k]||[];a.push(Math.round(ms));store.records[k]=a.slice(-30);save();
   const rec=prior==null||ms<prior;vibrate(rec?[25,45,35]:20);showResult(ms,rec,prior);
 }

 button.addEventListener('click',()=>active?exit():enter());
 hud.querySelector('.rai-gamer-official-exit').addEventListener('click',exit);
 result.querySelector('button').addEventListener('click',closeResult);
 document.addEventListener('click',e=>{
   const b=e.target.closest?.('button');if(!b)return;
   const label=((b.textContent||'')+' '+(b.getAttribute('aria-label')||'')).toLowerCase();
   if(/verificar|check/.test(label))lastVerifyAt=Date.now();
   if(active&&/reiniciar|recomeçar|restart|reset/.test(label))setTimeout(startCountdown,100);
 },true);
 const msg=root.querySelector('#msg');
 if(msg)new MutationObserver(()=>{const t=(msg.textContent||'').replace(/\s+/g,' ');if(/miss[aã]o conclu[ií]da/i.test(t))complete()}).observe(msg,{subtree:true,childList:true,characterData:true});
 const title=root.querySelector('#title');
 if(title)new MutationObserver(()=>{const n=missionName();if(n===currentMission)return;currentMission=n;if(active)setTimeout(startCountdown,180)}).observe(title,{subtree:true,childList:true,characterData:true});
 window.__raiGamerOfficial={enter,exit,get active(){return active}};
})();
