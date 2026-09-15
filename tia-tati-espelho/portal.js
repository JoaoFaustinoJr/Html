(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const feedback={smile:'Que sorriso lindo! 💗',blink:'Piscadinha encantada! 😉',surprise:'Uau! Que espanto! ✨',serious:'Muito bem! Agora bem sério. 🌟'};
let avatar=localStorage.getItem('tiaTatiMirrorAvatar')||'girl';
let toastTimer=null,haloTimer=null,favorite=false,maskObjectUrl=null;

function revealMask(){
  const stage=$('#maskStage');
  if(stage)stage.classList.add('ready');
}

function maskError(message){
  console.error(message);
  const loading=$('#maskLoading');
  if(loading)loading.textContent='O cenário demorou para carregar. Toque para tentar novamente.';
  revealMask();
}

async function loadMask(){
  const img=$('#maskImage');
  const loading=$('#maskLoading');
  if(!img)return;

  let finished=false;
  const done=()=>{
    if(finished)return;
    finished=true;
    revealMask();
    if(maskObjectUrl){setTimeout(()=>URL.revokeObjectURL(maskObjectUrl),1500);}
  };

  // Registra os eventos ANTES de definir src para evitar perder o load em navegadores móveis.
  img.addEventListener('load',done,{once:true});
  img.addEventListener('error',()=>maskError('Falha ao decodificar a máscara do Espelho Encantado.'),{once:true});

  // Nunca deixa a tela presa no loading.
  const failsafe=setTimeout(()=>{
    if(img.complete&&img.naturalWidth>0)done();
    else{
      if(loading)loading.textContent='✨ Abrindo o Espelho Encantado…';
      revealMask();
    }
  },2200);

  try{
    const r=await fetch('assets/espelho-encantado-home.b64?v=4',{cache:'no-store'});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const b64=(await r.text()).trim();
    const raw=atob(b64);
    const bytes=new Uint8Array(raw.length);
    for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
    const blob=new Blob([bytes],{type:'image/webp'});
    maskObjectUrl=URL.createObjectURL(blob);
    img.src=maskObjectUrl;

    // Alguns WebViews marcam complete sem disparar load de forma confiável.
    if(img.complete&&img.naturalWidth>0){clearTimeout(failsafe);done();}
  }catch(e){
    clearTimeout(failsafe);
    maskError(e);
  }
}

function toast(text){const t=$('#feedbackToast');if(!t)return;t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1900)}
function halo(){const h=$('#liveHalo');if(!h)return;h.classList.remove('show');void h.offsetWidth;h.classList.add('show');clearTimeout(haloTimer);haloTimer=setTimeout(()=>h.classList.remove('show'),950)}
function setAvatar(kind){avatar=kind;localStorage.setItem('tiaTatiMirrorAvatar',kind);$$('[data-avatar]').forEach(b=>b.classList.toggle('selected',b.dataset.avatar===kind));toast(kind==='girl'?'Avatar menina escolhido 💗':'Avatar menino escolhido 💙');halo()}
function setExpression(exp){$$('[data-expression]').forEach(b=>b.classList.toggle('selected',b.dataset.expression===exp));toast(feedback[exp]||'Que expressão especial!');halo();setTimeout(()=>$$('[data-expression]').forEach(b=>b.classList.remove('selected')),900)}
function playSequence(items,label){let i=0;toast(label);const run=()=>{if(i>=items.length){toast('Muito bem! ✨');return}setExpression(items[i++]);setTimeout(run,1150)};setTimeout(run,650)}
function openModal(id){const m=$(id);if(!m)return;m.classList.add('show');m.setAttribute('aria-hidden','false')}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('show');m.setAttribute('aria-hidden','true')})}
function init(){
 loadMask();setAvatar(avatar);
 $$('[data-avatar]').forEach(b=>b.addEventListener('click',()=>setAvatar(b.dataset.avatar)));
 $$('[data-expression]').forEach(b=>b.addEventListener('click',()=>setExpression(b.dataset.expression)));
 $$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{
  const mode=b.dataset.mode;
  if(mode==='free'){toast('Espelho Livre: escolha uma expressão ✨');halo()}
  if(mode==='challenge')playSequence(['smile','blink','surprise','serious'],'Desafio Encantado começou! ⭐');
  if(mode==='princess')playSequence(['smile','surprise','blink','serious'],'Imite a Princesa 👑');
 }));
 $('[data-action="room"]')?.addEventListener('click',()=>openModal('#roomModal'));
 $('[data-action="settings"]')?.addEventListener('click',()=>openModal('#settingsModal'));
 $('[data-action="favorite"]')?.addEventListener('click',()=>{favorite=!favorite;toast(favorite?'Guardado com carinho 💗':'Retirado dos favoritos')});
 $$('.modal-close').forEach(b=>b.addEventListener('click',closeModals));
 $$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
 $('#backKids')?.addEventListener('click',()=>location.href='../tia-tati-kids/');
 $('#maskLoading')?.addEventListener('click',()=>location.reload());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();