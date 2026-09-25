(()=>{
 const VERSION='15.13.2',PATH='/Html/tangram-prof-junior-v12/';
 let reg=null,checking=null,reloading=false,specialStarted=false,aulasEntryStarted=false,iosInstallStarted=false,rewardsStarted=false,welcomeStarted=false,answerOrderStarted=false,verifyAssistStarted=false,x1PortalWired=false,x1PromoWired=false,lessonNarrationWired=false,lessonNarrationActive=false,lessonNarrationWatch=null;
 const handheld=()=>{try{return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(navigator.userAgent||'')||!!navigator.userAgentData?.mobile||(navigator.maxTouchPoints>0&&matchMedia('(pointer:coarse)').matches)}catch(e){return false}};
 const appleMobile=()=>{try{return /iPhone|iPad|iPod/i.test(navigator.userAgent||'')||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)}catch(e){return false}};
 const x1Embed=()=>{try{return new URLSearchParams(location.search).get('x1')==='1'}catch(e){return false}};
 function repairViewport(){if(!handheld())return;try{const sw=Number(screen.width)||0,sh=Number(screen.height)||0,short=Math.min(sw,sh),long=Math.max(sw,sh);const portrait=matchMedia('(orientation:portrait)').matches;const width=short&&short<=640?Math.round(portrait?short:long):0;let v=document.querySelector('meta[name="viewport"]');if(!v){v=document.createElement('meta');v.name='viewport';document.head.prepend(v)}v.content=width?'width='+width+',initial-scale=1,viewport-fit=cover':'width=device-width,initial-scale=1,viewport-fit=cover'}catch(e){}}
 function narrationText(value){
  const clean=s=>{
   let text=String(s??'').replace(/\bR\s*\.\s*A\s*\.\s*I\s*\.?/gi,'Raí');
   text=text.replace(/(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)/g,(m,a,b,off,str)=>{const before=str.charAt(off-1),after=str.charAt(off+m.length);return before==='/'||after==='/'?m:`${a} sobre ${b}`});
   text=text.replace(/√\s*(\d+(?:[.,]\d+)?)/g,' raiz quadrada de $1 ');
   text=text.replace(/(\d+(?:[.,]\d+)?)\s*°/g,'$1 graus ');
   text=text.replace(/\bObjetivo\s*:/gi,'Primeiro, vamos ao objetivo:');
   text=text.replace(/\bConceito\s*:/gi,'Agora, veja a ideia principal:');
   text=text.replace(/\bExemplo\s*:/gi,'Por exemplo:');
   text=text.replace(/\bAtividade guiada\s*:/gi,'Vamos praticar juntos:');
   text=text.replace(/\bDesafio\s*:/gi,'Agora vem o desafio:');
   text=text.replace(/\bObserve\s*:/gi,'Repare nisto:');
   text=text.replace(/\bResposta\s*:/gi,'Veja como fica a resposta:');
   text=text.replace(/\s*;\s*/g,', ');
   text=text.replace(/\s*•\s*/g,'. ');
   text=text.replace(/->|[→➡➜➝➞⟶⇒↦]/g,' leva a ').replace(/\+\+/g,' mais mais ').replace(/\+/g,' somado a ').replace(/×/g,' vezes ').replace(/÷/g,' dividido por ').replace(/≈/g,' aproximadamente ').replace(/≠/g,' diferente de ').replace(/≤/g,' menor ou igual a ').replace(/≥/g,' maior ou igual a ').replace(/=/g,' igual a ').replace(/²/g,' ao quadrado ').replace(/³/g,' ao cubo ').replace(/%/g,' por cento ').replace(/\s+/g,' ').trim();
   const alreadyWarm=/^(oi|olá|vamos|agora|repare|veja|imagine|pense|por exemplo|muito bem|boa|isso|parabéns|primeiro|sem pressa)/i.test(text);
   if(text.length>175&&!alreadyWarm)text='Vamos por partes. '+text;
   return text;
  };
  return Array.isArray(value)?value.map(clean):clean(value)
 }
 function patchNarration(){try{const old=window.__raiSpeak;if(typeof old!=='function'||old.__raiNarrationNormalized)return;const wrap=(text,opts={})=>old(narrationText(text),{...opts,pause:Number.isFinite(opts.pause)?opts.pause:190});wrap.__raiNarrationNormalized=true;wrap.__raiOriginal=old;window.__raiSpeak=wrap;window.__raiNarrationText=narrationText}catch(e){}}
 function lessonSpeakButton(){return document.getElementById('raiLessonSpeak')}
 function resetLessonSpeakButton(){const b=lessonSpeakButton();if(b){b.textContent='🔊 Ouvir com a R.A.I.';b.setAttribute('aria-pressed','false');b.title='Ouvir explicação com a R.A.I.'}}
 function stopLessonNarration(){lessonNarrationActive=false;clearInterval(lessonNarrationWatch);lessonNarrationWatch=null;try{window.__raiStopSpeak?.()}catch(e){}resetLessonSpeakButton()}
 function watchLessonNarration(){clearInterval(lessonNarrationWatch);let idle=0;lessonNarrationWatch=setInterval(()=>{if(!lessonNarrationActive){clearInterval(lessonNarrationWatch);lessonNarrationWatch=null;return}let busy=false;try{busy=!!(speechSynthesis.speaking||speechSynthesis.pending)}catch(e){}if(busy){idle=0;return}if(++idle>=3)stopLessonNarration()},260)}
 function wireLessonNarration(){
  if(lessonNarrationWired)return;lessonNarrationWired=true;
  document.addEventListener('click',e=>{
   const speak=e.target?.closest?.('#raiLessonSpeak');
   if(speak){
    let busy=false;try{busy=!!(speechSynthesis.speaking||speechSynthesis.pending)}catch(err){}
    if(lessonNarrationActive||busy){e.preventDefault();e.stopImmediatePropagation();stopLessonNarration();return}
    setTimeout(()=>{lessonNarrationActive=true;speak.textContent='⏹ Parar narração';speak.setAttribute('aria-pressed','true');speak.title='Interromper a narração da R.A.I.';watchLessonNarration()},0);
    return;
   }
   const leave=e.target?.closest?.('.rai-lesson-close,#raiLessonClose,#raiHomeFromDetail,#raiSectionFromDetail,#raiListLessons,#raiSwitchSection,#raiPrevLesson,#raiNextLesson');
   const overlay=e.target?.closest?.('.rai-lesson-overlay');
   if(leave||(overlay&&e.target===overlay))stopLessonNarration();
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.rai-lesson-overlay.show'))stopLessonNarration()},true);
  const observe=()=>{const o=document.querySelector('.rai-lesson-overlay');if(!o||o.dataset.raiNarrationObserved)return false;o.dataset.raiNarrationObserved='1';new MutationObserver(()=>{if(!o.classList.contains('show'))stopLessonNarration()}).observe(o,{attributes:true,attributeFilter:['class']});return true};
  if(!observe()){let n=0;const t=setInterval(()=>{if(observe()||++n>30)clearInterval(t)},250)}
 }
 function x1Open(){window.open('../tangram-x1/','_blank','noopener')}
 function ensureX1PromoStyle(){
  if(document.getElementById('raiX1PromoStyle'))return;
  const s=document.createElement('style');s.id='raiX1PromoStyle';s.textContent=`
  #tangramX1Portal{border-color:#e5c342!important;background:linear-gradient(180deg,#b88a08,#795906)!important;color:#fff5bd!important;box-shadow:0 0 0 1px rgba(255,226,102,.14),0 0 18px rgba(255,199,31,.16)!important}
  .rai-x1-portal-card{position:relative;overflow:hidden;margin:2px 0 10px;padding:9px 12px;border-radius:15px;border:1px solid rgba(255,215,94,.42);background:radial-gradient(circle at 90% 18%,rgba(220,32,32,.16),transparent 22%),radial-gradient(circle at 12% 95%,rgba(44,211,239,.13),transparent 34%),linear-gradient(135deg,#071a28,#0b2432 60%,#1e150d);box-shadow:0 8px 24px rgba(0,0,0,.24),inset -2px 0 0 rgba(255,45,45,.42),inset 0 0 0 1px rgba(72,218,245,.05);color:#effcff;display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px}
  .rai-x1-portal-card:before,.rai-x1-portal-card:after{content:"";position:absolute;width:54px;height:54px;transform:rotate(45deg);opacity:.12;border:1px solid #48dcf4}.rai-x1-portal-card:before{left:-34px;bottom:-32px}.rai-x1-portal-card:after{right:80px;top:-34px;border-color:#ff4545;box-shadow:0 0 14px rgba(255,40,40,.16)}
  .rai-x1-copy{position:relative;z-index:1}.rai-x1-kicker{display:inline-flex;gap:6px;align-items:center;font:900 9px/1 system-ui;letter-spacing:.13em;color:#ffd75e;text-transform:uppercase}.rai-x1-kicker i{width:6px;height:6px;border-radius:50%;background:#58ef9d;box-shadow:0 0 10px #58ef9d}
  .rai-x1-copy h3{margin:3px 0 2px;font:950 clamp(16px,3vw,22px)/1.05 system-ui;color:#fff;letter-spacing:.01em}.rai-x1-copy h3 b{color:#ffd75e}.rai-x1-copy p{margin:0;color:#bfe5ef;font:700 10px/1.32 system-ui}
  .rai-x1-cta{position:relative;z-index:1;display:flex;align-items:center;gap:8px}.rai-x1-cta img{width:42px;height:42px;filter:drop-shadow(0 0 8px rgba(72,220,244,.16))}.rai-x1-cta button{border:0;border-radius:11px;padding:9px 13px;background:linear-gradient(135deg,#ffd75e,#ffb72d);color:#201600;font:950 11px system-ui;box-shadow:0 4px 14px rgba(255,183,45,.16),0 0 0 1px rgba(255,50,50,.16);cursor:pointer;white-space:nowrap}
  .rai-x1-launch{position:fixed;inset:0;z-index:2147483643;display:grid;place-items:center;padding:18px;background:rgba(1,8,14,.82);backdrop-filter:blur(5px);opacity:0;pointer-events:none;transition:.22s}.rai-x1-launch.show{opacity:1;pointer-events:auto}
  .rai-x1-launch-card{position:relative;width:min(92vw,520px);overflow:hidden;border-radius:25px;border:1px solid rgba(62,220,246,.6);background:radial-gradient(circle at 75% 20%,rgba(255,201,48,.18),transparent 30%),linear-gradient(145deg,#071827,#0d2a3a);box-shadow:0 30px 100px rgba(0,0,0,.62),0 0 38px rgba(54,214,238,.12);padding:22px;color:#effcff;text-align:center}
  .rai-x1-launch-card:before{content:"NOVO";position:absolute;left:18px;top:16px;transform:rotate(-5deg);padding:6px 10px;border-radius:9px;background:#ffd642;color:#211700;font:1000 11px system-ui;box-shadow:0 0 18px rgba(255,214,66,.28)}
  .rai-x1-launch-close{position:absolute;right:13px;top:12px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(102,225,248,.45);background:#092637;color:#eaffff;font:900 19px system-ui;cursor:pointer}
  .rai-x1-launch-rai{width:105px;height:105px;margin:8px auto 3px;display:block;filter:drop-shadow(0 0 18px rgba(62,220,246,.22))}
  .rai-x1-launch-card h2{margin:5px 0 5px;font:1000 clamp(24px,7vw,38px)/.98 system-ui}.rai-x1-launch-card h2 b{color:#ffd75e}.rai-x1-launch-card>p{margin:8px auto 15px;max-width:390px;color:#c4e5ed;font:700 13px/1.45 system-ui}
  .rai-x1-launch-modes{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 14px}.rai-x1-launch-modes div{padding:10px;border:1px solid rgba(255,255,255,.1);border-radius:13px;background:rgba(255,255,255,.035);font:850 11px/1.35 system-ui}.rai-x1-launch-modes b{display:block;color:#fff;margin-bottom:2px}.rai-x1-launch-modes .g b{color:#ffd75e}.rai-x1-launch-modes .p b{color:#61ddf6}
  .rai-x1-launch-actions{display:grid;grid-template-columns:1.2fr .8fr;gap:8px}.rai-x1-launch-actions button{border-radius:13px;padding:12px;border:1px solid rgba(103,224,246,.28);font:950 12px system-ui;cursor:pointer}.rai-x1-launch-actions .go{background:linear-gradient(135deg,#ffd75e,#ffb52c);border:0;color:#1d1500}.rai-x1-launch-actions .later{background:#0a2332;color:#d9f2f7}
  @media(max-width:560px){.rai-x1-portal-card{grid-template-columns:1fr auto;padding:8px 9px;gap:7px}.rai-x1-cta{justify-content:flex-end}.rai-x1-cta img{width:38px;height:38px}.rai-x1-copy p{font-size:9px}.rai-x1-copy h3{font-size:16px}.rai-x1-cta button{padding:8px 10px;font-size:10px}.rai-x1-launch-card{padding:18px 15px 16px}.rai-x1-launch-rai{width:88px;height:88px}.rai-x1-launch-actions{grid-template-columns:1fr}.rai-x1-launch-modes{grid-template-columns:1fr 1fr}}
  `;document.head.appendChild(s)
 }
 function wireX1Promo(){
  if(x1Embed()){document.getElementById('raiX1PortalCard')?.remove();document.getElementById('raiX1Launch')?.remove();return}
  if(x1PromoWired)return;const root=document.getElementById('tangram-levels');if(!root)return;x1PromoWired=true;ensureX1PromoStyle();
  if(false&&!document.getElementById('raiX1PortalCard')){
   const card=document.createElement('section');card.id='raiX1PortalCard';card.className='rai-x1-portal-card';card.innerHTML='<div class="rai-x1-copy"><span class="rai-x1-kicker"><i></i> NOVO • TEMPO REAL</span><h3>Tangram <b>X1 — Arena</b></h3><p>Jogue ao vivo com seus colegas • sala por código • ranking em tempo real</p></div><div class="rai-x1-cta"><img src="rai-icon.svg?v=rai3" alt="R.A.I."><button type="button">⚡ Entrar no X1</button></div>';
   card.querySelector('button').addEventListener('click',x1Open);
   /* O piloto X1 substitui o antigo banner promocional; o botão X1 do cabeçalho continua como acesso permanente. */
   const brand=root.querySelector('.tl-brand');brand?.insertAdjacentElement('afterend',card);
  }
  if(!localStorage.getItem('raiX1PilotLaunchSeenV1')&&!document.getElementById('raiX1Launch')){
   const m=document.createElement('div');m.id='raiX1Launch';m.className='rai-x1-launch';m.innerHTML='<div class="rai-x1-launch-card" role="dialog" aria-modal="true" aria-label="Piloto Tangram X1 Arena"><button class="rai-x1-launch-close" type="button" aria-label="Fechar">×</button><img class="rai-x1-launch-rai" src="rai-icon.svg?v=rai3" alt="R.A.I."><h2><b>PILOTO</b> • Tangram X1</h2><p>Estamos testando a Arena em tempo real com alunos e professores. Entre, jogue e ajude a aperfeiçoar esta nova experiência.</p><div class="rai-x1-launch-modes"><div class="g"><b>⚡ Partidas ao vivo</b>Salas por código, rodadas e ranking em tempo real.</div><div class="p"><b>🧪 Fase piloto</b>Sua experiência ajuda a identificar melhorias antes da versão definitiva.</div></div><div class="rai-x1-launch-actions"><button class="go" type="button">Participar do piloto</button><button class="later" type="button">Agora não</button></div></div>';
   let autoClose=setTimeout(()=>close(false),4200);const close=mark=>{clearTimeout(autoClose);if(mark!==false)localStorage.setItem('raiX1PilotLaunchSeenV1','1');m.classList.remove('show');setTimeout(()=>m.remove(),240)};
   m.querySelector('.go').addEventListener('click',()=>{localStorage.setItem('raiX1PilotLaunchSeenV1','1');x1Open();close(true)});m.querySelector('.later').addEventListener('click',()=>close(true));m.querySelector('.rai-x1-launch-close').addEventListener('click',()=>close(true));m.addEventListener('click',e=>{if(e.target===m)close(true)});
   document.body.appendChild(m);setTimeout(()=>m.classList.add('show'),850);
  }
 }
 function wireX1Portal(){
  if(x1Embed()){document.getElementById('tangramX1Portal')?.remove();return}
  if(x1PortalWired)return;const host=tools();if(!host)return;x1PortalWired=true;ensureX1PromoStyle();
  if(document.getElementById('tangramX1Portal'))return;
  const b=document.createElement('button');b.type='button';b.id='tangramX1Portal';b.className='tl-mini-action';b.innerHTML='⚡ <span>X1 Arena</span>';b.title='Abrir Tangram X1 — Arena';
  b.addEventListener('click',x1Open);
  const about=document.getElementById('aboutApp');about?host.insertBefore(b,about):host.appendChild(b);
 }
 function loadVerifyAssist(){if(verifyAssistStarted)return;verifyAssistStarted=true;import('./verify-assist-v1.js?v=15114').catch(e=>{verifyAssistStarted=false;console.warn('Assistente de verificação',e)})}
 function loadAnswerOrder(){if(answerOrderStarted)return;answerOrderStarted=true;import('./answer-order-v1.js?v=15111').catch(e=>{answerOrderStarted=false;console.warn('Ordem das alternativas',e)})}
 function loadAulasEntry(){if(aulasEntryStarted)return;aulasEntryStarted=true;try{if(!document.querySelector('link[data-rai-aulas-entry]')){const l=document.createElement('link');l.rel='stylesheet';l.href='aulas-entry-v1595.css?v=15111';l.dataset.raiAulasEntry='1';document.head.appendChild(l)}import('./aulas-entry-v1595.js?v=15111').catch(e=>{aulasEntryStarted=false;console.warn('Entrada Aulas',e)})}catch(e){aulasEntryStarted=false}}
 function loadSpecial(){if(specialStarted||(window.__raiProvaParanaV1&&window.__raiProvaParanaV1.active))return;specialStarted=true;try{if(!document.querySelector('link[data-rai-prova-parana]')){const l=document.createElement('link');l.rel='stylesheet';l.href='prova-parana-v1.css?v=15111';l.dataset.raiProvaParana='1';document.head.appendChild(l)}if(!document.querySelector('link[data-rai-prova-subjects]')){const l=document.createElement('link');l.rel='stylesheet';l.href='prova-parana-subjects.css?v=15111';l.dataset.raiProvaSubjects='1';document.head.appendChild(l)}import('./prova-parana-v1.js?v=15111').catch(e=>{specialStarted=false;console.warn('Especial Prova Paraná',e)})}catch(e){specialStarted=false}}
 function loadRewards(){if(rewardsStarted)return;rewardsStarted=true;try{if(!document.querySelector('link[data-rai-prova-rewards]')){const l=document.createElement('link');l.rel='stylesheet';l.href='prova-parana-rewards-v1.css?v=15111';l.dataset.raiProvaRewards='1';document.head.appendChild(l)}import('./prova-parana-rewards-v2.js?v=15111').catch(e=>{rewardsStarted=false;console.warn('Recompensas Prova Paraná',e)})}catch(e){rewardsStarted=false}}
 function loadWelcome(){return;/* Prova Paraná welcome retired during X1 pilot */if(welcomeStarted)return;welcomeStarted=true;try{if(!document.querySelector('link[data-rai-prova-welcome]')){const l=document.createElement('link');l.rel='stylesheet';l.href='prova-parana-welcome-v1.css?v=15111';l.dataset.raiProvaWelcome='1';document.head.appendChild(l)}import('./prova-parana-welcome-v2.js?v=15111').catch(e=>{welcomeStarted=false;console.warn('Aviso Prova Paraná',e)})}catch(e){welcomeStarted=false}}
 function loadIOSInstall(){if(iosInstallStarted||!appleMobile())return;iosInstallStarted=true;try{if(!document.querySelector('link[data-rai-ios-install]')){const l=document.createElement('link');l.rel='stylesheet';l.href='ios-install-v1.css?v=15111';l.dataset.raiIosInstall='1';document.head.appendChild(l)}import('./ios-install-v1.js?v=15111').catch(e=>{iosInstallStarted=false;console.warn('Assistente iPhone',e)})}catch(e){iosInstallStarted=false}}
 function syncVersion(){try{const el=document.querySelector('#tangram-levels .tl-brand-credit,#tangram-levels .tl-sub');if(el){const base=(el.textContent||'').replace(/\s*•\s*v\d+(?:\.\d+)+/i,'').trim();el.textContent=base+' • v'+VERSION}document.querySelectorAll('.rai-version-line').forEach(p=>p.innerHTML='<b>Versão '+VERSION+'</b> • endereço oficial permanente • atualizações pelo próprio aplicativo')}catch(e){}}
 function syncHead(){try{const base=location.origin+PATH,share=base+'tangram-share-v18.jpg';document.title='Tangram Educativo — Prof. João Faustino Junior';let c=document.querySelector('link[rel="canonical"]');if(c)c.href=base;[['property','og:url',base],['property','og:image',share],['name','twitter:image',share]].forEach(([a,k,v])=>{const e=document.querySelector('meta['+a+'="'+k+'"]');if(e)e.content=v});document.querySelectorAll('link[rel~="icon"]').forEach(e=>{if(/(^|\/)icon\.svg$/i.test((e.getAttribute('href')||'').split('?')[0]))e.remove()})}catch(e){}}
 const tools=()=>document.querySelector('#tangram-levels .tl-brand-tools');
 function button(){const host=tools();if(!host)return null;let b=document.getElementById('updateApp');if(!b){b=document.createElement('button');b.type='button';b.id='updateApp';b.className='tl-mini-action tl-update-action';b.innerHTML='↻ <span>Atualizar</span>';const about=document.getElementById('aboutApp');about?host.insertBefore(b,about):host.appendChild(b)}return b}
 function ready(){const b=button();if(b){b.classList.add('show','ready');b.innerHTML='✨ <span>Atualizar</span>';b.title='Nova versão disponível'}}
 function aboutVersion(){const body=document.querySelector('.tl-about-main .tl-about-body');if(!body)return;let p=body.querySelector('.rai-version-line');if(!p){p=document.createElement('p');p.className='rai-version-line';const sig=body.querySelector('.tl-signature');sig?body.insertBefore(p,sig):body.appendChild(p)}p.innerHTML='<b>Versão '+VERSION+'</b> • endereço oficial permanente • atualizações pelo próprio aplicativo'}
 async function registration(){if(!('serviceWorker'in navigator))return null;if(reg)return reg;try{return reg=await navigator.serviceWorker.getRegistration('./')}catch(e){return null}}
 async function check(){if(checking)return checking;checking=(async()=>{try{const r=await registration();if(!r)return null;await r.update();if(r.waiting&&navigator.serviceWorker.controller)ready();return r}catch(e){console.warn('Atualização Tangram',e);return null}})();try{return await checking}finally{checking=null}}
 async function apply(){const r=await registration();if(r?.waiting){const b=button();if(b){b.classList.add('show');b.innerHTML='⏳ <span>Atualizando</span>'}r.waiting.postMessage({type:'SKIP_WAITING'});return}await check()}
 function sync(){syncHead();syncVersion();patchNarration();wireLessonNarration();wireX1Portal();wireX1Promo();loadVerifyAssist();loadAnswerOrder();loadAulasEntry();loadSpecial();loadRewards();loadWelcome();loadIOSInstall();try{window.__raiAnswerOrderV1?.scan?.();window.__raiEnsureAulasEntry?.();window.__raiProvaParanaV1?.ensureEntryPoints?.();window.__raiProvaRewardsV2?.refresh?.();window.__raiIOSInstall?.wire?.()}catch(e){}repairViewport()}
 sync();setTimeout(sync,160);setTimeout(sync,420);
 const b=button();b?.addEventListener('click',()=>apply().catch(()=>{}));document.getElementById('aboutApp')?.addEventListener('click',()=>setTimeout(aboutVersion,0));setTimeout(aboutVersion,500);
 addEventListener('pageshow',sync);addEventListener('orientationchange',()=>setTimeout(repairViewport,140));addEventListener('focus',()=>{sync();check()});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){sync();check()}});
 if('serviceWorker'in navigator){navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!reloading){reloading=true;location.reload()}});registration().then(()=>check()).catch(()=>{});setInterval(check,30*60*1000)}
 window.__raiUpdate={version:VERSION,path:PATH,check,repairViewport,narrationText,stopLessonNarration};
})();