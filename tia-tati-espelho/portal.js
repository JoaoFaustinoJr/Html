(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let expression='smile';
let toastTimer=null,haloTimer=null,favorite=false,sequenceToken=0;
function toast(text){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),950)}
function eyes(exp){
 if(exp==='blink')return `<ellipse cx="111" cy="132" rx="15" ry="19" fill="#fff"/><ellipse cx="111" cy="135" rx="7" ry="10" fill="#5a3427"/><circle cx="114" cy="130" r="2.5" fill="#fff"/><path d="M176 137q14 10 28 0" fill="none" stroke="#59352c" stroke-width="5" stroke-linecap="round"/>`;
 const tall=exp==='surprise'?22:18;
 return `<ellipse cx="111" cy="132" rx="15" ry="${tall}" fill="#fff"/><ellipse cx="189" cy="132" rx="15" ry="${tall}" fill="#fff"/><ellipse cx="111" cy="135" rx="7" ry="10" fill="#5a3427"/><ellipse cx="189" cy="135" rx="7" ry="10" fill="#5a3427"/><circle cx="114" cy="130" r="2.5" fill="#fff"/><circle cx="192" cy="130" r="2.5" fill="#fff"/>`;
}
function mouth(exp){
 if(exp==='surprise')return `<ellipse cx="150" cy="196" rx="17" ry="22" fill="#8f3551"/><ellipse cx="150" cy="202" rx="10" ry="8" fill="#f07f9c"/>`;
 if(exp==='serious')return `<path d="M134 197q16 5 32 0" fill="none" stroke="#9a4961" stroke-width="4.5" stroke-linecap="round"/>`;
 if(exp==='blink')return `<path d="M128 190q22 24 45 1q-4 23-22 25q-19-2-23-26" fill="#ce587b"/><path d="M134 194q17 9 33 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
 return `<path d="M124 187q26 34 52 0v9q-4 28-26 30q-22-2-26-30z" fill="#cd587b"/><path d="M131 192q19 12 38 0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><ellipse cx="150" cy="215" rx="11" ry="5" fill="#f28ba5"/>`;
}
function brows(exp){
 const up=exp==='surprise'?-8:0;
 const rot=exp==='serious'?8:0;
 return `<path d="M94 ${111+up}q17-9 34-1" fill="none" stroke="#6a4134" stroke-width="5" stroke-linecap="round" transform="rotate(${rot} 111 111)"/><path d="M172 ${110+up}q17-8 34 1" fill="none" stroke="#6a4134" stroke-width="5" stroke-linecap="round" transform="rotate(${-rot} 189 111)"/>`;
}
function avatarSvg(kind,exp){
 const girl=kind==='girl';
 const hair1=girl?'#7b4a31':'#563624',hair2=girl?'#b77a52':'#8a5c3c',hair3=girl?'#d7a17b':'#c08a63';
 const dress1=girl?'#f4a4cf':'#9fc8ff',dress2=girl?'#d96bb0':'#638fd8';
 const backHair=girl
 ? `<path d="M54 137q-8-76 47-111q42-27 100-5q55 21 55 104q0 59-34 101q7-63-8-94q-19-38-64-39q-44 1-64 39q-16 32-8 96q-24-31-24-91z" fill="url(#hairG)"/><path d="M78 135q-22 38-10 103" fill="none" stroke="#c98d68" stroke-width="18" stroke-linecap="round" opacity=".35"/><path d="M224 135q21 38 9 102" fill="none" stroke="#c98d68" stroke-width="18" stroke-linecap="round" opacity=".3"/>`
 : `<path d="M75 103q7-58 73-74q62-15 101 30q16 19 14 48q-18-16-38-18q-10-19-35-27q-27-8-50 3q-18 8-28 25q-19 0-37 13z" fill="url(#hairG)"/>`;
 const fringe=girl
 ? `<path d="M79 101q20-54 71-56q57-3 85 49q-25-5-46 9q-15-22-39-24q-28 0-47 25q-12-6-24-3z" fill="url(#hairG)"/>`
 : `<path d="M82 103q16-35 49-47l18 15l22-23l18 23l24-18l9 25l27-8l-9 34q-26-10-48 1q-18-17-40-18q-26 0-50 16z" fill="url(#hairG)"/>`;
 const bow=girl?`<g transform="translate(211 68) rotate(12)"><path d="M0 9q-18-17-29 1q12 13 29 8q17 6 29-7q-10-18-29-2z" fill="#f58bbb"/><circle cx="0" cy="13" r="7" fill="#ffd3e7"/></g>`:'';
 return `<svg viewBox="0 0 300 330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <defs><linearGradient id="hairG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hair3}"/><stop offset=".35" stop-color="${hair2}"/><stop offset="1" stop-color="${hair1}"/></linearGradient><linearGradient id="skinG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe8d7"/><stop offset="1" stop-color="#f2bd9d"/></linearGradient><linearGradient id="dressG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${dress1}"/><stop offset="1" stop-color="${dress2}"/></linearGradient><filter id="soft"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#7b4560" flood-opacity=".22"/></filter></defs>
 <g filter="url(#soft)">${backHair}<path d="M126 219h48v48h-48z" rx="18" fill="url(#skinG)"/><path d="M50 330q12-75 100-75q88 0 100 75" fill="url(#dressG)"/><path d="M99 267q20 18 51 18q32 0 51-18" fill="none" stroke="#ffffff77" stroke-width="6" stroke-linecap="round"/>
 <ellipse cx="150" cy="143" rx="76" ry="88" fill="url(#skinG)"/>${fringe}${bow}${brows(exp)}${eyes(exp)}<ellipse cx="92" cy="176" rx="15" ry="8" fill="#ef829b66"/><ellipse cx="208" cy="176" rx="15" ry="8" fill="#ef829b66"/><path d="M149 158q-4 12 6 16" fill="none" stroke="#d7a18e" stroke-width="3" stroke-linecap="round"/>${mouth(exp)}
 ${girl?`<path d="M139 286q11-10 22 0q-2 16-11 20q-9-4-11-20z" fill="#fff1f7"/>`:`<path d="M138 286l12-8l12 8l-5 17h-14z" fill="#f7fbff"/>`}</g></svg>`;
}
function refreshAvatar(){
 const av=$('#liveAvatar');if(!av)return;
 av.classList.remove('girl','boy','smile','blink','surprise','serious','animate-pop');
 av.classList.add(avatar,expression,'animate-pop');
 av.innerHTML=avatarSvg(avatar,expression);
 av.setAttribute('aria-label',(avatar==='girl'?'Avatar menina ':'Avatar menino ')+({smile:'sorrindo',blink:'piscando',surprise:'espantado',serious:'sério'}[expression]||''));
 setTimeout(()=>av.classList.remove('animate-pop'),340);
}
function setAvatar(kind,announce=true){avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));refreshAvatar();if(announce)toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp,announce=true){expression=exp;$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));refreshAvatar();if(announce)toast(feedback[exp]||'Que expressão especial!');halo()}
function playSequence(items,label){const token=++sequenceToken;let i=0;toast(label);const run=()=>{if(token!==sequenceToken)return;if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++],true);setTimeout(run,1150)};setTimeout(run,650)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function init(){
 setAvatar(avatar,false);setExpression('smile',false);
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