(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟',kiss:'Beijinho encantado! 💋💗'};
const V='25';
const AVATARS={
 girl:{smile:`assets/avatars/girl-smile.webp?v=${V}`,blink:`assets/avatars/girl-blink-hq-v20.webp?v=${V}`,surprise:`assets/avatars/girl-surprise.webp?v=${V}`,serious:`assets/avatars/girl-serious.webp?v=${V}`},
 boy:{smile:`assets/avatars/boy-smile.webp?v=${V}`,blink:`assets/avatars/boy-blink-hq-v20.webp?v=${V}`,surprise:`assets/avatars/boy-surprise.webp?v=${V}`,serious:`assets/avatars/boy-serious.webp?v=${V}`}
};
const TIA_TATI_PRINCESS=`../tia-tati-fisio/assets/tati-approved-avatar.webp?v=${V}`;
const TIA_TATI_FALLBACK=`../tia-tati/assets/icon-tia-tati-512.webp?v=${V}`;
const TIA_TATI_GREETING='Oi, Tia Tati... Reconheci seu jeitinho... uma princesa.';
const THINK_MS=900,IMITATE_MS=1800,COOLDOWN_MS=500;
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl',expression='smile';
let toastTimer=null,haloTimer=null,favorite=false,sequenceToken=0,renderToken=0,sensorActive=false,sensorLoading=false;
let specialActive=false,speechFallback=0,resumeSensorAfterSpecial=false,interactionBusy=false,cycleToken=0;
let magicStep=0,magicDeadline=0;
function installV25UI(){
 if($('#mirrorV25Style'))return;
 const s=document.createElement('style');s.id='mirrorV25Style';s.textContent=`
 .mirror-v25-tools{position:absolute;z-index:60;left:3.4%;right:3.4%;top:.35%;display:flex;justify-content:space-between;align-items:center;gap:6px;pointer-events:none}.mirror-v25-tools button{pointer-events:auto;border:1px solid #ffffffcc;background:#fffef0;color:#77366b;border-radius:999px;padding:4px 8px;min-height:23px;font-size:10px;font-weight:900;line-height:1;box-shadow:0 3px 9px #6a355432;backdrop-filter:blur(6px)}
 .mirror-v25-tools .sensor-on{background:#eafff0ef;color:#277444}.mirror-v25-tools .sensor-loading{background:#fff8dcef;color:#8a6218}
 .mirror-water{position:absolute;z-index:17;inset:0;border-radius:inherit;opacity:0;pointer-events:none;overflow:hidden;background:radial-gradient(circle at 50% 44%,#ffffffd8 0 3%,#f8eeffcf 4% 13%,#bfe8ff9c 30%,#d5c4ff9c 56%,#fbd9f4aa 100%);transition:opacity .2s ease}.mirror-water.show{opacity:1}.mirror-water::before,.mirror-water::after{content:'';position:absolute;left:50%;top:50%;width:18%;aspect-ratio:1;border:2px solid #ffffffcc;border-radius:50%;transform:translate(-50%,-50%) scale(.35);box-shadow:0 0 12px #fff9,inset 0 0 10px #fff7;opacity:0}.mirror-water.show::before{animation:waterRipple .9s ease-out infinite}.mirror-water.show::after{animation:waterRipple .9s .3s ease-out infinite}@keyframes waterRipple{0%{opacity:.9;transform:translate(-50%,-50%) scale(.35)}70%{opacity:.38}100%{opacity:0;transform:translate(-50%,-50%) scale(4.4)}}
 .mirror-water-sheen{position:absolute;inset:0;background:linear-gradient(108deg,transparent 22%,#ffffff6b 42%,transparent 58%);transform:translateX(-120%);opacity:.85}.mirror-water.show .mirror-water-sheen{animation:waterSheen .9s ease-in-out infinite}@keyframes waterSheen{to{transform:translateX(120%)}}
 .mirror-water-label{position:absolute;left:50%;bottom:12%;transform:translateX(-50%);white-space:nowrap;color:#6e4a88;font-size:.62rem;font-weight:900;text-shadow:0 1px 5px #fff;letter-spacing:.02em}.mirror-water-label::before{content:'✦ ';color:#fff}.mirror-water-label::after{content:' ✦';color:#fff}
 .mirror-live.is-thinking .live-avatar{opacity:0;transform:translateX(-50%) scale(.94)}
 .mirror-kiss-burst{position:absolute;z-index:19;left:50%;top:43%;transform:translate(-50%,-50%) scale(.7);font-size:1.9rem;opacity:0;pointer-events:none;text-shadow:0 4px 12px #a7427d88}.mirror-kiss-burst.show{animation:kissPop 1.55s ease forwards}@keyframes kissPop{0%{opacity:0;transform:translate(-50%,-30%) scale(.5)}16%{opacity:1;transform:translate(-50%,-48%) scale(1.12)}70%{opacity:1;transform:translate(-50%,-68%) scale(1)}100%{opacity:0;transform:translate(-50%,-118%) scale(1.18)}}
 .kiss-pose{animation:kissAvatar 1.55s ease-in-out both}@keyframes kissAvatar{0%{transform:scale(.96) rotate(0)}22%{transform:scale(1.03) rotate(-2deg)}58%{transform:scale(1.05) rotate(2deg)}100%{transform:scale(1) rotate(0)}}
 .tia-princess-crown{position:absolute;z-index:19;left:50%;top:3%;transform:translateX(-50%);font-size:1.7rem;filter:drop-shadow(0 2px 5px #7b4a63aa);pointer-events:none}
 `;document.head.appendChild(s);
 const stage=$('#maskStage');if(!stage)return;
 const tools=document.createElement('div');tools.className='mirror-v25-tools';tools.innerHTML='<button type="button" id="mirrorBackKids">← Kids</button><button type="button" id="mirrorSensorToggle">📷 Iniciar</button><button type="button" id="mirrorMainPortal">🏠 Portal</button>';stage.appendChild(tools);
 const live=$('#mirrorLive');if(live){const water=document.createElement('div');water.id='mirrorWater';water.className='mirror-water';water.innerHTML='<div class="mirror-water-sheen"></div><div class="mirror-water-label">Espelho encantado...</div>';live.appendChild(water);const kiss=document.createElement('div');kiss.id='mirrorKissBurst';kiss.className='mirror-kiss-burst';kiss.textContent='💋 💗 ✨';live.appendChild(kiss)}
 $('#mirrorBackKids')?.addEventListener('click',()=>{stopSensor();location.href='../tia-tati-kids/'});
 $('#mirrorMainPortal')?.addEventListener('click',()=>{stopSensor();location.href='../tia-tati/'});
 $('#mirrorSensorToggle')?.addEventListener('click',toggleSensor);updateSensorUI();
}
function updateSensorUI(){const b=$('#mirrorSensorToggle');if(!b)return;b.classList.toggle('sensor-on',sensorActive);b.classList.toggle('sensor-loading',sensorLoading);b.textContent=sensorLoading?'⏳ Preparando':sensorActive?'⏹ Parar':'📷 Iniciar';b.setAttribute('aria-label',sensorActive?'Parar reconhecimento de expressões':'Iniciar reconhecimento de expressões')}
function toast(text,duration=1900){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),duration)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),650)}
function imgStyle(img){img.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 5px 9px #754a6640);image-rendering:auto;';}
function refreshAvatar(){if(specialActive)return;const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.classList.remove('animate-pop');av.innerHTML='';const kind=avatar,exp=expression;av.dataset.kind=kind;av.dataset.expression=exp;const img=new Image();img.alt='';img.decoding='async';imgStyle(img);img.onerror=()=>{if(token!==renderToken)return;img.onerror=null;img.src=AVATARS[kind].smile};img.src=AVATARS[kind][exp]||AVATARS[kind].smile;av.appendChild(img);av.setAttribute('aria-label',(kind==='girl'?'Avatar menina ':'Avatar menino ')+({smile:'sorrindo',blink:'piscando',surprise:'espantado',serious:'sério'}[exp]||''));void av.offsetWidth;av.classList.add('animate-pop');setTimeout(()=>av.classList.remove('animate-pop'),260)}
function renderKissPose(){const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.innerHTML='';av.dataset.kind=avatar;av.dataset.expression='kiss';const img=new Image();img.alt='';img.decoding='async';imgStyle(img);img.className='kiss-pose';img.onerror=()=>{if(token!==renderToken)return;img.onerror=null;img.src=AVATARS[avatar].smile};img.src=AVATARS[avatar].blink;av.appendChild(img);av.setAttribute('aria-label',(avatar==='girl'?'Avatar menina':'Avatar menino')+' mandando beijinho');const k=$('#mirrorKissBurst');if(k){k.classList.remove('show');void k.offsetWidth;k.classList.add('show')}halo()}
function renderTiaTatiPrincess(){const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.classList.remove('animate-pop');av.innerHTML='';av.dataset.kind='tia-tati';av.dataset.expression='princess';const img=new Image();img.alt='Tia Tati princesa';img.decoding='async';img.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;transform:scale(1.03);transform-origin:center bottom;filter:drop-shadow(0 5px 10px #754a6655);image-rendering:auto;';let fallbackTried=false;img.onerror=()=>{if(token!==renderToken)return;if(!fallbackTried){fallbackTried=true;img.src=TIA_TATI_FALLBACK;return}specialActive=false;refreshAvatar()};img.src=TIA_TATI_PRINCESS;av.appendChild(img);const crown=document.createElement('span');crown.className='tia-princess-crown';crown.textContent='👑';av.appendChild(crown);av.setAttribute('aria-label','Tia Tati princesa');void av.offsetWidth;av.classList.add('animate-pop')}
function setAvatar(kind,announce=true){if(specialActive||interactionBusy)return;avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));refreshAvatar();if(announce)toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp,announce=true,force=false){if(specialActive||(!force&&interactionBusy)||!AVATARS[avatar]?.[exp])return;expression=exp;$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));refreshAvatar();if(announce)toast(feedback[exp]||'Que expressão especial!');halo()}
function pauseDetection(){window.dispatchEvent(new Event('tia:mirror-pause-detection'))}
function resumeDetection(){window.dispatchEvent(new Event('tia:mirror-resume-detection'))}
function startSensor(){sensorLoading=true;updateSensorUI();window.dispatchEvent(new Event('tia:mirror-start-sensor'))}
function stopSensor(){interactionBusy=false;cycleToken++;hideWater();if(sensorActive||sensorLoading)window.dispatchEvent(new Event('tia:mirror-stop-sensor'))}
function toggleSensor(){if(specialActive)return;if(sensorActive||sensorLoading){stopSensor();resetMagic();return}sequenceToken++;resetMagic();toast('Espelho Livre: iniciando o sensor… ✨');startSensor();halo()}
function showWater(){const live=$('#mirrorLive'),w=$('#mirrorWater');live?.classList.add('is-thinking');w?.classList.add('show')}
function hideWater(){const live=$('#mirrorLive'),w=$('#mirrorWater');w?.classList.remove('show');live?.classList.remove('is-thinking')}
function playSequence(items,label){stopSensor();resetMagic();const token=++sequenceToken;let i=0;toast(label);const run=()=>{if(token!==sequenceToken)return;if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++],true,true);setTimeout(run,1150)};setTimeout(run,650)}
function resetMagic(){magicStep=0;magicDeadline=0}
function trackMagicSequence(exp){
 if(specialActive)return false;const now=Date.now();if(magicDeadline&&now>magicDeadline)resetMagic();
 if(magicStep===0){if(exp==='smile'){magicStep=1;magicDeadline=now+12000;toast('✨ 1/3 — sorriso reconhecido',900)}return false}
 if(magicStep===1){if(exp==='blink'){magicStep=2;magicDeadline=now+12000;toast('✨ 2/3 — piscadinha!',900)}return false}
 if(magicStep===2&&exp==='smile'){resetMagic();activateTiaTatiGreeting();return true}
 return false;
}
function processDetectedExpression(exp){
 if(specialActive||interactionBusy)return;if(!['smile','blink','surprise','serious','kiss'].includes(exp))return;
 if(trackMagicSequence(exp))return;
 interactionBusy=true;const token=++cycleToken;pauseDetection();showWater();
 setTimeout(()=>{if(token!==cycleToken||specialActive)return;hideWater();if(exp==='kiss'){renderKissPose();toast(feedback.kiss,IMITATE_MS)}else{setExpression(exp,false,true);toast(feedback[exp]||'Que expressão especial!',1300)}
 setTimeout(()=>{if(token!==cycleToken||specialActive)return;if(exp==='kiss')refreshAvatar();setTimeout(()=>{if(token!==cycleToken||specialActive)return;interactionBusy=false;if(sensorActive)resumeDetection()},COOLDOWN_MS)},IMITATE_MS)},THINK_MS);
}
function finishSpecialGreeting(){if(!specialActive)return;specialActive=false;clearTimeout(speechFallback);speechFallback=0;interactionBusy=false;refreshAvatar();halo();const resume=resumeSensorAfterSpecial;resumeSensorAfterSpecial=false;if(resume)setTimeout(()=>startSensor(),450)}
function speakSpecialGreeting(){clearTimeout(speechFallback);if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance){speechFallback=setTimeout(finishSpecialGreeting,5200);return}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(TIA_TATI_GREETING);u.lang='pt-BR';u.rate=.88;u.pitch=1.06;u.volume=1;const voices=speechSynthesis.getVoices?.()||[];const pt=voices.find(v=>/^pt-BR/i.test(v.lang))||voices.find(v=>/^pt/i.test(v.lang));if(pt)u.voice=pt;let ended=false;const done=()=>{if(ended)return;ended=true;finishSpecialGreeting()};u.onend=done;u.onerror=done;speechFallback=setTimeout(done,9000);speechSynthesis.speak(u)}catch(_){speechFallback=setTimeout(finishSpecialGreeting,5200)}}
function activateTiaTatiGreeting(){if(specialActive)return;specialActive=true;interactionBusy=false;cycleToken++;hideWater();sequenceToken++;resumeSensorAfterSpecial=sensorActive;stopSensor();renderTiaTatiPrincess();halo();toast(TIA_TATI_GREETING,8000);setTimeout(speakSpecialGreeting,220)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function preload(){Object.values(AVATARS).forEach(group=>Object.values(group).forEach(src=>{const i=new Image();i.decoding='async';i.src=src}));const p=new Image();p.src=TIA_TATI_PRINCESS}
function init(){
 installV25UI();preload();setAvatar(avatar,false);setExpression('smile',false,true);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setAvatar(b.dataset.avatar)}));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;stopSensor();resetMagic();setExpression(b.dataset.expression,true,true)}));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const mode=b.dataset.mode;if(mode==='free')toggleSensor();if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑')}));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));$('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));$('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>{stopSensor();location.href='../tia-tati-kids/'});$('#goMainPortal')?.addEventListener('click',()=>{stopSensor();location.href='../tia-tati/'});
 window.addEventListener('tia:mirror-expression',e=>{const exp=e.detail?.expression;if(!exp)return;if(e.detail?.source==='camera')processDetectedExpression(exp);else if(!specialActive)setExpression(exp,false,true)});
 window.addEventListener('tia:mirror-toast',e=>{if(e.detail?.text&&!specialActive&&!interactionBusy)toast(e.detail.text)});
 window.addEventListener('tia:mirror-sensor',e=>{const status=e.detail?.status;sensorLoading=status==='loading';sensorActive=status==='active';if(status==='off'||status==='error'){sensorLoading=false;sensorActive=false;interactionBusy=false;hideWater()}document.documentElement.classList.toggle('mirror-sensor-active',sensorActive);updateSensorUI()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();