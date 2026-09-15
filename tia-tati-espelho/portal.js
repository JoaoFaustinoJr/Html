(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
const V='23';
const AVATARS={
 girl:{smile:`assets/avatars/girl-smile.webp?v=${V}`,blink:`assets/avatars/girl-blink-hq-v20.webp?v=${V}`,surprise:`assets/avatars/girl-surprise.webp?v=${V}`,serious:`assets/avatars/girl-serious.webp?v=${V}`},
 boy:{smile:`assets/avatars/boy-smile.webp?v=${V}`,blink:`assets/avatars/boy-blink-hq-v20.webp?v=${V}`,surprise:`assets/avatars/boy-surprise.webp?v=${V}`,serious:`assets/avatars/boy-serious.webp?v=${V}`}
};
const TIA_TATI_PRINCESS=`assets/espelho-encantado-home-v5.webp?v=${V}`;
const TIA_TATI_GREETING='Oi, Tia Tati... Reconheci seu jeitinho... uma princesa.';
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let expression='smile';
let toastTimer=null,haloTimer=null,favorite=false,sequenceToken=0,renderToken=0,sensorActive=false;
let magicHistory=[],magicLastAt=0,specialActive=false,speechFallback=0;
function toast(text,duration=1900){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),duration)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),650)}
function imgStyle(img){img.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 5px 9px #754a6640);image-rendering:auto;';}
function refreshAvatar(){
 if(specialActive)return;
 const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.classList.remove('animate-pop');av.innerHTML='';av.style.backgroundImage='none';
 const kind=avatar,exp=expression;av.dataset.kind=kind;av.dataset.expression=exp;
 const img=new Image();img.alt='';img.decoding='async';imgStyle(img);
 img.onerror=()=>{if(token!==renderToken)return;img.onerror=null;img.src=AVATARS[kind].smile;};
 img.src=AVATARS[kind][exp]||AVATARS[kind].smile;av.appendChild(img);
 av.setAttribute('aria-label',(kind==='girl'?'Avatar menina ':'Avatar menino ')+({smile:'sorrindo',blink:'piscando',surprise:'espantado',serious:'sério'}[exp]||''));
 void av.offsetWidth;av.classList.add('animate-pop');setTimeout(()=>av.classList.remove('animate-pop'),260);
}
function renderTiaTatiPrincess(){
 const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.classList.remove('animate-pop');av.innerHTML='';
 av.dataset.kind='tia-tati';av.dataset.expression='princess';
 const img=new Image();img.alt='Tia Tati princesa';img.decoding='async';
 img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;object-position:25% 24%;transform:scale(1.12);transform-origin:center 30%;filter:drop-shadow(0 5px 10px #754a6655);image-rendering:auto;';
 img.onerror=()=>{if(token!==renderToken)return;specialActive=false;refreshAvatar();};
 img.src=TIA_TATI_PRINCESS;av.appendChild(img);
 av.setAttribute('aria-label','Tia Tati princesa');void av.offsetWidth;av.classList.add('animate-pop');
}
function setAvatar(kind,announce=true){if(specialActive)return;avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));refreshAvatar();if(announce)toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp,announce=true){if(specialActive||!AVATARS[avatar]?.[exp])return;expression=exp;$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));refreshAvatar();if(announce)toast(feedback[exp]||'Que expressão especial!');halo()}
function stopSensor(){if(sensorActive)window.dispatchEvent(new Event('tia:mirror-stop-sensor'))}
function startSensor(){window.dispatchEvent(new Event('tia:mirror-start-sensor'))}
function playSequence(items,label){stopSensor();const token=++sequenceToken;let i=0;toast(label);const run=()=>{if(token!==sequenceToken)return;if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++],true);setTimeout(run,1150)};setTimeout(run,650)}
function finishSpecialGreeting(){
 if(!specialActive)return;specialActive=false;clearTimeout(speechFallback);speechFallback=0;magicHistory=[];refreshAvatar();halo();
}
function speakSpecialGreeting(){
 clearTimeout(speechFallback);
 if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance){speechFallback=setTimeout(finishSpecialGreeting,5200);return;}
 try{
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(TIA_TATI_GREETING);u.lang='pt-BR';u.rate=.88;u.pitch=1.06;u.volume=1;
  const voices=speechSynthesis.getVoices?.()||[];const pt=voices.find(v=>/^pt-BR/i.test(v.lang))||voices.find(v=>/^pt/i.test(v.lang));if(pt)u.voice=pt;
  let ended=false;const done=()=>{if(ended)return;ended=true;finishSpecialGreeting()};u.onend=done;u.onerror=done;
  speechFallback=setTimeout(done,8500);speechSynthesis.speak(u);
 }catch(_){speechFallback=setTimeout(finishSpecialGreeting,5200)}
}
function activateTiaTatiGreeting(){
 if(specialActive)return;specialActive=true;sequenceToken++;magicHistory=[];renderTiaTatiPrincess();halo();toast(TIA_TATI_GREETING,7600);setTimeout(speakSpecialGreeting,260);
}
function trackMagicSequence(exp){
 if(specialActive)return;const now=Date.now();if(now-magicLastAt>6000)magicHistory=[];magicLastAt=now;
 if(magicHistory[magicHistory.length-1]===exp)return;magicHistory.push(exp);if(magicHistory.length>3)magicHistory.shift();
 if(magicHistory.length===3&&magicHistory[0]==='smile'&&magicHistory[1]==='blink'&&magicHistory[2]==='smile')activateTiaTatiGreeting();
}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function preload(){Object.values(AVATARS).forEach(group=>Object.values(group).forEach(src=>{const i=new Image();i.decoding='async';i.src=src;}));const p=new Image();p.src=TIA_TATI_PRINCESS;}
function init(){
 preload();setAvatar(avatar,false);setExpression('smile',false);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setAvatar(b.dataset.avatar)}));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;stopSensor();setExpression(b.dataset.expression)}));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const mode=b.dataset.mode;if(mode==='free'){sequenceToken++;magicHistory=[];toast('Espelho Livre: ativando a câmera como sensor… ✨');startSensor();halo()}if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑')}));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));
 $('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));
 $('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>{stopSensor();location.href='../tia-tati-kids/'});
 window.addEventListener('tia:mirror-expression',e=>{const exp=e.detail?.expression;if(!exp)return;if(e.detail?.source==='camera')trackMagicSequence(exp);if(!specialActive)setExpression(exp,false)});
 window.addEventListener('tia:mirror-toast',e=>{if(e.detail?.text&&!specialActive)toast(e.detail.text)});
 window.addEventListener('tia:mirror-sensor',e=>{sensorActive=e.detail?.status==='active';document.documentElement.classList.toggle('mirror-sensor-active',sensorActive)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();