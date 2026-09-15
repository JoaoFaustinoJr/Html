(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
const V='17';
const AVATARS={
 girl:{
  smile:`assets/avatars/girl-smile.webp?v=${V}`,
  blink:`assets/avatars/girl-smile.webp?v=${V}`,
  surprise:`assets/avatars/girl-surprise.webp?v=${V}`,
  serious:`assets/avatars/girl-serious.webp?v=${V}`
 },
 boy:{
  smile:`assets/avatars/boy-smile.webp?v=${V}`,
  blink:`assets/avatars/boy-smile.webp?v=${V}`,
  surprise:`assets/avatars/boy-surprise.webp?v=${V}`,
  serious:`assets/avatars/boy-serious.webp?v=${V}`
 }
};
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let expression='smile';
let toastTimer=null,haloTimer=null,favorite=false,sequenceToken=0,renderToken=0;
function toast(text){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),950)}
function imgStyle(img){img.style.cssText='display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 5px 9px #754a6640);';}
function winkOverlay(av,kind){
 const overlay=document.createElement('span');
 overlay.setAttribute('aria-hidden','true');
 overlay.className='wink-overlay';
 overlay.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:3;';
 const patch=document.createElement('span');
 const girl=kind==='girl';
 patch.style.cssText=`position:absolute;left:${girl?'27.5%':'28.2%'};top:${girl?'46.2%':'45.6%'};width:${girl?'18.5%':'18%'};height:${girl?'10.2%':'10%'};border-radius:50%;background:radial-gradient(ellipse at 50% 52%,#f6c9ad 0 68%,#efb795 72%,transparent 76%);transform:rotate(-4deg);`;
 const lid=document.createElement('span');
 lid.style.cssText=`position:absolute;left:${girl?'29.4%':'30%'};top:${girl?'50.2%':'49.6%'};width:${girl?'15.5%':'15%'};height:4.5%;border-top:3px solid #4f3028;border-radius:50%;transform:rotate(-5deg);filter:drop-shadow(0 1px 0 #fff8);`;
 overlay.append(patch,lid);
 av.appendChild(overlay);
}
function refreshAvatar(){
 const av=$('#liveAvatar');if(!av)return;const token=++renderToken;av.classList.remove('animate-pop');av.innerHTML='';av.style.backgroundImage='none';
 const kind=avatar,exp=expression;av.dataset.kind=kind;av.dataset.expression=exp;
 const img=new Image();img.alt='';img.decoding='async';imgStyle(img);
 img.onerror=()=>{if(token!==renderToken)return;img.onerror=null;img.src=AVATARS[kind].smile;};
 img.onload=()=>{if(token!==renderToken)return;if(exp==='blink')winkOverlay(av,kind);};
 img.src=AVATARS[kind][exp]||AVATARS[kind].smile;av.appendChild(img);
 av.setAttribute('aria-label',(kind==='girl'?'Avatar menina ':'Avatar menino ')+({smile:'sorrindo',blink:'piscando',surprise:'espantado',serious:'sério'}[exp]||''));
 void av.offsetWidth;av.classList.add('animate-pop');setTimeout(()=>av.classList.remove('animate-pop'),340);
}
function setAvatar(kind,announce=true){avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));refreshAvatar();if(announce)toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp,announce=true){expression=exp;$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));refreshAvatar();if(announce)toast(feedback[exp]||'Que expressão especial!');halo()}
function playSequence(items,label){const token=++sequenceToken;let i=0;toast(label);const run=()=>{if(token!==sequenceToken)return;if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++],true);setTimeout(run,1150)};setTimeout(run,650)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function preload(){Object.values(AVATARS).forEach(group=>Object.values(group).forEach(src=>{const i=new Image();i.src=src;}));}
function init(){
 preload();setAvatar(avatar,false);setExpression('smile',false);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setAvatar(b.dataset.avatar)}));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setExpression(b.dataset.expression)}));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const mode=b.dataset.mode;if(mode==='free'){sequenceToken++;toast('Espelho Livre: escolha uma expressão ✨');halo()}if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑')}));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));
 $('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));
 $('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>location.href='../tia-tati-kids/');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();