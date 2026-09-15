(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let toastTimer=null,haloTimer=null,favorite=false;
function toast(text){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),950)}
function setAvatar(kind){avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp){$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));toast(feedback[exp]||'Que expressão especial!');halo();setTimeout(()=>$$('[data-expression]').forEach(b=>b.classList.remove('selected')),900)}
function playSequence(items,label){let i=0;toast(label);const run=()=>{if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++]);setTimeout(run,1150)};setTimeout(run,650)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function init(){
 setAvatar(avatar);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>setAvatar(b.dataset.avatar)));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>setExpression(b.dataset.expression)));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{const mode=b.dataset.mode;if(mode==='free'){toast('Espelho Livre: escolha uma expressão ✨');halo()}if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑')}));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));
 $('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));
 $('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));
 $$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>location.href='../tia-tati-kids/');
 const img=$('#maskImage');if(img){img.addEventListener('error',()=>{toast('Não foi possível carregar o cenário.');console.error('Falha ao carregar máscara',img.src)})}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();