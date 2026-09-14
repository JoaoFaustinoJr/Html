(()=>{
 if(window.__raiAnswerOrderV1)return;
 const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 function hash(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;return Math.abs(h)}
 function applyGroup(group,questionIndex=0){
  if(!group||group.dataset.raiOrderReady==='1')return;
  const buttons=[...group.querySelectorAll('button[data-opt]')];
  const n=buttons.length;if(n<2)return;
  const q=group.closest('.rai-pp-q,.rai-em-q');
  const seed=(hash((q?.textContent||'').slice(0,180))+questionIndex)%n;
  buttons.forEach((b,orig)=>{
   const pos=(orig+seed)%n;
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
