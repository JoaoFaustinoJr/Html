(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  const board=root.querySelector('#board');
  if(!board)return;
  if(board.tagName&&board.tagName.toLowerCase()==='svg')board.setAttribute('preserveAspectRatio','xMidYMid meet');
  board.style.overflow='visible';

  let active=null,dropTimer=null,lastWin='';
  const pieceFrom=e=>e?.target?.closest?.('#board .piece')||null;
  const setActive=p=>{if(!p)return;board.querySelectorAll('.piece.rai-piece-active').forEach(x=>{if(x!==p)x.classList.remove('rai-piece-active')});p.classList.add('rai-piece-active')};
  const clearDragging=()=>board.querySelectorAll('.piece.rai-piece-dragging').forEach(x=>x.classList.remove('rai-piece-dragging'));
  const settle=p=>{if(!p||!document.body.contains(p))return;p.classList.remove('rai-piece-dragging','rai-piece-drop');clearTimeout(dropTimer);requestAnimationFrame(()=>{if(!document.body.contains(p))return;p.classList.add('rai-piece-drop');dropTimer=setTimeout(()=>p.classList.remove('rai-piece-drop'),330)})};
  board.addEventListener('pointerdown',e=>{const p=pieceFrom(e);if(!p)return;active=p;setActive(p);p.classList.add('rai-piece-dragging')},{passive:true});
  board.addEventListener('pointerup',()=>{if(active)settle(active);active=null},{passive:true});
  board.addEventListener('pointercancel',()=>{clearDragging();active=null},{passive:true});
  window.addEventListener('pointerup',()=>{if(active)settle(active);active=null},{passive:true});

  const successWave=()=>{if(root.classList.contains('tl-v158-desktop-stable'))return;[...board.querySelectorAll('.piece')].forEach((p,i)=>setTimeout(()=>{if(!document.body.contains(p))return;p.classList.remove('rai-piece-win');requestAnimationFrame(()=>{if(!document.body.contains(p))return;p.classList.add('rai-piece-win');setTimeout(()=>p.classList.remove('rai-piece-win'),700)})},i*72))};
  const msg=root.querySelector('#msg');
  if(msg)new MutationObserver(()=>{const text=(msg.textContent||'').replace(/\s+/g,' ').trim();if(!/miss[aã]o conclu[ií]da/i.test(text))return;const sig=(root.querySelector('#title')?.textContent||'')+'|'+text.match(/Tempo:\s*\d+:\d{2}/i)?.[0];if(sig===lastWin)return;lastWin=sig;setTimeout(successWave,120)}).observe(msg,{subtree:true,childList:true,characterData:true});
})();

(()=>{
  const root=document.getElementById('tangram-levels');if(!root)return;root.classList.add('tl-v158');
  const fineDesktop=()=>window.matchMedia&&window.matchMedia('(min-width:641px) and (hover:hover) and (pointer:fine)').matches;
  const syncDesktop=()=>root.classList.toggle('tl-v158-desktop-stable',!!fineDesktop());syncDesktop();window.addEventListener('resize',syncDesktop,{passive:true});
  const markNormalTimer=()=>{[...root.querySelectorAll('.tl-stats .tl-chip')].forEach(chip=>{const text=(chip.textContent||'').replace(/\s+/g,' ').trim();chip.classList.toggle('rai-normal-timer',/⏱|cron[oô]metro|(^|\s)\d{1,2}:\d{2}(\s|$)/i.test(text))})};
  markNormalTimer();const stats=root.querySelector('.tl-stats');if(stats)new MutationObserver(markNormalTimer).observe(stats,{childList:true,subtree:true});
})();