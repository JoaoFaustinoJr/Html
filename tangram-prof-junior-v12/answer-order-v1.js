(()=>{
 if(window.__raiAnswerOrderV1)return;
 const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 function questionIndex(group,fallback=0){
  const q=group.closest('.rai-pp-q,.rai-em-q');
  if(q&&q.dataset&&q.dataset.q!==undefined){const n=Number(q.dataset.q);if(Number.isFinite(n))return n}
  if(q&&q.parentElement){const all=[...q.parentElement.querySelectorAll('.rai-pp-q,.rai-em-q')];const idx=all.indexOf(q);if(idx>=0)return idx}
  return fallback;
 }
 function applyGroup(group,fallback=0){
  if(!group||group.dataset.raiOrderReady==='1')return;
  const buttons=[...group.querySelectorAll('button[data-opt]')];
  const n=buttons.length;if(n<2)return;
  const shift=questionIndex(group,fallback)%n;
  buttons.forEach((b,orig)=>{
   const pos=(orig+shift)%n;
   b.style.order=String(pos);
   const raw=(b.textContent||'').replace(/^\s*[A-Z]\)\s*/,'').trim();
   b.textContent=`${letters[pos]}) ${raw}`;
   b.dataset.raiVisualLetter=letters[pos];
  });
  group.dataset.raiOrderReady='1';
 }
 function scan(root=document){
  root.querySelectorAll?.('.rai-pp-options,.rai-em-options').forEach((g,i)=>applyGroup(g,i));
 }
 const observer=new MutationObserver(muts=>{for(const m of muts){for(const n of m.addedNodes){if(n.nodeType===1){if(n.matches?.('.rai-pp-options,.rai-em-options'))applyGroup(n,0);scan(n)}}}});
 observer.observe(document.documentElement,{childList:true,subtree:true});
 scan();
 window.__raiAnswerOrderV1={scan};
})();
