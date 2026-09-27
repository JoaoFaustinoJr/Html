(()=>{
  // Ponte única: recebe o NÚMERO VISÍVEL do desafio (1..18), nunca índice interno.
  function buttons(){const r=document.getElementById('tangram-levels');return [...(r?.querySelectorAll('#levels button.tl-level,#levels .tl-level')||[])]}
  function byNumber(n){n=Number(n);return buttons().find(el=>{const m=(el.textContent||'').trim().match(/^(?:🔒\s*)?(\d+)\./);return m&&Number(m[1])===n})||buttons()[n-1]||null}
  function unlock(n){const el=byNumber(n);if(!el)return null;el.disabled=false;el.removeAttribute('disabled');el.setAttribute('aria-disabled','false');el.classList.remove('rai-bonus-locked');el.classList.add('rai-bonus-unlocked');return el}
  window.__raiTangramBonusBridge={
    openLevel(n){try{const el=unlock(n);if(!el)return false;buttons().forEach(b=>b.classList.remove('active'));el.click();requestAnimationFrame(()=>el.scrollIntoView({block:'center'}));return true}catch(e){console.warn('Abrir desafio',n,e);return false}},
    unlockLevel(n){return !!unlock(n)},
    open(i){return this.openLevel(Number(i)+1)}, // compatibilidade apenas
    refresh(){return buttons().length>0},
    isSampleActive(){try{return typeof sampleActive!=='undefined'&&!!sampleActive}catch(e){return document.documentElement.dataset.sampleUsed==='1'}}
  };
})();