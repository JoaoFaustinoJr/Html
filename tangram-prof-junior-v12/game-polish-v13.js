(()=>{
  const root=document.getElementById('tangram-levels');
  if(!root)return;
  const board=root.querySelector('#board');
  if(!board)return;

  let active=null,dropTimer=null,lastWin='';

  const pieceFrom=e=>e?.target?.closest?.('#board .piece')||null;
  const setActive=p=>{
    if(!p)return;
    board.querySelectorAll('.piece.rai-piece-active').forEach(x=>{if(x!==p)x.classList.remove('rai-piece-active')});
    p.classList.add('rai-piece-active');
  };
  const clearDragging=()=>{
    board.querySelectorAll('.piece.rai-piece-dragging').forEach(x=>x.classList.remove('rai-piece-dragging'));
  };
  const settle=p=>{
    if(!p||!document.body.contains(p))return;
    p.classList.remove('rai-piece-dragging');
    p.classList.remove('rai-piece-drop');
    void p.getBoundingClientRect();
    p.classList.add('rai-piece-drop');
    clearTimeout(dropTimer);
    dropTimer=setTimeout(()=>p.classList.remove('rai-piece-drop'),330);
  };

  board.addEventListener('pointerdown',e=>{
    const p=pieceFrom(e);if(!p)return;
    active=p;setActive(p);
    p.classList.add('rai-piece-dragging');
  },{passive:true});

  board.addEventListener('pointerup',()=>{
    if(active)settle(active);
    active=null;
  },{passive:true});

  board.addEventListener('pointercancel',()=>{
    clearDragging();active=null;
  },{passive:true});

  window.addEventListener('pointerup',()=>{
    if(active)settle(active);
    active=null;
  },{passive:true});

  const successWave=()=>{
    const pieces=[...board.querySelectorAll('.piece')];
    pieces.forEach((p,i)=>{
      setTimeout(()=>{
        if(!document.body.contains(p))return;
        p.classList.remove('rai-piece-win');
        void p.getBoundingClientRect();
        p.classList.add('rai-piece-win');
        setTimeout(()=>p.classList.remove('rai-piece-win'),700);
      },i*72);
    });
  };

  const msg=root.querySelector('#msg');
  if(msg){
    new MutationObserver(()=>{
      const text=(msg.textContent||'').replace(/\s+/g,' ').trim();
      if(!/miss[aã]o conclu[ií]da/i.test(text))return;
      const sig=(root.querySelector('#title')?.textContent||'')+'|'+text.match(/Tempo:\s*\d+:\d{2}/i)?.[0];
      if(sig===lastWin)return;
      lastWin=sig;
      setTimeout(successWave,120);
    }).observe(msg,{subtree:true,childList:true,characterData:true});
  }
})();