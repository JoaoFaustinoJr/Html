(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let paused=false;
const feedback={
  smile:{tia:'Que sorriso lindo! ♥',mirror:'Seu sorriso ilumina o espelho! ✨'},
  blink:{tia:'Piscadinha encantada! 😉',mirror:'Um pequeno gesto também é magia!'},
  surprise:{tia:'Uau! Que espanto! ✨',mirror:'Seu rosto conta histórias incríveis!'},
  serious:{tia:'Muito bem! Agora bem sério.',mirror:'Toda expressão tem seu lugar aqui. ♥'}
};
function applyAvatar(kind){
 avatar=kind;
 ['#avatar','#homeAvatar'].forEach(sel=>{const av=$(sel);if(!av)return;av.classList.toggle('girl',kind==='girl');av.classList.toggle('boy',kind==='boy')});
 $$('[data-avatar]').forEach(b=>b.classList.toggle('active',b.dataset.avatar===kind));
 localStorage.setItem('tiaTatiMirrorAvatar',kind);
}
function applyExpression(exp){
 if(paused)return;
 ['#avatar','#homeAvatar'].forEach(sel=>{const av=$(sel);if(!av)return;['smile','blink','surprise','serious'].forEach(c=>av.classList.remove(c));if(exp)av.classList.add(exp)});
 $$('[data-expression]').forEach(b=>b.classList.toggle('active',b.dataset.expression===exp));
 if(feedback[exp]){const t=$('#tiaFeedback'),m=$('#mirrorText');if(t)t.textContent=feedback[exp].tia;if(m)m.textContent=feedback[exp].mirror}
}
function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'auto'})}
function openMode(mode){
 showScreen('freeScreen');
 if(mode==='free'){applyExpression('smile');return}
 const seq=mode==='challenge'?['surprise','smile','serious','blink']:['smile','blink','surprise','serious'];
 let i=0;const run=()=>{if(i>=seq.length)return;applyExpression(seq[i]);const t=$('#tiaFeedback');if(t)t.textContent=mode==='challenge'?'Desafio '+(i+1)+' de '+seq.length+' ✨':'Imite a princesa: '+feedback[seq[i]].tia;i++;setTimeout(run,1100)};run();
}
function toggleAvatarSheet(){const s=$('#avatarSheet');s?.classList.toggle('show')}
function toggleAdmin(show){const m=$('#adminSheet');if(!m)return;m.classList.toggle('show',show??!m.classList.contains('show'));m.setAttribute('aria-hidden',m.classList.contains('show')?'false':'true')}
function init(){
 applyAvatar(avatar);applyExpression('smile');
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>applyAvatar(b.dataset.avatar)));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>applyExpression(b.dataset.expression)));
 $$('[data-open-mode]').forEach(b=>b.addEventListener('click',()=>openMode(b.dataset.openMode)));
 $('#backKids')?.addEventListener('click',()=>location.href='../tia-tati-kids/');
 $('#backHome')?.addEventListener('click',()=>showScreen('homeScreen'));
 $('#chooseAvatar')?.addEventListener('click',toggleAvatarSheet);
 $('#adminBtn')?.addEventListener('click',()=>toggleAdmin(true));
 $('.modal-close')?.addEventListener('click',()=>toggleAdmin(false));
 $('#adminSheet')?.addEventListener('click',e=>{if(e.target.id==='adminSheet')toggleAdmin(false)});
 $('#pauseBtn')?.addEventListener('click',()=>{paused=!paused;const b=$('#pauseBtn');if(b)b.innerHTML=paused?'▶ <span>Continuar</span> ›':'⏸ <span>Pausar</span> ›';const t=$('#tiaFeedback');if(t)t.textContent=paused?'O espelho está descansando um pouquinho. ✨':'Voltamos à brincadeira! ♥'});
 $('#settingsBtn')?.addEventListener('click',()=>toggleAdmin(true));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();