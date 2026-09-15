(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
const avatarFiles={
 girl:{smile:'assets/avatars/girl-smile.webp?v=14',blink:'assets/avatars/girl-blink.webp?v=14',surprise:'assets/avatars/girl-surprise.webp?v=14',serious:'assets/avatars/girl-serious.webp?v=14'},
 boy:{smile:'assets/avatars/boy-smile.webp?v=14',blink:'assets/avatars/boy-blink.webp?v=14',surprise:'assets/avatars/boy-surprise.webp?v=14',serious:'assets/avatars/boy-serious.webp?v=14'}
};
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let expression='smile';
let toastTimer=null,haloTimer=null,favorite=false,sequenceToken=0,avatarRenderToken=0;
function toast(text){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),950)}
function popAvatar(av){av.classList.remove('animate-pop');void av.offsetWidth;av.classList.add('animate-pop');setTimeout(()=>av.classList.remove('animate-pop'),340)}
function fallbackAvatar(kind,exp){
 const girl=kind==='girl';
 const hair=girl?'#8a5a3d':'#6b422c',shirt=girl?'#ed78b6':'#74a8ea';
 const eyeL=exp==='blink'?'<path d="M89 119q13 9 26 0" fill="none" stroke="#4e332a" stroke-width="5" stroke-linecap="round"/>':'<ellipse cx="102" cy="119" rx="13" ry="17" fill="#fff"/><ellipse cx="102" cy="122" rx="6" ry="9" fill="#4d3128"/>';
 const eyeR='<ellipse cx="178" cy="119" rx="13" ry="17" fill="#fff"/><ellipse cx="178" cy="122" rx="6" ry="9" fill="#4d3128"/>';
 const mouth=exp==='surprise'?'<ellipse cx="140" cy="177" rx="14" ry="18" fill="#9f3f61"/>':exp==='serious'?'<path d="M125 180q15 3 30 0" fill="none" stroke="#9f5366" stroke-width="4" stroke-linecap="round"/>':'<path d="M116 170q24 30 48 0q-3 23-24 25q-21-2-24-25" fill="#cf5d82"/>';
 return `<svg viewBox="0 0 280 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><ellipse cx="140" cy="235" rx="82" ry="58" fill="${shirt}"/><ellipse cx="140" cy="132" rx="72" ry="82" fill="#f5c9ad"/><path d="M70 104q12-71 74-74q64 0 75 72q-25-13-48-14q-30-1-53 14q-23 15-48 2" fill="${hair}"/>${girl?'<path d="M196 68q13-12 26 0q-5 14-13 18q-9-4-13-18" fill="#f083bb"/>':''}<path d="M86 164q15 16 30 0" fill="none" stroke="#e88ca0" stroke-width="8" opacity=".55"/><path d="M164 164q15 16 30 0" fill="none" stroke="#e88ca0" stroke-width="8" opacity=".55"/>${eyeL}${eyeR}${mouth}<circle cx="105" cy="116" r="2" fill="#fff"/><circle cx="181" cy="116" r="2" fill="#fff"/></svg>`;
}
function refreshAvatar(){
 const av=$('#liveAvatar');if(!av)return;
 const token=++avatarRenderToken;
 const label=(avatar==='girl'?'Avatar menina ':'Avatar menino ')+({smile:'sorrindo',blink:'piscando',surprise:'espantado',serious:'sério'}[expression]||'');
 av.setAttribute('aria-label',label);
 const src=avatarFiles[avatar]?.[expression];
 if(!src){av.innerHTML=fallbackAvatar(avatar,expression);popAvatar(av);return;}
 const probe=new Image();
 probe.onload=async()=>{
   try{if(probe.decode)await probe.decode()}catch(_){ }
   if(token!==avatarRenderToken)return;
   const img=document.createElement('img');img.className='avatar-image';img.alt='';img.src=src;
   av.replaceChildren(img);popAvatar(av);
 };
 probe.onerror=()=>{if(token!==avatarRenderToken)return;av.innerHTML=fallbackAvatar(avatar,expression);popAvatar(av)};
 probe.src=src;
}
function preloadAllAvatars(){Object.values(avatarFiles).forEach(group=>Object.values(group).forEach(src=>{const i=new Image();i.src=src;}))}
function setAvatar(kind,announce=true){avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));refreshAvatar();if(announce)toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp,announce=true){expression=exp;$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));refreshAvatar();if(announce)toast(feedback[exp]||'Que expressão especial!');halo()}
function playSequence(items,label){const token=++sequenceToken;let i=0;toast(label);const run=()=>{if(token!==sequenceToken)return;if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++],true);setTimeout(run,1150)};setTimeout(run,650)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function init(){
 preloadAllAvatars();setAvatar(avatar,false);setExpression('smile',false);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setAvatar(b.dataset.avatar)}));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>{sequenceToken++;setExpression(b.dataset.expression)}));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const mode=b.dataset.mode;if(mode==='free'){sequenceToken++;toast('Espelho Livre: escolha uma expressão ✨');halo()}if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑')}));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));
 $('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));
 $('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));
 $$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>location.href='../tia-tati-kids/');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();