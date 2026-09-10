(()=>{
'use strict';
if(window.__TIA_TATI_NAMING_V43__)return;
window.__TIA_TATI_NAMING_V43__=true;

const replaceText=(root)=>{
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style'))return;
    const old=node.nodeValue||'';
    const next=old
      .replace(/\bRESET\b/g,'RECOMEÇO')
      .replace(/\bReset\b/g,'Recomeço')
      .replace(/\bFocus\b/g,'Foco');
    if(next!==old)node.nodeValue=next;
  });
};

const apply=()=>{
  document.querySelectorAll('[data-breathe-mode="reset"]').forEach(btn=>{
    btn.classList.add('recomeco-v43-setup');
    const title=btn.querySelector('strong');
    if(title)title.textContent='Recomeço';
    const desc=btn.querySelector('small');
    if(desc)desc.textContent='Pausa jovem, visual vibrante e ritmo confortável.';
    btn.setAttribute('aria-label','Recomeço: pausa guiada com visual jovem');
  });

  document.querySelectorAll('[data-breathe-mode="focus"]').forEach(btn=>{
    const title=btn.querySelector('strong');
    if(title)title.textContent='Foco';
  });

  const summary=document.querySelector('#breatheV41Summary');
  if(summary){
    const txt=summary.textContent||'';
    const next=txt.replace(/\bReset\b/g,'Recomeço').replace(/\bFocus\b/g,'Foco');
    if(next!==txt)summary.textContent=next;
  }

  document.querySelectorAll('[data-youth-breathe]').forEach(card=>{
    card.classList.add('recomeco-v43');
    const title=card.querySelector('.youth-card-copy strong');
    if(title)title.textContent='Recomeço';
    const badge=card.querySelector('.youth-card-art em');
    if(badge)badge.textContent='RECOMEÇO';
    const img=card.querySelector('img[alt]');
    if(img)img.alt='Recomeço';
    const small=card.querySelector('.youth-card-copy small');
    if(small)small.textContent='Pausa • foco • respiração guiada';
    card.setAttribute('aria-label','Abrir Recomeço');
  });

  document.querySelectorAll('[data-mission="breathe"] .v41-home-chip').forEach(chip=>{
    chip.textContent='Calma • Foco • Recomeço';
  });

  const breatheCard=document.querySelector('[data-mission="breathe"]');
  if(breatheCard){
    breatheCard.classList.add('breathe-v43-polished');
    const small=breatheCard.querySelector('.home-v22-mission-copy small');
    if(small)small.textContent='Pausa • foco • consciência respiratória';
  }

  replaceText(document.querySelector('#screen-home'));
  replaceText(document.querySelector('#screen-breathesetup'));
};

const start=()=>{
  apply();
  requestAnimationFrame(apply);
  setTimeout(apply,120);
  setTimeout(apply,500);
  const obs=new MutationObserver(()=>apply());
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});
};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
